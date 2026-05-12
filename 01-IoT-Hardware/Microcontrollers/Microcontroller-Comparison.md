---
topic: Microcontroller Comparison
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, microcontroller, esp32, lora, thailand, hardware]
related: [Communication-Modules, Power-Solutions, System-Cost-Estimate]
---

# Microcontroller Comparison

> **Summary**: The ESP32 DevKit V1 (~120 THB) is the best default MCU for WiFi-range sensor nodes. For coffee farms with mountainous terrain where WiFi doesn't reach, the Heltec WiFi LoRa 32 V3 (~900 THB) with built-in LoRa + battery charging is the top choice. Avoid Arduino Uno (no WiFi, overpriced).

---

## Overview

The microcontroller is the brain of each sensor node — it reads sensor data, processes it, and transmits it to the gateway or cloud. For coffee farm IoT deployment in Northern Thailand, the key selection criteria are: wireless communication range (mountainous terrain), power efficiency (solar/battery operation), GPIO count (connecting multiple sensors), and price (deploying many nodes).

The fundamental trade-off is between **WiFi** (cheap, short range ~100m, high power) and **LoRa** (requires LoRa board, long range ~5–15km, low power). For most coffee farms in Northern Thailand where fields extend across hillsides and valleys, LoRa is essential for at least the remote nodes.

---

## MCU Comparison Table

| Board | Chip | WiFi | LoRa | GPIO | Price (THB) | Power (active) | Deep Sleep | Best For |
|-------|------|------|------|------|-------------|----------------|------------|----------|
| **ESP32 DevKit V1** | ESP32 | ✅ | ❌ | 18 | 100–180 | ~80 mA | ~0.6 mA | ⭐ WiFi nodes |
| ESP8266 NodeMCU | ESP8266 | ✅ | ❌ | 11 | 46–90 | ~70 mA | ~20 µA | Budget WiFi |
| ESP32-CAM | ESP32+S | ✅ | ❌ | 8 | 100–170 | ~150 mA | ~0.6 mA | Camera nodes |
| **Heltec LoRa V3** | ESP32-S3 | ✅ | ✅ SX1262 | 18+ | 800–1,200 | ~100 mA | ~10 µA | ⭐⭐ LoRa nodes (top pick) |
| **LILYGO LoRa32 V2.1** | ESP32 | ✅ | ✅ SX1276 | 18+ | 800–1,200 | ~100 mA | ~10 µA | LoRa nodes |
| Arduino Uno | ATmega328P | ❌ | ❌ | 14 | 120–200 | ~50 mA | N/A | ❌ Not recommended |
| STM32 Blue Pill | STM32F103 | ❌ | ❌ | 37 | 80–150 | ~50 mA | ~20 µA | No WiFi needed |

---

## Recommended: ESP32 DevKit V1 (WiFi Nodes)

| Attribute | Detail |
|-----------|--------|
| **Chip** | ESP-WROOM-32 (ESP32-D0WDQ6) |
| **CPU** | Dual-core Xtensa 32-bit, 240 MHz |
| **WiFi** | 802.11 b/g/n (2.4 GHz) |
| **Bluetooth** | BLE + Classic BT 4.2 |
| **Flash** | 4 MB |
| **GPIO** | 30 pins (18 usable for I/O) |
| **ADC** | 2× 12-bit SAR ADC (18 channels) |
| **Price in THB** | **100–180 THB** |
| **Where to Buy** | Shopee Thailand, Lazada Thailand, AgeBkk, ThaiEasyElec |

**Why ESP32 is the default choice**: At ~120 THB, the ESP32 offers WiFi + Bluetooth, dual-core processing, 18+ GPIO pins, and massive community support with Arduino IDE, PlatformIO, ESP-IDF, and MicroPython. The built-in WiFi works for sensor nodes within range of a farmhouse WiFi router or access point. Use deep sleep mode to extend battery life to weeks or months on a single charge.

**Limitation**: WiFi range is ~50–100m in open air, and significantly less through trees and terrain. For coffee farms with remote nodes beyond WiFi range, you need LoRa.

---

## Recommended: Heltec WiFi LoRa 32 V3 (LoRa Nodes)

| Attribute | Detail |
|-----------|--------|
| **Chip** | ESP32-S3 + SX1262 LoRa |
| **LoRa Frequency** | 868/915 MHz — **get the 915 MHz version for AS923 Thailand** |
| **Display** | 0.96" OLED (SSD1306) |
| **Features** | WiFi + BT + LoRa + OLED + **built-in battery charging** |
| **Price in THB** | **800–1,200 THB** (AliExpress with shipping) |
| **Where to Buy** | AliExpress, Heltec official store |

**Why Heltec V3 is the top LoRa choice**: The V3 revision added built-in battery charging (TP4054), which dramatically simplifies solar + battery deployment. No external charge controller needed — just connect a solar panel and 18650 battery directly. The SX1262 LoRa chip is newer and more efficient than the older SX1276. The built-in OLED display is useful for debugging during installation. **Must select the 915 MHz version** to operate legally on Thailand's AS923 (920–923 MHz) band.

### LILYGO TTGO LoRa32 V2.1 — Alternative

Similar to Heltec V3 but uses the older SX1276 LoRa chip and lacks built-in battery charging. Slightly more community support. Same price range (800–1,200 THB). Also needs the 915 MHz version for Thailand.

---

## Thailand-Specific LoRa Frequency Warning

> ⚠️ **CRITICAL**: Thailand uses **AS923 band (920–923 MHz)** for LoRa. You MUST purchase 915 MHz LoRa boards (which operate in the 902–928 MHz range covering AS923). EU868 (868 MHz) and US915 (902–928 MHz, different channel plan) boards may not be legal or compatible with Thai LoRaWAN networks.

---

## Power Budget Comparison

| MCU | WiFi Active | LoRa TX | Deep Sleep | Sensor Reading |
|-----|------------|---------|------------|----------------|
| ESP32 DevKit V1 | ~80 mA | N/A | ~0.6 mA | ~20 mA |
| Heltec LoRa V3 | ~80 mA | ~120 mA (brief) | ~10 µA | ~20 mA |
| ESP8266 NodeMCU | ~70 mA | N/A | ~20 µA | ~15 mA |

**Practical battery life** (18650 3000mAh, 5-min reading interval, deep sleep between readings):
- ESP32 WiFi node: ~7–14 days (without solar)
- Heltec LoRa V3 node: ~10–20 days (without solar)
- With 5V 2W solar panel: **continuous operation year-round** in Thailand

---

## Related Topics

- [[Communication-Modules]] — LoRa, WiFi, 4G details
- [[Power-Solutions]] — Solar + battery setup
- [[System-Cost-Estimate]] — Total system cost per node

---

*Last updated: 2026-05-12*
