# AGENTS.md — Agent Instructions for Prime My Brain

> This file is the primary entry point for AI coding agents working on this project.
> Read this file first before making any changes.

## Project Overview

Prime My Brain is an IoT coffee sensor platform with a monorepo structure:
- **client/** — Frontend Turborepo (Bun + Vite) with 3 React apps
- **server/** — Backend (PocketBase in Go library mode)
- **infra/** — Docker Compose orchestration

## Skill Files (MANDATORY READING)

Before writing ANY code, read these enforcement documents in order:

1. [`docs/skills/01-monorepo-structure.md`](docs/skills/01-monorepo-structure.md) — Directory structure, forbidden patterns, workspace rules
2. [`docs/skills/02-frontend-enforcement.md`](docs/skills/02-frontend-enforcement.md) — Mantine UI, Elm Architecture, Zustand Redux, Zod, forms
3. [`docs/skills/03-backend-enforcement.md`](docs/skills/03-backend-enforcement.md) — PocketBase Go library mode, collections, hooks, SDK usage

## Architecture Summary

### Elm Architecture (Frontend — MANDATORY)
All frontend apps follow: **Model → Update → View** with Effects

```
src/state/Model.ts    — State type (plain interface, no classes)
src/state/Actions.ts  — Discriminated union actions (domain/VERB naming)
src/state/Update.ts   — Pure reducer (state, action) => newState
src/state/store.ts    — Zustand + redux middleware
src/effects/          — Side effects (API calls) that dispatch actions
src/view/             — Pure views: (state, dispatch) => JSX
```

### Zustand Redux Pattern (Frontend — MANDATORY)
- Use `redux` middleware from `zustand/middleware`
- All mutations via `dispatch({ type, payload })`
- NEVER use `set()` directly
- Reducers MUST be pure (no side effects)

### Vite Build Tool (Frontend — MANDATORY)
- Vite is the ONLY build tool
- No webpack, CRA, Next.js, or Parcel

### Mantine UI (Frontend — MANDATORY)
- Theme-only customization in `theme.ts`
- No CSS modules, styled-components, or Tailwind

### PocketBase (Backend)
- Go library mode via `server/main.go`
- Client-side JS SDK in `lib/pb.ts`
- PocketBase calls ONLY in `effects/` directory

## Quick Reference

| What | Where | Pattern |
|---|---|---|
| Add a new page | `apps/<app>/src/view/NewPage.tsx` | `(state, dispatch) => JSX` |
| Add a new action | `apps/<app>/src/state/Actions.ts` | Discriminated union type |
| Handle an action | `apps/<app>/src/state/Update.ts` | Pure function in switch/case |
| Add a side effect | `apps/<app>/src/effects/index.ts` | Async function calling `dispatch()` |
| Add a Zod schema | `packages/schemas/src/index.ts` | `z.object({...})` + `z.infer<>` |
| Add a shared component | `packages/ui/src/` | Pure presentational, Mantine only |
| Add a collection | `server/main.go` + PocketBase admin | Define in Go + create migration |

## Forbidden Actions

- ❌ Using `set()` in Zustand — use `dispatch()` only
- ❌ Side effects in reducers
- ❌ CSS modules, styled-components, Tailwind
- ❌ Direct PocketBase calls outside `effects/`
- ❌ `useState`/`useReducer` for app-level state
- ❌ Non-Vite build tools
- ❌ npm/yarn/pnpm — use Bun only
- ❌ Storing non-serializable data in state
