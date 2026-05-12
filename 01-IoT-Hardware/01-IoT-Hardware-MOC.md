# 🔌 IoT Hardware & Sensors

> Sensors, microcontrollers, communication modules, power solutions, and cost estimates for deploying IoT monitoring on coffee farms in Thailand.

---

## Sensors

| Sensor | File | Status |
|--------|------|--------|
| Soil Moisture | [[Soil-Moisture-Sensors]] | ✅ Complete |
| Temperature | [[Temperature-Sensors]] | ✅ Complete |
| Air Humidity | [[Humidity-Sensors]] | ✅ Complete |
| Rainfall | [[Rainfall-Sensors]] | ✅ Complete |
| Light / PAR | [[Light-Sensors]] | ✅ Complete |
| Soil pH | [[Soil-pH-Sensors]] | ✅ Complete |
| Soil NPK | [[NPK-Sensors]] | ✅ Complete |
| Wind Speed | [[Wind-Sensors]] | ✅ Complete |
| Leaf Wetness | [[Leaf-Wetness-Sensors]] | ✅ Complete |

## Microcontrollers

| Board | File | Status |
|-------|------|--------|
| ESP32 / ESP8266 / Heltec / LILYGO / Arduino | [[Microcontroller-Comparison]] | ✅ Complete |

## Communication

| Type | File | Status |
|------|------|--------|
| LoRa AS923 / WiFi / 4G LTE / NB-IoT | [[Communication-Modules]] | ✅ Complete |

## Power

| Type | File | Status |
|------|------|--------|
| Solar + Battery + Charge Controller | [[Power-Solutions]] | ✅ Complete |

## Cost & Installation

| Topic | File | Status |
|-------|------|--------|
| System Cost Estimate (5-10 rai farm) | [[System-Cost-Estimate]] | ✅ Complete |
| Installation Guide (field deployment) | [[Installation-Guide]] | ✅ Complete |

---

## Key Findings

| Finding | Detail |
|---------|--------|
| ⚠️ LoRa frequency | Must use **AS923 (920–923 MHz)** — EU868 and US915 NOT legal in Thailand |
| ⚠️ 2G phase-out | **Never use SIM800L** — Thailand shutting down 2G. Use A7670 (4G LTE) |
| ⭐ Best value soil moisture | Capacitive V1.2 at **35 THB** (avoid resistive FC-28) |
| ⭐ Best value air sensor | SHT31 at **115 THB** (better than DHT22 for stability) |
| ⭐ Best MCU for LoRa | Heltec WiFi LoRa 32 V3 at **900 THB** (built-in battery charging) |
| ⭐ Recommended gateway | RAK7268 at **6,300 THB** (8-channel, reliable) |
| ⚠️ NPK sensors unreliable | Budget 7-in-1 sensors off by 50–200%; use DOA lab tests (200–500 THB) |
| ⚠️ pH can't be buried | Glass electrodes degrade in days; use periodic spot-checks only |
| 💰 DIY LoRa system (10 rai) | **~25,600 THB** total; payback in 4–8 months |

---

← [[Home]] | [[02-Environment-MOC|Environment →]]
