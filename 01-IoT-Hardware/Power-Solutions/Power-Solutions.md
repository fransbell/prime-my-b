---
topic: Power Solutions
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, power, solar, battery, thailand, hardware]
related: [Microcontroller-Comparison, Communication-Modules, System-Cost-Estimate]
---

# Power Solutions

> **Summary**: Solar + 18650 Li-ion battery is the standard power solution for remote sensor nodes in Northern Thailand. A 5V 2W solar panel + 18650 3000mAh battery + TP4056 charge module costs ~150–250 THB per node and provides year-round continuous operation with 5-minute reading intervals.

---

## Overview

Coffee farm sensor nodes are typically deployed in remote field locations without access to mains electricity. Even when power is available at the farmhouse, running cables to every sensor node across a mountainside is impractical and expensive. Solar power with battery backup is the standard solution for IoT sensor nodes, and Northern Thailand's tropical climate provides excellent solar irradiance (4.5–5.5 kWh/m²/day average) making solar highly viable.

The key design principle is **energy neutrality**: the solar panel must generate enough energy during the day to fully recharge the battery, and the battery must have enough capacity to power the node through the night and through 1–2 cloudy days. With ESP32 deep sleep mode, a single 18650 battery can power a sensor node for 1–2 weeks without any solar input, providing generous cloud-day buffer.

---

## Power Budget Analysis

### Sensor Node Power Consumption

| Component | Active Current | Duty Cycle | Avg Current | Daily Energy |
|-----------|---------------|------------|-------------|-------------|
| ESP32 (deep sleep) | 0.6 mA | 99.7% | 0.6 mA | 14.4 mAh |
| ESP32 (awake + WiFi TX) | 80 mA | 0.3% (~4.3 min/day) | 0.24 mA | 5.8 mAh |
| SHT31 (reading) | 1 mA | 0.1% | ~0 mA | 0.02 mAh |
| BH1750 (reading) | 0.12 mA | 0.1% | ~0 mA | 0.003 mAh |
| Capacitive V1.2 (reading) | 5 mA | 0.1% | ~0 mA | 0.012 mAh |
| DS18B20 (reading) | 1 mA | 0.1% | ~0 mA | 0.002 mAh |
| LoRa TX (if applicable) | 120 mA | 0.05% (~43s/day) | 0.06 mA | 1.4 mAh |
| **Total (WiFi node)** | | | **~0.85 mA** | **~20 mAh/day** |
| **Total (LoRa node)** | | | **~0.9 mA** | **~22 mAh/day** |

### Battery Life Calculation

| Battery | Capacity | WiFi Node Life | LoRa Node Life |
|---------|----------|---------------|----------------|
| 18650 (single) | 3,000 mAh | ~150 days (no solar) | ~136 days (no solar) |
| 18650 (dual) | 6,000 mAh | ~300 days | ~272 days |
| Li-SOCl2 (Dragino) | 8,500 mAh | Years (purpose-built) | — |

> **Conclusion**: Even a single 18650 battery can power a sensor node for **4–5 months** without any solar input. With a small solar panel, the system operates indefinitely.

---

## Component Selection

### Solar Panels

| Size | Wattage | Price (THB) | Where to Buy | Best For |
|------|---------|-------------|--------------|----------|
| 5V 1W (mini) | 1W | 30–50 | Shopee | Insufficient for continuous LoRa |
| **5V 2W** | 2W | 50–90 | Shopee | ⭐ Sensor node (recommended minimum) |
| 5V 3W | 3W | 80–120 | Shopee | Cloudy day buffer |
| 6V 5W | 5W | 150–250 | Shopee | Gateway or high-power nodes |
| 12V 10W | 10W | 250–400 | Shopee | Gateway with 4G module |

**Northern Thailand solar considerations**: During the rainy season (Jun–Oct), expect 2–4 cloudy days in a row. Size the battery to last at least 3 days without solar: 3 × 22 mAh = 66 mAh. A 3,000 mAh 18650 provides 45+ days of buffer — more than adequate.

### Batteries

| Type | Capacity | Price (THB) | Where to Buy | Notes |
|------|----------|-------------|--------------|-------|
| **18650 Li-ion** (Samsung, Panasonic) | 3,000–3,500 mAh | 50–100 | Shopee, Lazada | ⭐ Standard choice; use branded cells |
| 18650 (generic) | 2,000–3,000 mAh | 25–50 | Shopee | Budget but lower actual capacity |
| 26650 Li-ion | 3,000–5,000 mAh | 100–200 | Shopee | Higher capacity, less common |
| Li-Po (3.7V flat) | 1,000–3,000 mAh | 50–200 | Shopee | Compact but fragile |

### Charge Controllers

| Module | Price (THB) | Where to Buy | Notes |
|--------|-------------|--------------|-------|
| **TP4056** (with protection) | 10–25 | Shopee | ⭐ Simple 1-cell Li-ion charger; widely available |
| **TP4056 + DW01A** (protection) | 15–30 | Shopee | Over-charge, over-discharge, short-circuit protection |
| Heltec V3 built-in charger | Included | — | ⭐ Best integrated solution for Heltec boards |
| CN3791 (solar MPPT) | 80–150 | AliExpress | MPPT for maximum solar efficiency |

---

## Wiring Diagram (Basic Solar Node)

```
┌──────────────┐
│  Solar Panel  │───→───┐
│   5V 2W      │       │
└──────────────┘       ▼
                ┌──────────────┐
                │   TP4056 +   │
                │  Protection  │
                └──┬───────┬───┘
                   │       │
              Charge│       │Load
                   ▼       ▼
              ┌────────┐  ┌──────────────┐
              │ 18650  │  │   ESP32 /     │
              │ Battery│  │   Heltec V3   │
              │ 3,000mAh│ │   + Sensors   │
              └────────┘  └──────────────┘
```

**Key points**:
- Always use a TP4056 with protection (DW01A) to prevent over-discharge
- Solar panel connects to TP4056 input; battery to BAT terminals; MCU to OUT terminals
- For Heltec V3: connect solar panel and battery directly to the board's built-in charger (no TP4056 needed)
- Add a 100µF capacitor across the MCU power input to handle transmit current spikes

---

## Installation Tips

1. **Angle the solar panel**: In Northern Thailand (18–20°N latitude), tilt panels at ~15–20° facing south for year-round optimization. During the rainy season, flat mounting (0° tilt) can actually capture more light from overcast sky.
2. **Clean panels monthly**: Dust, bird droppings, and pollen reduce output by 20–50%. A quick wipe with a damp cloth restores full output.
3. **Protect battery from heat**: 18650 batteries degrade faster above 45°C. Do not place the battery enclosure in direct sun; mount it under the solar panel where it's shaded.
4. **Use weatherproof enclosure**: IP65 or IP67 junction box (~50–100 THB on Shopee). Drill cable glands for sensor wires.
5. **Lightning protection**: Northern Thailand has frequent thunderstorms. Add a TVS diode or gas discharge tube on the solar panel input if the node is on an exposed ridgeline.

---

## Related Topics

- [[Microcontroller-Comparison]] — MCU power consumption comparison
- [[Communication-Modules]] — LoRa vs WiFi power consumption
- [[System-Cost-Estimate]] — Power system cost per node
- [[Installation-Guide]] — Full deployment guide

---

*Last updated: 2026-05-12*
