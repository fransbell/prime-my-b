---
topic: Soil Moisture Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, soil-moisture, thailand, hardware]
related: [Temperature-Sensors, NPK-Sensors, Soil-pH-Sensors, Installation-Guide]
---

# Soil Moisture Sensors

> **Summary**: Soil moisture is the single most critical parameter for coffee farm IoT monitoring. The Capacitive V1.2 at ~35 THB is the best value sensor available in Thailand — avoid resistive sensors entirely.

---

## Overview

Soil moisture directly affects coffee plant health, cherry development, and irrigation scheduling. For Northern Thailand's distinct wet-dry seasonal pattern, monitoring soil moisture helps farmers optimize irrigation during the dry season and avoid waterlogging during the rainy season. Coffee plants are particularly sensitive to both drought stress (which reduces cherry size and quality) and waterlogging (which promotes root rot diseases like Armillaria and Fusarium).

The coffee feeder root zone is typically in the top 15–30 cm of soil, making this the ideal measurement depth. Soil moisture sensors allow farmers to move from time-based irrigation ("water every 3 days") to demand-based irrigation ("water when VWC drops below 25%"), which can reduce water usage by 30–50% while improving yield consistency.

---

## Sensor Comparison

| Model | Type | Price (THB) | Accuracy | Where to Buy | Rating |
|-------|------|-------------|----------|--------------|--------|
| **Capacitive V1.2** | Capacitive (analog) | 31–45 | ±5–10% VWC (after calibration) | Lazada, Shopee, AgeBkk | ⭐⭐⭐⭐⭐ Best Value |
| Grove Capacitive | Capacitive (Grove) | 240–300 | ±5% VWC | ThaiEasyElec | ⭐⭐⭐⭐ |
| **Dragino LSE01** | Capacitive + LoRaWAN | 4,000–5,000 | ±3% VWC | Dragino Store, AliExpress | ⭐⭐⭐⭐ Pro |
| **SenseCAP S2105** | Capacitive + LoRaWAN | 5,000–6,000 | ±3% VWC | Seeed, AliExpress | ⭐⭐⭐⭐⭐ Pro |
| Decagon 5TM | FDR (research) | 8,500–12,000 | ±1–3% VWC | Import | ⭐⭐⭐⭐⭐ Research |
| FC-28 (resistive) | Resistive | 15–25 | Unreliable | Shopee, Lazada | ❌ AVOID |

---

## Recommended: Capacitive Soil Moisture Sensor V1.2

| Attribute | Detail |
|-----------|--------|
| **Model** | Capacitive Soil Moisture Sensor V1.2 (AB142) |
| **Interface** | Analog (0–3.3V output) |
| **Operating Voltage** | 3.3V–5.5V |
| **Price in THB** | **31–45 THB** |
| **Where to Buy** | Lazada Thailand (~31.70 THB), Shopee Thailand (~35–45 THB), AgeBkk (45 THB), AS99 Shop (45 THB) |
| **Accuracy** | Relative — requires calibration to convert analog value to VWC |

### Why Capacitive > Resistive

The capacitive V1.2 uses a **copper trace embedded inside the PCB** with no exposed metal. It measures the dielectric permittivity of the surrounding soil, which correlates with water content. Because there are no exposed electrodes, there is **no electrolysis or galvanic corrosion**, making it suitable for long-term burial.

The resistive FC-28 sensor has two exposed metal prongs that undergo **electrolysis and galvanic corrosion** when powered continuously. Within days to weeks in moist soil, the probes degrade, giving erratic readings then failing entirely. Even with power-cycling, the lifespan is very short. **Do NOT use resistive sensors for any permanent installation.**

### Calibration Process

The analog output must be calibrated to convert raw ADC values to volumetric water content (VWC):

1. **Dry calibration**: Read ADC value with sensor in dry air → this is "0% moisture"
2. **Saturated calibration**: Read ADC value with sensor in water-saturated soil → this is "100% moisture"
3. **Map readings linearly** between these two points, or use a lookup table for better accuracy
4. **For research-grade accuracy**: Perform gravimetric calibration (oven-dry method) at 3–5 moisture levels

> **Note**: Calibration is soil-type specific. If your farm has different soil types (e.g., clay in low areas, sandy loam on slopes), calibrate each zone separately.

---

## Professional LoRaWAN Options

### Dragino LSE01

| Attribute | Detail |
|-----------|--------|
| **Model** | Dragino LSE01 LoRaWAN Soil Moisture & EC Sensor |
| **Frequency** | AS923 version available (for Thailand) |
| **Measures** | Soil moisture + soil temperature + soil EC |
| **Interface** | LoRaWAN wireless (built-in) |
| **Price** | ~4,000–5,000 THB (import) |
| **Pros** | All-in-one LoRaWAN node; IP68 probe; battery-powered (Li-SOCl2, lasts years) |
| **Cons** | Expensive; requires LoRaWAN gateway infrastructure |
| **Installation** | Bury probe at 15–20 cm depth. Auto-connects to LoRaWAN gateway. |

### SenseCAP S2105

| Attribute | Detail |
|-----------|--------|
| **Model** | SenseCAP S2105 LoRaWAN Soil Moisture, Temperature & EC Sensor |
| **Measures** | Soil moisture (0–100% m³/m³), soil temp (-40–80°C), soil EC (0–23 dS/m) |
| **Price** | ~5,000–6,000 THB (import) |
| **Accuracy** | Soil moisture ±3% VWC; temperature ±0.5°C; EC ±5% |
| **Pros** | IP66 rated; battery-powered; professional-grade; easy deployment |

---

## Installation Guide

| Parameter | Recommendation |
|-----------|---------------|
| **Depth** | 15–20 cm (coffee feeder root zone); add a second probe at 30–40 cm for deep monitoring |
| **Sensors per rai** | Minimum 1 per rai; ideally 2–3 per rai for spatial variation |
| **Sealing** | Seal the top electronics with conformal coating or hot glue to prevent water ingress |
| **Cable routing** | Run cables through PVC conduit if above ground to prevent animal damage |
| **Location** | Place between coffee plants, not directly at the base (to avoid drip irrigation point bias) |

### Coffee-Specific Soil Moisture Targets

| Growth Stage | VWC Target | Notes |
|-------------|-----------|-------|
| Flowering | 25–35% | Stress during flowering reduces fruit set |
| Fruit development | 30–40% | Consistent moisture needed for cherry sizing |
| Ripening | 25–35% | Slight stress can improve sugar content |
| Dry season maintenance | 20–30% | Avoid going below 15% (drought stress) |
| Rainy season | Avoid >50% | Waterlogging promotes root rot |

---

## Practical Recommendations

1. **Budget setup**: Use Capacitive V1.2 sensors (~35 THB each) with ESP32 + WiFi. Add DS18B20 for soil temperature. Total sensor cost per node: ~85 THB.
2. **Mid-range**: Use Capacitive V1.2 + SHT31 + BH1750 per node, with Heltec LoRa V3 for long-range communication. Total sensor cost: ~300 THB per node.
3. **Professional**: Use Dragino LSE01 or SenseCAP S2105 for set-and-forget deployment with LoRaWAN. Cost: 4,000–6,000 THB per node but zero maintenance and years of battery life.
4. **Hybrid approach** (recommended for most farms): Use budget sensors at dense spacing with LoRa communication. Accept periodic recalibration (every 3–6 months) in exchange for 10x cost savings vs. professional sensors.

---

## Related Topics

- [[Temperature-Sensors]] — Soil temperature measurement with DS18B20
- [[NPK-Sensors]] — Soil nutrient monitoring (complement moisture data)
- [[Soil-pH-Sensors]] — Soil acidity measurement for coffee
- [[Installation-Guide]] — Full field deployment instructions
- [[System-Cost-Estimate]] — Total system cost breakdown

---

*Last updated: 2026-05-12*
