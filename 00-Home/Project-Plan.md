# 📋 Project Plan — Coffee Agriculture Knowledge Base

## Overview

Build a comprehensive, research-backed Obsidian knowledge base for IoT-driven coffee farming in Northern Thailand. This knowledge base will serve as the data foundation for building a sensor → analyze → visualize → alert system for farmers.

---

## Task Breakdown

### ✅ Phase 0: Setup (Current)
- [x] Clone repo & verify access
- [x] Design Obsidian folder structure
- [x] Create Home index & MOC
- [x] Create project plan
- [ ] Push initial structure to GitHub

---

### 🔲 Phase 1: IoT Hardware & Sensors
**Objective**: Document all IoT sensors and hardware for coffee farm monitoring, focused on availability and pricing in Thailand.

| Task | Details | Status |
|------|---------|--------|
| Soil Moisture Sensors | Capacitive vs resistive, models, THB pricing, Thailand sources | 🔲 |
| Temperature Sensors | DHT22, DS18B20, BME280 — outdoor suitability | 🔲 |
| Air Humidity Sensors | DHT22, SHT31, BME280 — accuracy comparison | 🔲 |
| Rainfall Sensors | Tipping bucket vs rain-drop, durability | 🔲 |
| Light / PAR Sensors | BH1750, TSL2561 — sunlight measurement | 🔲 |
| Soil pH Sensors | DFRobot pH module, probe maintenance | 🔲 |
| Soil NPK Sensors | 7-in-1 RS485 modules, accuracy concerns | 🔲 |
| Wind Speed Sensors | Cup anemometer, wind direction | 🔲 |
| Microcontrollers | ESP32, ESP8266, LILYGO LoRa32 — comparison | 🔲 |
| Communication | LoRa AS923 (Thailand band), WiFi, 4G LTE | 🔲 |
| Power Solutions | Solar panels, 18650 battery, power management | 🔲 |
| Full System Cost Estimate | Budget / Mid / Pro tiers for 5-10 rai farm | 🔲 |
| Installation Guide | Field deployment tips for coffee terrain | 🔲 |

**Key Consideration**: Thailand uses **LoRa AS923 (920-923 MHz)**. 2G is being phased out — avoid SIM800L, use 4G LTE modules.

---

### 🔲 Phase 2: Weather & Environment
**Objective**: Define ideal weather and sunlight conditions for coffee in Northern Thailand.

| Task | Details | Status |
|------|---------|--------|
| N. Thailand Weather Patterns | Monthly temp/rain/sun by province (Chiang Mai, Chiang Rai, Mae Hong Son, Nan) | 🔲 |
| Coffee Sunlight Requirements | Daily hours, shade %, shade tree species | 🔲 |
| Arabica Climate Range | Altitude, temp, rainfall, humidity optima | 🔲 |
| Robusta Climate Range | Same parameters, comparison with Arabica | 🔲 |
| Microclimate Factors | Slope aspect, wind protection, frost risk, fog | 🔲 |
| Climate Change Impact | Temperature rise, rainfall irregularity | 🔲 |

---

### ✅ Phase 3: Coffee Seed Variations
**Objective**: Identify best coffee varieties for Northern Thailand conditions.

| Task | Details | Status |
|------|---------|--------|
| Arabica Varieties | Catimor/Chiang Mai 80, Typica, Caturra, Geisha, MLDT selections — altitude match | ✅ |
| Robusta Varieties | Chumphon selections, FRT-series clones, GI-registered Robusta | ✅ |
| Seed Sources | Thai nurseries, DOA stations, verified suppliers | ✅ |
| Variety Selection Guide | Decision matrix: altitude → variety → expected quality | ✅ |

---

### 🔲 Phase 4: Farmer Knowledge
**Objective**: Document what farmers need to know to maximize quality and quantity.

| Task | Details | Status |
|------|---------|--------|
| Cultivation Best Practices | Planting density, pruning, shade management | 🔲 |
| Soil Management | pH targets, organic matter, NPK requirements | 🔲 |
| Pest & Disease Management | Coffee leaf rust, berry borer, CBB | 🔲 |
| Harvesting Techniques | Selective picking, timing, cherry maturity | 🔲 |
| Post-Harvest Processing | Wet/dry/honey process, fermentation, drying | 🔲 |
| Economics & Profitability | Cost per rai, yield expectations, market prices | 🔲 |

---

### 🔲 Phase 5: Sensor Metrics & Decision System
**Objective**: Define how sensor data translates to decisions, predictions, and alerts.

| Task | Details | Status |
|------|---------|--------|
| Sensor Metrics & Thresholds | Ideal ranges per sensor per coffee type & growth stage | 🔲 |
| Decision Logic Engine | IF-THEN rules: sensor values → action recommendations | 🔲 |
| Alerts & Remediation | Alert levels (warning/critical), recommended actions | 🔲 |
| Environment Intervention | When weather is not ideal → what can we do to fix it | 🔲 |
| Yield & Quality Prediction | Sensor data → predicted yield & quality grade | 🔲 |
| Visualization & Dashboard | Chart types, KPI panels, mobile-friendly design | 🔲 |

---

## Execution Strategy

We will tackle these **one phase at a time**, completing all tasks within a phase before moving to the next. Each completed phase gets pushed to the repo.

1. **Phase 1** → IoT Hardware (most foundational — defines what we can measure)
2. **Phase 2** → Weather & Environment (defines what conditions we need)
3. **Phase 3** → Coffee Varieties (defines what we grow)
4. **Phase 4** → Farmer Knowledge (defines the domain expertise)
5. **Phase 5** → Sensor System (ties everything together into the system)

---

## Repo Structure

```
prime-my-b/
├── 00-Home/                    # Index, MOC, Project Plan
├── 01-IoT-Hardware/            # Phase 1: Sensors, MCU, Comms, Power, Costs
│   ├── Sensors/
│   ├── Microcontrollers/
│   ├── Communication/
│   ├── Power-Solutions/
│   ├── Cost-Estimates/
│   └── Installation-Guides/
├── 02-Environment/             # Phase 2: Weather, Sunlight, Microclimate
│   ├── Weather-Patterns/
│   ├── Sunlight-Requirements/
│   ├── Microclimate/
│   └── Climate-Change/
├── 03-Coffee-Varieties/        # Phase 3: Arabica, Robusta, Sources
│   ├── Arabica/
│   ├── Robusta/
│   └── Seed-Sources/
├── 04-Farmer-Knowledge/        # Phase 4: Cultivation, Soil, Pests, Harvest
│   ├── Cultivation/
│   ├── Soil-Management/
│   ├── Pest-Disease/
│   ├── Harvesting/
│   ├── Post-Harvest/
│   └── Economics/
├── 05-Sensor-System/           # Phase 5: Metrics, Decisions, Alerts, Viz
│   ├── Metrics-Thresholds/
│   ├── Decision-Logic/
│   ├── Alerts-Remediation/
│   └── Visualization/
├── 06-Resources/               # References, Suppliers, Gov Programs
│   ├── Research-Papers/
│   ├── Suppliers/
│   └── Government-Programs/
└── templates/                  # Reusable templates
```

---

*Created: 2026-05-12*
*Phase 3 completed: 2026-05-12*
