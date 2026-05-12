---
topic: Wind Speed & Direction Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, wind, thailand, hardware]
related: [Rainfall-Sensors, Temperature-Sensors, Leaf-Wetness-Sensors]
---

# Wind Speed & Direction Sensors

> **Summary**: Wind data is valuable for coffee leaf rust spore dispersal prediction and cherry drying management. A combined RS485 wind speed+direction sensor (~2,000–4,000 THB) is recommended for farms with disease history. Budget cup anemometers (~350–700 THB) are sufficient for basic monitoring.

---

## Overview

Wind affects coffee farms in several important ways: it disperses coffee leaf rust spores (the most devastating coffee disease), influences cherry and bean drying rates during post-harvest processing, determines whether windbreak trees are needed, and helps with Robusta pollination. In Northern Thailand's mountainous terrain, wind patterns can vary dramatically between valleys and ridgelines, creating microclimates that affect disease pressure and growing conditions.

For most coffee farms, wind speed is more important than wind direction. However, if your farm has a history of coffee leaf rust, knowing the wind direction can help identify the source of infection and plan protective barrier plantings.

---

## Sensor Comparison

| Type | Price (THB) | Measures | Accuracy | Maintenance | Best For |
|------|-------------|----------|----------|-------------|----------|
| Cup anemometer (pulse) | 350–700 | Wind speed | ±1 m/s | Medium (moving parts) | Budget speed only |
| **Combined RS485** | 2,000–4,000 | Speed + direction | ±0.3 m/s, ±3° | Medium | ⭐ Best value |
| Ultrasonic | 4,000–12,000 | Speed + direction | ±0.1 m/s | Low (no moving parts) | Premium/research |

---

## Recommended: RS485 Combined Wind Sensor

| Attribute | Detail |
|-----------|--------|
| **Model** | RS485 Wind Speed + Direction combined sensor |
| **Interface** | RS485 Modbus RTU |
| **Price** | **2,000–4,000 THB** on Shopee Thailand (some listed, mostly pre-order) or ~1,400–2,800 THB on AliExpress |
| **Where to Buy** | Shopee Thailand (search "RS485 wind speed direction sensor"), AliExpress |

This gives both speed and direction in one sensor with digital RS485 output, making it easy to integrate with ESP32 via a MAX485 or RS485-to-TTL converter module (~30 THB). The RS485 protocol allows long cable runs (up to 1,200m) from the sensor to the MCU, which is important for mounting the sensor at the required height.

### Budget Alternative: Cup Anemometer

A simple 3-cup anemometer with pulse output costs 350–700 THB from AliExpress. Each rotation of the cups generates a pulse; wind speed = pulse frequency × calibration factor. No power needed for the sensor itself (just a reed switch). However, moving parts wear out and birds can damage cups. No wind direction measurement.

---

## Wind & Coffee Farm Management

| Factor | Detail |
|--------|--------|
| **Disease spread** | Wind carries coffee leaf rust spores up to several hundred meters. High wind + rain = rapid disease spread between plants. Wind direction data helps identify infection source zones. |
| **Cherry drying** | Wind speed affects drying rate during natural/honey process. >2 m/s wind significantly improves drying. <0.5 m/s = very slow drying, mold risk. |
| **Windbreak need** | Coffee damaged by sustained winds >15 m/s. If your farm averages >5 m/s, plant windbreak trees (e.g., Casuarina, Leucaena). |
| **Pollination** | Moderate wind helps Robusta cross-pollination. Arabica is self-pollinating but wind can still assist. |
| **Temperature effect** | Wind chill at high elevation can reduce effective temperature. Important for frost-prone areas above 1,200m. |

---

## Installation Guide

| Parameter | Recommendation |
|-----------|---------------|
| **Height** | 2–3m above canopy (or 10m above ground for met standard). For farm-level: mount at canopy top (~2m for coffee). |
| **Location** | Exposed location representative of general farm conditions; not in a wind shadow |
| **Mounting** | Use a sturdy pole (steel or treated wood) that doesn't vibrate in wind |
| **RS485 wiring** | Use twisted pair cable; add 120Ω termination resistor at each end of the bus |
| **Maintenance** | Check cups/vane every 3–6 months; clean bearings; verify free rotation |

---

## Related Topics

- [[Leaf-Wetness-Sensors]] — Wind + leaf wetness + temperature = disease risk model
- [[Rainfall-Sensors]] — Wind-driven rain spreads spores most effectively
- [[Humidity-Sensors]] — Combined with wind for disease prediction
- [[Microclimate-Factors]] — Wind patterns in mountainous terrain

---

*Last updated: 2026-05-12*
