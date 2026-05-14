# Prime My Brain - Frontend Skill

## Purpose
This skill enforces frontend development standards for all web apps in the Prime My Brain monorepo.

## Tech Stack (Mandatory)

| Technology | Version | Purpose |
|---|---|---|
| React | 18+ | UI Framework |
| Mantine UI | 7.x | Component Library |
| @mantine/form | 7.x | Form management (use-form hook) |
| Zustand | 4.x+ | State management |
| Zod | 3.x+ | Schema validation |
| PocketBase JS SDK | 0.21+ | Database interaction |
| Vite | 5.x+ | Build tool / SSG |
| TypeScript | 5.x+ | Type safety |

## Mantine UI Rules (CRITICAL)

### Theme-Only Customization
ALL visual customization MUST be done through the Mantine theme configuration in `theme.ts`. This is the ONLY acceptable way to modify Mantine's appearance.

```typescript
// src/theme.ts - THE ONLY PLACE FOR STYLING
import { createTheme, virtualColor } from '@mantine/core';

export const theme = createTheme({
  primaryColor: 'custom-primary',
  colors: {
    'custom-primary': [
      '#f0f5ff', '#dce8ff', '#b9d1ff', '#8fb8ff',
      '#5e9cff', '#3a82ff', '#2070ff', '#0d5eff',
      '#0049eb', '#0036c7',
    ],
  },
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: { fontFamily: 'Inter, system-ui, sans-serif' },
  defaultRadius: 'md',
  components: {
    Button: {
      defaultProps: { size: 'sm' },
    },
  },
});
```

### Forbidden Styling Approaches
- ❌ CSS modules (`*.module.css`)
- ❌ styled-components / emotion
- ❌ Tailwind CSS
- ❌ Inline style props for theming (use Mantine props)
- ❌ Overriding Mantine component internal CSS classes
- ❌ Custom CSS files for component styling

### Acceptable Style Overrides (via theme only)
- `createTheme()` - colors, fonts, spacing, radius, shadows
- `components` key in theme - default props for Mantine components
- `virtualColor()` - light/dark mode color variants
- CSS variables set by MantineProvider

## Component Usage Rules

### Layout Components
- Use `AppShell` for app layout (header, navbar, aside, footer)
- Use `Container` for centered content
- Use `Grid` / `SimpleGrid` for layouts
- Use `Group` / `Stack` / `Flex` for flex composition

### Data Display
- Use `Table` for tabular data
- Use `Card` for content cards
- Use `Badge` / `Chip` for tags
- Use `RingProgress` / `Progress` for indicators
- Use `Timeline` for chronological data

### Data Visualization (Dashboard App)
- Prefer Mantine components for UI chrome
- Use `@mantine/charts` (Recharts wrapper) for charts
- Chart theming inherits from Mantine theme

### Forms
- ALWAYS use `@mantine/form` hook for form state
- ALWAYS use Zod for validation via `zodResolver`
- NEVER use React Context for form state

```typescript
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';

const schema = z.object({
  sensorId: z.string().min(1, 'Sensor ID is required'),
  temperature: z.number().min(-40).max(85),
  humidity: z.number().min(0).max(100),
});

type FormValues = z.infer<typeof schema>;

function SensorForm() {
  const form = useForm<FormValues>({
    validate: zodResolver(schema),
    initialValues: { sensorId: '', temperature: 0, humidity: 0 },
  });

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput label="Sensor ID" {...form.getInputProps('sensorId')} />
      <NumberInput label="Temperature" {...form.getInputProps('temperature')} />
      <NumberInput label="Humidity" {...form.getInputProps('humidity')} />
      <Button type="submit">Submit</Button>
    </form>
  );
}
```

## State Management (Zustand)

### Store Structure
Each app has its own stores. Shared stores go in `packages/store/`.

```typescript
// src/stores/sensorStore.ts
import { create } from 'zustand';

interface SensorState {
  sensors: Sensor[];
  loading: boolean;
  error: string | null;
  fetchSensors: () => Promise<void>;
}

export const useSensorStore = create<SensorState>((set) => ({
  sensors: [],
  loading: false,
  error: null,
  fetchSensors: async () => {
    set({ loading: true });
    try {
      const records = await pb.collection('sensors').getFullList();
      set({ sensors: records, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },
}));
```

### Zustand Rules
- One store per domain concept (sensor, user, dashboard, etc.)
- Use `create` from zustand - no middleware unless needed
- Store actions should interact with PocketBase through `lib/pb.ts`
- NEVER use React Context as a state container
- Shared stores in `packages/store/` can be imported by any app

## PocketBase Client Setup

```typescript
// src/lib/pb.ts
import PocketBase from 'pocketbase';

export const pb = new PocketBase(import.meta.env.VITE_PB_URL || 'http://localhost:8090');

// Auto-update auth store
pb.authStore.onChange((token, record) => {
  // Sync with zustand if needed
});
```

### PocketBase Interaction Rules
- ALL PocketBase calls go through the shared `pb` instance in `lib/pb.ts`
- Use PocketBase JS SDK methods - never raw fetch/axios to PB API
- Real-time subscriptions via `pb.collection().subscribe()`
- Auth via `pb.collection('users').authWithPassword()`
- File uploads via `pb.collection().create(formData)`

## Zod Schema Rules

```typescript
// src/schemas/sensor.ts
import { z } from 'zod';

export const sensorSchema = z.object({
  id: z.string().optional(),
  sensorId: z.string().min(1),
  type: z.enum(['temperature', 'humidity', 'soil_moisture', 'light', 'ph', 'rainfall', 'wind', 'npk']),
  value: z.number(),
  unit: z.string(),
  timestamp: z.date().default(() => new Date()),
  location: z.string().optional(),
});

export type Sensor = z.infer<typeof sensorSchema>;
```

- All schemas in `src/schemas/` directory
- Shared schemas in `packages/schemas/`
- ALWAYS derive TypeScript types from Zod schemas using `z.infer<>`
- NEVER define types separately from schemas

## App-Specific Conventions

### Dashboard App (`apps/dashboard`)
- Focus: Analytics, data visualization, sensor monitoring
- Charts: Use `@mantine/charts` for Recharts integration
- Layout: `AppShell` with sidebar navigation
- Pages: Overview, Sensors, Analytics, Alerts, Settings

### LIFF App (`apps/liff-app`)
- Focus: LINE LIFF integration, farmer-facing interface
- Must include `@line/liff` SDK
- Mobile-first responsive design
- Pages: Home, Sensor Data, Alerts, Profile

### IoT Demo App (`apps/iot-demo`)
- Focus: Generate/insert demo IoT data for dashboard testing
- Simulates sensor data streams
- Form-heavy for manual data entry
- Pages: Data Entry, Batch Generator, Simulator, Status
