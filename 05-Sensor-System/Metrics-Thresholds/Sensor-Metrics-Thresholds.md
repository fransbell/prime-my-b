---
topic: Sensor Metrics & Thresholds
phase: 5
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [sensor, metrics, thresholds, decision-system, arabica, robusta, thailand]
related: [Decision-Logic, Alerts-Remediation, Environment-Intervention, Yield-Quality-Prediction, Soil-Moisture-Sensors, Temperature-Sensors, Humidity-Sensors]
---

# Sensor Metrics & Thresholds

> **Summary**: This document defines the ideal, warning, and critical threshold ranges for every sensor parameter in the coffee farm IoT system, organized by coffee type (Arabica vs. Robusta) and growth stage. These thresholds are the FOUNDATION for the entire decision system — every alert, recommendation, and automated action traces back to the values defined here.

---

## Overview

The threshold system is the intellectual core of any sensor-driven decision platform. Without clearly defined, agronomically validated thresholds, sensor data is just noise — a stream of numbers that tells a farmer nothing actionable. This document transforms raw sensor readings into structured, meaningful categories: **Optimal** (the plant is thriving), **Warning / Yellow** (conditions are drifting toward problematic and intervention should be considered), and **Critical / Red** (immediate action is required to prevent yield loss, quality degradation, or plant death). Every downstream system — the [[Decision-Logic]] engine, the [[Alerts-Remediation]] framework, the [[Environment-Intervention]] protocols, and the [[Yield-Quality-Prediction]] models — depends on these threshold definitions being accurate, well-sourced, and appropriately calibrated for Northern Thailand conditions.

The thresholds presented here are drawn from multiple sources: peer-reviewed research on coffee physiology (DaMatta & Ramalho 2006; Kath et al. 2020), FAO and DOA technical guides, the Royal Project Foundation's decades of experience in Northern Thailand, ICAFE disease models from Costa Rica, METOS/Pessl disease prediction frameworks, and direct field observations from Thai coffee-growing provinces. Where possible, we specify separate thresholds for Arabica and Robusta, as their physiological requirements differ substantially — Arabica's narrow 18–22°C optimal temperature band versus Robusta's broader 22–26°C comfort zone, Arabica's lower rainfall needs (1,400–2,300mm) versus Robusta's demand for 2,000–2,500mm, and their markedly different disease susceptibility profiles.

Crucially, thresholds are not static — they shift with growth stage, season, and local microclimate. A soil moisture reading of 25% VWC is ideal during flowering but concerning during fruit development; an air temperature of 28°C is merely warm during vegetative growth but dangerous during cherry maturation for quality. This document captures these dynamic relationships by organizing thresholds by both sensor parameter AND growth stage, and by providing seasonal adjustment guidance specific to Northern Thailand's three-season pattern.

---

## Comprehensive Threshold Tables

### Soil Moisture (VWC %)

Soil moisture is the single most actionable parameter for coffee farmers. It directly drives irrigation decisions, affects cherry sizing and quality, and determines root health. Coffee feeder roots concentrate in the top 15–30cm, making this the critical measurement zone. See [[Soil-Moisture-Sensors]] for hardware details.

| Parameter | Growth Stage | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-------------|---------------|-------------------|-----------------|-------|
| **Arabica Soil Moisture** | Seedling/Nursery | 30–40% | 25–30% or 40–45% | <25% or >45% | Young roots need consistent moisture; waterlogging causes damping-off |
| | Vegetative Growth | 25–35% | 20–25% or 35–40% | <20% or >40% | Moderate moisture supports shoot growth |
| | Flowering Initiation | 20–30% | 15–20% or 30–35% | <15% or >35% | Slight dry stress promotes bud differentiation |
| | Main Flowering | 25–35% | 20–25% or 35–45% | <20% or >45% | Stress during flowering reduces fruit set dramatically |
| | Fruit Development | 30–40% | 25–30% or 40–50% | <25% or >50% | Consistent moisture critical for cherry sizing |
| | Cherry Maturation | 25–35% | 20–25% or 35–40% | <20% or >40% | Mild stress can improve sugar accumulation |
| | Post-Harvest Recovery | 25–35% | 20–25% | <20% | Recovery requires adequate moisture |
| **Robusta Soil Moisture** | All stages | 30–45% | 25–30% or 45–55% | <25% or >55% | Robusta needs MORE water than Arabica at every stage |
| | Fruit Development | 35–45% | 30–35% or 45–55% | <30% or >55% | Highest water demand during cherry swelling |
| **Seasonal Override** | Dry Season (Nov–Apr) | 20–30% | 15–20% | <15% | Drought stress threshold; irrigate immediately |
| | Rainy Season (May–Oct) | Avoid >50% | 45–50% | >50% sustained | Waterlogging promotes root rot (Armillaria, Fusarium) |

### Air Temperature (°C)

Temperature affects every stage of coffee development — from flowering triggers to cherry maturation rate to disease risk. See [[Temperature-Sensors]] for hardware recommendations.

| Parameter | Growth Stage / Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|------------------------|---------------|-------------------|-----------------|-------|
| **Arabica Air Temp** | Overall Optimal | 18–22°C | 15–18°C or 22–24°C | <15°C or >24°C sustained | Mean annual; specialty quality degrades above 22°C |
| | Vegetative Growth | 18–24°C | 15–18°C or 24–28°C | <15°C or >28°C | Growth slows below 15°C; photosynthesis declines above 25°C |
| | Flowering Trigger | 10–15°C nights | 8–10°C or 15–18°C nights | <8°C or no cool period | Cool nights + rain trigger synchronous bloom |
| | Cherry Maturation | 18–25°C | 25–28°C | >28°C | Slower maturation = better sugar/acid accumulation |
| | Frost Risk | — | 2–5°C | <2°C (ground level) | Young tissue damaged at 2–3°C; lethal below 0°C |
| | Heat Stress | — | 28–30°C | >30°C sustained | Photosynthesis ceases; cherry sun-scald |
| **Robusta Air Temp** | Overall Optimal | 22–26°C | 20–22°C or 26–30°C | <20°C or >30°C sustained | Wider comfort zone than Arabica |
| | Cold Damage | — | 10–15°C | <10°C prolonged | Growth stops; Robusta has zero frost tolerance |
| | Heat Stress | — | 30–35°C | >35°C sustained | Leaf scorching, flower abortion |
| **Disease Risk** | CLR Spore Germination | — | 18–28°C + RH>70% | 18–28°C + RH>80% + LWD>24h | See [[Leaf-Wetness-Sensors]] for LWD thresholds |

### Soil Temperature (°C)

Soil temperature affects root function, nutrient uptake, and microbial activity. It is measured at 10–20cm depth with a DS18B20 waterproof probe. See [[Temperature-Sensors]] for hardware details.

| Parameter | Growth Stage | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-------------|---------------|-------------------|-----------------|-------|
| **Arabica Soil Temp** | All stages | 18–22°C | 15–18°C or 22–28°C | <15°C or >28°C | Root function significantly reduced above 28°C |
| | Seedling/Nursery | 20–25°C | 18–20°C or 25–28°C | <18°C or >28°C | Warm soil promotes germination and root establishment |
| | Winter Dormancy | 12–18°C | 8–12°C | <8°C | Roots remain functional; very slow growth |
| **Robusta Soil Temp** | All stages | 22–26°C | 18–22°C or 26–30°C | <18°C or >30°C | Higher optimal range matching air temp preference |
| **Northern Thailand** | Cool Season (20cm) | 16–20°C | — | — | Typical range at 1,000–1,400m elevation |
| | Hot Season (20cm) | 24–28°C | — | — | Approaches upper Arabica limit; shade helps |

### Air Humidity (% RH)

Humidity is a critical predictor of coffee leaf rust and affects cherry drying. See [[Humidity-Sensors]] for hardware details.

| Parameter | Growth Stage / Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|------------------------|---------------|-------------------|-----------------|-------|
| **Arabica Humidity** | Vegetative Growth | 70–80% | 60–70% or 80–85% | <60% or >85% sustained | Balance: growth vs. disease risk |
| | Flowering | 60–70% (post-rain) | 70–80% | >80% during bloom | High humidity during flowering promotes fungal infection |
| | Cherry Development | 60–80% | 80–85% | >85% sustained | Disease pressure increases dramatically above 80% |
| | Post-Harvest Drying | <65% | 65–75% | >75% | RH >70% slows drying; >75% risks mold and off-flavors |
| **Robusta Humidity** | Vegetative Growth | 70–90% | 60–70% or 90–95% | <60% or >95% | Higher humidity tolerance than Arabica |
| | Cherry Development | 75–85% | 85–90% | >90% sustained | Even Robusta risks non-CLR fungal diseases above 90% |
| **CLR Risk Threshold** | — | — | >80% RH at 18–28°C | >80% RH + 18–28°C + LWD>24h | Three-factor disease model; see [[Leaf-Wetness-Sensors]] |

### Rainfall (mm/day, mm/month)

Rainfall drives the entire coffee phenological cycle in Northern Thailand — the dry period triggers flowering, the wet season supports fruit development, and harvest timing depends on rain-free windows. See [[Rainfall-Sensors]] for hardware details.

| Parameter | Period / Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-------------------|---------------|-------------------|-----------------|-------|
| **Arabica Annual** | Full year | 1,400–2,300mm | 1,000–1,400mm or 2,300–2,500mm | <1,000mm or >2,500mm | Below 1,000mm requires full irrigation |
| **Robusta Annual** | Full year | 2,000–2,500mm | 1,500–2,000mm or 2,500–3,000mm | <1,500mm or >3,000mm | Robusta needs ~50% more water than Arabica |
| **Flowering Trigger** | Dry period needed | 4–6 weeks <50mm total | 3–4 weeks <50mm | No sustained dry period | Dry stress + first rain = synchronized bloom |
| **Fruit Development** | Jun–Sep monthly | 100–200mm/month | 50–100mm or 200–300mm | <50mm or >300mm/month | Consistent moisture for cherry sizing |
| **Heavy Rain Event** | Any single day | — | 50–80mm/day | >80mm/day | Cherry drop, soil erosion, rain splash disease spread |
| **Harvest Period** | Nov–Feb | <50mm/month | 50–100mm/month | >100mm/month | Rain at harvest causes mold; 30–70% price drops documented |
| **Cherry Drying** | Post-harvest | 5+ consecutive dry days | 3–5 dry days | <3 dry days | Insufficient dry days = drying failure |

### Light / Shade (%)

Shade management is essential for specialty Arabica quality in Northern Thailand. Light is measured as shade percentage (using two BH1750 lux sensors) or as PPFD (µmol/m²/s) with PAR sensors. See [[Light-Sensors]] for hardware details.

| Parameter | Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-----------|---------------|-------------------|-----------------|-------|
| **Arabica Shade %** | Shade-grown ideal | 40–60% shade | 30–40% or 60–70% | <30% or >70% | Balance quality and yield |
| | Full sun exposure | <20% shade | 20–30% shade | — | Higher yield but poor quality; heat stress risk |
| | Heavy shade | >80% shade | 70–80% shade | — | Very low yield; etiolation; high disease risk |
| **PPFD (Arabica)** | Ideal for photosynthesis | 600–1,000 µmol/m²/s | 400–600 or 1,000–1,200 | <400 or >1,200 | Shade-grown Arabica sweet spot |
| | Full tropical sun | 1,200–1,800 µmol/m²/s | — | — | Too intense without shade; leaf scorch risk |
| | Minimum for production | >100 µmol/m²/s | 50–100 | <50 | Below this, coffee cannot sustain production |
| **Robusta Shade** | Typical | 20–40% shade | 40–60% | >60% | Robusta tolerates more sun; often grown with light shade |

### Soil pH

Soil pH controls nutrient availability and must be measured periodically (not continuously — glass electrodes degrade in soil). See [[Soil-pH-Sensors]] for measurement approach.

| Parameter | Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-----------|---------------|-------------------|-----------------|-------|
| **Arabica pH** | Ideal | 5.0–6.0 | 4.5–5.0 or 6.0–6.5 | <4.5 or >6.5 | Slightly acidic; optimal nutrient availability window |
| **Robusta pH** | Ideal | 5.5–6.5 | 4.5–5.5 or 6.5–7.0 | <4.5 or >7.0 | Wider tolerance, especially on alkaline side |
| **Aluminum Toxicity** | Too acidic | — | 4.0–4.5 | <4.0 | Soluble Al³⁺ damages roots; apply lime immediately |
| **Nutrient Lockout** | Too alkaline | — | 7.0–7.5 | >7.5 | Iron, manganese, zinc become unavailable |
| **Northern Thailand** | Mountain red/yellow soils | — | Often 4.0–5.0 | — | Naturally acidic; liming commonly needed |

### Leaf Wetness Duration (hours)

Leaf wetness duration (LWD) is the single most predictive input for CLR infection risk. See [[Leaf-Wetness-Sensors]] for hardware details and the ICAFE disease model.

| LWD at 18–28°C | Humidity | CLR Risk Level | Recommended Action |
|----------------|----------|---------------|-------------------|
| >48 hours continuous | >80% RH | 🔴 EXTREME — Infection almost certain | Apply preventive fungicide immediately; prune for airflow |
| 24–48 hours | >70% RH | 🟠 HIGH — Infection likely | Apply preventive fungicide within 48 hours |
| 12–24 hours | >60% RH | 🟡 MODERATE — Some risk | Monitor closely; prepare fungicide; increase ventilation |
| <12 hours | Any | 🟢 LOW — Unfavorable for CLR | No action needed; continue routine monitoring |

> **Critical note**: The temperature window of 18–28°C is essential. Leaf wetness outside this temperature range (e.g., at 15°C or 32°C) poses dramatically lower CLR risk. Always evaluate LWD in combination with concurrent temperature readings.

### Wind Speed (m/s)

Wind affects disease spread, cherry drying, and physical damage to coffee plants. See [[Wind-Sensors]] for hardware details.

| Parameter | Condition | Optimal Range | Warning (Yellow) | Critical (Red) | Notes |
|-----------|-----------|---------------|-------------------|-----------------|-------|
| **Structural Damage** | Storm event | — | 10–15 m/s gusts | >15 m/s | Branch breakage, leaf tearing, uprooting possible |
| **Windbreak Needed** | Sustained average | — | 3–5 m/s average | >5 m/s average | Plant Leucaena, Gliricidia, or Erythrina windbreaks |
| **Cherry Drying** | Post-harvest | 1–2 m/s | 0.5–1 m/s or 2–5 m/s | <0.5 m/s or >5 m/s | <0.5 = very slow drying; >5 = risk of blowing cherries |
| **CLR Spore Dispersal** | During rain + CLR present | — | >3 m/s with rain | >5 m/s with rain | Wind-driven rain disperses spores hundreds of meters |
| **Robusta Pollination** | During flowering | 1–3 m/s | 0.5–1 or 3–5 m/s | <0.5 m/s or >5 m/s | Moderate wind aids cross-pollination; Arabica is self-pollinating |

### Soil NPK (kg/ha)

Soil NPK sensors are the least reliable in the IoT toolkit. Budget sensors have 50–200% error from lab values. Use them for trend monitoring only — validate all critical decisions with DOA lab tests. See [[NPK-Sensors]] for the full reality check.

| Nutrient | Target Level | Warning | Critical | Notes |
|----------|-------------|---------|----------|-------|
| **Nitrogen (N)** | 200–300 kg/ha | 150–200 or 300–400 | <150 or >400 | Drives vegetative growth and cherry production; excess causes leafiness without fruit |
| **Phosphorus (P)** | 30–60 kg/ha | 20–30 or 60–80 | <20 or >80 | Critical for root development and flowering; often locked by low pH |
| **Potassium (K)** | 200–400 kg/ha | 150–200 or 400–500 | <150 or >500 | Cherry quality, disease resistance, drought tolerance; highest demand during fruit development |
| **NPK Sensor Reliability** | — | 50–100% error | >100% error | ⚠️ Use for TREND monitoring only; never for fertilizer rate decisions |

---

## Growth Stage Definitions

Understanding which growth stage the coffee plants are in is essential for applying the correct thresholds. The same sensor reading can be optimal in one stage and critical in another. The following definitions establish a common vocabulary for the entire decision system.

| Growth Stage | Duration | Key Characteristics | Primary Sensor Focus |
|-------------|----------|---------------------|---------------------|
| **Seedling/Nursery** | 0–12 months | Germination, root establishment, first true leaves; plants are extremely vulnerable to drought, waterlogging, and temperature extremes; typically grown in poly bags under shade netting | Soil moisture (30–40%), soil temp (20–25°C), shade (50–70%) |
| **Vegetative Growth** | 12–36 months after planting | Rapid shoot and leaf development; building canopy and root system; not yet reproductive | Soil moisture (25–35%), temperature (18–24°C), N nutrition |
| **Flowering Initiation** | 2–4 weeks (Feb–Mar in N. Thailand) | Dry stress period triggers flower bud differentiation; first rains after dry period initiate bloom; critical transition period | Rainfall (dry period tracking), night temperature (10–15°C), soil moisture (20–30%) |
| **Main Flowering** | 1–2 weeks | Mass synchronous bloom; pollination (self in Arabica, cross in Robusta); rain during flowering can wash pollen and reduce fruit set to <4% | Humidity (60–70%), rainfall (<20mm/day), wind (1–3 m/s for Robusta) |
| **Fruit Development** | 3–5 months (May–Sep) | Cherry swelling and filling; highest water and nutrient demand; K is critical for cherry sizing | Soil moisture (30–40%), rainfall (100–200mm/month), K nutrition |
| **Cherry Maturation** | 2–3 months (Sep–Nov) | Sugar accumulation, color change from green to red/purple; slower maturation = better quality; diurnal range important | Temperature (18–25°C), soil moisture (25–35%), diurnal range (>10°C) |
| **Harvest** | 1–3 months (Nov–Feb) | Selective picking of ripe cherries; drying conditions critical; rain is the primary quality risk | Rainfall (<50mm/month), humidity (<65% for drying), wind (>2 m/s for drying) |
| **Post-Harvest Recovery** | 1–2 months (Feb–Apr) | Plant recovers from fruiting stress; new vegetative growth; fertilizer application for next cycle | Soil moisture (25–35%), N nutrition, soil pH |

---

## Arabica vs. Robusta Comparison Table

This side-by-side comparison highlights the fundamental physiological differences that drive separate threshold definitions. In Northern Thailand, Arabica is grown at 800–1,700m and Robusta at 200–500m, so they rarely share the same farm — but a monitoring system must support both.

| Parameter | Arabica | Robusta | Key Difference |
|-----------|---------|---------|----------------|
| **Optimal Air Temp** | 18–22°C | 22–26°C | Robusta needs +4°C more |
| **Tolerable Air Temp** | 15–24°C | 20–30°C | Robusta has wider comfort zone |
| **Frost Tolerance** | Damaged at <2°C; lethal <0°C | NO frost tolerance; lethal at 0°C | Arabica slightly hardier |
| **Heat Stress** | >30°C | >35°C | Robusta has +5°C heat advantage |
| **Optimal Annual Rainfall** | 1,400–2,300mm | 2,000–2,500mm | Robusta needs ~50% more water |
| **Optimal Humidity** | 70–80% | 70–90% | Robusta tolerates higher humidity |
| **Disease Risk Humidity** | >80% = CLR risk | CLR resistant (Shrz gene) | Fundamental disease susceptibility difference |
| **Optimal Soil pH** | 5.0–6.0 | 5.5–6.5 | Robusta prefers slightly less acidic |
| **Tolerable Soil pH** | 4.5–6.5 | 4.5–7.0 | Robusta has wider pH tolerance |
| **Shade Preference** | 40–60% shade | 20–40% shade | Arabica needs more shade for quality |
| **Altitude (N. Thailand)** | 800–1,700m | 200–500m | Fundamentally different elevation zones |
| **Optimal Soil Moisture** | 25–35% VWC | 30–45% VWC | Robusta needs more soil moisture |
| **Drought Tolerance** | Better (physiological) | Worse (avoids via deep roots) | Common misconception: Robusta is NOT more drought-tolerant |
| **Flowering Trigger** | Cool nights (10–15°C) + rain | Dry period + rain; no cool requirement | Arabica needs temperature cue |
| **Pollination** | Self-pollinating | Cross-pollinating (needs insects/wind) | Different wind thresholds during flowering |
| **Flowering Temp Trigger** | 10–15°C nights | No specific temp trigger | Only Arabica needs cool nights |
| **Root System** | Shallower feeder roots | Deeper, more extensive | Robusta needs deeper soils (1–2m+) |

---

## Seasonal Threshold Variation (Northern Thailand)

Northern Thailand has three distinct seasons that fundamentally shift which thresholds matter most and how they should be interpreted. The same VWC reading of 30% means different things in February (adequate for the dry season) versus August (possibly too low for peak fruit development). The decision system must apply seasonal context to every threshold evaluation.

### Cool-Dry Season (November–February)

This season defines Northern Thailand's quality advantage. Cool nights and dry conditions provide the diurnal temperature range essential for sugar accumulation and the dry period that triggers synchronized flowering. However, it also brings the most acute risks: frost at high elevations, drought stress, and cold damage to young plants.

| Parameter | Seasonal Focus | Key Thresholds | Priority Actions |
|-----------|---------------|----------------|-----------------|
| **Air Temperature** | Frost risk at >1,200m | Critical: <2°C at ground level | Activate frost protection; monitor low-elevation sensors hourly |
| **Soil Moisture** | Irrigation needs | Warning: <20% VWC; Critical: <15% | Schedule irrigation; prioritize recently flowering trees |
| **Rainfall** | Flowering trigger tracking | Track consecutive days <2mm; target 4–6 week dry period | Document dry period for flowering prediction |
| **Humidity** | Generally favorable | >80% in fog-prone areas = CLR risk | Monitor CLR even in dry season; fog extends leaf wetness |
| **Wind** | Cold wind damage | >5 m/s average = wind chill stress | Windbreaks critical at high elevation |
| **Night Temperature** | Flowering initiation | 10–15°C nights trigger bud development | Log night temperatures for flowering prediction model |

### Hot-Dry Season (March–May)

This is the most stressful season for coffee plants. Temperatures peak, soil moisture depletes rapidly, and the transition from dry to wet triggers the most important event in the coffee calendar: flowering. The burning season (February–April) adds PM2.5 stress that compounds heat effects. Successful management of this period determines the entire year's yield potential.

| Parameter | Seasonal Focus | Key Thresholds | Priority Actions |
|-----------|---------------|----------------|-----------------|
| **Air Temperature** | Heat stress | Warning: >28°C; Critical: >30°C for Arabica | Increase shade; irrigate for evaporative cooling |
| **Soil Moisture** | Critical irrigation period | Warning: <25% VWC; Critical: <20% | Irrigate immediately; flowering trees need 30–35% VWC |
| **Rainfall** | First rains = FLOWERING | First significant rain (>10mm) after dry period triggers bloom | Alert farmer to flowering event; protect from heavy rain |
| **Soil Temperature** | Root zone overheating | Warning: >25°C at 20cm; Critical: >28°C | Mulch heavily; shade management; irrigate to cool soil |
| **Humidity** | Generally low = favorable | <50% = excessive transpiration stress | Irrigate to maintain humidity in canopy zone |
| **Light / Shade** | Peak solar radiation | Shade >60% critical for quality | Ensure shade trees have full canopy; prune if >80% shade |

### Rainy Season (May–October)

The rainy season brings the bulk of annual rainfall and the highest disease pressure. For 5–6 months, coffee plants experience warm temperatures, high humidity, and frequent rain — conditions that are simultaneously ideal for cherry development and for coffee leaf rust infection. The decision system must balance supporting fruit development against managing disease risk, often requiring contradictory actions (keep leaves dry vs. maintain soil moisture).

| Parameter | Seasonal Focus | Key Thresholds | Priority Actions |
|-----------|---------------|----------------|-----------------|
| **Leaf Wetness** | CLR infection risk | >24h at 18–28°C = HIGH risk; >48h = EXTREME | Apply fungicide; prune for airflow; alert farmer |
| **Humidity** | Disease pressure | >80% sustained = CLR epidemic risk | Increase spacing pruning; copper-based fungicide schedule |
| **Rainfall** | Waterlogging and erosion | >80mm/day = cherry drop; >300mm/month = waterlogging | Drainage maintenance; soil moisture monitoring for waterlogging |
| **Soil Moisture** | Waterlogging risk | >50% VWC sustained = root rot risk | Check drainage; reduce irrigation (none needed) |
| **Wind** | Storm damage | >15 m/s gusts = physical damage | Pre-storm pruning; secure young trees; harvest ripe cherries before storms |
| **Shade** | Balance light and airflow | >70% shade + high humidity = disease trap | Selectively prune shade trees; thin canopy for airflow |
| **Temperature** | CLR window monitoring | 18–28°C + rain + high RH = prime CLR conditions | Weekly CLR scouting; preventive fungicide during peak risk periods |

---

## Data Quality Notes

Not all sensor data is created equal. The threshold system must account for varying levels of measurement reliability to avoid triggering false alarms or, worse, failing to alert when conditions are genuinely dangerous. This section categorizes sensors by reliability and provides guidance on handling uncertain data within the decision system.

### Tier 1: Highly Reliable (±2–5% accuracy)

These sensors provide trustworthy absolute values that can drive automated decisions with confidence. Their readings can be compared directly against thresholds without correction factors.

| Sensor | Accuracy | Notes |
|--------|----------|-------|
| **Air Temperature** (SHT31) | ±0.3°C | Excellent; long-term drift ±0.1°C/year; use for all temperature thresholds |
| **Air Humidity** (SHT31) | ±2% RH | Good for disease risk thresholding; drift ±0.25% RH/year |
| **Soil Moisture** (Capacitive V1.2, calibrated) | ±5–10% VWC | Acceptable after soil-specific calibration; uncalibrated readings are unreliable |
| **Soil Temperature** (DS18B20) | ±0.5°C | Excellent and stable; waterproof probe; long cable runs possible |
| **Rainfall** (Tipping bucket) | ±5–10% | Good for daily/monthly accumulation; under-catches in high wind |

### Tier 2: Moderately Reliable (±10–20% accuracy)

These sensors provide useful data but require context, averaging, or trend-based interpretation rather than point-value decisions.

| Sensor | Accuracy | Notes |
|--------|----------|-------|
| **Light / Shade** (BH1750 dual-sensor) | ±5–10% shade | Two-sensor ratio method is reliable for shade %; less reliable for absolute lux |
| **Wind Speed** (Cup anemometer) | ±1 m/s | Moving parts degrade; calibrate every 6 months; gust readings less reliable |
| **Leaf Wetness** (DIY or Dragino LLMS01) | Qualitative + timing | Duration measurement is more reliable than intensity; wet/dry threshold is key |

### Tier 3: Unreliable for Absolute Values (50–200% error)

These sensors should NEVER drive automated decisions based on absolute values. Use only for relative trend monitoring, and always cross-validate with periodic lab tests.

| Sensor | Accuracy | Handling Strategy |
|--------|----------|-------------------|
| **Soil NPK** (RS485 7-in-1) | 50–200% error | Track relative changes only; validate with DOA lab test every 3–6 months; never trigger fertilizer decisions from IoT NPK readings alone |
| **Soil pH** (Continuous probe) | Degrades within days in soil | DO NOT leave buried; use periodic spot-checks with portable pH meter; validate with DOA lab test 2–4× per year; flag all continuous pH readings as "UNVERIFIED" |

### Handling Uncertain Data in the Threshold System

The decision system implements a confidence-weighted approach to threshold evaluation:

1. **Tier 1 sensors**: Thresholds trigger actions directly — a soil moisture reading below 20% VWC from a calibrated capacitive sensor immediately generates an irrigation alert.
2. **Tier 2 sensors**: Thresholds trigger monitoring intensification — a shade reading above 70% triggers a recommendation to "verify shade level visually and consider pruning," not an automated pruning order.
3. **Tier 3 sensors**: Thresholds trigger lab test recommendations — an NPK sensor showing a 30% drop in nitrogen reading triggers a "Schedule DOA lab test to verify" notification, not a fertilizer application. The system logs the trend change but defers action until validated.
4. **Multi-sensor confirmation**: When multiple sensors corroborate (e.g., high humidity + warm temperature + extended leaf wetness all indicate CLR risk), the system increases confidence even if individual sensors are Tier 2.
5. **Temporal smoothing**: All threshold evaluations use rolling averages (1-hour, 6-hour, 24-hour windows) rather than instantaneous readings to filter noise and avoid false alarms from transient spikes.

---

## Practical Recommendations

1. **Calibrate soil moisture sensors for each soil type on your farm** — The capacitive V1.2 reads differently in clay vs. sandy loam vs. volcanic red earth. Perform a two-point calibration (dry air + saturated soil) for every distinct soil zone, and document the calibration factors. A reading of "30% VWC" from an uncalibrated sensor is meaningless; from a calibrated sensor it drives irrigation decisions.

2. **Apply growth-stage context to every threshold evaluation** — The same 28°C air temperature is "warm but acceptable" during vegetative growth and "quality-threatening" during cherry maturation. The decision system must always ask "what stage are we in?" before evaluating any sensor reading against a threshold. Use the Northern Thailand phenological calendar (flowering: Feb–Mar; fruit development: May–Sep; harvest: Nov–Feb) as the default, but allow manual stage overrides.

3. **Prioritize the three-factor CLR risk model above individual humidity or temperature alerts** — Coffee leaf rust is the single biggest disease threat in Northern Thailand. A humidity alert alone ("RH >80%") is less actionable than the combined assessment ("RH >80% AND temperature 18–28°C AND leaf wetness >24 hours = HIGH CLR RISK"). Build the decision logic to evaluate these factors together, not in isolation. See [[Leaf-Wetness-Sensors]] and [[Decision-Logic]] for implementation details.

4. **Use seasonal threshold profiles rather than fixed annual thresholds** — Implement three seasonal threshold profiles (Cool-Dry, Hot-Dry, Rainy) that automatically adjust based on date and rainfall patterns. The Cool-Dry profile emphasizes frost risk and irrigation needs; the Hot-Dry profile emphasizes heat stress and flowering triggers; the Rainy profile emphasizes disease risk and waterlogging. Transition between profiles based on cumulative rainfall, not just calendar date.

5. **Never make fertilizer decisions from IoT NPK sensor readings alone** — Always cross-validate with DOA lab tests (200–500 THB). Use IoT NPK sensors only to detect unexpected trends (sudden drops suggesting leaching, or no change after fertilization suggesting application failure). Flag all NPK-based alerts with "TREND INDICATOR — Verify with lab test before taking action."

6. **Deploy at least one leaf wetness sensor in every CLR-susceptible block** — Leaf wetness duration is the single most predictive parameter for CLR infection risk, yet it is the most commonly omitted sensor. Even a DIY leaf wetness sensor (~50–100 THB) provides more disease prediction value than a second temperature sensor. Place it at mid-canopy height at a 45° angle in a representative location. See [[Leaf-Wetness-Sensors]] for build instructions.

7. **Validate threshold-driven alerts with farmer feedback** — No threshold table is perfect for every microclimate. After deploying the system, track which alerts farmers find useful vs. which they ignore as false alarms. Adjust thresholds based on field observations — if farmers consistently report that the "soil moisture low" alert fires too early, lower the warning threshold by 3–5% VWC. The threshold system must be a living document, refined by each season's data.

---

## Related Topics

### Phase 5 — Sensor System Documents
- [[Decision-Logic]] — How thresholds translate to IF-THEN decision rules
- [[Alerts-Remediation]] — Alert design and recommended remediation actions for each threshold breach
- [[Environment-Intervention]] — Physical interventions available when thresholds are exceeded
- [[Yield-Quality-Prediction]] — How sensor data and thresholds predict yield and quality outcomes

### Phase 1 — IoT Hardware (Sensor Details)
- [[Soil-Moisture-Sensors]] — Capacitive V1.2 and professional LoRaWAN options
- [[Temperature-Sensors]] — SHT31 (air) and DS18B20 (soil) recommendations
- [[Humidity-Sensors]] — SHT31 for disease risk thresholding
- [[Rainfall-Sensors]] — Tipping bucket rain gauge specifications
- [[Light-Sensors]] — BH1750 dual-sensor shade measurement method
- [[Wind-Sensors]] — RS485 combined wind speed + direction
- [[Leaf-Wetness-Sensors]] — Dragino LLMS01 and DIY leaf wetness options
- [[Soil-pH-Sensors]] — Periodic measurement approach; why continuous burial fails
- [[NPK-Sensors]] — Why budget NPK sensors are unreliable; DOA lab test alternative

### Phase 2 — Environment & Climate
- [[Arabica-Climate-Range]] — Full climate parameter envelope for Arabica
- [[Robusta-Climate-Range]] — Full climate parameter envelope for Robusta
- [[Northern-Thailand-Weather]] — Regional weather patterns and seasonal data
- [[Microclimate-Factors]] — How local topography shifts effective thresholds

---

## References

1. DaMatta, F.M. & Ramalho, J.D.C. (2006) — Impacts of drought and temperature stress on coffee physiology and production. *Botany* 84:421-433
2. Kath, J. et al. (2020) — Not so robust: Robusta coffee production is highly sensitive to temperature. *Global Change Biology* 26(6):3677-3688
3. FAO — Arabica coffee production manual; climate requirements and soil parameters
4. ICAFE (Coffee Institute of Costa Rica) — CLR disease prediction model using leaf wetness duration
5. METOS/Pessl Instruments — Disease model thresholds for coffee leaf rust
6. Royal Project Foundation — Multi-strata agroforestry practices and shade management in Northern Thailand
7. Department of Agriculture (DOA), Thailand — Soil testing protocols and coffee variety recommendations
8. Böll Foundation (2025) — Coffee farming in Northern Thailand report; climate and economic data
9. Noppakoonwong et al. (2015) — Thai Arabica research, ASIC proceedings
10. Partelli, F.L. et al. (2010, 2013) — C. canephora growth rate and minimum temperature thresholds
11. Apogee Instruments — PPFD and PAR measurement technical reference for coffee
12. Yunnan coffee study — 18.9% yield loss per 1°C minimum temperature drop during maturity period
13. Khun Mae Kuang Forest Reserve research — Shade-grown vs. open-field coffee microclimate comparison
14. PMC/NIH (2023) — Coffee leaf rust epidemiology; humidity and leaf wetness thresholds

---

*Last updated: 2026-05-12*
