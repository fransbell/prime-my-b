# Prime My Brain — GitHub Copilot Instructions

## Before Coding
Read the enforcement skills in order:
1. `docs/skills/01-monorepo-structure.md` — Monorepo structure, forbidden patterns
2. `docs/skills/02-frontend-enforcement.md` — Elm Architecture, Zustand Redux, Mantine, Zod
3. `docs/skills/03-backend-enforcement.md` — PocketBase Go library mode

## Key Patterns
- **Elm Architecture**: Model (state) → Update (pure reducer) → View (render) → Action (dispatch) → Model
- **Zustand Redux**: Use `redux` middleware, `dispatch({ type: 'domain/VERB', payload })`, never `set()`
- **Mantine UI**: Theme-only styling in `theme.ts`, no CSS modules or Tailwind
- **Vite Build**: Only Vite, no webpack/CRA/Next.js
- **PocketBase**: All API calls in `effects/` directory, never in reducers or views
- **Bun**: Only Bun, no npm/yarn/pnpm

## Action Naming
Format: `domain/VERB` — e.g., `sensor/FETCH_START`, `reading/ADD_ONE`, `auth/LOGIN_SUCCESS`

## File Organization
- `src/state/Model.ts` — State interface
- `src/state/Actions.ts` — Action types (discriminated union)
- `src/state/Update.ts` — Pure reducer
- `src/effects/` — Side effects (async, PocketBase calls)
- `src/view/` — Pure rendering components
