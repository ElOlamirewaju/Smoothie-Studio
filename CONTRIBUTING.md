# Contributing to Smoothie Studio

Thanks for helping improve the app! This guide covers local setup, coding standards, and how to open good pull requests.

## Setup
1. Install Node.js 20 (`.nvmrc` provided) and npm.
2. Clone the repo and install dependencies:
   ```bash
   npm install
   npm run dev
   ```
3. Visit `http://localhost:3000`.

## Branches & Commits
- Use feature branches: `feature/short-description`, `fix/bug-summary`, `chore/task`.
- Keep commits focused; rebase onto `main` before opening a PR when possible.

## Coding Standards
- TypeScript + Next.js App Router.
- Keep components small and favor composition.
- Prefer existing design system components (`src/components/ui/*`) before adding new primitives.
- Write clear names and small, purposeful comments where needed.

## Testing & Quality
- Run `npm run lint` before pushing.
- For UI changes, attach before/after screenshots or a short clip in the PR description.
- If you add stateful logic, consider unit tests where practical (Vitest/Jest not included yet).

## Pull Requests
Include:
- What changed and why.
- Screenshots for visual changes.
- Testing performed (`npm run lint`, manual scenarios).
- Any follow-up todos or known gaps.

## Issue Reporting
- Bugs: steps to reproduce, expected vs actual, environment (OS, browser), and screenshots if applicable.
- Features: describe the user problem, the desired outcome, and acceptance criteria.

## Security
- Please avoid filing public issues for vulnerabilities; see `SECURITY.md` for the private reporting channel.
