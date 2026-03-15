# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server with hot reload
npm run build     # Build for production (outputs to dist/)
npm run preview   # Preview production build locally
```

No linting, type-checking, or tests are configured.

## Architecture

**React + Vite SPA** deployed to GoDaddy shared hosting (Apache) with Cloudflare DNS/SSL. Also has a `vercel.json` for potential Vercel deployment.

**Routing** (`src/App.jsx`): React Router v6 with a shared `<Layout>` wrapper (Navbar + `<Outlet>` + Footer) around 5 routes: `/`, `/schedule`, `/rules`, `/champions`, `/contact`.

**Pages** (`src/pages/`): All content is hardcoded in JSX — no CMS or database. To update content (events, champions, officers, rules, announcements), edit the relevant page component directly.

**Styling**: Each component has a co-located `.css` file. Global CSS variables (`--sky-blue`, `--sky-dark`, `--sky-light`, `--sky-pale`, `--gold`, `--font-display`, `--font-body`) are defined in `src/index.css`. Google Fonts (Playfair Display + Source Sans 3) are loaded via `index.html`.

**Static assets** live in `public/` (logo, favicon) and are referenced as root-relative paths (e.g., `/mga_logo.png`).

## Deployment

There is no CI/CD pipeline. Deploy by building locally (`npm run build`) and uploading the `dist/` folder to GoDaddy via FTP.
