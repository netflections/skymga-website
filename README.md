# Sky Meadow MGA Website

Official website for the Sky Meadow Country Club Men's Golf Association.

## Tech Stack

- **Framework**: Vite + React 18
- **Routing**: React Router v6
- **Fonts**: Playfair Display + Source Sans 3 (Google Fonts)
- **Hosting**: Vercel
- **DNS/SSL**: Cloudflare

## Pages

| Path | Page |
|------|------|
| `/` | Home |
| `/schedule` | Schedule & Events |
| `/rules` | Rules & Handicaps |
| `/champions` | Past Champions |
| `/contact` | Contact & Officers |

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

Every push to `main` automatically triggers a Vercel deployment. SPA routing is handled by the `rewrites` rule in `vercel.json`.

## Cloudflare Configuration

Since Cloudflare proxies traffic (orange cloud), ensure:
- SSL/TLS mode: **Full** (not Flexible) to avoid redirect loops

## Updating Content

All data is in the page component files:
- **Schedule**: `src/pages/Schedule.jsx` — edit the events array
- **Champions**: `src/pages/Champions.jsx` — edit `clubChampions` and `tournamentChampions`
- **Officers**: `src/pages/Contact.jsx` — edit the `officers` array
- **Announcements**: `src/pages/Home.jsx` — edit the `announcements` array
- **Rules**: `src/pages/Rules.jsx` — edit `localRules` and `handicapFAQ`

## Color Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--sky-blue` | `#4B8DCC` | Primary blue, accents |
| `--sky-dark` | `#1E3851` | Navbar, dark backgrounds |
| `--sky-light` | `#d6e8f7` | Light blue tints |
| `--sky-pale` | `#f0f6fc` | Subtle backgrounds |
| `--gold` | `#c9a84c` | Award accents |
