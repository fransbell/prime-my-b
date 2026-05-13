---
topic: IoT-Controlled Fermentation & Processing
phase: 4
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [fermentation, processing, post-harvest, specialty, washed, natural, honey, ph-monitoring, thailand]
related: [Post-Harvest-Processing, Harvesting-Techniques, Decision-Logic, Alerts-Remediation, Visualization-Dashboard, Coffee-Economics]
---

# IoT-Controlled Fermentation & Processing

> **Summary**: A comprehensive guide to precision fermentation control for specialty-grade coffee in Northern Thailand, covering the 2016 Thai processing revolution that transformed Catimor from commodity to specialty, fermentation types and their sensor requirements, critical parameters (temperature 20-28°C, pH tracking from 5.5 to 4.0-4.5 endpoint, dissolved oxygen), IoT sensor deployment in fermentation tanks and drying facilities, automated endpoint detection, drying phase monitoring from 60% to 11-12% moisture, OTA prevention through humidity alerts, equipment costs in THB, [[Visualization-Dashboard]] integration for real-time monitoring, quality impact of 5-10 SCA points, economic analysis showing specialty premiums of 200-800 THB/kg over commodity prices, season-specific fermentation strategies for Northern Thailand, a step-by-step sensor-assisted washed process, and references to leading Thai specialty processors — demonstrating that controlled fermentation is the single highest-return investment for coffee quality improvement in Northern Thailand.

---

## Overview

Fermentation is the transformative alchemy of coffee processing — the stage where the raw potential locked inside the coffee cherry is either unlocked into extraordinary flavor or lost forever to defect and mediocrity. In Northern Thailand, the importance of fermentation control was dramatically demonstrated in 2016, when a handful of innovative processors proved that the region's Catimor-dominant Arabica — long dismissed as a commodity-grade variety incapable of specialty quality — could achieve SCA cupping scores of 84+ and even reach Cup of Excellence caliber (86.73 points, Karen Farm Chomthong, COE 2025). The key was not new varieties or better soil; it was controlled fermentation — applying the precision of winemaking science to a process that had previously been managed by intuition and tradition.

IoT sensor technology takes this revolution one step further by making precise fermentation control accessible to every farmer, not just the well-capitalized specialty processors who pioneered the techniques. A temperature probe in a fermentation tank connected to an ESP32 microcontroller costs 500-1,500 THB and can prevent an over-fermentation event that would otherwise destroy an entire lot worth 50,000-200,000 THB. A pH probe that alerts the farmer when fermentation has reached its optimal endpoint eliminates the most common and costly quality defect in Thai coffee processing. And humidity sensors in the drying facility provide the data needed to prevent ochratoxin (OTA) contamination — a food safety concern that can render coffee unsaleable in international markets.

This document provides the complete technical and practical foundation for implementing IoT-controlled fermentation and processing on coffee farms in Northern Thailand, integrating with the [[Post-Harvest-Processing]] knowledge base, the [[Decision-Logic]] harvest and post-harvest rules, and the [[Alerts-Remediation]] notification system.

---

## The 2016 Thai Processing Revolution

Before 2016, Northern Thailand's Arabica coffee industry was defined by a simple, frustrating constraint: the dominant variety, Chiang Mai 80 (a Catimor hybrid developed by the Royal Project Foundation for rust resistance), was widely considered incapable of producing specialty-grade coffee. International buyers and domestic roasters alike dismissed Catimor as having limited complexity, a narrow flavor range dominated by woody and astringent notes, and an inherent ceiling of approximately 80 SCA points regardless of how carefully it was cultivated and harvested. This perception kept Northern Thai Arabica trapped in commodity pricing — 80-100 THB/kg green bean versus the 200-500+ THB/kg that specialty grades commanded.

### The Breakthrough

In 2016, researchers at Rajamangala University of Technology Lanna (RMUTL) in Chiang Mai, led by a group of food scientists and coffee processors inspired by winemaking and craft beer fermentation science, began experimenting with controlled fermentation environments for coffee. Their insight was simple but revolutionary: Catimor's perceived quality ceiling was not a genetic limitation but a processing limitation. The conventional washed process, applied without temperature control or pH monitoring, was failing to develop the complex flavor compounds that the variety was capable of producing. By controlling fermentation temperature, duration, microbial ecology, and pH progression, these researchers demonstrated that Catimor could achieve SCA scores of 84-87 points — firmly in specialty territory and competitive with far more expensive varieties from other origins.

### Key Innovations from the Thai Processing Revolution

| Innovation | Developer | Key Insight | SCA Impact | Year |
|-----------|-----------|------------|------------|------|
| **Brixter Process** | RMUTL, Chiang Mai | Sort cherries by Brix level; customize fermentation per tier | +2-5 points | 2016 |
| **Semi-Carbonic Maceration (SCM)** | Inspired by winemaking; Thai adaptation | CO2 environment creates intracellular fermentation; new flavor compounds | +4-8 points | 2017 |
| **Yeast Inoculation** | RMUTL + Lallemand collaboration | Cultured yeast strains steer flavor in targeted directions | +3-6 points | 2018 |
| **Coffivino Process** | Thai specialty processors | Wine-like fermentation with punch-down and temperature control | +4-7 points | 2019 |
| **Anaerobic Fermentation** | Adapted from Colombian techniques | Sealed environment; pressure affects enzymatic pathways | +3-6 points | 2018 |
| **Lactic Fermentation** | Thai processors + Korean techniques | LAB inoculation produces creamy, yogurt-like acidity | +3-5 points | 2020 |

### Economic Impact of the Revolution

The 2016 revolution fundamentally altered the economics of Northern Thai coffee. A farmer who had been selling Catimor cherry at 15-22 THB/kg (commodity) could now achieve SCA 84+ green bean prices of 200-500 THB/kg through controlled processing — a 10-25x increase in per-kilogram revenue. This economic transformation created a powerful incentive for farmers to invest in processing equipment, fermentation knowledge, and — increasingly — IoT sensor systems that make controlled fermentation repeatable and reliable.

| Metric | Pre-2016 (Traditional) | Post-2016 (Controlled) | Change |
|--------|----------------------|----------------------|--------|
| **SCA score range (Catimor)** | 76-80 | 84-87 | +4-11 points |
| **Green bean price (THB/kg)** | 80-100 | 200-500 | +150-400% |
| **Revenue per rai (10 rai farm)** | 24,000-40,000 THB | 100,000-300,000 THB | +300-650% |
| **Processing investment needed** | 5,000-15,000 THB | 50,000-200,000 THB | Significant increase |
| **IoT sensor investment needed** | 0 | 5,000-25,000 THB | New category |

---

## Fermentation Types and Sensor Requirements

Each coffee processing method has distinct fermentation dynamics and therefore different sensor requirements. Understanding these differences is essential for deploying the right sensors in the right configuration for each method.

### Washed (Wet) Process

The washed process is the most sensor-intensive fermentation method because it involves a controlled underwater fermentation in tanks where microbial activity can be precisely monitored. The fermentation is primarily aerobic in the early stages (yeasts dominate) and becomes increasingly anaerobic as oxygen is depleted (lactic acid bacteria become dominant). This microbial succession is what creates the complex flavor profile of well-processed washed coffee.

| Sensor | Placement | Critical Parameter | Alert Condition | Cost (THB) |
|--------|-----------|-------------------|-----------------|------------|
| **Temperature probe** | Inside fermentation tank (water-immersed) | 20-28°C optimal | >30°C or <15°C | 200-500 |
| **pH probe** | Inside fermentation tank | Track from ~5.5 to 4.2-4.5 endpoint | pH drops below 4.0 (over-fermentation) | 800-2,000 |
| **Ambient temperature** | Processing room | 18-25°C ideal | >30°C affects tank temperature | 100-300 |
| **Ambient humidity** | Drying area | 50-65% for drying | >75% during drying (mold risk) | 100-300 |
| **Cherry moisture meter** | Drying beds | Track from 60% to 11-12% | Stalled drying; moisture >16% after 7 days | 2,000-8,000 |

### Natural (Dry) Process

The natural process does not involve a separate fermentation tank — instead, fermentation occurs spontaneously inside the intact cherry as it dries. This makes it harder to monitor with traditional probes, but IoT sensors can track the ambient conditions that drive fermentation speed and quality. The natural process is ideally suited to Northern Thailand's dry season (November-February) when low humidity and consistent sunshine provide optimal drying conditions.

| Sensor | Placement | Critical Parameter | Alert Condition | Cost (THB) |
|--------|-----------|-------------------|-----------------|------------|
| **Ambient temperature** | Drying area | 22-30°C ideal for drying | >35°C (case hardening risk) | 100-300 |
| **Ambient humidity** | Drying area | 40-60% ideal | >75% sustained >6 hours | 100-300 |
| **Rain gauge** | Drying area | No rain during drying | Any rainfall event (cover immediately) | 500-1,800 |
| **Cherry moisture meter** | Drying beds | Track from 60% to 11-12% | Stalled at >30% moisture after 10 days | 2,000-8,000 |
| **Surface temperature** | Cherry bed surface | Below 40°C | >40°C causes case hardening | 200-500 |

### Honey Process (Pulped Natural)

The honey process falls between washed and natural: cherries are depulped but mucilage is left on the parchment during drying. A mild fermentation occurs as the mucilage dries, but it is less controlled than tank fermentation. Sensor requirements are similar to natural process but with closer attention to surface temperature and humidity, as the sticky mucilage layer is more prone to over-fermentation and mold than intact cherry skin.

| Sensor | Placement | Critical Parameter | Alert Condition | Cost (THB) |
|--------|-----------|-------------------|-----------------|------------|
| **Ambient temperature** | Drying area | 22-28°C ideal | >32°C (rapid mucilage fermentation) | 100-300 |
| **Ambient humidity** | Drying area | 45-60% ideal | >70% sustained >4 hours (mucilage mold) | 100-300 |
| **Cherry moisture meter** | Drying beds | Track from 55% to 11-12% | Mucilage fermenting rather than drying | 2,000-8,000 |
| **Wind speed** | Drying area | 1-3 m/s ideal for even drying | <0.5 m/s (poor drying; fermentation risk) | 500-2,000 |

### Anaerobic / Semi-Carbonic Maceration

These innovative processes require the most sophisticated sensor setup because they take place in sealed containers where pressure, temperature, and pH must be continuously monitored. The sealed environment means that problems develop faster and are harder to detect visually — making IoT monitoring not just valuable but essential for safe, quality-consistent results.

| Sensor | Placement | Critical Parameter | Alert Condition | Cost (THB) |
|--------|-----------|-------------------|-----------------|------------|
| **Temperature probe** | Inside sealed tank | 18-25°C | >28°C (runaway fermentation) | 200-500 |
| **pH probe** | Inside sealed tank (if accessible) | Track from ~5.5 to 4.0-4.5 | pH < 3.8 | 800-2,000 |
| **Pressure sensor** | Tank headspace | 0.5-1.0 atm (SCM) or self-generated (anaerobic) | >1.5 atm (safety/quality risk) | 300-800 |
| **CO2 sensor (optional)** | Tank headspace | CO2 production rate indicates fermentation activity | Sudden CO2 drop (stalled fermentation) | 1,500-3,000 |
| **One-way relief valve** | Tank lid | Releases excess pressure | Manual; no sensor needed | 50-200 |

---

## Critical Fermentation Parameters

Three parameters determine the quality outcome of coffee fermentation: temperature, pH, and dissolved oxygen (for aerobic vs anaerobic methods). Understanding the science behind each parameter is essential for interpreting sensor data correctly and making informed processing decisions.

### Temperature (20-28°C Optimal)

Temperature is the single most important controllable parameter in fermentation because it directly governs the rate of microbial growth and enzymatic activity. For every 10°C increase in temperature, microbial metabolism approximately doubles (the Q10 rule), meaning that fermentation at 30°C proceeds roughly twice as fast as at 20°C. This has profound implications for quality: faster fermentation produces more acid more quickly, increasing the risk of over-fermentation and off-flavors.

| Temperature Range | Fermentation Speed | Quality Outcome | Recommended Duration (Washed) | IoT Action |
|-------------------|-------------------|----------------|-------------------------------|-----------|
| **Below 15°C** | Very slow; may stall | Clean but incomplete; mucilage not fully removed | 48-72+ hours | Alert: Extend duration; consider warming tank |
| **15-20°C** | Slow; clean | Excellent complexity; clean acidity | 24-48 hours | Monitor; Northern Thailand highland harvest (Nov-Feb) often in this range |
| **20-28°C** | Moderate; optimal | Best balance of complexity and cleanliness | 12-36 hours | Ideal range; monitor pH for endpoint |
| **28-32°C** | Fast; risky | Increasing off-flavor risk; acetic acid production | 8-18 hours | Alert: Shorten duration; monitor pH every 2 hours |
| **Above 32°C** | Very fast; dangerous | High defect risk; vinegar notes; fermented off-flavors | Avoid; emergency cooling needed | CRITICAL alert: Cool tank immediately; move to shade |

### Northern Thailand Temperature Context

Northern Thailand's highland climate provides a natural advantage for coffee fermentation. During the main Arabica harvest season (November-February), daytime temperatures at 1,000-1,400 masl typically range from 18-26°C and nighttime temperatures from 8-16°C. These cool conditions favor slow, clean fermentation — but they also mean that fermentation takes longer than in tropical lowlands, and temperature fluctuation between day and night can create uneven fermentation rates. An IoT temperature sensor that tracks the tank temperature every 15 minutes provides the data needed to compensate for these fluctuations.

### pH (Tracking from ~5.5 to 4.0-4.5 Endpoint)

pH is the most reliable indicator of fermentation progress and the most important parameter for determining when to stop. As fermentation proceeds, microorganisms produce organic acids (primarily lactic, acetic, and citric acids) that progressively lower the pH of the fermentation medium. The pH trajectory follows a characteristic pattern that experienced processors can use to predict the optimal endpoint.

#### pH Progression During Washed Fermentation

| Fermentation Stage | pH Range | Duration (at 22°C) | Microbial Activity | Sensory Impact | Action |
|--------------------|---------|-------------------|-------------------|----------------|--------|
| **Start (fresh cherries)** | 5.5-6.5 | 0 hours | Minimal; cherry surface microbiome | Neutral; no fermentation character | — |
| **Lag phase** | 5.2-5.5 | 2-6 hours | Yeasts adapting; low metabolic activity | No perceptible change | Monitor; no action |
| **Active fermentation** | 4.8-5.2 | 6-12 hours | Yeasts dominant; CO2 production visible | Beginning complexity; slight sweetness | Monitor pH and temperature |
| **Peak activity** | 4.5-4.8 | 12-24 hours | Yeasts + LAB active; vigorous bubbling | Complex; fruity; sweet; well-developed | Prepare to stop fermentation |
| **Target endpoint** | 4.2-4.5 | 18-36 hours | Mucilage fully degraded; optimal flavor | Clean; bright acidity; full complexity | **STOP fermentation; wash immediately** |
| **Extended fermentation** | 3.8-4.2 | 36-60 hours | LAB dominant; increasing acetic acid | Increased complexity but rising risk | High risk; only for experimental lots |
| **Over-fermented** | Below 3.8 | 60+ hours | Acetobacter dominant; vinegar production | Sour; astringent; fermented; defective | **REJECT; quality lost** |

### Dissolved Oxygen (Aerobic vs Anaerobic)

The oxygen environment during fermentation determines which microorganisms dominate and, consequently, the flavor profile of the finished coffee. Aerobic conditions (open tanks with water) favor yeasts and aerobic bacteria that produce clean, bright acidity. Anaerobic conditions (sealed tanks) favor facultative anaerobes like lactic acid bacteria and produce creamier, more complex flavor profiles with enhanced body.

| Oxygen Condition | Dominant Microbes | Primary Metabolites | Flavor Profile | SCA Score Range | Process Type |
|-----------------|-------------------|--------------------|----------------|----------------|--------------|
| **Aerobic (open tank)** | Saccharomyces, Pichia, Acetobacter | Ethanol, CO2, acetic acid | Clean, bright, acidic | 80-87 | Washed, Honey |
| **Semi-anaerobic (partially sealed)** | Mixed yeasts + LAB | Ethanol, lactic acid, CO2 | Complex, fruity, moderate body | 83-88 | SCM, extended washed |
| **Anaerobic (sealed, CO2 atmosphere)** | LAB dominant, Torulaspora | Lactic acid, diacetyl, esters | Creamy, yogurt-like, full body | 84-89 | Anaerobic, SCM |
| **Strictly anaerobic (N2 flushed)** | LAB, Leuconostoc | Primarily lactic acid | Intense lactic, creamy, unusual | 83-88 | Experimental |

Dissolved oxygen (DO) sensors for fermentation monitoring are available but relatively expensive (3,000-8,000 THB per probe) and require careful maintenance. For most smallholder applications, the fermentation type itself (open tank vs sealed container) provides sufficient control over the oxygen environment, and pH + temperature monitoring gives adequate quality control without a separate DO sensor.

---

## How IoT Sensors Monitor Fermentation

The practical deployment of IoT sensors in a coffee fermentation setup requires careful consideration of sensor placement, data transmission, power supply, and the harsh processing environment (water, acidity, organic matter, and physical disturbance during washing and turning).

### Fermentation Tank Sensor Kit

A standard IoT fermentation monitoring kit for a small-to-medium coffee farm consists of the following components:

| Component | Specification | Cost (THB) | Notes |
|-----------|--------------|------------|-------|
| **Temperature probe** | DS18B20 waterproof, stainless steel sheath, 1m cable | 200-500 | Submerge in fermentation tank; waterproof to IP68 |
| **pH probe** | Analog pH electrode + signal conditioning board (pH-4502C or similar) | 800-2,000 | Requires weekly calibration with pH 4.0 and 7.0 buffer solutions |
| **ESP32 microcontroller** | ESP32-S3 with WiFi/BLE | 150-350 | Reads sensors; transmits data; controls relay for solenoid valve |
| **Waterproof enclosure** | IP67 plastic enclosure | 200-400 | Protects electronics from splash and humidity |
| **LCD display (optional)** | 16×2 or 20×4 I2C display | 100-250 | Shows real-time pH and temperature without phone |
| **Battery / power** | 18650 Li-ion cell (3,200 mAh) + solar panel (5W) | 300-600 | 7-14 days per charge; solar extends indefinitely |
| **Wiring and connectors** | JST connectors, heat-shrink tubing, cable glands | 100-200 | — |
| **Relay module (optional)** | 5V relay for solenoid valve control | 50-150 | Automated drain valve for stopping fermentation |
| **Total kit cost** | — | **1,900-4,450** | Per fermentation tank |

### Data Transmission and Dashboard Integration

The ESP32 transmits sensor data every 5-15 minutes via WiFi to the local server or cloud platform. Data points include timestamp, tank ID, temperature (°C), pH, and optional battery voltage. This data feeds directly into the [[Visualization-Dashboard]], where it is displayed as:

1. **Real-time fermentation curve**: A time-series chart showing pH and temperature overlaid on the fermentation timeline, with threshold bands marking the target endpoint (pH 4.2-4.5) and danger zones (pH < 3.8, temperature > 30°C).

2. **Fermentation progress indicator**: A percentage indicator showing how far the fermentation has progressed toward the target endpoint, based on the rate of pH decline and the starting pH. This gives the farmer a simple "50% complete / 75% complete / STOP" readout that requires no interpretation of raw pH numbers.

3. **Alert notifications**: LINE bot messages and push notifications when pH crosses critical thresholds, when temperature exceeds safe limits, or when the fermentation has reached its target endpoint and should be stopped.

### Multi-Tank Monitoring

For farms with multiple fermentation tanks processing different lots simultaneously (e.g., different varieties, different Brix tiers, or different processing methods), each tank requires its own sensor node. The [[Visualization-Dashboard]] supports multi-tank views with color-coded tank indicators, allowing the farmer to monitor all active fermentations simultaneously from a single screen.

| Tank Configuration | Number of Sensor Nodes | Total Kit Cost (THB) | Dashboard View |
|-------------------|----------------------|---------------------|---------------|
| **Single tank** | 1 | 1,900-4,450 | Single fermentation curve |
| **2-3 tanks** | 2-3 | 3,800-13,350 | Multi-tank comparison |
| **4-6 tanks** | 4-6 | 7,600-26,700 | Tank grid + alerts summary |
| **Professional station** | 8-12 | 15,200-53,400 | Full monitoring dashboard with history |

---

## Fermentation Endpoint Detection

The most impactful application of IoT in coffee fermentation is automated endpoint detection — using pH and temperature data to determine the exact moment when fermentation should be stopped. This eliminates the traditional reliance on subjective assessments ("feel the beans — if the mucilage is gritty, it's done") that are inconsistent, error-prone, and particularly difficult for inexperienced processors.

### How Automated Endpoint Detection Works

The system tracks the pH decline curve and triggers a "Fermentation Complete" alert when all of the following conditions are met:

1. **pH has dropped below 4.5** (the upper boundary of the target endpoint range)
2. **pH has been declining consistently** over the previous 6 hours (confirming active fermentation)
3. **pH decline rate has slowed** to less than 0.1 pH units per hour (indicating that the easily degraded pectin has been consumed and further fermentation will produce diminishing quality returns)
4. **Temperature has remained within safe range** (15-30°C) throughout the fermentation

### Endpoint Alert via LINE Bot

```
🟢 หมักเสร็จแล้ว — ถังหมายเลข 3
⏱ เวลาที่ใช้: 22 ชั่วโมง
🌡️ อุณหภูมิเฉลี่ย: 23.4°C
⚗️ pH ปัจจุบัน: 4.3 (ตกอยู่ในช่วงที่เหมาะสม)
📊 อัตราการลดลงของ pH: 0.05/ชม. (ช้าลง = หมักเสร็จ)

✅ แนะนำ: ล้างเมล็ดกาแฟทันทีเพื่อหยุดการหมัก
⏰ หากไม่ล้างภายใน 2 ชม. คุณภาพจะลดลง

[บันทึกว่าล้างแล้ว] [ดูกราฟ pH] [ขยายเวลาหมัก]
```

### What Happens if Fermentation Continues Past Endpoint

| Extra Time (at 22°C) | pH | Quality Impact | SCA Score Impact | Economic Impact |
|----------------------|-----|---------------|-----------------|----------------|
| **0-2 hours** | 4.0-4.3 | Minimal; slight increase in complexity | -0 to -1 point | Negligible |
| **2-6 hours** | 3.8-4.0 | Increasing sourness; reduced sweetness | -1 to -3 points | -20 to -60 THB/kg green |
| **6-12 hours** | 3.5-3.8 | Sour, astringent; fermented off-flavors | -3 to -7 points | -60 to -200 THB/kg green |
| **12-24 hours** | Below 3.5 | Vinegar notes; acetic; defective | -7 to -15 points | Quality loss: commodity grade only |
| **24+ hours** | Below 3.0 | Severely defective; compost | Below 70 | Total loss; unsaleable as coffee |

For a 500 kg cherry lot producing approximately 83 kg of green bean, the difference between stopping at pH 4.3 (specialty grade at 200 THB/kg) and over-fermenting to pH 3.5 (commodity grade at 80 THB/kg) is a revenue difference of **9,960 THB** — more than the cost of the entire sensor kit.

---

## Drying Phase Monitoring

After fermentation is complete and the coffee has been washed, the drying phase begins — a critical 7-28 day period during which the moisture content of the parchment coffee or cherry must be reduced from approximately 55-60% to the target of 11-12%. Drying is where many Northern Thai farmers lose the quality gains they achieved through careful fermentation, because drying defects (mold, uneven drying, case hardening, ochratoxin contamination) can erase the complex flavor development that controlled fermentation created.

### Moisture Content Targets During Drying

| Drying Phase | Moisture Range | Duration | Key Risk | Sensor Alert |
|-------------|---------------|----------|----------|-------------|
| **Initial (fresh washed parchment)** | 55-60% | Day 0 | — | — |
| **Rapid drying phase** | 40-55% | Days 1-4 | Case hardening if too fast | Surface temp > 40°C alert |
| **Mid-drying phase** | 20-40% | Days 5-10 | Uneven drying; mold if too slow | Humidity > 75% sustained alert |
| **Slow drying phase** | 12-20% | Days 10-18 | Stalled drying; OTA risk if humidity high | Moisture > 16% after day 10 alert |
| **Conditioning phase** | 11-12% | Days 18-25 | Over-drying (<10%) causes brittle beans | Moisture < 10% alert |

### IoT Humidity Monitoring for Drying

Ambient humidity is the most important environmental factor affecting drying speed and quality. The relationship is inverse: low humidity (40-55%) promotes fast, even drying; high humidity (>70%) slows drying dramatically and creates conditions for mold and OTA development. The [[Humidity-Sensors]] deployed in the drying facility provide continuous monitoring that enables the farmer to take protective action before quality is lost.

| Humidity Range | Drying Speed | Quality Risk | Recommended Action |
|---------------|-------------|-------------|-------------------|
| **40-55%** | Fast; ideal | Low; excellent conditions | Normal sun-drying on raised beds |
| **55-65%** | Moderate; good | Low to moderate | Turn cherries every 1-2 hours; monitor progress |
| **65-75%** | Slow | Moderate; mold risk rising | Increase turning frequency; consider mechanical fan |
| **75-85%** | Very slow | High; OTA risk; mold likely | Cover cherries; use mechanical drying; urgent |
| **Above 85%** | Stalled | Critical; OTA contamination risk | Immediate covered mechanical drying required |

### OTA (Ochratoxin) Prevention

Ochratoxin A (OTA) is a mycotoxin produced by *Aspergillus* and *Penicillium* fungi that can contaminate coffee during slow drying in humid conditions. OTA is a serious food safety concern — the European Union has set maximum limits of 5 µg/kg for roasted coffee and 10 µg/kg for green coffee. Coffee lots that exceed these limits are rejected by international buyers, resulting in total financial loss. OTA risk is highest when coffee spends extended periods at moisture contents between 18-30% in humid conditions (>70% RH), because this is the window where fungal growth is most rapid.

| OTA Risk Factor | Condition | Sensor Detection | Alert Level |
|----------------|-----------|-----------------|-------------|
| **Extended high humidity** | RH > 75% for > 12 consecutive hours | Humidity sensor | WARNING |
| **Slow drying** | Moisture still > 20% after 10 days of drying | Moisture meter readings | WARNING |
| **Wet cherry surface** | Rainfall on drying cherries | Rain gauge | CRITICAL |
| **Nighttime humidity spike** | RH > 85% between 10 PM and 6 AM | Humidity sensor (continuous) | INFO (seasonal pattern) |

The IoT system's OTA prevention protocol triggers an escalating series of alerts:

1. **RH > 75% for 6 hours**: INFO — "Humidity rising; check weather forecast; prepare covers"
2. **RH > 75% for 12 hours**: WARNING — "Drying stalled; OTA risk increasing; use mechanical fan or cover cherries"
3. **RH > 80% for 12 hours AND moisture > 18%**: CRITICAL — "Severe OTA risk; move to covered mechanical drying immediately"
4. **Rainfall on uncovered drying cherries**: CRITICAL — "Rain on drying coffee; cover immediately; check for mold after 24 hours"

---

## Equipment Costs for IoT Fermentation Control

The following table provides a complete cost breakdown for IoT fermentation and drying monitoring equipment, from a basic single-tank setup to a professional multi-station installation.

### Single-Tank Fermentation Kit (Entry Level)

| Item | Specification | Cost (THB) |
|------|--------------|------------|
| DS18B20 temperature probe (×1) | Waterproof, stainless steel | 200-400 |
| pH electrode + signal board (×1) | Analog, with BNC connector | 800-1,500 |
| ESP32-S3 development board | WiFi + BLE | 150-300 |
| IP67 waterproof enclosure | 120×80×55mm | 200-350 |
| 18650 battery holder + cell | 3,200 mAh Li-ion | 150-250 |
| Wiring, connectors, cable glands | — | 100-200 |
| pH calibration solutions (4.0 + 7.0) | 100 mL each | 150-250 |
| **Total** | — | **1,750-3,250** |

### Complete Fermentation + Drying Kit (Small Farm)

| Item | Specification | Cost (THB) |
|------|--------------|------------|
| Single-tank fermentation kit (above) | — | 1,750-3,250 |
| SHT31 humidity/temperature sensor (×2) | One in drying area, one ambient | 200-500 |
| Tipping bucket rain gauge | For drying area | 500-1,800 |
| Pin-type moisture meter (handheld) | For cherry/parchment moisture | 2,000-5,000 |
| Solar panel (5W) + charge controller | For continuous operation | 300-600 |
| **Total** | — | **4,750-11,150** |

### Professional Multi-Tank Setup (Cooperative/Station)

| Item | Specification | Cost (THB) |
|------|--------------|------------|
| Fermentation kits (×4 tanks) | Temperature + pH per tank | 7,000-13,000 |
| Pressure sensor (×2, for SCM/anaerobic) | 0-2 atm, I2C interface | 600-1,600 |
| Drying area monitoring (humidity ×4, temp ×4) | SHT31 sensors | 800-2,000 |
| Rain gauge (×1) | Tipping bucket | 500-1,800 |
| Moisture meter (×2) | Pin-type, data logging | 4,000-12,000 |
| LoRaWAN gateway | For farm-wide sensor network | 8,800 |
| Solar power system (20W) | Panels + controller + battery | 800-1,500 |
| Server/software (1-year cloud hosting) | Data storage + dashboard | 2,000-5,000 |
| **Total** | — | **24,500-39,700** |

---

## Integration with Visualization Dashboard

The [[Visualization-Dashboard]] provides the primary interface for monitoring fermentation and drying in real-time. The following specialized views are designed for the processing workflow:

### Fermentation Monitoring View

The fermentation monitoring view is the processor's command center during active fermentation. It displays:

1. **Multi-tank status grid**: A grid of colored cards, one per active fermentation tank, showing current pH, temperature, and fermentation progress (%). Card color indicates status: green (fermenting normally), yellow (approaching endpoint), orange (at endpoint — wash now), red (over-fermented — quality loss).

2. **pH decline curve**: The primary chart shows pH over time for the selected tank, with a horizontal green band marking the target endpoint (pH 4.2-4.5) and a red band marking the over-fermentation danger zone (pH < 3.8). The curve's slope indicates fermentation speed — a steepening curve means fermentation is accelerating (possibly due to rising temperature), while a flattening curve means it is naturally approaching completion.

3. **Temperature overlay**: A secondary y-axis shows the fermentation tank temperature overlaid on the pH chart, allowing the processor to correlate temperature fluctuations with changes in fermentation rate.

4. **Predicted completion time**: Based on the current pH decline rate, the system estimates when the fermentation will reach the target endpoint and displays a countdown timer: "Estimated completion: 4 hours 20 minutes." This allows the processor to plan their workflow — scheduling the washing step, preparing drying beds, and arranging labor.

### Drying Monitoring View

The drying monitoring view tracks the moisture reduction process from washing to stable storage:

1. **Ambient conditions panel**: Current temperature, humidity, wind speed, and rainfall status in the drying area, color-coded against drying condition thresholds.

2. **Moisture trend chart**: A declining curve showing measured moisture content over the drying period, with horizontal bands marking the target range (11-12%) and danger zones (>16% = mold risk, <10% = over-dry).

3. **OTA risk indicator**: A composite risk score (0-100) based on the duration of high-humidity exposure during drying, the current moisture content, and the temperature. A score above 50 triggers a WARNING alert; above 75 triggers a CRITICAL alert with specific recommended actions.

4. **Drying completion prediction**: Based on the current drying rate (calculated from moisture measurements over the past 3 days) and the weather forecast, the system estimates the date when the coffee will reach 11-12% moisture.

---

## Quality Impact: Controlled Fermentation vs Traditional Methods

The quality improvement from controlled fermentation is the most dramatic and well-documented benefit of IoT sensor integration in coffee processing. The following data summarizes cupping results from multiple Northern Thailand farms that adopted sensor-controlled fermentation between 2020 and 2025.

### SCA Cupping Score Comparison

| Processing Method | Traditional (No Sensors) | Sensor-Controlled | Improvement | Sample Size |
|-------------------|-------------------------|-------------------|-------------|-------------|
| **Washed (Chiang Mai 80)** | 78-81 | 83-86 | +3-7 | 45 lots |
| **Washed (Typica)** | 80-83 | 84-88 | +3-6 | 20 lots |
| **Natural (Chiang Mai 80)** | 76-82 | 82-87 | +4-8 | 30 lots |
| **Honey Red/Black (CM 80)** | 79-83 | 84-88 | +3-7 | 25 lots |
| **SCM (Chiang Mai 80)** | 80-84 | 85-89 | +3-6 | 15 lots |
| **Anaerobic (Chiang Mai 80)** | 80-85 | 85-89 | +3-5 | 12 lots |
| **Geisha (any method)** | 85-89 | 88-92+ | +2-4 | 8 lots |

### Specific Quality Attributes Improved by Controlled Fermentation

| Attribute | Traditional | Controlled | Mechanism |
|-----------|------------|-----------|-----------|
| **Acidity** | Muted, flat, or sour | Bright, clean, well-defined | Proper pH endpoint preserves desirable acids |
| **Sweetness** | Low to moderate | High; caramel, honey, fruit | Controlled temperature preserves sugar metabolism |
| **Body** | Thin or muddy | Full, creamy, well-structured | Proper fermentation develops glycolipids and melanoidins |
| **Flavor complexity** | 1-2 dominant notes | 4-8 distinct flavor notes | Controlled microbial succession produces diverse metabolites |
| **Aftertaste** | Short, astringent | Long, sweet, clean | Over-fermentation avoidance eliminates acetic off-notes |
| **Uniformity** | Variable between lots | Consistent across lots | Sensor data ensures repeatable processing |
| **Overall score** | 76-82 | 83-89 | +5-10 points across all attributes |

---

## Economic Analysis: Specialty Premium vs Sensor Cost

The economic case for IoT-controlled fermentation is among the strongest in the entire coffee IoT value chain. The sensor investment is modest (2,000-12,000 THB for a basic to mid-range setup) while the quality improvement translates directly into price premiums that can transform farm economics.

### Per-Kilogram Economics: Commodity vs Specialty Processing

| Cost / Revenue Item | Commodity (Traditional) | Specialty (Sensor-Controlled) | Difference |
|--------------------|-----------------------|------------------------------|-----------|
| **Green bean price (THB/kg)** | 80-100 | 200-500 | +120-400 |
| **Processing cost (THB/kg cherry)** | 5-8 | 15-30 | +7-22 |
| **IoT sensor cost (amortized, THB/kg)** | 0 | 0.5-2.0 | +0.5-2.0 |
| **Net premium (THB/kg green bean)** | — | — | **+112-378** |

### Farm-Level Economics: 10-Rai Arabica Farm (1,500 kg Cherry/Season)

| Metric | Commodity Processing | Specialty Processing | Difference |
|--------|--------------------|--------------------|-----------|
| **Cherry produced** | 1,500 kg | 1,500 kg | Same |
| **Green bean output** | 250 kg (6:1 ratio) | 240 kg (6.25:1; slightly more loss in careful processing) | -10 kg |
| **Green bean price** | 90 THB/kg | 300 THB/kg (SCA 84+) | +210 THB/kg |
| **Gross revenue** | 22,500 THB | 72,000 THB | +49,500 THB |
| **Processing cost** | 7,500 THB (5 THB/kg cherry) | 37,500 THB (25 THB/kg cherry) | +30,000 THB |
| **IoT sensor cost (Year 1)** | 0 | 8,000 THB | +8,000 THB |
| **IoT sensor cost (Year 2+, amortized)** | 0 | 1,500 THB/year | +1,500 THB/year |
| **Net revenue (Year 1)** | 15,000 THB | 26,500 THB | **+11,500 THB** |
| **Net revenue (Year 2+)** | 15,000 THB | 33,000 THB | **+18,000 THB** |

### Premium Processing Methods: Higher Investment, Higher Return

| Processing Method | Equipment Investment (THB) | SCA Score Range | Green Bean Price (THB/kg) | Revenue/Season (10 rai) | Net Benefit vs Commodity |
|-------------------|--------------------------|----------------|--------------------------|------------------------|------------------------|
| **Traditional washed** | 5,000-15,000 | 78-82 | 80-120 | 22,500-30,000 | Baseline |
| **Sensor-controlled washed** | 15,000-30,000 | 83-86 | 200-350 | 48,000-84,000 | +25,500-54,000 |
| **Honey process (sensor)** | 20,000-40,000 | 84-87 | 250-450 | 60,000-108,000 | +37,500-78,000 |
| **SCM (sensor + CO2)** | 50,000-100,000 | 85-89 | 300-700 | 72,000-168,000 | +49,500-138,000 |
| **Anaerobic (sensor + sealed tank)** | 40,000-80,000 | 84-89 | 250-650 | 60,000-156,000 | +37,500-126,000 |

---

## Thailand-Specific: Best Fermentation Conditions by Season

Northern Thailand's distinct seasons create different processing opportunities and constraints. The optimal fermentation and processing strategy varies by season, and IoT sensor data helps farmers adapt their methods to current conditions.

### Dry Season (November-February) — Main Arabica Harvest

The dry season is the ideal processing window for Northern Thailand Arabica. Cool temperatures (15-25°C), low humidity (40-60%), and consistent sunshine create perfect conditions for all processing methods.

| Parameter | Value | Processing Implication |
|-----------|-------|----------------------|
| **Ambient temperature** | 15-25°C | Slow, clean fermentation; 18-36 hours typical |
| **Humidity** | 40-60% | Excellent drying conditions; 7-14 days for washed |
| **Rainfall** | Minimal | Natural and honey process viable; low rain risk |
| **Day length** | 11 hours | Good sun-drying window (7:30 AM - 5:30 PM) |
| **Recommended methods** | — | All methods; natural process especially suited |
| **Key risk** | Cold nights <10°C | Fermentation may slow; monitor pH carefully |

**Best for**: Natural process, honey process (all colors), SCM, anaerobic — all methods benefit from reliable drying conditions. This is the prime season for experimental and premium processing.

### Hot-Dry Season (March-May) — Pre-Monsoon

The hot-dry transition is a challenging period. Temperatures rise to 30-38°C, which accelerates fermentation dangerously, while low humidity and strong sun can cause case hardening during drying.

| Parameter | Value | Processing Implication |
|-----------|-------|----------------------|
| **Ambient temperature** | 25-38°C | Fast fermentation; risk of over-fermentation; 8-18 hours typical |
| **Humidity** | 30-55% | Fast drying; case hardening risk on natural/honey |
| **Rainfall** | Increasing (April-May) | Intermittent rain; not reliable for natural process |
| **Key risk** | Heat stress on fermentation | Temperature control essential; use shade and cooling |
| **Recommended methods** | — | Washed only; short fermentation; avoid natural/honey |

**Sensor focus**: Temperature monitoring is critical. Fermentation tanks should be placed in the coolest available location (shade, north-facing, near water). The IoT temperature alert should be set to trigger at 28°C to warn of dangerous acceleration.

### Rainy Season (June-October) — Monsoon

The monsoon is the most challenging season for coffee processing. High humidity, frequent rainfall, and warm temperatures create the worst possible drying conditions. Processing during this period requires covered drying infrastructure and — ideally — mechanical drying backup.

| Parameter | Value | Processing Implication |
|-----------|-------|----------------------|
| **Ambient temperature** | 22-30°C | Fast fermentation; manageable with monitoring |
| **Humidity** | 75-95% | Very poor drying; mold and OTA risk high |
| **Rainfall** | 200-400 mm/month | Cannot sun-dry without covered structures |
| **Key risk** | OTA contamination | Critical; humidity alerts essential |
| **Recommended methods** | — | Washed only; covered drying or mechanical; avoid natural/honey |

**Sensor focus**: Humidity monitoring is paramount. The OTA risk indicator on the [[Visualization-Dashboard]] should be checked multiple times daily. If humidity exceeds 80% for more than 12 consecutive hours, all drying coffee should be moved to covered or mechanical drying immediately.

### Seasonal Processing Decision Matrix

| Season | Washed | Natural | Honey | SCM/Anaerobic | Drying Method |
|--------|--------|---------|-------|---------------|---------------|
| **Cool-Dry (Nov-Feb)** | ✅ Excellent | ✅ Excellent | ✅ Excellent | ✅ Excellent | Sun-drying ideal |
| **Hot-Dry (Mar-May)** | ✅ Good (temp control) | ⚠️ Risky (case hardening) | ⚠️ Risky | ✅ Good (temp control) | Sun + shade cloth |
| **Early Monsoon (Jun-Jul)** | ✅ Acceptable (covered) | ❌ Not recommended | ❌ Not recommended | ⚠️ Possible (covered drying) | Covered or mechanical |
| **Peak Monsoon (Aug-Sep)** | ⚠️ Challenging (mechanical drying needed) | ❌ Do not attempt | ❌ Do not attempt | ❌ Do not attempt | Mechanical only |
| **Transition (Oct-Nov)** | ✅ Good | ⚠️ Possible | ⚠️ Possible | ✅ Good | Sun + covered backup |

---

## Practical Step-by-Step: Sensor-Assisted Washed Process

The following step-by-step guide describes a complete sensor-assisted washed process from cherry to green bean, incorporating IoT monitoring at every critical decision point. This workflow is designed for a smallholder farmer in Northern Thailand processing 200-500 kg of cherry per batch.

### Step 1: Cherry Reception and Float Tank (30 minutes)

1. **Harvest** selectively ripe cherries (red to deep purple). Record harvest date, time, and estimated Brix range.
2. **Pour cherries** into float tank filled with clean water. Skim floaters (5-15% of volume) and process separately or discard.
3. **Record** cherry weight after float separation. This determines tank capacity needed and expected green bean yield.
4. **Sensor check**: Verify that the fermentation tank temperature probe is submerged and reading ambient water temperature (expected 15-25°C in dry season).

### Step 2: Depulping (1-2 hours)

1. **Pass sinking cherries** through a calibrated depulper. Target: 90% mucilage removal with minimal bean damage.
2. **Inspect** a sample of depulped beans for correct mucilage removal. If too much mucilage remains, tighten the depulper. If beans are being cut, loosen it.
3. **Transfer** depulped beans to the fermentation tank. Add clean water to cover the beans by 5-10 cm.
4. **Sensor activation**: Start the IoT fermentation monitoring system. Confirm pH reading is in the 5.5-6.5 range (fresh cherries). Confirm temperature probe is reading tank water temperature. Set the LINE bot alert for pH endpoint (4.2-4.5).

### Step 3: Fermentation Monitoring (12-36 hours)

1. **Hour 0-6**: Monitor pH and temperature every 2 hours via the dashboard. Expect pH to remain relatively stable (lag phase). Temperature should be 15-25°C.
2. **Hour 6-12**: pH should begin declining (active fermentation phase). CO2 bubbles visible on the surface. Temperature may rise 1-2°C from microbial metabolic heat.
3. **Hour 12-24**: pH decline accelerates. Monitor every hour. When pH reaches 4.8, prepare washing equipment and drying beds.
4. **Hour 18-36 (endpoint)**: pH reaches 4.2-4.5. The LINE bot sends a "Fermentation Complete" alert. **Wash immediately** — every hour of delay risks over-fermentation.

### Step 4: Washing (1-2 hours)

1. **Drain** the fermentation tank and agitate beans in clean water to remove loosened mucilage. Repeat until water runs clear (typically 2-3 wash cycles).
2. **Optional soak**: Submerge washed beans in clean water for 12-24 hours. This Kenyan-style step is gaining popularity among Northern Thai specialty producers for improved cup cleanliness and brightness.
3. **Record** the end-of-fermentation pH and total fermentation duration in the processing log.

### Step 5: Drying with IoT Monitoring (7-14 days)

1. **Spread** washed parchment on raised beds at 10-15 kg per square meter.
2. **Day 1-3 (rapid drying)**: Turn every 30-60 minutes during daylight hours. Monitor ambient humidity; target <65%. If humidity >70%, increase turning frequency and consider shade cloth to slow drying.
3. **Day 4-10 (mid-drying)**: Measure parchment moisture with pin-type moisture meter daily. Record on the [[Visualization-Dashboard]]. Target: moisture declining by 3-5% per day.
4. **Day 10-14 (conditioning)**: Reduce turning frequency to every 2-3 hours. Target moisture: 11-12%. When moisture reaches 12%, cover parchment during the hottest part of the day (11 AM - 2 PM) to slow drying and allow even moisture distribution.
5. **Rain protection**: If the rain gauge detects rainfall, or the humidity sensor reads >75%, cover drying beds immediately with plastic sheets. Uncover as soon as conditions improve.

### Step 6: Storage and Quality Verification

1. **Bag** dried parchment in clean, breathable jute bags. Store in a cool, dry warehouse (temperature <25°C, humidity <60%).
2. **Monitor** warehouse conditions with IoT temperature and humidity sensors. Alert if humidity exceeds 65% for more than 48 hours.
3. **Hull** when ready for sale (target parchment moisture 10.5-11.5%).
4. **Cup** a sample from each lot to verify quality before sale. Compare SCA score with the sensor-monitored fermentation data to build a quality correlation database.

---

## Thai Specialty Coffee Processors: Case Studies

### Akha Ama Coffee (Chiang Mai)

Akha Ama (อาข่าอาม่า), founded by Lee Ayu Chue, is a pioneering Akha community-based specialty coffee brand based in Chiang Mai. The operation sources cherry from Akha farming communities across Chiang Mai province and processes using controlled fermentation methods, including washed and natural processes with temperature monitoring. Akha Ama was among the first Northern Thai brands to achieve international recognition, with lots scoring 84+ SCA and selling at 300-500 THB/kg green bean. Their processing station in Mae Taeng district uses temperature-controlled fermentation tanks and covered drying facilities — a model for the sensor-controlled approach described in this document.

### Doi Chang Coffee (Chiang Rai)

The Doi Chang Coffee Cooperative, operated by the Akha community on Doi Chang mountain in Chiang Rai, is one of Northern Thailand's most recognized coffee brands. Benefiting from the exceptional black volcanic soil that earned EU Geographical Indication status in 2015, Doi Chang processes approximately 200-300 tonnes of cherry annually using both washed and natural methods. The cooperative has invested in temperature-controlled fermentation infrastructure and covered drying facilities, and its premium lots regularly score 85-88 SCA. Doi Chang's experience demonstrates that controlled processing can scale from small experimental batches to commercial volumes while maintaining quality consistency.

### Baan Maneepruek (Chiang Mai)

Baan Maneepruek (บ้านมณีปรัก) is a Karen community in Chom Thong district, Chiang Mai, that has achieved remarkable specialty coffee success. Their Geisha lot scored 86.73 points at the Thailand Cup of Excellence 2025 — the highest-scoring Thai coffee in the competition's history. The community uses controlled fermentation with pH and temperature monitoring, and their processing protocol includes a 24-hour pre-fermentation soak and extended drying on raised beds under shade cloth. Baan Maneepruek exemplifies how IoT sensor technology can support the most ambitious quality goals in Northern Thailand.

### Ristr8to Coffee (Chiang Mai)

While primarily known as a specialty coffee roaster and café (World Latte Art Champion 2017), Ristr8to also works directly with Northern Thai farming communities to develop processing protocols. Their collaboration with hill tribe farmers in Doi Inthanon has produced innovative fermentation lots using yeast inoculation and semi-carbonic maceration, with green bean prices reaching 500-1,000 THB/kg for competition-grade lots.

---

## Practical Recommendations

1. **Invest in a pH probe before anything else.** If you can only afford one sensor for fermentation, make it a pH probe with an ESP32 readout. Temperature monitoring is valuable, but pH is the definitive indicator of fermentation progress and endpoint. A pH probe kit costs 1,000-2,000 THB and can prevent over-fermentation losses worth 10,000-50,000 THB per season on a typical 10-rai farm. Calibrate the probe weekly using pH 4.0 and 7.0 buffer solutions (150-250 THB for both, lasting 6-12 months).

2. **Start with sensor-assisted washed process before attempting innovative methods.** The washed process is the most forgiving and well-understood fermentation method. Master it with IoT monitoring before branching into SCM, anaerobic, or yeast inoculation. Each innovative method adds complexity and risk; sensor data helps manage that risk, but the fundamental skill of reading pH and temperature trends is learned through the washed process first.

3. **Place fermentation tanks in the coolest available location.** During the hot dry season (March-May), ambient temperatures in Northern Thailand can exceed 35°C, making controlled fermentation nearly impossible without cooling. Position tanks in shade, on the north side of buildings, and consider using a simple water jacket (circulating cool water around the fermentation tank) to maintain temperatures below 28°C. The IoT temperature alert should be your safety net, but tank placement is your first line of defense.

4. **Monitor drying humidity obsessively during the monsoon season.** OTA contamination is an irreversible, invisible defect that can destroy an entire lot without any visible sign. During the June-October monsoon, check the [[Visualization-Dashboard]] humidity reading at least 3 times daily. If humidity exceeds 75% for more than 12 consecutive hours while coffee is drying, move to mechanical drying or accept the quality loss — there is no middle ground.

5. **Build a processing log that correlates sensor data with cupping scores.** Every lot you process should be recorded with: fermentation start/end pH, average temperature, duration, drying time, final moisture, ambient humidity during drying, and the resulting SCA cupping score. After 20-30 lots, you will have enough data to identify the fermentation parameters that consistently produce the highest scores on your farm with your variety and terroir. This is the most valuable knowledge base you can build — it cannot be bought or copied from another farm.

6. **Budget for pH probe replacement every 12-18 months.** pH electrodes degrade over time, particularly in the acidic environment of coffee fermentation. A probe that was accurate to ±0.1 pH when new may drift to ±0.3-0.5 pH after a year of regular use, making endpoint detection unreliable. Replace the probe annually and calibrate weekly. The 800-1,500 THB annual replacement cost is negligible compared to the quality risk of inaccurate pH readings.

7. **Use the LINE bot fermentation alerts even if you don't have automated valves.** The most common objection to IoT fermentation monitoring is "I can check the pH manually with a handheld meter." This is true — but it requires the farmer to be physically present at the tank every 2-4 hours, including at night. A sensor system with LINE bot alerts means the farmer sleeps through the night unless the pH approaches the endpoint, at which point the alert wakes them. This alone is worth the sensor investment for most smallholders.

8. **Invest in covered drying infrastructure before investing in innovative fermentation.** Perfect fermentation is worthless if the drying phase is compromised by rain or high humidity. A covered drying structure (transparent roof with open sides for airflow) costs 15,000-40,000 THB and protects drying coffee from rain and excessive humidity. Build this before investing in SCM tanks or anaerobic equipment.

9. **Process small experimental lots separately with sensor data.** Before committing your entire harvest to a new processing method, process 20-50 kg of cherry as an experimental lot with full sensor monitoring. Compare the cupping score with your standard method. If the experimental lot scores higher, scale up gradually — 100 kg, then 200 kg, then full production. If it scores lower, you have lost only a small quantity and gained valuable sensor data about what went wrong.

10. **Share processing data with your cooperative or buyer.** The sensor data from your fermentation and drying process is a valuable quality assurance document. Share it with your cooperative, your specialty buyer, or the Royal Project quality control team. Buyers who can see documented pH curves, temperature logs, and drying humidity records have greater confidence in the quality of the coffee and are willing to pay premium prices — because the data proves the quality, rather than relying on the farmer's verbal assurance.

---

## Data and Specifications Table

| Parameter | Value | Unit | Source/Notes |
|-----------|-------|------|-------------|
| Fermentation temperature optimal | 20-28 | °C | RMUTL research; FAO coffee processing guidelines |
| Fermentation temperature danger | >30 | °C | Over-fermentation risk; acetic acid production |
| Fermentation pH start | 5.5-6.5 | pH | Fresh cherry; minimal acid |
| Fermentation pH target endpoint | 4.2-4.5 | pH | Mucilage loosened; optimal flavor |
| Fermentation pH over-fermented | <3.8 | pH | Sour, astringent, defective |
| Washed fermentation duration (20°C) | 24-36 | hours | Northern Thailand cool highland |
| Washed fermentation duration (25°C) | 12-24 | hours | Standard conditions |
| Washed fermentation duration (30°C) | 8-12 | hours | Hot conditions; risky |
| SCM duration | 48-96 | hours | Under CO2 atmosphere |
| Anaerobic duration | 48-120 | hours | Sealed container; self-generated CO2 |
| Cherry moisture (fresh) | 55-65 | % | After depulping |
| Parchment target moisture | 10.5-12 | % | Stable for storage |
| Green bean target moisture | 11-12 | % | Ready for sale |
| OTA risk humidity threshold | >75 | % RH | Sustained >12 hours |
| OTA EU maximum (green coffee) | 10 | µg/kg | EU regulation |
| SCA score improvement (sensors) | +5-10 | points | vs. traditional unmonitored fermentation |
| pH probe kit cost | 1,000-2,000 | THB | Probe + signal board + ESP32 |
| Temperature probe cost | 200-500 | THB | DS18B20 waterproof |
| Complete fermentation kit | 1,750-4,450 | THB | Single tank; temp + pH + controller |
| Complete fermentation + drying kit | 4,750-11,150 | THB | Small farm setup |
| Professional multi-tank setup | 24,500-39,700 | THB | Cooperative/station level |
| Specialty premium (vs commodity) | +120-400 | THB/kg green | SCA 84+ vs SCA <80 |
| Payback period (sensor investment) | 1-3 | batches | One over-fermentation prevented pays for kit |

---

## Northern Thailand Context

Fermentation and processing in Northern Thailand are shaped by three contextual factors that distinguish the region from other coffee origins: the dominance of the Catimor variety, the cool highland harvest climate, and the social structure of smallholder hill tribe farming communities.

### The Catimor Challenge

Northern Thailand's Arabica production is overwhelmingly based on Chiang Mai 80, a Catimor hybrid (Caturra × Timor) selected for Coffee Leaf Rust resistance and high yield. While Catimor's disease resistance and productivity are valuable, its cup quality under traditional processing is limited — the variety tends toward woody, astringent, and flat flavors that cap SCA scores around 78-81. The 2016 processing revolution proved that these limitations are processing-dependent, not genetic: controlled fermentation unlocks flavor potential that traditional methods leave dormant. For Northern Thai farmers, this means that investing in fermentation control is not an incremental quality improvement — it is the key that transforms their dominant variety from a commodity liability into a specialty asset.

### Highland Climate Advantage

Northern Thailand's cool highland harvest season (November-February, 15-25°C) is a significant advantage for controlled fermentation. In lowland tropical origins (Vietnam, Indonesia, lowland Brazil), ambient temperatures of 28-35°C make slow, clean fermentation difficult without active cooling equipment. In the Chiang Mai and Chiang Rai highlands, the natural climate favors the 18-36 hour fermentation that produces the best washed coffee. The IoT temperature sensor's role is primarily to detect the occasional hot day or warm night that could accelerate fermentation unexpectedly, and to document temperature data for quality assurance — not to trigger emergency cooling as it would in tropical lowlands.

### Smallholder Processing Constraints

Most Northern Thai coffee farms are 3-10 rai (0.5-1.6 hectares) operated by hill tribe families with limited capital, labor, and processing infrastructure. This scale constraint means that: (1) farmers cannot afford professional-grade fermentation and drying equipment, making low-cost IoT solutions essential; (2) labor availability during the harvest season is the binding constraint, and any technology that reduces processing labor (automated endpoint detection, LINE bot alerts) has high adoption potential; and (3) farmers need processing methods that are forgiving of occasional inattention — a farmer who is busy harvesting cannot check pH every 2 hours, making sensor-based endpoint detection particularly valuable.

The Royal Project Foundation and the Department of Agricultural Extension (DOAE) have recognized the importance of post-harvest processing improvement and offer training programs, subsidized processing equipment, and community processing stations where farmers can access fermentation tanks, depulpers, and drying facilities without individual capital investment. IoT sensor kits can be deployed at these community stations to serve multiple farmers simultaneously, reducing the per-farmer cost to 200-500 THB per season.

---

## Related Topics

- [[Post-Harvest-Processing]] — Comprehensive guide to all coffee processing methods in Northern Thailand
- [[Harvesting-Techniques]] — Selective harvesting practices that determine cherry quality before fermentation begins
- [[Decision-Logic]] — Harvest and post-harvest decision rules (HP-01 through HP-06) driven by sensor data
- [[Alerts-Remediation]] — Alert framework for fermentation and drying quality events
- [[Visualization-Dashboard]] — Real-time fermentation and drying monitoring interface design
- [[Coffee-Economics]] — Full economic analysis including processing investment ROI
- [[Temperature-Sensors]] — Temperature measurement hardware for fermentation monitoring
- [[Humidity-Sensors]] — Humidity measurement for drying condition assessment
- [[Soil-Moisture-Sensors]] — Soil VWC sensors also relevant for processing water quality
- [[Arabica-for-North-Thailand]] — Chiang Mai 80 and other variety characteristics affecting fermentation

---

## References

1. RMUTL (Rajamangala University of Technology Lanna) — "Controlled Fermentation Techniques for Catimor Coffee in Northern Thailand" (2017-2023 research publications, Thai and English)
2. Thailand Cup of Excellence — Competition results and processing method documentation (2023-2025)
3. Akha Ama Coffee — Processing protocols and quality data for Akha community-produced specialty coffee
4. Doi Chang Coffee Cooperative — Processing infrastructure and quality control documentation
5. FAO — "Coffee Processing: Quality Control and Fermentation Management" (Technical Bulletin)
6. SCA (Specialty Coffee Association) — Cupping protocols and score interpretation guidelines
7. CIRAD (French Agricultural Research Centre for International Development) — "Fermentation Microbiology in Coffee Processing" (2019)
8. European Union Regulation (EC) No 1881/2006 — OTA maximum limits in coffee products
9. Thai Department of Agriculture — "Quality Standards for Thai Arabica Coffee" (2022, Thai language)
10. Khun Mae Kuang Watershed Research — Climate data for Northern Thailand highland coffee zones
11. De Bruyn, F. et al. (2017) — "Microbial Diversity and Fermentation Dynamics in Coffee Processing" — *Applied and Environmental Microbiology*
12. Zhang, L. et al. (2019) — "Impact of Fermentation Temperature on Coffee Quality" — *Journal of Agricultural and Food Chemistry*
13. Lee, A.C. (2020) — "The Thai Specialty Coffee Revolution: From Commodity to Cup of Excellence" — *Thai Coffee Journal*

---

*Last updated: 2026-05-13*
