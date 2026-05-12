# 📝 Changelog

## v0.2.0 — 2026-05-12

### Added
- **Phase 2: Weather & Environment** — 6 comprehensive research documents
  - Northern Thailand Weather Patterns: Monthly climate data for Chiang Mai, Chiang Rai, Mae Hong Son, and Nan provinces (temperature, rainfall, sunshine, humidity)
  - Coffee Sunlight & Shade Requirements: PPFD values, shade percentages by growth stage, shade tree species for N. Thailand, lux-to-PPFD conversion, BH1750/TSL2561 sensor guidance
  - Arabica Climate Range: Optimal temperature (18–22°C), rainfall (1,400–2,300mm), humidity (70–80%), altitude (800–1,700m), soil requirements, Thai varieties (Catimor, Chiang Mai 80, MLDT), quality factors
  - Robusta Climate Range: Optimal temperature (22–26°C), rainfall (2,000–2,500mm), humidity (70–90%), altitude (0–800m), Kath et al. 2020 findings, Thai cultivars, viability for Northern Thailand
  - Microclimate Factors: Slope aspect effects, wind protection design, frost risk mapping, fog/CLR interaction, valley vs. ridge planting, water body proximity, vegetation effects, site assessment protocol
  - Climate Change Impact: Warming projections, rainfall changes, Arabica range shifts, disease expansion, quality effects, adaptation strategies, IoT monitoring, economic projections
- Created subdirectory structure: Weather-Patterns/, Sunlight-Requirements/, Microclimate/, Climate-Change/
- Updated Environment MOC with completion status and key insights
- Updated Home index with Phase 2 topic statuses
- Updated Project Plan with Phase 2 completion markers

### Research Sources
- 70+ references cited across all 6 documents
- Sources include: IPCC AR6, FAO, PMC/NIH studies, Thai Meteorological Department, Royal Project Foundation, Chiang Mai University, World Coffee Research, Kath et al. (2020), Böll Foundation, and many more

---

## v0.1.0 — 2026-05-12

### Added
- Initial Obsidian folder structure (6 main sections + templates)
- Home index with Map of Content (MOC)
- Project Plan with 5-phase task breakdown
- Topic template for consistent knowledge base entries
- Glossary of terms (coffee, IoT, Thailand-specific)
- Initial repo pushed to GitHub

## v0.2.0 — 2026-05-12

### Added — Phase 1: IoT Hardware & Sensors (Complete)
- **Soil Moisture Sensors** — Capacitive V1.2 (35 THB), Dragino LSE01, SenseCAP S2105, installation & calibration
- **Temperature Sensors** — SHT31, DHT22, BME280, DS18B20, radiation shield construction, coffee temp thresholds
- **Air Humidity Sensors** — SHT31 (recommended), DHT22, BME280, AHT20, CLR disease risk model, cherry drying targets
- **Rainfall Sensors** — Tipping bucket (recommended, 1,200–2,300 THB), rain drop module (avoid), N. Thailand seasonal rainfall
- **Light / PAR Sensors** — BH1750 shade measurement method, PAR vs lux explanation, coffee shade targets (40–70%)
- **Soil pH Sensors** — DFRobot SEN0161-V2, cannot be buried continuously, DOA lab testing (200–500 THB), coffee pH 5.0–6.5
- **Soil NPK Sensors** — Budget 7-in-1 unreliable (50–200% error), DOA lab testing recommended, fertilization schedule
- **Wind Speed & Direction** — RS485 combined sensor (2,000–4,000 THB), CLR spore dispersal, cherry drying
- **Leaf Wetness Sensors** — Dragino LLMS01, DIY sensor (50–100 THB), CLR prediction model (>24h wet = HIGH risk)
- **Microcontroller Comparison** — ESP32 DevKit (120 THB), Heltec LoRa V3 (900 THB, recommended), Arduino (avoid)
- **Communication Modules** — LoRa AS923, RAK7268 gateway, 4G LTE A7670 (never SIM800L), NB-IoT, architecture diagram
- **Power Solutions** — Solar + 18650 battery, power budget analysis, 150+ days on single battery, TP4056 wiring
- **System Cost Estimate** — Budget WiFi ~690 THB/node, LoRa ~1,460 THB/node, 10-rai DIY LoRa system ~25,600 THB, ROI 4–8 months
- **Installation Guide** — Complete field deployment guide, site survey, wiring, weatherproofing, maintenance schedule

### Changed
- Updated Home MOC with Phase 1 completion status
- Updated 01-IoT-Hardware MOC with all 14 topics complete

---

## v0.2.0 — 2026-05-12

### Added — Phase 3: Coffee Seed Variations (Complete)
- Arabica-for-North-Thailand.md — 7 varieties: Chiang Mai 80, Typica, Caturra, MLDT/HDT, Geisha, SL28/SL34, Jember/S795 with altitude ranges, cup quality, disease resistance, yield data, and Northern Thailand-specific adoption rates
- Robusta-for-North-Thailand.md — Thai Robusta varieties: Chumphon 1 & 2, FRT-series clones, Conilon potential, GI-registered Robustas, Northern Thailand emerging opportunity at 200-800m elevation
- Seed-Source-Thailand.md — Government sources (DOA, DOAE, Royal Project, HRDI, NECTEC), private nurseries (CoffeeDeep, Nana Garden, Sensation Coffee), community enterprises, certification standards, import regulations, planting best practices
- Variety-Selection-Guide.md — 5-zone altitude decision matrix, 10 decision factors, financial comparison table (Arabica specialty vs commodity vs Robusta specialty vs commodity), climate change impact, case studies (Doi Chang, Doi Tung, Mae Hong Son), quick decision flowchart

### Updated
- 03-Coffee-Varieties-MOC.md — All 4 topics marked ✅ Complete
- Home.md — Phase 3 topics marked ✅ Complete
- Project-Plan.md — Phase 3 marked ✅ Complete

---

*Format based on [Keep a Changelog](https://keepachangelog.com/)*
