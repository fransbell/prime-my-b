---
topic: Government IoT Platforms in Thailand
phase: 07-Competitive-Landscape
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [government, iot, platform, nectec, handysense, depa, agriculture-4.0, predictive-farming, thailand, dashboard, yield-prediction]
related: [[Commercial-IoT-Products]], [[Coffee-Region-Projects]], [[Overlap-Analysis]], [[Government-Programs]], [[Visualization-Dashboard]]
---

# Government IoT Platforms in Thailand

> **Summary**: Comprehensive analysis of Thai government-backed IoT agriculture platforms — HandySense B-Farm, NECTEC Predictive Farming Platform, DEPA OTOD, and Agriculture 4.0 — their capabilities in sensor monitoring, dashboards, and yield/quality prediction, and where they fall short of Prime My B's coffee-specific vision.

---

## Overview

The Thai government has invested significantly in IoT agriculture through multiple agencies and programs. NECTEC (National Electronics and Computer Technology Center) under NSTDA has developed the country's flagship open-source IoT platform (HandySense), while DEPA (Digital Economy Promotion Agency) drives technology adoption through community grants and training. The national Agriculture 4.0 strategy provides the policy framework that coordinates these efforts. These government platforms represent the most significant overlap with Prime My B because they are free, widely available, and backed by institutional resources. However, they share a critical limitation: they are **crop-agnostic general-purpose tools** that lack the coffee-specific models, Northern Thailand regional specialization, and quality prediction capabilities that Prime My B would provide. Understanding these platforms in detail is essential for positioning Prime My B as either a complementary layer on top of government infrastructure or a differentiated standalone product.

---

## HandySense B-Farm (NECTEC/NSTDA)

### Profile

HandySense B-Farm is Thailand's most deployed government IoT agriculture platform. Originally developed as a basic sensor device around 2019-2021, it evolved into HandySense Pro V3 and then the full B-Farm platform launched in February 2025. The platform combines IoT sensor data with AI analytics and big data processing, marketed as enabling "improved yields through cost reduction and optimal resource use." NECTEC claims the platform is "proven to increase farmer income by at least 20%."

| Parameter | Details |
|-----------|---------|
| **Developer** | NECTEC / NSTDA |
| **Launch** | Original ~2019; B-Farm February 2025 |
| **Website** | handysense.io |
| **Store** | store.gravitechthai.com (Pro V3 at 4,815 THB incl. VAT) |
| **DEPA Listing** | techhunt.depa.or.th/product?id=2511 |
| **Platform Type** | Open-source IoT + AI + Big Data for agriculture |
| **Cloud Service** | Free for registered Thai farmers |
| **Estimated Node Cost** | 2,000-5,000 THB (DIY with open designs) |

### Product Tiers & Pricing

HandySense offers three hardware tiers, all using the same free cloud platform. This tiered approach is notable because it demonstrates a viable hardware monetization model while keeping software free — a model Prime My B could adopt or differentiate from.

| Tier | Price (THB) | Sensors Included | Connectivity | Key Capability |
|------|-------------|-----------------|--------------|----------------|
| **Basic Kit** | ~3,100 | Touchscreen controller + 4 sensors (soil moisture, temp, humidity, light) | WiFi | Basic monitoring, alerts |
| **Pro V3** | 4,815 (incl. VAT) | Adds EC, pH probe, rainfall | WiFi + LoRaWAN | Extended monitoring, remote fields |
| **Pro Max V2** | 9,095 (incl. VAT) | Full sensor suite + disease/pest detection | WiFi + LoRaWAN + Cellular | AI analytics, disease alerts |

**Key Insight:** The Basic Kit at 3,100 THB is competitive with Prime My B's budget WiFi node estimate of ~690 THB per node (from [[System-Cost-Estimate]]). However, HandySense's pricing includes the controller and pre-built enclosure, while Prime My B's estimate is component-level. When factoring in enclosure, PCB, and assembly, the actual cost difference narrows significantly. HandySense's advantage is convenience and government support; Prime My B's advantage is coffee-specific sensor selection (e.g., leaf wetness for CLR detection, which HandySense does not include).

### Dashboard & Analytics

HandySense provides a web application and mobile app for real-time sensor data visualization. The dashboard shows current readings, historical trends, and AI-powered crop recommendations based on sensor data. It integrates with the Thai Meteorological Department for weather forecasts. The platform supports multi-farm management, allowing a single user to monitor multiple fields or locations.

**Dashboard Capabilities:**

| Feature | Available | Notes |
|---------|-----------|-------|
| Real-time sensor data | ✅ | Web + mobile app |
| Historical trend charts | ✅ | Time-series visualization |
| Weather integration | ✅ | Thai Meteorological Department data |
| AI crop recommendations | ✅ | Based on sensor thresholds |
| Multi-farm management | ✅ | Multiple locations per account |
| Alert notifications | ✅ | Threshold-based alerts |
| Automated control | ✅ | Irrigation, fertigation triggers |
| Yield prediction | ❌ | Not available |
| Quality prediction | ❌ | Not available |
| Disease prediction | ⚠️ Partial | Pro Max only; not coffee-specific |
| Crop-specific models | ❌ | General thresholds only |
| LINE integration | ❌ | Uses own app |

### Sensor Coverage vs. Prime My B

HandySense covers basic environmental sensors but lacks several sensors that are critical for coffee-specific monitoring. The comparison below highlights gaps that Prime My B would fill:

| Sensor Type | HandySense | Prime My B | Coffee Relevance |
|-------------|-----------|------------|-----------------|
| Soil moisture | ✅ | ✅ | Root health, irrigation timing |
| Temperature | ✅ | ✅ | CLR risk, flowering trigger |
| Humidity | ✅ | ✅ | CLR risk, drying conditions |
| Light / PPFD | ✅ | ✅ | Shade management |
| Rainfall | ✅ (Pro+) | ✅ | Cherry splitting risk, CLR |
| Soil EC | ✅ (Pro+) | ✅ | Nutrient availability |
| Soil pH | ✅ (Pro+) | ⚠️ Periodic | pH management for nutrient uptake |
| Leaf wetness | ❌ | ✅ | **Critical for CLR prediction** |
| Wind speed | ❌ | ✅ | Spray timing, frost risk |
| NPK | ❌ | ⚠️ Lab test | Nutrient management |
| Soil temp (separate) | ❌ | ✅ | Root growth, nutrient cycling |

**Key Gap:** HandySense lacks leaf wetness sensing, which is the single most important predictor for Coffee Leaf Rust (CLR) — the most devastating coffee disease in Thailand. Prime My B's inclusion of leaf wetness sensors (Dragino LLMS01 or DIY) with the >24h continuous wetness threshold creates a CLR early-warning capability that HandySense cannot match.

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | HIGH | Same core sensor types; HandySense lacks leaf wetness, wind |
| Dashboard | HIGH | Similar real-time monitoring, but HandySense lacks coffee-specific visualizations |
| Yield Prediction | LOW | HandySense has no yield prediction; claims "improved yields" indirectly |
| Quality Prediction | NONE | No quality prediction capability |
| Coffee Focus | NONE | Completely crop-agnostic |
| N. Thailand Specialization | NONE | National platform; no regional specialization |
| Alert System | MODERATE | Threshold alerts available, but not coffee-specific decision logic |
| LINE Integration | NONE | Uses proprietary app, not LINE |

**Strategic Implication:** HandySense is both a competitor and a potential foundation. Prime My B could either (a) build on top of HandySense's open-source hardware designs and free cloud platform, adding coffee-specific models and LINE integration, or (b) differentiate as a completely standalone product with superior coffee-specific capabilities. Option (a) reduces development cost; option (b) provides more control and differentiation.

---

## NECTEC Predictive Farming Platform

### Profile

Announced in July 2021, NECTEC's Predictive Farming Platform is a research initiative that explicitly targets crop yield prediction using IoT sensor data. Unlike HandySense (which is an operational product), the Predictive Farming Platform is described as a national infrastructure project that would combine weather, soil, and crop health data from remote and embedded sensors across Thailand to forecast yields.

| Parameter | Details |
|-----------|---------|
| **Developer** | NECTEC / NSTDA |
| **Announced** | July 2021 |
| **URL** | nectec.or.th/en/about/news/predictive-farming-eng.html |
| **Status** | Research/infrastructure phase |
| **Scope** | Nationwide — covers entire Thailand |

### Core Functionality

The platform is designed around three major data groups that feed into predictive models:

1. **Weather data** — Temperature, rainfall, humidity from both government weather stations and IoT field sensors
2. **Soil condition data** — Soil moisture, pH, EC, NPK from embedded sensors and laboratory analysis
3. **Crop health data** — Disease detection, growth stage monitoring from remote sensing and field observations

**Predictive Capability:**

| Capability | Status | Notes |
|-----------|--------|-------|
| Crop yield prediction | ✅ Designed for | Based on weather + soil + health data |
| Quality prediction | ⚠️ Mentioned | In context of disease impact on quality |
| Disease prediction | ⚠️ Implied | Through crop health monitoring |
| Coffee-specific models | ❌ | Not mentioned; general crops |
| Operational deployment | ❌ | Still research/infrastructure phase |
| Dashboard | Presumed | Not publicly described |
| Farmer-facing product | ❌ | Appears to be backend infrastructure |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | HIGH | Same data groups: weather, soil, crop health |
| Dashboard | UNKNOWN | Not publicly described; likely backend |
| Yield Prediction | VERY HIGH | Explicitly designed for yield prediction |
| Quality Prediction | MODERATE | Mentioned but not primary focus |
| Coffee Focus | NONE | General crops |
| Operational Status | NONE | Still in research phase |

**Strategic Implication:** NECTEC's Predictive Farming Platform represents the government's vision for yield prediction, but it is years from operational deployment and appears to be infrastructure rather than a farmer-facing product. Prime My B could be the coffee-specific application layer on top of this national infrastructure. The key risk is that if/when NECTEC deploys this platform, it could commoditize basic yield prediction. Prime My B's differentiation should therefore focus on **coffee-specific models**, **quality prediction** (which NECTEC does not emphasize), and **actionable farmer alerts** (which infrastructure platforms typically do not provide).

---

## DEPA OTOD (One Tambon One Digital)

### Profile

DEPA's OTOD program is the government's primary mechanism for distributing IoT technology directly to farming communities. Running since 2023 across three seasons, OTOD provides free IoT sensor kits, training, platform access, and six months of mentorship to selected tambon (sub-district) communities. While OTOD is not a competing product per se, it is a distribution channel and funding source that could accelerate or compete with Prime My B's adoption.

| Parameter | Details |
|-----------|---------|
| **Implementing Agency** | DEPA (Digital Economy Promotion Agency) |
| **Program Name** | OTOD (One Tambon One Digital) |
| **Seasons** | 3 seasons (2023-2026); OTOD #3 open for applications |
| **OTOD #1** | Agricultural drones |
| **OTOD #2** | Digital skills for agriculture |
| **OTOD #3** | IoT + smart tractors + automation |
| **What's Provided** | Free IoT sensor kits + 3-5 day training + cloud platform + 6-month mentorship |
| **Eligibility** | Community-based application; tambon-level |
| **Website** | depa.or.th |

### Grant Programs

DEPA offers multiple funding instruments that are relevant to Prime My B:

| Program | Amount | Coverage | Eligibility |
|---------|--------|----------|-------------|
| **OTOD Mini Grant** | 10,000 THB | Basic IoT kit for one community | Community groups |
| **d-transform** | Up to 200,000 THB | Full smart farming project setup | Businesses, cooperatives |
| **d-voucher** | Subsidized | Digital tools for 15,000 small businesses/farmers | Individual farmers/enterprises |
| **OTOD Community Grant** | Varies | Drones, smart tractors, IoT automation | Tambon-level communities |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Hardware Distribution | MODERATE | DEPA distributes generic IoT kits; Prime My B would distribute coffee-specific kits |
| Training | LOW | DEPA provides general IoT training; Prime My B needs coffee-specific training |
| Platform | NONE | DEPA uses HandySense or partner platforms; no proprietary platform |
| Yield/Quality Prediction | NONE | DEPA is a funding channel, not a product |
| Coffee Focus | NONE | General agriculture |

**Strategic Implication:** DEPA OTOD is a **funding and distribution opportunity**, not a competitor. Prime My B should apply as a technology partner in the OTOD program, offering coffee-specific IoT kits and training to Northern Thailand communities. This could provide free hardware distribution to farmers while Prime My B focuses on the software, models, and alerts that create lasting value. The d-transform grant of up to 200,000 THB could fund a pilot deployment across multiple coffee communities.

---

## Agriculture 4.0 (Ministry of Digital Economy and Society)

### Profile

Announced in October 2025, Agriculture 4.0 is Thailand's national strategy for digital agriculture transformation, targeting 5.78 million farming households for technology upgrade. It is a policy framework rather than a specific product, but it shapes the competitive landscape by defining standards, coordinating government programs, and creating market expectations.

| Parameter | Details |
|-----------|---------|
| **Announced** | October 2025 |
| **Target** | 5.78 million farming households |
| **Lead Ministry** | MDES (Ministry of Digital Economy and Society) |
| **Key Components** | National digital agriculture database, precision farming tools, AI crop advisory |
| **Integration** | Coordinates DEPA OTOD, NECTEC HandySense, DOAE Smart Farmer |

### Agriculture 4.0 Strategic Pillars

| Pillar | Description | Coffee Relevance | Prime My B Alignment |
|--------|-------------|-----------------|---------------------|
| **Data Foundation** | National soil, weather, and crop database | Coffee zone mapping, variety-altitude matching | HIGH — Prime My B's sensor data could feed this database |
| **Precision Farming** | Sensor-driven input management | Irrigation scheduling, fertilization timing | HIGH — Core Prime My B capability |
| **AI Advisory** | ML crop recommendations | CLR prediction, yield forecasting | VERY HIGH — Prime My B's differentiated feature |
| **Market Intelligence** | Digital marketplace and price information | Direct farmer-to-buyer, price transparency | MODERATE — Complementary to Prime My B |
| **Digital Finance** | Integrated with BAAC financial services | Loan applications, insurance, payments | MODERATE — Could integrate with Prime My B alerts |

### Thailand AI in Agriculture Market

| Metric | Value |
|--------|-------|
| **Market Size (2023)** | $80.33M USD |
| **Projected Size (2029)** | $113.96M USD |
| **CAGR** | 6.08% |
| **Key Segments** | Precision farming, drone analytics, IoT sensors, AI advisory |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| Policy Framework | HIGH | Agriculture 4.0 creates the environment Prime My B operates in |
| Standards | UNKNOWN | Data standards still being defined; Prime My B should design for compatibility |
| Direct Competition | NONE | Policy framework, not a product |
| Funding Opportunity | HIGH | Agriculture 4.0 creates grant programs and incentives |

**Strategic Implication:** Agriculture 4.0 is Prime My B's strongest argument for government support and funding. The national strategy explicitly calls for precision farming, AI advisory, and IoT integration — exactly what Prime My B delivers for coffee. Prime My B should position itself as an Agriculture 4.0 implementation for the coffee sector and seek alignment with MDES standards and programs. BOI (Board of Investment) incentives for smart farming technology companies are also available under this framework.

---

## Comparative Summary

| Platform | IoT Sensors | Dashboard | Yield Prediction | Quality Prediction | Coffee Focus | N. Thailand | Free for Farmers |
|----------|:-----------:|:---------:|:----------------:|:------------------:|:------------:|:-----------:|:----------------:|
| **HandySense B-Farm** | ✅ | ✅ | ⚠️ Indirect | ❌ | ❌ | ❌ | ✅ Cloud only |
| **NECTEC Predictive** | ✅ | ❓ | ✅ | ⚠️ | ❌ | ❌ | Unknown |
| **DEPA OTOD** | ✅ (distributes) | ❌ | ❌ | ❌ | ❌ | ⚠️ | ✅ Hardware + training |
| **Agriculture 4.0** | ❌ Policy | ❌ | ❌ Policy | ❌ | ❌ | ❌ | Policy framework |

---

## Key Takeaways

1. **HandySense is the primary government platform to watch** — it is operational, free, and widely distributed. However, its crop-agnostic nature and lack of yield/quality prediction leave a clear gap for Prime My B.
2. **NECTEC Predictive Farming is a future risk** — once operational, it could commoditize basic yield prediction. Prime My B should differentiate on coffee-specific models, quality prediction, and actionable farmer alerts.
3. **DEPA OTOD is a go-to-market channel** — applying as a technology partner could provide free hardware distribution and government credibility.
4. **Agriculture 4.0 creates tailwinds** — the national policy framework validates the market and provides funding pathways. Prime My B should align its messaging with Agriculture 4.0 pillars.
5. **No government platform offers coffee-specific anything** — the entire coffee IoT niche in Northern Thailand is unoccupied by government platforms.

---

## Related Topics

- [[Commercial-IoT-Products]] — Private sector competitors with IoT + dashboard capabilities
- [[Coffee-Region-Projects]] — Projects in the same geographic region
- [[Overlap-Analysis]] — Comprehensive overlap matrix and positioning strategy
- [[Government-Programs]] — Detailed government support programs for farmers
- [[Visualization-Dashboard]] — Prime My B's dashboard design specifications
- [[Yield-Quality-Prediction]] — Prime My B's yield and quality prediction models
- [[System-Cost-Estimate]] — Hardware cost comparison with HandySense pricing

---

## References

1. NECTEC. "HandySense B-Farm." handysense.io. Accessed 2026.
2. Gravitech Thai. "HandySense Pro V3 Product Page." store.gravitechthai.com. Accessed 2026.
3. NECTEC. "Predictive Farming Platform." nectec.or.th/en/about/news/predictive-farming-eng.html. July 2021.
4. DEPA. "One Tambon One Digital (OTOD)." depa.or.th. Accessed 2026.
5. MDES. "Agriculture 4.0 Strategy Announcement." October 2025.
6. Tracxn. "Smart Farming Startups in Thailand." tracxn.com. Accessed 2026.

---

*Last updated: 2026-05-13*
