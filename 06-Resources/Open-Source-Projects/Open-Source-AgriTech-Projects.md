---
topic: Open-Source AgriTech Projects
phase: 6
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [open-source, agritech, iot, lora, influxdb, grafana, handysense, thailand]
related: [Research-Papers, Suppliers-Thailand, Visualization-Dashboard, Decision-Logic, Communication-Modules]
---

# Open-Source AgriTech Projects

> **Summary**: A comprehensive guide to the open-source software and hardware projects that form the recommended technology stack for the Northern Thailand coffee IoT system — covering LoRaWAN network servers (TTN/The Things Stack), time-series databases (InfluxDB, TimescaleDB), visualization (Grafana), IoT automation (Node-RED, Home Assistant), Thai government platforms (HandySense B-Farm), weather APIs (OpenWeatherMap), edge ML frameworks (TensorFlow Lite, TinyML), farm management (FarmOS), data standards (Open Ag Data Alliance), and LINE Messaging API — with license analysis, integration complexity assessment, community health evaluation, and a recommended stack architecture that combines these projects into a cohesive, maintainable, Thailand-optimized system.

---

## Overview

Building a coffee IoT system from proprietary software would lock Northern Thailand's farmers into expensive subscriptions, vendor-dependent updates, and opaque data practices that contradict the project's mission of farmer empowerment. Open-source software provides the alternative: transparent, community-maintained, freely modifiable tools that can be adapted to the specific needs of coffee agriculture in Thailand's highland microclimates. The total cost of a proprietary IoT platform (cloud hosting + dashboard + alert engine + mobile app backend) can easily exceed 50,000-100,000 THB per year in licensing fees; the open-source stack described in this document achieves the same functionality at zero licensing cost, with only hosting infrastructure (~1,200-3,600 THB/year for a VPS) and development labor as expenses.

However, open-source does not mean "free of effort." Each project carries its own learning curve, integration complexity, community support quality, and license obligations. This document evaluates every relevant open-source project through the lens of the coffee IoT system's specific requirements: LoRa sensor data ingestion, time-series storage, threshold-based alerting, LINE bot notifications, Thai language support, offline capability, and long-term maintainability by a small team (or even a single developer). The recommended stack at the end of this document represents the optimal combination of these projects, balancing capability, simplicity, and sustainability.

The single most important open-source project for this system is **HandySense B-Farm** — Thailand's own government-developed, open-source IoT agriculture platform. HandySense provides a ready-made cloud backend, AI crop recommendations, mobile app, and open hardware designs specifically designed for Thai agriculture. It should be the starting point for any coffee IoT deployment, with other open-source projects layered on top to fill gaps in visualization, automation, and data analysis.

---

## LoRaWAN Network Server

### The Things Network (TTN) / The Things Stack

The Things Stack (formerly The Things Network V3) is the world's most widely deployed open-source LoRaWAN network server. It handles the critical middle layer between physical LoRa gateways and application servers: device management, payload decoding, data routing, and join-server functionality for LoRaWAN device activation.

| Parameter | Details |
|-----------|---------|
| **Project** | The Things Stack (V3) |
| **License** | AGPL-3.0 (network server) / Apache-2.0 (client libraries) |
| **Language** | Go |
| **GitHub Stars** | 2,800+ |
| **Deployment** | Self-hosted or cloud-hosted (The Things Industries) |
| **Website** | thethingsindustries.com / thethingsnetwork.org |
| **Community** | Very active; 100,000+ registered developers globally |

**Key Features for Coffee IoT:**

| Feature | Description | Coffee IoT Relevance |
|---------|-------------|---------------------|
| **AS923 Support** | Full support for AS923 channel plan used in Thailand | ⭐ Essential — legal LoRa operation in Thailand |
| **Payload Decoders** | JavaScript-based uplink payload decoders | Decode raw sensor bytes into meaningful values (moisture %, temperature °C) |
| **MQTT Integration** | Publishes decoded data via MQTT | Bridge to InfluxDB, Node-RED, Grafana, or HandySense |
| **HTTP Webhooks** | Forwards data to any HTTP endpoint | Direct integration with custom backend or HandySense API |
| **Device Management** | OTAA and ABP activation; device registry | Manage sensor nodes in the field; replace failed nodes |
| **Multi-gateway** | Supports multiple gateways for redundancy | Scale from 1 gateway (10 rai) to 5+ gateways (cooperative) |
| **Free Tier** | Community edition: free for up to 10 gateways | Sufficient for all but the largest cooperatives |

**Integration with Coffee IoT Architecture:**

The Things Stack sits at the center of the communication chain: sensor nodes transmit LoRa packets → gateway forwards to The Things Stack → Stack decodes and routes via MQTT or webhook → downstream systems (InfluxDB, Grafana, Node-RED, LINE bot) consume the data. The AS923 channel plan configuration for Thailand is straightforward: set `frequency_plan_id: AS923_1_TH` in the gateway and device profiles.

**Deployment Options:**

| Option | Cost (THB/month) | Pros | Cons |
|--------|------------------|------|------|
| **TTN Community (Cloud)** | Free | Zero maintenance; instant setup | Data routed through EU servers; 30-second daily uplink limit per device |
| **Self-hosted (VPS)** | 500-1,500 | Full control; no data limits; data stays in Thailand | Requires server management; Docker + VPS setup |
| **The Things Industries (Cloud)** | Contact for pricing | Enterprise SLA; Thailand region; dedicated support | Paid service |

**Recommendation**: Start with TTN Community (free, instant) for pilot deployments. Migrate to self-hosted when data volume exceeds the fair-use policy or when data sovereignty requires Thai-hosted storage. A 2-core, 4GB RAM VPS on Thai cloud providers (CAT Telecom, True IDC, or AWS ap-southeast-1 Singapore) costs 500-1,500 THB/month and handles hundreds of sensor nodes.

---

## Time-Series Databases

### InfluxDB

InfluxDB is the most popular open-source time-series database, purpose-built for storing and querying timestamped sensor data. It is the natural choice for IoT sensor data storage because it handles high write throughput, efficient time-range queries, and data retention policies natively.

| Parameter | Details |
|-----------|---------|
| **Project** | InfluxDB |
| **License** | MIT (v2 core) / Apache-2.0 (client libraries) |
| **Language** | Go + Rust (v2) |
| **GitHub Stars** | 29,000+ |
| **Deployment** | Self-hosted or InfluxDB Cloud |
| **Website** | influxdata.com |
| **Community** | Very active; extensive documentation; IoT-focused |

**Key Features for Coffee IoT:**

| Feature | Description | Relevance |
|---------|-------------|-----------|
| **Flux Query Language** | Powerful time-series queries with aggregation, transformation, and anomaly detection | Compute hourly averages, daily min/max, rolling 7-day soil moisture trends |
| **Data Retention Policies** | Automatic data expiration and downsampling | Keep raw 5-minute data for 90 days, hourly averages for 2 years |
| **Telegraf Agent** | 200+ input plugins for data collection | Native MQTT consumer; directly ingest data from The Things Stack |
| **Threshold Alerts** | Built-in alerting with notification endpoints | Send alerts when soil moisture < 15% VWC or temperature > 30°C |
| **HTTP API** | RESTful write and query interface | Integrate with any programming language or framework |
| **Free Tier (Cloud)** | Up to 10GB storage, 5 writes/second | Sufficient for a single farm pilot |

**Storage Estimation for 10-Rai Farm:**

| Metric | Value |
|--------|-------|
| Sensor nodes | 5 |
| Readings per node | 6 (moisture, temp, humidity, light, soil temp, battery) |
| Sampling interval | 5 minutes |
| Readings per day | 5 nodes × 6 readings × 288 intervals = 8,640 |
| Bytes per reading | ~50 bytes (measurement + tags + field values) |
| Daily storage | ~432 KB |
| Monthly storage (raw) | ~13 MB |
| Annual storage (raw) | ~156 MB |
| With retention policies (90 days raw + 2 years hourly) | ~50 MB/year |

> **Key Insight**: Coffee IoT sensor data storage is trivially small. Even a cooperative with 100 sensor nodes generates only ~1.5 GB/year of raw data. Storage cost is essentially zero — the challenge is query performance and visualization, not capacity.

### TimescaleDB

TimescaleDB is an alternative time-series database built as a PostgreSQL extension. It offers SQL-based queries (instead of InfluxDB's Flux language) and benefits from PostgreSQL's mature ecosystem of tools, extensions, and operational knowledge.

| Parameter | Details |
|-----------|---------|
| **Project** | TimescaleDB |
| **License** | Apache-2.0 (community edition) / Timescale License (enterprise) |
| **Language** | C (PostgreSQL extension) |
| **GitHub Stars** | 19,000+ |
| **Deployment** | Self-hosted; Docker; managed cloud |
| **Website** | timescale.com |

**InfluxDB vs. TimescaleDB Comparison:**

| Feature | InfluxDB | TimescaleDB |
|---------|----------|-------------|
| **Query Language** | Flux (custom; learning curve) | SQL (widely known) |
| **Schema** | Schemaless (flexible but risky) | Fixed schema (safer for sensor data) |
| **Joins** | Limited | Full SQL joins (relational queries) |
| **Geospatial** | Limited | PostGIS integration |
| **Data Retention** | Built-in policies | Built-in compression + drop chunks |
| **Ecosystem** | Telegraf, Chronograf, Kapacitor | Full PostgreSQL ecosystem |
| **Community (Thailand)** | Moderate | Moderate |
| **Best For** | Pure time-series IoT data | IoT data + relational data (farms, crops, users) |

**Recommendation**: Use **InfluxDB** for a pure sensor data pipeline (simpler setup, purpose-built for IoT). Consider **TimescaleDB** if the system needs to integrate sensor data with relational farm management data (farmer profiles, variety records, transaction history) in a single database. For the coffee IoT system's initial deployment, InfluxDB is recommended; TimescaleDB becomes attractive when scaling to a multi-farm cooperative platform with FarmOS integration.

---

## Visualization

### Grafana

Grafana is the de facto standard open-source dashboard and visualization platform, used by millions of developers and system operators worldwide. It connects to dozens of data sources (InfluxDB, TimescaleDB, PostgreSQL, MySQL, Prometheus, and more) and provides a rich set of visualization panels including time-series charts, gauges, bar charts, heat maps, and geographic maps.

| Parameter | Details |
|-----------|---------|
| **Project** | Grafana |
| **License** | AGPL-3.0 |
| **Language** | Go + TypeScript |
| **GitHub Stars** | 65,000+ |
| **Deployment** | Self-hosted or Grafana Cloud |
| **Website** | grafana.com |
| **Community** | Extremely active; largest open-source visualization community |

**Key Features for Coffee IoT:**

| Feature | Description | Coffee IoT Relevance |
|---------|-------------|---------------------|
| **Threshold Bands** | Horizontal colored regions on charts (green/yellow/red) | Show optimal, warning, and critical zones for each metric (see [[Sensor-Metrics-Thresholds]]) |
| **Alert Rules** | Threshold-based alerts with multi-channel notifications | Alert when soil moisture drops below 15% VWC; send to LINE bot |
| **Dashboard Variables** | Parameterized dashboards (select farm, zone, time range) | Switch between zones (แปลงอรุณ, แปลงบุญมี) with a dropdown |
| **Annotations** | Event markers on time-series charts | Mark irrigation, fertilization, and spray events on sensor charts |
| **Mobile Browser** | Responsive layout works on mobile phones | Farmers can check dashboard on smartphone (supplementary to LINE bot) |
| **Multi-data source** | Combine InfluxDB sensor data with PostgreSQL farm records | Correlate sensor readings with farm management events |
| **Plugin Ecosystem** | 100+ community plugins | Add world map for multi-farm view; add status panel for Farm Health Score |

**Integration Architecture:**

```
Sensor Nodes → [LoRa] → Gateway → [4G] → The Things Stack
                                                ↓ (MQTT)
                                            Telegraf
                                                ↓ (Write)
                                            InfluxDB
                                                ↑ (Query)
                                            Grafana ← → LINE Bot (Alerts)
                                                ↑
                                            Farmer (Mobile Browser)
```

**Cost**: Self-hosted Grafana on a VPS costs 0 THB in licensing. Grafana Cloud free tier supports up to 10,000 series and 50 GB storage — more than sufficient for a single-farm or small-cooperative deployment. The free tier does not include alerting (requires Grafana Cloud Pro at $8/month ≈ 280 THB/month), so self-hosting is recommended for full alerting capability at zero cost.

---

## IoT Automation Platforms

### Node-RED

Node-RED is a flow-based programming tool originally developed by IBM for wiring together IoT devices, APIs, and online services. Its visual programming interface makes it accessible to non-programmers while remaining powerful enough for complex automation logic. For the coffee IoT system, Node-RED serves as the integration hub that connects sensor data ingestion, decision logic, alert routing, and notification delivery.

| Parameter | Details |
|-----------|---------|
| **Project** | Node-RED |
| **License** | Apache-2.0 |
| **Language** | JavaScript (Node.js) |
| **GitHub Stars** | 20,000+ |
| **Deployment** | Self-hosted; Docker; Raspberry Pi |
| **Website** | nodered.org |
| **Community** | Very active; thousands of community-contributed nodes |

**Key Features for Coffee IoT:**

| Feature | Description | Coffee IoT Relevance |
|---------|-------------|---------------------|
| **MQTT Input Node** | Subscribe to MQTT topics from The Things Stack | Ingest real-time sensor data as it arrives |
| **Function Nodes** | JavaScript code for custom logic | Implement [[Decision-Logic]] rules in JavaScript |
| **LINE Messaging Node** | Community-contributed LINE bot integration | Send alerts to farmers via LINE (critical for Thailand) |
| **HTTP Request Node** | Call REST APIs (HandySense, OpenWeatherMap, InfluxDB) | Fetch weather forecasts; write data to InfluxDB; trigger HandySense AI |
| **Switch/Change Nodes** | Conditional routing without code | Route alerts to different channels based on priority level |
| **Dashboard Nodes** | Built-in simple web dashboard | Quick prototype dashboard before building full Grafana setup |
| **Cron/Timestamp Nodes** | Scheduled execution | Run daily summaries at 7:00 AM; check sensor health every hour |

**Node-RED Flow Example: Coffee IoT Alert Pipeline**

```
[MQTT In: TTN sensor data]
        ↓
[Function: Parse & evaluate decision rules]
        ↓
[Switch: Alert priority?]
  → EMERGENCY → [LINE Push: Emergency message] + [SMS via Thai gateway]
  → CRITICAL   → [LINE Push: Critical message]
  → WARNING    → [Function: Queue for daily summary]
  → INFO       → [InfluxDB Write: Log only]
        ↓
[InfluxDB Write: Store all sensor readings]
```

**Learning Curve**: Node-RED's visual interface makes it the most accessible automation platform for developers who are not experienced programmers. A competent developer can build the coffee IoT alert pipeline in 1-2 weeks using Node-RED, compared to 3-4 weeks with a custom Python/Node.js backend. However, for very complex decision logic (the 40+ rules in [[Decision-Logic]]), a code-based approach may be more maintainable long-term.

### Home Assistant

Home Assistant is an open-source home automation platform that has increasingly been adopted for agricultural IoT applications. Its strength lies in its massive integration library (2,000+ integrations), local-first architecture, and emphasis on privacy and offline operation.

| Parameter | Details |
|-----------|---------|
| **Project** | Home Assistant |
| **License** | Apache-2.0 |
| **Language** | Python |
| **GitHub Stars** | 75,000+ |
| **Deployment** | Self-hosted; Raspberry Pi; Docker |
| **Website** | home-assistant.io |
| **Community** | Extremely active; one of the largest open-source projects globally |

**Relevance to Coffee IoT**: Home Assistant is best suited for small, single-farm deployments where the farmer wants a self-contained system running on a Raspberry Pi at the farmhouse. It natively supports MQTT, InfluxDB integration, and mobile app notifications. However, its home-centric data model (rooms, devices, automations) does not map naturally to agricultural concepts (zones, varieties, growth stages, disease risk). For the coffee IoT system, Node-RED is recommended over Home Assistant for the automation layer, but Home Assistant is a viable alternative for technically inclined farmers who prefer its polished UI and offline-first design.

---

## Thai Government Open-Source Platform

### HandySense / B-Farm (NECTEC/NSTDA)

HandySense B-Farm is the single most important open-source project for coffee IoT in Thailand. Developed by NECTEC (National Electronics and Computer Technology Center) under NSTDA, it was launched in February 2025 as Thailand's flagship open-source IoT agriculture platform. HandySense provides a complete end-to-end solution: open hardware sensor designs, firmware, cloud platform with AI recommendations, mobile app, and a Thai-language interface — all specifically designed for Thai agricultural conditions.

| Parameter | Details |
|-----------|---------|
| **Project** | HandySense B-Farm |
| **Developer** | NECTEC / NSTDA |
| **License** | Open-source (specific license: check NECTEC repository) |
| **Launch** | February 2025 |
| **Platform** | Cloud (free for Thai farmers) + Open hardware |
| **Language** | Thai (primary), English (secondary) |
| **Website** | handysense.nectec.or.th |
| **Community** | Growing; NECTEC-supported workshops and training |

**What HandySense Provides:**

| Component | Description | Cost |
|-----------|-------------|------|
| **Open Hardware Designs** | PCB schematics, BOM, firmware for sensor nodes | Free download; DIY build cost 2,000-5,000 THB/node |
| **Cloud Platform** | Data ingestion, storage, AI crop recommendations, multi-farm management | Free for registered Thai farmers |
| **Mobile App** | Android + iOS; real-time monitoring; Thai language | Free |
| **AI Recommendations** | Crop-specific advice based on sensor data patterns | Free (included in platform) |
| **LoRa Support** | Supports both WiFi and LoRa connectivity | Uses standard LoRa modules |
| **TMD Weather Integration** | Thai Meteorological Department data integration | Free (included) |

**How HandySense Maps to the Coffee IoT Architecture:**

| System Component | HandySense Equivalent | Gap Analysis |
|-----------------|----------------------|-------------|
| Sensor nodes | HandySense open hardware designs | ⭐ Use directly; add coffee-specific sensors (leaf wetness, pH) |
| LoRaWAN server | Not included; uses own cloud | Need TTN or self-hosted LoRaWAN server alongside |
| Time-series database | HandySense cloud (proprietary backend) | Can export data; supplement with InfluxDB for local analytics |
| Visualization | HandySense mobile app + web dashboard | Basic; needs Grafana for advanced charts and threshold bands |
| Decision logic | HandySense AI recommendations | Generic crop advice; needs customization for coffee-specific [[Decision-Logic]] |
| Alert engine | HandySense basic notifications | Needs Node-RED + LINE bot for coffee-specific alerts |
| Farm management | Not included | Needs FarmOS or custom module |

**Recommendation**: Use HandySense as the **primary cloud platform** for sensor data ingestion and mobile access. Layer Grafana, Node-RED, and LINE bot on top for coffee-specific visualization, decision logic, and notification. This hybrid approach leverages HandySense's free Thai infrastructure while filling the gaps with best-of-breed open-source tools.

---

## Weather Data APIs

### OpenWeatherMap

OpenWeatherMap provides global weather data through a freemium API, including current conditions, 5-day/3-hour forecasts, historical data, and agricultural-specific products.

| Parameter | Details |
|-----------|---------|
| **Project** | OpenWeatherMap |
| **License** | Proprietary API (freemium) |
| **Free Tier** | 60 calls/minute; current weather + 5-day forecast |
| **Agricultural API** | Soil temperature, soil moisture, evapotranspiration (paid) |
| **Website** | openweathermap.org |

**Coffee IoT Integration**: Use OpenWeatherMap's free tier to supplement on-farm sensor data with regional weather forecasts. The 5-day forecast enables proactive irrigation scheduling and harvest planning. The agricultural API (paid, ~$10/month ≈ 350 THB/month) provides evapotranspiration estimates useful for the water balance KPI in [[Visualization-Dashboard]].

**Alternative**: The Thai Meteorological Department (TMD) provides free weather data for Thailand through their API (registered access). HandySense B-Farm already integrates TMD data, making it the most convenient source for Thai weather information. For international weather model data, OpenWeatherMap remains valuable.

### AgroMonitor / Other Agricultural Weather Services

| Service | Coverage | Cost | Coffee IoT Relevance |
|---------|----------|------|---------------------|
| **AgroMonitor** | Global | Freemium | Crop-specific weather indices; limited Thai coverage |
| **TMD API (Thai)** | Thailand | Free (registration) | ⭐ Best for Northern Thailand; daily forecasts and historical data |
| **NASA POWER** | Global | Free | Solar radiation, evapotranspiration; useful for water balance |
| **World Weather Online** | Global | Freemium | Historical and forecast data; moderate Thai accuracy |

---

## Edge Machine Learning

### TensorFlow Lite / TinyML

TensorFlow Lite and the broader TinyML ecosystem enable running machine learning inference directly on microcontrollers (ESP32, STM32) and single-board computers (Raspberry Pi), without requiring cloud connectivity. This is critical for coffee IoT because many Northern Thailand farms have intermittent internet connectivity.

| Parameter | Details |
|-----------|---------|
| **Project** | TensorFlow Lite for Microcontrollers |
| **License** | Apache-2.0 |
| **Language** | C++ (runtime) / Python (training) |
| **GitHub Stars** | (Part of TensorFlow: 190,000+) |
| **Supported Hardware** | ESP32, ESP32-S3, STM32, nRF52840, RP2040 |
| **Website** | tensorflow.org/lite/microcontrollers |

**Coffee IoT ML Applications:**

| Application | Model Type | Input Data | Output | Hardware |
|------------|-----------|-----------|--------|----------|
| **CLR Risk Prediction** | Binary classification | 7-day LWD, humidity, temperature history | Risk level (0-1) | ESP32-S3 (180 KB RAM model) |
| **Irrigation Scheduling** | Regression | Soil moisture trend, weather forecast, crop stage | Recommended volume (L) | Server-side (needs weather API) |
| **Anomaly Detection** | Autoencoder | Multi-sensor time window | Normal/anomaly flag | ESP32-S3 or Raspberry Pi |
| **Yield Prediction** | Regression | Season-long sensor history, variety, elevation | Estimated kg/rai | Server-side (complex model) |

**TinyML on ESP32-S3 for Edge CLR Prediction:**

The Heltec WiFi LoRa 32 V3 (recommended sensor node, see [[Communication-Modules]]) uses the ESP32-S3 processor with 512 KB SRAM and 8 MB flash — sufficient to run a quantized TensorFlow Lite model for CLR risk prediction. The model takes 7 days of hourly leaf wetness duration, average humidity, and average temperature as input and outputs a CLR risk probability. This enables **edge inference** — the sensor node can generate a CLR risk alert even when the LoRa gateway or cloud server is offline.

**Model Training Workflow:**
1. Collect labeled data: sensor readings + confirmed CLR outbreak records (from DOA or Royal Project)
2. Train a lightweight model (random forest or small neural network) in Python using TensorFlow
3. Convert to TensorFlow Lite format; quantize to INT8 for ESP32 deployment
4. Flash model to ESP32-S3 alongside sensor firmware
5. Node performs inference locally every 6 hours; transmits risk score with regular sensor data

**Estimated Development Effort**: 4-6 weeks for a data scientist to build and validate the CLR model; 1-2 weeks to integrate with ESP32 firmware. Requires labeled disease outbreak data, which may need to be collected over 1-2 seasons in collaboration with DOA or CMU.

### Edge Impulse

Edge Impulse is a developer-friendly platform for building TinyML models that automates data collection, feature extraction, model training, and deployment to embedded devices. While not fully open-source (freemium SaaS), it dramatically simplifies TinyML development.

| Parameter | Details |
|-----------|---------|
| **Project** | Edge Impulse |
| **License** | Proprietary (free tier available) |
| **Free Tier** | Up to 4 projects, 20 minutes of data, community support |
| **Deployment** | Export as C++ library for ESP32, Arduino, STM32 |
| **Website** | edgeimpulse.com |

**Recommendation**: Use Edge Impulse for rapid prototyping of TinyML models during the first season of data collection. Once the model architecture stabilizes, transition to a fully open-source TensorFlow Lite workflow for production deployment, avoiding dependency on Edge Impulse's cloud platform.

---

## Farm Management

### FarmOS

FarmOS is an open-source web-based farm management platform built on Drupal. It provides structured records for assets (land, plants, equipment), logs (activities, observations, inputs), and planning — all essential for a data-driven coffee farming operation.

| Parameter | Details |
|-----------|---------|
| **Project** | FarmOS |
| **License** | GPL-2.0 |
| **Language** | PHP (Drupal) |
| **GitHub Stars** | 1,000+ |
| **Deployment** | Self-hosted; Docker; farmOS.hosted (paid) |
| **Website** | farmos.org |
| **Community** | Active agricultural open-source community |

**Key Features for Coffee IoT:**

| Feature | Description | Coffee IoT Relevance |
|---------|-------------|---------------------|
| **Asset Management** | Track land areas (zones), plant assets (coffee trees), equipment (pulpers, roasters) | Define sensor zones; link sensor data to specific plots |
| **Activity Logging** | Record planting, pruning, spraying, harvesting, fertilizing | Correlate farmer actions with sensor data for cause-effect analysis |
| **Sensor Data Integration** | Data streams from IoT sensors via API | Ingest sensor readings; overlay with activity logs |
| **Inventory Tracking** | Track inputs (fertilizer, fungicide) and outputs (cherry, green bean) | Calculate input costs vs. yield; validate IoT ROI |
| **Mapping** | GIS integration with farm boundaries and zones | Visualize sensor locations on farm map |
| **REST API** | Full CRUD API for all farm data | Integration with Grafana, Node-RED, LINE bot |

**Integration Challenge**: FarmOS's Drupal-based architecture is heavier than the rest of the recommended stack (requires PHP + MySQL + Apache/Nginx). For the initial coffee IoT deployment, FarmOS may be overkill — activity logging can be handled more simply through a custom Node-RED + LINE bot interface. FarmOS becomes valuable when the system scales to a multi-farm cooperative that needs standardized farm management records for certification, traceability, and market access.

---

## Agricultural Data Standards

### Open Ag Data Alliance (OADA)

The Open Ag Data Alliance is an emerging standard for agricultural data interoperability, defining REST API conventions, data formats, and permission models that enable different agricultural software systems to share data seamlessly.

| Parameter | Details |
|-----------|---------|
| **Project** | OADA |
| **License** | Apache-2.0 |
| **Website** | openag.io |
| **Status** | Emerging; not yet widely adopted in Thailand |

**Relevance**: Thailand's Agriculture 4.0 strategy (announced October 2025) is creating national standards for agricultural data exchange. OADA-compatible API design in the coffee IoT system ensures future interoperability with government databases, BAAC financial systems, and DOAE extension platforms. Designing the system's REST API to follow OADA conventions from the start costs nothing in development time but pays significant dividends when integration with national platforms becomes necessary.

### SensorThings API (OGC)

The Open Geospatial Consortium's SensorThings API is an international standard (OGC 15-078r6) for IoT sensor data exchange, widely adopted in smart city and environmental monitoring applications.

| Parameter | Details |
|-----------|---------|
| **Standard** | OGC SensorThings API |
| **License** | Free (open standard) |
| **Website** | opengeospatial.org |
| **Implementations** | Fraunhofer IOSB, GeoMoS, multiple commercial platforms |

**Recommendation**: Adopt SensorThings API data model for sensor metadata (Things, Datastreams, Observations, Locations) even if the full REST endpoint is not exposed initially. This provides a standards-compliant foundation that can be fully implemented when the system needs to exchange data with government or research platforms.

---

## LINE Messaging API SDK

### LINE Messaging API

While not an "open-source project" in the traditional sense, the LINE Messaging API and its open-source SDKs are essential infrastructure for the coffee IoT system's farmer-facing notification layer. LINE is Thailand's dominant messaging platform with 50+ million users, and virtually every Thai farmer who owns a smartphone uses LINE daily.

| Parameter | Details |
|-----------|---------|
| **Platform** | LINE Messaging API |
| **SDK License** | Apache-2.0 (official SDKs) |
| **SDK Languages** | Python, Node.js, Java, Go, PHP, Ruby |
| **Free Tier** | 1,000 push messages/month; unlimited reply messages |
| **Paid Tier** | ~700 THB/month for 15,000 messages (LINE Official Account) |
| **Website** | developers.line.biz |

**Coffee IoT LINE Bot Features:**

| Feature | LINE API Capability | Coffee IoT Use Case |
|---------|-------------------|---------------------|
| **Push Messages** | Server-initiated messages to user | EMERGENCY and CRITICAL alerts (soil moisture critical, CLR risk extreme) |
| **Reply Messages** | Response to user messages | Farmer sends `/สถานะ` → bot replies with farm status |
| **Flex Messages** | Rich card-style messages with images, buttons | Sensor dashboard card with color-coded status, chart thumbnails |
| **Quick Reply** | Suggested action buttons below messages | "รดน้ำเลย" / "ตรวจโรค" / "ดูรายละเอียด" quick action buttons |
| **Rich Menu** | Persistent menu at bottom of chat | Always-visible buttons: สถานะ / แจ้งเตือน / อากาศ / โรค |
| **Image Maps** | Clickable image messages | Farm map showing sensor locations with zone status |
| **Loading Animation** | Visual feedback during processing | Show "กำลังตรวจสอบ..." while fetching sensor data |

**Message Cost Analysis:**

| Usage Pattern | Monthly Messages | Cost (THB/month) |
|--------------|-----------------|------------------|
| **Single farmer, basic alerts** | ~200 (daily summary + ~5 CRITICAL/month) | Free tier |
| **Single farmer, full alerts** | ~500 (daily summary + hourly INFO + CRITICAL) | Free tier |
| **Cooperative (10 farmers), basic** | ~2,000 | ~700 (paid tier needed) |
| **Cooperative (10 farmers), full** | ~5,000 | ~700 (paid tier sufficient) |

**Open-Source LINE Bot SDKs:**

| SDK | Language | License | GitHub Stars | Notes |
|-----|----------|---------|-------------|-------|
| **line-bot-sdk-nodejs** | Node.js | Apache-2.0 | 3,000+ | Official; best for Node-RED integration |
| **line-bot-sdk-python** | Python | Apache-2.0 | 2,500+ | Official; best for Flask/FastAPI backends |
| **liff-cli** | CLI tool | Apache-2.0 | 100+ | LINE Front-end Framework development tool |

---

## License Compatibility Analysis

Understanding license compatibility is critical because the coffee IoT system combines multiple open-source projects, and incompatible licenses can create legal risks for the project and its users.

| Project | License | Commercial Use | Modification | Distribution | Copyleft | Compatible with Others |
|---------|---------|---------------|-------------|-------------|---------|----------------------|
| **The Things Stack** | AGPL-3.0 | ✅ Yes | ✅ Yes | ⚠️ Must share source | **Strong copyleft** | ⚠️ Network use = distribution |
| **InfluxDB** | MIT | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |
| **TimescaleDB** | Apache-2.0 | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |
| **Grafana** | AGPL-3.0 | ✅ Yes | ✅ Yes | ⚠️ Must share source | **Strong copyleft** | ⚠️ Network use = distribution |
| **Node-RED** | Apache-2.0 | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |
| **Home Assistant** | Apache-2.0 | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |
| **TensorFlow Lite** | Apache-2.0 | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |
| **FarmOS** | GPL-2.0 | ✅ Yes | ✅ Yes | ⚠️ Must share source | **Strong copyleft** | ⚠️ Distribution triggers copyleft |
| **LINE SDKs** | Apache-2.0 | ✅ Yes | ✅ Yes | ✅ Yes | No | ✅ Fully compatible |

**Key License Concerns:**

1. **AGPL-3.0 (The Things Stack, Grafana)**: The Affero GPL extends copyleft to network use — if you modify AGPL software and make it available over a network (e.g., a web dashboard), you must make the modified source code available. For the coffee IoT project, this means: (a) using unmodified The Things Stack and Grafana is fine; (b) modifying them requires publishing the modifications; (c) simply connecting to them via API does not trigger copyleft. Since the project does not plan to modify The Things Stack or Grafana core, AGPL compliance is straightforward — just use them as-is and contribute any improvements back to the upstream projects.

2. **GPL-2.0 (FarmOS)**: Standard GPL triggers copyleft on distribution. Since FarmOS runs as a web application, the project can modify FarmOS without distributing it (the "SaaS loophole"). However, ethical open-source practice recommends contributing modifications upstream regardless.

3. **Apache-2.0 and MIT (everything else)**: Permissive licenses with no copyleft. Freely combinable with any other license. No obligations beyond attribution.

**Bottom Line**: The recommended stack is license-compatible. The only obligation is to share any modifications to AGPL-licensed projects (The Things Stack, Grafana) if they are made available over a network. Since the project benefits from upstream contributions, this is aligned with best practices.

---

## Active Community and Support Assessment

The long-term sustainability of an open-source stack depends on the health and activity of each project's community. Abandoned projects become security risks and compatibility nightmares.

| Project | Last Commit | Contributors | Release Cadence | Risk Level | Thai Community |
|---------|------------|-------------|-----------------|-----------|----------------|
| **The Things Stack** | Active (weekly) | 100+ | Quarterly | ✅ Low | Small but growing |
| **InfluxDB** | Active (daily) | 500+ | Monthly | ✅ Low | Moderate |
| **TimescaleDB** | Active (weekly) | 100+ | Monthly | ✅ Low | Small |
| **Grafana** | Active (daily) | 1,000+ | Monthly | ✅ Very Low | Moderate |
| **Node-RED** | Active (weekly) | 200+ | Quarterly | ✅ Low | Growing (Smart Farm Thailand group) |
| **Home Assistant** | Active (daily) | 2,000+ | Monthly | ✅ Very Low | Small |
| **HandySense** | Active (NECTEC team) | NECTEC staff | Irregular | ⚠️ Medium | ⭐ Strong (government-backed) |
| **TensorFlow Lite** | Active (daily) | 1,000+ | Monthly | ✅ Very Low | Growing (Thai ML community) |
| **FarmOS** | Active (monthly) | 30+ | Semi-annual | ⚠️ Medium | Very small |
| **LINE SDKs** | Active (monthly) | LINE staff | Quarterly | ✅ Low | ⭐ Strong (LINE is dominant in TH) |

**Risk Mitigation**: The two medium-risk projects (HandySense, FarmOS) are mitigated by institutional backing. HandySense is supported by NECTEC/NSTDA, which has a multi-year commitment to the platform. FarmOS has a dedicated core team and is used by USDA and other agricultural agencies. Both are unlikely to be abandoned in the near term.

---

## Integration Complexity and Learning Curve

| Project | Setup Time | Learning Curve | Documentation Quality | Integration Effort | Total Effort to Production |
|---------|-----------|---------------|----------------------|-------------------|---------------------------|
| **The Things Stack** | 2-4 hours | Moderate | Good | Low (MQTT output) | 1-2 days |
| **InfluxDB** | 1-2 hours | Easy | Excellent | Low (Telegraf MQTT → InfluxDB) | 1 day |
| **TimescaleDB** | 2-4 hours | Moderate | Good | Medium (requires ETL) | 2-3 days |
| **Grafana** | 2-4 hours | Easy-Moderate | Excellent | Low (connects to InfluxDB) | 2-3 days (basic dashboards) |
| **Node-RED** | 1-2 hours | Easy | Good | Medium (custom flows) | 3-5 days (full alert pipeline) |
| **Home Assistant** | 2-4 hours | Moderate | Excellent | Medium | 3-5 days |
| **HandySense** | 1-2 hours | Easy | Moderate (Thai) | Low (cloud; just register) | 1 day |
| **TensorFlow Lite** | 1-2 weeks | Hard | Good | High (model training + deployment) | 4-8 weeks |
| **FarmOS** | 4-8 hours | Moderate | Good | High (custom data model) | 1-2 weeks |
| **LINE Bot** | 2-4 hours | Easy | Excellent | Low (SDK handles messaging) | 2-3 days |

---

## Recommended Technology Stack

Based on the analysis above, the following stack represents the optimal combination of open-source projects for the Northern Thailand coffee IoT system, balancing capability, simplicity, cost, and long-term sustainability.

### Stack Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        FARMER INTERFACE LAYER                        │
│  LINE Bot (Messaging API) + Grafana (Mobile Dashboard)              │
│  HandySense Mobile App (Companion)                                   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                    AUTOMATION & LOGIC LAYER                          │
│  Node-RED (Decision Logic, Alert Routing, Data Pipeline)            │
│  Custom JavaScript (Coffee-specific rules from [[Decision-Logic]])   │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                     DATA & STORAGE LAYER                             │
│  InfluxDB (Sensor time-series) + SQLite (Farm records, offline)     │
│  HandySense Cloud (Primary ingestion, AI recommendations)           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                   NETWORK & CONNECTIVITY LAYER                       │
│  The Things Stack (LoRaWAN server, AS923)                            │
│  RAK7268 Gateway (8-channel, 4G backhaul)                           │
└──────────────────────────────┬──────────────────────────────────────┘
                               │
┌──────────────────────────────┼──────────────────────────────────────┐
│                     SENSOR & EDGE LAYER                              │
│  Heltec WiFi LoRa 32 V3 (ESP32-S3 + SX1262)                        │
│  SHT31 + Capacitive V1.2 + BH1750 + DS18B20 + DIY Leaf Wetness     │
│  TensorFlow Lite (Edge CLR prediction - Phase 2)                    │
└─────────────────────────────────────────────────────────────────────┘
```

### Stack Component Summary

| Layer | Primary Tool | Backup/Alternative | License | Why This Choice |
|-------|-------------|-------------------|---------|----------------|
| **LoRaWAN Server** | The Things Stack | ChirpStack (alternative) | AGPL-3.0 | Most mature; AS923 support; free community tier |
| **Data Ingestion** | HandySense Cloud | TTN HTTP webhook | NECTEC license | Free; Thai language; AI recommendations; government-backed |
| **Time-Series DB** | InfluxDB | TimescaleDB | MIT | Purpose-built for IoT; Telegraf MQTT integration; easy |
| **Visualization** | Grafana | HandySense dashboard | AGPL-3.0 | Best-in-class charts; threshold bands; alerting; free self-hosted |
| **Automation** | Node-RED | Custom Python/Node.js | Apache-2.0 | Visual programming; LINE bot integration; fast development |
| **Notifications** | LINE Messaging API | SMS gateway (AIS) | Apache-2.0 (SDK) | Thailand's #1 messaging app; farmer already uses it |
| **Edge ML** | TensorFlow Lite | Edge Impulse (prototyping) | Apache-2.0 | Industry standard; ESP32-S3 support; INT8 quantization |
| **Farm Management** | Custom (Phase 2) | FarmOS (Phase 3) | GPL-2.0 | Start simple; add FarmOS when scaling to cooperative |
| **Weather Data** | TMD API (via HandySense) | OpenWeatherMap | Free / Freemium | Thai-specific; already integrated with HandySense |

### Deployment Cost Estimate

| Component | Hosting | Annual Cost (THB) | Notes |
|-----------|---------|-------------------|-------|
| The Things Stack | TTN Community (cloud) | 0 | Free tier sufficient for pilot |
| HandySense Cloud | NECTEC servers | 0 | Free for Thai farmers |
| InfluxDB | VPS (2-core, 4GB) | 3,600-7,200 | Shared with Grafana + Node-RED |
| Grafana | Same VPS | 0 | Runs alongside InfluxDB |
| Node-RED | Same VPS | 0 | Runs alongside InfluxDB + Grafana |
| LINE Bot | Serverless (Cloudflare Workers) | 100-300 | Minimal compute for webhook processing |
| **Total annual platform cost** | | **3,700-7,500** | Plus 4G SIM 1,200 THB/year |

---

## Practical Recommendations

1. **Start with HandySense B-Farm as the primary platform.** Register at handysense.nectec.or.th, deploy sensors using their open hardware designs, and use their mobile app for initial monitoring. This gives you a working system from Day 1 with zero infrastructure setup. Layer Grafana and Node-RED on top in Phase 2 when you need coffee-specific dashboards and alert logic.

2. **Use Node-RED for the Decision Logic engine.** The 40+ IF-THEN rules defined in [[Decision-Logic]] can be implemented as Node-RED flows with JavaScript function nodes. Node-RED's visual interface makes the rules visible and editable by non-programmers — a cooperative manager can adjust a threshold by changing a number in a node, rather than editing source code.

3. **Deploy Grafana for the web dashboard (researchers and managers).** While farmers primarily use the LINE bot and HandySense mobile app, researchers, cooperative managers, and government extension officers need the rich analytical dashboards that only Grafana provides. Build a Grafana dashboard that mirrors the [[Visualization-Dashboard]] specifications, connecting to the same InfluxDB instance that Node-RED populates.

4. **Use TTN Community Edition for the first year.** The Things Network's free community edition handles up to 10 gateways and provides more than enough capacity for a pilot deployment. Migrate to self-hosted only when you need: (a) data sovereignty (Thai-hosted servers), (b) more than 30 seconds of daily uplink per device, or (c) custom payload decoder complexity that TTN's web interface cannot handle.

5. **Defer TensorFlow Lite to Phase 2.** Edge ML inference is exciting but requires labeled training data that will only be available after 1-2 seasons of sensor data collection. Focus Phase 1 on getting the data pipeline right (sensors → LoRa → cloud → dashboard → alerts). Begin ML model development in Phase 2 using the collected data.

6. **Build the LINE bot first, mobile app second.** The LINE bot requires zero installation for farmers and can be built in 2-3 developer weeks. It validates the entire value chain (sensor data → decision logic → farmer notification → action) before investing in a dedicated mobile app. Use LINE bot engagement metrics to prioritize mobile app features.

7. **Choose InfluxDB over TimescaleDB for the initial deployment.** InfluxDB's purpose-built time-series architecture and Telegraf MQTT consumer make it faster to deploy and easier to operate. TimescaleDB is worth reconsidering when the system needs to join sensor data with relational farm management records (Phase 3: FarmOS integration).

8. **Design APIs to be OADA/SensorThings compatible.** Even if you don't implement full OADA or SensorThings API endpoints initially, structure your data model and REST API to be compatible with these standards. Thailand's Agriculture 4.0 strategy will likely adopt or inspire similar standards, and compatibility from the start avoids painful refactoring later.

9. **Host everything on a single VPS for simplicity.** InfluxDB, Grafana, and Node-RED can all run on a single 2-core, 4GB RAM VPS for under 600 THB/month. This simplifies deployment, reduces latency between components, and keeps all data in one place. Use Docker Compose for easy management. Thai cloud providers (CAT Telecom, True IDC) or AWS Singapore (ap-southeast-1) are suitable hosting locations.

10. **Contribute back to the open-source community.** When you build coffee-specific Node-RED nodes (e.g., a "CLR Risk Calculator" node), Grafana dashboard templates for coffee sensor data, or TensorFlow Lite models for disease prediction, publish them as open-source contributions. This builds the project's reputation, attracts collaborators, and ensures the broader agricultural IoT community benefits from your work.

---

## Related Topics

- [[Research-Papers]] — Academic papers on IoT agriculture, LoRaWAN, and precision farming
- [[Suppliers-Thailand]] — Hardware suppliers for sensor nodes, LoRa modules, and single-board computers
- [[Visualization-Dashboard]] — Detailed dashboard design specifications implemented using Grafana
- [[Decision-Logic]] — IF-THEN rule engine implemented in Node-RED
- [[Communication-Modules]] — LoRa AS923 technical details and gateway configuration
- [[Government-Programs]] — HandySense B-Farm program details and NECTEC workshop access
- [[System-Cost-Estimate]] — Hardware and hosting cost analysis
- [[Sensor-Metrics-Thresholds]] — Threshold values used in Grafana charts and Node-RED alert rules

---

## References

1. The Things Industries — The Things Stack documentation: thethingsindustries.com/docs
2. InfluxData — InfluxDB v2 documentation: docs.influxdata.com
3. Timescale Inc. — TimescaleDB documentation: docs.timescale.com
4. Grafana Labs — Grafana documentation: grafana.com/docs
5. Node-RED — Documentation and community flows: nodered.org
6. NECTEC — HandySense B-Farm: handysense.nectec.or.th
7. LINE Corporation — LINE Messaging API SDK: github.com/line/line-bot-sdk-nodejs
8. TensorFlow — TensorFlow Lite for Microcontrollers: tensorflow.org/lite/microcontrollers
9. FarmOS — Documentation: farmos.org/development
10. Open Ag Data Alliance — Specification: openag.io
11. OGC — SensorThings API: opengeospatial.org/standards/sensorthings
12. OpenWeatherMap — API documentation: openweathermap.org/api
13. ChirpStack — Alternative LoRaWAN server: chirpstack.io
14. Edge Impulse — TinyML development platform: edgeimpulse.com

---

*Last updated: 2026-05-13*
