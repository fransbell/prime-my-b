---
topic: Leaf Wetness Sensors
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, sensor, leaf-wetness, thailand, hardware, disease]
related: [Humidity-Sensors, Temperature-Sensors, Pest-Disease-Management]
---

# Leaf Wetness Sensors

> **Summary**: Leaf wetness duration (LWD) is the most critical predictor of coffee leaf rust infection. When leaves stay wet for >24 hours at 18–28°C, CLR spores germinate and infect. The Dragino LLMS01 (~4,000–5,000 THB) provides professional LoRaWAN monitoring, or build a DIY sensor for ~50–100 THB.

---

## Overview

Leaf wetness is the "missing link" in many coffee disease prediction systems. While humidity and temperature sensors tell you about the general environment, leaf wetness tells you whether there is actually **free water on the leaf surface** — the specific condition required for coffee leaf rust (Hemileia vastatrix) spore germination. Research from Costa Rica's ICAFE (Coffee Institute of Costa Rica) has shown that leaf wetness duration (LWD) is the single most predictive input for CLR infection risk models.

In Northern Thailand's rainy season, prolonged leaf wetness is common — dew formation at night, fog in the morning, and rain throughout the day can keep leaves wet for 24–48+ hours continuously. This creates ideal conditions for CLR infection, which is why the disease is such a major problem in the region. Monitoring LWD allows farmers to time fungicide applications precisely, applying only when infection risk is high rather than on a fixed calendar schedule.

---

## Sensor Options

### Dragino LLMS01 — Professional LoRaWAN

| Attribute | Detail |
|-----------|--------|
| **Model** | Dragino LLMS01 LoRaWAN Leaf Moisture Sensor |
| **Measures** | Leaf wetness (surface moisture), temperature |
| **Interface** | LoRaWAN wireless (built-in) |
| **Frequency** | AS923 available for Thailand |
| **Price** | **4,000–5,000 THB** (import from Dragino Store / AliExpress) |
| **Pros** | Purpose-built for leaf wetness; LoRaWAN; battery-powered; AS923 available |
| **Cons** | Expensive; requires LoRaWAN gateway |

### DIY Leaf Wetness Sensor — Budget Option

| Attribute | Detail |
|-----------|--------|
| **Method** | Interleaved copper traces on a leaf-shaped PCB; water droplets change resistance |
| **Price** | **50–100 THB** in materials |
| **How to Build** | (1) Design leaf-shaped PCB with interleaved traces; (2) Connect to ESP32 analog input with voltage divider; (3) Coat with thin conformal coating except sensing surface; (4) Mount at ~45° angle in the coffee canopy |
| **Calibration** | Dry = high resistance; dew = medium; rain = low resistance. Set thresholds for "wet hours" counting. |
| **Pros** | Very cheap; customizable; works with any MCU |
| **Cons** | Not standardized; needs custom calibration; traces corrode over time (replace annually) |

---

## Coffee Leaf Rust Prediction Model

### Critical Thresholds

| Leaf Wetness Duration | Temperature | Humidity | Risk Level |
|----------------------|-------------|----------|------------|
| >48 hours continuous | 18–28°C | >80% RH | 🔴 EXTREME — Infection almost certain |
| 24–48 hours | 18–28°C | >70% RH | 🟠 HIGH — Infection likely |
| 12–24 hours | 18–28°C | >60% RH | 🟡 MODERATE — Some risk |
| <12 hours | Any | Any | 🟢 LOW — Unfavorable for CLR |

### ICAFE Model Integration

The ICAFE model used in Costa Rica combines LWD with temperature to generate a daily infection risk index. A simplified version suitable for IoT implementation:

```
IF leaf_wetness_hours > 24 AND temperature BETWEEN 18 AND 28:
    risk = "HIGH"
    action = "Apply preventive fungicide within 48 hours"
ELIF leaf_wetness_hours > 12 AND humidity > 80:
    risk = "MODERATE"
    action = "Monitor closely; prepare fungicide"
ELSE:
    risk = "LOW"
    action = "No action needed"
```

### Value of LWD Monitoring

Without LWD monitoring, farmers typically apply fungicides on a fixed calendar schedule (e.g., every 2–4 weeks during rainy season). With LWD-based prediction:
- **Reduce fungicide applications by 30–50%** (only spray when risk is high)
- **Improve effectiveness** (spraying when spores are actively germinating is more effective)
- **Reduce chemical costs** by 2,000–5,000 THB per rai per year
- **Reduce environmental contamination**

---

## Installation Tips

| Parameter | Recommendation |
|-----------|---------------|
| **Angle** | Mount at ~45° (simulates natural leaf angle; allows dew formation and drainage) |
| **Height** | Within the coffee canopy at mid-height (~1–1.5m) |
| **Location** | Representative area; not in an unusually wet or dry spot |
| **Comparison** | If possible, mount 2 sensors: one under shade, one in more exposed area |
| **DIY tip** | Use a real coffee leaf as a template for the PCB shape |

---

## Related Topics

- [[Humidity-Sensors]] — Companion data for disease prediction
- [[Temperature-Sensors]] — Temperature + LWD = infection risk
- [[Pest-Disease-Management]] — How to act on disease risk alerts
- [[Alerts-Remediation]] — Alert system design for disease risk

---

*Last updated: 2026-05-12*
