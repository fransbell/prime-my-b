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
- [x] Push initial structure to GitHub

---

### ✅ Phase 1: IoT Hardware & Sensors
**Objective**: Document all IoT sensors and hardware for coffee farm monitoring, focused on availability and pricing in Thailand.

| Task | Details | Status |
|------|---------|--------|
| Soil Moisture Sensors | Capacitive vs resistive, models, THB pricing, Thailand sources | ✅ |
| Temperature Sensors | DHT22, DS18B20, BME280 — outdoor suitability | ✅ |
| Air Humidity Sensors | DHT22, SHT31, BME280 — accuracy comparison | ✅ |
| Rainfall Sensors | Tipping bucket vs rain-drop, durability | ✅ |
| Light / PAR Sensors | BH1750, TSL2561 — sunlight measurement | ✅ |
| Soil pH Sensors | DFRobot pH module, probe maintenance | ✅ |
| Soil NPK Sensors | 7-in-1 RS485 modules, accuracy concerns | ✅ |
| Wind Speed Sensors | Cup anemometer, wind direction | ✅ |
| Microcontrollers | ESP32, ESP8266, LILYGO LoRa32 — comparison | ✅ |
| Communication | LoRa AS923 (Thailand band), WiFi, 4G LTE | ✅ |
| Power Solutions | Solar panels, 18650 battery, power management | ✅ |
| Full System Cost Estimate | Budget / Mid / Pro tiers for 5-10 rai farm | ✅ |
| Installation Guide | Field deployment tips for coffee terrain | ✅ |

**Key Consideration**: Thailand uses **LoRa AS923 (920-923 MHz)**. 2G is being phased out — avoid SIM800L, use 4G LTE modules.

---

### ✅ Phase 2: Weather & Environment
**Objective**: Define ideal weather and sunlight conditions for coffee in Northern Thailand.

| Task | Details | Status |
|------|---------|--------|
| N. Thailand Weather Patterns | Monthly temp/rain/sun by province (Chiang Mai, Chiang Rai, Mae Hong Son, Nan) | ✅ |
| Coffee Sunlight Requirements | Daily hours, shade %, shade tree species | ✅ |
| Arabica Climate Range | Altitude, temp, rainfall, humidity optima | ✅ |
| Robusta Climate Range | Same parameters, comparison with Arabica | ✅ |
| Microclimate Factors | Slope aspect, wind protection, frost risk, fog | ✅ |
| Climate Change Impact | Temperature rise, rainfall irregularity | ✅ |

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

### ✅ Phase 4: Farmer Knowledge
**Objective**: Document what farmers need to know to maximize quality and quantity.

| Task | Details | Status |
|------|---------|--------|
| Cultivation Best Practices | Planting density, pruning, shade management | ✅ |
| Soil Management | pH targets, organic matter, NPK requirements | ✅ |
| Pest & Disease Management | Coffee leaf rust, berry borer, CBB | ✅ |
| Harvesting Techniques | Selective picking, timing, cherry maturity | ✅ |
| Post-Harvest Processing | Wet/dry/honey process, fermentation, drying | ✅ |
| Economics & Profitability | Cost per rai, yield expectations, market prices | ✅ |

---

### ✅ Phase 5: Sensor Metrics & Decision System
**Objective**: Define how sensor data translates to decisions, predictions, and alerts.

| Task | Details | Status |
|------|---------|--------|
| Sensor Metrics & Thresholds | Ideal ranges per sensor per coffee type & growth stage | ✅ |
| Decision Logic Engine | IF-THEN rules: sensor values → action recommendations | ✅ |
| Alerts & Remediation | Alert levels (warning/critical), recommended actions | ✅ |
| Environment Intervention | When weather is not ideal → what can we do to fix it | ✅ |
| Yield & Quality Prediction | Sensor data → predicted yield & quality grade | ✅ |
| Visualization & Dashboard | Chart types, KPI panels, mobile-friendly design | ✅ |

**Key Insight**: Phase 5 ties all previous phases together — sensor hardware (Phase 1) provides the data, environmental ranges (Phase 2) define the thresholds, coffee varieties (Phase 3) determine variety-specific rules, farmer knowledge (Phase 4) informs the remediation actions, and this phase creates the complete decision-to-action pipeline: **Sensors → Thresholds → IF-THEN Rules → Alerts → Interventions → Predictions → Dashboard**.

---

### ✅ Phase 6: Resources
**Objective**: Compile research references, supplier directories, and government program information.

| Task | Details | Status |
|------|---------|--------|
| Research Papers & References | Comprehensive bibliography of all cited sources (95+ references), organized by topic | ✅ |
| Suppliers in Thailand | IoT sensor suppliers, coffee farming equipment, online marketplaces, delivery logistics | ✅ |
| Government Programs & Support | Royal Project, DOA/DOAE, HandySense B-Farm, DEPA OTOD, BAAC loans, training programs | ✅ |

---

### ✅ Phase 7: Competitive Landscape
**Objective**: Research existing IoT agriculture products and government projects in Thailand that overlap with Prime My B's vision, analyze their capabilities and gaps, and define strategic positioning.

| Task | Details | Status |
|------|---------|--------|
| Government IoT Platforms | HandySense B-Farm, NECTEC Predictive Farming, DEPA OTOD, Agriculture 4.0 | ✅ |
| Commercial IoT Products | Ricult, SkyVIV, SPsmartplants, dtac Smart Farmer, Swift Dynamics, KhawTECH, Easyrice | ✅ |
| Coffee Region Projects | Doi Tung Development Project, Royal Project + Kiao Farming, academic research | ✅ |
| Overlap Analysis & Positioning | Competitive overlap matrix, three critical market gaps, positioning strategy, partnership recommendations | ✅ |

**Key Insight**: No existing product in Thailand offers coffee-specific IoT monitoring, coffee quality prediction, or CLR disease prediction using ground-level sensors. The market gap is clear: HandySense is crop-agnostic, Ricult uses satellites not sensors, SPsmartplants focuses on durian, and Doi Tung/Royal Project lack IoT platforms entirely. Prime My B's positioning is "the coffee-specific IoT intelligence layer for Northern Thailand."

---

### ✅ Phase 8: Pricing & Monetization Strategy (Complete)
**Objective**: Define pricing models, business models, and monetization strategies for the Prime My B coffee IoT platform based on Thai market benchmarks and competitive analysis.

| Task | Details | Status |
|------|---------|--------|
| Competitive Pricing Benchmarks | HandySense hardware tiers (3,100-9,095 THB), Ricult free model, dtac 30 THB/month, farmer WTP <80 THB/month, LINE OA pricing, global SaaS comparison | ✅ |
| Monetization Strategy | Four-tier framework: Free (acquisition), B2B (primary revenue), Government grants (launch), Premium (future); revenue projections Year 1-3; break-even at 250-400 farmers | ✅ |
| Farmer Pricing Model | Three tiers: Free (0 THB/mo), Premium (79 THB/mo under WTP ceiling), Cooperative (500-2,000 THB/group); hardware bundles 2,500-9,500 THB; conversion strategy | ✅ |
| B2B Revenue Streams | 5 streams: Coffee exporters (primary, 5K-50K THB/mo), financial institutions, input suppliers, government/research, data licensing; 3-year projection to 3.68M THB | ✅ |
| Government & Grant Funding | DEPA OTOD (200K THB/community), BAAC 0.01% loan, BOI tax incentives, Agriculture 4.0 alignment; Year 1-2 funding roadmap | ✅ |

**Key Insight**: The only viable model is B2B2C — free for farmers, paid by businesses and institutions. Quality prediction is the premium moat (unique in Thailand, 3-10x commodity-to-specialty price gap). Government grants fund launch; B2B revenue sustains operations by Year 2-3.

---

## Execution Strategy

We will tackle these **one phase at a time**, completing all tasks within a phase before moving to the next. Each completed phase gets pushed to the repo.

1. **Phase 1** → IoT Hardware (most foundational — defines what we can measure)
2. **Phase 2** → Weather & Environment (defines what conditions we need)
3. **Phase 3** → Coffee Varieties (defines what we grow)
4. **Phase 4** → Farmer Knowledge (defines the domain expertise)
5. **Phase 5** → Sensor System (ties everything together into the system)
6. **Phase 6** → Resources (references, suppliers, and support programs)
7. **Phase 7** → Competitive Landscape (market analysis and positioning)
8. **Phase 8** → Pricing & Monetization (business model and pricing strategy)

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
│   ├── Environment-Intervention/
│   ├── Yield-Quality-Prediction/
│   └── Visualization/
├── 06-Resources/               # References, Suppliers, Gov Programs
│   ├── Research-Papers/
│   ├── Suppliers/
│   └── Government-Programs/
├── 07-Competitive-Landscape/   # Phase 7: Market Analysis & Positioning
│   ├── Government-IoT-Platforms/
│   ├── Commercial-IoT-Products/
│   ├── Coffee-Region-Projects/
│   └── Overlap-Analysis/
├── 08-Pricing-Monetization/    # Phase 8: Business Model & Pricing
└── templates/                  # Reusable templates
```

---

*Created: 2026-05-12*
*Updated: 2026-05-13 — All phases complete*
