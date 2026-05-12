---
topic: Suppliers in Thailand
phase: 06-Resources
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [suppliers, iot, sensors, coffee, equipment, thailand, hardware, fertilizer, processing]
related: [[Research-Papers]], [[Government-Programs]], [[System-Cost-Estimate]], [[Installation-Guide]]
---

# Suppliers in Thailand

> **Summary**: Comprehensive directory of suppliers available in Thailand for IoT sensors, microcontrollers, communication modules, coffee farming equipment, fertilizers, and processing machinery — with pricing in THB and Northern Thailand delivery considerations.

---

## Overview

Building an IoT-driven coffee monitoring system requires sourcing hardware components that are available, affordable, and deliverable within Thailand. This guide catalogues all major suppliers organized into three categories: (1) IoT and electronics suppliers for sensors, microcontrollers, LoRa modules, and solar power; (2) coffee farming supply companies for fertilizers, processing equipment, and irrigation; and (3) online marketplaces and community platforms where farmers and developers can find both. All prices are in Thai Baht (THB) and reflect market conditions as of 2026.

For Northern Thailand specifically, the key consideration is delivery logistics — many electronics suppliers are Bangkok-based, but offer nationwide shipping via Kerry, Flash, or Thailand Post within 2-5 business days. For urgent needs, Chiang Mai has several local electronics shops, and R3 Solar Cell in Chiang Mai provides solar equipment directly in coffee-growing regions.

---

## IoT & Electronics Suppliers

### Thai Electronics Distributors

| Supplier | Specialty | Key Products | Price Range (THB) | Location | Website |
|----------|-----------|-------------|-------------------|----------|---------|
| **KhawTECH** | IoT & LoRa farming | ESP32 LoRa Board Kit, Heltec LoRa V3, sensor bundles | 150-5,000 | Bangkok | khawtech.com |
| **ThaiEasyElec** | Official distributor | Arduino Nano ESP32, Grove sensors, DFRobot modules | 50-5,000 | Bangkok | thaieasyelec.com |
| **ArduinoAll** | Budget sensors | Capacitive soil moisture (18 THB), ESP32-C3 (120 THB), DHT22 | 15-2,000 | Bangkok | arduinoall.com |
| **AnalogRead** | Environmental sensors | DFRobot weather station kits, SHT31, BME280 | 100-15,000 | Bangkok | analogread.com |
| **FromFactory** | Industrial sensors | Ultrasonic weather sensors, industrial-grade NPK probes | 500-15,000 | Bangkok | fromfactory.asia |
| **IoT e-Shop** | Weather station kits | Solar-powered weather stations, wind speed, rainfall | 200-8,000 | Online | iot-eshop.com |
| **CyberTice** | Budget MCUs | Generic ESP32 boards, ESP8266, sensor modules | 50-1,500 | Bangkok | cybertice.com |
| **ModuleMore** | Arduino boards | Authentic Arduino Nano ESP32, original sensors | 100-3,000 | Bangkok | modulemore.com |
| **AgeBkk** | Sensors & components | Capacitive V1.2 soil moisture (45 THB), pH modules | 30-3,000 | Bangkok | agebkk.com |
| **AS99 Shop** | Sensors & modules | Capacitive V1.2 (45 THB), BH1750 light sensor, SHT31 | 25-2,000 | Bangkok | as99shop.com |

---

### Sensor-Specific Sourcing Guide

#### Soil Moisture Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| Capacitive V1.2 | 18-45 | ArduinoAll (18), Lazada (31.70), Shopee (35-45), AgeBkk (45) | Best value; analog output |
| Grove Capacitive | 240-300 | ThaiEasyElec | Grove connector; easier wiring |
| Dragino LSE01 | 4,000-5,000 | Dragino Store (AliExpress) | LoRaWAN all-in-one; IP68 probe |
| SenseCAP S2105 | 5,000-6,000 | Seeed Studio (AliExpress) | Professional LoRaWAN sensor |
| FC-28 Resistive | 15-25 | Shopee, Lazada | AVOID — corrodes in soil |

#### Temperature & Humidity Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| DHT22 | 55-90 | ArduinoAll, Shopee | Budget; ±0.5°C / ±2% RH |
| SHT31 | 120-200 | ThaiEasyElec, AgeBkk | Recommended; ±0.3°C / ±2% RH |
| BME280 | 90-180 | ArduinoAll, Shopee | Temp + humidity + pressure combo |
| DS18B20 | 25-50 | ArduinoAll, Shopee | Waterproof probe; soil temperature |

#### Light Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| BH1750 | 25-50 | ArduinoAll, Shopee | Lux measurement; PAR proxy via Cave Pearl method |
| TSL2561 | 80-150 | ThaiEasyElec | More accurate; IR + visible channels |

#### Soil pH & NPK Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| DFRobot SEN0161-V2 (pH) | 350-500 | AnalogRead, ThaiEasyElec | Cannot be buried; periodic measurement only |
| 7-in-1 NPK+pH+EC | 1,380-4,525 | Shopee, AliExpress | Budget models unreliable (50-200% error); RS485 interface |
| Professional NPK probe | 5,000-15,000 | FromFactory | Industrial-grade; requires calibration |

#### Rainfall Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| Rain drop module | 25-50 | ArduinoAll, Shopee | AVOID — only detects presence, not amount |
| Tipping bucket | 1,200-2,300 | AnalogRead, AliExpress | Recommended; measures actual rainfall mm |
| DFRobot Weather Station kit | 2,500-5,000 | AnalogRead | Multiple parameters; integrated design |

#### Wind & Leaf Wetness Sensors

| Sensor | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| Cup anemometer (RS485) | 2,000-4,000 | FromFactory, AliExpress | Wind speed + direction combined |
| Dragino LLMS01 (leaf wetness) | 800-1,200 | Dragino Store (AliExpress) | LoRaWAN leaf wetness sensor |
| DIY leaf wetness | 50-100 | Self-built | Two screws on PCB + voltage divider; see Leaf-Wetness-Sensors guide |

---

### LoRa & Communication Modules

| Module | Price (THB) | Supplier | Notes |
|--------|-------------|----------|-------|
| ESP32 DevKit V1 | 100-140 | ArduinoAll, CyberTice | WiFi + BLE; no LoRa |
| Heltec WiFi LoRa 32 V3 | 450-550 | KhawTECH, AliExpress | ESP32-S3 + SX1262 LoRa; AS923 supported |
| LILYGO T-Beam | 600-900 | KhawTECH, AliExpress | ESP32 + LoRa + GPS |
| RAK3172 LoRaWAN Module | 300-500 | RAKwireless (AliExpress) | Standalone LoRaWAN; low power |
| A7670 4G LTE Module | 350-600 | AliExpress, Shopee | 4G LTE; never use SIM800L (2G phase-out) |

#### LoRa Gateways

| Gateway | Price (THB) | Supplier | Notes |
|---------|-------------|----------|-------|
| RAK7268 (8-channel) | 3,000-5,000 | RAKwireless (AliExpress) | Recommended; AS923; WiFi + Ethernet backhaul |
| Dragino LPS8 | 2,500-4,000 | Dragino Store (AliExpress) | 8-channel; open-source; good documentation |
| Mikrotik wAP LR kit | 2,000-3,000 | Mikrotik distributors | Single channel; budget option |
| RAK7289 (16-channel) | 8,000-15,000 | RAKwireless | Professional; outdoor-rated; solar-ready |

---

### Solar & Power Solutions

| Component | Price (THB) | Supplier | Notes |
|-----------|-------------|----------|-------|
| 5W Solar Panel | 100-200 | R3 Solar Cell (Chiang Mai), Shopee | Sufficient for ESP32 + 2-3 sensors |
| 10W Solar Panel | 200-400 | R3 Solar Cell, Lazada | Recommended for LoRa nodes with more sensors |
| 18650 Battery (3.7V 2600mAh) | 50-100 | Shopee, Lazada | 1-2 per node; 150+ days on single charge |
| TP4056 Charge Module | 15-25 | ArduinoAll, Shopee | Solar charging + battery protection |
| Solar Charge Controller | 150-500 | R3 Solar Cell, Solaris Green | For larger panels (>10W) |

#### Solar Suppliers in Thailand

| Supplier | Location | Specialty | Website |
|----------|----------|-----------|---------|
| **R3 Solar Cell** | Chiang Mai | Small-mid solar panels, charge controllers, batteries | r3solarcell.com |
| **Solaris Green Energy** | Bangkok | Complete solar systems, industrial | solaris.co.th |
| **MonoSun** | Phuket | Solar panels, off-grid systems | monosun.co.th |
| **GSL Energy** | Bangkok | Solar batteries, energy storage | gslenergy.com |

---

## Coffee Farming Supply Companies

### Fertilizer Suppliers

| Supplier | Type | Products | Price Range (THB) | Contact |
|----------|------|----------|-------------------|---------|
| **Sebring** | Foliar/specialty | Coffee-specific foliar fertilizers, micronutrient blends | 200-800/bottle | sebring.co.th |
| **FarmKaset** | Organic/chemical | FK-1 formula (coffee-specific NPK), organic compost | 150-600/bag | farmkaset.com |
| **Lazada/Shopee** | Marketplace | Organic compost, NPK 15-15-15, coffee fertilizer blends | 51-500/bag | lazada.co.th, shopee.co.th |
| **DOA Soil Lab** | Testing | Soil analysis (pH, NPK, organic matter) — 200-500 THB/test | 200-500/test | Provincial DOA offices |

**Coffee Fertilizer Recommendations by Stage:**

| Stage | NPK Ratio | Application Rate | Organic Alternative |
|-------|-----------|-----------------|---------------------|
| Vegetative growth | 25-7-7 | 100g/tree, 3x/year | Composted manure 2kg/tree |
| Flowering | 12-12-17 | 80g/tree, 2x/year | Bone meal + wood ash |
| Fruit development | 13-13-21 | 100g/tree, 2x/year | Coffee pulp compost |
| Post-harvest recovery | 15-15-15 | 150g/tree, 1x/year | Vermicompost 3kg/tree |

---

### Coffee Processing Equipment

| Equipment | Price Range (THB) | Supplier | Notes |
|-----------|-------------------|----------|-------|
| Manual cherry pulper | 3,000-8,000 | BOWA, VMAC Industries | Hand-crank; 50-100 kg/hr |
| Motorized pulper | 15,000-40,000 | CoffeeWORKS, VMAC | 200-500 kg/hr |
| Honey washing machine | 20,000-50,000 | Custom build | Remove mucilage for honey process |
| Drum roaster (1.2 kg) | 25,000-45,000 | Sun Roaster Thailand | Sample roasting; small batch |
| Drum roaster (5 kg) | 80,000-150,000 | Sun Roaster Thailand, CoffeeWORKS | Community enterprise scale |
| Drum roaster (15 kg) | 200,000-400,000 | CoffeeWORKS, Probat (import) | Commercial scale |
| Solar dryer / raised beds | 5,000-20,000 | DIY or local carpenter | Greenhouse-style; UV-resistant plastic |
| Mechanical dryer | 50,000-200,000 | CoffeeWORKS | Temperature-controlled; consistent drying |
| Huller / peeler | 15,000-40,000 | VMAC Industries | Parchment to green bean |
| Gravity sorter / size grader | 10,000-30,000 | CoffeeWORKS | Sort green beans by size/weight |

#### Processing Equipment Suppliers

| Supplier | Location | Specialty | Website | Phone |
|----------|----------|-----------|---------|-------|
| **Sun Roaster Thailand** | Ubon Ratchathani | Coffee roasters (1.2-15 kg), roasting accessories | sunroasterthailand.com | Contact via website |
| **CoffeeWORKS** | Bangkok (nationwide) | Full-line coffee equipment; roasters, grinders, pulpers | coffeeworks.co.th | 02-xxx-xxxx |
| **BOWA** | Chiang Mai | Cherry pulpers, hullers, processing equipment | bowa.co.th | Contact via Facebook |
| **VMAC Industries** | Chiang Mai | Agricultural processing equipment | vmac.co.th | Contact via website |

---

### Irrigation Equipment

| Supplier | Location | Specialty | Website |
|----------|----------|-----------|---------|
| **Kanok Group** | Bangkok (nationwide) | Thailand's largest irrigation supplier; drip, sprinkler, hose | kanok.co.th |
| **Netafim Thailand** | Bangkok | Professional drip irrigation; water-efficient systems | netafim.com/th |
| **Agri Solutions Asia** | Chiang Mai | Farm irrigation design and installation | agrisolutionsasia.com |
| **Thaitara** | Bangkok | Agricultural equipment; pumps, pipes, sprinklers | thaitara.co.th |

**Drip Irrigation Cost Estimate for Coffee:**

| Component | Cost/rai (THB) | Notes |
|-----------|---------------|-------|
| Main line (PVC 32mm) | 1,500-2,500 | From water source to field |
| Sub-main line (PVC 25mm) | 800-1,500 | Along coffee rows |
| Drip tape (16mm) | 2,000-3,500 | 2 lines per row, 267 trees/rai |
| Fittings & connectors | 500-1,000 | Tees, elbows, valves |
| Filter + pressure regulator | 500-1,500 | Essential for drip |
| Pump (if needed) | 3,000-8,000 | 0.5-1 HP, depending on elevation |
| **Total per rai** | **8,300-18,000** | DIY installation; add 30-50% for professional install |

---

### Shade Tree Seedlings

| Source | Species Available | Price (THB/tree) | Notes |
|--------|-------------------|-------------------|-------|
| Royal Forest Department | Inga edulis, Gliricidia, Leucaena, Erythrina | Free-20 | Government nurseries; limited stock |
| Arabigo Thailand | Inga, shade tree seedlings | 30-80 | Specialty nursery; online orders |
| Local nurseries (N. Thailand) | Various native species | 10-50 | Check provincial agricultural offices |
| Facebook groups | Inga, fruit trees (lychee, banana) | 10-30 | Farmer-to-farmer; quality varies |

**Recommended Shade Tree Species for Coffee:**

| Species | Shade % | Additional Benefits | Growth Rate | Notes |
|---------|---------|---------------------|-------------|-------|
| Inga edulis (Ice-cream bean) | 40-60% | Nitrogen fixation; edible fruit; leaf mulch | Fast (2-3 yr to shade) | Most recommended by Khun Mae Kuang research |
| Gliricidia sepium | 30-50% | Nitrogen fixation; live fence; firewood | Very fast (1-2 yr) | Coppices well; pollard for shade control |
| Leucaena leucocephala | 40-60% | Nitrogen fixation; high biomass | Fast | Invasive potential — manage carefully |
| Erythrina spp. | 30-50% | Nitrogen fixation; ornamental | Moderate | Traditional Thai coffee shade tree |
| Lychee (Litchi chinensis) | 40-60% | Fruit income; dual crop | Slow (5-7 yr) | Used at Doi Tung; premium fruit |
| Banana (Musa spp.) | 20-40% | Fruit income; windbreak; temporary shade | Very fast (1 yr) | Nurse crop for young coffee |

---

## Online Marketplaces & Platforms

### E-Commerce Platforms

| Platform | IoT Sensors | Coffee Supplies | Typical Delivery | Notes |
|----------|-------------|-----------------|-----------------|-------|
| **Lazada Thailand** | ESP32 from 46 THB; NPK sensors from 755 THB | Coffee fertilizer from 51 THB; seedlings from 10 THB | 2-7 days | LazMall for warranty; check seller ratings |
| **Shopee Thailand** | Modela IOT Store (Smart Farm kit 6,048 THB); individual sensors cheapest here | Fertilizer, equipment | 2-5 days | Often cheaper than Lazada; free shipping vouchers |
| **AliExpress** | Dragino, SenseCAP, RAK modules | Limited coffee supplies | 10-30 days | Best for LoRa modules; longer delivery |
| **Thai SME-GP** | Government-registered prices | Verified suppliers only | Varies | For formal procurement; registered businesses only |

---

### Facebook Groups & Communities

| Group Name | Members | Focus | Language |
|------------|---------|-------|----------|
| กลุ่มปลูกกาแฟอาราบิก้า โรบัสต้า โกโก้ ทางภาคเหนือ | 130,000+ | Seedlings, farming advice, marketplace | Thai |
| Thai Coffee Developers | 15,000+ | Technology, processing, roasting | Thai/English |
| Specialty Coffee Club Thailand | 20,000+ | Specialty coffee, cupping, market | Thai/English |
| Thai Coffee Association | 10,000+ | Industry news, events, networking | Thai |
| Smart Farm Thailand | 8,000+ | IoT, sensors, smart agriculture | Thai |
| สมาคมกาแฟไทย (Thai Coffee Association) | 5,000+ | Official association events and policy | Thai |

---

### Smart Farm System Integrators

| Company | Services | Price Range (THB) | Contact |
|---------|----------|-------------------|---------|
| **Smart Farm (Thailand) Co.** | Full system design, installation, training | 50,000-500,000+ | smartfarmthai.com |
| **SmartFarmDIY** | DIY kits, open-source designs, community support | 5,000-50,000 | Facebook: SmartFarmDIY |
| **SmartAISolution** | AI + IoT farm monitoring, data analytics | 100,000+ | smartsolution.co.th |
| **NECTEC HandySense** | Open-source IoT platform, free cloud, DIY sensors | 2,000-5,000/node (DIY) | handysense.nectec.or.th |

---

## Northern Thailand Delivery Considerations

### Shipping to Coffee-Growing Provinces

| Province | Kerry Express | Flash Express | Thailand Post | Notes |
|----------|---------------|---------------|---------------|-------|
| Chiang Mai (city) | 1-2 days | 1-2 days | 2-3 days | All suppliers deliver here |
| Chiang Rai | 2-3 days | 2-3 days | 3-4 days | Good coverage |
| Mae Hong Son | 3-5 days | 3-5 days | 4-7 days | Limited courier coverage; use Thailand Post |
| Nan | 2-3 days | 2-3 days | 3-5 days | Good coverage |
| Lampang | 2-3 days | 2-3 days | 3-4 days | Good coverage |
| Tak | 2-3 days | 2-3 days | 3-4 days | Good coverage |

### Local Electronics Shops in Chiang Mai

| Shop | Location | Products | Notes |
|------|----------|----------|-------|
| R3 Solar Cell | Chiang Mai | Solar panels, batteries, charge controllers | Near coffee regions; knowledgeable staff |
| ThaiEasyElec pickup | Bangkok only | Online order + delivery | No Chiang Mai walk-in |
| Warorot Market area | Chiang Mai Old City | Basic electronics, wires, tools | For cables, connectors, tools |
| Chiang Mai University area | CMU | Electronics shops near engineering dept. | Student-priced components |

---

## Budget Summary: Component Sourcing by Tier

### Budget WiFi Node (~690 THB)

| Component | Price (THB) | Source |
|-----------|-------------|--------|
| ESP32 DevKit V1 | 120 | ArduinoAll |
| Capacitive V1.2 soil moisture | 18 | ArduinoAll |
| DHT22 (temp + humidity) | 60 | ArduinoAll |
| BH1750 (light) | 30 | ArduinoAll |
| DS18B20 (soil temp) | 30 | ArduinoAll |
| PCB + wires + enclosure | 100 | Local shop |
| 18650 battery + holder | 80 | Shopee |
| 5W solar panel | 150 | R3 Solar Cell |
| TP4056 charge module | 20 | ArduinoAll |
| **Total** | **~608** | DIY assembly |

### Mid-Range LoRa Node (~1,460 THB)

| Component | Price (THB) | Source |
|-----------|-------------|--------|
| Heltec WiFi LoRa 32 V3 | 500 | KhawTECH |
| Capacitive V1.2 soil moisture | 18 | ArduinoAll |
| SHT31 (temp + humidity) | 150 | ThaiEasyElec |
| BH1750 (light) | 30 | ArduinoAll |
| DS18B20 (soil temp) | 30 | ArduinoAll |
| Rain drop sensor (budget) | 30 | ArduinoAll |
| Weatherproof enclosure | 200 | DIY / local |
| 18650 battery + holder | 150 | Shopee |
| 10W solar panel | 250 | R3 Solar Cell |
| TP4056 + wiring | 50 | ArduinoAll |
| **Total** | **~1,408** | DIY assembly |

### Professional LoRaWAN System (10-rai farm, ~25,600 THB)

| Component | Price (THB) | Source |
|-----------|-------------|--------|
| RAK7268 LoRaWAN Gateway | 4,000 | RAKwireless (AliExpress) |
| Dragino LSE01 soil sensor x5 | 22,500 | Dragino Store (AliExpress) |
| Weather station x1 | 5,000 | AnalogRead |
| Solar + battery for gateway | 2,000 | R3 Solar Cell |
| Mounting + cables + enclosure | 2,100 | Local |
| **Total** | **~35,600** | Mix of import + local |

---

## Practical Recommendations

1. **For budget builds**: Source all basic sensors from ArduinoAll or Shopee Thailand. They offer the lowest prices on ESP32 boards and capacitive soil moisture sensors, with 2-3 day delivery nationwide.
2. **For LoRa systems**: Buy Heltec LoRa V3 from KhawTECH (Thai stock, fast shipping). Avoid importing LoRa modules individually due to long AliExpress delivery times.
3. **For solar equipment**: Use R3 Solar Cell in Chiang Mai for local pickup — they are geographically closest to coffee-growing regions and can advise on panel sizing.
4. **For processing equipment**: Contact BOWA (Chiang Mai) for pulpers and hullers; they understand the needs of small-scale Northern Thailand coffee farmers and offer local service.
5. **For fertilizers**: Check Lazada and Shopee first for competitive pricing; for bulk orders (>1 ton), contact FarmKaset or Sebring directly for wholesale pricing.
6. **For irrigation**: Kanok Group is Thailand's largest irrigation supplier with the best prices. For professional design and installation in Northern Thailand, Agri Solutions Asia (Chiang Mai) provides local service.
7. **For community purchases**: Pool orders with neighboring farmers for volume discounts on sensors, solar panels, and drip irrigation kits. Community Enterprise status enables access to BAAC 0.01% interest loans for equipment purchases.
8. **Avoid 2G modules**: Do NOT purchase SIM800L or any 2G communication module. Thailand's 2G networks are being phased out. Use 4G LTE (A7670) or LoRa instead.

---

## Related Topics

- [[Research-Papers]] — Academic and technical references
- [[Government-Programs]] — Financial support for equipment purchases
- [[System-Cost-Estimate]] — Detailed cost analysis for all system tiers
- [[Installation-Guide]] — Field deployment instructions
- [[Communication-Modules]] — LoRa, WiFi, and 4G LTE technical details
- [[Power-Solutions]] — Solar and battery system design

---

*Last updated: 2026-05-12*
