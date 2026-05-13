---
topic: IoT Data Logging & Storage
phase: 1
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [data-logging, storage, mqtt, lora, cloud, influxdb, esp32, thailand]
related: [Microcontroller-Comparison, Communication-Modules, Power-Solutions, Sensor-Metrics-Thresholds]
---

# IoT Data Logging & Storage

> **Summary**: Sensor data must flow reliably from remote coffee farm nodes through LoRa to a gateway, then onward to persistent cloud or local storage — even when the rainy season knocks out connectivity for days. This guide covers local SD card and flash logging on ESP32, LoRa payload optimization (242-byte limit), cloud storage options with THB cost comparisons, offline-first design for Northern Thailand's connectivity realities, and data integrity mechanisms for a 5–10 rai farm deployment.

---

## Overview

Data logging and storage is the backbone of any IoT monitoring system. Sensors generate readings, but those readings are worthless if they are lost before reaching a farmer's dashboard, corrupted in transit, or deleted before they can inform decisions. For coffee farms in Northern Thailand, the data pipeline faces unique challenges: remote mountainous terrain with spotty connectivity, a monsoon season that can knock out power and internet for days, and farmers who need both real-time alerts and historical trend analysis to make agronomic decisions. The system must be designed as **offline-first** — every sensor node must be capable of storing data locally during connectivity outages and automatically syncing when the link is restored. The architecture spans three tiers: on-node storage (ESP32 flash or SD card), gateway aggregation (Raspberry Pi with local InfluxDB), and cloud persistence (MQTT to AWS IoT, Google Cloud IoT, or self-hosted servers). Each tier serves a distinct purpose and has different cost, capacity, and reliability trade-offs that this document explores in depth.

Northern Thailand's coffee-growing provinces — Chiang Mai, Chiang Rai, Mae Hong Son, Nan, and Lampang — present a connectivity landscape where WiFi may exist at the farmhouse but never reaches the far corners of a 10-rai hillside plot, 4G LTE coverage is available along roads but drops in valleys and ridge interiors, and LoRa on the AS923 band provides the only reliable long-range link from sensor node to gateway. During the rainy season (May–October), tropical storms can cause power outages lasting 3–7 days, and 4G cell towers may lose backhaul connectivity for similar periods. The data logging architecture must account for all of these scenarios.

---

## Local Storage on ESP32

### SPIFFS vs. LittleFS

The ESP32 has limited onboard flash storage (typically 4 MB on the ESP-WROOM-32 module), shared between firmware and any file system. Two file system options are available for storing sensor data locally on the MCU: SPIFFS (SPI Flash File System) and LittleFS. Both allow the ESP32 to persist data across reboots and deep-sleep cycles, which is essential for an offline-first design.

| Feature | SPIFFS | LittleFS |
|---------|--------|----------|
| **Max file size** | Limited by partition (typically 1–1.5 MB) | Limited by partition (typically 1–1.5 MB) |
| **Wear leveling** | Basic | Better (power-loss resilient) |
| **Directory support** | No (flat namespace) | Yes (hierarchical) |
| **Write speed** | Moderate | Faster |
| **Power-loss safety** | Risk of corruption | Journal-based; safe |
| **Arduino support** | Built-in (ESP32 Arduino core) | Requires LittleFS library |
| **Recommended for IoT** | Legacy only | **Yes — preferred** |

**Recommendation**: Use **LittleFS** for all new deployments. It handles unexpected power loss (common during thunderstorms and battery depletion) without corrupting the file system, and supports directories for organized data storage (e.g., `/data/2026/05/13/`). The Arduino `LittleFS` library is well-maintained and compatible with the ESP32 Arduino core.

### SD Card Logging

For deployments requiring more storage capacity (e.g., logging at 1-minute intervals, or buffering multiple days of data during extended outages), an SD card module provides up to 32 GB of storage at minimal cost. The ESP32 communicates with the SD card via SPI, using the `SD.h` library (which wraps FatFS).

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Module** | MicroSD card module (SPI) | ~25–40 THB on Shopee Thailand |
| **SD Card** | 16 GB MicroSD Class 10 | ~80–120 THB on Shopee Thailand |
| **Interface** | SPI (MOSI, MISO, SCK, CS) | Uses 4 GPIO pins |
| **File system** | FAT32 | Maximum 4 GB per file; plenty for sensor data |
| **Write speed** | Class 10: 10 MB/s minimum | Far exceeds sensor data requirements |
| **Power consumption** | ~30–80 mA during write | Brief burst; negligible with deep sleep |
| **Capacity at 5-min interval** | ~1 year of data in <50 MB | ~200 bytes/reading × 288 readings/day × 365 days |

### Storage Architecture on Node

The recommended on-node storage strategy uses both LittleFS (for critical recent data and configuration) and SD card (for extended buffering during outages):

1. **LittleFS** (`/config/`, `/latest/`): Store calibration parameters, WiFi/LoRa configuration, and the most recent 100 readings. This data survives reboots and provides the fastest access. Typical usage: 50–100 KB.
2. **SD Card** (`/data/YYYY/MM/DD/`): Log every reading as a CSV line in daily files. During normal operation with cloud connectivity, files older than 7 days are automatically deleted. During offline periods, files accumulate until connectivity is restored and synced. A 16 GB card can store over 100 years of data at 5-minute intervals — effectively unlimited for any realistic outage.

### CSV File Format

Each sensor reading is stored as a single line in a CSV file, making it human-readable and easy to parse:

```
timestamp,node_id,sensor_type,sensor_id,value,unit,battery_mv,rssi,seq_num,crc
2026-05-13T14:30:00+07:00,NODE03,SOIL_MOIST,SM01,32.5,%,3850,-78,00427,A7F2
2026-05-13T14:30:00+07:00,NODE03,AIR_TEMP,AT01,24.3,C,3850,-78,00428,B3C1
2026-05-13T14:30:00+07:00,NODE03,AIR_RH,AR01,78.2,%,3850,-78,00429,9E0D
```

---

## Data Packet Structure

### Sensor Node to Gateway (LoRa)

When transmitting data over LoRa from a sensor node to the gateway, every byte matters. LoRa payloads on the AS923 band in Thailand are limited to **242 bytes** per message (regulatory maximum for AS923 with default data rate). The data packet must be compact yet complete enough for the gateway to reconstruct meaningful readings.

### Packet Format (Binary, Optimized)

The recommended packet format uses binary encoding rather than JSON to maximize the number of readings per LoRa transmission. A single 242-byte packet can carry readings from all sensors on one node plus metadata:

| Field | Size (bytes) | Type | Description |
|-------|-------------|------|-------------|
| **Header** | 1 | uint8 | Protocol version (0x01) |
| **Node ID** | 2 | uint16 | Unique node identifier (1–65535) |
| **Message Type** | 1 | uint8 | 0x01=DATA, 0x02=ALERT, 0x03=HEARTBEAT |
| **Sequence Number** | 2 | uint16 | Incrementing counter for duplicate detection |
| **Timestamp** | 4 | uint32 | Unix epoch (seconds since 2000-01-01 to save bytes) |
| **Battery (mV)** | 2 | uint16 | Battery voltage in millivolts (e.g., 3850 = 3.85V) |
| **Solar (mV)** | 2 | uint16 | Solar panel voltage in millivolts |
| **RSSI** | 1 | int8 | Last received signal strength (dBm, offset +128) |
| **Sensor Count** | 1 | uint8 | Number of sensor readings in this packet |
| **Sensor Readings** | Variable | — | Repeated per-sensor blocks (see below) |
| **CRC-16** | 2 | uint16 | CRC-16/CCITT over entire packet |
| **Total overhead** | 16 | — | Without sensor readings |

### Per-Sensor Reading Block

| Field | Size (bytes) | Type | Description |
|-------|-------------|------|-------------|
| **Sensor Type** | 1 | uint8 | Enum: 0x01=SOIL_MOIST, 0x02=AIR_TEMP, 0x03=AIR_RH, 0x04=LIGHT, 0x05=SOIL_TEMP, 0x06=WIND_SPEED, 0x07=RAIN, 0x08=LEAF_WET, 0x09=SOIL_PH, 0x0A=NPK_N, 0x0B=NPK_P, 0x0C=NPK_K |
| **Sensor ID** | 1 | uint8 | Instance number on this node (0–255) |
| **Value** | 2 | int16 | Scaled integer: value × 100 (e.g., 32.5% → 3250; 24.3°C → 2430) |
| **Per-reading total** | 4 | — | Per sensor |

### Capacity Calculation

| Configuration | Sensors per Node | Reading Bytes | Total Packet | Fits in 242 bytes? |
|--------------|-----------------|---------------|-------------|-------------------|
| Minimum (3 sensors) | Soil moisture + air temp + RH | 12 | 28 | ✅ Easily |
| Standard (6 sensors) | + light + soil temp + wind | 24 | 40 | ✅ Easily |
| Full (9 sensors) | + rain + leaf wetness + pH | 36 | 52 | ✅ Easily |
| Maximum (12 sensors) | + NPK (N, P, K separate) | 48 | 64 | ✅ Easily |
| **Multiple time-steps** | 6 sensors × 5 intervals | 120 | 136 | ✅ Comfortably |
| **Extreme buffering** | 6 sensors × 12 intervals | 288 | 304 | ❌ Requires 2 packets |

The binary format is extremely efficient. Even a fully-loaded node with 12 sensor readings fits in a single LoRa packet with room to spare. This allows **burst transmission** of multiple time-steps in a single packet — for example, sending the last 5 readings at 5-minute intervals (25 minutes of data) in one transmission, reducing airtime and power consumption.

### JSON Alternative (for WiFi nodes)

For WiFi-connected nodes near the farmhouse, JSON over MQTT is simpler to implement and debug, at the cost of larger payload size. Since WiFi has no 242-byte limitation, JSON is acceptable:

```json
{
  "node": "NODE03",
  "ts": "2026-05-13T14:30:00+07:00",
  "bat_mv": 3850,
  "solar_mv": 5200,
  "rssi": -45,
  "seq": 427,
  "sensors": [
    {"type": "SOIL_MOIST", "id": "SM01", "val": 32.5, "unit": "%"},
    {"type": "AIR_TEMP", "id": "AT01", "val": 24.3, "unit": "C"},
    {"type": "AIR_RH", "id": "AR01", "val": 78.2, "unit": "%"}
  ],
  "crc": "A7F2"
}
```

A typical JSON payload for 6 sensors is ~350–500 bytes — fine over WiFi, impossible over LoRa.

---

## LoRa Data Transmission & Payload Optimization

### Transmission Schedule

The transmission schedule directly impacts battery life and network capacity. More frequent transmissions mean higher power consumption and more LoRa airtime, but also lower latency for alerts. The recommended schedule balances these factors for Northern Thailand conditions:

| Interval | Sensors Transmitted | LoRa Packets/Day | Duty Cycle | Battery Impact | Use Case |
|----------|-------------------|-------------------|------------|-----------------|----------|
| **5 min** | All | 288 | Moderate | ~10–14 day battery (no solar) | Research, critical periods |
| **15 min** | All | 96 | Low | ~20–30 day battery (no solar) | ⭐ Standard monitoring |
| **30 min** | All | 48 | Very low | ~40–60 day battery (no solar) | Low-priority periods |
| **1 hour** | All | 24 | Minimal | ~80+ day battery (no solar) | Dry season maintenance |
| **Alert-driven** | Triggered only | Variable | Negligible | Minimal | Frost, CLR, waterlogging |

**Recommendation**: Use **15-minute intervals** as the default for the fruit development season (May–September) when soil moisture and disease risk are most critical, and **30-minute intervals** during the cool-dry season (November–February) when conditions are more stable. Implement **alert-driven immediate transmission** for critical threshold breaches (see [[Sensor-Metrics-Thresholds]]) — if soil moisture drops below 15% VWC or leaf wetness exceeds 48 hours, transmit immediately regardless of schedule.

### AS923 Duty Cycle and Compliance

Thailand's AS923 band regulations require compliance with duty cycle limits. On AS923, the default maximum transmit duty cycle is **1% per sub-band** (36 seconds per hour). At SF10 (Spreading Factor 10) with a 50-byte payload, each transmission takes approximately 115 ms of airtime. This means you can transmit up to ~313 messages per hour per sub-band — far more than any reasonable coffee farm deployment would require. Even at 1-minute intervals, a single node would only use about 0.6% duty cycle. However, if you operate a **private LoRa network** (not LoRaWAN), ensure your firmware respects the 1% limit by tracking transmit times.

### Payload Optimization Techniques

1. **Delta encoding**: Instead of sending absolute values, send only the difference from the previous reading. If soil moisture changes from 32.5% to 32.8%, send +0.3 instead of 32.8. This can reduce payload size by 40–60% for slowly-changing parameters.
2. **Timestamp compression**: Use a 2-byte offset from a known epoch (e.g., minutes since midnight) instead of a full 4-byte Unix timestamp when transmitting multiple readings from the same day.
3. **Sensor type enumeration**: Use 1-byte enum codes instead of string names (0x01 instead of "SOIL_MOIST").
4. **Multi-reading packets**: Batch multiple time-steps into a single LoRa packet to reduce per-packet overhead (16 bytes of header per packet vs. 16 bytes shared across N readings).
5. **Adaptive resolution**: Use uint8 (1 byte, 0.5°C resolution) for temperature during stable periods and int16 (2 bytes, 0.01°C resolution) during rapid changes or critical growth stages.

---

## Cloud Storage Options

### Architecture: MQTT → Cloud Database

The standard IoT data pipeline uses **MQTT** (Message Queuing Telemetry Transport) as the messaging protocol from gateway to cloud. MQTT is lightweight (minimal overhead), supports QoS levels for reliable delivery, and is universally supported by cloud IoT platforms. The LoRaWAN gateway (RAK7268) runs a LoRaWAN Network Server (LNS) that decodes LoRa packets and forwards them via MQTT to the chosen cloud platform.

### Cloud Platform Comparison

| Platform | Monthly Cost (THB) | Free Tier | Data Storage | Setup Complexity | Thailand Support | Best For |
|----------|-------------------|-----------|-------------|-----------------|-----------------|----------|
| **AWS IoT Core + Timestream** | 0–500 | 1 yr free tier (limited) | Unlimited | High | English docs only | Enterprise, scalable |
| **Google Cloud IoT + BigQuery** | 0–400 | 1 yr free tier (limited) | Unlimited | High | English docs only | Data analytics focus |
| **Azure IoT Hub** | 0–600 | Limited free tier | Unlimited | High | English docs only | Microsoft ecosystem |
| **InfluxDB Cloud** | 0–300 | Free: 5 MB write/hr | Unlimited (paid) | Low | English docs only | ⭐ Easiest for time-series |
| **Self-hosted InfluxDB on RPi** | 0 (hardware only) | N/A | SD card limit (~32 GB) | Medium | N/A | ⭐⭐ Best for offline-first |
| **HandySense B-Farm** | Free | Free | Government servers | Low | Thai language! | ⭐⭐⭐ Thai government platform |
| **ThingSpeak** | 0–150 | Free: 8,200 msgs/day | 1 year retention (free) | Very Low | English | Education, prototyping |

### Cost Breakdown: AWS IoT Core (5–10 rai farm)

| Component | Monthly Usage | AWS Service | Monthly Cost (THB) |
|-----------|--------------|-------------|-------------------|
| **Messages** | ~8,640/msg/month (10 nodes × 96/day) | IoT Core messaging | ~43 THB (first 1B msgs free in preview) |
| **Data storage** | ~25 MB/month raw data | Timestream | ~25–100 THB |
| **Data processing** | Aggregation + alerting | Lambda functions | ~15–30 THB |
| **Data transfer** | ~50 MB/month outbound | Data Transfer | ~5 THB |
| **Dashboard** | Grafana Cloud (free tier) | Grafana | 0 THB |
| **Total** | | | **~90–180 THB/month** |

### Cost Breakdown: Self-Hosted InfluxDB on Raspberry Pi

| Component | One-Time Cost (THB) | Monthly Cost (THB) |
|-----------|---------------------|-------------------|
| **Raspberry Pi 4B (4 GB)** | 2,000–2,800 | 0 |
| **32 GB MicroSD (Class 10)** | 150–200 | 0 |
| **External SSD 256 GB** (optional, for reliability) | 800–1,200 | 0 |
| **InfluxDB OSS** | Free | 0 |
| **Grafana OSS** | Free | 0 |
| **Mosquitto MQTT broker** | Free | 0 |
| **Electricity** (~5W continuous) | — | ~30–50 THB/month |
| **Total** | **2,950–4,200 THB one-time** | **~30–50 THB/month** |

**Recommendation for 5–10 rai farm**: Start with **self-hosted InfluxDB on a Raspberry Pi 4B** at the farmhouse. This provides zero-recurring-cost data storage with full offline capability. The Raspberry Pi connects to the LoRa gateway via USB or Ethernet and runs InfluxDB + Grafana + Mosquitto as a complete local stack. If cloud backup or remote access is desired, use InfluxDB's built-in telegraf agent to replicate data to InfluxDB Cloud (free tier) or AWS when internet is available. For farms with unreliable electricity, add a UPS (uninterruptible power supply, ~1,500–2,500 THB) to keep the Raspberry Pi running during short outages.

### HandySense B-Farm: Thai Government Option

The **HandySense B-Farm** platform, developed by NECTEC-NSTDA (now part of NXPO), is a free IoT platform specifically designed for Thai agriculture. It provides a Thai-language dashboard, mobile app, and AI-powered recommendations. The platform accepts data via MQTT or HTTP from standard IoT devices and integrates with the Thai Department of Agriculture (DOA) crop models. For farmers who are not technical, this is the easiest on-ramp to IoT data storage — the government manages the servers, and the farmer simply configures their gateway to point to the HandySense MQTT broker.

| Attribute | Detail |
|-----------|--------|
| **Cost** | Free |
| **Language** | Thai (primary), English (partial) |
| **Data retention** | Government-managed (at least 1 year) |
| **API** | MQTT, HTTP REST |
| **Dashboard** | Web + mobile app (Thai) |
| **AI features** | Crop recommendations, disease alerts |
| **Limitations** | Less customization; dependent on government infrastructure; data sovereignty unclear |
| **Website** | handysense.nectec.or.th |

---

## Data Retention Policies

### Tiered Retention Strategy

Data retention must balance storage costs against analytical value. Raw sensor data at 15-minute intervals generates approximately 35,040 readings per sensor per year — valuable for detailed analysis but expensive to store long-term. A tiered approach retains high-resolution data for recent periods and progressively aggregates older data:

| Tier | Resolution | Retention Period | Storage Location | Estimated Size (10 nodes) |
|------|-----------|-----------------|-----------------|--------------------------|
| **Hot** | Raw (15-min) | 30 days | Local InfluxDB on RPi | ~50 MB |
| **Warm** | Raw (15-min) | 365 days | Cloud InfluxDB / AWS | ~600 MB |
| **Cold** | Hourly average | 3 years | Cloud (compressed) | ~150 MB |
| **Archive** | Daily min/max/avg | Indefinite | Cloud (S3/GCS) | ~10 MB/year |

### Aggregation Rules

When data ages from one tier to the next, aggregation must preserve the information most valuable for coffee farm decisions:

| Aggregation | Fields Preserved | Example |
|------------|-----------------|---------|
| **Hourly** | min, max, avg, count, std_dev | Soil moisture: min=22%, max=35%, avg=28.5%, n=4, σ=5.2 |
| **Daily** | min, max, avg, sum (rainfall), hours_above_threshold | Temperature: min=16.2°C, max=28.7°C, avg=22.1°C, hrs>25°C=4.2 |
| **Monthly** | min, max, avg, total_rain, rainy_days, growing_degree_days | Rainfall: total=185mm, rainy_days=14, max_daily=42mm |

### Local Retention During Outages

When connectivity drops, local storage (LittleFS + SD card) becomes the only copy of sensor data. The local retention policy must guarantee that no data is lost during the longest realistic outage:

| Outage Duration | Storage Required (10 nodes, 15-min intervals) | Storage Location |
|----------------|----------------------------------------------|-----------------|
| 1 day | ~2 MB | LittleFS (sufficient) |
| 3 days | ~6 MB | LittleFS (adequate with 1 MB partition per node) + SD card |
| 7 days | ~14 MB | SD card (mandatory) |
| 30 days | ~60 MB | SD card (comfortable; 16 GB card = 260+ days) |

**Recommendation**: Configure each node to retain at least **7 days of data locally** on SD card, with automatic deletion of files older than 30 days. This covers the worst-case rainy-season outage while preventing the SD card from filling up.

---

## Northern Thailand Connectivity Realities

### Connectivity Map by Farm Zone

Understanding where connectivity exists — and where it does not — is fundamental to designing the data logging architecture. A typical 5–10 rai coffee farm in Northern Thailand has distinct connectivity zones:

| Zone | WiFi | 4G LTE | LoRa | Typical Distance from Farmhouse | Data Strategy |
|------|------|--------|------|-------------------------------|---------------|
| **Farmhouse / Processing area** | ✅ Strong | ✅ Usually available | ✅ (gateway here) | 0–50m | WiFi + MQTT directly to cloud |
| **Near-field plots** | ⚠️ Weak or none | ✅ Often available | ✅ Strong | 50–200m | LoRa to gateway; 4G as backup |
| **Mid-field plots** | ❌ None | ⚠️ Variable | ✅ Strong | 200–500m | LoRa to gateway (primary) |
| **Remote hillside plots** | ❌ None | ❌ None or weak | ✅ (with line of sight) | 500m–2km | LoRa only; local buffering essential |
| **Valley / shaded plots** | ❌ None | ❌ None | ⚠️ May need relay | >1km | LoRa relay node; maximum buffering |

### 4G LTE Coverage in Coffee Provinces

| Province | 4G Coverage (AIS) | 4G Coverage (DTAC) | Notes |
|----------|-------------------|--------------------|--------|
| **Chiang Mai** | Good along roads; patchy in mountains | Similar to AIS | Best connectivity overall; Mae Rim, Doi Saket well-covered |
| **Chiang Rai** | Good in valleys; limited on ridges | Similar to AIS | Doi Chang, Doi Tung have decent coverage near villages |
| **Mae Hong Son** | Limited to main towns | Limited | Most challenging province; LoRa essential |
| **Nan** | Moderate along highway; limited in interior | Moderate | Doi Phu Kha area has very limited 4G |
| **Lampang** | Good in lowlands | Good | Lower elevation farms may have WiFi range |

### Connectivity During Rainy Season

During the rainy season (May–October), connectivity degrades significantly. Storms can knock out power to cell towers, and heavy rain attenuates both 4G and LoRa signals. The data logging system must be designed for the following worst-case scenarios:

| Scenario | Duration | Probability | Impact | Mitigation |
|----------|----------|-------------|--------|------------|
| **4G backhaul down** | 1–3 days | High (2–3× per rainy season) | Gateway cannot forward to cloud | Local InfluxDB on RPi captures all data; syncs when 4G returns |
| **Gateway power loss** | 1–7 days | Moderate (1–2× per rainy season) | No LoRa reception; no cloud upload | Sensor nodes buffer locally on SD card; RPi on UPS |
| **LoRa signal degraded** | Hours (during heavy rain) | Frequent | Missed transmissions | Nodes retry with exponential backoff; data buffered locally |
| **Complete farm isolation** | 3–7 days | Low (once every 1–2 years) | No data leaves the farm | All nodes buffer locally; auto-sync on restoration |

---

## Offline-First Design

### Design Principles

An offline-first architecture assumes that connectivity will be intermittent and designs every component to function independently of cloud access. This is not just a nice-to-have for Northern Thailand — it is a hard requirement driven by the rainy season's impact on power and internet infrastructure.

1. **Every node is self-sufficient**: Each sensor node can operate indefinitely without any network connection. It reads sensors, logs to SD card, and attempts to transmit. If transmission fails, it continues logging. It never blocks on a network call.
2. **The gateway is a cache, not a bottleneck**: The Raspberry Pi gateway stores all received data in local InfluxDB. Cloud sync is a background process that runs when connectivity is available. The local dashboard (Grafana) works without internet.
3. **Idempotent sync**: When connectivity is restored, data syncs from local to cloud using idempotent writes (same data written multiple times produces the same result). The sequence number in each data packet enables the cloud to detect and skip duplicates.
4. **Graceful degradation**: If the gateway is down, nodes buffer locally. If a node's SD card is full, it overwrites the oldest data (circular buffer). If the cloud is unreachable, the local dashboard continues to function. No single failure causes data loss.
5. **Automatic recovery**: All components auto-reconnect and auto-sync without manual intervention. A farmer should not need to press a "sync" button after a power outage.

### Offline Sync Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                      NORMAL OPERATION                           │
│                                                                 │
│  Sensor Node ──LoRa──→ Gateway (RPi) ──MQTT──→ Cloud           │
│  (SD card buffer)     (InfluxDB local)     (InfluxDB Cloud)     │
│       ↕                    ↕                      ↕             │
│  Local log           Local Grafana          Remote Grafana      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    4G OUTAGE (3-7 days)                         │
│                                                                 │
│  Sensor Node ──LoRa──→ Gateway (RPi) ──✗──→ Cloud              │
│  (SD card buffer)     (InfluxDB local)     (stale data)         │
│       ↕                    ↕                                    │
│  Local log           Local Grafana ✅  (still works!)           │
│                      (accumulating data for later sync)          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│               GATEWAY DOWN (3-7 days)                           │
│                                                                 │
│  Sensor Node ──✗──→ Gateway (OFF) ──✗──→ Cloud                 │
│  (SD card buffer ⬆)  (no reception)       (stale data)          │
│       ↕                                                         │
│  Local log (accumulating)                                       │
│  Auto-retry every 15 min                                        │
│  LoRa retries with backoff                                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                 RECOVERY (connectivity restored)                │
│                                                                 │
│  1. Gateway powers up → InfluxDB auto-starts                    │
│  2. Sensor nodes resume LoRa transmission → gateway receives    │
│  3. Gateway backfills from SD card data (retroactive sync)      │
│  4. Gateway syncs local InfluxDB → Cloud via MQTT/Telegraf      │
│  5. Cloud database deduplicates using sequence numbers           │
│  6. All dashboards show complete data with no gaps               │
└─────────────────────────────────────────────────────────────────┘
```

### SD Card Data Recovery After Extended Outage

When a sensor node has been offline for an extended period, it must transmit its buffered data to the gateway. Two strategies exist:

| Strategy | How It Works | Pros | Cons |
|----------|-------------|------|------|
| **Catch-up transmission** | After reconnecting, node transmits all buffered readings at accelerated rate (1 per second) until caught up | Simple; preserves full resolution | May take several minutes of airtime; uses more power |
| **Summary transmission** | Node aggregates buffered data locally (hourly min/max/avg) and transmits summaries | Faster; less airtime; lower power | Loses sub-hourly detail during outage period |

**Recommendation**: Use **summary transmission** for data older than 24 hours and **catch-up transmission** for the most recent 24 hours. This preserves recent high-resolution data while efficiently backfilling older data. The node firmware should maintain a "last synced sequence number" to track which data has been confirmed received by the gateway.

---

## Data Integrity

### CRC Checks

Every LoRa packet includes a **CRC-16/CCITT** checksum covering the entire payload (excluding the CRC bytes themselves). The gateway verifies the CRC before accepting the packet. If CRC fails, the packet is discarded and the node will retransmit on the next scheduled interval (not immediately, to avoid collision).

| Check | Where Performed | Action on Failure |
|-------|----------------|-------------------|
| **CRC-16 (LoRa)** | Gateway LNS | Discard packet; node retransmits on next interval |
| **CRC-32 (SD card)** | Node on read-back | Re-read from redundant copy or mark as suspect |
| **MQTT QoS 1** | Cloud broker | Broker stores message until acknowledged by subscriber |
| **Sequence number gap** | Gateway / Cloud | Request retransmission of missing sequence numbers |

### Retry Logic

The sensor node implements a multi-level retry strategy to ensure data reaches the gateway without excessive power consumption:

| Retry Level | Trigger | Action | Max Retries | Backoff |
|-------------|---------|--------|-------------|---------|
| **Level 1: LoRa TX** | Normal scheduled transmission | Transmit and wait for ACK | 3 per interval | 5s, 10s, 20s |
| **Level 2: LoRa Re-transmit** | No ACK received | Queue for next interval | 12 (3 hours at 15-min) | 15 min intervals |
| **Level 3: SD Card Buffer** | Level 2 exhausted | Store to SD card for later sync | Unlimited | N/A |
| **Level 4: Catch-up** | Connectivity restored | Transmit buffered data | Until caught up | 1s between packets |

### Duplicate Detection

In any retry-based system, duplicate messages are inevitable. The gateway and cloud must detect and discard duplicates without losing legitimate data:

- **Sequence number**: Each message from a node carries an incrementing sequence number. The gateway tracks the last-seen sequence number per node. Any message with a sequence number ≤ last-seen is a duplicate and is discarded.
- **Timestamp + Node ID + Sensor ID**: As a secondary check, the combination of timestamp, node ID, and sensor ID must be unique. If a duplicate is detected at the cloud level (e.g., after a sync recovery), the existing record is kept and the duplicate is logged but not stored.
- **Idempotent writes**: InfluxDB's line protocol is inherently idempotent for the same timestamp + tag set — writing the same point twice simply overwrites the first. This makes sync recovery safe by default.

### Data Validation at Ingest

Before data enters InfluxDB, the gateway applies range validation rules to catch sensor malfunctions, wiring errors, and other anomalies:

| Parameter | Valid Range | Action if Out of Range |
|-----------|------------|----------------------|
| Soil Moisture (VWC) | 0–100% | Reject; flag sensor as faulty |
| Air Temperature | -10°C to 60°C | Reject; likely wiring issue |
| Air Humidity | 0–100% RH | Reject; sensor malfunction |
| Light (Lux) | 0–200,000 | Reject; sensor error |
| Wind Speed | 0–50 m/s | Reject; likely noise |
| Battery Voltage | 2,800–4,200 mV | Flag for battery replacement if <3,200 |
| Soil pH | 3.0–10.0 | Reject; probe degradation |

Out-of-range readings are logged to a separate `rejected` measurement in InfluxDB for later analysis (they may indicate a real problem worth investigating), but they are excluded from the primary sensor data stream and will not trigger alerts.

---

## Practical Recommendations for 5–10 Rai Farm Deployment

### Recommended Architecture

For a typical 5–10 rai (0.8–1.6 hectare) coffee farm in Northern Thailand, the following architecture provides the best balance of cost, reliability, and capability:

```
┌─────────────────────────────────────────────────────────────────────┐
│                         CLOUD (Optional)                            │
│              InfluxDB Cloud / AWS / HandySense B-Farm               │
│              (Backup, remote access, long-term storage)             │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ MQTT / Telegraf (when 4G available)
                               │
┌──────────────────────────────┴──────────────────────────────────────┐
│                    FARMHOUSE (Gateway Stack)                         │
│  ┌──────────┐  ┌───────────┐  ┌──────────┐  ┌─────────────────┐   │
│  │ RAK7268  │  │ RPi 4B    │  │ A7670S   │  │ UPS             │   │
│  │ LoRa GW  ├──┤ InfluxDB  │  │ 4G LTE   │  │ (1.5–2.5k THB)  │   │
│  │ (AS923)  │  │ + Grafana │  │ (backhaul│  │ 2–4 hr backup   │   │
│  │ ~6,000฿  │  │ + Mosquitto│ │ ~600฿)   │  │                 │   │
│  └──────────┘  └───────────┘  └──────────┘  └─────────────────┘   │
│                     Total gateway stack: ~11,000–13,000 THB         │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ LoRa AS923 (5–15 km range)
              ┌────────────────┼────────────────┐
              │                │                │
         ┌────┴────┐     ┌───┴────┐      ┌───┴────┐
         │ NODE 1  │     │ NODE 2 │      │ NODE 3 │
         │ Heltec  │     │ Heltec │      │ Heltec │
         │ +Sensors│     │ +Sensors│     │ +Sensors│
         │ +Solar  │     │ +Solar │      │ +Solar │
         │ +SD Card│     │ +SD Card│     │ +SD Card│
         │ ~1,800฿ │     │ ~1,800฿│      │ ~1,800฿│
         └─────────┘     └────────┘      └────────┘
```

### Cost Summary: Complete Data Logging System

| Component | Unit Cost (THB) | Quantity | Total (THB) |
|-----------|-----------------|----------|-------------|
| **Gateway Stack** | | | |
| RAK7268 LoRaWAN Gateway | 6,000 | 1 | 6,000 |
| Raspberry Pi 4B (4 GB) | 2,500 | 1 | 2,500 |
| 32 GB MicroSD | 180 | 1 | 180 |
| A7670S 4G LTE module | 600 | 1 | 600 |
| SIM card (AIS, 2 GB/mo) | 99/mo | 1 | 1,188/year |
| UPS for RPi | 2,000 | 1 | 2,000 |
| **Per-Node (LoRa)** | | | |
| Heltec WiFi LoRa 32 V3 | 900 | 5 | 4,500 |
| Capacitive V1.2 × 2 | 70 | 5 | 350 |
| SHT31 (temp + humidity) | 115 | 5 | 575 |
| BH1750 (light) | 45 | 5 | 225 |
| DS18B20 (soil temp) | 35 | 5 | 175 |
| MicroSD card module + 16 GB card | 150 | 5 | 750 |
| 5V 2W solar panel | 70 | 5 | 350 |
| 18650 battery (3,000 mAh) | 70 | 5 | 350 |
| IP65 enclosure + cable glands | 100 | 5 | 500 |
| **Software** | | | |
| InfluxDB OSS | Free | — | 0 |
| Grafana OSS | Free | — | 0 |
| Mosquitto MQTT | Free | — | 0 |
| Node firmware (Arduino) | Free | — | 0 |
| **Total Year 1** | | | **~20,243 THB** |
| **Monthly recurring (4G SIM)** | | | **~99 THB/month** |
| **Annual recurring** | | | **~1,188 THB/year** |

This represents approximately **2,024 THB per rai** for a 10-rai farm — well within the budget established in [[System-Cost-Estimate]] and recoverable within a single harvest season through improved irrigation efficiency and disease prevention.

### Deployment Checklist

- [ ] Flash each Heltec V3 node with firmware including LittleFS + SD card logging
- [ ] Configure LoRa AS923 frequency on all nodes and gateway
- [ ] Set up Raspberry Pi with InfluxDB + Grafana + Mosquitto (use the pre-built image)
- [ ] Test LoRa range from each node location to the gateway BEFORE permanent installation
- [ ] Verify SD card is writable on each node (test with a sample log)
- [ ] Configure 4G LTE SIM card and test MQTT connectivity to cloud (if using cloud backup)
- [ ] Set up UPS and verify RPi runtime on battery power (target: 2–4 hours minimum)
- [ ] Configure Grafana dashboard with coffee-specific panels (see [[Visualization-Dashboard]])
- [ ] Test offline scenario: disconnect 4G, verify local logging continues, reconnect, verify sync
- [ ] Train farmer on basic Grafana dashboard usage and what to check after storms

---

## Related Topics

- [[Microcontroller-Comparison]] — ESP32 and Heltec board specifications for data logging
- [[Communication-Modules]] — LoRa AS923, WiFi, and 4G LTE details for data transmission
- [[Power-Solutions]] — Solar + battery sizing to support data logging during outages
- [[Sensor-Metrics-Thresholds]] — Threshold definitions that drive alert-triggered transmissions
- [[System-Cost-Estimate]] — Full system cost breakdown including data logging components
- [[Installation-Guide]] — Physical deployment instructions for nodes and gateway
- [[Soil-Moisture-Sensors]] — Primary sensor whose data drives irrigation decisions
- [[Visualization-Dashboard]] — How logged data is displayed to farmers

---

## References

1. InfluxDB Documentation — Data retention policies, continuous queries, and downsampling: docs.influxdata.com
2. The Things Network — AS923 frequency plan and duty cycle regulations for Thailand
3. ESP32 Arduino Core — LittleFS and SD card library documentation
4. MQTT v5 Specification — QoS levels, session management, and retained messages
5. NECTEC-NSTDA — HandySense B-Farm platform documentation (Thai): handysense.nectec.or.th
6. AWS IoT Core Pricing — Message costs and free tier details for Asia Pacific (Singapore) region
7. NBTC Thailand — AS923 band regulations and LoRa transmission limits
8. RAKwireless — RAK7268 gateway specifications and LoRaWAN network server configuration
9. Grafana Labs — Time-series visualization best practices for IoT data
10. LoRa Alliance — LoRaWAN Specification v1.0.4, AS923 regional parameters

---

*Last updated: 2026-05-13*
