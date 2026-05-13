---
topic: Commercial IoT Products in Thailand
phase: 07-Competitive-Landscape
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [commercial, iot, startup, ricult, skyviv, spsmartplants, dtac, swift-dynamics, khawtech, thailand, dashboard, yield-prediction, quality-prediction]
related: [[Government-IoT-Platforms]], [[Coffee-Region-Projects]], [[Overlap-Analysis]], [[Visualization-Dashboard]], [[Yield-Quality-Prediction]]
---

# Commercial IoT Products in Thailand

> **Summary**: Analysis of private-sector IoT agriculture products and startups operating in Thailand — their capabilities, business models, crop focus, and overlap with Prime My B's coffee IoT system for Northern Thailand.

---

## Overview

Thailand's commercial agri-tech sector includes approximately 30 smart farming startups and multiple established technology companies offering IoT agriculture solutions. These products range from mobile-first AI platforms (Ricult) to full-stack IoT hardware + software systems (SPsmartplants) to drone-based analytics (SkyVIV). While none focus on coffee specifically, several demonstrate that the crop-specific IoT + dashboard model works in Thailand and provide important benchmarks for Prime My B's feature set, pricing, and go-to-market strategy. This section analyzes the most significant commercial products by their degree of overlap with Prime My B's vision: IoT sensors, dashboard visualization, yield prediction, and quality prediction.

---

## Ricult — AI Agriculture Platform

### Profile

Ricult is a Thailand-based agri-tech startup founded by MIT-educated Aukrit Unahalekhaka, with operations in Thailand and Pakistan and backing from the Bill & Melinda Gates Foundation. Ricult is a mobile-first AI platform that provides crop planning advisories, weather forecasts, and predictive analytics to farmers entirely through a smartphone app — without requiring any physical IoT sensor deployment.

| Parameter | Details |
|-----------|---------|
| **Type** | Mobile app (AI-powered) |
| **Founded** | ~2016-2017 |
| **Founder** | Aukrit Unahalekhaka (MIT) |
| **Markets** | Thailand, Pakistan; expanding to Vietnam, Philippines |
| **Backers** | Bill & Melinda Gates Foundation |
| **Platform** | iOS & Android |
| **Pricing** | Free for farmers |

### Capabilities

Ricult's feature set demonstrates what a data-driven agriculture platform can achieve without ground-level sensors, relying instead on satellite imagery and weather API data:

| Feature | Available | Data Source |
|---------|-----------|------------|
| Weather & rain forecast | ✅ | Weather API; hourly up to 7 days |
| Crop planning advisories | ✅ | AI models; which crops to plant, when |
| Yield prediction | ✅ | Satellite + weather data; claims "boosting yields by 50%" |
| Predictive analytics | ✅ | Optimal planting/harvesting dates |
| Fertilizer timing | ✅ | AI recommendations |
| Credit profiling | ✅ | Helping banks provide affordable loans to farmers |
| Real-time mapping | ✅ | Resource allocation, crop selection, pricing strategies |
| IoT sensor data | ❌ | None — no ground-level sensors |
| Quality prediction | ❌ | Not available |
| Coffee focus | ❌ | General crops; rice focus in Thailand |
| LINE integration | ❌ | Own mobile app |

### Business Model

Ricult's business model is notable because it makes the platform completely free for farmers while generating revenue from B2B sources. This model is particularly relevant for Prime My B because it demonstrates that farmer-facing services can be monetized through the agricultural value chain rather than directly from farmers who have limited ability to pay.

| Revenue Stream | Details |
|---------------|---------|
| **Bank commissions** | Ricult collects fees when farmers apply for loans through the platform's credit profiling system |
| **Corporate analytics** | Premium data and analytics sold to agricultural companies, traders, and processors |
| **B2B software licensing** | Factories and traders pay subscription fees for supply chain visibility |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | NONE | Ricult uses satellite/weather data, not ground sensors |
| Dashboard | HIGH | Mobile app with crop analytics and planning |
| Yield Prediction | HIGH | AI-powered yield prediction is a core feature |
| Quality Prediction | NONE | No quality prediction capability |
| Coffee Focus | NONE | General crops; rice primary in Thailand |
| Farmer Reach | VERY HIGH | Free access removes adoption barrier |
| Business Model | MODERATE | B2B monetization model is relevant to Prime My B |

**Key Insight:** Ricult proves that AI yield prediction is viable and valued in the Thai market, but its reliance on satellite data (not ground sensors) means it cannot detect the micro-level conditions that matter most for coffee quality — shade percentage, leaf wetness duration, soil moisture at root depth, diurnal temperature range. These are precisely the conditions that ground-level IoT sensors capture, and they are the conditions that determine whether coffee achieves specialty grade (80+ SCA score) or remains commodity grade. Prime My B's ground-sensor approach is fundamentally different from Ricult's satellite approach, and they target different levels of the agricultural value chain.

---

## SkyVIV — Drone-Based Precision Agriculture

### Profile

SkyVIV is a Bangkok-based precision agriculture company that uses drone-mounted multi-spectral cameras to analyze crop health, detect diseases, and predict yields. Founded around 2016-2017 by CEO Vivatvong Vichit-Vadakan, SkyVIV is ranked #1 on Tracxn's Smart Farming Startups in Thailand. The company has accumulated 3+ years of data from sweetcorn crops with Sunsweet PCL.

| Parameter | Details |
|-----------|---------|
| **Type** | Drone imaging + AI analytics |
| **Founded** | ~2016-2017 |
| **CEO** | Vivatvong Vichit-Vadakan |
| **Location** | Bangkok, Thailand |
| **Primary Crop** | Sweetcorn (with Sunsweet PCL) |
| **Ranking** | #1 Smart Farming Startup in Thailand (Tracxn) |
| **Profitability** | Agriculture side not yet profitable |

### Capabilities

SkyVIV represents the aerial imaging approach to precision agriculture — a fundamentally different technology path from Prime My B's ground-sensor approach:

| Feature | Available | Technology |
|---------|-----------|------------|
| Multi-spectral aerial imaging | ✅ | Drone-mounted sensors |
| Crop health analysis | ✅ | Greenness index = health indicator |
| Disease detection | ✅ | Visual anomaly detection from aerial data |
| Weed detection | ✅ | Spectral differentiation |
| Fungus detection | ✅ | Multi-spectral analysis |
| Fertilizer optimization | ✅ | Per-field-area recommendations |
| Yield prediction | ✅ | Active research; correlating drone images with yields |
| Quality prediction | ⚠️ Partial | Can detect visible abnormalities |
| IoT ground sensors | ❌ | Drones only |
| Coffee coverage | ❌ | Sweetcorn primary |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | NONE | Uses drones, not ground sensors |
| Dashboard | MODERATE | Presumed analytics platform |
| Yield Prediction | HIGH | Actively developing yield prediction models |
| Quality Prediction | LOW | Visual abnormality detection only |
| Coffee Focus | NONE | Sweetcorn primary |
| Cost Structure | DIFFERENT | Drone operations require skilled pilots, weather windows |

**Key Insight:** SkyVIV and Prime My B could be complementary rather than competitive. Drone imaging provides a macro-level view (which areas of a farm are stressed), while ground sensors provide micro-level data (what specific conditions are causing the stress). A combined offering — drones for periodic field-wide assessment plus ground sensors for continuous monitoring — would be more powerful than either alone. For coffee specifically, drones could map shade coverage across a farm, while ground sensors track the specific microclimate conditions that affect CLR risk and cherry quality.

---

## SPsmartplants — Durian IoT Platform

### Profile

SPsmartplants is the most directly relevant commercial product for Prime My B because it demonstrates that the **crop-specific IoT + dashboard + LINE integration model works in Thailand**. Focused primarily on durian orchards, SPsmartplants provides a comprehensive IoT sensor management system with AI-assisted farming, smart irrigation control, and LINE message alerts.

| Parameter | Details |
|-----------|---------|
| **Type** | IoT smart farm management system |
| **Website** | spsmartplants.com |
| **Location** | Bangkok, Thailand |
| **Primary Crop** | Durian |
| **Platform** | Web dashboard + LINE integration |

### Capabilities

SPsmartplants' feature set is remarkably similar to what Prime My B would offer for coffee, but applied to durian:

| Feature | Available | Notes |
|---------|-----------|-------|
| IoT sensor management | ✅ | Temperature, humidity, soil moisture, pH/EC, PPFD |
| Real-time monitoring | ✅ | Web dashboard |
| Smart irrigation control | ✅ | Automated based on sensor thresholds |
| Smart fertigation control | ✅ | Automated nutrient delivery |
| AI Co-Farmer assistant | ✅ | AI-powered recommendations |
| LINE Message alerts | ✅ | Critical for Thai farmer adoption |
| Online/Offline station | ✅ | Data buffering when connectivity drops |
| Curtain/shade control | ✅ | Greenhouse automation |
| Yield prediction | ❌ | Not explicitly offered |
| Quality prediction | ❌ | Not explicitly offered |
| Coffee coverage | ❌ | Durian only |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | VERY HIGH | Nearly identical sensor suite to Prime My B |
| Dashboard | HIGH | Web dashboard with real-time monitoring |
| Yield Prediction | NONE | Not offered |
| Quality Prediction | NONE | Not offered |
| LINE Integration | VERY HIGH | Same delivery channel Prime My B plans |
| Crop Focus | DIFFERENT | Durian vs. Coffee; same crop-specific approach |
| Control Automation | HIGH | Irrigation + fertigation control (Prime My B focuses on alerts) |
| Business Model | UNKNOWN | Pricing not publicly listed |

**Key Insight:** SPsmartplants validates the crop-specific IoT platform model in Thailand. Their success with durian (a high-value crop with quality-driven pricing, similar to specialty coffee) suggests that Prime My B's coffee-specific approach has strong market viability. The key difference is that SPsmartplants focuses on **control automation** (irrigation, fertigation, shade) while Prime My B focuses on **prediction and advisory** (yield, quality, disease risk). These are complementary capabilities — a future version of Prime My B could add control automation, or SPsmartplants could expand to coffee with their existing platform.

---

## dtac Smart Farmer (now True/dtac)

### Profile

dtac Smart Farmer is one of Thailand's longest-running digital agriculture programs, launched initially as an SMS-based farmer information service in 2008 and evolving into a smartphone app with IoT sensor integration in 2016-2017. The program is notable for achieving the lowest successful agricultural subscription price in Thailand at 30 THB/month.

| Parameter | Details |
|-----------|---------|
| **Type** | Mobile app + IoT sensors |
| **Launched** | 2008 (SMS); 2016-2017 (app + IoT) |
| **Parent** | dtac (now part of True Corporation) |
| **Partners** | NECTEC (IoT sensors), Yara (fertilizer), DOAE |
| **Pricing** | 60-day free trial, then 30 THB/month |
| **Users** | 200,000 SMS + 100,000 app users |

### Capabilities

| Feature | Available | Notes |
|---------|-----------|-------|
| IoT sensor monitoring | ✅ | Soil moisture, air moisture, temp, light (via NECTEC partnership) |
| Real-time data to app | ✅ | Sensor data streamed to smartphone |
| Weather forecasts | ✅ | Integrated weather data |
| Agricultural news | ✅ | Content and information |
| Market prices | ✅ | Commodity price information |
| SMS-based advisory | ✅ | Since 2008; still active for feature phone users |
| Yara digital fertilizer | ✅ | YaraIrix smartphone nitrogen sensor |
| Yield prediction | ❌ | Not offered |
| Quality prediction | ❌ | Not offered |
| Coffee coverage | ❌ | General agriculture |

### Pricing Model

dtac Smart Farmer's pricing is the most important benchmark for Prime My B because it demonstrates the lower bound of what Thai farmers will pay for an agricultural subscription service:

| Tier | Price | What's Included |
|------|-------|----------------|
| **Free trial** | 0 THB | 60 days with IoT sensor setup |
| **Monthly subscription** | 30 THB/month (~$0.85) | Full app access + sensor data |

**Key Insight:** At 30 THB/month, dtac Smart Farmer proves that Thai farmers will pay for digital agriculture services, but the price point must be extremely low. This is a telecom-subsidized model where dtac absorbs data costs and monetizes through network loyalty and increased data usage. For Prime My B to charge a similar price, it would need to either (a) partner with a telecom provider, (b) subsidize through B2B revenue, or (c) keep the service free for farmers and monetize through the value chain (like Ricult's model).

---

## Swift Dynamics — IoT Predictive Intelligence

### Profile

Swift Dynamics is a Bangkok-based deep tech company offering IoT-powered predictive intelligence solutions for agriculture. As a Monnit wireless sensors distributor, they provide enterprise-grade IoT monitoring and predictive analytics.

| Parameter | Details |
|-----------|---------|
| **Type** | Deep Tech — IoT, AI, predictive, XR |
| **Website** | swiftdynamics.co.th |
| **Location** | Bangkok, Thailand |
| **Sensors** | Monnit wireless sensor suite |
| **Target** | Enterprise/B2B |

### Capabilities

| Feature | Available | Notes |
|---------|-----------|-------|
| IoT sensor monitoring | ✅ | Monnit wireless sensor suite |
| Predictive intelligence | ✅ | AI-powered prediction |
| Dashboard | ✅ | Cloud-based platform |
| Agriculture focus | ✅ | Dedicated agriculture use case page |
| Yield/quality prediction | ⚠️ Implied | "Increase quantity and quality of produce" |
| Coffee focus | ❌ | General agriculture |
| Farmer-facing | ❌ | B2B enterprise only |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | HIGH | Enterprise sensor suite |
| Dashboard | HIGH | Cloud analytics platform |
| Yield/Quality Prediction | MODERATE | Implied but not detailed |
| Coffee Focus | NONE | General agriculture |
| Target Market | DIFFERENT | B2B enterprise vs. Prime My B's farmer focus |

**Key Insight:** Swift Dynamics represents the enterprise IoT segment, which could be a technology partner or acquisition target but is not a direct competitor to Prime My B's farmer-facing approach. Their Monnit sensor distribution could provide a sourcing channel for enterprise-grade components.

---

## KhawTECH — Rice IoT in Northeastern Thailand

### Profile

KhawTECH is a specialized IoT platform focused exclusively on rice farming in Isan (Northeastern Thailand). Based in Yasothon, KhawTECH provides LoRa-based soil sensors and the NaLog Platform dashboard for rice paddy monitoring, with a focus on AWD (Alternate Wetting and Drying) water management and carbon offsetting.

| Parameter | Details |
|-----------|---------|
| **Type** | IoT smart farming services + AWD |
| **Website** | khawtech.com |
| **Location** | Yasothon, Isan (Northeastern Thailand) |
| **Crop** | Rice only |
| **Alignment** | Thailand 4.0 |
| **Proven Results** | 35% water savings in Yasothon pilot |

### Capabilities

| Feature | Available | Notes |
|---------|-----------|-------|
| LoRa soil sensors | ✅ | IP66 enclosures, bamboo shades, 38°C heat resistance |
| AWD water management | ✅ | Alternate Wetting and Drying protocol |
| NaLog Platform dashboard | ✅ | Real-time alerts, farm performance tracking |
| Free LoRa gateways | ✅ | For rural communities |
| Carbon offsetting | ✅ | Revenue from carbon credits |
| Yield prediction | ❌ | Focus on water optimization |
| Quality prediction | ❌ | Not offered |

### Overlap Assessment

| Dimension | Overlap Level | Explanation |
|-----------|--------------|-------------|
| IoT Sensors | MODERATE | LoRa-based (same tech as Prime My B) but different sensors |
| Dashboard | MODERATE | NaLog platform similar to Prime My B's dashboard concept |
| LoRa Gateway Model | HIGH | Free community gateway model is replicable for coffee |
| Yield/Quality Prediction | NONE | Different focus area |
| Coffee Focus | NONE | Rice only |
| Region | DIFFERENT | Isan (Northeast) vs. Northern Thailand |

**Key Insight:** KhawTECH's free LoRa gateway model for rural communities is directly relevant to Prime My B. In Northern Thailand's mountainous coffee terrain, a single LoRa gateway on a ridge can serve multiple farms across a valley. KhawTECH has proven that giving away gateways to anchor community adoption works. Their carbon offsetting revenue stream is also notable — Prime My B could explore carbon credits for coffee agroforestry systems.

---

## Other Notable Products

### Easyrice — Rice Quality AI

Easyrice (easyrice.ai) is an AI-based rice quality inspection platform that uses computer vision for rice seed quality control and variety identification. While not an IoT platform, it demonstrates that **quality prediction/grading using AI is commercially viable in Thailand's agricultural sector**. The EASYRICE MP1 system provides automated rice seed testing with deep AI computer vision technology. Prime My B could apply a similar approach to coffee cherry grading or green bean quality assessment.

### Farmbook — Agriculture Ecosystem Platform

Farmbook is a multisided marketplace connecting farmers, producers, service providers, and distributors. It provides personalized agricultural advice and best practices but does not use IoT sensors or offer yield/quality prediction. Its marketplace model could be relevant for Prime My B's B2B monetization strategy.

### FlexiFarm — Controlled Environment Farming

FlexiFarm provides intelligent, automated, environment-controlled farming technology for year-round production. Based in Bangkok, it focuses on greenhouse/vertical farming rather than field-based agriculture. Not directly relevant to coffee farming but demonstrates the automation trend in Thai agriculture.

### OctoVision — IoT Agriculture Device

OctoVision is an early-stage (unfunded, founded 2019) Bangkok-based IoT device for agriculture monitoring. Minimal public information available; appears to be pre-revenue.

### True Digital Group / CP Group — Smart Farming

True Digital Group and CP Foods focus on livestock (dairy, broiler) smart farming with AI and automation. CP Group's 2025 partnership with Microsoft for AI/cloud solutions signals growing investment in agricultural technology, but their focus is on protein production, not crops. Not a direct competitor for Prime My B.

---

## Comparative Summary

| Product | IoT Sensors | Dashboard | Yield Prediction | Quality Prediction | Coffee Focus | LINE Integration | Free for Farmers |
|---------|:-----------:|:---------:|:----------------:|:------------------:|:------------:|:----------------:|:----------------:|
| **Ricult** | ❌ | ✅ App | ✅ | ❌ | ❌ | ❌ | ✅ |
| **SkyVIV** | ❌ Drones | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ |
| **SPsmartplants** | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ❌ |
| **dtac Smart Farmer** | ✅ | ✅ App | ❌ | ❌ | ❌ | ❌ | ⚠️ Trial |
| **Swift Dynamics** | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ |
| **KhawTECH** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ⚠️ Gateway |
| **Easyrice** | ❌ | ✅ | ❌ | ✅ Rice | ❌ | ❌ | ❌ |

---

## Key Takeaways

1. **No commercial product in Thailand offers coffee-specific IoT monitoring** — the entire coffee IoT niche is unoccupied. Every commercial product either focuses on other crops (rice, durian, sweetcorn) or is crop-agnostic.
2. **SPsmartplants validates the crop-specific model** — their durian-focused IoT + LINE platform proves that Thai farmers will adopt crop-specific IoT solutions when the features match their crop's needs.
3. **Ricult proves that free-for-farmers + B2B monetization works** — this model should be Prime My B's primary business model consideration, as farmer willingness to pay is extremely low (<80 THB/month for most).
4. **Yield prediction exists (Ricult, SkyVIV) but quality prediction does not** — no commercial product in Thailand offers quality prediction for any crop. This is Prime My B's strongest differentiation opportunity.
5. **LINE integration is critical** — SPsmartplants uses LINE for alerts; dtac Smart Farmer uses its own app. Given that 98% of Thai smartphone users use LINE, Prime My B should prioritize LINE as the primary alert channel.
6. **The LoRa community gateway model works** — KhawTECH's free gateway approach accelerates adoption in rural areas and could be replicated for Northern Thailand's coffee valleys.

---

## Related Topics

- [[Government-IoT-Platforms]] — Government-backed platforms with IoT capabilities
- [[Coffee-Region-Projects]] — Projects in Northern Thailand's coffee region
- [[Overlap-Analysis]] — Comprehensive overlap analysis and positioning strategy
- [[Visualization-Dashboard]] — Prime My B's dashboard design specifications
- [[Yield-Quality-Prediction]] — Prime My B's prediction models
- [[Farmer-Alert-UX-Design]] — LINE bot alert design for Thai farmers

---

## References

1. Ricult. "Ricult Thailand." iOS App Store. Accessed 2026.
2. SkyVIV. "Precision Agriculture." Tracxn Smart Farming Startups Thailand #1. Accessed 2026.
3. SPsmartplants. "Smart Farm Management System." spsmartplants.com. Accessed 2026.
4. dtac. "Smart Farmer App." apps.apple.com. Accessed 2026.
5. FAO. "dtac Smart Farmer Digital Initiative." dvi-ke.fao.org. Accessed 2026.
6. Swift Dynamics. "Agriculture Use Cases." swiftdynamics.co.th. Accessed 2026.
7. KhawTECH. "IoT Smart Farming Services." khawtech.com. Accessed 2026.
8. Easyrice. "AI Rice Quality Inspection." easyrice.ai. Accessed 2026.
9. Tracxn. "Smart Farming Startups in Thailand." tracxn.com. Accessed 2026.

---

*Last updated: 2026-05-13*
