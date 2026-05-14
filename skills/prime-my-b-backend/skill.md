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

## Environment Variables
```env
PB_DATA_DIR=./pb_data
PB_ADMIN_EMAIL=admin@example.com
PB_ADMIN_PASSWORD=changeme123
PB_PORT=8090
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
```typescript
// Email/password auth
const authData = await pb.collection('users').authWithPassword('user@example.com', 'password');

// LINE LIFF auth (custom)
const liffProfile = await liff.getProfile();
// Verify with backend, then set auth
pb.authStore.save(authData.token, authData.record);
```

## Migration Strategy
1. Use PocketBase auto-migrate during development
2. Generate migration files: `go run main.go migrate create`
3. Apply migrations: `go run main.go migrate up`
4. Migrations are version-controlled in `server/migrations/`
