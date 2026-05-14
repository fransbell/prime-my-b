# Prime My Brain - Backend Skill

## Purpose
This skill enforces backend development standards for the Prime My Brain project, centered around PocketBase in Go library mode.

## Tech Stack

| Technology | Purpose |
|---|---|
| PocketBase | Backend-as-a-Service (BaaS) |
| Go | Server runtime (PocketBase library mode) |
| PocketBase JS SDK | Client-side database interaction |

## PocketBase in Library Mode

### Main Entry Point
The server runs PocketBase as a Go library, allowing custom routes, hooks, and middleware.

```go
// server/main.go
package main

import (
    "log"
    "os"

    "github.com/pocketbase/pocketbase"
    "github.com/pocketbase/pocketbase/core"
    "github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
    app := pocketbase.NewWithConfig(pocketbase.Config{
        DefaultDataDir: os.Getenv("PB_DATA_DIR"),
    })

    // Register migrations
    migratecmd.MustRegister(app, migratecmd.Config{
        Dir:         "migrations",
        Automigrate: true,
    })

    // Register custom hooks
    app.OnRecordAfterCreateRequest().Add(func(e *core.RecordCreateEvent) error {
        // Post-create logic
        return e.Next()
    })

    // Register custom API routes
    app.OnServe().BindFunc(func(se *core.ServeEvent) error {
        se.Router.GET("/api/custom/health", func(e *core.RequestEvent) error {
            return e.JSON(200, map[string]bool{"ok": true})
        })
        return se.Next()
    })

    if err := app.Start(); err != nil {
        log.Fatal(err)
    }
}
```

### Server Directory Structure
```
server/
├── main.go              # Entry point - PocketBase library mode
├── go.mod               # Go module definition
├── go.sum               # Go dependencies lock
├── pocketbase           # Pre-built binary (for quick local dev)
├── migrations/          # Auto & manual migrations
│   └── 001_init.go
├── pb_data/             # Local PocketBase data (gitignored)
└── pb_public/           # Static files served by PocketBase (optional)
```

## PocketBase Data Collections

### Core Collections

#### `sensors`
```json
{
  "sensorId": "text",
  "type": "select",
  "name": "text",
  "location": "text",
  "latitude": "number",
  "longitude": "number",
  "status": "select",
  "lastReading": "date",
  "created": "date",
  "updated": "date"
}
```

#### `sensor_readings`
```json
{
  "sensor": "relation@sensors",
  "type": "select",
  "value": "number",
  "unit": "text",
  "timestamp": "date",
  "metadata": "json",
  "created": "date"
}
```

#### `alerts`
```json
{
  "sensor": "relation@sensors",
  "type": "select",
  "severity": "select",
  "message": "text",
  "threshold": "number",
  "currentValue": "number",
  "resolved": "bool",
  "resolvedAt": "date",
  "created": "date"
}
```

#### `farms`
```json
{
  "name": "text",
  "owner": "relation@users",
  "location": "text",
  "latitude": "number",
  "longitude": "number",
  "elevation": "number",
  "area": "number",
  "coffeeVariety": "text",
  "created": "date",
  "updated": "date"
}
```

#### `users` (built-in)
Extended with:
```json
{
  "name": "text",
  "lineUserId": "text",
  "role": "select",
  "farm": "relation@farms"
}
```

## Custom Hooks & Middleware

### Rules
- All custom hooks in `main.go` or split into `hooks/` package
- Validate data with Go logic before PocketBase operations
- Use PocketBase's built-in auth - don't roll your own
- Real-time subscriptions are handled by PocketBase SSE out of the box

### IoT Data Ingestion Hook
```go
// Validate and process incoming sensor data
app.OnRecordBeforeCreateRequest("sensor_readings").Add(func(e *core.RecordCreateEvent) error {
    // Validate sensor exists
    // Update sensor's lastReading timestamp
    // Check thresholds and create alerts if needed
    return e.Next()
})
```

## LINE Login OAuth2 Flow (CRITICAL)

The LIFF app uses LINE Login as the sole authentication method. No email/password login for farmers.

### Architecture

```
┌──────────┐   1. LINE Login    ┌──────────┐   2. ID Token    ┌──────────────┐
│  LIFF    │ ─────────────────→ │  LINE    │ ───────────────→ │  PocketBase  │
│  App     │   (liff.login())   │  Server  │   POST /auth/line│  (main.go)   │
└──────────┘                    └──────────┘                   └──────────────┘
      ↑                                                              │
      │                     3. PB Auth Token                         │
      └──────────────────────────────────────────────────────────────┘
                                     │
                            ┌────────▼────────┐
                            │  LINE Verify    │
                            │  API            │
                            │  (api.line.me)  │
                            └─────────────────┘
```

### Flow (Step by Step)

1. **LIFF Init** — `liff.init({ liffId })` initializes the LIFF SDK
2. **LINE Login** — If not logged in, `liff.login()` redirects to LINE consent screen
3. **Get ID Token** — `liff.getIDToken()` returns a JWT from LINE
4. **Verify with PocketBase** — `POST /api/custom/auth/line { idToken }`
5. **Server verifies** — PocketBase calls LINE's verification API (`https://api.line.me/oauth2/v2.1/verify`)
6. **Find/create user** — Look up user by `lineUserId`, create if new
7. **Return PB token** — Server returns PocketBase auth token
8. **Client saves** — `pb.authStore.save(token, record)` enables all subsequent API calls

### Custom Auth Endpoint

```
POST /api/custom/auth/line
Content-Type: application/json

Request:  { "idToken": "<LINE ID token from LIFF>" }
Response: { "token": "<PB auth token>", "record": { "id", "name", "lineUserId", "role" } }
```

### LINE Client ID

Only `LINE_CLIENT_ID` is needed on the server. This is the LINE Login channel ID from the LINE Developers Console. The server uses it to:
- Verify the ID token was issued for our channel (`aud` claim must match)
- Call LINE's verification API to validate the token signature

No client secret is needed — we use the ID token verification endpoint, not the authorization code flow.

### User Schema (Extended)

```json
{
  "name": "text",
  "lineUserId": "text",
  "role": "select [admin, farmer, viewer]",
  "avatarUrl": "url",
  "farm": "relation@farms"
}
```

- `lineUserId` is the unique LINE user ID (`sub` claim in the ID token)
- `role` defaults to `farmer` for LINE users
- `avatarUrl` is updated from LINE profile picture on each login
- Email field is set to `line_{userId}@prime-my-brain.local` if LINE email is not available

### Rules
- ❌ NEVER implement your own OAuth2 code exchange — use LIFF's ID token instead
- ❌ NEVER store LINE access tokens in PocketBase — only store `lineUserId`
- ❌ NEVER skip server-side ID token verification
- ✅ ALWAYS verify the `aud` claim matches your `LINE_CLIENT_ID`
- ✅ ALWAYS check token expiration (`exp` claim)
- ✅ ALWAYS update user profile (name, avatar) on each login from LINE data
- ✅ ALWAYS set `role` to `farmer` for new LINE users

## Environment Variables
```env
PB_DATA_DIR=./pb_data
PB_ADMIN_EMAIL=admin@example.com
PB_ADMIN_PASSWORD=changeme123
PB_PORT=8090
LINE_CLIENT_ID=your-line-channel-id
LIFF_ID=your-liff-id
```

## API Endpoints (PocketBase Built-in)
PocketBase provides these out of the box:
- `GET/POST/PUT/DELETE /api/collections/:collection/records`
- `GET /api/collections/:collection/records/:id`
- `POST /api/collections/auth-with-password`
- `GET /api/collections/auth-refresh`
- Real-time via `/api/realtime`

Custom endpoints:
- `GET /api/custom/health` - Health check
- `POST /api/custom/auth/line` - LINE Login authentication (ID token → PB token)
- `GET /api/custom/dashboard/summary` - Aggregated dashboard data
- `POST /api/custom/sensor/batch` - Batch sensor data ingestion

## PocketBase SDK Usage (Client-Side)

### Connection
```typescript
import PocketBase from 'pocketbase';
const pb = new PocketBase('http://localhost:8090');
```

### CRUD Operations
```typescript
// Create
const record = await pb.collection('sensor_readings').create({
  sensor: 'SENSOR_001',
  type: 'temperature',
  value: 25.5,
  unit: 'celsius',
  timestamp: new Date().toISOString(),
});

// Read
const sensor = await pb.collection('sensors').getOne('SENSOR_001', {
  expand: 'farm',
});

// List with filters
const readings = await pb.collection('sensor_readings').getList(1, 50, {
  filter: `sensor="SENSOR_001" && timestamp >= "${since}"`,
  sort: '-timestamp',
});

// Update
await pb.collection('sensors').update('SENSOR_001', { status: 'active' });

// Delete
await pb.collection('sensor_readings').delete('RECORD_ID');
```

### Real-time Subscriptions
```typescript
await pb.collection('sensor_readings').subscribe('*', (e) => {
  if (e.action === 'create') {
    // New reading received
    useSensorStore.getState().addReading(e.record);
  }
});
```

### Authentication

#### LINE Login (LIFF App — Primary Method)
```typescript
// 1. Initialize LIFF
await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });

// 2. Login with LINE (if not already logged in)
if (!liff.isLoggedIn()) {
  liff.login(); // Redirects to LINE consent screen
}

// 3. Get ID token and verify with PocketBase
const idToken = liff.getIDToken();
const response = await fetch(`${pb.baseUrl}/api/custom/auth/line`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ idToken }),
});
const { token, record } = await response.json();

// 4. Save PocketBase auth token
pb.authStore.save(token, record);
```

#### Email/Password (Admin Only — Dashboard App)
```typescript
const authData = await pb.collection('users').authWithPassword('admin@example.com', 'password');
```

## Migration Strategy
1. Use PocketBase auto-migrate during development
2. Generate migration files: `go run main.go migrate create`
3. Apply migrations: `go run main.go migrate up`
4. Migrations are version-controlled in `server/migrations/`
