# Smoothie Studio

Smoothie builder and ingredient explorer built with Next.js. Browse the catalog with search, categories, and tags, view nutrition, and assemble custom blends with live macro totals and polished motion.

## Highlights
- Ingredient catalog with segmented categories, search, and filter chips
- Sheet-style ingredient detail with nutrition facts and tags
- Smoothie builder with live macros and animated add/remove
- Mock AI recipe ideas and progress visualizations with charts
- Glassmorphic UI with Framer Motion micro-interactions

## Tech Stack
- Next.js App Router (TypeScript)
- Tailwind CSS 4 (inline config)
- Framer Motion, Recharts, Zustand, Lucide React

## Getting Started
Prereqs: Node.js 20+, npm.

```bash
npm install
npm run dev
# http://localhost:3000
```

Useful scripts:
- `npm run dev` – start the dev server
- `npm run lint` – ESLint
- `npm run build` – production build (Turbopack)
- `npm start` – serve the built app

Environment: no required secrets. If you add runtime config, prefer `.env.local` (ignored by git).

## Project Structure
```
src/
  app/                Routes (landing, dashboard, builder, ingredients, progress)
  components/
    layout/           App shell/nav
    ui/               Design system primitives (glass cards, buttons, chips, sheet)
    domain/           Feature components (ingredient cards/detail, charts, builder)
  data/               Mock ingredients and progress data
  lib/                Helpers + AI suggestion generator
  store/              Zustand store with persistence
public/
  ingredients/        Art assets
  screenshots/        Placeholder captures (swap with real)
```

## 🖼️ Screenshots

### Landing Page
![Landing Page](https://raw.githubusercontent.com/ElOlamirewaju/Smoothie-Studio/main/public/screenshots/landing.svg)

### Dashboard
![Dashboard](https://raw.githubusercontent.com/ElOlamirewaju/Smoothie-Studio/main/public/screenshots/dashboard.svg)

### Smoothie Builder
![Builder](https://raw.githubusercontent.com/ElOlamirewaju/Smoothie-Studio/main/public/screenshots/builder.svg)

### Progress Tracking
![Progress](https://raw.githubusercontent.com/ElOlamirewaju/Smoothie-Studio/main/public/screenshots/progress.svg)

## Deployment
- Optimized for Vercel/Next.js hosting; no server data dependencies.
- Ensure any future fonts or assets are vendored or reachable in CI/CD.

## Contributing
See `CONTRIBUTING.md` for setup, branching, and PR guidelines. Please run `npm run lint` before opening a PR and include relevant screenshots for UI changes.

## Security
Please review `SECURITY.md` for how to report vulnerabilities.

## License
MIT — see `LICENSE` for details.
