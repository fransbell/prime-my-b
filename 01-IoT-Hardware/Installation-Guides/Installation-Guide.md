---
topic: Installation Guide
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, installation, deployment, thailand, hardware]
related: [Soil-Moisture-Sensors, Temperature-Sensors, Microcontroller-Comparison, Power-Solutions]
---

# Installation Guide

> **Summary**: Step-by-step guide for deploying IoT sensor nodes on a coffee farm in Northern Thailand — from site selection to weatherproofing to network configuration.

---

## Overview

Proper installation is critical for sensor accuracy and system longevity. A poorly installed sensor node gives unreliable data, and a poorly weatherproofed node fails within the first rainy season. Northern Thailand's environment is particularly challenging: 5–6 months of heavy rain, high humidity, intense UV exposure, and frequent thunderstorms. Every component must be selected and installed with these conditions in mind.

This guide covers the complete deployment process for a LoRa-based sensor node with solar power, which is the recommended configuration for most coffee farms in the region.

---

## Pre-Installation Planning

### Step 1: Site Survey

Walk the farm and identify:
- **Sensor node locations**: 1 node per 1–2 rai, covering different soil types and elevation zones
- **Gateway location**: Central, elevated position with clear line-of-sight to sensor nodes (hilltop or farmhouse roof)
- **WiFi coverage**: Map areas within 50m of farmhouse WiFi for potential WiFi nodes
- **Power availability**: Note any locations with mains power (for gateway)
- **4G signal strength**: Test with a phone at the proposed gateway location
- **Shade tree density**: Note areas with heavy shade (different microclimate) vs. exposed areas

### Step 2: Bill of Materials

For each sensor node (adjust based on your configuration):

| Component | Qty | Notes |
|-----------|-----|-------|
| Heltec WiFi LoRa 32 V3 (915MHz) | 1 | MCU + LoRa |
| Capacitive Soil Moisture V1.2 | 1–2 | 15cm and 30cm depth |
| SHT31 module | 1 | Air temp + humidity |
| DS18B20 waterproof | 1 | Soil temperature |
| BH1750 module | 1 | Light/lux |
| DIY leaf wetness sensor | 1 | Optional, for CLR prediction |
| 5V 2W solar panel | 1 | Power |
| 18650 battery 3000mAh | 1 | Power storage |
| IP65 junction box (100×100×50mm) | 1 | Weatherproof enclosure |
| Cable glands (PG7 or PG9) | 4–6 | Waterproof cable entry |
| 4-core cable (for sensors) | 5–10m | Outdoor rated |
| Silicone sealant | 1 tube | Waterproofing |
| PVC conduit (optional) | As needed | Cable protection |
| Pole/mount (steel or treated wood) | 1 | 2m height |

---

## Node Assembly

### Step 3: Firmware Installation

Before going to the field, flash firmware to all Heltec boards:

1. Install Arduino IDE or PlatformIO
2. Install Heltec board support package
3. Install sensor libraries (Adafruit SHT31, OneWire, BH1750, etc.)
4. Configure LoRa frequency to **AS923** (920–923 MHz for Thailand)
5. Set deep sleep interval (recommended: 5 minutes)
6. Set unique node ID for each board
7. Test each sensor on the bench before deployment

### Step 4: Wiring

Wire all sensors to the Heltec V3 board:

| Sensor | Pin | Interface | Notes |
|--------|-----|-----------|-------|
| SHT31 | SDA=GPIO8, SCL=GPIO9 | I2C | 4.7kΩ pull-ups may be needed |
| BH1750 | SDA=GPIO8, SCL=GPIO9 | I2C | Shares I2C bus with SHT31 (different address) |
| DS18B20 | GPIO18 | 1-Wire | 4.7kΩ pull-up between data and VCC |
| Capacitive V1.2 | GPIO1 (ADC) | Analog | Use ADC1 channel (ADC2 doesn't work with WiFi) |
| Leaf wetness | GPIO2 (ADC) | Analog | Voltage divider circuit |

### Step 5: Weatherproofing

**CRITICAL**: Northern Thailand's rainy season will destroy unprotected electronics.

1. **Enclosure**: Place MCU and wiring connections inside an IP65 junction box
2. **Cable glands**: Use PG7/PG9 cable glands for every cable entering the box. Tighten firmly
3. **Conformal coating**: Apply silicone conformal coating to all exposed PCB traces and solder joints on the MCU and sensor modules
4. **Hot glue**: Apply hot glue over the Capacitive V1.2 sensor's top electronics (not the sensing surface)
5. **Desiccant**: Place 1–2 silica gel packets inside the enclosure to absorb condensation moisture
6. **Ventilation**: Drill a small (2mm) weep hole at the bottom of the enclosure for condensation drainage

---

## Field Installation

### Step 6: Mount the Node

1. **Install the pole**: Drive a 2m steel/wood pole into the ground at the selected location
2. **Mount enclosure**: Attach the IP65 box to the pole at ~1.5m height using cable ties or screws
3. **Mount solar panel**: Attach panel to the pole at the top, angled 15–20° facing south
4. **Mount SHT31**: Place in a DIY radiation shield (stacked white PVC plates) at 1.5–2m height
5. **Mount BH1750**: Mount at the same height as SHT31, or at canopy level for shade measurement
6. **Insert soil sensors**: Push Capacitive V1.2 into soil at 15cm depth; bury DS18B20 at 15cm depth
7. **Mount leaf wetness**: Attach at 45° angle within the coffee canopy at ~1m height
8. **Connect battery**: Insert 18650 battery into the Heltec V3's battery connector
9. **Seal everything**: Apply silicone sealant around all cable glands and the weep hole

### Step 7: Gateway Installation

1. **Location**: Mount gateway at the highest point on the farm (rooftop, hilltop) with clear 360° view
2. **Antenna**: Mount the LoRa antenna vertically, as high as possible, away from metal objects
3. **Power**: Connect gateway to mains power with UPS (uninterruptible power supply), or solar + large battery
4. **4G backhaul**: Insert AIS/DTAC SIM card into the 4G module; test internet connectivity
5. **Server**: Configure gateway to forward data to HandySense B-Farm or your self-hosted server

---

## Network Configuration

### Step 8: LoRaWAN Setup

1. Register each sensor node on your LoRaWAN network server (The Things Network, ChirpStack, or HandySense)
2. Record each node's **AppEUI, DevEUI, and AppKey** (printed on the Heltec board or generated)
3. Configure uplink interval: 5 minutes (adjustable; longer interval = longer battery life)
4. Set data rate: SF10 (Spreading Factor 10) is a good balance of range and data rate for Northern Thailand terrain
5. Test connectivity: Power on each node and verify data arrives at the server

### Step 9: Verification Checklist

For each installed node, verify:

- [ ] Soil moisture reading is reasonable (not 0% or 100% constantly)
- [ ] Air temperature is realistic (not 40+°C — if so, check radiation shield)
- [ ] Humidity reading is realistic (not 0% or 100% constantly)
- [ ] Light reading changes with actual sunlight (test by covering the sensor)
- [ ] LoRa signal strength (RSSI) is better than -120 dBm at the gateway
- [ ] Battery voltage is stable above 3.3V
- [ ] No water ingress after first rain (check enclosure interior)

---

## Maintenance Schedule

| Task | Frequency | Time Required |
|------|-----------|---------------|
| Visual inspection of nodes | Monthly | 30 min per node |
| Clean solar panels | Monthly | 5 min per node |
| Check radiation shield for debris/insects | Monthly | 5 min per node |
| Verify sensor readings vs. manual check | Quarterly | 15 min per node |
| Clean rain gauge funnel and bucket | Quarterly | 10 min |
| Recalibrate soil moisture | Every 6 months | 30 min per node |
| Replace desiccant packets | Every 6 months | 5 min per node |
| Replace DHT22/SHT31 sensor | Every 2 years | 15 min per node |
| Replace 18650 battery | Every 2–3 years | 5 min per node |
| DOA soil lab test | 2–4 times per year | Sample collection: 30 min |

---

## Common Problems & Solutions

| Problem | Likely Cause | Solution |
|---------|-------------|----------|
| Node stops sending data | Battery depleted (solar panel dirty/failed) | Clean panel; check battery voltage; replace battery |
| Temperature readings too high | Sensor in direct sun (no radiation shield) | Install or fix radiation shield |
| Soil moisture always 100% | Sensor not inserted properly; or water pooling | Reinsert sensor; check drainage at location |
| LoRa signal lost | Vegetation grew to block line-of-sight | Trim vegetation; move node; add repeater |
| Humidity reading stuck at 99% | Sensor damaged by water ingress | Replace sensor; improve weatherproofing |
| Node resets randomly | Power brownout during LoRa TX | Add 100µF capacitor across power input |
| Data gaps in cloud | 4G SIM data depleted or network issue | Check SIM balance; verify signal strength |

---

## Related Topics

- [[Soil-Moisture-Sensors]] — Soil sensor calibration details
- [[Temperature-Sensors]] — Radiation shield construction
- [[Communication-Modules]] — LoRa and gateway setup
- [[Power-Solutions]] — Solar and battery sizing
- [[System-Cost-Estimate]] — Hardware cost breakdown

---

*Last updated: 2026-05-12*
