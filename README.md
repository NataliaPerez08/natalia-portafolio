
# Natalia Portfolio (Vite + React + Tailwind)

This is a ready-to-deploy portfolio for GitHub Pages.

## Quick Start

```bash
# 1) Create a new GitHub repo named: natalia-portfolio
#    (If you use a different name, update `base` in vite.config.js accordingly.)

# 2) Locally: unzip this project, cd into it, then:
npm install

# 3) Test locally:
npm run dev

# 4) Build:
npm run build

# 5) Option A — Deploy with GitHub Actions (recommended):
#    - Commit + push to the `main` branch. The included workflow will build and publish to Pages.
#    - In repo settings: Settings → Pages → Build and deployment → Source = GitHub Actions.
#    - The site will be served at https://<your-username>.github.io/natalia-portfolio/

# 5) Option B — Deploy with gh-pages (manual alternative):
#    - Ensure you're on a clean git repo and have `gh-pages` installed (already in devDependencies).
npm run deploy
#    - This publishes the `dist/` folder to a `gh-pages` branch.

```

### Notes
- If your repo name is NOT `natalia-portfolio`, edit `base` in `vite.config.js` to `/<your-repo>/`.
- Your PDF CV is available at `/cv_Natalia_Perez.pdf` and linked from the Hero section.
- Customize links, text, and sections in `src/App.jsx`.
