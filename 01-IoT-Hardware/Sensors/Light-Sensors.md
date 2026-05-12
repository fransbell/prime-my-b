---
topic: Light / PAR Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, light, par, thailand, hardware]
related: [Temperature-Sensors, Humidity-Sensors, Installation-Guide]
---

# Light / PAR Sensors

> **Summary**: Light measurement is essential for shade management in coffee farms. The BH1750 at ~50 THB measures lux and can calculate shade percentage. For precise plant-relevant measurements, PAR sensors (µmol/m²/s) are ideal but expensive — a budget approach uses two BH1750s to compare full-sun vs. shade readings.

---

## Overview

Coffee is traditionally a shade-grown crop, and the amount of light reaching the coffee plants significantly affects both yield and quality. Too much sun (especially at lower elevations) stresses plants, reduces cherry quality, and promotes weed growth. Too little shade (or too much shade) reduces photosynthesis, limits yield, and can increase fungal disease pressure by reducing airflow and trapping humidity.

For Northern Thailand, shade management is particularly important because the region produces specialty Arabica that benefits from 40–70% shade. Measuring light levels allows farmers to optimize shade tree density, prune shade trees when shade exceeds 70%, and document shade-grown conditions for specialty coffee certification.

The challenge is that cheap sensors measure **lux** (human eye sensitivity), while plants respond to **PAR** (Photosynthetically Active Radiation, 400–700nm). Professional PAR sensors cost 10,000+ THB, while lux sensors cost 50 THB. The practical solution is to use lux sensors for shade percentage calculation and spot-check with a handheld PAR meter.

---

## Sensor Comparison

| Model | Measures | Range | Interface | Price (THB) | Best For |
|-------|----------|-------|-----------|-------------|----------|
| **BH1750** | Lux | 1–65,535 lux | I2C | 45–100 | ⭐ Budget shade measurement |
| **TSL2561** | IR + Full spectrum → Lux | 0.1–40,000+ lux | I2C | 150–250 | Wider dynamic range |
| ML8511 | UV intensity | 240–380nm | Analog | 80–150 | UV stress monitoring |
| Chinese PAR (RS485) | PAR/PPFD | Varies | RS485 | 1,000–1,750 | Budget PPFD (accuracy?) |
| Apogee SQ-520 | PAR/PPFD | 0–4,000 µmol/m²/s | USB | ~19,000 | Research-grade |
| LI-COR LI-190R | PAR/PPFD | 0–10,000 µmol/m²/s | Analog | ~24,000+ | Industry standard |

---

## Recommended: BH1750 for Shade Measurement

| Attribute | Detail |
|-----------|--------|
| **Model** | BH1750FVI / GY-302 module |
| **Measures** | Ambient light intensity in Lux |
| **Range** | 1–65,535 lux |
| **Interface** | I2C |
| **Price in THB** | **45–100 THB** (Shopee Thailand; GY-302 with cover: 47.50–78 THB) |
| **Where to Buy** | Shopee Thailand, Lazada Thailand, AgeBkk |

### Why BH1750 Works for Coffee

While BH1750 measures lux (not PAR), it can effectively calculate **shade percentage** using the two-sensor method:
1. Place one BH1750 in **full sun** (reference sensor)
2. Place one BH1750 **under the shade canopy** (measurement sensor)
3. **Shade % = (1 - shaded_reading / full_sun_reading) × 100**

This works because shade percentage is a ratio, and the spectral weighting difference between lux and PAR cancels out when taking a ratio of two identical sensors under the same illumination type (sunlight).

---

## Why PAR Matters More Than Lux

| Factor | Detail |
|--------|--------|
| **PAR Definition** | Photosynthetically Active Radiation = light in the 400–700nm range that plants use for photosynthesis |
| **Lux Limitation** | Lux is weighted for human eye sensitivity (peak at 555nm green). Plants absorb most in red (660nm) and blue (450nm) |
| **PPFD** | Photosynthetic Photon Flux Density, measured in µmol/m²/s, is the metric that matters for plant growth |
| **Conversion** | Rough: 1 µmol/m²/s ≈ 55 lux for sunlight (but varies wildly — don't rely on this) |

### Coffee Light Requirements

| Condition | PPFD (µmol/m²/s) | Lux (approx.) | Notes |
|-----------|-------------------|---------------|-------|
| Full sun (tropical) | 1,200–1,800 | 65,000–100,000 | Too intense for Arabica without shade |
| Shade-grown Arabica (ideal) | 600–1,000 | 33,000–55,000 | 40–60% of full sun |
| Heavy shade | 300–600 | 16,500–33,000 | 70–80% shade; yield reduction |
| Minimum for growth | 100–200 | 5,500–11,000 | Below this, coffee cannot sustain production |

---

## Shade Measurement Method

### Two-Sensor Approach (Recommended for Budget)

**Cost**: ~200 THB (two BH1750 modules)

1. Mount reference sensor on a pole above the shade canopy in full sun
2. Mount measurement sensor at coffee canopy height under shade trees
3. Read both sensors simultaneously
4. Calculate shade percentage
5. Alert farmer if shade exceeds 70% (prune shade trees) or drops below 30% (plant more shade trees)

### Coffee Shade Targets

| Shade Level | Shade % | Effect on Coffee |
|------------|---------|------------------|
| Optimal shade-grown | 40–60% | Best quality; good yield; disease resistance |
| Light shade | 20–40% | Higher yield but lower quality; more weed pressure |
| Heavy shade | 60–80% | Best quality but reduced yield; potential mold |
| Full sun | 0–20% | Highest yield but poor quality; stress; disease risk |
| Excessive shade | >80% | Very low yield; etiolation; high disease risk |

---

## Related Topics

- [[Temperature-Sensors]] — Shade affects temperature at canopy level
- [[Humidity-Sensors]] — Shade traps humidity, increasing disease risk
- [[Microclimate-Factors]] — How shade creates microclimates
- [[Installation-Guide]] — Mounting light sensors correctly

---

*Last updated: 2026-05-12*
