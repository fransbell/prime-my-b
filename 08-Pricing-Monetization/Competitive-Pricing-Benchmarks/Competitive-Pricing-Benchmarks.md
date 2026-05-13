---
topic: Competitive Pricing Benchmarks
phase: 08-Pricing-Monetization
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [pricing, benchmarks, handysense, ricult, dtac, depa, iot-hardware, subscription, thailand, farmer-wtp, saas]
related: [[Monetization-Strategy]], [[Farmer-Pricing-Model]], [[B2B-Revenue-Streams]], [[Government-Grant-Funding]], [[Commercial-IoT-Products]], [[System-Cost-Estimate]]
---

# Competitive Pricing Benchmarks

> **Summary**: Comprehensive pricing benchmarks from every IoT agriculture platform, hardware vendor, and government program in Thailand — establishing the cost boundaries, farmer willingness-to-pay ceiling, and viable pricing tiers that should inform Prime My B's pricing strategy.

---

## Overview

Pricing an IoT agriculture platform in Thailand requires navigating a market where government-backed tools are free, farmers have extremely low willingness to pay, and the only proven monetization models rely on B2B revenue rather than direct farmer subscriptions. This document catalogs every available pricing benchmark — from HandySense's hardware tiers to Ricult's free-for-farmer model to dtac's 30 THB/month subscription to global SaaS pricing — to establish the boundaries within which Prime My B must operate. The central finding is that the Thai IoT agriculture market has a dual structure: hardware can be monetized at 3,000-9,000 THB per node, but software subscriptions from farmers are constrained to under 80 THB/month, making B2B monetization essential for sustainability.

---

## Hardware Pricing Benchmarks

### HandySense — Thailand's Reference Platform

HandySense is the most important pricing benchmark because it is the most widely deployed IoT agriculture platform in Thailand and its pricing is publicly available. Every Thai farmer considering IoT will compare Prime My B's cost against HandySense.

| Product | Price (excl. VAT) | Price (incl. VAT) | Sensors Included | Connectivity |
|---------|-------------------|-------------------|-----------------|--------------|
| **Basic Kit** | ~3,100 THB | ~3,317 THB | Touchscreen controller + 4 sensors (soil moisture, temp, humidity, light) | WiFi |
| **Pro V3** | 3,250-4,500 THB | 3,478-4,815 THB | Adds EC, pH, rainfall sensor | WiFi + LoRaWAN |
| **Pro Max V2** | 8,500 THB | 9,095 THB | Full sensor suite + disease detection AI | WiFi + LoRaWAN + Cellular |
| **Second-hand Pro Max** | ~5,000 THB | — | Used, mint condition | WiFi + LoRaWAN + Cellular |

**Sources:** Gravitech Thai (store.gravitechthai.com), ArtronShop (artronshop.co.th), Nexvertex (nexvertex.co.th), DEPA TechHunt (techhunt.depa.or.th)

**Critical Insight:** HandySense's cloud platform is **100% free** — no subscription, no data access fees, no vendor lock-in. The hardware is sold at near-cost through government-funded distributors. This means Prime My B cannot charge for basic cloud services that HandySense provides for free. Any paid tier must deliver value that HandySense does not provide: coffee-specific predictions, quality forecasting, and CLR disease models.

### DIY Component Pricing (Prime My B Reference)

From [[System-Cost-Estimate]], Prime My B's self-assembled sensor nodes are significantly cheaper than HandySense's pre-built kits, but require technical skill:

| Configuration | Cost per Node | Coverage | Suitable For |
|--------------|--------------|----------|-------------|
| **Budget WiFi** | ~690 THB | Single zone | Tech-savvy farmers, small plots |
| **LoRa Node** | ~1,460 THB | 2-10 km range | Multi-zone farms, hilly terrain |
| **10-rai DIY LoRa System** | ~25,600 THB total | Full 10-rai farm | Community deployment |

### Global IoT Node Cost Trends

| Year | Average Cost per Node | Trend |
|------|-----------------------|-------|
| 2020 | $145 (~5,000 THB) | Baseline |
| 2023 | $95 (~3,300 THB) | Declining |
| 2025 | $68 (~2,300 THB) | Continuing decline |

**Implication:** IoT hardware costs are falling rapidly. Prime My B should not build its business model around hardware margins — they will compress over time. Instead, the coffee-specific intelligence layer (predictions, alerts, quality insights) should be the primary value driver.

### Complete System Cost Comparison

| System | Cost (THB) | Includes | Source |
|--------|-----------|----------|--------|
| HandySense Basic | 3,100-4,000 | 4 sensors + controller + cloud | Gravitech/ArtronShop |
| HandySense Pro V3 + sensors | 8,000-12,000 | 7 sensors + LoRaWAN + cloud | Gravitech |
| HandySense Pro Max + full sensors | 15,000-25,000 | All sensors + cellular + AI + cloud | Gravitech |
| DIY LoRaWAN (per node) | 3,000-8,000 | Custom sensor selection | [[System-Cost-Estimate]] |
| Vietnam Smart Farm IoT Kit | ~3,500 | Full basic kit | Industry reports |

---

## Software & Subscription Pricing Benchmarks

### Thai Market — The Only Relevant Benchmarks

| Platform | Farmer Price | What's Included | Revenue Model |
|----------|-------------|----------------|---------------|
| **HandySense** | 0 THB/month | Full cloud platform, dashboard, LINE alerts | Government-funded; hardware revenue |
| **Ricult** | 0 THB/month | AI crop planning, yield prediction, weather | B2B software licensing + bank commissions |
| **dtac Smart Farmer** | 30 THB/month (after 60-day trial) | IoT sensor data + app + weather | Telecom-subsidized |
| **SPsmartplants** | Contact for pricing | IoT monitoring + control + LINE | Presumed B2B/enterprise |
| **Swift Dynamics** | Enterprise/custom | IoT + predictive intelligence | B2B enterprise contracts |
| **KhawTECH** | Free LoRa gateway; sensor pricing undisclosed | Soil sensors + AWD + dashboard | Community model + carbon credits |
| **DEPA OTOD** | 0 THB (grant-funded) | Free IoT kits + training + platform | Government grant |

### Global SaaS Pricing — Not Viable for Thai Smallholders

These prices are included for context only — they are completely unviable for 5-10 rai Thai coffee farms but illustrate what enterprise precision agriculture costs in developed markets:

| Platform | Annual Price | Target | Thai Farmer Feasibility |
|----------|-------------|--------|------------------------|
| **Farm21** (Free) | €0/year | Basic scouting | ✅ Viable |
| **Farm21** (Sensors) | €89/year + €375 sensor | Field sensor data | ⚠️ Hardware OK; €89/yr = ~3,300 THB/yr |
| **Farm21** (Premium) | €250/year | Satellite + API | ❌ ~9,200 THB/yr — too expensive |
| **Agworld** (Basic) | $1,495/year | Farm management | ❌ ~52,000 THB/yr — far too expensive |
| **Agworld** (Plus) | $2,495/year | Advanced features | ❌ ~87,000 THB/yr |
| **Cropin** | Custom ($63M revenue) | Enterprise agribusiness | ❌ Enterprise only |

**Critical Insight:** Western precision agriculture SaaS pricing is 50-100x above Thai farmer willingness to pay. Prime My B must follow the Thai/SEA model, not the Western model.

---

## Farmer Willingness to Pay (WTP)

### The WTP Ceiling

The single most important pricing constraint for Prime My B is the farmer willingness-to-pay ceiling. Multiple studies and market observations converge on the same number:

| Source | WTP Finding | Notes |
|--------|------------|-------|
| **Academic research (2025)** | <80 THB/month (~$2.40) for half of sampled farmers | Mobile advisory services study |
| **dtac Smart Farmer** | 30 THB/month — successful at scale | The only proven farmer-paid subscription in Thailand |
| **Market observation** | Most Thai agri platforms are free for farmers | Ricult, HandySense, DEPA OTOD all free |
| **BAAC Community Enterprise** | 0.01% annual interest on loans | Farmers expect near-zero cost from government programs |

### WTP by Farmer Segment

Not all farmers have the same willingness to pay. Prime My B should segment its potential users:

| Segment | Farm Size | WTP (THB/month) | % of Market | Strategy |
|---------|-----------|-----------------|-------------|----------|
| **Subsistence farmer** | <3 rai | 0-20 | ~40% | Free tier only |
| **Smallholder** | 3-10 rai | 20-80 | ~35% | Free core + optional premium |
| **Progressive farmer** | 10-30 rai | 80-200 | ~15% | Premium tier viable |
| **Community enterprise / cooperative** | 30+ rai collective | 200-2,000 | ~10% | Group subscription |
| **Specialty coffee producer** | Any (quality-focused) | 200-500 | ~5% | Quality prediction premium |

### What Farmers Will Pay For (vs. What They Expect Free)

| Feature | Farmer WTP | Expectation |
|---------|-----------|-------------|
| Basic sensor alerts | 0 THB | Free — HandySense provides this |
| Weather information | 0 THB | Free — widely available via phone |
| LINE alerts | 0 THB | Free — HandySense and SPsmartplants offer this |
| Coffee cultivation tips | 0-30 THB | Low value — available from DOAE/HRDI |
| **CLR disease early warning** | 30-100 THB | HIGH value — protects 30-50% crop loss |
| **Yield prediction** | 50-100 THB | Medium value — helps planning |
| **Quality prediction → SCA score** | 100-300 THB | HIGH value — justifies specialty pricing |
| **Direct market linkage** | 100-500 THB | HIGH value — eliminates middlemen |

**Key Insight:** Farmers will not pay for data they can get elsewhere (weather, basic alerts). They will pay for **unique predictive insights** that directly translate to higher income — CLR early warning (prevents crop loss), quality prediction (justifies specialty pricing), and market linkage (captures premium prices). These are precisely Prime My B's differentiated capabilities.

---

## LINE Official Account Pricing

Since LINE is the primary alert delivery channel for Thai farmers (98% smartphone penetration), its cost structure directly affects Prime My B's operating costs:

| Plan | Monthly Fee | Free Messages/Month | Additional Message | Cost per Farmer/Month |
|------|-------------|---------------------|-------------------|----------------------|
| **Free** | 0 THB | 200-1,000 | 1.0 THB | 0 THB (pilot only) |
| **Light** | ~1,700 THB | 10,000 | ~0.5 THB | ~0.17 THB (per 100 farmers) |
| **Standard** | ~5,100 THB | 40,000 | ~0.3 THB | ~0.13 THB (per 400 farmers) |
| **Pro** | 1,500 THB | 35,000 | 0.04 THB | ~0.04 THB (per 350 farmers) |

**Best Value:** The Pro plan at 1,500 THB/month is the most cost-effective for alert delivery at scale. With 35,000 free messages per month and 350 farmers receiving ~100 alerts each, the per-farmer cost is negligible (0.04 THB/farmer/month). This means LINE alert delivery does not significantly affect Prime My B's cost structure.

### LINE Mini App (Dashboard Inside LINE)

| Component | Cost | Notes |
|-----------|------|-------|
| Development | 50,000-200,000 THB one-time | Custom LINE Mini App development |
| LINE Platform Fee | 0 THB/month | No additional platform fee for Mini Apps |
| Hosting | ~500-2,000 THB/month | Backend server costs |

---

## Pricing Model Comparison

### Thailand Market: Four Viable Models

| Model | Examples | Revenue Potential | Farmer Adoption | Recommendation |
|-------|----------|------------------|----------------|---------------|
| **Free + B2B** | Ricult, HandySense | HIGH (at scale) | VERY HIGH | ⭐ PRIMARY |
| **Government-subsidized** | DEPA OTOD, dtac | MEDIUM | HIGH | ⭐ LAUNCH |
| **Low-cost subscription** | dtac (30 THB/mo) | LOW per user | MODERATE | ⭐ SUPPLEMENTARY |
| **Hardware sales** | HandySense | MEDIUM | HIGH | ⭐ COMPLEMENTARY |

### Models That Don't Work in Thailand

| Model | Why It Fails | Western Example |
|-------|-------------|-----------------|
| Per-hectare SaaS | Farms too small (0.8-1.6 ha typical) | Farm21, Agworld |
| Per-sensor subscription | Farmers resist recurring fees | Mimosa Technology (Vietnam) |
| High-value annual SaaS | 50-100x above WTP | Cropin, Agworld |
| Pay-per-use | Hard to verify value delivered | Theoretical |
| Freemium with low conversion | Conversion rates very low in SEA | General SaaS in developing markets |

---

## Key Takeaways

1. **HandySense sets the free baseline** — any feature that HandySense provides for free (basic alerts, dashboard, LINE integration) cannot be charged for. Prime My B must charge only for unique, coffee-specific capabilities.
2. **Farmer WTP ceiling is <80 THB/month** — this is the hard constraint for any direct-to-farmer pricing. The only proven farmer-paid subscription is dtac at 30 THB/month.
3. **Hardware margins will compress** — global IoT node costs have fallen from $145 to $68 in 5 years. Do not build the business on hardware margins; build it on intelligence.
4. **B2B is where the money is** — Ricult proves that free-for-farmers + B2B revenue is the dominant successful model.
5. **LINE is essentially free at scale** — at 1,500 THB/month for 35,000 messages, per-farmer alert delivery cost is negligible.
6. **CLR early warning and quality prediction are the only features farmers will pay for** — everything else is available free elsewhere.
7. **Government grants can fund the launch** — DEPA OTOD provides up to 200,000 THB per community project.

---

## Related Topics

- [[Monetization-Strategy]] — How to combine these benchmarks into a sustainable business model
- [[Farmer-Pricing-Model]] — Specific pricing tiers for farmer-facing services
- [[B2B-Revenue-Streams]] — Revenue from exporters, banks, and government
- [[Government-Grant-Funding]] — How to use DEPA and BAAC programs to fund deployment
- [[Commercial-IoT-Products]] — Detailed competitive product analysis
- [[System-Cost-Estimate]] — Prime My B's hardware cost analysis

---

## References

1. Gravitech Thai. "HandySense Pro V3 & Pro Max V2." store.gravitechthai.com. Accessed 2026.
2. ArtronShop. "HandySense Basic Kit." artronshop.co.th. Accessed 2026.
3. Ricult. "Revenue Model." The Story Thailand. Accessed 2026.
4. GSMA. "dtac Smart Farmer." gsma.com/mobilefordevelopment. Accessed 2026.
5. LINE Messaging API Pricing. developers.line.biz. Accessed 2026.
6. Farm21. "SaaS Pricing." farm21.com. Accessed 2026.
7. ANDE. "Smallholder AgriTech Business Models in SEA." andeglobal.org. Accessed 2026.
8. DataIntelo. "IoT Node Cost Trends." 2025.
9. Academic research on farmer WTP. 2025.

---

*Last updated: 2026-05-13*
