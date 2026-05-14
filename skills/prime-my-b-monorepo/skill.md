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
│   │   │   ├── index.html
│   │   │   ├── vite.config.ts
│   │   │   ├── tsconfig.json
│   │   │   └── src/
│   │   │       ├── main.tsx
│   │   │       ├── App.tsx
│   │   │       ├── theme.ts        # Mantine theme config (ONLY place for styling)
│   │   │       ├── stores/         # Zustand stores
│   │   │       ├── components/     # Shared components
│   │   │       ├── pages/          # Route pages
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
│   │   │       ├── stores/
│   │   │       ├── components/
│   │   │       ├── pages/
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
│   │           ├── stores/
│   │           ├── components/
│   │           ├── pages/
│   │           ├── hooks/
│   │           ├── lib/
│   │           │   └── pb.ts
│   │           ├── schemas/
│   │           └── types/
│   └── packages/
│       ├── ui/                     # Shared UI components
│       │   ├── package.json
│       │   └── src/
│       ├── store/                  # Shared Zustand stores
│       │   ├── package.json
│       │   └── src/
│       ├── pb-client/             # Shared PocketBase client
│       │   ├── package.json
│       │   └── src/
│       │       └── index.ts
│       └── schemas/               # Shared Zod schemas
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
│   ├── Dockerfile.client            # Multi-stage build for client apps
│   └── Dockerfile.server            # Build for Go PocketBase server
├── 00-Home/                         # Obsidian knowledge base (existing)
├── 01-IoT-Hardware/                 # (existing)
├── ...                              # (existing docs)
└── .gitignore
```

## Enforcement Rules

### 1. Client Monorepo Rules
- **Package Manager**: Bun ONLY. Never use npm, yarn, or pnpm.
- **Build System**: Turborepo for monorepo task orchestration.
- **Static Site Generation**: All apps use Vite for SSG/SPA builds.
- **Workspace Protocol**: Use `workspace:*` for internal package references.
- **Node Version**: Must match `.nvmrc` (Node 20 LTS).

### 2. App Structure Rules
- Every app under `client/apps/` MUST have the same directory structure.
- `theme.ts` is the ONLY file where Mantine styling customization is allowed.
- NO custom CSS files, NO styled-components, NO Tailwind CSS.
- All form validation uses Zod schemas in `schemas/` directory.
- All forms use `@mantine/form` (use-form hook) for form management.
- All state management uses Zustand stores in `stores/` directory.
- All PocketBase interaction goes through `lib/pb.ts` using PocketBase JS SDK.

### 3. Shared Package Rules
- `packages/ui/` - Shared Mantine components (theme-aware only).
- `packages/store/` - Shared Zustand store slices.
- `packages/pb-client/` - Shared PocketBase client instance & types.
- `packages/schemas/` - Shared Zod validation schemas.
- Shared packages MUST NOT import from apps.
- Apps CAN import from shared packages.

### 4. Server Rules
- PocketBase runs in Go library mode via `main.go`.
- Binary at `server/pocketbase` is for local development only.
- All database migrations go in `server/migrations/`.
- PocketBase JS SDK is used on client side; Go SDK on server side.

### 5. Infrastructure Rules
- Docker Compose orchestrates all services.
- Client apps are served as static files (Nginx/Caddy).
- Server runs PocketBase in library mode.
- No external databases - PocketBase handles SQLite internally.

### 6. Forbidden Patterns
- ❌ Adding CSS modules, styled-components, or Tailwind
- ❌ Direct PocketBase REST calls without going through `lib/pb.ts`
- ❌ React Context for state management (use Zustand instead)
- ❌ Form state without `@mantine/form`
- ❌ Validation without Zod schemas
- ❌ Using npm/yarn/pnpm instead of Bun
- ❌ Creating apps outside `client/apps/`
- ❌ Modifying Mantine component internals (use theme.ts only)
