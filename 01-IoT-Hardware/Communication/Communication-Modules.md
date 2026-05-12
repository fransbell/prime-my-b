---
topic: Communication Modules
phase: 1
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [iot, communication, lora, wifi, gsm, thailand, hardware]
related: [Microcontroller-Comparison, Power-Solutions, System-Cost-Estimate]
---

# Communication Modules

> **Summary**: For Northern Thailand's mountainous coffee terrain, LoRa (AS923, 920–923 MHz) is essential for long-range sensor communication (5–15km). WiFi works only near the farmhouse. 4G LTE (A7670 module) is needed for backhaul. **Never use SIM800L (2G) — Thailand is shutting down 2G networks.**

---

## Overview

Communication is the critical link between sensor nodes in the field and the data dashboard the farmer sees. The choice of communication technology determines the maximum range between sensors and gateway, power consumption, data rate, and monthly operating costs. For coffee farms in Northern Thailand, the mountainous terrain creates a fundamental challenge: WiFi range is severely limited by hills and tree canopy, while LoRa's long range easily covers entire farms from a single gateway.

The typical architecture uses a **two-tier communication system**: sensor nodes communicate with a gateway using LoRa (long range, low power), and the gateway forwards data to the cloud using WiFi or 4G LTE (high bandwidth, internet access).

---

## Technology Comparison

| Technology | Range | Power | Data Rate | Monthly Cost | Best For |
|-----------|-------|-------|-----------|-------------|----------|
| **WiFi** | 50–100m (open air) | High | 54 Mbps | Free | Indoor, farmhouse proximity |
| **LoRa** | 5–15 km (line of sight) | Very Low | 0.3–50 kbps | Free (private) | ⭐ Farm sensor network |
| **4G LTE** | Anywhere with coverage | High | 10–50 Mbps | 99–399 THB/mo | Gateway backhaul |
| NB-IoT | 1–10 km | Very Low | 26–127 kbps | 50–150 THB/mo | Alternative to LoRa |

---

## LoRa — Primary Farm Communication

### Thailand Frequency: AS923 (920–923 MHz)

> ⚠️ **MUST use AS923**. EU868 (868 MHz) is NOT legal in Thailand. US915 channel plan is different from AS923 even though the hardware may be the same frequency range. Always configure your LoRa devices for AS923.

### LoRa Node Options

| Option | MCU + LoRa | Price (THB) | Notes |
|--------|-----------|-------------|-------|
| **Heltec WiFi LoRa 32 V3** | ESP32-S3 + SX1262 | 800–1,200 | ⭐ Top pick: built-in battery charging |
| **LILYGO TTGO LoRa32 V2.1** | ESP32 + SX1276 | 800–1,200 | Alternative; more community support |
| SX1276 bare module | Separate + ESP32 | 200–400 | DIY approach; more wiring |

### LoRaWAN Gateway Options

| Gateway | Channels | Price (THB) | Where to Buy | Best For |
|---------|----------|-------------|--------------|----------|
| **Dragino LG01-P** | 1 channel | 4,000–5,000 | AliExpress | Small farm, budget |
| **RAK7268** | 8 channels | 5,000–8,000 | AliExpress, RAK Store | ⭐ Best value |
| **SenseCAP M2** | 8 channels | 8,000–12,000 | Seeed, AliExpress | Premium, easy setup |
| Kerlink Wirnet iFemtoCell | 8 channels | 15,000–20,000 | Professional | Enterprise |

**Recommendation**: The RAK7268 at ~6,000 THB is the sweet spot — 8 channels handle dozens of sensor nodes simultaneously, reliable performance, and good community support. The single-channel Dragino LG01-P is tempting at 4,000 THB but can only receive on one frequency at a time, causing missed messages when multiple nodes transmit simultaneously.

### Private vs. Public LoRaWAN

| Option | Monthly Cost | Pros | Cons |
|--------|-------------|------|------|
| **Private network** (own gateway + server) | Free | No subscription; full control; works without internet | Must set up and maintain server |
| **The Things Network (TTN)** | Free (fair use) | Global community network; easy setup | Limited uplink time (30 sec/day); data goes through public servers |
| **HandySense B-Farm** (Thai gov) | Free | Thai language; government-supported; AI features | May require specific hardware; newer platform |
| **Commercial (e.g., AIS, DTAC)** | 99–299 THB/mo | SLA; support; integration | Ongoing cost |

---

## WiFi — Short-Range Communication

WiFi (built into ESP32) is suitable for sensor nodes within 50–100m of a WiFi access point, typically near the farmhouse or processing area. Use a WiFi range extender or outdoor access point (e.g., TP-Link CPE210, ~1,200 THB) to extend coverage to nearby fields.

**Limitation in mountainous terrain**: WiFi's 2.4 GHz signal is severely attenuated by dense vegetation and terrain obstacles. In a coffee farm with hills and mature shade trees, expect 30–50m effective range, not the theoretical 100m.

---

## 4G LTE — Gateway Backhaul

### ⚠️ NEVER Use SIM800L (2G) — Thailand is Shutting Down 2G

Thailand's major carriers (AIS, DTAC/Nation, TrueMove) are progressively shutting down 2G and 3G networks through 2026–2027. The SIM800L module (2G only) will become a paperweight. Always use **4G LTE modules**.

### 4G LTE Modules

| Module | Price (THB) | Where to Buy | Notes |
|--------|-------------|--------------|-------|
| **A7670S core board** | 500–800 | Shopee Thailand | ⭐ Recommended 4G module |
| **SIM7600CE** | 800–1,200 | Shopee, AliExpress | Alternative 4G module |
| **TTGO T-Call A7670** (ESP32 + A7670) | ~1,345 | Lazada Thailand | ⭐ All-in-one: ESP32 + 4G |

### SIM Card Options (Thailand)

| Carrier | Data Plan | Price (THB/mo) | Notes |
|---------|-----------|-----------------|-------|
| AIS | 2 GB/mo | ~99 | Best rural coverage |
| DTAC/Nation | 2 GB/mo | ~99 | Good coverage in N. Thailand |
| TrueMove | 2 GB/mo | ~79 | Cheaper but less rural coverage |
| **IoT-specific SIMs** | Varies | 50–150 | Lower cost for small data; check with carrier |

For LoRaWAN gateway backhaul, 500 MB–2 GB per month is sufficient (sensor data is very small — typically <100 bytes per reading). An IoT-specific SIM with low data allowance is the most cost-effective option.

---

## NB-IoT — Emerging Option

NB-IoT (Narrowband IoT) is a low-power wide-area cellular technology designed specifically for IoT. It uses existing cellular infrastructure but with much lower power consumption and cost than 4G LTE. However, NB-IoT coverage in rural Northern Thailand is still limited compared to 4G. Check coverage maps from AIS and DTAC before committing to NB-IoT.

**Recommendation**: For 2026, stick with LoRa + 4G LTE backhaul. NB-IoT is worth reconsidering in 2027–2028 as coverage improves.

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    CLOUD / SERVER                     │
│         (HandySense B-Farm / TTN / Self-hosted)       │
└──────────────────────────┬──────────────────────────┘
                           │ Internet
                           │
                    ┌──────┴──────┐
                    │   GATEWAY    │
                    │  RAK7268     │
                    │  + 4G LTE    │  (~7,000 THB)
                    └──────┬──────┘
                           │ LoRa AS923 (5–15 km)
              ┌────────────┼────────────┐
              │            │            │
         ┌────┴────┐  ┌───┴────┐  ┌───┴────┐
         │ NODE 1  │  │ NODE 2 │  │ NODE 3 │
         │ Heltec  │  │ Heltec │  │ Heltec │
         │ +Sensors│  │ +Sensors│  │ +Sensors│
         │ +Solar  │  │ +Solar │  │ +Solar │
         └─────────┘  └────────┘  └────────┘
          (~1,500 THB) (~1,500 THB) (~1,500 THB)
```

---

## Related Topics

- [[Microcontroller-Comparison]] — MCU boards with built-in LoRa
- [[Power-Solutions]] — Powering remote LoRa nodes
- [[System-Cost-Estimate]] — Full system cost breakdown
- [[Government-Programs]] — HandySense B-Farm free platform

---

*Last updated: 2026-05-12*
