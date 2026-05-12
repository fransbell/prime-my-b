---
topic: Temperature Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, temperature, thailand, hardware]
related: [Humidity-Sensors, Soil-Moisture-Sensors, Installation-Guide]
---

# Temperature Sensors

> **Summary**: Temperature affects every stage of coffee development — from flowering triggers to cherry maturation rate to disease risk. Use SHT31 for air temp+humidity (best accuracy for the price) and DS18B20 for soil temperature (waterproof, cable length, reliable).

---

## Overview

Temperature is the most fundamental environmental parameter for coffee agriculture. Arabica coffee requires a narrow temperature band of 15–24°C for optimal growth, while Robusta tolerates 24–30°C. In Northern Thailand, the cool season (November–February) provides the critical temperature differential that makes high-quality Arabica possible at 800–1,200m elevation. Temperature monitoring helps farmers understand microclimate variation across their farm, predict flowering timing, assess disease risk (coffee leaf rust thrives at 18–28°C), and make informed decisions about shade management.

For IoT sensor deployment, temperature measurement is needed at two distinct locations: **air temperature** (at 1.5–2m height in a radiation shield) and **soil temperature** (at 10–20cm depth). Different sensors are optimal for each use case, and several options combine temperature with humidity measurement for cost efficiency.

---

## Sensor Comparison

| Model | Measures | Accuracy | Interface | Price (THB) | Best For |
|-------|----------|----------|-----------|-------------|----------|
| **SHT31** | Temp + Humidity | ±0.3°C / ±2% RH | I2C | 100–130 | ⭐ Air temp+humidity (recommended) |
| **DHT22** | Temp + Humidity | ±0.5°C / ±2% RH | Single-wire | 130–230 | Budget air temp+humidity |
| **BME280** | Temp + Humidity + Pressure | ±0.5°C / ±3% RH | I2C/SPI | 80–150 | Weather station (3-in-1) |
| **DS18B20** | Temp only | ±0.5°C | 1-Wire | 50–120 | ⭐ Soil temperature (recommended) |
| **SHT35** | Temp + Humidity | ±0.1°C / ±1.5% RH | I2C | 200–300 | High accuracy |
| **LM35** | Temp only | ±0.5°C | Analog | 25–35 | Simple/cheap near MCU |

---

## Air Temperature Sensors

### SHT31 — Recommended for Air Temp + Humidity

| Attribute | Detail |
|-----------|--------|
| **Model** | SHT31-D / GY-SHT31-D module |
| **Temperature Accuracy** | ±0.3°C |
| **Humidity Accuracy** | ±2% RH |
| **Long-term Stability** | ±0.25% RH/year drift |
| **Interface** | I2C |
| **Price in THB** | **100–130 THB** (Shopee Thailand) |
| **Where to Buy** | Shopee Thailand, Lazada |

The SHT31 is the **best balance of accuracy, stability, and price** for coffee farm deployment. Its long-term drift specification (±0.25% RH/year) means readings remain reliable for years without recalibration. The I2C interface allows easy integration with ESP32 using standard libraries. For coffee farms where humidity accuracy matters for disease prediction, the SHT31's superior humidity performance over DHT22 and BME280 makes it the clear choice.

### DHT22 — Budget Alternative

| Attribute | Detail |
|-----------|--------|
| **Model** | DHT22 / AM2302 |
| **Temperature Range** | -40°C to 80°C |
| **Temperature Accuracy** | ±0.5°C |
| **Humidity Accuracy** | ±2% RH |
| **Interface** | Single-wire digital (proprietary) |
| **Price in THB** | **130–230 THB** |
| **Where to Buy** | Shopee Thailand, Lazada Thailand, AgeBkk, ThaiEasyElec |

The DHT22 combines temperature and humidity in one cheap, widely available package. However, it has a slow response time (~2 seconds), the humidity can drift over time (±0.5% RH/year), and the plastic housing is not waterproof. It works well enough for basic monitoring but for serious deployments where humidity data drives disease risk models, the SHT31 is worth the small price premium.

### BME280 — Weather Station Choice

| Attribute | Detail |
|-----------|--------|
| **Model** | BME280 (Bosch) |
| **Measures** | Temperature + Humidity + Barometric Pressure (3-in-1) |
| **Temperature Accuracy** | ±0.5°C at 25°C |
| **Humidity Accuracy** | ±3% RH (worst of the three) |
| **Interface** | I2C or SPI |
| **Price in THB** | **80–150 THB** (bare module); Cytron Thailand: 390 THB (branded breakout) |

The BME280 is the best choice for weather station nodes because it adds barometric pressure, which is useful for short-term weather prediction. Falling pressure often indicates incoming rain — valuable for coffee farmers who need to plan harvest timing and drying operations. However, its humidity accuracy (±3% RH) is inferior to both DHT22 and SHT31.

---

## Soil Temperature Sensors

### DS18B20 — Recommended for Soil Temperature

| Attribute | Detail |
|-----------|--------|
| **Model** | DS18B20 waterproof (stainless steel probe) |
| **Temperature Range** | -55°C to 125°C |
| **Accuracy** | ±0.5°C (-10°C to 85°C) |
| **Interface** | 1-Wire digital |
| **Price in THB** | **50–120 THB** depending on cable length (1m, 2m, 5m, 10m) |
| **Where to Buy** | Shopee Thailand (many listings), Lazada Thailand |

The DS18B20 is the definitive choice for soil temperature monitoring. Its waterproof stainless steel probe can be buried directly in soil, cable lengths up to 10m allow flexible placement, and the 1-Wire protocol allows **multiple sensors to be daisy-chained on a single GPIO pin** — enabling multi-depth temperature profiling (e.g., 10cm, 20cm, 40cm depths) using just one data line.

**Coffee soil temperature targets**: Optimal root zone temperature for Arabica is 18–22°C. Soil temperatures above 28°C reduce root function and promote soil-borne diseases. In Northern Thailand, soil temperature at 20cm depth typically ranges from 16°C (cool season at high elevation) to 26°C (hot season).

---

## Sensor Selection Guide

| Use Case | Recommended Sensor | Reason |
|----------|-------------------|--------|
| **Air temp + humidity** | SHT31 (in radiation shield) | Best accuracy + stability for the price |
| **Soil temperature** | DS18B20 waterproof | Waterproof, cable length, multi-depth with 1-Wire |
| **Weather station** | BME280 | Temp + humidity + pressure in one module |
| **Budget air temp** | DHT22 | Cheapest combo temp+humidity |
| **High accuracy** | SHT35 | ±0.1°C temp, ±1.5% RH |

---

## Installation Tips for Coffee Farm

### Radiation Shield (CRITICAL for Air Sensors)

**ALWAYS** shield air temperature sensors from direct sunlight. Without a radiation shield, readings can be 5–10°C too high due to solar radiation heating the sensor housing. A radiation shield can be built DIY using stacked white PVC plates (louvered design) or by purchasing a Stevenson screen. The shield must allow natural airflow while blocking direct sun and rain.

**DIY Radiation Shield Steps**:
1. Cut 6–8 white PVC discs (10–15cm diameter)
2. Stack with 1–2cm spacers between each disc
3. Mount sensor in the center of the stack
4. Top disc acts as a rain shield
5. Mount the whole assembly at 1.5–2m height

### Mounting Height
- **Air temperature**: 1.5–2m above ground (standard weather station height), or at canopy top level for microclimate monitoring
- **Soil temperature**: Bury DS18B20 probe at 10–20 cm depth. Seal cable entry point with silicone sealant

### Coffee Temperature Thresholds

| Parameter | Range | Effect |
|-----------|-------|--------|
| Optimal Arabica growth | 15–24°C | Best growth and cherry quality |
| Optimal Robusta growth | 24–30°C | Robusta's preferred range |
| Flowering trigger | Cool period + rain | 10–15°C nights trigger Arabica flower bud development |
| Cherry maturation | 18–25°C | Slower maturation = better sugar accumulation = better cup quality |
| Leaf rust risk | 18–28°C + humidity | Hemileia vastatrix spore germination range |
| Frost damage | Below 4°C | Young Arabica damaged; below 0°C kills plants |
| Heat stress | Above 30°C | Reduced photosynthesis, poor cherry development |

---

## Related Topics

- [[Humidity-Sensors]] — Companion to temperature for air monitoring
- [[Soil-Moisture-Sensors]] — Complementary soil parameter
- [[Rainfall-Sensors]] — Together with temperature drives flowering prediction
- [[Installation-Guide]] — Full field deployment guide

---

*Last updated: 2026-05-12*
