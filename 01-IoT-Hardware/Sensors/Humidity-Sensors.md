---
topic: Air Humidity Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, humidity, thailand, hardware]
related: [Temperature-Sensors, Leaf-Wetness-Sensors, Rainfall-Sensors]
---

# Air Humidity Sensors

> **Summary**: Air humidity is a critical predictor of coffee leaf rust and other fungal diseases. The SHT31 at ~115 THB offers the best accuracy and long-term stability for coffee farm deployment, where knowing when humidity exceeds 80% RH can trigger life-saving disease prevention.

---

## Overview

Air humidity (relative humidity, RH) is one of the most important environmental parameters for coffee disease management. When relative humidity exceeds 80% in combination with temperatures of 18–28°C and prolonged leaf wetness, coffee leaf rust (Hemileia vastatrix) spores can germinate and infect plants within 24–48 hours. For Northern Thailand, where the rainy season brings months of high humidity, monitoring RH is essential for timing fungicide applications precisely and avoiding unnecessary chemical use.

Beyond disease, humidity also affects cherry drying after harvest (target <65% RH for proper drying) and flowering timing (a dry period followed by rain triggers bloom). The ideal humidity range for healthy Arabica growth is 60–80% RH, with consistently >85% RH increasing disease pressure significantly.

---

## Sensor Comparison

| Model | Humidity Accuracy | Temp Accuracy | Interface | Price (THB) | Best For |
|-------|------------------|---------------|-----------|-------------|----------|
| **SHT31** | ±2% RH | ±0.3°C | I2C | 100–130 | ⭐ Best overall |
| **DHT22** | ±2% RH | ±0.5°C | Single-wire | 130–230 | Budget + wide availability |
| **BME280** | ±3% RH | ±0.5°C | I2C/SPI | 80–150 | Weather station (+ pressure) |
| **AHT20** | ±2% RH | ±0.3°C | I2C | 50–80 | Ultra-budget |
| **SHT35** | ±1.5% RH | ±0.1°C | I2C | 200–300 | High accuracy |

---

## Recommended: SHT31

| Attribute | Detail |
|-----------|--------|
| **Model** | SHT31-D / GY-SHT31-D module |
| **Humidity Accuracy** | ±2% RH |
| **Temperature Accuracy** | ±0.3°C |
| **Long-term Stability** | ±0.25% RH/year drift |
| **Interface** | I2C |
| **Price in THB** | **100–130 THB** (Shopee Thailand) |
| **Where to Buy** | Shopee Thailand (~115 THB), Lazada |

The SHT31 is the **recommended choice** for coffee farm humidity monitoring because:
- **Accuracy**: ±2% RH is sufficient for disease risk thresholding
- **Stability**: ±0.25% RH/year drift means readings stay reliable for years
- **Price**: Only ~115 THB, cheaper than DHT22 despite better performance
- **Interface**: I2C is more reliable than DHT22's proprietary single-wire protocol

---

## Coffee-Specific: Why Humidity Matters

### Disease Risk Model

Coffee leaf rust (CLR) is the most devastating coffee disease worldwide. Its development follows a predictable pattern based on environmental conditions:

| Condition | Threshold | Risk Level |
|-----------|-----------|------------|
| Humidity >80% RH + Temp 18–28°C + Leaf wetness >24h | ALL met | 🔴 HIGH — CLR infection likely |
| Humidity 70–80% RH + Temp 18–28°C | Partial | 🟡 MODERATE — Monitor closely |
| Humidity <70% RH or Temp <15°C | Not met | 🟢 LOW — Unfavorable for CLR |

### Ideal Humidity for Coffee

| Growth Stage | Target RH | Notes |
|-------------|-----------|-------|
| Vegetative growth | 60–80% | Healthy leaf development |
| Flowering | 60–70% (after rain event) | Dry period + rain triggers bloom |
| Cherry development | 60–80% | Consistent conditions preferred |
| Post-harvest drying | <65% | RH >70% slows drying and risks mold |
| Cherry processing (honey) | 50–65% | Controlled drying environment |

### Cherry Drying and Humidity

After harvest, coffee cherries must be dried to 10–12% moisture content. The drying rate is heavily dependent on ambient humidity:
- **<55% RH**: Fast drying, but risk of uneven drying if too fast
- **55–65% RH**: Ideal range for most processing methods
- **65–75% RH**: Slow drying; increased risk of mold and off-flavors
- **>75% RH**: Drying may stall; high risk of mold and fermentation defects

For farmers doing natural/dry process or honey process, a humidity sensor at the drying station is extremely valuable for deciding when to cover cherries or move them under shelter.

---

## Other Humidity Sensor Options

### DHT22 — Budget Alternative

The DHT22 is widely available in Thailand (130–230 THB) and combines temperature + humidity. While its humidity accuracy spec (±2% RH) matches the SHT31, real-world performance is worse due to drift over time (±0.5% RH/year vs ±0.25% RH/year for SHT31) and slower response time. The plastic housing is not waterproof. Best for basic monitoring where sub-dollar precision isn't critical.

### BME280 — For Weather Stations

The BME280 adds barometric pressure (80–150 THB), making it ideal for weather station nodes where you want to predict incoming rain from falling pressure. However, its humidity accuracy (±3% RH) is the worst of the three main options, which matters for disease risk thresholding. Use BME280 for weather prediction, SHT31 for disease management.

### AHT20 — Ultra-Budget

The AHT20 (50–80 THB on Shopee) is a newer budget I2C sensor with decent ±2% RH accuracy. It has less community support than DHT22/SHT31 and limited long-term reliability data, but at under 80 THB it's an acceptable choice for adding humidity sensing to additional sensor nodes.

---

## Installation Tips

1. **Mount in a radiation shield** — same as temperature sensors. Sun-heated air gives falsely low humidity readings
2. **Height**: 1.5–2m above ground, or at coffee canopy top level
3. **Ensure airflow** — don't seal the sensor in an enclosure; it needs ambient air exchange
4. **Avoid mounting near irrigation sprinklers** — direct water contact gives falsely high readings
5. **Replace DHT22 sensors annually** if using them; SHT31 can go 2–3 years before drift becomes significant

---

## Related Topics

- [[Temperature-Sensors]] — Usually combined with humidity (SHT31, DHT22, BME280)
- [[Leaf-Wetness-Sensors]] — Companion to humidity for CLR disease prediction
- [[Rainfall-Sensors]] — Together with humidity determines flowering timing
- [[Pest-Disease-Management]] — How humidity data drives fungicide decisions

---

*Last updated: 2026-05-12*
