---
topic: Coffee Seasonal Calendar
phase: 2
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [seasonal-calendar, harvest-timing, flowering, pruning, fertilizing, arabica, robusta, thailand]
related: [Northern-Thailand-Weather, Microclimate-Factors, Decision-Logic, Alerts-Remediation, Climate-Change-Impact]
---

# Coffee Seasonal Calendar

> **Summary**: A month-by-month guide for Northern Thailand coffee farming, mapping sensor-driven decisions to seasonal phases. This calendar integrates climate data, phenological stages, IoT sensor thresholds, farming operations, and economic analysis across the three Northern Thailand seasons — providing a comprehensive decision framework for Arabica and Robusta coffee producers.

---

## Overview

Northern Thailand's coffee year is governed by the Asian monsoon system, which divides the year into three distinct seasons: the cool/dry season (November–February), the hot/dry season (March–April), and the rainy/wet season (May–October). Each season presents unique opportunities and risks for coffee cultivation, and the transition periods between seasons are often the most critical decision points. The traditional farmer's calendar — passed down through generations of hill tribe and Royal Project farmers — provides a foundation, but climate change is shifting seasonal timing and introducing new uncertainties. IoT sensor data bridges the gap between traditional knowledge and data-driven precision, enabling farmers to make decisions based on actual conditions rather than calendar dates alone.

This seasonal calendar serves as the master reference for timing every major farming operation in Northern Thailand's coffee year. It is designed to be used alongside the [[Decision-Logic]] engine and [[Alerts-Remediation]] system — the calendar tells you *what to do and when*, the decision engine tells you *whether conditions are right to do it*, and the alerts system tells you *when conditions demand immediate action*. Together, these three tools provide comprehensive operational guidance from pre-flowering through post-harvest.

The calendar covers both Arabica (primary focus, 800–1,700m) and Robusta (emerging in Northern Thailand, 200–500m) because the two species have significantly different seasonal rhythms, thresholds, and vulnerabilities. Arabica dominates the Northern Thailand highlands and follows the classic monsoon-driven phenology with a concentrated November–February harvest. Robusta in the northern lowlands shares the same monsoon rhythm but flowers over a longer period and may harvest slightly later, with greater sensitivity to the cool season's low temperatures.

---

## Season Definitions and Phenological Overview

### Northern Thailand's Three Seasons

| Season | Months | Key Characteristics | Coffee Significance |
|--------|--------|-------------------|-------------------|
| **Cool/Dry** | November–February | NE monsoon; clear skies; 10–16°C mornings; 27–33°C afternoons; minimal rainfall; low humidity | Arabica harvest and drying; Robusta post-harvest recovery; frost risk at >1,200m |
| **Hot/Dry** | March–April | Pre-monsoon; 35–40°C max; increasing humidity; sporadic thunderstorms; burning season haze | Flowering trigger period; critical irrigation need; heat stress; PM2.5 damage |
| **Rainy/Wet** | May–October | SW monsoon; heavy rainfall; 75–90% humidity; reduced sunshine; peak rain Aug–Sep | Fruit development; peak CLR pressure; waterlogging risk; drainage management |

### Arabica Phenological Cycle

| Stage | Period | Duration | Sensor Focus |
|-------|--------|----------|-------------|
| **Flowering initiation** | February–April | 4–8 weeks | Rainfall sensor → flowering trigger; soil moisture → irrigation |
| **Main flowering** | March–May | 3–6 weeks (1–3 flushes) | Temperature, humidity → flower viability |
| **Fruit development** | June–September | 16–20 weeks | Leaf wetness → CLR risk; soil moisture → cherry sizing |
| **Cherry maturation** | October–November | 6–8 weeks | Temperature → sugar accumulation; DTR → quality |
| **Harvest** | November–February | 12–16 weeks | Humidity → drying conditions; rainfall → harvest timing |
| **Post-harvest/rest** | February–March | 4–6 weeks | Soil pH → lime application; temperature → pruning timing |

### Robusta Phenological Cycle (Northern Thailand)

| Stage | Period | Duration | Notes |
|-------|--------|----------|-------|
| **Flowering** | March–June | 8–12 weeks (prolonged) | Cross-pollinated; needs dry, calm days for insect pollination |
| **Fruit development** | June–October | 16–22 weeks | Higher water demand than Arabica; irrigation critical |
| **Cherry maturation** | November–December | 6–8 weeks | Cold nights below 10°C can damage Robusta cherries |
| **Harvest** | December–March | 12–16 weeks | Less concentrated than Arabica; multiple passes needed |
| **Post-harvest/rest** | March–April | 4–6 weeks | Very short rest period before next flowering |

---

## Month-by-Month Calendar

### November — Harvest Begins, Cool Season Starts

November marks the transition from the rainy to the cool/dry season. Rainfall drops dramatically across all four provinces, humidity begins to fall, and morning temperatures start their descent. For Arabica, this is the beginning of the main harvest — early-maturing cherries on lower-elevation farms reach peak ripeness, while higher-elevation farms are still 2–4 weeks from their peak. For Robusta in Northern Thailand, the late-season rains may still be falling, delaying harvest start.

**Key Sensor Thresholds Active:**
- Humidity < 65% → optimal harvest/drying conditions (rule [[Decision-Logic|HP-01]])
- Rainfall > 5mm → cover drying cherries immediately (rule HP-05)
- Humidity > 75% during drying → mold/OTA risk (rule HP-02)
- Temperature < 5°C at highland farms → frost watch begins (rule [[Decision-Logic|TS-01]])

**Historical Weather Data by Province (November):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 18.0 | 27.9 | 40–53 | 4–5 | 71–74 | 7.0 |
| Chiang Rai | 17.9 | 27.1 | 55–62 | 5–6 | 76 | 7.0 |
| Mae Hong Son | 17.2 | 28.0 | 40 | 4 | ~74 | 7.0 |
| Nan | 19.3 | 28.5 | 40 | 4 | ~73 | 7.0 |

**Arabica Operations:**
- **Begin selective harvesting** of ripe cherries (red to deep purple); first picking pass focuses on earliest-maturing trees and lower branches
- **Prepare drying infrastructure**: raised beds with rain covers; ensure good airflow; clean and repair drying tables
- **Start wet processing** (washed, honey, or natural) based on market requirements; first lots set the season's quality reputation
- **Monitor drying conditions closely**: humidity should be 55–65% for optimal slow drying (10–14 days for specialty quality)
- **Collect soil samples** for DOA lab testing at season's end; post-harvest soil analysis guides fertilization for next season

**Robusta Operations:**
- **Late-season Robusta** may still be developing; avoid picking unripe cherries
- **Monitor temperature**: Robusta is sensitive to nights below 10°C; lowland valley floors can drop to 12–15°C
- **Prepare processing equipment** for Robusta harvest starting in December

**IoT Integration:** The transition month of November has the highest variability in drying conditions. Sensor data from [[Humidity-Sensors]] and [[Rainfall-Sensors]] is critical — a single unexpected rain event during the first drying lots can destroy a season's first and often best-quality cherries. The Decision Logic Engine's harvest rules (HP-01 through HP-06) should be set to maximum sensitivity during November.

**Seasonal Risk Map — November:**
| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Rain during drying | Moderate–High | Very High (30–70% price drop) | Rainfall sensor → immediate cover alert |
| High humidity / mold | Moderate | High | Humidity >75% → drying alert |
| Early frost (Chiang Mai highlands) | Low | Severe for young trees | Temperature <5°C → frost warning |
| Incomplete cherry maturation | Low | Moderate | Temperature/humidity data → ripeness model |

**Economic Impact:** November's first harvest lots often command the highest prices because early-season supply is limited. Getting the first lots dried perfectly can add 20–40 THB/kg to the season's average price. A rain event that ruins the first lot costs approximately 15,000–25,000 THB per 10 rai of Arabica. Sensor-informed drying decisions in November alone can justify the entire year's sensor system cost.

---

### December — Peak Harvest, Frost Season

December is the heart of the Arabica harvest and the peak of the cool season. Morning temperatures in the highlands can drop to near-freezing, particularly at Doi Inthanon, Doi Ang Khang, and Doi Chiang Dao in Chiang Mai Province. Chiang Rai's coffee areas at 800–1,400m typically stay just above the frost threshold, but cold damage is possible. Drying conditions are excellent when humidity is low, but valley fog can extend leaf wetness duration and slow drying.

**Key Sensor Thresholds Active:**
- Temperature < 4°C → EMERGENCY frost alert (rule TS-01)
- Temperature < 2°C → severe frost; expect tissue damage (rule TS-02)
- Humidity < 65% → ideal drying conditions (rule HP-01)
- Wind < 0.5 m/s AND humidity > 70% → poor drying conditions (rule HP-04)

**Historical Weather Data by Province (December):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 15.1 | 26.5 | 15–20 | 1–2 | 69–71 | 8.0 |
| Chiang Rai | 14.8 | 25.2 | 30–37 | 2–3 | 74 | 7.0 |
| Mae Hong Son | 14.3 | 26.9 | 10 | 1 | ~71 | 7.0 |
| Nan | 16.8 | 27.0 | 15 | 1–2 | ~68 | 7.5 |

**Arabica Operations:**
- **Main harvest picking** — second and third passes; most farms are at peak yield
- **Frost protection deployment** at farms above 1,200m: overhead sprinklers on standby, shade cloth ready, monitor temperature sensors hourly on clear, calm nights
- **Continue processing and drying** — December's low humidity and sunshine provide the best drying conditions of the year
- **Quality control**: cupping early lots; adjust processing based on results; separate lots by elevation, variety, and picking date
- **Begin planning post-harvest pruning** — identify which trees need rehabilitation

**Robusta Operations:**
- **Begin Robusta harvest** in lowland areas (Nan, Lampang, Uttaradit)
- **Monitor for cold damage**: Robusta leaves and cherries are damaged by sustained temperatures below 10°C; lowland valleys are particularly vulnerable during cold air drainage events
- **Process and dry Robusta** — natural/dry processing is common for Fine Robusta

**IoT Integration:** December is the month where temperature sensors at highland farms are most critical. The frost alert system (ALR-TEM-01) must be fully operational, with SMS and voice call escalation configured. At farms above 1,400m, deploy additional temperature loggers in the lowest points of the farm (frost pockets) to provide early warning. Soil moisture sensors should be monitored to ensure trees are not drought-stressed during harvest, which can cause cherry drop.

**Seasonal Risk Map — December:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Frost (above 1,200m) | High (Chiang Mai) | Severe — tissue death, cherry damage | Temperature <4°C → EMERGENCY frost alert |
| Valley fog / slow drying | Moderate | Moderate — extended drying time | Humidity + wind → drying condition alert |
| Cherry drop from drought stress | Low–Moderate | Moderate | Soil VWC <18% → irrigation alert |
| Cold damage to Robusta | Moderate (valley floors) | High — Robusta has no frost tolerance | Temperature <10°C sustained → Robusta cold alert |

**Economic Impact:** Frost during December can cause catastrophic losses at highland farms. A single severe frost event at Doi Inthanon can destroy 30–50% of unharvested cherries, representing losses of 30,000–75,000 THB per rai for premium Arabica. Conversely, December's excellent drying conditions produce the highest-quality lots of the season — properly dried December-harvested Arabica can command 250–400 THB/kg green bean at specialty markets, versus 150–200 THB/kg for poorly dried lots.

---

### January — Late Harvest, Deep Cool Season

January continues the cool season with the lowest minimum temperatures of the year at most highland locations. Harvest is winding down at lower and mid-elevation farms but continues at the highest elevations (1,400m+) where cherries mature later. Frost risk peaks in January, particularly during clear, calm nights when radiative cooling is strongest. For Robusta, January is the coldest month, and lowland farms may experience cold stress.

**Key Sensor Thresholds Active:**
- Temperature < 4°C → frost EMERGENCY (rules TS-01, TS-02)
- Temperature < 10°C sustained >12h → Robusta cold damage (ALR-TEM-04)
- Humidity < 65% → ideal drying conditions (HP-01)
- Cherry maturity sensors → final picking alert (ALR-HAR-04)

**Historical Weather Data by Province (January):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 15.4 | 27.4 | 10–14 | 1 | 64–67 | 8.5–9.0 |
| Chiang Rai | 14.5 | 26.0 | 37–41 | 3 | 72 | 7.0 |
| Mae Hong Son | 13.9 | 27.5 | 6 | 1 | ~67 | 5.9 |
| Nan | 16.4 | 27.3 | 16 | 1–2 | ~65 | 7.5 |

**Arabica Operations:**
- **Final harvest passes** at mid-elevation; harvest continues at 1,400m+ (Doi Inthanon, Doi Ang Khang, Doi Phu Kha)
- **Complete drying** of all lots; target 11–12% moisture content before storage
- **Begin cupping and lot selection** — grade and separate lots for specialty vs. commodity markets
- **Prepare for pruning** — identify unproductive, diseased, or overcrowded trees
- **Frost watch remains critical** — January historically has the most severe frost events

**Robusta Operations:**
- **Continue Robusta harvest** — later-maturing cherries still ripening
- **Cold protection**: Robusta at low elevations is vulnerable; windbreaks and shade cloth can help
- **Process and dry Robusta lots** — slower drying in cool weather can benefit Fine Robusta quality

**IoT Integration:** January is the final month of heavy harvest activity, and the Decision Logic Engine should shift focus from harvest rules to post-harvest planning. Soil sensors become important for monitoring post-harvest moisture levels — trees that have been heavily cropped need adequate soil moisture for recovery. Temperature sensors remain on high alert for frost, especially during the first two weeks of January which historically have the coldest nights.

**Seasonal Risk Map — January:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Severe frost (above 1,200m) | Very High (Chiang Mai) | Catastrophic — plant death, total crop loss | Temperature sensor network + frost alert |
| Cold damage to Robusta | High (valley floors) | High — leaf/branch dieback | Temperature <10°C → Robusta alert |
| Drought stress (post-harvest) | Moderate | Moderate — tree recovery impaired | Soil VWC <15% → irrigation alert |
| Late rain (rare but damaging) | Low | High — ruins drying lots | Rainfall sensor → immediate cover |

**Economic Impact:** January frost represents the single largest economic risk for highland Arabica farms. The Doi Inthanon frost events of the 2025–2026 season caused estimated losses exceeding 5 million THB across the affected farming community. For farms that successfully navigate the frost season, January's excellent drying conditions and the scarcity of late-harvest coffee can command premium prices of 300–500 THB/kg for high-altitude specialty lots.

---

### February — Post-Harvest, Flowering Preparation

February is the transition from the cool/dry season toward the hot/dry season. Temperatures begin climbing, humidity remains low, and rainfall is minimal. For Arabica, February marks the end of harvest and the beginning of post-harvest recovery and preparation for the next flowering cycle. The first hints of rising humidity and occasional pre-monsoon showers can trigger premature flowering if not monitored carefully.

**Key Sensor Thresholds Active:**
- Soil VWC < 15% → drought stress alert (rule IR-01)
- Rainfall event > 10mm after dry period → unsynchronized flowering risk (rule FP-02)
- Humidity > 60% AND temperature rising → flowering watch (rule FP-01)
- Soil pH < 4.5 → lime application needed (rule SH-01)

**Historical Weather Data by Province (February):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 17.9 | 30.9 | 5–11 | 1 | 52–55 | 9.0 |
| Chiang Rai | 15.9 | 29.7 | 11–16 | 2–3 | 64 | 8.5 |
| Mae Hong Son | 15.6 | 30.8 | 4 | 1 | ~55 | 8.5 |
| Nan | 18.4 | 30.5 | 9 | 1–2 | ~58 | 8.5 |

**Arabica Operations:**
- **Complete final harvest** at highest elevations
- **Post-harvest pruning**: remove dead, diseased, and crossing branches; open canopy for airflow and light penetration; this is the optimal pruning window before new growth begins
- **Apply lime** if soil pH is below 5.0 (based on post-harvest soil test results); lime needs 4–6 weeks to take effect before the rainy season
- **Begin fertilization planning** — order inputs for pre-flowering application in March/April
- **Stump rejuvenation** for old, unproductive trees (cut to 30–40cm); new shoots will develop during the coming rainy season
- **Frost risk declining** but still present at the highest elevations early in the month

**Robusta Operations:**
- **End of Robusta harvest** in most Northern Thailand locations
- **Post-harvest pruning and sanitation** — remove dead wood, clear undergrowth
- **Apply basal fertilizer** (NPK 15-15-15 or equivalent) to support tree recovery
- **Cold stress recovery**: assess damage from cool season; prune affected branches

**IoT Integration:** February is the month to recalibrate and maintain sensor systems while farm activity is relatively low. Use the dry season to perform [[Sensor-Calibration-Field-Guide|sensor calibration]], replace batteries, and repair any weather-damaged equipment before the critical flowering and rainy seasons. Soil moisture sensors should be checked and recalibrated — dry season is the easiest time to perform the air-water calibration procedure. Deploy additional temperature sensors if planning to expand monitoring coverage.

**Seasonal Risk Map — February:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Premature flowering (early rain) | Low–Moderate | Moderate — unsynchronized bloom, extended harvest | Rainfall + humidity → flowering alert (FP-02) |
| Drought stress (post-harvest recovery) | Moderate | Moderate — impaired tree recovery | Soil moisture <15% → irrigation alert |
| Burning season PM2.5 | High | Moderate — reduced photosynthesis | (PM2.5 sensor optional; not in base system) |
| Late frost (early February) | Low (highlands only) | Severe | Temperature monitoring continues |

**Economic Impact:** Proper post-harvest pruning in February sets the foundation for the next season's yield. Well-pruned trees produce 15–25% more cherries the following year compared to unpruned trees, translating to an additional 3,000–8,000 THB/rai for Arabica. Conversely, missing the pruning window and trying to prune during the hot season stresses trees and reduces the benefit. Lime application in February corrects pH before the growing season, improving nutrient uptake efficiency by 20–40%.

---

### March — Hot Season Begins, Flowering Trigger

March is the first month of the hot/dry season and the most critical flowering trigger period for Arabica coffee in Northern Thailand. Temperatures rise sharply, reaching 33–35°C in the valleys and 28–32°C at Arabica elevations. The burning season begins in earnest, with PM2.5 levels peaking across Chiang Mai, Mae Hong Son, and parts of Chiang Rai. Isolated thunderstorms may occur but are unpredictable — a single rain event after a dry period triggers the first major flowering.

**Key Sensor Thresholds Active:**
- Rainfall > 10mm after dry period > 14 days → flowering predicted (rule FP-01)
- Soil VWC < 15% → CRITICAL drought stress (rule IR-01)
- Air temperature > 30°C for > 4 hours → heat stress (rule TS-03)
- PAR > 1,800 µmol/m²/s AND temperature > 30°C → insufficient shade (rule SL-02)
- Soil VWC 18–25% AND no rain forecast → irrigation needed (rule ALR-WAT-03)

**Historical Weather Data by Province (March):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 20.8 | 33.4 | 20–26 | 2–3 | 47–49 | 9.5 |
| Chiang Rai | 18.7 | 32.2 | 23–30 | 3–4 | 61 | 9.0 |
| Mae Hong Son | 19.0 | 33.8 | 15 | 2 | ~45 | 10.5 |
| Nan | 21.1 | 33.0 | 30 | 3–4 | ~52 | 9.0 |

**Arabica Operations:**
- **Monitor for first flowering** — the first significant rain after a dry period triggers the main blossom; this is the most important phenological event of the year
- **Apply pre-flowering fertilizer** (NPK 15-15-15 at 50–75 kg/rai) 1–2 weeks before expected flowering; timing is critical — fertilizer must be available when flowers open
- **Irrigate if soil moisture is low** — drought-stressed trees produce fewer flowers and have higher flower abortion rates; apply 20–30L per mature tree if VWC is below 20%
- **Install or verify shade structures** — young plants (<3 years) need shade cloth or temporary protection from intense March sun
- **PM2.5 management**: burning season haze can reduce photosynthesis by 10–30%; irrigate to reduce plant stress; consider anti-transpirant sprays for young trees

**Robusta Operations:**
- **Pre-flowering preparation** — Robusta flowers over a longer period (March–June); prepare for sustained flowering management
- **Irrigation is critical** — Robusta requires more water than Arabica and Northern Thailand's rainfall (1,100–1,700mm) is well below Robusta's 2,000–2,500mm optimum
- **Apply pre-flowering fertilizer** at 60–80 kg/rai NPK 15-15-15
- **Ensure pollinator habitat** — Robusta is cross-pollinated; flowering success depends on insect pollinators

**IoT Integration:** March is the most important month for the flowering prediction rules (FP-01 through FP-05). The Decision Logic Engine should have these rules at maximum sensitivity. Rainfall sensors and soil moisture sensors are the primary data sources — the first significant rain after a dry period of 14+ days with temperatures of 20–30°C triggers the flowering prediction alert, giving farmers 7–14 days advance notice to apply pre-flowering inputs. Missing this window means waiting for the next flowering flush, which may be weeks later, resulting in staggered harvest.

**Seasonal Risk Map — March:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| False monsoon start → flower drop | Moderate | High — 30–50% yield loss if flowers abort | Soil moisture + rainfall → irrigation trigger |
| Heat stress (young plants) | High | Moderate — leaf scorch, growth reduction | Temperature >30°C + low shade → shade alert |
| Drought during flower development | High | Very High — flower abortion | Soil VWC <15% → EMERGENCY irrigation |
| Unsynchronized flowering | Moderate | Moderate — extended harvest, higher labor cost | Multiple small rain events → flowering warning |
| Burning season PM2.5 | Very High | Moderate — reduced photosynthesis | (Air quality sensor or TMD data) |

**Economic Impact:** The flowering period determines the entire season's production potential. Research shows that drought stress during flowering can reduce fruit set by 40–60%, translating to yield losses of 10,000–25,000 THB/rai for Arabica. Conversely, properly timed irrigation during March flowering preserves fruit set and can increase yield by 20–35% compared to rain-dependent farms. The cost of one irrigation event (500–600 m³/ha) is approximately 500–1,000 THB/rai — a fraction of the potential yield loss.

---

### April — Peak Heat, Critical Flowering Period

April is the hottest month in Northern Thailand, with valley temperatures regularly exceeding 35°C and occasionally reaching 40°C. At Arabica elevations (800–1,400m), temperatures of 28–34°C are common. The pre-monsoon thunderstorms intensify, and the Songkran rains (mid-April) often trigger the second or main flowering flush. This is the highest-stress month for coffee plants — heat, drought, and haze combine to create severe physiological stress.

**Key Sensor Thresholds Active:**
- Temperature > 35°C → EMERGENCY heat stress (rule TS-04)
- Temperature > 30°C sustained + low shade → CRITICAL (rule TS-03)
- Soil VWC < 12% → EMERGENCY severe drought (rule IR-09)
- Rainfall > 20mm after dry period > 21 days → major flowering trigger (rule FP-04)
- UV index > 11 sustained → UV stress risk (rule ALR-LIT-03)

**Historical Weather Data by Province (April):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 23.7 | 35.0 | 50–65 | 6–8 | 52–54 | 9.5 |
| Chiang Rai | 22.0 | 33.1 | 90–103 | 8–10 | 64 | 9.7 |
| Mae Hong Son | 22.2 | 35.2 | 45 | 6 | ~54 | 9.5 |
| Nan | 23.3 | 33.8 | 80 | 7–8 | ~56 | 10.0 |

**Arabica Operations:**
- **Second/major flowering period** — Songkran rains (April 13–15) typically trigger the main blossom; this is the most important flowering event for harvest timing
- **Intensive irrigation management** — soil moisture must be maintained at 25–35% VWC throughout flowering; water stress during this period is the single largest cause of yield loss in Northern Thailand
- **Shade management**: ensure shade trees are providing adequate cover; install temporary shade cloth for exposed young trees; prune shade trees that are too dense (blocking >70% light)
- **Post-flowering fertilizer application** — if first flowering was in March, apply side-dressing of nitrogen (urea 46-0-0 at 20–30 kg/rai) to support fruit set
- **Monitor for early CLR signs** — rising humidity and warming temperatures create conditions favorable for the first CLR infections of the season

**Robusta Operations:**
- **Peak flowering period** for Robusta; multiple flushes possible through June
- **Intensive irrigation** — Robusta's higher water demand makes April the most critical month; apply 30–40L per tree weekly if rainfall is insufficient
- **Heat management**: mulch heavily (10–15cm layer) to cool root zone and retain moisture
- **Ensure wind protection** — hot season winds increase transpiration and water stress

**IoT Integration:** April demands the highest sensor vigilance of any month. The combination of extreme heat, critical flowering, and the onset of disease risk means more decision rules are active simultaneously than at any other time. The Decision Logic Engine's conflict resolution system becomes essential — when heat stress, drought, and disease risk alerts fire simultaneously, the hierarchy (disease > temperature > irrigation) ensures the farmer receives clear, prioritized guidance. Battery-powered sensors must be checked, as high temperatures accelerate battery discharge.

**Seasonal Risk Map — April:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Extreme heat (>35°C) | Very High | Severe — photosynthesis shutdown, flower abortion | Temperature >35°C → EMERGENCY heat alert |
| Drought during flowering | High | Catastrophic — 50%+ yield loss | Soil moisture <12% → EMERGENCY drought |
| Flower drop from heat stress | High | Very High | Temperature + VWC → combined stress alert |
| Early CLR infection | Moderate | Moderate — sets up epidemic if uncontrolled | Humidity + LWD → CLR watch |
| Songkran rain timing | Variable | Critical — determines harvest timing | Rainfall sensor → flowering prediction |

**Economic Impact:** April's heat and drought stress during flowering is the number one yield-limiting factor in Northern Thailand. Farms with irrigation produce 40–60% more cherries than rain-dependent farms in years with erratic pre-monsoon rainfall. For a 10-rai Arabica farm, this difference represents 75,000–150,000 THB in annual revenue. The investment in drip irrigation (3,000–5,000 THB/rai) pays for itself within 1–2 seasons through improved fruit set alone.

---

### May — Monsoon Transition, Early Fruit Development

May marks the transition from the hot/dry season to the rainy/wet season. The southwest monsoon typically arrives in mid-to-late May, bringing the first sustained rainfall of the season. Humidity rises sharply, and temperatures moderate slightly as cloud cover increases. For coffee, this is the transition from flowering to early fruit development — the small "pinhead" fruits begin to form and grow.

**Key Sensor Thresholds Active:**
- Leaf wetness > 12h AND humidity > 70% → CLR watch (rule DR-02)
- Soil VWC > 45% → drainage check needed (rule IR-04, ALR-WAT-04)
- Rainfall > 50mm/day AND soil VWC > 45% → saturated soil alert (rule IR-07)
- Soil VWC < 18% AND no rain → drought stress continues (rule ALR-WAT-01)

**Historical Weather Data by Province (May):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 23.7 | 31.9 | 150–171 | 14–15 | 67–69 | 6.5 |
| Chiang Rai | 23.0 | 30.7 | 210–229 | 17–18 | 70 | 7.5 |
| Mae Hong Son | 22.5 | 31.5 | 175 | 15 | ~69 | 7.5 |
| Nan | 23.3 | 31.1 | 190 | 16 | ~70 | 7.5 |

**Arabica Operations:**
- **Fruit set and early development** — pinhead stage through early expansion; consistent moisture is critical for cherry sizing
- **Pre-monsoon fertilizer application** — apply NPK 15-15-15 or 20-10-10 at 50–75 kg/rai; rains will incorporate fertilizer into soil
- **CLR preventive program begins** — first copper-based fungicide application before monsoon fully establishes; timing based on leaf wetness data rather than calendar
- **Drainage preparation** — clear contour drains, check waterways, ensure runoff channels are unblocked before heavy rains arrive
- **Shade tree management** — prune shade trees that have become too dense during dry season growth; maintain 40–50% canopy cover

**Robusta Operations:**
- **Flowering may continue** for Robusta through May and into June
- **Irrigation transition** — as monsoon rain establishes, reduce and eventually stop supplemental irrigation
- **Drainage is critical** — Robusta's deeper root system is vulnerable to waterlogging in heavy clay lowland soils
- **Mulch maintenance** — ensure mulch layer is intact to prevent soil erosion during first heavy monsoon rains

**IoT Integration:** The monsoon arrival is the key event in May, and its timing varies by 2–4 weeks from year to year. Rainfall sensors and soil moisture data allow the Decision Logic Engine to determine whether the monsoon has truly arrived (sustained soil moisture recovery) or whether a "false start" has occurred (brief rain followed by return to dry conditions). This distinction is critical for irrigation management — stopping irrigation too early costs yield, while irrigating unnecessarily wastes water and money.

**Seasonal Risk Map — May:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| False monsoon start | Moderate | High — drought stress after premature irrigation stop | Soil moisture trend → monsoon verification |
| First CLR infections | Moderate–High | Moderate — early control prevents epidemic | Leaf wetness + humidity → CLR watch |
| Soil erosion (first heavy rains) | Moderate | Moderate | Rainfall intensity >50mm/day → erosion alert |
| Nutrient leaching from first rains | Moderate | Moderate | Soil EC → nutrient status tracking |

**Economic Impact:** The transition from dry-season irrigation to monsoon rain management is a delicate economic balance. Over-irrigating during May wastes approximately 200–500 THB/rai in energy and water costs. Under-irrigating during a false monsoon start can cause fruit drop worth 5,000–15,000 THB/rai. Sensor data that accurately confirms monsoon establishment saves an average of 3,000–8,000 THB/rai per year in optimized irrigation costs across the transition period.

---

### June — Monsoon Established, CLR Season Begins

June is the first full month of the southwest monsoon, with regular heavy rainfall, high humidity, and reduced sunshine across all four provinces. Coffee cherries are in the early-to-mid development stage, expanding rapidly with adequate moisture. This is also the beginning of peak CLR pressure, particularly in Chiang Rai where June rainfall reaches 195–208mm with 18–19 rainy days.

**Key Sensor Thresholds Active:**
- Leaf wetness > 24h AND temp 18–28°C AND RH > 80% → CLR HIGH risk (rule DR-01)
- Humidity > 85% AND temp 22–25°C sustained 3 days → CLR epidemic conditions (rule DR-04)
- Soil VWC > 50% → waterlogging alert (rule ALR-WAT-02)
- Leaf wetness > 48h AND temp 20–25°C → CBD risk (rule DR-05)

**Historical Weather Data by Province (June):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 23.5 | 30.0 | 114–137 | 15–16 | 74–75 | 5.0 |
| Chiang Rai | 23.4 | 30.0 | 195–208 | 18–19 | 76 | 6.0 |
| Mae Hong Son | 22.0 | 28.7 | 195 | 18 | ~78 | 5.5 |
| Nan | 23.1 | 29.5 | 195 | 17 | ~78 | 6.0 |

**Arabica Operations:**
- **Fruit development** — cherries in expansion phase; consistent moisture and nutrient availability drive final cherry size
- **CLR management begins in earnest** — apply copper-based preventive fungicide when leaf wetness thresholds are met (not on a fixed calendar); inspect lower canopy weekly for early lesions
- **Second fertilizer application** — apply NPK 13-13-21 or potassium-rich formulation to support cherry filling and CLR resistance
- **Weed management** — rapid weed growth during monsoon; use mulch and manual weeding; avoid herbicides during fruit development
- **Drainage maintenance** — check contour drains after every heavy rain event; clear debris and sediment

**Robusta Operations:**
- **Late flowering may still occur** — monitor for final flowering flushes
- **Fruit development** — Robusta cherries grow rapidly in the warm, wet conditions
- **CLR pressure is lower for Robusta** due to natural resistance, but monitor for other fungal diseases (black rot, pink disease)
- **Drainage is paramount** — waterlogged Robusta roots are highly susceptible to Armillaria and Fusarium root rot

**IoT Integration:** June is the first month where the disease risk rules (DR-01 through DR-10) become the dominant alert category. Leaf wetness sensors are the single most valuable sensor during the monsoon season — they provide the data needed to time fungicide applications precisely, reducing chemical use by 30–50% compared to calendar-based spraying while improving disease control effectiveness by 15–25 percentage points. The cost savings from sensor-informed CLR management alone can be 6,000–13,000 THB per year for a 10-rai farm.

**Seasonal Risk Map — June:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| CLR epidemic onset | High (especially Chiang Rai) | Very High — 30–80% yield loss if uncontrolled | Leaf wetness >24h → fungicide alert |
| Waterlogging / root rot | Moderate | High — tree death in severe cases | Soil VWC >50% → drainage alert |
| Nutrient leaching | Moderate | Moderate — reduced cherry quality | Soil EC tracking → fertilizer timing |
| Storm damage (wind) | Moderate | Moderate — branch breakage | Wind speed >40 km/h → windbreak check |

**Economic Impact:** CLR is the single most economically damaging disease in Northern Thailand coffee. Uncontrolled CLR epidemics can reduce yields by 30–80%, representing losses of 10,000–40,000 THB/rai for Arabica. Sensor-driven precision CLR management costs 600–1,000 THB/rai/year in fungicide versus 1,200–2,000 THB/rai for calendar-based spraying, while achieving better control. The net economic benefit of IoT-informed CLR management is 5,000–15,000 THB/rai/year when accounting for both reduced chemical costs and improved yield preservation.

---

### July — Peak CLR Pressure, Cherry Development

July is typically the wettest or second-wettest month in Northern Thailand, particularly in Chiang Rai where rainfall reaches 345–412mm with 24–27 rainy days. CLR pressure peaks, and coffee berry borer (CBB) may begin emerging in lower-elevation farms. Cherry development continues rapidly with the abundant moisture.

**Key Sensor Thresholds Active:**
- Leaf wetness > 24h AND temp 18–28°C AND RH > 80% → CLR CRITICAL (rule DR-01)
- Leaf wetness > 48h AND temp 18–28°C AND RH > 85% → CLR EMERGENCY (rule DR-02)
- Temp sustained > 25°C AND RH > 70% → CBB emergence watch (rule DR-04)
- Soil VWC > 55% AND soil temp > 22°C → root rot risk (rule DR-06)

**Historical Weather Data by Province (July):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 23.1 | 29.2 | 140–155 | 17–18 | 77–78 | 4.0 |
| Chiang Rai | 23.1 | 29.2 | 345–412 | 24–27 | 81 | 4.5 |
| Mae Hong Son | 21.6 | 27.5 | 235 | 22 | ~83 | 4.0 |
| Nan | 22.6 | 28.4 | 280 | 22 | ~83 | 5.0 |

**Arabica Operations:**
- **Peak CLR management** — weekly scouting; fungicide applications triggered by leaf wetness data; systemic fungicide if epidemic conditions persist
- **Cherry development monitoring** — track cherry size and development; adjust nutrient applications if growth is lagging
- **CBB trapping** — set alcohol-based traps at lower elevations (<1,000m); inspect cherries for bore holes weekly
- **Airflow management** — aggressive pruning of interior branches in dense canopy areas to reduce LWD; target 30–40% shade with good air circulation
- **Drainage maintenance** — July's heavy rains test drainage infrastructure; inspect and clear after major storms

**Robusta Operations:**
- **Peak fruit development** — Robusta cherries should be fully formed and expanding
- **Lower CLR risk** but monitor for black rot and pink disease in high-humidity conditions
- **Drainage remains critical** — waterlogging is the primary risk for lowland Robusta

**IoT Integration:** July is the most sensor-intensive month. Leaf wetness sensors, humidity sensors, and soil moisture sensors all generate frequent alerts. The alert deduplication system is essential to prevent fatigue — a single CLR CRITICAL alert per 24-hour period is sufficient; repeating the same alert every hour erodes farmer trust. The weekly health report becomes the most important communication channel, providing trend analysis on CLR pressure that daily alerts cannot convey.

**Seasonal Risk Map — July:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| CLR epidemic | Very High (Chiang Rai) | Catastrophic — 50–80% yield loss | LWD >24h → fungicide; LWD >48h → emergency |
| CBB emergence | Moderate (lower elevations) | Moderate — 10–30% cherry damage | Temperature + RH → CBB monitoring trigger |
| Root rot | Moderate | Severe — tree death | Soil VWC >55% + temp >22°C → drainage alert |
| Storm/flood damage | Moderate | Moderate–Severe | Rainfall intensity → erosion/flash flood alert |
| Nutrient leaching | High | Moderate — reduced quality | Soil EC → fertilizer reapplication decision |

**Economic Impact:** July CLR management decisions determine whether a farm harvests a profitable crop or faces devastating losses. A single missed fungicide application during a July CLR epidemic can result in 30–50% yield loss, equivalent to 15,000–40,000 THB/rai for Arabica. Conversely, over-spraying on a calendar basis wastes 600–1,000 THB/rai in unnecessary chemical costs. Sensor-driven CLR management in July provides the highest return on sensor investment of any month in the calendar.

---

### August — Sustained Rains, Mid-Fruit Development

August continues the monsoon with heavy rainfall, particularly in Chiang Rai (340–371mm) and Nan (322mm). Mae Hong Son experiences its highest humidity of the year (~90%). Coffee cherries are in mid-development, approaching full size but still green and hard. CBB pressure increases, and CLR remains a major concern, though the worst epidemic conditions may have passed in some areas.

**Key Sensor Thresholds Active:**
- Leaf wetness > 24h → CLR CRITICAL (rule DR-01)
- Soil VWC > 50% sustained → waterlogging (rule ALR-WAT-02)
- Temp > 25°C AND RH > 70% → CBB watch (rule DR-04)
- Rainfall > 80mm/day → harvest pause warning (preparation for Oct–Nov)

**Historical Weather Data by Province (August):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 22.8 | 28.6 | 210–226 | 20–21 | 80–81 | 4.0 |
| Chiang Rai | 22.9 | 28.9 | 340–371 | 24–27 | 83 | 4.5 |
| Mae Hong Son | 21.4 | 27.4 | 279 | 25–28 | ~90 | 4.0 |
| Nan | 22.4 | 28.1 | 322 | 24–28 | ~90 | 5.0 |

**Arabica Operations:**
- **Continue CLR management** — leaf wetness-triggered fungicide applications; assess CLR severity and adjust strategy
- **CBB monitoring intensifies** — inspect cherries for bore holes; set additional traps if CBB is detected; consider Beauveria bassiana biocontrol application
- **Potassium fertilizer** — apply potassium sulfate or muriate of potash to support cherry maturation and quality; potassium improves bean density and sugar content
- **Drainage maintenance** — August has the most rainy days; ensure all drainage channels are functional
- **Canopy assessment** — evaluate shade levels; dense monsoon growth of shade trees may need thinning to maintain 40–50% cover

**Robusta Operations:**
- **Cherry development continues** — Robusta cherries are larger and more numerous than Arabica; monitor for CBB
- **Fertilizer application** — late-season side-dressing of potassium for cherry quality
- **Drainage and erosion control** — August's sustained heavy rain is the biggest test for Robusta drainage infrastructure

**IoT Integration:** August's sustained high humidity makes it the month with the most leaf wetness alerts. The [[Alerts-Remediation]] system's deduplication rules are critical — limiting CLR alerts to 2 per 24-hour period prevents fatigue while ensuring awareness. Soil moisture sensors in lowland Robusta areas should be set to more sensitive waterlogging thresholds, as Robusta is less tolerant of saturated soil than Arabica.

**Seasonal Risk Map — August:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| CLR sustained epidemic | High | Very High | LWD + humidity → ongoing fungicide alerts |
| CBB infestation | Moderate–High | Moderate–High | Temperature + RH → CBB monitoring trigger |
| Waterlogging / root rot | High (lowland) | Severe | Soil VWC >50% → drainage EMERGENCY |
| Landslide / severe erosion | Low–Moderate | Severe | Rainfall intensity >80mm/day → slope alert |
| Shade overgrowth | Moderate | Moderate — reduced flowering potential | PAR sensors → shade pruning trigger |

**Economic Impact:** August's CBB management is a growing concern as temperatures rise with climate change. CBB damage reduces both yield (5–30% cherry loss) and quality (CBB-damaged beans are classified as defects, reducing grade and price). For specialty Arabica, even 5% CBB damage can disqualify a lot from specialty grade, costing 100–200 THB/kg in price premium. Early detection through CBB traps and temperature/humidity monitoring allows timely intervention that preserves both yield and quality.

---

### September — Late Rains, Nutrient Depletion

September is typically the last month of heavy monsoon rainfall before the transition to drier conditions. Rainfall begins to decrease but is still substantial, particularly in Chiang Rai and Nan. Coffee cherries are approaching full size and beginning the long maturation process. Nutrient leaching from months of heavy rain becomes a significant concern.

**Key Sensor Thresholds Active:**
- Leaf wetness > 24h → CLR risk continues (rule DR-01)
- Soil EC < 0.3 mS/cm → nutrient depletion suspected (rule ALR-SOI-03)
- Soil VWC > 45% → drainage check (rule IR-04)
- Humidity > 80% → disease conditions persist

**Historical Weather Data by Province (September):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 22.3 | 28.7 | 195–235 | 16–17 | 80–81 | 5.0 |
| Chiang Rai | 22.5 | 28.8 | 225–246 | 18–20 | 81 | 5.5 |
| Mae Hong Son | 21.2 | 28.1 | 245 | 19 | ~85 | 5.0 |
| Nan | 22.3 | 28.4 | 250 | 18 | ~84 | 5.5 |

**Arabica Operations:**
- **Final CLR management** — last fungicide application of the season if needed; CLR pressure decreases as rains taper
- **Soil nutrient assessment** — collect soil samples for post-monsoon DOA lab testing; months of heavy rain leach nitrogen and potassium
- **Final potassium application** — if soil tests indicate depletion, apply quick-release potassium to support cherry maturation
- **Pre-harvest planning** — estimate harvest dates based on flowering records; prepare labor, equipment, and processing infrastructure
- **Drying infrastructure preparation** — repair and clean raised beds; verify rain covers; check mechanical dryer (if available)

**Robusta Operations:**
- **Late-season CBB management** — continue monitoring and trapping
- **Nutrient assessment and correction** — post-monsoon soil testing and fertilization
- **Pre-harvest preparation** — Robusta harvest typically begins in December

**IoT Integration:** September is the month to shift sensor focus from disease management to harvest preparation. The Decision Logic Engine should begin activating harvest-related rules (HP-01 through HP-06) while deactivating some disease rules as CLR pressure declines. Soil EC sensors provide early warning of nutrient depletion, triggering lab testing before the critical cherry maturation period.

**Seasonal Risk Map — September:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Nutrient depletion | High | Moderate — smaller cherries, lower quality | Soil EC + pH → lab test trigger |
| Late CLR surge | Moderate | High | LWD monitoring continues |
| Late-season storm damage | Moderate | Moderate | Rainfall + wind → storm alert |
| Delayed cherry maturation | Low | Moderate — later harvest | Temperature tracking → maturity model |

**Economic Impact:** Nutrient depletion from monsoon leaching can reduce cherry size by 10–20% and bean density by 5–15%, directly impacting both yield and quality. For specialty Arabica, reduced bean density often means a lot fails to meet the strict density requirements of specialty grading, costing 50–150 THB/kg in price premium. A 300–500 THB/rai investment in post-monsoon soil testing and targeted fertilization preserves 5,000–15,000 THB/rai in quality premium.

---

### October — Monsoon Withdrawal, Cherry Maturation

October marks the transition from the rainy season to the cool/dry season. Rainfall drops significantly, humidity begins to fall, and morning temperatures start to cool. This is the critical cherry maturation period for Arabica — sugars accumulate rapidly as temperatures moderate and the diurnal range increases. The first cherries begin to change color from green to yellow to red at lower elevations and earlier-flowering farms.

**Key Sensor Thresholds Active:**
- Diurnal range > 10°C AND temp 25–30°C day → excellent quality conditions (rule TS-07)
- Diurnal range < 5°C sustained → quality risk (rule TS-06)
- Humidity > 75% during early drying → mold risk (rule HP-02)
- Rainfall > 5mm during early harvest → cover alert (rule HP-05)

**Historical Weather Data by Province (October):**

| Province | Avg Min (°C) | Avg Max (°C) | Rainfall (mm) | Rainy Days | Humidity (%) | Sunshine (hrs/day) |
|----------|-------------|-------------|---------------|------------|-------------|-------------------|
| Chiang Mai | 20.9 | 28.4 | 110–132 | 11–12 | 76–78 | 6.5 |
| Chiang Rai | 21.2 | 28.2 | 160–174 | 13–14 | 79 | 6.5 |
| Mae Hong Son | 20.1 | 28.3 | 130 | 13 | ~78 | 6.5 |
| Nan | 21.5 | 28.6 | 115 | 12 | ~78 | 6.5 |

**Arabica Operations:**
- **Cherry maturation monitoring** — earliest-maturing lots begin to ripen; start Brix measurements to track sugar development; target Brix 18–22 for specialty harvest
- **Early harvest at lower elevations** (<1,000m) and early-flowering farms; first picking pass for peak-ripeness cherries
- **Pre-harvest sanitation** — remove mummified cherries, fallen fruit, and diseased branches; clean the orchard floor to reduce CBB and disease carryover
- **Drying infrastructure final check** — ensure all beds, covers, and processing equipment are ready for the main harvest
- **Process first lots** — early-harvest coffee often commands premium prices due to limited supply

**Robusta Operations:**
- **Cherry maturation continues** — Robusta cherries still developing; harvest is typically 6–8 weeks later than Arabica
- **Late-season disease management** — final CLR monitoring before dry season

**IoT Integration:** October is when the Decision Logic Engine's quality-related rules become most relevant. The diurnal temperature range (DTR) sensor data directly predicts cherry quality — DTR > 10°C during October–November maturation correlates strongly with higher bean density and cup quality scores. The system should track DTR trends and provide quality forecasts that help farmers decide which lots to target for specialty versus commodity processing.

**Seasonal Risk Map — October:**

| Risk | Likelihood | Impact | Sensor Mitigation |
|------|-----------|--------|-------------------|
| Late monsoon rain during early harvest | Moderate | Very High — ruins first drying lots | Rainfall sensor → harvest pause / cover alert |
| Narrow DTR (poor quality) | Low–Moderate | High — flat cup, lower prices | DTR tracking → quality forecast |
| CBB damage to ripening cherries | Moderate | Moderate — defective beans | Temperature + RH → CBB monitoring |
| Early harvest of underripe cherries | Moderate | High — grassy, astringent flavors | Brix/color tracking → ripeness model |

**Economic Impact:** October's cherry maturation conditions directly determine the season's quality ceiling. Farms that experience wide diurnal ranges (>12°C) during maturation produce beans that score 3–5 points higher on SCA cupping, translating to price premiums of 50–200 THB/kg. A 10-rai Arabica farm producing 1,200 kg of green bean can earn an additional 60,000–240,000 THB from quality-driven price premiums — all determined by October and November weather conditions.

---

## Harvest Timing Optimization

### Using Temperature and Humidity Data to Predict Optimal Ripeness Window

The optimal harvest window for Arabica coffee in Northern Thailand is determined by the intersection of cherry physiological maturity and favorable drying weather. IoT sensors enable precision timing of both factors.

**Cherry Maturity Indicators:**
| Indicator | Method | Specialty Threshold | Commodity Threshold |
|-----------|--------|--------------------|--------------------|
| Brix (sugar content) | Refractometer | 18–22° | >14° |
| Color | Visual / color sensor | >85% red/purple | >50% red |
| Bean density | Water float test | Sinkers >90% | Sinkers >70% |
| Moisture content | Moisture meter | 55–65% (cherry) | 50–70% |

**Drying Weather Window Prediction:**
The Decision Logic Engine uses 3–5 day weather forecasts combined with real-time humidity and rainfall data to predict optimal harvest timing. The ideal harvest-to-drying sequence is: pick on a dry morning → process same day → begin drying the next morning → continue drying for 10–14 days with humidity <65% and no rain.

| Forecast Condition | Harvest Decision | Risk Level |
|-------------------|-----------------|------------|
| Dry 5+ days, humidity <65%, temp 25–30°C | **Harvest immediately** — ideal conditions | Low |
| Dry 3–4 days, then rain possible | Harvest most mature lots; delay less ripe | Moderate |
| Rain forecast within 48 hours | Delay harvest; wait for dry window | High if picked |
| Extended wet period (>7 days) | Harvest only if cherries are overripe; use mechanical drying | Very High |

**Economic Value of Harvest Timing Optimization:**

| Scenario | Yield (kg/rai) | Quality | Price (THB/kg) | Revenue (THB/rai) |
|----------|---------------|---------|----------------|-------------------|
| Optimal timing, sensor-guided | 250–350 | Specialty (SCA 80+) | 250–400 | 62,500–140,000 |
| Good timing, experience-based | 200–300 | Good commercial | 150–250 | 30,000–75,000 |
| Poor timing (rain during drying) | 200–300 | Commodity/defective | 80–120 | 16,000–36,000 |
| Very poor timing (mold/fermentation) | 150–250 | Reject | 40–80 | 6,000–20,000 |

The difference between optimal sensor-guided harvest timing and poor timing can exceed 100,000 THB/rai for specialty-oriented farms. Even for commodity producers, the difference between well-timed and poorly-timed harvest is 15,000–40,000 THB/rai.

---

## Climate Change Calendar Shifts

### How Traditional Timing Is Shifting

Climate change is disrupting the traditional coffee calendar in Northern Thailand in several measurable ways. The monsoon onset is becoming less predictable, with start dates varying by 2–4 weeks from historical norms. False monsoon starts — early rain followed by extended dry periods — are increasing in frequency, causing flower drop and unsynchronized flowering. The cool season is shortening, with November and February temperatures trending upward at approximately 0.34°C per decade (see [[Climate-Change-Impact]]).

| Calendar Event | Traditional Timing | Observed Shift | Sensor Adaptation |
|---------------|-------------------|---------------|-------------------|
| First flowering | Early March | Now Feb–Mar (2–4 weeks earlier in some years) | Rainfall + soil moisture → flowering prediction replaces calendar |
| Monsoon onset | Mid-May | Now mid-May to mid-June (erratic) | Soil moisture trend → monsoon verification |
| Peak CLR season | July–August | Now June–September (longer season) | LWD + humidity → disease risk replaces calendar spraying |
| Harvest start | Early November | Now Oct–Nov (earlier at lower elevations) | Cherry maturity sensors → ripeness detection |
| Frost risk period | December–January | Now late Dec–Jan (shorter, but events may be more severe) | Temperature sensors → frost alert replaces calendar watch |
| Hot season peak | April | Now March–May (extended) | Temperature sensors → heat stress alerts |

### How Sensors Adapt to Shifting Seasons

The fundamental advantage of sensor-driven decision-making over calendar-based farming is resilience to climate variability. When the monsoon arrives two weeks late, a calendar-based farmer irrigates on schedule (wasting water) or doesn't irrigate (risking drought stress). A sensor-equipped farmer sees soil moisture declining in real time and irrigates precisely when needed, regardless of what the calendar says. As seasonal timing becomes less predictable, sensor data becomes more valuable, not less.

The Decision Logic Engine's context-aware rule activation (see [[Decision-Logic]]) already accommodates this shift by using sensor data to determine the current "effective season" rather than relying on calendar dates. For example, the flowering prediction rules activate when soil moisture and temperature patterns match pre-monsoon conditions, not when the calendar reaches March 1st.

---

## Integration with Decision Logic Engine Rules by Season

### Seasonal Rule Activation Summary

| Season | Primary Active Rules | Rule Count | Key Alert Categories |
|--------|---------------------|------------|---------------------|
| **Cool/Dry (Nov–Feb)** | TS-01/02 (frost), HP-01–06 (harvest/drying), IR-01/02 (irrigation) | 25–30 | Temperature, Harvest, Irrigation |
| **Hot/Dry (Mar–Apr)** | FP-01–05 (flowering), IR-01–10 (irrigation), TS-03/04 (heat), SL-01–06 (shade) | 30–35 | Irrigation, Flowering, Temperature, Light |
| **Transition (May, Oct)** | IR (mixed), DR (rising/falling), HP (preparation) | 30–35 | All categories — peak rule density |
| **Rainy (Jun–Sep)** | DR-01–10 (disease), IR-04/05 (drainage), TS-05/06 (soil/DTR) | 20–25 | Disease, Water management |

### How the Calendar Informs Rule Parameters

The seasonal calendar provides the *default* parameter values for the Decision Logic Engine, which are then adjusted by real-time sensor data and farm-specific configuration:

| Parameter | Cool/Dry Default | Hot/Dry Default | Rainy Default | Sensor Override |
|-----------|-----------------|----------------|--------------|----------------|
| Soil moisture alert threshold | 15% VWC | 18% VWC | 45% VWC | Adjusted by soil type calibration |
| Leaf wetness alert threshold | Inactive | Inactive | 24h | Activated by humidity >70% |
| Frost alert temperature | <5°C | Inactive | Inactive | Adjusted by elevation zone |
| Heat alert temperature | Inactive | >30°C | Inactive | Adjusted by variety (Arabica vs. Robusta) |
| DTR quality threshold | Active (>10°C optimal) | Inactive | Inactive | Always tracked during cherry maturation |

---

## Comprehensive Economic Calendar

### Annual Revenue and Cost Timeline (Arabica, 10-rai farm, 1,200m elevation)

| Month | Key Revenue | Key Costs | Net Cash Flow | Sensor ROI |
|-------|------------|-----------|--------------|------------|
| November | First harvest lots: 30,000–60,000 THB | Labor (picking): 15,000–25,000 THB | +5,000 to +35,000 | Drying condition alerts save 5,000–15,000 |
| December | Peak harvest: 80,000–150,000 THB | Labor (picking): 25,000–40,000 THB | +40,000 to +110,000 | Frost alerts save 10,000–50,000 |
| January | Late harvest: 40,000–80,000 THB | Labor (picking): 15,000–25,000 THB | +15,000 to +55,000 | Frost alerts + drying optimization |
| February | Final lots: 10,000–20,000 THB | Pruning labor: 8,000–12,000 THB; Lime: 1,000–3,000 THB | -1,000 to +5,000 | Soil pH → correct lime rate |
| March | — | Fertilizer: 5,000–8,000 THB; Irrigation: 1,000–3,000 THB | -6,000 to -11,000 | Flowering prediction → timing |
| April | — | Irrigation: 2,000–5,000 THB; Shade cloth: 2,000–5,000 THB | -4,000 to -10,000 | Drought alert → irrigation optimization |
| May | — | Fertilizer: 5,000–8,000 THB; Drainage: 2,000–5,000 THB | -7,000 to -13,000 | Monsoon verification → irrigation savings |
| June | — | Fungicide (1st): 2,000–4,000 THB; Labor: 3,000–5,000 THB | -5,000 to -9,000 | LWD-triggered spray saves 1,500–3,000 |
| July | — | Fungicide (2nd): 2,000–4,000 THB; Labor: 3,000–5,000 THB | -5,000 to -9,000 | LWD-triggered spray saves 2,000–5,000 |
| August | — | Fungicide (3rd if needed): 2,000–3,000 THB; K-fertilizer: 3,000–5,000 THB | -5,000 to -8,000 | CLR management + CBB detection |
| September | — | Soil test: 500–1,000 THB; Fertilizer correction: 2,000–4,000 THB | -2,500 to -5,000 | Nutrient depletion alert |
| October | — | Pre-harvest prep: 3,000–5,000 THB | -3,000 to -5,000 | Quality forecast → processing decisions |
| **Annual Total** | **160,000–310,000** | **~76,000–129,000** | **~84,000–181,000** | **Sensor ROI: 25,000–80,000 THB/year** |

**Sensor system cost**: approximately 5,000–15,000 THB for a 10-rai farm (basic suite) with annual operating costs of 1,000–3,000 THB. **Payback period**: 1–6 months from the first season of deployment.

---

## Related Topics

- [[Northern-Thailand-Weather]] — Detailed monthly climate data by province
- [[Microclimate-Factors]] — How local topography modifies seasonal patterns
- [[Decision-Logic]] — IF-THEN rules that operationalize seasonal decisions
- [[Alerts-Remediation]] — Detailed remediation procedures for seasonal alerts
- [[Climate-Change-Impact]] — How seasonal timing is shifting and adaptation strategies
- [[Arabica-Climate-Range]] — Optimal climate parameters for Arabica
- [[Robusta-Climate-Range]] — Optimal climate parameters for Robusta
- [[Coffee-Sunlight-Requirements]] — Light management through the seasons
- [[Soil-Management]] — Seasonal soil care and fertilization
- [[Harvesting-Techniques]] — Detailed harvest and post-harvest methods
- [[Post-Harvest-Processing]] — Processing methods and drying management
- [[Pest-Disease-Management]] — Seasonal disease and pest management
- [[Coffee-Economics]] — Full economic analysis of coffee farming

---

## References

1. Thai Meteorological Department (TMD) — 30-year climate normals for Northern Thailand (tmd.go.th)
2. climate-data.org — Monthly temperature, rainfall, humidity, sunshine (1991–2021 baseline)
3. Royal Project Foundation — Seasonal coffee management guidelines for Northern Thailand
4. FAO Arabica Coffee Manual for Lao PDR — Phenological stages and seasonal management
5. METOS/Pessl Instrument — CLR disease models and seasonal leaf wetness thresholds
6. Heinrich Böll Foundation (2025) — Coffee farming in Northern Thailand report
7. Kath, J. et al. (2020) — Not so robust: Robusta temperature sensitivity, *Global Change Biology*
8. Avelino, J. et al. (2015) — Coffee rust development models and seasonal dynamics
9. IPCC AR6 — Regional climate projections for Southeast Asia and monsoon variability
10. World Coffee Research — Seasonal management calendar for coffee production
11. DOA Thailand — Fertilizer recommendations and seasonal application timing
12. NECTEC — B-Farm/HandySense platform and seasonal rule configuration
13. Bangkok Post / Nation Thailand (2025–2026) — Frost event reporting at Doi Inthanon
14. Q Project Thailand — Chiang Rai coffee harvest timing data (2024)
15. Nutongkaew, P. et al. (2019) — Climate change impact on coffee production in Northern Thailand

---

*Last updated: 2026-05-13*
