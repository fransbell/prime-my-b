---
topic: Soil pH Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, ph, soil, thailand, hardware]
related: [Soil-Moisture-Sensors, NPK-Sensors, Soil-Management]
---

# Soil pH Sensors

> **Summary**: Coffee prefers slightly acidic soil (pH 5.0–6.5). pH sensors CANNOT be left buried continuously — the glass electrode degrades within days. Use periodic spot-check measurements with a portable pH meter or DFRobot kit (~1,200–1,800 THB), supplemented by DOA lab tests (200–500 THB per test).

---

## Overview

Soil pH is a critical parameter for coffee because it directly controls nutrient availability. At the optimal pH range of 5.0–6.5, coffee plants can efficiently absorb nitrogen, phosphorus, potassium, and micronutrients. When pH drifts outside this range — either too acidic (<4.5) or too alkaline (>7.0) — certain nutrients become locked out even if they're present in the soil. In Northern Thailand, many mountain soils are naturally acidic (pH 4.0–5.5), which can limit phosphorus availability and cause aluminum toxicity at very low pH.

The fundamental challenge with pH sensors in IoT systems is that **glass electrode pH probes cannot be left buried in soil continuously**. The glass membrane degrades, readings drift within days, and the probe fails within weeks. This means pH must be measured periodically (weekly or monthly) rather than continuously, making it a different type of monitoring than soil moisture or temperature.

---

## Sensor Comparison

| Model | Interface | Accuracy | Price (THB) | Where to Buy | Best For |
|-------|-----------|----------|-------------|--------------|----------|
| **DFRobot SEN0161-V2** | Analog | ±0.1 pH | 1,200–1,800 | AliExpress, ThaiEasyElec | ⭐ Spot-check with MCU |
| Atlas Scientific EZO-pH | I2C/UART | ±0.002 pH (circuit) | 3,000–6,000 | Import | High accuracy |
| RS485 pH Sensor | RS485 Modbus | Varies | 1,500–3,000 | Shopee | Industrial/waterproof |
| Portable pH meter | Standalone | ±0.01–0.1 pH | 300–2,000 | Shopee, Lazada | ⭐ Simplest option |

---

## Recommended Approach: Periodic Measurement

### Option 1: Portable pH Meter (Simplest)

The simplest and most practical approach for most coffee farmers is a **portable handheld pH meter** (300–2,000 THB on Shopee/Lazada). These are self-contained, easy to calibrate, and give instant readings. Take measurements at 5–10 representative locations across the farm once per month.

### Option 2: DFRobot SEN0161-V2 (IoT Integration)

| Attribute | Detail |
|-----------|--------|
| **Model** | DFRobot Gravity: Analog pH Sensor Kit V2 (SEN0161-V2) |
| **Range** | 0–14 pH |
| **Accuracy** | ±0.1 pH (at 25°C) |
| **Interface** | Analog (with Gravity connector) |
| **Price** | **1,200–1,800 THB** (import via AliExpress or ThaiEasyElec) |

This kit includes the pH probe, signal conditioning board, and BNC connector. It can be connected to an ESP32 analog input for IoT integration. However, the probe must be **removed from soil after each measurement**, rinsed with distilled water, and stored in 3M KCl storage solution.

### Option 3: DOA Lab Testing (Most Accurate)

The Thai Department of Agriculture (DOA) offers professional soil testing for **200–500 THB per test**, which includes pH, organic matter, N, P, K, and CEC. Results take 1–2 weeks. This is the most reliable method and is recommended at least 2–4 times per year for coffee farms.

**Contact**: กลุ่มวิจัยเกษตรเคมี, DOA, Tel 02-579-8600 ext 700

---

## Coffee pH Requirements

| Parameter | Range | Notes |
|-----------|-------|-------|
| **Ideal for Arabica** | 5.0–6.0 | Slightly acidic; optimal nutrient availability |
| **Acceptable for Arabica** | 4.5–6.5 | Growth possible but some nutrients limited |
| **Ideal for Robusta** | 5.5–6.5 | Slightly less acidic preference |
| **Acceptable for Robusta** | 4.5–7.0 | More pH-tolerant than Arabica |
| **Too acidic (<4.5)** | Aluminum toxicity risk | Apply lime (CaCO₃) to raise pH |
| **Too alkaline (>7.0)** | Iron/manganese deficiency | Apply sulfur or acidifying fertilizers |

### Common Northern Thailand Soil pH Issues

- **Mountain red/yellow soils**: Often pH 4.0–5.0 (too acidic); need liming
- **Valley alluvial soils**: pH 5.5–7.0 (usually adequate)
- **After long-term chemical fertilizer use**: Tends to acidify over time; monitor annually

---

## Calibration & Maintenance

| Task | Frequency | Cost |
|------|-----------|------|
| Calibrate with pH 4.01 and 7.00 buffers | Before each use | Buffer solutions: 50–100 THB/bottle |
| Replace pH probe | Every 6–12 months | 300–800 THB |
| Clean probe with distilled water | After each use | Minimal |
| Store probe in 3M KCl solution | Always when not in use | KCl solution: 50–100 THB |
| DOA lab test | 2–4 times per year | 200–500 THB per test |

---

## Related Topics

- [[Soil-Moisture-Sensors]] — Complementary soil parameter (continuous)
- [[NPK-Sensors]] — Nutrient levels interact with pH availability
- [[Soil-Management]] — How to adjust pH for coffee
- [[Suppliers-Thailand]] — Where to buy pH meters and supplies

---

*Last updated: 2026-05-12*
