# Prime My Brain — Claude Code Instructions

## Project Context
IoT coffee sensor platform. Monorepo: client/ (Turborepo+Bun+Vite), server/ (PocketBase Go), infra/ (Docker).

## Mandatory Skills
Read before coding:
1. `docs/skills/01-monorepo-structure.md`
2. `docs/skills/02-frontend-enforcement.md`
3. `docs/skills/03-backend-enforcement.md`

## Architecture
Elm Architecture: Model → Update (pure reducer) → View (render) → Action (dispatch) → Model
Effects handle all async/side-effect code and dispatch actions on completion.

## Conventions
- Zustand + redux middleware: `dispatch({ type, payload })` only, never `set()`
- Mantine UI v7: theme-only customization, no CSS modules/Tailwind/styled-components
- Vite: only build tool allowed
- Bun: only package manager allowed
- Zod: all validation, types via `z.infer<>`
- @mantine/form: all form management with zodResolver
- PocketBase: calls only in `effects/`, never in reducers/views
