# Sky Meadow MGA Website

Official website for the Sky Meadow Country Club Men's Golf Association.

## Tech Stack

- **Framework**: Vite + React 18
- **Routing**: React Router v6
- **Fonts**: Playfair Display + Source Sans 3 (Google Fonts)
- **Hosting**: GoDaddy shared hosting
- **DNS/SSL**: Cloudflare
- **CI/CD**: GitHub Actions → FTP deploy

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

### Automatic (GitHub Actions)

Every push to `main` triggers a build and FTP deploy to GoDaddy.

**Required GitHub Secrets** (Settings → Secrets and variables → Actions):

| Secret | Value |
|--------|-------|
| `FTP_SERVER` | Your GoDaddy FTP hostname (e.g. `ftp.yourdomain.com`) |
| `FTP_USERNAME` | GoDaddy FTP username |
| `FTP_PASSWORD` | GoDaddy FTP password |

Find FTP credentials in GoDaddy → Hosting → cPanel → FTP Accounts.

### Manual Deploy

```bash
npm run build
# Upload contents of dist/ to public_html/ via FTP
```

## Cloudflare Configuration

Since Cloudflare proxies traffic (orange cloud), ensure:
- SSL/TLS mode: **Full** (not Flexible) to avoid redirect loops with GoDaddy's SSL
- Cache Rules: Add a page rule to bypass cache for `/api/*` if needed
- No need to modify anything for React Router — the `.htaccess` in `public/` handles SPA routing on the Apache server

## Updating Content

All data is in the page component files:
- **Schedule**: `src/pages/Schedule.jsx` — edit the `events2025` array
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
