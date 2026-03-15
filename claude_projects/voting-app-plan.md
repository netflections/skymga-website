# Voting App Implementation Plan

## Overview

Add a `/vote` page to the Sky MGA website allowing members to cast ballots for club elections. Uses Supabase as the backend database.

---

## Backend: Supabase

**Why Supabase over Firebase:** Postgres `UNIQUE` constraints enforce duplicate vote prevention server-side — it can't be bypassed from the frontend. Firebase would require a Cloud Function to do this safely.

---

## Database Schema

### `ballots`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PRIMARY KEY, auto-generated |
| name | text | e.g. "2026 Board Election" |
| description | text | Ballot description shown to voter |
| votes_per_member | integer | e.g. 4 (how many candidates each member can select) |
| voting_start | timestamptz | When voting opens |
| voting_end | timestamptz | When voting closes |
| is_active | boolean | Controls whether ballot appears in dropdown |
| created_at | timestamptz | Auto-set |

### `candidates`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PRIMARY KEY, auto-generated |
| ballot_id | uuid | Foreign key → ballots.id |
| name | text | e.g. "Candidate 1" |
| message | text | e.g. "Message 1" |
| display_order | integer | Controls sort order on page |

### `votes`
| Column | Type | Notes |
|---|---|---|
| id | uuid | PRIMARY KEY, auto-generated |
| ballot_id | uuid | Foreign key → ballots.id |
| voter_name | text | Required |
| voter_email | text | Required |
| member_number | text | Required |
| selected_candidates | text[] | Array of candidate name strings |
| submitted_at | timestamptz | Auto-set |

**Key constraint:** `UNIQUE (ballot_id, voter_email)` — duplicate votes are rejected by Postgres, not client-side logic.

---

## Row Level Security (RLS)

| Table | SELECT | INSERT | UPDATE/DELETE |
|---|---|---|---|
| `ballots` | ✅ public | ❌ deny | ❌ deny |
| `candidates` | ✅ public | ❌ deny | ❌ deny |
| `votes` | ❌ deny | ✅ during active voting window only | ❌ deny |

Votes are write-only — nobody can read the full vote list through the public API. Ballot and candidate data is read-only from the public API — only editable via Supabase Studio.

**`votes` INSERT policy** should also enforce the voting window:

```sql
CREATE POLICY "Allow insert during voting window" ON votes
FOR INSERT TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM ballots
    WHERE ballots.id = ballot_id
      AND ballots.is_active = true
      AND now() >= ballots.voting_start
      AND now() <= ballots.voting_end
  )
);
```

This means even a direct API call outside the voting window will be rejected by Postgres. The frontend should also check `voting_start`/`voting_end` to show appropriate messaging (e.g. "Voting opens on...", "Voting has closed"), but the server-side policy is the authoritative enforcement.

---

## React Architecture

All logic lives in `src/pages/Vote.jsx` + `Vote.css`. Sub-components defined inline (matching existing codebase patterns).

```
Vote (page)
  ├── BallotSelector       — dropdown + description
  ├── CandidateTable       — 2-column CSS grid (only when 'open')
  │     └── CandidateCard  — clickable, selected state styling
  ├── VoterForm            — name / email / member number (only when 'open')
  ├── SubmitBar            — "X of 4 selected" + Submit button (only when 'open')
  ├── BallotResults        — ranked results table (only when 'closed')
  └── ConfirmationDialog   — modal with candidate review,
                             acknowledgment checkbox, Cancel/Submit
```

### Page State (all in `Vote`)
- `ballots` — array loaded from Supabase on mount
- `activeBallotId` — controlled by BallotSelector
- `selectedIds` — Set of candidate IDs the user has checked
- `voterInfo` — `{ name, email, memberNumber }` form values
- `phase` — `'voting' | 'confirming' | 'success' | 'error'`
- `errorMessage` — string for error display
- `loading` — boolean for submit spinner
- `ballotStatus` — derived from the active ballot's `is_active`, `voting_start`, and `voting_end`:
  - `'upcoming'` — `is_active` is true but `now() < voting_start`
  - `'open'` — `is_active` is true and within the voting window
  - `'closed'` — `is_active` is true but `now() > voting_end`
  - `'inactive'` — `is_active` is false

The candidate table, voter form, and submit bar should only render when `ballotStatus === 'open'`. For all other statuses, show a message in place of the form:
- `'upcoming'` → "Voting opens on [date]."
- `'closed'` → show `BallotResults` component with final vote counts
- `'inactive'` → "This ballot is not currently available."

---

## Duplicate Vote Flow

1. User fills out form, selects up to `votes_per_member` candidates, clicks Submit
2. Frontend validates: all fields non-empty, correct number of candidates selected
3. Confirmation dialog opens showing selected candidates
4. User checks acknowledgment checkbox: *"I am a member of the Sky Meadow Men's Golf Association."*
5. User clicks "Submit My Vote"
6. Frontend calls `supabase.from('votes').insert(...)`
7. If `error.code === '23505'` (Postgres unique violation) → show error: *"This member has already voted on this ballot."*
8. Any other error → generic error message
9. No error → show success screen

The duplicate check happens inside Postgres on INSERT — there is no client-side "check then insert" race condition.

---

## Implementation Steps

### Step 1 — Supabase Setup
- Create a free project at supabase.com
- Run the following SQL in the Supabase SQL Editor:

```sql
-- Ballots table
CREATE TABLE ballots (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name             text NOT NULL UNIQUE,
  description      text,
  votes_per_member integer NOT NULL DEFAULT 4,
  voting_start     timestamptz NOT NULL,
  voting_end       timestamptz NOT NULL,
  is_active        boolean NOT NULL DEFAULT true,
  created_at       timestamptz DEFAULT now()
);

-- Candidates table
CREATE TABLE candidates (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ballot_id     uuid NOT NULL REFERENCES ballots(id) ON DELETE CASCADE,
  name          text NOT NULL,
  message       text,
  display_order integer NOT NULL DEFAULT 0
);

-- Votes table
CREATE TABLE votes (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ballot_id            uuid NOT NULL REFERENCES ballots(id),
  voter_name           text NOT NULL,
  voter_email          text NOT NULL,
  member_number        text NOT NULL,
  selected_candidates  text[] NOT NULL,
  submitted_at         timestamptz DEFAULT now(),
  CONSTRAINT votes_unique_voter_per_ballot UNIQUE (ballot_id, voter_email)
);

-- Enable RLS
ALTER TABLE ballots    ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE votes      ENABLE ROW LEVEL SECURITY;

-- RLS policies: ballots
CREATE POLICY "Public read ballots" ON ballots FOR SELECT TO anon USING (true);

-- RLS policies: candidates
CREATE POLICY "Public read candidates" ON candidates FOR SELECT TO anon USING (true);

-- RLS policies: votes (insert only, during active voting window)
CREATE POLICY "Allow insert during voting window" ON votes
FOR INSERT TO anon
WITH CHECK (
  EXISTS (
    SELECT 1 FROM ballots
    WHERE ballots.id = ballot_id
      AND ballots.is_active = true
      AND now() >= ballots.voting_start
      AND now() <= ballots.voting_end
  )
);
```

- Seed data: insert one `ballots` row for "2026 Board Election" with `voting_start`, `voting_end`, and placeholder candidates ("Candidate 1", "Message 1", etc.)
- Copy Project URL and anon key from Project Settings > API

### Step 2 — Frontend Environment
- Create `.env.local` in project root (required before Step 3):
  ```
  VITE_SUPABASE_URL=your-project-url
  VITE_SUPABASE_ANON_KEY=your-anon-key
  ```
- Install Supabase client: `npm install @supabase/supabase-js`

### Step 2b — Results View and RLS Policy
Add the following to Supabase after the tables are created. This view returns aggregated vote counts per candidate — no individual voter data is exposed.

```sql
-- Aggregated results view (no PII, safe to expose publicly)
CREATE VIEW ballot_results AS
SELECT
  b.id           AS ballot_id,
  b.name         AS ballot_name,
  b.voting_end,
  c.id           AS candidate_id,
  c.name         AS candidate_name,
  c.display_order,
  COUNT(*)       AS vote_count
FROM votes v
JOIN ballots b ON b.id = v.ballot_id
JOIN candidates c ON c.ballot_id = b.id AND c.name = ANY(v.selected_candidates)
WHERE now() > b.voting_end
GROUP BY b.id, b.name, b.voting_end, c.id, c.name, c.display_order
ORDER BY vote_count DESC;

-- Grant public read access to the view
GRANT SELECT ON ballot_results TO anon;
```

The `WHERE now() > b.voting_end` clause ensures results are only available after the ballot has closed — querying early returns no rows. The frontend should query this view when `ballotStatus === 'closed'` and display results ranked by `vote_count` descending.

### Step 3 — Supabase Client Module
- Create `src/lib/supabaseClient.js`

### Step 4 — Vote Page
- Create `src/pages/Vote.jsx`
- Create `src/pages/Vote.css`

### Step 5 — Add Route
- Edit `src/App.jsx` — add `/vote` route inside the existing Layout route

### Step 6 — Add Nav Link
- Edit `src/components/Navbar.jsx` — add "Vote" to the nav links

### Step 7 — Deploy
- Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` as environment variables in the Vercel project dashboard (Settings > Environment Variables)
- Push to the main branch — Vercel will build and deploy automatically
- No `.htaccess` or manual uploads needed; Vercel handles client-side routing for SPAs out of the box

---

## CSS Notes

New classes needed in `Vote.css` (use existing CSS variables from `src/index.css`):

- `.candidate-grid` — 2-column CSS grid, responsive to 1 column on mobile
- `.candidate-card` — clickable card with `border: 2px solid transparent`
- `.candidate-card.selected` — `border-color: var(--sky-blue); background: var(--sky-pale)`
- `.dialog-overlay` — fixed full-screen overlay with dark backdrop
- `.dialog-box` — centered modal box
- `.submit-bar` — shows selection count and Submit button

---

## Security Notes

| Threat | Mitigation |
|---|---|
| Someone votes twice with same email | Postgres UNIQUE constraint on `(ballot_id, voter_email)` |
| Someone reads all votes | RLS SELECT denied on `votes` for anon key |
| Someone inserts fake ballot/candidate | RLS INSERT denied on `ballots` and `candidates` for anon key |
| Anon key exposed in browser | Expected and safe — scoped to this database with RLS |

**Limitation:** Someone could vote with a fake email. For a club election this is acceptable. Supabase Auth (magic link email verification) can be added later if stricter identity verification is needed.
