---
topic: Rainfall Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, rainfall, thailand, hardware]
related: [Humidity-Sensors, Temperature-Sensors, Installation-Guide]
---

# Rainfall Sensors

> **Summary**: Rainfall data (mm/day) is critical for coffee — a dry period of 4–6 weeks followed by rain triggers flowering. A tipping bucket rain gauge (~1,200–2,300 THB) is strongly recommended over cheap rain-drop sensors that cannot measure accumulation.

---

## Overview

Rainfall is arguably the most weather-defining parameter for coffee agriculture in Northern Thailand. The region's seasonal monsoon pattern creates a distinct wet season (May–October, ~1,000–1,500mm) and dry season (November–April, ~100–300mm). Coffee flowering is triggered by the transition — a sustained dry period followed by the first significant rain event causes synchronized blooming across the farm. This means tracking daily rainfall in millimeters is not just academic — it directly predicts when your trees will flower and therefore when your harvest will occur.

Beyond flowering, rainfall data drives irrigation scheduling during the dry season, soil erosion risk assessment on sloped coffee farms, and disease risk models (rain splash disperses coffee leaf rust spores). For any IoT coffee farm system, a proper rainfall sensor is a **must-have**, not an optional extra.

---

## Sensor Comparison

| Type | Model | Price (THB) | Measures | Accuracy | Best For |
|------|-------|-------------|----------|----------|----------|
| Rain drop module | Generic resistive | 20–60 | Binary rain/no-rain | Low | ❌ Not recommended |
| **Tipping bucket** | RS485 (Renke/ComWinTop) | 1,200–2,300 | mm/day accumulation | ±5–10% | ⭐ Best value |
| Tipping bucket (pro) | Young 52202 | ~17,000 | mm/day accumulation | ±2% | Research |
| Optical | Hydreon RG-9 | 1,700–2,800 | Rain intensity | Moderate | Real-time detection |
| Optical (pro) | Hydreon RG-15 | 4,500–7,000 | Accumulation + intensity | Good | Premium option |

---

## Recommended: Tipping Bucket Rain Gauge

| Attribute | Detail |
|-----------|--------|
| **Model (Budget)** | RS485 Tipping Bucket Rain Gauge (e.g., Renke RS-YL) |
| **Price (Budget)** | **1,200–2,300 THB** on AliExpress |
| **Model (Mid-range)** | ComWinTop RS485 Tipping Bucket (~2,300 THB) |
| **Where to Buy** | AliExpress, Shopee Thailand (limited — search "tipping bucket rain gauge RS485") |

### How It Works

A tipping bucket rain gauge collects rain in a funnel that directs water into a small bucket on a pivot. When the bucket fills with a precise volume of water (typically 0.2mm or 0.5mm of rain), it tips and empties, triggering a magnetic reed switch or sending an RS485 count. The number of tips multiplied by the tip volume gives total rainfall accumulation. This is the standard method used by meteorological services worldwide.

**Budget tipping bucket**: 0.5mm per tip. Count tips per hour/day. Daily accumulation = tips × 0.5mm.

### Why Not the Rain Drop Sensor?

The rain drop sensor module (20–60 THB on Shopee/Lazada) can only detect **if** it is raining and roughly **how hard** — it cannot measure millimeters of rainfall. Water pools on the board and doesn't drain properly, and the exposed traces corrode over time. For coffee farming where you need to track daily rainfall totals (to detect dry periods, flowering triggers, and seasonal patterns), this sensor is inadequate.

**Verdict**: The rain drop sensor is OK as a "is it raining right now" binary indicator for simple automation. But for any meaningful coffee farm management, you need the quantitative data from a tipping bucket.

---

## Coffee-Specific Rainfall Requirements

### Seasonal Rainfall Pattern (Northern Thailand)

| Season | Months | Rainfall (mm/month) | Coffee Activity |
|--------|--------|--------------------|-----------------|
| Cool-Dry | Nov–Feb | 10–50 | Flowering, early fruit development |
| Hot-Dry | Mar–Apr | 30–80 | End of dry period; first rains trigger flowering |
| Early Rainy | May–Jun | 150–250 | Rapid fruit development |
| Peak Rainy | Jul–Sep | 200–300 | Full fruit development; disease risk peak |
| Late Rainy | Oct | 100–200 | Cherry ripening begins; harvest starts |

### Key Rainfall Metrics for Coffee

| Metric | Target | Why It Matters |
|--------|--------|---------------|
| Annual rainfall | 1,200–2,000 mm | Arabica needs; below 1,000mm requires irrigation |
| Dry period for flowering | 4–6 weeks with <50mm total | Triggers synchronized bloom |
| Monthly during fruit development | 100–200 mm | Consistent moisture for cherry sizing |
| Rain-free days at harvest | 5+ consecutive dry days | Critical for quality harvesting and drying |
| Rainy season daily maximum | Avoid >80mm/day | Heavy rain causes cherry drop and soil erosion |

---

## Installation Guide

| Parameter | Recommendation |
|-----------|---------------|
| **Height** | 0.5–1.0m above ground on a level surface (standard: 1m) |
| **Location** | Open area, away from trees and buildings (at least 2× the height of nearby obstacles away) |
| **Leveling** | MUST be perfectly level — use a bubble level during installation |
| **Maintenance** | Clean funnel and bucket monthly; remove debris, insects, bird droppings |
| **Calibration** | Pour known volume of water slowly through funnel; count tips; verify mm/tip ratio |
| **Data output** | RS485: use Modbus RTU to read count register; Pulse: count pulses on GPIO interrupt |

### Important: Do NOT Place Under Shade Trees

Rain gauges must be in the open, away from tree canopies that could intercept rainfall. On a coffee farm with shade trees, this means placing the gauge in an open clearing or above the canopy level. If that's not practical, apply a correction factor: compare gauge reading with nearest TMD (Thai Meteorological Department) station data.

---

## Related Topics

- [[Humidity-Sensors]] — Together with rainfall determines flowering timing
- [[Temperature-Sensors]] — Rain + temperature combo drives disease risk
- [[Soil-Moisture-Sensors]] — Rainfall vs. soil moisture for irrigation decisions
- [[Installation-Guide]] — Full field deployment instructions

---

*Last updated: 2026-05-12*
