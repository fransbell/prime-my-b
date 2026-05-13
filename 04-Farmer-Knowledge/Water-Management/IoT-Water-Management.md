---
topic: IoT-Driven Water Management
phase: 4
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [water-management, irrigation, drip, soil-moisture, evapotranspiration, drainage, thailand]
related: [Soil-Management, Cultivation-Best-Practices, Decision-Logic, Alerts-Remediation, Soil-Moisture-Sensors, Coffee-Economics]
---

# IoT-Driven Water Management

> **Summary**: A comprehensive guide to precision water management for coffee farms in Northern Thailand, covering the region's extreme wet-dry seasonality, traditional irrigation inefficiencies, soil moisture sensor-driven irrigation scheduling using [[Decision-Logic]] rules IR-01 through IR-10, drip irrigation integration with IoT-controlled solenoid valves, evapotranspiration-based water budgeting, Crop Water Stress Index monitoring, rainwater harvesting and tank sizing, ROI analysis showing 8,000-25,000 THB/rai savings, a detailed 10-rai case scenario, water quality monitoring (pH and EC), monsoon drainage management, and LINE bot alert integration — demonstrating that IoT-driven irrigation can reduce water use by 30-50% while improving yield by 15-25%.

---

## Overview

Water is the single most variable and consequential input in coffee cultivation. In Northern Thailand, where the annual hydrological cycle swings between six months of drought and four months of monsoon deluge, water management is not a routine task — it is the defining challenge of the farming year. Too little water during flowering and fruit set shrinks cherry size and reduces yield by 40-60%; too much water during the monsoon promotes root rot, nutrient leaching, and landslides that can destroy entire hillside plantations. The margin between these extremes is narrow, and traditional irrigation methods — based on visual assessment and calendar scheduling — consistently miss it.

IoT sensor technology transforms water management from guesswork into data-driven precision. Soil moisture sensors provide real-time volumetric water content (VWC) readings that tell the farmer exactly when to irrigate and how much water to apply. Weather sensors calculate evapotranspiration rates that quantify how much water the crop actually needs on any given day. Automated drip irrigation systems, controlled by solenoid valves triggered by sensor thresholds, deliver water directly to the root zone at the precise moment of plant demand. And when the monsoon arrives, the same soil moisture sensors that guided dry-season irrigation now alert the farmer to dangerous waterlogging conditions before root rot takes hold.

The economic case for IoT-driven water management is compelling. For a typical 10-rai Arabica farm in Northern Thailand, precision irrigation can reduce dry-season water consumption by 30-50%, increase cherry yield by 15-25%, and improve cup quality sufficiently to lift SCA scores by 2-5 points — moving the farm from commodity to specialty pricing. Combined, these benefits typically amount to 8,000-25,000 THB per rai per year in additional revenue and reduced costs, with a sensor system payback period of 4-8 months (see [[Coffee-Economics]] for full ROI context).

This document provides the comprehensive technical and practical foundation for implementing IoT-driven water management on coffee farms in Northern Thailand, integrating closely with the [[Decision-Logic]] irrigation rules (IR-01 through IR-10) and the [[Alerts-Remediation]] notification framework.

---

## The Water Challenge: Northern Thailand's Seasonal Extremes

Northern Thailand's coffee-growing regions experience one of the most dramatic seasonal water cycles of any coffee-producing area in the world. The annual rainfall pattern is dominated by the southwest monsoon, which delivers 80-90% of the year's precipitation between May and October, followed by a pronounced dry season from November through April during which many highland areas receive virtually no rainfall for 4-6 consecutive months. This extreme seasonality creates a dual water management challenge that requires fundamentally different strategies at different times of year.

### Annual Rainfall Distribution

| Province / Area | Annual Rainfall (mm) | Dry Season (Nov-Apr) | Wet Season (May-Oct) | Wettest Month | Driest Month |
|----------------|---------------------|----------------------|----------------------|---------------|--------------|
| **Chiang Mai (Doi Inthanon)** | 1,800-2,500 | 100-200 mm total | 1,600-2,300 mm | August (350-450 mm) | February (5-15 mm) |
| **Chiang Rai (Doi Chang)** | 1,500-2,200 | 80-180 mm total | 1,400-2,000 mm | July (300-400 mm) | January (5-10 mm) |
| **Mae Hong Son** | 1,200-1,800 | 50-150 mm total | 1,100-1,650 mm | August (250-350 mm) | March (10-20 mm) |
| **Nan** | 1,400-2,000 | 100-200 mm total | 1,300-1,800 mm | August (300-400 mm) | February (5-15 mm) |

### Monthly Water Balance for Arabica Coffee (Chiang Mai Highland Example)

| Month | Rainfall (mm) | ET₀ (mm) | Crop ET (mm) | Water Surplus/Deficit (mm) | Management Action |
|-------|---------------|----------|-------------|---------------------------|-------------------|
| **January** | 10 | 95 | 60 | -50 | Irrigate; harvest season |
| **February** | 15 | 110 | 75 | -60 | Irrigate; post-harvest recovery |
| **March** | 25 | 130 | 95 | -70 | Irrigate; pre-flowering critical |
| **April** | 50 | 140 | 110 | -60 | Irrigate; flowering trigger |
| **May** | 150 | 130 | 100 | +50 | Reduce irrigation; monitor drainage |
| **June** | 250 | 110 | 85 | +165 | No irrigation; drainage management |
| **July** | 350 | 100 | 75 | +275 | Drainage critical; CLR risk |
| **August** | 380 | 95 | 70 | +310 | Peak monsoon; waterlogging risk |
| **September** | 280 | 100 | 75 | +205 | Drainage continues; cherry development |
| **October** | 150 | 110 | 85 | +65 | Transition; reduce drainage focus |
| **November** | 50 | 105 | 75 | -25 | Begin dry-season irrigation; harvest |
| **December** | 20 | 95 | 65 | -45 | Irrigate; peak harvest |

The table above reveals a critical insight: during the dry season, Arabica coffee in Chiang Mai highlands faces a cumulative water deficit of approximately 285 mm over six months — equivalent to 285,000 liters per rai. Without irrigation, the plants survive by drawing on deep soil moisture reserves, but cherry development and quality suffer severely. Conversely, the monsoon delivers a surplus of over 1,000 mm in four months, creating waterlogging and erosion risks on the steep slopes where most highland coffee is grown.

### Climate Change Impact on Water Availability

Climate change is intensifying both extremes of Northern Thailand's water cycle. Research from Chiang Mai University and the Thai Meteorological Department shows that over the past two decades, dry-season rainfall has decreased by 10-15% while wet-season rainfall intensity has increased by 15-20%. This means longer, drier dry seasons requiring more irrigation, punctuated by more intense monsoon downpours that increase erosion and waterlogging risk. The number of consecutive dry days during the November-April period has increased from an average of 45 to 65 days, making dry-season irrigation increasingly essential for farm viability (see [[Climate-Change-Impact]]).

---

## Traditional Irrigation Practices and Inefficiencies

Before examining how IoT sensors transform water management, it is essential to understand the traditional irrigation approaches used in Northern Thailand and their specific inefficiencies. Most smallholder coffee farms in the region still rely on one or more of these methods, and understanding their limitations provides the motivation for investing in precision irrigation.

### Flood Irrigation (การรดน้ำแบบท่วม)

Flood irrigation — releasing water from a hillside source and allowing it to flow down rows of coffee trees — is the oldest and most common irrigation method in Northern Thailand's highland communities. Farmers divert water from mountain streams, springs, or storage ponds into unlined channels that run along the upper contour of the coffee plot, then open the channels periodically to flood the rows below. This method requires no equipment beyond basic shovel work to maintain channels.

| Parameter | Value |
|-----------|-------|
| **Water efficiency** | 25-40% (60-75% lost to runoff, deep percolation, evaporation) |
| **Labor requirement** | 2-4 hours per irrigation event per 5 rai |
| **Cost** | Near zero (gravity-fed, no equipment) |
| **Erosion risk** | HIGH — water flowing down slopes removes topsoil |
| **Uniformity** | Very poor — trees at top of slope receive more water than those below |
| **Disease risk** | Increased — wet foliage promotes CLR and CBD |

The fundamental problem with flood irrigation on coffee slopes is that water follows gravity, not the root zone. On a 30% slope, applied water runs off the surface before it can infiltrate to coffee root depth (15-30 cm), carrying topsoil and recently applied fertilizer with it. The trees at the top of the irrigation channel receive excessive water while those at the bottom remain dry. Furthermore, flood irrigation wets the entire soil surface and foliage, creating ideal conditions for Coffee Leaf Rust spore germination — directly counterproductive for disease management (see [[Pest-Disease-Management]]).

### Sprinkler Irrigation (การให้น้ำแบบสปริงเกลอร์)

Overhead sprinkler systems are used by some larger farms and Royal Project stations in Northern Thailand. They provide more uniform coverage than flood irrigation and can be operated on a timer, reducing labor. However, they share the critical disadvantage of wetting coffee foliage, which increases CLR risk during the dry season when disease pressure is lower but not absent.

| Parameter | Value |
|-----------|-------|
| **Water efficiency** | 55-70% (30-45% lost to evaporation and wind drift) |
| **Setup cost** | 2,500-4,000 THB/rai (pipes, sprinkler heads, pump) |
| **Operating cost** | 600-1,200 THB/season (pump electricity/fuel, maintenance) |
| **Uniformity** | Moderate — wind and slope affect distribution |
| **Foliage wetting** | Yes — increases CLR risk |
| **Cooling benefit** | Moderate — can reduce canopy temperature 3-5°C |

On steep highland terrain, sprinkler distribution is further compromised by wind patterns that channel up and down valleys, creating dry spots on leeward sides of ridges. The Royal Project Foundation has largely moved away from overhead sprinklers for coffee, recommending drip irrigation instead for new installations.

### Manual Hose Irrigation

Many smallholders use a simple garden hose connected to a water source (stream, tank, or community water system) to water individual trees by hand. This method is labor-intensive but allows the farmer to target water directly at the root zone, avoiding foliage wetting and reducing total water use compared to flood or sprinkler methods.

| Parameter | Value |
|-----------|-------|
| **Water efficiency** | 50-65% (variable; depends on farmer skill and patience) |
| **Labor requirement** | 4-8 hours per irrigation event per 5 rai |
| **Equipment cost** | 300-800 THB (hose + fittings) |
| **Uniformity** | Variable — depends on farmer consistency |
| **Scheduling** | Calendar-based (e.g., every 3 days) — not responsive to actual soil moisture |

The primary inefficiency of manual hose irrigation is scheduling. Without soil moisture data, farmers irrigate on a fixed schedule (typically every 3-5 days during the dry season) regardless of whether the soil actually needs water. After a rain event, or during cool cloudy periods with lower evapotranspiration, the fixed schedule may deliver water the soil cannot absorb, leading to runoff and waste. Conversely, during hot dry spells with elevated evapotranspiration, the fixed schedule may not deliver enough water, and the farmer may not realize the deficit until visible wilting occurs — by which time cherry quality has already suffered.

### Calendar-Based Scheduling: The Core Inefficiency

All traditional methods share one fundamental weakness: they operate on calendar-based schedules rather than plant-driven demand. The farmer decides to irrigate on Monday, Thursday, and Saturday, regardless of whether it rained on Wednesday or whether the soil is still at adequate moisture from the previous irrigation. This disconnect between water application and actual plant need results in three specific problems:

1. **Over-irrigation waste**: When rain provides adequate moisture but the farmer irrigates anyway, the excess water either runs off the slope (wasting the resource and causing erosion) or percolates below the root zone (carrying mobile nutrients like nitrogen with it). For a 10-rai farm on a fixed 3-day irrigation schedule, this over-irrigation can waste 50,000-100,000 liters per dry season.

2. **Under-irrigation stress**: When evapotranspiration exceeds the farmer's expectation (e.g., a hot windy week in March with temperatures above 35°C and relative humidity below 40%), the fixed schedule may not deliver enough water to maintain optimal soil moisture. The resulting water stress during flowering or fruit set can reduce cherry size by 15-30% and increase the percentage of "floater" (light, low-density) beans that are rejected by specialty buyers.

3. **Timing mismatch with growth stages**: Coffee water requirements vary dramatically across growth stages — from low demand during the dormant post-harvest period to peak demand during flowering and cherry development. A calendar schedule cannot adjust to these changing needs, resulting in under-watering during critical periods and over-watering during low-demand phases.

---

## Soil Moisture Sensor-Driven Irrigation

The fundamental principle of IoT-driven irrigation is simple: **irrigate only when the soil moisture sensor indicates that VWC has fallen below a threshold, and apply only enough water to bring VWC back to the target range.** This replaces calendar-based guessing with data-driven precision, ensuring that every liter of water is applied at the right time and in the right amount.

### Understanding Volumetric Water Content (VWC)

Volumetric Water Content (VWC) is the ratio of water volume to total soil volume, expressed as a percentage. A VWC of 30% means that 30% of the soil volume is occupied by water. For coffee, VWC is the single most useful irrigation metric because it directly reflects the water available to plant roots. The relationship between VWC and plant water availability depends on soil texture — sandy soils hold less water at a given VWC than clay soils — but once calibrated for a specific soil type, VWC provides reliable irrigation guidance (see [[Soil-Moisture-Sensors]] for calibration procedures).

### VWC Thresholds for Coffee Irrigation

| VWC Range | Status | Plant Response | Irrigation Action |
|-----------|--------|---------------|-------------------|
| **Below 12%** | 🟥 EMERGENCY — Severe drought | Wilting; leaf drop; cherry abortion; potential tree death | Immediate emergency irrigation; 20-30 L per mature tree |
| **12-18%** | 🟠 CRITICAL — Dry stress | Stomatal closure; reduced photosynthesis; cherry size reduction | Irrigate within 24 hours; apply 15-25 L per tree |
| **18-25%** | 🟡 WARNING — Approaching deficit | Mild stress; reduced cell expansion; potential quality impact | Schedule irrigation within 2-3 days |
| **25-35%** | 🟢 OPTIMAL — Adequate moisture | Normal growth; optimal cherry development | No irrigation needed; monitor |
| **35-45%** | 🟢 OPTIMAL — High moisture (loam) | Normal growth; adequate for heavy fruit load | No irrigation; reduce if approaching 45% |
| **45-55%** | 🟡 WARNING — Excess moisture | Reduced root respiration; nutrient leaching risk | Check drainage; no irrigation |
| **Above 55%** | 🟠 CRITICAL — Waterlogged | Root rot risk; anaerobic soil conditions | Emergency drainage; clear channels |

### Decision-Logic Irrigation Rules (IR-01 through IR-10)

The [[Decision-Logic]] engine implements ten irrigation-specific rules that translate soil moisture, rainfall, and growth stage data into precise irrigation recommendations. Each rule follows the IF-THEN structure with priority and confidence levels. Here is a summary of how these rules operate in practice:

| Rule | Trigger | Context | Action | Priority |
|------|---------|---------|--------|----------|
| [[Decision-Logic#IR-01]] | VWC < 15% AND no rain 7 days | Dry season | Irrigate immediately; 20-30 L per plant; repeat in 3 days | CRITICAL |
| [[Decision-Logic#IR-02]] | VWC 15-20% | Flowering AND Arabica | Irrigate to 25-35% VWC; flowering stress reduces fruit set | WARNING |
| [[Decision-Logic#IR-03]] | VWC 20-25% | Fruit development AND dry season | Irrigate to 30-40% VWC; consistent moisture for cherry sizing | WARNING |
| [[Decision-Logic#IR-04]] | VWC > 50% | Rainy season | Check drainage; root rot risk; clear blocked drains | WARNING |
| [[Decision-Logic#IR-05]] | VWC > 60% | Clay soil, any stage | Severe waterlogging; emergency drainage; root disease risk | CRITICAL |
| [[Decision-Logic#IR-06]] | Rainfall > 80 mm/day | Cherry maturation or harvest | Harvest pause; cherry drop risk; cover drying cherries | CRITICAL |
| [[Decision-Logic#IR-07]] | Rainfall > 50 mm/day AND VWC > 45% | Rainy season | Saturated soil; reduce irrigation to zero; check erosion | WARNING |
| [[Decision-Logic#IR-08]] | No rain 14 days AND VWC 20-25% | Vegetative AND Arabica AND highland | Dry period stress; increase mulch; supplementary irrigation | WARNING |
| [[Decision-Logic#IR-09]] | VWC < 12% | Any stage, any variety | Severe drought; emergency irrigation; plants may be wilting | EMERGENCY |
| [[Decision-Logic#IR-10]] | Rainfall 5-15 mm AND VWC 25-35% | Flowering or fruit development | Adequate moisture; no irrigation needed; ideal conditions | INFO |

### Sensor Placement for Irrigation Management

Proper sensor placement is critical for accurate irrigation decisions. Incorrect placement produces misleading data that can trigger unnecessary irrigation or — worse — fail to detect developing drought stress.

| Placement Zone | Depth | Distance from Trunk | Number per Rai | Purpose |
|---------------|-------|---------------------|----------------|---------|
| **Drip zone** (primary) | 15-20 cm | 50-80 cm (drip line) | 1 per 3-5 rai (uniform terrain) | Primary irrigation trigger |
| **Root zone deep** | 30-40 cm | 50-80 cm | 1 per 5-10 rai | Deep moisture reserve monitoring |
| **Slope position variation** | 15-20 cm | 50-80 cm | 1 top, 1 middle, 1 bottom per plot | Detect slope-based moisture gradient |
| **Drainage monitoring** | 15-20 cm | Low-slope collection area | 1 per drainage zone | Waterlogging detection |

For a typical 10-rai farm on sloping terrain, a minimum of 3-5 soil moisture sensors is recommended: one at the top, middle, and bottom of the slope to capture the gravitational moisture gradient, plus additional sensors in any areas with different soil types or sun exposure. The [[Soil-Moisture-Sensors]] document provides detailed calibration procedures that must be followed before deploying irrigation decision rules, as uncalibrated sensors can be off by 10-20% VWC, triggering inappropriate irrigation actions.

---

## Drip Irrigation Integration with IoT

Drip irrigation is the optimal delivery method for sensor-driven coffee irrigation because it applies water directly to the root zone in precise volumes, avoids foliage wetting, minimizes evaporation and runoff, and can be fully automated using solenoid valves controlled by sensor data. In Northern Thailand, where water sources are often limited and terrain is steep, drip irrigation's 90-95% water efficiency makes it the clear choice over flood, sprinkler, or manual methods.

### Drip System Components for Coffee

| Component | Specification | Cost (THB/rai) | Notes |
|-----------|--------------|-----------------|-------|
| **Main line (PE pipe 32mm)** | UV-resistant, 4 bar rating | 800-1,200 | Runs along contour at top of plot |
| **Sub-main (PE pipe 25mm)** | UV-resistant | 400-600 | Branches from main line per row |
| **Lateral drip line (16mm)** | Pressure-compensating (PC) drippers | 1,500-2,500 | 2 lines per tree row; 4 L/hr drippers |
| **Drippers (emitters)** | PC 4 L/hr, anti-siphon | 300-500 | 2-4 emitters per tree, at drip line |
| **Solenoid valve (1")** | 12V DC, normally closed | 800-1,500 | 1 valve per 2-3 rai zone |
| **Filter (120 mesh)** | Disc or screen filter | 300-600 | Essential; coffee farms have organic debris |
| **Pressure regulator** | 1.5-2.0 bar output | 200-400 | Protects drip lines from overpressure |
| **Fertilizer injector (venturi)** | 1" injection rate | 500-1,200 | Enables fertigation through drip |
| **Controller (ESP32 + relay)** | WiFi/LoRa controlled | 600-1,200 | Receives sensor data; opens/closes valves |
| **Water source pump** | 0.5-1.5 HP, solar or electric | 3,000-8,000 | Depends on lift and flow requirements |
| **Total system cost** | — | **8,400-17,500** | Per rai, complete installed system |

### IoT Automation Logic for Drip Irrigation

The automation system uses soil moisture sensor data to control solenoid valves through an ESP32 microcontroller. The logic is straightforward but includes important safeguards against over-irrigation and system failure:

```
IRRIGATION AUTOMATION PSEUDOCODE (runs every 30 minutes):

READ soil_moisture from calibrated sensor
READ current_growth_stage from farm config
READ rainfall_last_24h from rain gauge
READ time_of_day

// Safety check: never irrigate at night or during rain
IF time_of_day < 06:00 OR time_of_day > 17:00:
    CLOSE all valves
    EXIT

IF rainfall_last_24h > 10mm:
    CLOSE all valves
    EXIT

// Irrigation decision based on VWC and growth stage
TARGET_VWC = get_target_vwc(current_growth_stage)  // e.g., 30% for fruit_development

IF soil_moisture < (TARGET_VWC - 5):  // 5% buffer below target
    CALCULATE irrigation_volume = (TARGET_VWC - soil_moisture) * soil_volume_factor
    OPEN solenoid_valve for calculated_duration
    LOG irrigation_event(timestamp, volume, zone)
    SEND LINE notification: "💧 รดน้ำอัตโนมัติ — แปลง [zone], [volume] ลิตร"

IF soil_moisture >= TARGET_VWC:
    CLOSE solenoid_valve
    LOG irrigation_complete_event
```

### Fertigation Through Drip Systems

One of the most valuable capabilities of an IoT-controlled drip system is fertigation — delivering dissolved fertilizer through the irrigation water directly to the root zone. Fertigation provides several advantages over conventional broadcast fertilization: nutrients are placed precisely where roots can absorb them, application rates can be adjusted based on sensor data (linking to NPK trends from [[NPK-Sensors]]), and the risk of nutrient runoff on steep slopes is dramatically reduced. The venturi injector on the drip system draws concentrated fertilizer solution from a tank and mixes it into the irrigation stream at a controlled dilution ratio (typically 1:100 to 1:200).

| Fertilizer | Solubility (g/L) | Fertigation Rate (kg/rai/event) | Frequency | Cost (THB/rai/year) |
|-----------|------------------|--------------------------------|-----------|---------------------|
| **Urea (46-0-0)** | 1,080 | 2-4 | 4-6 times/season | 300-600 |
| **13-13-21** | Limited; dissolve overnight | 3-5 | 3-4 times/season | 400-800 |
| **Potassium sulfate (0-0-50)** | 120 | 1-2 | 3-4 times/season | 200-500 |
| **Calcium nitrate** | 1,216 | 1-3 | 2-3 times/season | 200-400 |

> **Important**: Never mix calcium-based fertilizers (calcium nitrate) with sulfate-based fertilizers (potassium sulfate, ammonium sulfate) in the same fertigation tank — they form insoluble calcium sulfate (gypsum) precipitate that clogs drippers. Use separate tanks or apply on different irrigation cycles.

---

## Water Budgeting: Evapotranspiration (ET₀)

Evapotranspiration (ET) is the combined loss of water from the soil surface (evaporation) and from the plant canopy (transpiration). It represents the total water demand that must be met by rainfall or irrigation. Calculating ET₀ (reference evapotranspiration) from sensor data enables the farmer to quantify exactly how much water the crop needs each day, creating a precise water budget that eliminates both over- and under-irrigation.

### FAO Penman-Monteith Method

The internationally recognized standard for calculating ET₀ is the FAO Penman-Monteith equation, which requires four meteorological parameters that IoT sensors can provide:

| Parameter | Sensor | Typical Range (N. Thailand) | Contribution to ET₀ |
|-----------|--------|----------------------------|---------------------|
| **Temperature** | [[Temperature-Sensors]] (SHT31/40) | 10-38°C | Higher temp = higher ET₀ |
| **Relative Humidity** | [[Humidity-Sensors]] (SHT31/40) | 30-95% | Lower humidity = higher ET₀ |
| **Wind Speed** | [[Wind-Sensors]] (anemometer) | 0-8 m/s | Higher wind = higher ET₀ |
| **Solar Radiation** | [[Light-Sensors]] (BH1750/pyranometer) | 5-30 MJ/m²/day | Higher radiation = higher ET₀ |

The simplified ET₀ calculation adapted for Northern Thailand highland conditions is:

```
ET₀ (mm/day) ≈ [0.0023 × (T_mean + 17.8) × (T_max - T_min)^0.5 × R_a] / λ
```

Where T_mean, T_max, T_min are in °C, R_a is extraterrestrial radiation (available from latitude tables), and λ is latent heat of vaporization. While less precise than the full Penman-Monteith equation (which requires wind and humidity data), this Hargreaves-Samani simplification provides reasonable ET₀ estimates when only temperature data is available — a common situation for budget IoT deployments.

### Crop Coefficient (Kc) for Coffee

ET₀ represents the water demand of a reference grass surface. To calculate actual coffee crop water needs (ETc), ET₀ is multiplied by a crop coefficient (Kc) that accounts for the coffee plant's specific water use characteristics at each growth stage:

| Growth Stage | Kc Value | Duration (N. Thailand) | Coffee Water Need |
|-------------|----------|----------------------|-------------------|
| **Post-harvest / Dormant** | 0.6-0.7 | Dec-Jan | Low; reduced transpiration |
| **Vegetative growth** | 0.8-0.9 | Feb-Apr | Moderate; canopy rebuilding |
| **Flowering** | 1.0-1.1 | Mar-May | High; water stress reduces fruit set |
| **Fruit development** | 1.0-1.15 | Jun-Sep | High; cherry sizing requires consistent moisture |
| **Cherry ripening** | 0.9-1.0 | Oct-Nov | Moderate; slight stress can improve quality |
| **Harvest** | 0.7-0.8 | Nov-Jan | Lower; focus on quality preservation |

### Daily Water Budget Calculation Example

For a 10-rai Arabica farm in Chiang Mai highlands on March 15 (flowering stage):

| Parameter | Value | Source |
|-----------|-------|--------|
| ET₀ (calculated) | 5.2 mm/day | Temperature + solar radiation sensors |
| Kc (flowering) | 1.05 | Growth stage table above |
| ETc (crop water need) | 5.2 × 1.05 = 5.46 mm/day | Calculation |
| Rainfall (March 15) | 0 mm | Rain gauge sensor |
| Irrigation needed | 5.46 mm = 5,460 L/rai = 8,740 L/rai adjusted for drip efficiency (90%) | Calculation |
| **Total for 10 rai** | **87,400 liters** | Farm-scale calculation |
| Drip system runtime | 87,400 L ÷ (4 L/hr × 177 trees/rai × 2 emitters × 10 rai) = ~6.2 hours | System design |

This calculation shows that during flowering in the hot dry season, the farm needs approximately 87,400 liters per day to meet crop water demand. Without irrigation, the soil moisture deficit accumulates at 5.46 mm/day, and within 5-7 days the VWC will drop below the critical 18% threshold, triggering the [[Decision-Logic#IR-02]] warning rule.

---

## Crop Water Stress Index (CWSI)

The Crop Water Stress Index (CWSI) combines soil moisture and temperature data to provide a more nuanced measure of plant water status than soil moisture alone. While VWC indicates how much water is in the soil, CWSI indicates how effectively the plant is accessing that water — a distinction that matters because root distribution, soil structure, and disease can all limit water uptake even when soil moisture appears adequate.

### CWSI Calculation

CWSI is calculated from the difference between canopy temperature and air temperature, normalized against the theoretical minimum and maximum differences for well-watered and severely stressed conditions:

```
CWSI = [(T_canopy - T_air) - (T_canopy - T_air)_well_watered] / [(T_canopy - T_air)_stressed - (T_canopy - T_air)_well_watered]
```

| CWSI Value | Status | Interpretation | Action |
|-----------|--------|---------------|--------|
| **0.0-0.2** | 🟢 Well-watered | Transpiration at maximum; no water stress | No irrigation needed |
| **0.2-0.4** | 🟢 Slight stress | Normal for dry season; manageable | Monitor; maintain irrigation schedule |
| **0.4-0.6** | 🟡 Moderate stress | Reduced transpiration; beginning quality impact | Increase irrigation; check for root problems |
| **0.6-0.8** | 🟠 Significant stress | Stomatal closure; cherry quality declining | Irrigate immediately; investigate soil/root health |
| **0.8-1.0** | 🟥 Severe stress | Plant survival mode; yield loss occurring | Emergency irrigation; may need deep soaking |

### Simplified CWSI Using IoT Sensor Data

While true CWSI requires infrared canopy temperature measurement (using a thermal sensor or IRT probe), a practical approximation can be calculated from IoT sensors already deployed on most farms:

**Soil Moisture Deficit Index (SMDI)** — a proxy for CWSI using VWC and air temperature:

```
SMDI = 1 - (current_VWC - VWC_wilting_point) / (VWC_field_capacity - VWC_wilting_point)
```

For Northern Thailand coffee soils (Red Latosol, loam texture):
- VWC field capacity ≈ 35-40%
- VWC wilting point ≈ 12-15%

| Current VWC | SMDI | Equivalent CWSI | Stress Level |
|-------------|------|-----------------|--------------|
| 35% | 0.19 | ~0.2 | Well-watered |
| 30% | 0.38 | ~0.4 | Slight stress |
| 25% | 0.57 | ~0.6 | Moderate stress |
| 20% | 0.76 | ~0.8 | Significant stress |
| 15% | 0.95 | ~1.0 | Severe stress |

This simplified index allows the [[Decision-Logic]] engine to incorporate water stress assessment using the same soil moisture sensors already deployed for irrigation scheduling, without requiring additional thermal imaging equipment that would add 5,000-15,000 THB per sensor node to the system cost.

---

## Rainwater Harvesting

Northern Thailand's monsoon climate provides an abundant water resource during the wet season that can be captured and stored for dry-season irrigation. Rainwater harvesting is particularly valuable for coffee farms because the dry season (when irrigation is needed) coincides with the harvest and post-harvest processing period, when water is also needed for wet processing of cherries.

### Rainwater Collection Potential

| Collection Surface | Area (m²) | Annual Rainfall 1,800 mm | Capture Efficiency | Annual Harvest (liters) |
|-------------------|-----------|--------------------------|--------------------|-----------------------|
| **Farm building roof** (typical) | 60 | 108,000 L theoretical | 80% | 86,400 |
| **Drying shelter roof** | 40 | 72,000 L theoretical | 80% | 57,600 |
| **Farm pond catchment** (0.5 rai) | 800 | 1,440,000 L theoretical | 50% (runoff + seepage) | 720,000 |
| **Roof catchment + 2 tanks** | 60 | 108,000 L theoretical | 80% | 86,400 |

### Tank Sizing for 5-10 Rai Farm

The tank size needed depends on the dry-season water deficit, the collection area available, and the irrigation method used. Drip irrigation requires significantly less stored water than sprinkler or flood methods.

| Farm Size | Drip Irrigation Dry-Season Need (6 months) | Recommended Tank Capacity | Number of Tanks | Total Tank Cost (THB) |
|-----------|--------------------------------------------|--------------------------|----------------|----------------------|
| **5 rai** | 150,000-250,000 L | 30,000-50,000 L | 2-3 × 10,000 L | 15,000-30,000 |
| **8 rai** | 240,000-400,000 L | 50,000-80,000 L | 3-4 × 15,000 L | 30,000-60,000 |
| **10 rai** | 300,000-500,000 L | 80,000-100,000 L | 4-5 × 20,000 L | 40,000-80,000 |

### Tank Options and Costs

| Tank Type | Capacity (L) | Cost (THB) | Lifespan | Installation | Notes |
|-----------|-------------|------------|----------|-------------|-------|
| **Polyethylene (UV-stabilized)** | 2,000 | 3,000-5,000 | 10-15 years | Simple; place on flat pad | Most common; easy to transport to highland |
| **Polyethylene (UV-stabilized)** | 5,000 | 6,000-10,000 | 10-15 years | Simple; may need platform | Good balance of cost and capacity |
| **Polyethylene (UV-stabilized)** | 10,000 | 12,000-20,000 | 10-15 years | Needs concrete pad | Large capacity; limited hillside placement |
| **Stainless steel** | 5,000 | 15,000-25,000 | 20-30 years | Professional installation | Premium; very durable |
| **Concrete/ferrocement** | 20,000+ | 15,000-30,000 | 30+ years | Skilled labor required | Custom-built on site; good for large volumes |
| **Farm pond (lined)** | 200,000+ | 20,000-40,000 | 20+ years | Excavation + EPDM liner | Maximum storage; requires flat area |

### Rainwater Harvesting ROI

| Parameter | Value | Calculation |
|-----------|-------|-------------|
| Tank investment (10-rai farm) | 60,000 THB | 3 × 20,000 L PE tanks |
| Annual water captured | 86,400-144,000 L | Roof + pond catchment |
| Dry-season water replaced | 100,000-200,000 L | Would otherwise be pumped from stream/spring |
| Pump cost savings | 3,000-6,000 THB/year | Electricity/diesel for pump |
| Yield improvement from reliable irrigation | 15-25% | 5,000-15,000 THB/rai × 10 rai = 50,000-150,000 THB |
| **Payback period** | **0.4-1.0 years** | 60,000 ÷ (53,000-156,000) |

---

## ROI Analysis: Water Saved vs. Irrigation Cost vs. Yield Improvement

The economic case for IoT-driven water management integrates three benefit streams: reduced water consumption and pumping costs, improved yield from optimized irrigation timing, and quality premiums from better cherry development.

### Comprehensive ROI Calculation: 10-Rai Arabica Farm

#### Baseline (Traditional Flood Irrigation)

| Parameter | Value | Notes |
|-----------|-------|-------|
| Dry-season water applied | 500,000 L/rai (6 months) | Flood irrigation, 30% efficiency |
| Total water used (10 rai) | 5,000,000 L | 5,000 m³ |
| Pump operating cost | 12,000 THB/season | Diesel pump, 5,000 hours |
| Labor (irrigation management) | 15,000 THB/season | 2-4 hrs/day, 6 months |
| Yield | 180 kg cherry/rai | Stress during flowering; uneven irrigation |
| Price | 80 THB/kg green bean (commodity) | Quality limited by water stress |
| Revenue | 240,000 THB | 30 kg green/rai × 10 rai × 80 THB |

#### With IoT-Driven Drip Irrigation

| Parameter | Value | Notes |
|-----------|-------|-------|
| Dry-season water applied | 180,000 L/rai (6 months) | Drip, 90% efficiency; sensor-triggered |
| Total water used (10 rai) | 1,800,000 L | 64% reduction in water use |
| Pump operating cost | 4,500 THB/season | 62% reduction |
| Labor (irrigation management) | 3,000 THB/season | Automated; 80% labor reduction |
| Yield | 220 kg cherry/rai | 22% increase from optimal moisture |
| Price | 150 THB/kg green bean (specialty) | Quality improvement from consistent moisture |
| Revenue | 550,000 THB | 36.7 kg green/rai × 10 rai × 150 THB |

#### ROI Summary

| Metric | Traditional | IoT-Driven | Difference |
|--------|------------|------------|-----------|
| **Revenue** | 240,000 THB | 550,000 THB | +310,000 THB (+129%) |
| **Water + pump + labor cost** | 27,000 THB | 7,500 THB | -19,500 THB (-72%) |
| **IoT system cost (Year 1)** | 0 | 25,600 THB | See [[System-Cost-Estimate]] |
| **Drip system cost (10 rai)** | 0 | 100,000 THB | Amortized over 7-10 years |
| **Net annual benefit (Year 1)** | — | — | **+263,900 THB** |
| **Net annual benefit (Year 2+)** | — | — | **+329,500 THB** (no equipment purchase) |

> **Key Finding**: Even with the full capital cost of IoT sensors and drip irrigation equipment in Year 1, the net benefit is substantial at 263,900 THB for a 10-rai farm. In subsequent years, with only maintenance costs, the annual benefit exceeds 329,000 THB. The combined system pays for itself within 5-6 months, consistent with the [[Coffee-Economics]] ROI analysis for IoT sensor systems.

---

## Case Scenario: 10-Rai Arabica Farm Dry Season

### Farm Profile

| Parameter | Value |
|-----------|-------|
| **Location** | Mae Chaem District, Chiang Mai (1,100 masl) |
| **Variety** | Chiang Mai 80 (Arabica/Catimor) |
| **Tree density** | 177 trees/rai (3m × 3m spacing) |
| **Soil type** | Red Latosol (loam); field capacity 35% VWC; wilting point 13% VWC |
| **Dry season** | November-April (6 months); rainfall <200 mm total |
| **Water source** | Mountain stream + 3 × 10,000 L storage tanks |
| **Growth stages during dry season** | Harvest (Nov-Jan) → Post-harvest (Feb) → Pre-flowering (Mar) → Flowering (Apr) |

### Without Sensors: Calendar-Based Irrigation Schedule

| Month | Growth Stage | Irrigation Schedule | Volume Applied (L/rai) | Problems |
|-------|-------------|--------------------|-----------------------|----------|
| November | Harvest | Every 5 days | 25,000 | Over-irrigation during cool harvest period; water waste |
| December | Harvest | Every 5 days | 25,000 | Same; cool temps = low ET; excess water |
| January | Late harvest | Every 5 days | 25,000 | Continued over-irrigation; nutrient leaching |
| February | Post-harvest | Every 4 days | 30,000 | Moderate; some waste during cloudy days |
| March | Pre-flowering | Every 3 days | 40,000 | Under-irrigation on hot days; stress during critical period |
| April | Flowering | Every 3 days | 40,000 | Under-irrigation; flowering stress; fruit set reduced 20-30% |
| **Total** | — | — | **185,000 L/rai** | **Mixed over- and under-irrigation; 30-40% water waste** |

### With Sensors: IoT-Driven Precision Irrigation Schedule

| Month | Growth Stage | Sensor-Driven Schedule | Volume Applied (L/rai) | VWC Maintained | Yield/Quality Impact |
|-------|-------------|----------------------|-----------------------|---------------|---------------------|
| November | Harvest | Irrigate when VWC < 22% | 12,000 | 25-32% | Optimal; no waste |
| December | Harvest | Irrigate when VWC < 22% | 10,000 | 25-30% | Minimal need; cool temps |
| January | Late harvest | Irrigate when VWC < 20% | 10,000 | 25-30% | Reduced need post-harvest |
| February | Post-harvest | Irrigate when VWC < 22% | 18,000 | 28-33% | Moderate; vegetative growth |
| March | Pre-flowering | Irrigate when VWC < 25% | 28,000 | 30-35% | Critical: maintain high VWC for flowering |
| April | Flowering | Irrigate when VWC < 28% | 32,000 | 30-38% | Optimal flowering; maximum fruit set |
| **Total** | — | — | **110,000 L/rai** | **Maintained in optimal range** | **40% less water; 22% higher yield** |

### Comparative Summary

| Metric | Without Sensors | With Sensors | Improvement |
|--------|----------------|-------------|-------------|
| **Total water applied** | 185,000 L/rai | 110,000 L/rai | -41% water saved |
| **Yield (kg cherry/rai)** | 180 | 220 | +22% |
| **SCA score** | 78-80 | 82-85 | +3-5 points |
| **Green bean price** | 80 THB/kg | 150 THB/kg | +87.5% |
| **Revenue/rai** | 2,400 THB | 5,500 THB | +129% |
| **Irrigation cost/rai** | 3,700 THB | 1,650 THB | -55% |
| **Net benefit/rai** | Baseline | +3,150 THB/year | — |

---

## Water Quality: pH and EC Monitoring

Irrigation water quality directly affects soil health, nutrient availability, and ultimately coffee cup quality. Northern Thailand's highland water sources — mountain streams, springs, and rainwater — are generally of good quality, but seasonal variations and specific local conditions can create problems that are invisible without monitoring.

### Irrigation Water Quality Parameters

| Parameter | Optimal Range for Coffee | Acceptable Range | Critical Threshold | Risk if Outside Range |
|-----------|-------------------------|-----------------|--------------------|-----------------------|
| **pH** | 6.0-7.5 | 5.5-8.5 | <5.0 or >9.0 | Acidic water dissolves heavy metals; alkaline water reduces nutrient availability |
| **EC (Electrical Conductivity)** | <0.5 dS/m | 0.5-1.0 dS/m | >1.5 dS/m | High salinity damages roots; causes leaf tip burn |
| **Total Dissolved Solids (TDS)** | <300 mg/L | 300-600 mg/L | >1,000 mg/L | Excess salts accumulate in soil over time |
| **Sodium (Na)** | <30 mg/L | 30-70 mg/L | >100 mg/L | Sodium toxicity; soil structure damage |
| **Bicarbonate (HCO₃⁻)** | <60 mg/L | 60-120 mg/L | >200 mg/L | Raises soil pH; reduces iron availability |
| **Iron (Fe)** | <1 mg/L | 1-5 mg/L | >5 mg/L | Stains equipment; promotes bacterial growth in drip lines |

### Northern Thailand Water Source Quality

| Water Source | Typical pH | Typical EC (dS/m) | Seasonal Variation | Common Issues |
|-------------|-----------|-------------------|-------------------|---------------|
| **Mountain stream** | 6.5-7.5 | 0.05-0.2 | Low flow in dry season = higher mineral concentration | Generally excellent; check after first monsoon flush |
| **Spring (granite)** | 5.5-6.5 | 0.1-0.3 | Relatively stable year-round | Slightly acidic; may need pH adjustment for long-term use |
| **Spring (limestone)** | 7.5-8.5 | 0.3-0.8 | Stable; hard water | High calcium/bicarbonate; raises soil pH over time |
| **Rainwater** | 5.0-6.0 | <0.05 | First flush of season has dust/debris | Very pure but acidic; excellent for drip systems |
| **Farm pond** | 6.5-8.0 | 0.2-0.6 | Algal blooms in warm months raise pH | Organic matter; filter before drip system |

### IoT Water Quality Monitoring

A water quality sensor node placed at the irrigation water source can continuously monitor pH and EC, alerting the farmer to changes that could affect crop health:

| Sensor | Measurement | Cost (THB) | Accuracy | Alert Threshold |
|--------|------------|------------|----------|-----------------|
| **pH probe (analog)** | 0-14 pH | 800-1,500 | ±0.1 pH | pH < 5.5 or > 8.0 |
| **EC probe (analog)** | 0-10 dS/m | 1,000-2,000 | ±0.1 dS/m | EC > 1.0 dS/m |
| **Combined pH + EC node** | Both | 2,000-4,000 | ±0.1 pH / ±0.1 dS/m | Configurable |

If the sensor detects irrigation water with EC > 1.0 dS/m (moderate salinity risk), the [[Alerts-Remediation]] system sends a WARNING-level alert recommending the farmer to: (1) flush the soil with additional clean water, (2) reduce fertilizer application rates to avoid compounding salinity, and (3) test the water source at a DOA laboratory (200-400 THB) for a full mineral analysis.

---

## Monsoon Drainage Management

When the monsoon arrives in May-June, the water management challenge flips 180 degrees: from water scarcity to water excess. Soil moisture sensors that guided dry-season irrigation now serve the equally critical function of detecting waterlogging and triggering drainage actions. On steep highland slopes, excess water causes three interconnected problems: root suffocation (Armillaria and Fusarium root rot thrive in waterlogged soil), nutrient leaching (mobile nutrients like nitrogen are washed below the root zone), and erosion (surface runoff strips topsoil from between coffee rows).

### Waterlogging Detection with Soil Moisture Sensors

The [[Decision-Logic]] rules IR-04 and IR-05 provide the primary waterlogging alerts:

- **IR-04**: VWC > 50% during rainy season → WARNING: "Check drainage channels; risk of root rot; clear blocked drains"
- **IR-05**: VWC > 60% in clay soil → CRITICAL: "Severe waterlogging; emergency drainage needed; plants at high risk of root disease"

### Monsoon Drainage Infrastructure

| Drainage Feature | Specification | Cost (THB/rai) | Maintenance | Effectiveness |
|-----------------|--------------|-----------------|-------------|---------------|
| **Contour V-drains** | 30 cm deep, 30 cm wide; along contour lines | 300-600 | Clear debris 2-3×/season | Reduces waterlogging 50-70% |
| **Grassed waterways** | Natural swales planted with vetiver | 100-300 | Mow 2×/year | Moderate; low maintenance |
| **Interceptor drains** | 40 cm deep at top of slope; catches runoff from above | 200-400 | Clear after each major storm | Prevents cascading erosion |
| **Raised planting beds** | 20-30 cm above natural grade | 500-1,000 | Annual reshaping | Very effective for new plantings |
| **Subsoil drainage pipe** | Perforated PVC, 100mm diameter | 2,000-4,000 | Flush annually | Best for persistent waterlogging |

### IoT-Driven Drainage Alert Workflow

When soil moisture sensors detect rising VWC above 45% during the monsoon, the system initiates the following alert cascade:

1. **VWC crosses 45%**: INFO alert — "Soil moisture rising; monsoon rainfall increasing; monitor drainage channels"
2. **VWC crosses 50%** (sustained >24 hours): WARNING alert — "Waterlogging developing; clear drainage channels within 48 hours; check for standing water between tree rows"
3. **VWC crosses 55%**: CRITICAL alert — "Severe waterlogging; root rot risk; immediate drainage action required; inspect tree roots for symptoms"
4. **VWC crosses 60%** (clay soils): EMERGENCY alert — "Critical waterlogging; trees at risk of death; emergency drainage; consider temporary pumps for standing water"

Each alert is delivered via LINE bot with specific, actionable recommendations in Thai, following the [[Alerts-Remediation]] framework.

---

## LINE Bot Alert Integration

The LINE messaging platform is the communication backbone of rural Thailand, with over 50 million active users nationwide. Virtually every coffee farmer in Northern Thailand who owns a smartphone uses LINE daily. Integrating IoT water management alerts with LINE is not optional — it is the most effective channel for ensuring that critical irrigation and drainage alerts reach the farmer in time to act.

### Water Management Alert Messages

The following are examples of LINE bot messages that the IoT water management system sends to farmers:

#### Dry-Season Irrigation Alerts

```
🟠 แจ้งเตือนรดน้ำ — แปลงอรุณ
💧 ความชื้นดิน: 18% VWC (ต่ำกว่าค่าที่เหมาะสม)
🌡️ อุณหภูมิ: 34°C | ความชื้นอากาศ: 35%
📅 ไม่มีฝนมา 12 วัน

✅ แนะนำ: รดน้ำ 20 ลิตรต่อต้น วันนี้
⏰ เปิดระบบน้ำหยดเวลา 06:00-12:00

[รดน้ำเลย] [ดูรายละเอียด] [ไม่รดน้ำ]
```

#### Monsoon Drainage Alerts

```
🟠 แจ้งเตือนระบายน้ำ — แปลงดอย
💧 ความชื้นดิน: 53% VWC (สูงเกินไป)
🌧️ ฝนตก: 45 มม. วันนี้ | คาดฝนต่อเนื่อง 3 วัน

✅ แนะนำ: ตรวจและเคลียร์ร่องระบายน้ำภายใน 24 ชม.
⚠️ โรครากเน่าเสี่ยงสูง — ตรวจรากต้นกาแฟ

[ดูตำแหน่งร่องระบายน้ำ] [บันทึกการดำเนินการ]
```

#### Optimal Conditions (INFO)

```
✅ สภาพฟาร์มปกติ — 13 พฤษภาคม 2569
💧 ความชื้นดิน: 32% VWC ✅
🌡️ อุณหภูมิ: 26°C | ความชื้นอากาศ: 65%
🌧️ ฝนเมื่อวาน: 8 มม.
🔄 ไม่ต้องรดน้ำ — ความชื้นเพียงพอ

📊 ดูรายงานรายสัปดาห์: /report
```

### LINE Bot Command Integration for Water Management

| Command | Thai Command | Bot Response |
|---------|-------------|-------------|
| `/irrigate` | `/รดน้ำ` | Shows current VWC, irrigation recommendation, and estimated volume needed |
| `/drainage` | `/ระบายน้ำ` | Shows current VWC in drainage zones, drainage status, and weather forecast |
| `/water` | `/น้ำ` | Full water status: VWC by zone, water balance, ET₀, CWSI, 7-day forecast |
| `/rain` | `/ฝน` | Rainfall today, weekly total, and 5-day forecast |
| `/tank` | `/ถังน้ำ` | Tank level status (if level sensors installed), estimated days of irrigation remaining |

---

## Practical Recommendations for Implementing IoT-Driven Irrigation

1. **Start with soil moisture sensors and the LINE bot before investing in drip irrigation.** The highest-priority investment is 2-3 calibrated soil moisture sensors (see [[Soil-Moisture-Sensors]]) and the LINE bot alert system. Even without automated drip irrigation, knowing the exact VWC enables the farmer to irrigate manually at the right time and volume — capturing 60-70% of the yield improvement at 10-15% of the total system cost. Add drip irrigation and automation in the second year once the sensor data has proven its value.

2. **Calibrate soil moisture sensors for your specific soil type.** The VWC thresholds in this document and in the [[Decision-Logic]] rules assume calibrated sensors on loam-type Red Latosol soils. On sandy soils, the same VWC reading indicates less plant-available water; on clay soils, the same VWC indicates more. Follow the calibration procedure in [[Soil-Moisture-Sensors]] before trusting any irrigation decision to sensor data. An uncalibrated sensor that reads 20% VWC when actual VWC is 32% will trigger unnecessary irrigation, wasting water and potentially causing root rot.

3. **Install rainwater harvesting tanks before the monsoon season.** The optimal time to install water storage is March-April, so that tanks fill during the May-October monsoon and are ready for the November-April dry season. A 10-rai farm with 3 × 10,000 L tanks and roof catchment can collect 80,000+ liters per year — enough to provide 2-3 months of supplementary drip irrigation during the critical flowering and fruit set period.

4. **Prioritize the flowering period (March-May) for irrigation investment.** Water stress during flowering reduces fruit set by 20-40%, and this loss cannot be recovered later in the season. If water is limited, concentrate irrigation during the 4-6 weeks around flowering and reduce or eliminate irrigation during the post-harvest dormant period (January-February) when water demand is lowest. The [[Decision-Logic#IR-02]] rule specifically flags this critical period.

5. **Install drainage infrastructure before the monsoon, not during it.** The transition month of April-May is the window for constructing contour drains, grassed waterways, and checking existing drainage channels. Once the monsoon arrives, saturated soil makes drainage work difficult and ineffective. Use soil moisture sensor data from the previous monsoon season to identify the zones where VWC exceeded 50% and prioritize those areas for drainage improvements.

6. **Monitor irrigation water quality at least twice per year.** Test the pH and EC of your irrigation water source in January (dry season, when stream flow is lowest and mineral concentration highest) and August (monsoon peak, when runoff may carry contaminants). A simple pH + EC meter costs 1,500-3,000 THB and can prevent years of gradual soil degradation from poor-quality irrigation water. If EC exceeds 1.0 dS/m, consider switching to rainwater or blending sources.

7. **Use fertigation through drip to reduce fertilizer waste by 20-30%.** Drip fertigation places nutrients directly in the root zone where they are immediately available, reducing the leaching losses that are particularly severe on steep slopes during heavy rainfall. Schedule fertigation events for early morning (6:00-8:00 AM) when evapotranspiration is low, and always flush the drip lines with clean water for 15-20 minutes after fertigation to prevent emitter clogging.

8. **Set up a farm LINE group for shared water management.** If multiple farmers in a cooperative share a water source (stream, spring, or community tank), coordinate irrigation scheduling through a shared LINE group to avoid over-drawing the source during peak demand. The IoT system can report aggregate water use and remaining tank levels to the group, enabling fair allocation during dry periods.

9. **Replace drip line emitters every 3-5 years.** Even with filters and regular flushing, drip emitters gradually clog with mineral deposits and organic biofilm. A partially clogged emitter delivers 30-50% less water than rated, creating uneven irrigation that the soil moisture sensor may not detect if it is positioned near a functioning emitter. Budget 1,000-2,000 THB/rai every 3-5 years for drip line replacement.

10. **Keep manual irrigation capability as a backup.** IoT systems, solenoid valves, and pumps will fail — usually during the period of peak water demand. Maintain a manual hose connection or gravity-feed channel as a backup that can be activated immediately when the automated system is down. The sensor data still guides the irrigation decision (when and how much); only the delivery method changes.

---

## Data and Specifications Table

| Parameter | Value | Unit | Source/Notes |
|-----------|-------|------|-------------|
| Dry-season water deficit (Chiang Mai) | 285 | mm (6 months) | Calculated from rainfall and ET₀ |
| Flood irrigation efficiency | 25-40 | % | FAO; steep slope losses |
| Sprinkler irrigation efficiency | 55-70 | % | FAO; evaporation + wind |
| Drip irrigation efficiency | 90-95 | % | FAO; minimal losses |
| Arabica VWC optimal range | 25-40 | % VWC | Calibrated for Red Latosol loam |
| VWC drought stress threshold | <18 | % VWC | [[Decision-Logic]] IR-01, IR-09 |
| VWC waterlogging threshold | >50 | % VWC | [[Decision-Logic]] IR-04 |
| ET₀ dry season (Chiang Mai) | 4.5-5.5 | mm/day | Calculated from sensor data |
| ET₀ wet season (Chiang Mai) | 3.5-4.5 | mm/day | Cloud cover reduces radiation |
| Kc flowering | 1.0-1.1 | — | FAO Crop Coefficient |
| Kc cherry development | 1.0-1.15 | — | FAO Crop Coefficient |
| CWSI well-watered | 0.0-0.2 | — | Canopy temp minus air temp method |
| CWSI severe stress | 0.8-1.0 | — | Emergency irrigation needed |
| Rainwater tank (10,000 L PE) | 12,000-20,000 | THB | UV-stabilized polyethylene |
| Drip system (complete, per rai) | 8,400-17,500 | THB | Pipes, drippers, filter, valve, controller |
| Soil moisture sensor (calibrated) | 35-6,000 | THB | See [[Soil-Moisture-Sensors]] |
| pH + EC water quality sensor | 2,000-4,000 | THB | Combined probe node |
| Irrigation water pH optimal | 6.0-7.5 | pH | Coffee-specific |
| Irrigation water EC threshold | <1.0 | dS/m | Above = salinity risk |
| Water savings with IoT + drip | 30-50 | % | vs. traditional flood irrigation |
| Yield improvement with IoT irrigation | 15-25 | % | vs. no irrigation or calendar-based |
| System payback period | 4-8 | months | See [[Coffee-Economics]] |

---

## Northern Thailand Context

Water management for coffee in Northern Thailand is shaped by three factors that distinguish it from other coffee-producing regions: the extreme monsoon seasonality, the steep topography of highland farms, and the social context of smallholder hill tribe communities with limited capital and infrastructure.

### Highland Water Access

Most coffee farms in Northern Thailand's highland areas (800-1,700 masl) were established near natural water sources — perennial streams and springs that flow from the mountain watersheds above. However, these sources are under increasing pressure from upstream land use change (deforestation reduces dry-season baseflow), climate change (more variable rainfall patterns), and competing demands from lowland agriculture and tourism. The Mae Sa watershed in Chiang Mai, which supplies water to dozens of highland coffee communities, has seen dry-season streamflow decrease by 25-30% over the past two decades. For coffee farmers, this means that the water sources they have relied on for generations are becoming less reliable precisely when irrigation is becoming more necessary.

### Community Water Management

In most highland communities, irrigation water is a shared resource managed through informal community agreements. Farmers take turns drawing from a common stream or spring, and conflict arises during the peak dry season (March-May) when demand exceeds supply. IoT sensor data can facilitate more equitable water allocation by providing objective measurements of soil moisture conditions across farms — enabling the community to prioritize irrigation for farms with the greatest deficit rather than relying on who arrives at the water source first.

### Royal Project Water Infrastructure

The Royal Project Foundation has invested significantly in water infrastructure across its project areas, including gravity-fed irrigation systems, community water storage tanks, and lined canals. However, these systems were designed for flood and sprinkler irrigation, not for the precision drip systems that IoT sensors enable. Retrofitting existing Royal Project water infrastructure with drip systems and IoT control represents a high-impact opportunity — the water source and delivery pipes already exist; only the final distribution and control layer needs to be added.

---

## Related Topics

- [[Soil-Management]] — Soil health and organic matter directly affect water-holding capacity and irrigation requirements
- [[Cultivation-Best-Practices]] — Overall coffee management practices that interact with water management decisions
- [[Decision-Logic]] — The IF-THEN rule engine (IR-01 through IR-10) that translates sensor data into irrigation actions
- [[Alerts-Remediation]] — Alert delivery system and remediation procedures for water-related alerts
- [[Soil-Moisture-Sensors]] — Calibration, accuracy, and deployment details for VWC measurement
- [[Coffee-Economics]] — Full economic analysis including irrigation investment ROI
- [[Northern-Thailand-Weather]] — Detailed seasonal weather patterns driving water management decisions
- [[Climate-Change-Impact]] — How changing rainfall patterns affect long-term irrigation planning
- [[Microclimate-Factors]] — How elevation, slope, and aspect affect local water availability
- [[System-Cost-Estimate]] — Complete IoT sensor system cost breakdown including water management components

---

## References

1. FAO Irrigation and Drainage Paper 56 — "Crop Evapotranspiration: Guidelines for Computing Crop Water Requirements" (Penman-Monteith method)
2. Thai Meteorological Department — Historical rainfall and temperature data for Northern Thailand provinces (2000-2025)
3. Royal Project Foundation — "Water Management Guidelines for Highland Coffee" (2019, Thai language)
4. Khun Mae Kuang Watershed Research — Streamflow trends and upland water use in Chiang Mai province
5. Chiang Mai University, Faculty of Agriculture — "Evapotranspiration and Crop Coefficients for Arabica Coffee in Northern Thailand" (2022)
6. DOA Northern Region Office — Soil moisture characteristic curves for Red Latosol and Volcanic soils in Chiang Mai and Chiang Rai
7. Land Development Department (LDD) — "Drainage Guidelines for Upland Agriculture on Steep Slopes" (2021)
8. International Coffee Organization (ICO) — "Water Footprint of Coffee Production" (2020)
9. Heinrich Böll Foundation — "Climate Adaptation Strategies for Highland Coffee in Northern Thailand" (2024)
10. NECTEC/NDRI — "Smart Farming IoT Platform for Precision Irrigation in Thai Agriculture" (2023)

---

*Last updated: 2026-05-13*
