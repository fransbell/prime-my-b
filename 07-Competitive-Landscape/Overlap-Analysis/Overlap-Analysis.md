---
topic: Overlap Analysis & Positioning Strategy
phase: 07-Competitive-Landscape
status: complete
created: 2026-05-13
updated: 2026-05-13
tags: [overlap, competitive-analysis, positioning, differentiation, strategy, coffee-iot, thailand, yield-prediction, quality-prediction]
related: [[Government-IoT-Platforms]], [[Commercial-IoT-Products]], [[Coffee-Region-Projects]], [[Yield-Quality-Prediction]], [[Visualization-Dashboard]]
---

# Overlap Analysis & Positioning Strategy

> **Summary**: Comprehensive competitive overlap analysis of all IoT agriculture products and projects in Thailand, identifying the market gap that Prime My B fills and defining the strategic positioning that differentiates it from every existing platform.

---

## Overview

The Thai IoT agriculture landscape is crowded at the general-purpose level but completely empty at the coffee-specific level. Government platforms provide free, crop-agnostic IoT infrastructure. Commercial products range from satellite-based yield prediction to drone imaging to crop-specific monitoring for durian and rice. Northern Thailand's coffee region hosts world-renowned development projects that lack IoT analytics entirely. This analysis maps the competitive overlap across all dimensions — sensors, dashboard, yield prediction, quality prediction, coffee focus, and regional specialization — to identify exactly where Prime My B's differentiation lies and how to position it for maximum market impact.

---

## Complete Overlap Matrix

### Full Competitive Landscape

| Competitor | IoT Sensors | Dashboard | Yield Prediction | Quality Prediction | Coffee Focus | N. Thailand | LINE | Free for Farmers |
|-----------|:-----------:|:---------:|:----------------:|:------------------:|:------------:|:-----------:|:----:|:----------------:|
| **HandySense B-Farm** | ✅ | ✅ | ⚠️ Indirect | ❌ | ❌ | ❌ | ❌ | ✅ Cloud |
| **NECTEC Predictive** | ✅ | ❓ | ✅ | ⚠️ | ❌ | ❌ | ❌ | Unknown |
| **DEPA OTOD** | ✅ Distributes | ❌ | ❌ | ❌ | ❌ | ⚠️ | ❌ | ✅ Hardware |
| **Agriculture 4.0** | ❌ Policy | ❌ | ❌ Policy | ❌ | ❌ | ❌ | ❌ | Policy |
| **Ricult** | ❌ Satellite | ✅ App | ✅ | ❌ | ❌ | ❌ | ❌ | ✅ |
| **SkyVIV** | ❌ Drones | ✅ | ✅ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| **SPsmartplants** | ✅ | ✅ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ |
| **dtac Smart Farmer** | ✅ | ✅ App | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ Trial |
| **Swift Dynamics** | ✅ | ✅ | ⚠️ | ⚠️ | ❌ | ❌ | ❌ | ❌ |
| **KhawTECH** | ✅ | ✅ | ❌ | ❌ | ❌ | ❌ | ❌ | ⚠️ Gateway |
| **Easyrice** | ❌ Camera | ✅ | ❌ | ✅ Rice | ❌ | ❌ | ❌ | ❌ |
| **Doi Tung** | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ | ❌ | N/A |
| **Royal Project + Kiao** | ✅ Control | ⚠️ Control | ❌ | ❌ | ✅ | ✅ | ❌ | N/A |
| **Prime My B (Target)** | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | TBD |

### Overlap Scoring (0-5 scale)

| Competitor | Sensors | Dashboard | Yield Pred. | Quality Pred. | Coffee | N. Thailand | **Total** |
|-----------|:-------:|:---------:|:-----------:|:-------------:|:------:|:-----------:|:---------:|
| **HandySense B-Farm** | 5 | 5 | 2 | 0 | 0 | 0 | **12** |
| **NECTEC Predictive** | 5 | 2 | 5 | 2 | 0 | 0 | **14** |
| **Ricult** | 1 | 4 | 5 | 0 | 0 | 0 | **10** |
| **SkyVIV** | 1 | 3 | 4 | 1 | 0 | 0 | **9** |
| **SPsmartplants** | 5 | 5 | 0 | 0 | 0 | 1 | **11** |
| **dtac Smart Farmer** | 4 | 4 | 0 | 0 | 0 | 0 | **8** |
| **Swift Dynamics** | 4 | 4 | 2 | 2 | 0 | 0 | **12** |
| **Doi Tung** | 0 | 0 | 0 | 0 | 5 | 5 | **10** |
| **Royal Project + Kiao** | 3 | 1 | 0 | 0 | 5 | 5 | **14** |

**Prime My B would score 30/30** — the only product that combines all six dimensions.

---

## The Gap: What Nobody Does

### Three Critical Gaps in the Market

After analyzing every significant IoT agriculture product and project in Thailand, three capabilities remain completely unaddressed by any existing offering:

#### Gap 1: Coffee-Specific IoT Monitoring

Every existing IoT platform in Thailand is either crop-agnostic (HandySense, Swift Dynamics) or focused on other crops (SPsmartplants for durian, KhawTECH for rice, Easyrice for rice quality). No platform offers coffee-specific sensor selection, coffee-specific thresholds, or coffee-specific decision rules.

**What this means:** A coffee farmer using HandySense receives generic alerts like "soil moisture is low" without understanding that for Arabica coffee at 1,000m altitude during the cherry development stage, the optimal soil moisture range is 40-60% (not the generic 30-70% that HandySense might use). Prime My B's [[Sensor-Metrics-Thresholds]] provide these coffee-specific values across 10 sensor types, 4 coffee types, and multiple growth stages.

**Evidence of gap:**
- HandySense: No coffee-specific sensor profiles or thresholds
- Ricult: No ground-level sensors at all; satellite data cannot measure leaf wetness, soil moisture at root depth, or shade percentage
- SPsmartplants: Durian focus; their sensor suite lacks leaf wetness (critical for CLR detection in coffee)
- Academic research: ARIMA and ANN models for coffee yield prediction exist but have never been operationalized in a farmer-facing product

#### Gap 2: Coffee Quality Prediction

No product in Thailand — government, commercial, or academic — offers pre-harvest coffee quality prediction. Easyrice offers rice quality inspection (post-harvest, using computer vision), but this is a fundamentally different capability from predicting coffee quality based on growing conditions before harvest.

**What this means:** Specialty coffee in Thailand sells for 280-500+ THB/kg (3-10x commodity prices of 80-120 THB/kg). The difference between commodity and specialty grade is determined by growing conditions — diurnal temperature range, shade percentage, harvest timing, cherry maturity — all of which IoT sensors can measure and predict. Prime My B's [[Yield-Quality-Prediction]] models link sensor-verified conditions to SCA cup scores and THB pricing, giving farmers a financial incentive to invest in quality-oriented farming practices.

**Evidence of gap:**
- No existing platform in Thailand predicts coffee quality before harvest
- The specialty coffee price premium (3-10x over commodity) makes quality prediction financially significant
- Coffee quality is determined by measurable environmental factors (DTR, shade, soil moisture during cherry development) that ground sensors can capture

#### Gap 3: Coffee Disease Prediction (CLR Early Warning)

While HandySense Pro Max mentions "disease/pest detection" in its marketing, it does not offer coffee-specific disease models. Coffee Leaf Rust (CLR / Hemileia vastatrix) is the single most devastating coffee disease in Thailand, and its prediction requires specific sensor inputs that no existing platform provides.

**What this means:** CLR prediction requires continuous monitoring of leaf wetness duration (>24h = HIGH risk), temperature (20-25°C optimal for CLR), and humidity (>80%). No existing Thai IoT platform includes leaf wetness sensors. Prime My B's [[Pest-Disease-Management]] and [[Decision-Logic]] include CLR-specific IF-THEN rules that trigger preventive action before infection occurs, potentially saving 30-50% of a crop.

**Evidence of gap:**
- HandySense: No leaf wetness sensor; no CLR-specific model
- SPsmartplants: Durian-focused; no CLR relevance
- Ricult: Satellite data cannot detect microclimate conditions that trigger CLR
- Academic literature clearly establishes the CLR prediction parameters, but no product has operationalized them

---

## Positioning Strategy

### Prime My B's Differentiated Position

Based on the competitive analysis, Prime My B should be positioned as:

> **The coffee-specific IoT intelligence layer for Northern Thailand — the only platform that combines ground-level sensors, coffee-specific models, yield and quality prediction, and Thai-language LINE alerts to help coffee farmers produce higher-quality, higher-quantity coffee.**

### Positioning Against Each Competitor Type

#### vs. Government Platforms (HandySense, NECTEC)

**Position: "We add coffee intelligence to government infrastructure."**

| Dimension | Government Platforms | Prime My B |
|-----------|---------------------|------------|
| Approach | General-purpose | Coffee-specific |
| Thresholds | Generic ranges | Coffee-type + growth-stage specific |
| Prediction | None or basic | Yield + quality + CLR disease |
| Alerts | Generic | Coffee-actionable (Thai language, LINE) |
| Model | One-size-fits-all | Variety-specific sensor profiles |

**Messaging:** "HandySense tells you what's happening. Prime My B tells you what to do about it — for your specific coffee variety, at your altitude, in your season."

#### vs. Satellite/Drone Platforms (Ricult, SkyVIV)

**Position: "We see what satellites can't — the microclimate inside your coffee canopy."**

| Dimension | Satellite/Drone | Prime My B |
|-----------|----------------|------------|
| Data source | Aerial/satellite imagery | Ground-level sensors |
| Resolution | Field-level | Plant-level |
| Frequency | Periodic (days/weeks) | Continuous (every 15 min) |
| Canopy interior | Cannot see inside canopy | Sensors at plant level |
| CLR detection | Cannot detect | Leaf wetness + microclimate |
| Shade measurement | Approximate (NDVI) | Precise (PPFD sensors) |
| Cost | Drone operations expensive | One-time sensor deployment |

**Messaging:** "Satellites see your farm from space. We see your coffee from the ground — where CLR starts, where shade matters, where soil moisture determines cherry quality."

#### vs. Other Crop-Specific Platforms (SPsmartplants)

**Position: "Different crop, different science, same proven model."**

| Dimension | SPsmartplants (Durian) | Prime My B (Coffee) |
|-----------|----------------------|---------------------|
| Crop | Durian | Arabica/Robusta coffee |
| Focus | Control automation | Prediction + advisory |
| Prediction | None | Yield + quality + disease |
| LINE integration | ✅ | ✅ (planned) |
| Market size | Durian ~20,000 THB/fruit | Specialty coffee 280-500+ THB/kg |
| Farmer profile | Orchard owner | Smallholder (5-10 rai) |

**Messaging:** "SPsmartplants proved that Thai farmers adopt crop-specific IoT. We're applying the same model to coffee — with prediction capabilities that even SPsmartplants doesn't offer."

#### vs. Coffee Region Projects (Doi Tung, Royal Project)

**Position: "We're your technology partner, not your competitor."**

| Dimension | Doi Tung/Royal Project | Prime My B |
|-----------|----------------------|------------|
| Role | Coffee institution | Technology provider |
| Expertise | Decades of coffee knowledge | IoT + data science |
| Farmer network | Established (30+ villages, 22 centers) | Building |
| Technology | None (Doi Tung) or basic (RPF + Kiao) | Full IoT + prediction stack |
| Data | Historical production records | Real-time sensor data + models |

**Messaging:** "You know coffee. We know data. Together, we give Northern Thailand's coffee farmers the best of both worlds."

---

## Strategic Recommendations

### 1. Build on HandySense, Don't Compete With It

HandySense's open-source hardware designs and free cloud platform provide a foundation that Prime My B should leverage rather than replicate. The strategy should be:

- Use HandySense-compatible hardware for sensor nodes (reduces development cost and leverages NECTEC's manufacturing ecosystem)
- Build Prime My B as a **coffee-specific analytics layer on top of HandySense data** (like how apps build on top of operating systems)
- Integrate with HandySense's data format and API for seamless data flow
- Add coffee-specific capabilities that HandySense cannot provide: leaf wetness sensors, CLR models, yield/quality prediction, LINE alerts

### 2. Partner With Doi Tung for Pilot Validation

Doi Tung's brand recognition and Chiang Rai location make it the ideal pilot partner. The approach should be:

1. Propose a 3-farm, 6-month pilot deploying Prime My B sensors alongside Doi Tung's existing farming practices
2. Demonstrate CLR early warning (the most immediate value proposition)
3. Compare predicted yield/quality against actual harvest results
4. Use pilot results to approach the Royal Project and other coffee communities

### 3. Complement Kiao, Don't Replace It

The Royal Project's Kiao Farming partnership provides hardware control (irrigation, fertigation). Prime My B should position itself as the "brain" that tells Kiao's "hands" what to do:

- Prime My B sensors collect data and run prediction models
- Prime My B decision engine generates irrigation/fertigation recommendations
- Kiao control boxes execute the recommendations automatically
- This creates a complete sensor → intelligence → actuation pipeline

### 4. Differentiate on Quality Prediction

Quality prediction is Prime My B's most unique capability — no competitor in Thailand offers it for any crop. This should be the headline differentiator:

- "Predict your coffee quality before harvest"
- "Know your SCA score before you pick"
- "Specialty or commodity? Your sensors can tell you 3 months before harvest"

The financial impact is compelling: moving from commodity (80-120 THB/kg) to specialty (280-500+ THB/kg) represents a 3-10x price increase. Even a modest quality improvement justified by sensor data can generate thousands of THB per rai in additional revenue.

### 5. Prioritize LINE Over Custom App

SPsmartplants uses LINE for alerts; dtac Smart Farmer uses a custom app. Given that 98% of Thai smartphone users use LINE daily, and that farmers are already comfortable with LINE (they use it for everything from messaging to payments), Prime My B should:

- Deliver all alerts via LINE Official Account / LINE bot (see [[Farmer-Alert-UX-Design]])
- Use LINE Mini App for lightweight dashboard access inside LINE
- Reserve web dashboard for power users and agricultural extension officers
- This eliminates app installation friction and leverages existing farmer behavior

### 6. Apply for DEPA Funding as Technology Partner

DEPA's OTOD program and d-transform grants provide up to 200,000 THB for smart farming projects. Prime My B should:

- Apply as an OTOD technology partner for Northern Thailand coffee communities
- Use d-transform funding for pilot deployment across multiple tambons
- Leverage Agriculture 4.0 alignment for additional government support
- This provides free hardware distribution and government credibility

---

## Market Opportunity Sizing

### Coffee IoT Market in Northern Thailand

| Segment | Size | Potential |
|---------|------|-----------|
| **Arabica farmers in Northern Thailand** | ~12,000+ households (DOAE target) | Primary market |
| **Royal Project + Doi Tung farmer networks** | ~500+ organized farmers | Early adopter segment |
| **Specialty coffee producers** | Growing segment (2016 Thai coffee revolution) | Highest value segment |
| **Robusta farmers (lower altitude)** | Additional market | Expansion segment |
| **Coffee processors/exporters** | B2B data customers | Revenue diversification |

### Revenue Potential Estimate

| Revenue Stream | Year 1 (Pilot) | Year 3 (Scale) | Notes |
|---------------|----------------|----------------|-------|
| Hardware sales (sensor kits) | 250,000 THB | 3,000,000 THB | 50 kits → 500 kits at ~6,000 THB |
| B2B data subscriptions | 0 THB | 1,200,000 THB | Exporters, traders pay for quality predictions |
| Government project fees | 200,000 THB | 2,000,000 THB | DEPA, Royal Project deployment contracts |
| Premium farmer tier (optional) | 0 THB | 600,000 THB | <80 THB/month for advanced features |
| **Total** | **450,000 THB** | **6,800,000 THB** | |

---

## Key Takeaways

1. **The market gap is clear and significant** — no product in Thailand offers coffee-specific IoT + yield prediction + quality prediction + Northern Thailand regional focus. This is a greenfield opportunity.
2. **Government platforms are infrastructure, not competition** — HandySense and NECTEC provide the base layer; Prime My B provides the coffee intelligence layer. Position as complementary, not competitive.
3. **Quality prediction is the killer feature** — it is completely unaddressed by any competitor and has the highest financial impact (3-10x commodity-to-specialty price gap).
4. **Partnership > competition** — Doi Tung, Royal Project, and Kiao are potential partners who need exactly what Prime My B offers. Lead with partnership, not disruption.
5. **LINE is the delivery channel** — not a custom app. Meet farmers where they already are.
6. **DEPA funding can finance the launch** — government grants align perfectly with Prime My B's positioning as an Agriculture 4.0 implementation for coffee.
7. **The competition validates the market** — 30+ agri-tech startups and multiple government programs confirm that IoT agriculture is a growing market in Thailand. The coffee niche is simply the underserved segment within that market.

---

## Related Topics

- [[Government-IoT-Platforms]] — Detailed analysis of government IoT platforms
- [[Commercial-IoT-Products]] — Detailed analysis of commercial products
- [[Coffee-Region-Projects]] — Northern Thailand coffee projects
- [[Yield-Quality-Prediction]] — Prime My B's prediction models
- [[Visualization-Dashboard]] — Dashboard design specifications
- [[Farmer-Alert-UX-Design]] — LINE bot alert design
- [[Pest-Disease-Management]] — CLR prediction capability
- [[Coffee-Economics]] — Specialty vs. commodity pricing analysis

---

## References

1. All sources from [[Government-IoT-Platforms]], [[Commercial-IoT-Products]], and [[Coffee-Region-Projects]]
2. DOAE. "Coffee Production Elevation Strategy 2025-2027."
3. Tracxn. "Smart Farming Startups in Thailand." 2026.
4. SCA (Specialty Coffee Association). "Coffee Quality Standards."
5. AIMS Press. "Forecasting arabica coffee yields by ARIMA." 2023.

---

*Last updated: 2026-05-13*
