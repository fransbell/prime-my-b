---
topic: Farmer Pricing Model
phase: 08-Pricing-Monetization
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [farmer, pricing, tier, free, premium, subscription, line, thailand, coffee, wtp, smallholder]
related: [[Competitive-Pricing-Benchmarks]], [[Monetization-Strategy]], [[B2B-Revenue-Streams]], [[Government-Grant-Funding]], [[Farmer-Alert-UX-Design]], [[Visualization-Dashboard]]
---

# Farmer Pricing Model

> **Summary**: Detailed pricing tiers and feature packages for Prime My B's farmer-facing services — a three-tier model (Free, Premium, Cooperative) designed to maximize adoption through a generous free tier while capturing value from farmers who benefit most from advanced predictions.

---

## Overview

Designing a farmer pricing model for Prime My B requires balancing two opposing forces: the need for maximum adoption (which demands free or near-free access) against the need for revenue sustainability (which requires some farmers to pay). The resolution is a three-tier model where the free tier is generous enough to drive adoption across the entire Northern Thailand coffee community, the premium tier is priced under the 80 THB/month willingness-to-pay ceiling and delivers genuinely unique value (quality prediction, advanced CLR warning), and the cooperative tier enables community enterprises to share costs across multiple farms. The critical design principle is that the free tier must never be degraded — all future premium features must be genuinely new capabilities, not restrictions on existing free functionality.

---

## Three-Tier Farmer Pricing Model

### Tier 1: Free — "Prime My B Essentials"

The free tier is the foundation of the entire business model. It must be good enough that farmers choose Prime My B over HandySense for basic monitoring, creating the user base that enables B2B monetization.

| Feature | Details | Why It's Free |
|---------|---------|--------------|
| **LINE chatbot alerts** | Up to 5 alerts/day; Thai language; actionable recommendations | HandySense offers LINE alerts free; cannot charge for this |
| **Sensor dashboard (mobile)** | Read-only; 7-day data history; basic charts | HandySense provides dashboard free; must match |
| **CLR risk notification** | Basic HIGH/MEDIUM/LOW risk based on leaf wetness + temp + humidity | Proves value by preventing crop loss; too important to gate |
| **Weather integration** | Thai Meteorological Department data; 7-day forecast | Widely available free; cannot charge |
| **Coffee seasonal tips** | Monthly cultivation advice via LINE broadcast; Thai language | DOAE/HRDI provide free; cannot charge |
| **Community access** | Knowledge base (Phases 1-6 content); farmer forum | Open knowledge; builds trust and engagement |
| **Yield summary** | End-of-season yield estimate (after harvest) | Demonstrates prediction capability; teaser for premium |
| **Sensor count** | Up to 5 sensor nodes per farm | Sufficient for 5-10 rai farm; basic monitoring |

**Cost to Farmer: 0 THB/month**
**Cost to Prime My B: ~12-35 THB/farmer/month** (covered by B2B revenue and grants)

### Tier 2: Premium — "Prime My B Pro"

The premium tier unlocks the predictive capabilities that are Prime My B's unique differentiation. It is priced at 79 THB/month — just under the 80 THB/month WTP ceiling identified in academic research, and comparable to dtac Smart Farmer's 30 THB/month (but with far more coffee-specific value).

| Feature | Details | Why It's Premium |
|---------|---------|-----------------|
| **Advanced CLR early warning** | 3-7 day CLR risk forecast; spray timing optimization; % risk probability | Unique prediction model; not available anywhere else |
| **Pre-harvest yield prediction** | Monthly yield forecast during growing season; confidence intervals | Helps farmers plan harvest labor, processing capacity, and sales |
| **Quality prediction → SCA estimate** | Predicted SCA cup score range; specialty vs. commodity grade; THB/kg price estimate | Highest-value feature; justifies specialty pricing to buyers |
| **Extended sensor history** | 90-day data history (vs. 7-day free); trend analysis; seasonal comparison | Power user feature; most farmers don't need this |
| **Multi-zone monitoring** | Up to 15 sensor nodes; separate zones per farm section | For larger farms (10-30 rai) or varied terrain |
| **Brix-guided harvest timing** | Optimal cherry harvest window based on heat accumulation (GDD) | Improves picking quality; direct revenue impact |
| **Priority LINE support** | Direct chat with coffee agronomist; 24-hour response | Premium service; most farmers use community support |
| **Monthly farm report** | PDF summary of sensor data, predictions, and recommendations; shareable | Useful for BAAC loan applications and cooperative reporting |

**Cost to Farmer: 79 THB/month (~2,600 THB/year)**
**Target Conversion Rate: 10-15% of free users after 12-18 months**

### Tier 3: Cooperative — "Prime My B Community"

The cooperative tier enables community enterprises (the BAAC-registered groups of 5+ farmers) to share costs and access advanced features collectively. This tier is designed for the community-centric farming model that is common in Northern Thailand's coffee regions (Doi Tung model, Royal Project model).

| Feature | Details | Why It's Cooperative |
|---------|---------|---------------------|
| **All Premium features** | Every feature from Tier 2, shared across member farms | Group benefit; justifies collective investment |
| **Multi-farm dashboard** | Compare sensor data across all member farms; identify best practices | Only relevant for groups managing multiple farms |
| **Cooperative yield aggregate** | Total predicted yield for the cooperative; helps processing planning | Value for community processing facilities |
| **BAAC loan report generation** | Automated farm performance report for BAAC loan applications | Direct financial benefit; 0.01% loan access |
| **Cooperative manager portal** | Web dashboard for cooperative manager; alerts for all member farms | Management tool; individual farmers don't need this |
| **Bulk sensor pricing** | Discounted hardware bundles for cooperative purchase | Volume purchasing; reduces per-farm hardware cost |
| **Training workshops** | Quarterly on-farm training sessions; guest agronomists | Community building; shared learning |
| **Market linkage** | Direct connection to specialty coffee buyers; quality certification | Group market access; premium pricing for all members |

**Cost to Cooperative: 500-2,000 THB/month depending on size**
**Per-Farmer Cost: 50-100 THB/month (split among 5-20 members)**

---

## Pricing Justification by Feature

### Why 79 THB/month for Premium?

| Comparison | Price | Value Delivered |
|-----------|-------|----------------|
| dtac Smart Farmer | 30 THB/month | Basic IoT alerts + weather |
| Prime My B Premium | 79 THB/month | Coffee-specific predictions + CLR warning + quality prediction |
| Farmer WTP ceiling | 80 THB/month | Maximum acceptable price |
| Quality prediction value | ~62,500 THB/year | 10% quality improvement on 10-rai farm |
| Premium ROI | 79 × 12 = 948 THB/year | 948 THB invested → 62,500 THB potential gain = 65x ROI |

The 79 THB/month price is justified because Prime My B Premium delivers 65x return on investment for a 10-rai specialty coffee farm. Even if the quality improvement is only 2% (not 10%), the ROI is still 13x.

### Why Free CLR Warning (Not Premium-Only)?

CLR early warning is offered in the free tier (basic version) because:

1. **It prevents catastrophic crop loss** — CLR can destroy 30-50% of a coffee harvest. Gating this behind a paywall would be morally questionable and strategically counterproductive.
2. **It builds trust** — farmers who receive a CLR warning that saves their crop will trust Prime My B's other predictions.
3. **It drives B2B value** — exporter subscriptions are more valuable when more farms are monitored for CLR risk, because regional CLR outbreaks affect supply chains.
4. **The premium version adds precision** — free gets HIGH/MEDIUM/LOW risk; premium gets 3-7 day forecast with spray timing optimization and risk probability percentage.

### Why Quality Prediction Is Premium-Only

Quality prediction is the premium moat because:

1. **It is completely unique** — no other product in Thailand offers pre-harvest coffee quality prediction for any crop.
2. **It has the highest financial impact** — moving from commodity to specialty grade is a 3-10x price increase.
3. **It requires significant R&D investment** — the models linking sensor data to SCA scores require 2+ seasons of training data.
4. **Farmers who care about quality can afford it** — specialty coffee producers already invest in quality-oriented practices (selective picking, controlled fermentation); 79 THB/month is trivial compared to these investments.

---

## Onboarding & Conversion Strategy

### Free-to-Premium Conversion Path

```
Month 1-3:  Free onboarding → farmer receives sensor alerts, sees dashboard
Month 3-6:  First CLR warning event → farmer sees prediction save crop loss
Month 6-9:  First growing season → monthly yield summary builds trust
Month 9-12: Harvest → yield prediction validated against actual harvest
Month 12+:  Premium introduction → quality prediction + advanced features offered
```

### Conversion Tactics

| Tactic | Timing | Expected Impact |
|--------|--------|----------------|
| **End-of-season yield comparison** | After harvest | Show predicted vs. actual yield; demonstrate accuracy |
| **Quality prediction preview** | Month 10-12 | One free quality prediction before harvest; show SCA estimate |
| **Neighbor comparison** | Ongoing | "3 farmers in your area upgraded to Pro" — social proof |
| **BAAC loan integration** | Year 2 | Premium report accepted for BAAC Community Enterprise loan |
| **Cooperative group discount** | Year 2 | 20% discount for groups of 5+ farmers upgrading together |

### Expected Conversion Rates

Based on freemium SaaS benchmarks in developing markets:

| Segment | Expected Free-to-Premium Conversion | Time to Convert |
|---------|-------------------------------------|-----------------|
| Subsistence farmer (<3 rai) | 0-2% | Never |
| Smallholder (3-10 rai) | 5-10% | 12-18 months |
| Progressive farmer (10-30 rai) | 15-25% | 6-12 months |
| Community enterprise | 40-60% | 3-6 months |
| Specialty coffee producer | 30-50% | 6-12 months |

---

## Hardware Pricing

### Sensor Kit Bundles

| Bundle | Sensors | Price (THB) | Target User | vs. HandySense |
|--------|---------|-------------|-------------|----------------|
| **Starter Kit** | Soil moisture + temp + humidity + light | 2,500 | 5 rai basic | Cheaper than HandySense Basic (3,100) |
| **Coffee Health Kit** | Above + leaf wetness + rainfall | 5,500 | CLR-risk farms | HandySense lacks leaf wetness |
| **Full Coffee Kit** | All 9 sensors + LoRa | 9,500 | 10+ rai premium | Comparable to HandySense Pro Max |
| **Cooperative Bundle** | 5× Full Coffee Kit + gateway | 35,000 | Community enterprise | Bulk discount; per-farm = 7,000 |

**Important:** Hardware pricing should be near-cost. The goal is not hardware profit but platform adoption. Every deployed sensor kit generates data that enables B2B revenue.

### Hardware Financing Options

| Option | Monthly Cost | Total Cost | Provider |
|--------|-------------|-----------|---------|
| **Outright purchase** | 0 (after purchase) | 2,500-9,500 | Direct |
| **BAAC Community Enterprise Loan** | ~0.21 THB/month (0.01%/yr on 5,500 THB) | 5,500 + ~0.25 THB interest/year | BAAC |
| **DEPA OTOD grant** | 0 | 0 (grant covers) | DEPA |
| **Installment (12 months)** | 210-790 THB/month | 2,500-9,500 | Partner finance |

---

## Competitive Positioning of Pricing

| Platform | Free Tier | Paid Tier | Premium Price | Coffee-Specific |
|----------|-----------|-----------|---------------|----------------|
| **HandySense** | ✅ Full platform | ❌ None | 0 THB | ❌ |
| **Ricult** | ✅ Full platform | ❌ None | 0 THB | ❌ |
| **dtac Smart Farmer** | ⚠️ 60-day trial | ✅ | 30 THB/month | ❌ |
| **SPsmartplants** | ❌ None | ✅ | Contact for pricing | ❌ (durian) |
| **Prime My B Free** | ✅ Alerts + dashboard + basic CLR | ❌ | 0 THB | ✅ |
| **Prime My B Premium** | — | ✅ | 79 THB/month | ✅ |
| **Prime My B Cooperative** | — | ✅ | 500-2,000 THB/group | ✅ |

---

## Key Takeaways

1. **Free tier must be genuinely valuable** — match HandySense on basic features, exceed it on coffee-specific value (basic CLR warning).
2. **79 THB/month is the sweet spot** — under the 80 THB/month WTP ceiling, with 65x ROI justification for specialty farmers.
3. **Quality prediction is the premium gate** — it is unique, high-value, and justifies the subscription.
4. **Cooperative tier enables community adoption** — per-farmer cost of 50-100 THB/month when shared across a group.
5. **Hardware should be near-cost** — sensor kits drive adoption and data generation, not profit.
6. **Conversion takes 12-18 months** — farmers need to see a full harvest cycle with validated predictions before paying.
7. **Never degrade the free tier** — premium features must be genuinely new, not restricted existing features.

---

## Related Topics

- [[Competitive-Pricing-Benchmarks]] — Market pricing data that informed these tiers
- [[Monetization-Strategy]] — How farmer pricing fits into the four-tier framework
- [[B2B-Revenue-Streams]] — The revenue that subsidizes free farmer access
- [[Government-Grant-Funding]] — Grants that cover hardware costs for farmers
- [[Farmer-Alert-UX-Design]] — LINE bot UX design for alert delivery
- [[Visualization-Dashboard]] — Dashboard design for free and premium tiers
- [[Yield-Quality-Prediction]] — Prediction models that justify premium pricing

---

## References

1. Academic research on farmer WTP (<80 THB/month). 2025.
2. GSMA. "dtac Smart Farmer." gsma.com/mobilefordevelopment. Accessed 2026.
3. Ricult. "Revenue Model." The Story Thailand. Accessed 2026.
4. ANDE. "Smallholder AgriTech Business Models in SEA." andeglobal.org. Accessed 2026.
5. BAAC. "Community Enterprise Loan." baac.or.th. Accessed 2026.

---

*Last updated: 2026-05-13*
