# Prime My Brain - Monorepo Structure Enforcement Skill

## Purpose
This skill enforces the monorepo structure for the Prime My Brain project. All development must conform to these structural rules.

## Repository Layout

```
prime-my-b/
├── client/                          # Frontend monorepo (Turborepo + Bun)
│   ├── .nvmrc                       # Node.js version lock
│   ├── package.json                 # Root workspace config
│   ├── turbo.json                   # Turborepo pipeline config
│   ├── bun.lockb                    # Bun lockfile
│   ├── apps/
│   │   ├── dashboard/              # Analytics / Data Visualization app
│   │   │   ├── package.json
│   │   │   ├── index.html          # Vite HTML entry point
│   │   │   ├── vite.config.ts      # Vite build configuration (MANDATORY)
│   │   │   ├── tsconfig.json
│   │   │   └── src/
│   │   │       ├── main.tsx        # Vite React entry
│   │   │       ├── App.tsx         # Root View (Elm Architecture)
│   │   │       ├── theme.ts        # Mantine theme config (ONLY place for styling)
│   │   │       ├── state/          # Elm Architecture state modules
│   │   │       │   ├── index.ts    # Re-exports
│   │   │       │   ├── Model.ts    # State type definitions
│   │   │       │   ├── Actions.ts  # Discriminated union action types
│   │   │       │   └── Update.ts   # Pure reducer functions (State + Action → State)
│   │   │       ├── view/           # Elm Architecture view modules
│   │   │       │   ├── index.ts    # Re-exports
│   │   │       │   ├── DashboardPage.tsx
│   │   │       │   └── ...         # Each view = pure function: (state, dispatch) → JSX
│   │   │       ├── effects/        # Side effects (PocketBase calls, etc.)
│   │   │       │   └── index.ts    # Effect runners that dispatch actions on completion
│   │   │       ├── components/     # Pure presentational components (no state)
│   │   │       ├── hooks/          # Custom hooks
│   │   │       ├── lib/            # PocketBase client, utilities
│   │   │       │   └── pb.ts       # PocketBase SDK instance
│   │   │       ├── schemas/        # Zod validation schemas
│   │   │       └── types/          # TypeScript types
│   │   ├── liff-app/              # LINE LIFF client-facing app
│   │   │   ├── package.json
│   │   │   ├── index.html
│   │   │   ├── vite.config.ts
│   │   │   ├── tsconfig.json
│   │   │   └── src/
│   │   │       ├── main.tsx
│   │   │       ├── App.tsx
│   │   │       ├── theme.ts
│   │   │       ├── state/
│   │   │       │   ├── Model.ts
│   │   │       │   ├── Actions.ts
│   │   │       │   └── Update.ts
│   │   │       ├── view/
│   │   │       ├── effects/
│   │   │       ├── components/
│   │   │       ├── hooks/
│   │   │       ├── lib/
│   │   │       │   └── pb.ts
│   │   │       ├── schemas/
│   │   │       └── types/
│   │   └── iot-demo/              # IoT data insert/generation demo
│   │       ├── package.json
│   │       ├── index.html
│   │       ├── vite.config.ts
│   │       ├── tsconfig.json
│   │       └── src/
│   │           ├── main.tsx
│   │           ├── App.tsx
│   │           ├── theme.ts
│   │           ├── state/
│   │           │   ├── Model.ts
│   │           │   ├── Actions.ts
│   │           │   └── Update.ts
│   │           ├── view/
│   │           ├── effects/
│   │           ├── components/
│   │           ├── hooks/
│   │           ├── lib/
│   │           │   └── pb.ts
│   │           ├── schemas/
│   │           └── types/
│   └── packages/
│       ├── ui/                     # Shared UI components (pure presentational)
│       │   ├── package.json
│       │   └── src/
│       ├── store/                  # Shared Zustand Redux stores (Elm Architecture)
│       │   ├── package.json
│       │   └── src/
│       │       ├── index.ts
│       │       ├── sensorStore.ts  # Model + Actions + Update + createSensorStore
│       │       └── authStore.ts    # Model + Actions + Update + createAuthStore
│       ├── pb-client/             # Shared PocketBase client
│       │   ├── package.json
│       │   └── src/
│       │       └── index.ts
│       └── schemas/               # Shared Zod validation schemas
│           ├── package.json
│           └── src/
│               └── index.ts
├── server/                          # Backend - PocketBase
│   ├── pocketbase                   # PocketBase binary (downloaded)
│   ├── main.go                      # Go entry - PocketBase in library mode
│   ├── go.mod
│   ├── go.sum
│   └── migrations/                  # PocketBase migrations
├── infra/                           # Infrastructure
│   ├── docker-compose.yml           # All services orchestration
│   ├── Dockerfile.client            # Multi-stage build for client apps (Vite → Nginx)
│   └── Dockerfile.server            # Build for Go PocketBase server
├── 00-Home/                         # Obsidian knowledge base (existing)
├── 01-IoT-Hardware/                 # (existing)
├── ...                              # (existing docs)
└── .gitignore
```

## Enforcement Rules

### 1. Client Monorepo Rules
- **Package Manager**: Bun ONLY. Never use npm, yarn, or pnpm.
- **Build Tool**: Vite ONLY. No webpack, CRA, Next.js, or other bundlers.
- **Build System**: Turborepo for monorepo task orchestration.
- **Static Site Generation**: All apps use Vite for SPA/SSG builds.
- **Vite Config**: Every app MUST have `vite.config.ts` at its root.
- **Workspace Protocol**: Use `workspace:*` for internal package references.
- **Node Version**: Must match `.nvmrc` (Node 20 LTS).

### 2. Elm Architecture Rules (MANDATORY)
Every app MUST follow the Elm Architecture pattern:

```
┌──────────┐     Action      ┌──────────┐     New State   ┌──────────┐
│   View    │ ──────────────→ │  Update  │ ──────────────→ │  Model   │
│(render)   │  dispatch()     │(reducer) │  pure function  │ (state)  │
└──────────┘                  └──────────┘                  └──────────┘
      ↑                                                       │
      │                      State                            │
      └───────────────────────────────────────────────────────┘
```

- **Model** (`state/Model.ts`): TypeScript interface defining the shape of application state. Must be a plain object. No classes.
- **Actions** (`state/Actions.ts`): Discriminated union type with `type` field. Every state mutation MUST go through a dispatched action.
- **Update** (`state/Update.ts`): Pure reducer function `(state: Model, action: Action) => Model`. MUST be a pure function with no side effects.
- **View** (`view/`): React components that receive state and dispatch as props/functions. Pure rendering: `(state, dispatch) => JSX`.
- **Effects** (`effects/`): Side effects (API calls, PocketBase queries) that dispatch actions on completion. Effects are the ONLY place for async/impure code.

### 3. Zustand Redux Pattern Rules (MANDATORY)
- Zustand stores MUST use the `redux` middleware from `zustand/middleware`.
- State mutations MUST happen via `dispatch({ type: 'ACTION_TYPE', payload })`.
- NEVER use `set()` directly. All mutations go through the reducer.
- Actions MUST be typed as discriminated unions.
- Reducers MUST be pure functions (no side effects, no API calls inside reducers).
- Side effects go in `effects/` directory — they dispatch actions after async work.

### 4. App Structure Rules
- Every app under `client/apps/` MUST have the same directory structure.
- `theme.ts` is the ONLY file where Mantine styling customization is allowed.
- NO custom CSS files, NO styled-components, NO Tailwind CSS.
- All form validation uses Zod schemas in `schemas/` directory.
- All forms use `@mantine/form` (use-form hook) for form management.
- All PocketBase interaction goes through `lib/pb.ts` using PocketBase JS SDK.
- State modules are in `state/` directory (Model.ts, Actions.ts, Update.ts).
- View modules are in `view/` directory (pure rendering functions).
- Effect modules are in `effects/` directory (side-effect runners).

### 5. Shared Package Rules
- `packages/ui/` - Shared pure presentational Mantine components (no state).
- `packages/store/` - Shared Zustand Redux stores with Elm Architecture pattern.
- `packages/pb-client/` - Shared PocketBase client instance & types.
- `packages/schemas/` - Shared Zod validation schemas.
- Shared packages MUST NOT import from apps.
- Apps CAN import from shared packages.

### 6. Server Rules
- PocketBase runs in Go library mode via `main.go`.
- Binary at `server/pocketbase` is for local development only.
- All database migrations go in `server/migrations/`.
- PocketBase JS SDK is used on client side; Go SDK on server side.

### 7. Infrastructure Rules
- Docker Compose orchestrates all services.
- Client apps are built with Vite and served as static files (Nginx).
- Server runs PocketBase in library mode.
- No external databases - PocketBase handles SQLite internally.

### 8. Forbidden Patterns
- ❌ Using `set()` directly in Zustand stores — use `dispatch()` only
- ❌ Side effects inside reducer/update functions
- ❌ Storing non-serializable data in state (functions, class instances, DOM refs)
- ❌ React Context for state management (use Zustand Redux stores instead)
- ❌ Adding CSS modules, styled-components, or Tailwind
- ❌ Direct PocketBase REST calls without going through `lib/pb.ts`
- ❌ Form state without `@mantine/form`
- ❌ Validation without Zod schemas
- ❌ Using npm/yarn/pnpm instead of Bun
- ❌ Using webpack, CRA, Next.js, or any bundler other than Vite
- ❌ Creating apps outside `client/apps/`
- ❌ Modifying Mantine component internals (use theme.ts only)
- ❌ Mutable state — state transitions must only happen via dispatched actions
- ❌ `useState`/`useReducer` for application-level state (use Zustand stores)
