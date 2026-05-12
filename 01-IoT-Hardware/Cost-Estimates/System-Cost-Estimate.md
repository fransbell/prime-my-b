---
topic: System Cost Estimate
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, cost, budget, thailand, hardware]
related: [Microcontroller-Comparison, Communication-Modules, Power-Solutions]
---

# System Cost Estimate

> **Summary**: A budget WiFi node costs ~690 THB, a LoRa node ~1,460 THB, and a complete LoRaWAN system for a 10-rai coffee farm costs ~16,000–37,000 THB depending on configuration. The recommended "DIY LoRa Hybrid" at ~25,000–37,000 THB for 10 rai offers the best value.

---

## Overview

One of the most common questions from coffee farmers considering IoT is: "How much will it cost?" This document provides detailed cost breakdowns for different system tiers, from a simple WiFi setup covering the area near the farmhouse to a professional LoRaWAN network covering an entire 10-rai (1.6 hectare) farm.

All prices are in Thai Baht (THB) and reflect 2026 Thailand market prices from Shopee, Lazada, and AliExpress. Professional installation labor is not included — the estimates cover hardware only.

---

## Single Node Cost Breakdown

### Budget WiFi Node

| Component | Model | Price (THB) |
|-----------|-------|-------------|
| Microcontroller | ESP32 DevKit V1 | 120 |
| Soil Moisture | Capacitive V1.2 | 35 |
| Air Temp + Humidity | DHT22 | 150 |
| Soil Temperature | DS18B20 waterproof (2m) | 70 |
| Light | BH1750 | 50 |
| Rain (basic) | Rain drop module | 30 |
| Power | 5V 2W solar + 18650 + TP4056 | 150 |
| Enclosure + cables | IP65 box, cable glands, wires | 85 |
| **Total per node** | | **~690 THB** |

### LoRa Sensor Node (Recommended)

| Component | Model | Price (THB) |
|-----------|-------|-------------|
| MCU + LoRa | Heltec WiFi LoRa 32 V3 (915MHz) | 900 |
| Soil Moisture | Capacitive V1.2 | 35 |
| Air Temp + Humidity | SHT31 | 115 |
| Soil Temperature | DS18B20 waterproof (2m) | 70 |
| Light | BH1750 | 50 |
| Leaf Wetness | DIY sensor | 80 |
| Power | 5V 2W solar + 18650 + onboard charger | 130 |
| Enclosure + cables | IP65 box, cable glands, wires | 80 |
| **Total per node** | | **~1,460 THB** |

### Professional LoRaWAN Node (Dragino)

| Component | Model | Price (THB) |
|-----------|-------|-------------|
| Soil Sensor | Dragino LSE01 (LoRaWAN, moisture+temp+EC) | 4,500 |
| Air Temp + Humidity | Dragino LSN50v2 (LoRaWAN) | 3,500 |
| Rain Gauge | Tipping bucket RS485 + LoRa node | 2,500 |
| **Total per node set** | | **~10,500 THB** |

---

## Gateway Cost

| Component | Budget | Recommended | Professional |
|-----------|--------|-------------|-------------|
| LoRaWAN Gateway | Dragino LG01-P (1ch) ~4,300 | RAK7268 (8ch) ~6,300 | SenseCAP M2 ~10,000 |
| 4G LTE Module | A7670S ~600 | A7670S ~600 | Built-in ~0 |
| Antenna + Cable | ~300 | ~500 | ~800 |
| SIM Card (first month) | ~99 | ~99 | ~99 |
| Enclosure + Power | ~500 | ~800 | ~1,200 |
| Solar (gateway) | — | 12V 10W + controller ~500 | Included |
| **Total Gateway** | **~5,800** | **~8,800** | **~12,100** |

---

## Complete System Cost by Farm Size

### 5-Rai Farm (0.8 Hectare)

| Configuration | Nodes | Gateway | Server/Cloud | **Total** |
|--------------|-------|---------|-------------|-----------|
| Budget WiFi | 4 nodes × 690 = 2,760 | WiFi AP ~1,200 | HandySense (free) | **~3,960 THB** |
| DIY LoRa | 3 nodes × 1,460 = 4,380 | RAK7268 ~8,800 | HandySense (free) | **~13,180 THB** |
| Professional LoRaWAN | 2 node sets × 10,500 = 21,000 | SenseCAP M2 ~12,100 | SenseCAP cloud (free tier) | **~33,100 THB** |

### 10-Rai Farm (1.6 Hectare) — Most Common

| Configuration | Nodes | Gateway | Server/Cloud | **Total** |
|--------------|-------|---------|-------------|-----------|
| Budget WiFi (limited range) | 6 nodes × 690 = 4,140 | WiFi AP ~1,200 | HandySense (free) | **~5,340 THB** |
| DIY LoRa | 5 nodes × 1,460 = 7,300 | RAK7268 ~8,800 | HandySense (free) | **~16,100 THB** |
| DIY LoRa (with rain + wind) | 5 nodes × 1,460 + rain ~1,800 + wind ~2,500 = 11,600 | RAK7268 ~8,800 | HandySense (free) | **~20,400 THB** |
| Professional LoRaWAN | 4 node sets × 10,500 = 42,000 | SenseCAP M2 ~12,100 | SenseCAP cloud | **~54,100 THB** |

---

## Recommended: DIY LoRa Hybrid

**Best value for most coffee farms in Northern Thailand**

| Item | Qty | Unit (THB) | Total (THB) |
|------|-----|-----------|-------------|
| Heltec LoRa V3 sensor node | 5 | 1,460 | 7,300 |
| RAK7268 LoRaWAN gateway | 1 | 8,800 | 8,800 |
| Tipping bucket rain gauge | 1 | 1,800 | 1,800 |
| RS485 wind sensor | 1 | 2,500 | 2,500 |
| 4G LTE SIM (AIS, annual) | 1 | 1,200 | 1,200 |
| Raspberry Pi (local server, optional) | 1 | 2,000 | 2,000 |
| Cables, mounts, misc | — | 2,000 | 2,000 |
| **Total** | | | **~25,600 THB** |

### ROI Estimate

For a 10-rai Arabica coffee farm producing ~3,000 kg cherry/year at 80 THB/kg = 240,000 THB annual revenue:

| Benefit | Estimated Value (THB/year) |
|---------|--------------------------|
| Reduced irrigation water | 5,000–10,000 |
| Optimized fertilization | 10,000–15,000 |
| Reduced fungicide (CLR prediction) | 8,000–15,000 |
| Quality improvement (better cherry) | 15,000–30,000 |
| **Total potential benefit** | **38,000–70,000 THB/year** |
| **Payback period** | **4–8 months** |

---

## Ongoing Costs

| Item | Annual Cost (THB) |
|------|-------------------|
| 4G SIM card (gateway) | ~1,200 |
| Sensor replacement (DHT22/SHT31 per node, every 2 years) | ~500 |
| pH probe replacement (every 12 months) | ~500 |
| Battery replacement (every 2–3 years) | ~250 |
| DOA soil lab test (4× per year) | ~1,600 |
| **Total annual maintenance** | **~4,050 THB/year** |

---

## Funding & Support Options

| Program | Benefit | Eligibility |
|---------|---------|-------------|
| **HandySense B-Farm** (NECTEC/NSTDA) | Free IoT cloud platform | Thai farmers |
| **BAAC loans** | Low-interest smart farming loans | BAAC members |
| **DOAE smart farming subsidy** | Up to 50% cost share for IoT | Registered farmers |
| **BOI incentives** | Tax benefits for tech adoption | Larger operations |

---

## Related Topics

- [[Microcontroller-Comparison]] — MCU pricing details
- [[Communication-Modules]] — Gateway and module pricing
- [[Power-Solutions]] — Solar and battery pricing
- [[Government-Programs]] — Subsidies and support programs

---

*Last updated: 2026-05-12*
