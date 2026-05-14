# Farmer Onboarding & IoT Installation Workflow

> **Status**: Planned — not yet implemented. This document is the blueprint for the systematic onboarding workflow.
>
> **Last Updated**: 2026-05-14

## Overview

The onboarding flow transforms a coffee farmer from first contact to receiving periodic IoT-based reports about their land. The entire process is designed for **low-tech users** who have LINE installed on their phone — the only app they need.

The flow involves three actors, each with distinct responsibilities:

| Actor | Who | Uses | Tech Level |
|-------|-----|------|------------|
| **Farmer** | Coffee farm owner | LINE app only | Low — smartphone with LINE |
| **Admin** | Platform operator / field technician | Dashboard web app | Medium — web browser |
| **System** | PocketBase backend + cron jobs | Automated | N/A — runs itself |

### Core Principle

> The farmer never needs to install anything, create an account manually, or remember a password. LINE is their identity. Everything else is handled by the admin and the system.

---

## End-to-End Flow at a Glance

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FARMER ONBOARDING                                │
│                                                                         │
│  1. REGISTER          2. ADD FARM         3. INSTALL IoT       4. DONE  │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌────────┐│
│  │  Farmer   │──────→│  Admin   │──────→│  Admin   │──────→│ System ││
│  │ LINE OA  │        │ Dashboard│        │ Dashboard│        │ sends  ││
│  │ register │        │ add farm │        │ install  │        │ reports││
│  │          │        │ asset    │        │ IoT to   │        │ daily/ ││
│  │          │        │          │        │ farm     │        │ event  ││
│  └──────────┘        └──────────┘        └──────────┘        └────────┘│
│       │                    │                    │                  │     │
│   users record        farms record        sensors record    reports +   │
│   role: farmer        owner: farmer       farm: linked       LINE push  │
│   lineUserId          area, variety       status: active                 │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Farmer Registration via LINE Official Account

### What the Farmer Experiences

The farmer's entire registration happens inside LINE — the app they already use daily. There are no external websites, no email verification, no passwords.

```
Farmer's LINE App                          Prime My B System
─────────────────                          ──────────────────

 1. Add LINE Official Account
    "Prime My B" → Add Friend
          │
          ▼
 2. See Welcome Message
    "Welcome to Prime My B!
     Track your coffee farm's
     soil, weather & health.

     Tap 'Register' to get started"
          │
          ▼
 3. Tap "Register" (LIFF Rich Menu)
          │
          ▼
 4. LINE Login Consent Screen
    "Prime My B wants to access
     your profile info"
    → [Allow] / [Deny]
          │                                    │
          ▼                                    ▼
 5. LIFF App Opens                    LINE returns ID Token
    "Welcome, [Name]!                      │
     Your account is being                 ▼
     set up by our team."           POST /api/custom/auth/line
    [Done]                                { idToken }
                                               │
                                               ▼
                                         Find/create user in PocketBase
                                         lineUserId, name, avatar
                                         role: 'farmer'
                                               │
                                               ▼
                                         Return PB auth token
                                               │
                                               ▼
                                         Farmer sees confirmation
                                         in LIFF app
```

### Data State After Step 1

**Created**: `users` record

```json
{
  "id": "usr_abc123",
  "name": "Somchai Prasert",
  "lineUserId": "U1234567890abcdef",
  "role": "farmer",
  "avatarUrl": "https://profile.line-scdn.net/...",
  "email": "line_U1234567890abcdef@prime-my-b.local",
  "farm": null,
  "created": "2026-05-14T08:00:00Z"
}
```

**Onboarding Status**: `registered` — Farmer exists but has no farm or IoT devices. The LIFF app shows a "pending setup" screen: "Our team is setting up your farm monitoring. You'll receive a notification when it's ready."

### LINE Official Account Setup (Human Operator Guide)

This section is for the **human operator** who sets up the LINE Official Account. Follow these steps exactly:

#### A. Create LINE Official Account

1. Download the **LINE Official Account** app from App Store / Google Play
2. Log in with your LINE account (or create a new one for the business)
3. Tap **Create New Account**
4. Fill in:
   - **Account name**: "Prime My B" (or your brand name)
   - **Industry**: Agriculture / Technology
   - **Description**: "Smart IoT monitoring for coffee farms"
5. Upload a **profile icon** (your logo)
6. Upload a **cover image** (coffee farm or IoT device photo)

#### B. Configure Greeting Messages

1. Go to **Home** → **Greeting messages**
2. Enable greeting messages
3. Set the welcome message:

```
Welcome to Prime My B! 🌿

We help coffee farmers monitor their land with smart IoT sensors — soil moisture, temperature, rainfall, and more.

To get started:
👉 Tap "Register" below to create your account

Our team will then set up your farm profile and install sensors. After that, you'll receive daily farm health reports right here in LINE!

Questions? Tap "Contact" to reach our team.
```

4. Add **Quick Reply** buttons: `[Register]` `[Contact]`

#### C. Create LIFF App in LINE Developers Console

1. Go to [LINE Developers Console](https://developers.line.biz/console/)
2. Create a **Provider** (if not existing): "Prime My B"
3. Create a **LINE Login channel**:
   - Channel type: LINE Login
   - Channel name: "Prime My B"
   - Channel description: "Coffee farm IoT monitoring"
   - **Copy the Channel ID** → this is your `LINE_CLIENT_ID`
4. Create a **LIFF app**:
   - Go to LINE Login channel → LIFF tab
   - Click "Add"
   - **LIFF app name**: "Prime My B Farm Monitor"
   - **Size**: Full (tall)
   - **Endpoint URL**: `https://liff.prime-my-b.com` (or your LIFF app URL)
   - **Scope**: `profile`, `openid` (check both)
   - **Copy the LIFF ID** → this is your `LIFF_ID`
5. Under **Messaging API** tab:
   - Issue a **Channel Access Token** (long-lived)
   - Copy it → this is your `LINE_CHANNEL_ACCESS_TOKEN`

#### D. Configure Rich Menu (Farmer-Facing)

1. Go to **LINE Official Account Manager** → **Rich Menu**
2. Create a rich menu with 4 areas:

```
┌──────────────────┬──────────────────┐
│                  │                  │
│   🏠 My Farm     │   📊 Reports     │
│                  │                  │
├──────────────────┼──────────────────┤
│                  │                  │
│   ⚙️ Settings    │   📞 Contact     │
│                  │                  │
└──────────────────┴──────────────────┘
```

3. Map each area:
   - **My Farm** → Opens LIFF app at `/` (shows farm status, sensor readings)
   - **Reports** → Opens LIFF app at `/reports` (daily report history)
   - **Settings** → Opens LIFF app at `/settings` (notification preferences)
   - **Contact** → Opens chat with admin (LINE OA chat)

### Environment Variables Needed

After completing the LINE OA setup above, add these to your `.env`:

```env
# From Step C.3 — LINE Login channel
LINE_CLIENT_ID=1657xxxxxxxxx

# From Step C.4 — LIFF app
LIFF_ID=1657xxxxxxxxx-xxxxxxxx

# From Step C.5 — Messaging API
LINE_CHANNEL_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9...

# Server
PB_URL=http://localhost:8090
```

---

## Step 2: Admin Adds Coffee Farmer Asset (Rai/Land)

### What the Admin Does

After a farmer registers, the admin receives a notification in the Dashboard and sets up the farm asset. This step links a physical piece of land to the farmer's account **with precise geolocation via Google Maps**.

### Admin Flow in Dashboard

```
Admin Dashboard
─────────────────

 1. See new farmer notification
    "New farmer registered: Somchai Prasert"
    → [Set Up Farm]
          │
          ▼
 2. Click "Farms" → "Add Farm"
          │
          ▼
 3. Fill farm details:

    ┌──────────────────────────────────────────────────┐
    │  Add Coffee Farm                                  │
    │                                                    │
    │  Farm Name *                                      │
    │  [Baan Khao Coffee Farm                        ]  │
    │                                                    │
    │  Owner *  (select from registered)                │
    │  [Somchai Prasert ▼]                              │
    │                                                    │
    │  Location *  ─── Google Maps Embedded ───         │
    │  ┌────────────────────────────────────────────┐   │
    │  │                                            │   │
    │  │         📍 Drop pin on map                 │   │
    │  │            or search address               │   │
    │  │                                            │   │
    │  │  [Search: Doi Saket, Chiang Mai      🔍]   │   │
    │  │                                            │   │
    │  │     📍 18.8632, 98.9765                    │   │
    │  │                                            │   │
    │  └────────────────────────────────────────────┘   │
    │  Lat [18.8632]  Lng [98.9765]    (auto-filled)    │
    │  Address [Doi Saket, Chiang Mai]  (auto-filled)   │
    │                                                    │
    │  Farm Boundary (draw on map)                      │
    │  ┌────────────────────────────────────────────┐   │
    │  │  🔲 Draw polygon to outline farm area      │   │
    │  │     (click points on map to define)        │   │
    │  │     [Clear] [Undo]                         │   │
    │  └────────────────────────────────────────────┘   │
    │  Area (rai) *        (auto-calculated from polygon)│
    │  [12                               ]               │
    │                                                    │
    │  Elevation (m)       (auto-fetched from elevation API)│
    │  [950                              ]               │
    │                                                    │
    │  Coffee Variety *                                 │
    │  [Arabica ▼]                                      │
    │  · Arabica                                        │
    │  · Robusta                                        │
    │  · Liberica                                       │
    │  · Mixed                                          │
    │                                                    │
    │  ─── Satellite Preview ───                        │
    │  ┌────────────────────────────────────────────┐   │
    │  │  🛰️ Satellite imagery preview               │   │
    │  │  (auto-loaded from Google Maps satellite)  │   │
    │  │  Shows: vegetation, terrain, boundaries    │   │
    │  └────────────────────────────────────────────┘   │
    │                                                    │
    │  [Create Farm]                                    │
    └──────────────────────────────────────────────────┘
          │
          ▼
 4. Farm created → farmer gets LINE notification:
    "Your farm 'Baan Khao Coffee Farm'
     has been added! Our team will
     install IoT sensors soon."
          │
          ▼
 5. System auto-fetches:
    - Google Maps place ID for the location
    - Elevation from Google Elevation API
    - Initial satellite imagery snapshot
    - Climate zone classification
    - Nearby weather station data
```

### Google Maps Integration — How It Works

The farm registration form embeds a **Google Maps** instance that serves three purposes:

#### 1. Location Pin (Required)
- Admin searches for an address or drags a pin on the map
- `latitude` and `longitude` are auto-filled from the pin position
- `location` (address) is auto-filled via Google Geocoding API
- These coordinates are stored in PocketBase and used for:
  - Rendering farm markers on the Dashboard map overview
  - Fetching satellite imagery
  - Proximity calculations (nearest weather station, nearby farms)
  - Climate zone classification

#### 2. Farm Boundary Polygon (Optional but Recommended)
- Admin draws a polygon on the map to outline the actual farm boundary
- Stored as a GeoJSON `Polygon` in the `farms` collection
- Used for:
  - Auto-calculating `area` in rai (1 rai = 1,600 m²)
  - Overlaying satellite imagery on the exact farm footprint
  - Precision agriculture — matching sensor readings to specific zones
  - Change detection — comparing vegetation health within the boundary over time

#### 3. Satellite Preview (Auto-loaded)
- When coordinates are set, a satellite imagery preview is fetched
- Uses Google Maps Satellite tile layer or Google Earth Engine API
- Shows the admin what the land looks like from above
- Useful for verifying the farm location is correct before saving
- Future: periodic satellite snapshots for vegetation change detection (NDVI)

### Google Maps API Setup

#### Required APIs (enable in Google Cloud Console)

| API | Purpose | Usage |
|-----|---------|-------|
| **Maps JavaScript API** | Embedded map in Dashboard form | Location pin, boundary polygon drawing |
| **Geocoding API** | Address → coordinates (and reverse) | Auto-fill address from pin, auto-fill coordinates from search |
| **Elevation API** | Get elevation for coordinates | Auto-fill elevation field |
| **Maps Static API** | Static satellite/map images | Farm thumbnail in list views, LINE report images |
| **Earth Engine API** | Satellite imagery + NDVI analysis | Vegetation health, change detection (P4+) |

#### Setup Steps

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a project: "Prime My B"
3. Enable the 5 APIs listed above
4. Create credentials → **API Key**
5. Restrict the API key:
   - HTTP referrers: `https://dashboard.prime-my-b.com/*`, `http://localhost:3000/*`
   - API restrictions: select the 5 APIs above
6. Copy the API key → `GOOGLE_MAPS_API_KEY`

#### Environment Variables

```env
# Google Maps
GOOGLE_MAPS_API_KEY=AIzaSy...

# Google Earth Engine (P4+ — optional for now)
GOOGLE_EARTH_ENGINE_KEY=...
```

### Data State After Step 2

**Created**: `farms` record

```json
{
  "id": "farm_xyz789",
  "name": "Baan Khao Coffee Farm",
  "owner": "usr_abc123",
  "location": "Doi Saket, Chiang Mai",
  "latitude": 18.8632,
  "longitude": 98.9765,
  "elevation": 950,
  "area": 12,
  "areaSource": "polygon",
  "coffeeVariety": "Arabica",
  "boundary": {
    "type": "Polygon",
    "coordinates": [
      [
        [98.9750, 18.8645],
        [98.9780, 18.8645],
        [98.9780, 18.8620],
        [98.9750, 18.8620],
        [98.9750, 18.8645]
      ]
    ]
  },
  "climateZone": "tropical_wet_dry",
  "googlePlaceId": "ChIJ...",
  "satelliteImageUrl": "https://maps.googleapis.com/maps/api/staticmap?...",
  "created": "2026-05-14T09:00:00Z"
}
```

**Updated**: `users` record — `farm` field now points to `farm_xyz789`

**Onboarding Status**: `farm_configured` — Farm exists with precise geolocation. The Dashboard now shows this farm on the map overview. The LIFF app shows farm info with "No sensors installed" status.

### Coffee Farm Data Reference

| Field | Type | Required | Source | Description |
|-------|------|----------|--------|-------------|
| name | text | ✅ | Manual | Farm name (given by admin or farmer) |
| owner | relation@users | ✅ | Manual | The farmer who owns this land |
| location | text | ✅ | Google Geocoding | Human-readable address (auto-filled from map pin) |
| latitude | number | ✅ | Google Maps | GPS latitude (from pin drop) |
| longitude | number | ✅ | Google Maps | GPS longitude (from pin drop) |
| elevation | number | ⬜ | Google Elevation API | Meters above sea level (auto-fetched) |
| area | number | ✅ | Polygon calc or manual | Land area in rai (auto-calculated from boundary polygon, or manual entry) |
| areaSource | select | ⬜ | Auto | How area was determined: `polygon`, `manual`, `estimated` |
| coffeeVariety | select | ✅ | Manual | Arabica, Robusta, Liberica, Mixed |
| boundary | json | ⬜ | Google Maps drawing | GeoJSON Polygon — the farm boundary outline |
| climateZone | text | ⬜ | System | Auto-classified from coordinates (e.g., tropical_wet_dry) |
| googlePlaceId | text | ⬜ | Google Places | Google's place ID for rich location data |
| satelliteImageUrl | url | ⬜ | Google Static Maps | Cached satellite image URL for thumbnails |

---

## Step 3: Admin Installs IoT Device

### What the Admin Does

The admin (or field technician) physically installs an IoT device on the farm and registers it in the system. This is the step that connects physical hardware to the digital farm record.

### Admin Flow in Dashboard

```
Admin Dashboard → Farm Detail
─────────────────────────────

 1. Navigate to farm detail page
    "Baan Khao Coffee Farm"
    → [Install IoT Device]
          │
          ▼
 2. Select device from hardware catalog:

    ┌─────────────────────────────────────┐
    │  Install IoT Device                  │
    │                                      │
    │  Device Type *                       │
    │  [Soil Moisture Sensor ▼]            │
    │  · Soil Moisture Sensor              │
    │  · Temperature & Humidity Sensor     │
    │  · Soil pH Sensor                    │
    │  · Light Sensor (PAR)                │
    │  · Rain Gauge                        │
    │  · NPK Sensor                        │
    │                                      │
    │  Device Serial / ID *                │
    │  [SM-2024-001                      ] │
    │                                      │
    │  Installation Location               │
    │  [Plot A - near irrigation ▼]        │
    │                                      │
    │  GPS Pin                             │
    │  Lat [18.8635]  Lng [98.9768]       │
    │                                      │
    │  Installation Date                   │
    │  [2026-05-14]                        │
    │                                      │
    │  [Install & Activate]                │
    └─────────────────────────────────────┘
          │
          ▼
 3. Device created → farmer gets LINE notification:
    "New sensor installed on your farm!
     Soil Moisture Sensor at
     Plot A - near irrigation.
     Readings will appear in
     'My Farm' shortly."
```

### Hardware Catalog Reference

The IoT devices available for installation match the hardware catalog in the IoT Demo app (`src/data/devices.ts`):

| Device | Category | Metrics | Typical Placement |
|--------|----------|---------|-------------------|
| **Soil Moisture Sensor** | soil | Volumetric Water Content (%) | Root zone, 15-30cm depth |
| **Temperature & Humidity Sensor** | environment | Ambient Temp (°C), Relative Humidity (%) | Shaded area, 1.5m height |
| **Soil pH Sensor** | soil | pH Level | Root zone, 10-20cm depth |
| **Light Sensor (PAR)** | light | PAR Intensity (μmol/m²/s) | Canopy level, exposed |
| **Rain Gauge** | water | Daily Rainfall (mm) | Open area, no overhead cover |
| **NPK Sensor** | nutrient | Nitrogen (mg/kg), Phosphorus (mg/kg), Potassium (mg/kg) | Root zone, 15-30cm depth |

### Data State After Step 3

**Created**: `sensors` record

```json
{
  "id": "sens_def456",
  "sensorId": "SM-2024-001",
  "type": "soil_moisture",
  "name": "Soil Moisture Sensor",
  "location": "Plot A - near irrigation",
  "latitude": 18.8635,
  "longitude": 98.9768,
  "status": "active",
  "farm": "farm_xyz789",
  "lastReading": null,
  "installedAt": "2026-05-14T10:00:00Z",
  "created": "2026-05-14T10:00:00Z"
}
```

**Onboarding Status**: `active` — IoT device is installed and collecting data. The farmer is fully onboarded. The LIFF app now shows live sensor data.

### Multiple Device Installation

A farm can have multiple IoT devices installed. The admin repeats Step 3 for each device. A typical Arabica farm might have:

- 2-3 Soil Moisture Sensors (different plots)
- 1 Temperature & Humidity Sensor
- 1 Rain Gauge
- 1 Soil pH Sensor (optional, for periodic checks)
- 1 NPK Sensor (optional, for nutrient monitoring)

---

## Step 4: Farmer Receives Periodic Reports (Automated)

### What the Farmer Experiences

After onboarding is complete, the farmer receives two types of reports — all delivered via LINE push messages. The farmer never needs to open a separate app or website.

### Daily Morning Report

Sent every day at **6:00 AM local time** (farmer's timezone).

```
┌─────────────────────────────────────┐
│  Prime My B                         │
│                                     │
│  🌅 Daily Farm Report               │
│  Baan Khao Coffee Farm              │
│  May 14, 2026                       │
│                                     │
│  ─── Soil Moisture ───              │
│  Plot A: 🌿 42% (Good)             │
│  Plot B: ⚠️ 19% (Low — water!)     │
│                                     │
│  ─── Temperature ───                │
│  🌡️ Avg: 24°C (Normal)             │
│  High: 29°C  Low: 18°C             │
│                                     │
│  ─── Humidity ───                   │
│  💧 68% (Good)                      │
│                                     │
│  ─── Rainfall ───                   │
│  🌧️ 8mm yesterday                  │
│                                     │
│  ─── Soil pH ───                    │
│  ⚗️ 5.8 (Good)                      │
│                                     │
│  ⚠️ 1 Alert:                        │
│  Plot B soil moisture is low.       │
│  Consider irrigation today.         │
│                                     │
│  Tap [My Farm] for details          │
└─────────────────────────────────────┘
```

### Event-Based Alerts

Sent immediately when a threshold is breached. No waiting for the morning report.

```
┌─────────────────────────────────────┐
│  Prime My B                         │
│                                     │
│  🚨 CRITICAL ALERT                  │
│                                     │
│  Soil Moisture - Plot A             │
│  Baan Khao Coffee Farm              │
│                                     │
│  Reading: 10%                       │
│  Threshold: 15%                     │
│                                     │
│  Soil is critically dry.            │
│  Irrigate immediately to prevent    │
│  coffee plant stress.               │
│                                     │
│  Time: May 14, 2:30 PM              │
│                                     │
│  Tap [My Farm] for details          │
└─────────────────────────────────────┘
```

### Alert Thresholds Reference

| Metric | Normal | Warning (Bad) | Critical | Unit |
|--------|--------|---------------|----------|------|
| Soil Moisture | 25-50% | 15-25% | < 15% | % VWC |
| Temperature | 18-28°C | 28-33°C / 15-18°C | > 33°C / < 15°C | °C |
| Humidity | 50-80% | 35-50% / 80-90% | < 35% / > 90% | % RH |
| Soil pH | 5.5-6.5 | 5.0-5.5 / 6.5-7.0 | < 5.0 / > 7.0 | pH |
| PAR Light | 300-900 | 150-300 / 900-1200 | < 150 / > 1200 | μmol/m²/s |
| Rainfall (daily) | 2-20mm | 0.5-2mm / 20-40mm | < 0.5mm / > 40mm | mm |
| Nitrogen | 25-60 mg/kg | 15-25 / 60-80 | < 15 / > 80 | mg/kg |
| Phosphorus | 15-40 mg/kg | 10-15 / 40-60 | < 10 / > 60 | mg/kg |
| Potassium | 80-200 mg/kg | 50-80 / 200-250 | < 50 / > 250 | mg/kg |

### System Architecture for Reports

```
┌──────────────┐     readings      ┌──────────────┐     aggregate     ┌──────────────┐
│  IoT Sensors │ ─────────────────→ │  PocketBase  │ ────────────────→ │  Cron Job    │
│  (hardware)  │  POST readings     │  (store)     │  query 24h data   │  (daily)     │
└──────────────┘                    └──────────────┘                    └──────────────┘
                                                                            │
                                          ┌─────────────────────────────────┘
                                          │
                                          ▼
                                   ┌──────────────┐     push message    ┌──────────────┐
                                   │  Report       │ ─────────────────→ │  LINE        │
                                   │  Generator    │  Messaging API     │  Push        │
                                   └──────────────┘                    └──────────────┘
                                          ▲                                    │
                                          │                                    ▼
                                   ┌──────────────┐                    ┌──────────────┐
                                   │  Alert Engine │ ────────────────→  │  Farmer's    │
                                   │  (real-time)  │  immediate push    │  LINE App    │
                                   └──────────────┘                    └──────────────┘
```

**Daily Report Flow**:
1. Cron job triggers at 6:00 AM (Go goroutine or external cron)
2. Query `sensor_readings` for the past 24 hours, grouped by farm
3. For each farm with an owner, generate the report text
4. Save `reports` record to PocketBase
5. Push the report via LINE Messaging API to the farmer

**Alert Flow**:
1. PocketBase hook `OnRecordAfterCreateRequest("sensor_readings")` fires
2. Check the new reading value against thresholds
3. If threshold breached, create an `alerts` record
4. Immediately push alert via LINE Messaging API to the farmer

### Data State After Step 4 (Ongoing)

**Created daily**: `reports` record

```json
{
  "id": "rpt_ghi012",
  "farm": "farm_xyz789",
  "date": "2026-05-14",
  "type": "daily",
  "summary": "Farm conditions are mostly good. Plot B needs irrigation.",
  "readings": {
    "soil_moisture": { "avg": 30.5, "min": 19, "max": 42, "unit": "%" },
    "temperature": { "avg": 24, "min": 18, "max": 29, "unit": "°C" },
    "humidity": { "avg": 68, "min": 55, "max": 78, "unit": "%" },
    "rainfall": { "total": 8, "unit": "mm" }
  },
  "alerts": ["alert_low001"],
  "created": "2026-05-14T06:00:00Z"
}
```

**Created on alert**: `alerts` record

```json
{
  "id": "alert_low001",
  "sensor": "sens_def456",
  "type": "low_moisture",
  "severity": "critical",
  "message": "Soil moisture is critically low at 10%. Irrigate immediately.",
  "threshold": 15,
  "currentValue": 10,
  "resolved": false,
  "resolvedAt": null,
  "created": "2026-05-14T14:30:00Z"
}
```

---

## Dashboard Analytics — Location, Maps & Satellite

Once farms are registered with coordinates (Step 2), the Dashboard can render rich location-based analytics. This section describes the map views, satellite imagery integration, and location statistics that become available.

### Dashboard Map Overview

The Dashboard's main page features a **full-screen Google Maps** view showing all registered farms as markers. This is the admin's primary interface for understanding the geographic distribution of their coffee farming operations.

```
┌──────────────────────────────────────────────────────────────────────┐
│  Prime My B Dashboard                                    [Admin ▼]  │
├──────────┬───────────────────────────────────────────────────────────┤
│          │                                                           │
│  NAV     │   ┌─────────────────────────────────────────────────┐    │
│          │   │                    GOOGLE MAPS                  │    │
│  Overview│   │                                                 │    │
│  Farms   │   │     🌿 Somchai P.        🌿 Narin K.           │    │
│  Sensors │   │      Arabica 12 rai        Robusta 8 rai       │    │
│  Alerts  │   │      3 sensors             2 sensors           │    │
│  Reports │   │                                                 │    │
│  Maps    │   │              🌿 Wichai S.                       │    │
│          │   │               Arabica 20 rai                    │    │
│          │   │               5 sensors                         │    │
│          │   │                                                 │    │
│          │   │                                                 │    │
│          │   └─────────────────────────────────────────────────┘    │
│          │                                                           │
│          │   ┌─ Summary Cards ──────────────────────────────────┐   │
│          │   │  🏠 3 Farms  │  📡 10 Sensors  │  ⚠️ 1 Alert  │   │
│          │   │  🌡️ 24°C Avg │  💧 38% Soil    │  🌧️ 5mm Rain │   │
│          │   └──────────────────────────────────────────────────┘   │
└──────────┴───────────────────────────────────────────────────────────┘
```

### Map Features

#### Farm Markers
- Each farm appears as a colored marker on the map
- Marker color indicates farm health (green = all sensors normal, yellow = warnings, red = critical alerts)
- Click a marker to see a popup with: farm name, owner, area, sensor count, last alert
- Click "View Farm" in the popup to navigate to the farm detail page

#### Farm Boundary Overlays
- If a farm has a `boundary` polygon, it's rendered as a semi-transparent overlay on the map
- Boundary color matches the farm health status
- Useful for seeing the exact land area at a glance

#### Sensor Pins
- Within a farm boundary, each sensor is shown as a small pin
- Sensor pin color shows its current status (active/offline/alert)
- Hover over a sensor pin to see the latest reading

#### Heatmap Layers (Future — P4+)
- Soil moisture heatmap across all farms
- Temperature heatmap
- NDVI (vegetation health) from satellite data
- Toggle between layers in the map controls

### Satellite Imagery & Analysis

#### Static Satellite Thumbnails
Every farm gets a static satellite image thumbnail stored at registration time. This is used in:
- Farm list view (card thumbnail)
- LINE daily report (embedded image)
- Farm detail page header

Generated via Google Maps Static API:
```
https://maps.googleapis.com/maps/api/staticmap?
  center=18.8632,98.9765
  &zoom=16
  &size=600x400
  &maptype=satellite
  &key=GOOGLE_MAPS_API_KEY
```

#### Satellite View in Farm Detail

The farm detail page shows a full interactive satellite view:

```
┌──────────────────────────────────────────────────────────────────┐
│  Baan Khao Coffee Farm                              [Edit Farm] │
│  Somchai Prasert · Arabica · 12 rai · 950m elevation            │
├──────────────────────────────────────────────────────────────────┤
│                                                                  │
│  ┌── Map/Satellite Toggle ──────────────────────────────────┐   │
│  │  [Map] [Satellite] [NDVI*]                               │   │
│  │                                                           │   │
│  │              🛰️ SATELLITE VIEW                            │   │
│  │                                                           │   │
│  │     ┌────────────────────────────────────┐                │   │
│  │     │                                    │                │   │
│  │     │    Farm boundary (green outline)   │                │   │
│  │     │                                    │                │   │
│  │     │    📍 SM-001   📍 TH-001           │                │   │
│  │     │    📍 PH-001   📍 NP-001           │                │   │
│  │     │                📍 RG-001           │                │   │
│  │     │                                    │                │   │
│  │     └────────────────────────────────────┘                │   │
│  │                                                           │   │
│  │  Last satellite update: May 12, 2026                      │   │
│  │  * NDVI requires Earth Engine API (P4+)                   │   │
│  └───────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ┌── Sensor Readings ────────────────────────────────────────┐   │
│  │  Soil Moisture: 🌿 42% (Good)   Temp: 24°C (Normal)      │   │
│  │  Humidity: 💧 68% (Good)        pH: ⚗️ 5.8 (Good)        │   │
│  │  Rainfall: 🌧️ 5mm              NPK: 35/22/120 mg/kg      │   │
│  └───────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

#### NDVI Vegetation Analysis (P4+ — Earth Engine API)

Once Google Earth Engine API is integrated, the Dashboard can show **Normalized Difference Vegetation Index (NDVI)** overlays on the farm boundary. NDVI uses satellite infrared bands to measure vegetation health:

| NDVI Value | Color | Meaning | Coffee Farm Implication |
|-----------|-------|---------|------------------------|
| 0.6 – 1.0 | Dark green | Dense, healthy vegetation | Optimal coffee canopy cover |
| 0.3 – 0.6 | Light green | Moderate vegetation | Normal growth, some bare soil |
| 0.1 – 0.3 | Yellow | Sparse vegetation | Possible stress, disease, or new planting |
| -1.0 – 0.1 | Red/Brown | Bare soil or water | No vegetation — clearing, harvest, or problem |

**Use cases for coffee farming**:
- Detect pest/disease outbreaks before they're visible from the ground (vegetation turns yellow/red in NDVI before leaves show symptoms)
- Monitor shade tree canopy coverage over coffee plants
- Track seasonal vegetation changes across months
- Compare farm health across multiple farms in different regions
- Historical comparison: "This plot was healthier in May last year vs this year"

**How it works**:
1. System sends farm boundary polygon + date range to Earth Engine API
2. Earth Engine returns NDVI composite image for the area
3. Dashboard renders the NDVI overlay on top of the satellite view
4. Color-coded legend shows vegetation health levels
5. Time slider allows comparing different periods

### Location Statistics

With farm coordinates stored, the Dashboard computes location-based statistics across all farms:

#### Regional Overview
```
┌──────────────────────────────────────────────────────────────┐
│  Location Analytics                                          │
│                                                              │
│  ┌── Farm Distribution by Region ────────────────────────┐  │
│  │                                                        │  │
│  │  Chiang Mai    ████████████████████  8 farms  96 rai   │  │
│  │  Chiang Rai    ██████████           4 farms  42 rai    │  │
│  │  Mae Hong Son  ██████               2 farms  18 rai    │  │
│  │  Lampang       ████                 1 farm   10 rai    │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌── Elevation Distribution ─────────────────────────────┐  │
│  │                                                        │  │
│  │  600-800m    ████████████   5 farms                   │  │
│  │  800-1000m   ██████████████████  7 farms              │  │
│  │  1000-1200m  ████████       3 farms                   │  │
│  │  1200m+      ████           1 farm                    │  │
│  │  (Arabica optimal: 800-1200m)                         │  │
│  │                                                        │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌── Climate Zone Summary ───────────────────────────────┐  │
│  │  Tropical Wet-Dry:  10 farms                          │  │
│  │  Tropical Monsoon:   3 farms                          │  │
│  │  Subtropical:        2 farms                          │  │
│  │  Highland:           1 farm                           │  │
│  └────────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌── Regional Sensor Health ─────────────────────────────┐  │
│  │  Chiang Mai:   24/26 sensors online (92%)             │  │
│  │  Chiang Rai:   10/10 sensors online (100%)            │  │
│  │  Mae Hong Son: 4/6 sensors online (67%) ⚠️            │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
```

#### Computed Location Metrics

| Metric | Computation | Use Case |
|--------|------------|----------|
| **Region** | Reverse geocode lat/lng → province/district | Regional grouping, report filtering |
| **Climate zone** | Koppen classification from coordinates | Predict ideal coffee varieties, expected yields |
| **Elevation** | Google Elevation API at registration | Quality classification, frost risk assessment |
| **Nearest weather station** | Distance calculation from farm to known stations | Supplemental weather data for readings |
| **Farm density** | Count farms within 10km radius | Market analysis, service coverage planning |
| **Average distance between farms** | Haversine distance between all pairs | Logistics planning for IoT installation visits |
| **Total monitored area** | Sum of all farm areas | Business metrics, coverage reporting |

#### Auto-Enrichment on Farm Creation

When a farm is created (Step 2), the server automatically enriches the record with location intelligence:

```go
// server/main.go — After farm creation hook
app.OnRecordAfterCreateRequest("farms").Add(func(e *core.RecordCreateEvent) error {
    lat := e.Record.GetFloat("latitude")
    lng := e.Record.GetFloat("longitude")

    // 1. Reverse geocode for region
    region := reverseGeocode(lat, lng)
    e.Record.Set("climateZone", classifyClimate(lat, lng))

    // 2. Fetch elevation
    elevation := fetchElevation(lat, lng)
    e.Record.Set("elevation", elevation)

    // 3. Generate satellite thumbnail URL
    thumbnailURL := fmt.Sprintf(
        "https://maps.googleapis.com/maps/api/staticmap?center=%f,%f&zoom=16&size=600x400&maptype=satellite&key=%s",
        lat, lng, os.Getenv("GOOGLE_MAPS_API_KEY"),
    )
    e.Record.Set("satelliteImageUrl", thumbnailURL)

    // 4. Calculate area from boundary polygon (if provided)
    boundary := e.Record.Get("boundary")
    if boundary != nil {
        areaRai := calculatePolygonArea(boundary) / 1600.0
        e.Record.Set("area", areaRai)
        e.Record.Set("areaSource", "polygon")
    }

    return e.Next()
})
```

### Environment Variables Summary (All Steps)

```env
# ─── PocketBase ───
PB_DATA_DIR=./pb_data
PB_ADMIN_EMAIL=admin@example.com
PB_ADMIN_PASSWORD=changeme123
PB_PORT=8090

# ─── LINE Platform ───
LINE_CLIENT_ID=1657xxxxxxxxx
LIFF_ID=1657xxxxxxxxx-xxxxxxxx
LINE_CHANNEL_ACCESS_TOKEN=eyJhbGciOiJIUzI1NiJ9...

# ─── Google Maps ───
GOOGLE_MAPS_API_KEY=AIzaSy...
GOOGLE_EARTH_ENGINE_KEY=...        # P4+ only

# ─── Client Apps ───
VITE_PB_URL=http://localhost:8090
VITE_GOOGLE_MAPS_KEY=AIzaSy...     # Same key, restricted to app domains
VITE_LIFF_ID=1657xxxxxxxxx-xxxxxxxx
```

---

## Onboarding Status Tracking

Each farmer's onboarding progress is tracked via their user record and related collections:

| Status | Condition | Farmer Sees in LIFF |
|--------|-----------|---------------------|
| `unregistered` | No user record exists | LINE OA welcome message + Register button |
| `registered` | User exists, `farm` is null | "Your account is being set up. Our team will add your farm soon." |
| `farm_configured` | Farm exists, no sensors | Farm info card + "No sensors installed yet. Our team will install them soon." |
| `active` | Farm + sensors exist | Full LIFF app — live readings, reports, alerts |
| `inactive` | Sensors `status: 'offline'` for >24h | "Sensor offline" warning + contact admin prompt |

### Dashboard Admin View

The admin Dashboard shows a Kanban-style onboarding board:

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  Registered  │  Farm Added  │  IoT Active  │  Inactive    │
│  (1)         │  (2)         │  (3)         │  (0)         │
├──────────────┼──────────────┼──────────────┼──────────────┤
│ Somchai P.   │ Narin K.     │ Wichai S.    │              │
│ "2h ago"     │ "1d ago"     │ "5d ago"     │              │
│ [Add Farm]   │ [Install IoT]│ [View Farm]  │              │
└──────────────┴──────────────┴──────────────┴──────────────┘
```

---

## Error Recovery & Edge Cases

### Farmer Tries to Register Twice

- System checks if `lineUserId` already exists
- If found, log in the existing user (don't create duplicate)
- Show: "Welcome back, [Name]! Your account is already set up."

### Admin Assigns Farm to Wrong Farmer

- Admin can reassign farm owner from Dashboard
- Edit farm → change `owner` field
- Previous farmer gets LINE notification: "Farm [name] has been reassigned."
- New farmer gets LINE notification: "A farm has been assigned to you!"

### IoT Device Goes Offline

- If no reading received for >2 hours, sensor `status` → `offline`
- Alert created with severity `warning`
- Admin sees offline sensor in Dashboard
- Farmer gets LINE notification: "Sensor [name] appears to be offline. Our team has been notified."

### Sensor Sends Abnormal Readings

- If a reading is outside physically possible range (e.g., soil moisture > 100% or < 0%), mark as `suspicious`
- Don't trigger alerts for suspicious readings
- Log for admin review: "Sensor SM-2024-001 sent suspicious reading: -5% moisture"

### Farmer Unfriends LINE OA

- User record remains (don't delete)
- Stop sending push messages (will fail anyway)
- Mark user `status: 'unsubscribed'`
- Admin sees in Dashboard and can follow up

---

## Data Model Reference

### Collections (PocketBase)

| Collection | Key Fields | Relations | Created At |
|-----------|-----------|-----------|------------|
| `users` | name, lineUserId, role, avatarUrl, status | → farms | Step 1 |
| `farms` | name, owner, location, lat, lng, elevation, area, coffeeVariety | → sensors | Step 2 |
| `sensors` | sensorId, type, name, location, lat, lng, status, farm, installedAt | → sensor_readings | Step 3 |
| `sensor_readings` | sensor, type, value, unit, timestamp, metadata | — | Step 3+ (ongoing) |
| `alerts` | sensor, type, severity, message, threshold, currentValue, resolved, resolvedAt | — | Step 4+ (automatic) |
| `reports` | farm, date, type, summary, readings (JSON), alerts (JSON) | → farms | Step 4+ (daily) |

### Entity Relationship Diagram

```
users (1) ──────→ (N) farms
                         │
                         ▼
farms (1) ──────→ (N) sensors
                         │
                         ▼
sensors (1) ────→ (N) sensor_readings
                         │
                         ▼
sensors (1) ────→ (N) alerts

farms (1) ──────→ (N) reports
```

---

## Implementation Roadmap

| Phase | Feature | Status | Depends On |
|-------|---------|--------|------------|
| **P0** | IoT Demo — hardware catalog + manual metric activation | ✅ Done | — |
| **P1** | LINE Login OAuth2 in PocketBase (`server/main.go`) | Planned | LINE_CLIENT_ID |
| **P1** | LIFF App — LINE login flow, farmer profile, "My Farm" view | Planned | P1 LINE Login |
| **P1** | LINE OA setup — rich menu, greeting messages, LIFF endpoint | Planned | LIFF_ID |
| **P2** | Dashboard — Farm CRUD, Sensor CRUD, Farmer management | Planned | P1 |
| **P2** | Google Maps embedded — farm location pin + boundary polygon in "Add Farm" form | Planned | GOOGLE_MAPS_API_KEY |
| **P2** | Dashboard map overview — all farms on interactive Google Maps with markers | Planned | P2 Google Maps |
| **P2** | Farm auto-enrichment — reverse geocode, elevation, satellite thumbnail on farm creation | Planned | P2 Google Maps |
| **P2** | IoT Device Installation flow in Dashboard | Planned | P2 Dashboard |
| **P2** | Onboarding status tracking + admin Kanban view | Planned | P2 Dashboard |
| **P3** | Alert engine — threshold detection on `sensor_readings` hook | Planned | P2 |
| **P3** | LINE Messaging API — push notifications (daily + alerts) | Planned | LINE_CHANNEL_ACCESS_TOKEN |
| **P3** | Daily report generator — cron job + aggregation | Planned | P3 Alert engine |
| **P3** | Satellite imagery in farm detail — toggle Map/Satellite view with sensor pins | Planned | P2 Google Maps |
| **P3** | Location statistics — regional distribution, elevation, climate zone analytics | Planned | P2 Google Maps |
| **P4** | Real-time dashboard with PocketBase SSE subscriptions | Planned | P2 |
| **P4** | Historical data charts and analytics | Planned | P4 |
| **P4** | Google Earth Engine NDVI — vegetation health overlays on farm boundaries | Planned | GOOGLE_EARTH_ENGINE_KEY |
| **P4** | Heatmap layers — soil moisture, temperature across all farms | Planned | P4 |
| **P5** | QR code IoT installation (scan → auto-provision) | Planned | P2 |
| **P5** | LORAWAN/WiFi auto-provisioning | Planned | P5 + Hardware |

---

## Future: Automated IoT Installation (Phase 5+)

Eventually, the physical IoT installation could be streamlined with QR code scanning:

```
Admin → Dashboard → "Scan QR" → Camera opens → Scan device QR
                                                    │
                                                    ▼
                                          Auto-fill: serial, type, model
                                                    │
                                                    ▼
                                          Admin drops pin on map
                                                    │
                                                    ▼
                                          Device auto-provisions via WiFi/LORAWAN
                                                    │
                                                    ▼
                                          System creates sensor record + activates
```

This eliminates manual data entry, reduces transcription errors, and speeds up field installation from ~5 minutes to ~30 seconds per device.
