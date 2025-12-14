# Screenshots Guide

Replace the placeholder SVGs in `public/screenshots/` with real captures before publishing.

## How to capture

1. Run `npm run dev` and open `http://localhost:3000`.
2. Use a 1440px+ viewport for crisp images (retina if possible).
3. Capture these flows:
   - Landing (`/`)
   - Dashboard (`/dashboard`)
   - Builder (`/builder`) with a few ingredients added so the cup list and totals are visible.
   - Progress (`/progress`) showing the charts.
4. Save PNG or SVG over the existing files:
   - `public/screenshots/landing.svg`
   - `public/screenshots/dashboard.svg`
   - `public/screenshots/builder.svg`
   - `public/screenshots/progress.svg`
5. Commit the updated images so GitHub renders them in the README.

Tips:
- Hide dev toolbars and scrollbars for a clean look.
- Keep consistent aspect ratios (16:9 or 4:3) across captures.
- If using SVG exports, ensure text is preserved or converted to outlines to avoid font issues on GitHub.
