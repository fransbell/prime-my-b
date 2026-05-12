---
topic: Alerts & Remediation Actions
phase: 5
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [alerts, remediation, actions, warning, critical, farmer-action, thailand]
related: [Sensor-Metrics-Thresholds, Decision-Logic, Environment-Intervention, Leaf-Wetness-Sensors, Humidity-Sensors]
---

# Alerts & Remediation Actions

> **Summary**: Alerts are the farmer-facing output of the IoT decision system. This document defines every alert the system can produce, the conditions that trigger them, the severity levels, recommended remediation actions with Thailand-specific costs, and the delivery system that ensures the right alert reaches the right person at the right time — without causing alert fatigue.

---

## 1. Overview

Alerts represent the final, most critical link in the sensor-to-action pipeline. A sensor that measures leaf wetness without triggering an actionable alert when conditions become dangerous is just an expensive ornament. The entire purpose of the [[Decision-Logic]] engine and [[Sensor-Metrics-Thresholds]] system is to distill hundreds of data points per day into a small number of clear, prioritized, actionable messages that a farmer can act on confidently.

The design philosophy for this alert system rests on three pillars:

1. **RIGHT Alert** — Every alert must be specific, accurate, and based on validated thresholds for Northern Thailand coffee growing conditions. False positives erode trust; false negatives destroy crops. The system must achieve >90% precision (most alerts are real) and >95% recall (nearly all dangerous conditions are caught).

2. **RIGHT Time** — An alert that arrives too late to act on is worse than no alert at all, because it creates anxiety without agency. Disease risk alerts must arrive 24–48 hours before the optimal intervention window. Frost warnings must arrive before sunset so protective measures can be deployed. The system uses predictive models — not just current conditions — to deliver proactive alerts.

3. **RIGHT Action** — Every alert must include a specific, feasible remediation recommendation. "High CLR risk" is a notification, not an alert. "High CLR risk — apply copper-based fungicide within 24 hours (estimated cost: 180 THB/rai)" is an alert. The farmer should never have to wonder what to do next.

The enemy of effective alerting is **alert fatigue** — when a farmer receives too many low-value notifications and begins ignoring all of them, including the critical ones. Research from agricultural IoT deployments in Southeast Asia shows that farmers stop reading notifications after receiving more than 5–7 non-actionable alerts per day. This system is designed to stay well below that threshold through smart deduplication, severity filtering, and quiet-hour rules (see Section 6).

---

## 2. Alert Level Definitions

The system uses a four-tier severity model aligned with international agricultural advisory standards. Each level defines not just urgency, but also the delivery method, escalation behavior, and expected farmer response time.

| Attribute | 🟢 INFO | 🟡 WARNING | 🟠 CRITICAL | 🔴 EMERGENCY |
|-----------|---------|-----------|------------|-------------|
| **Meaning** | Conditions optimal or favorable | Approaching suboptimal; monitor | Harmful conditions; action required | Destructive conditions; immediate action |
| **Display Color** | Green (#4CAF50) | Amber (#FF9800) | Orange (#FF5722) | Red (#F44336) |
| **Push Notification** | Silent (badge only) | Sound + vibration | Sound + vibration + banner | Sound + vibration + full-screen |
| **SMS** | No | No | Yes (if no app ack in 2h) | Yes (immediate) |
| **LINE Message** | Daily summary | Immediate | Immediate | Immediate + group ping |
| **Voice Call** | No | No | No | Yes (to primary + secondary contact) |
| **Dashboard** | Green indicator | Amber indicator with pulse | Orange indicator with flash | Red indicator with alarm icon |
| **Sound** | None | Short chime | Urgent beep (3x) | Continuous alarm |
| **Escalation** | None | None | If no ack in 4 hours → secondary contact | Immediate to secondary contact |
| **Farmer Response** | No action needed | Monitor; prepare | Act within 24–48 hours | Act immediately (within hours) |
| **Examples** | "Optimal growing conditions", "Harvest window open" | "Humidity rising toward CLR risk zone", "Soil moisture declining" | "CLR infection risk HIGH — spray within 48h", "Frost predicted tonight" | "Frost NOW — deploy protection", "Sensor: wildfire smoke detected" |

### Escalation Behavior Detail

- **INFO → WARNING**: Automatic escalation if conditions deteriorate over consecutive readings. No human escalation.
- **WARNING → CRITICAL**: Automatic escalation when thresholds are crossed. System-generated, no human approval needed.
- **CRITICAL escalation**: If the farmer does not acknowledge the alert within 4 hours, the system sends a second notification via SMS and LINE, and alerts the secondary contact (farm manager, spouse, or cooperative leader).
- **EMERGENCY escalation**: The system simultaneously notifies the primary farmer (push + SMS + LINE + voice call) and the secondary contact (SMS + LINE + voice call). If neither acknowledges within 30 minutes, the system escalates to the cooperative's emergency channel (LINE group for the local coffee cooperative).

---

## 3. Complete Alert Catalog

The following table defines every alert the system can generate. Each alert has a unique ID for tracking, deduplication, and historical analysis. Alert IDs follow the pattern `ALR-{category}-{number}`.

| Alert ID | Alert Name | Trigger Condition | Level | Recommended Action | Time to Action | Season |
|----------|-----------|-------------------|-------|-------------------|----------------|--------|
| ALR-DIS-01 | CLR HIGH Risk | LWD >24h AND Temp 18–28°C AND RH >80% | 🟠 CRITICAL | Apply preventive fungicide within 48h; see [[#Disease Remediation]] | 24–48h | Rainy (Jun–Oct) |
| ALR-DIS-02 | CLR EXTREME Risk | LWD >48h AND Temp 18–28°C AND RH >85% | 🔴 EMERGENCY | Apply systemic fungicide immediately; prune severely affected branches | <12h | Rainy (Jun–Oct) |
| ALR-DIS-03 | Black Rot Risk | LWD >36h AND Temp 22–28°C AND recent rain | 🟠 CRITICAL | Improve air circulation; apply copper fungicide; remove infected cherries | 24–48h | Rainy (Jul–Sep) |
| ALR-DIS-04 | CBB Emergence | Temp sustained >25°C AND RH >70% AND post-flowering | 🟡 WARNING | Set CBB traps; inspect cherries for bore holes; prepare Beauveria bassiana | Monitor | Fruiting (Aug–Nov) |
| ALR-DIS-05 | Root Rot Risk | Soil VWC >45% sustained >72h AND Temp >20°C | 🟠 CRITICAL | Improve drainage; reduce irrigation; apply Trichoderma | 24–48h | Rainy (Jun–Sep) |
| ALR-WAT-01 | Drought Stress | Soil VWC <18% sustained >48h | 🟠 CRITICAL | Irrigate immediately; apply mulch layer; see [[#Water Remediation]] | 24h | Dry (Nov–Apr) |
| ALR-WAT-02 | Waterlogging | Soil VWC >50% sustained >24h | 🟠 CRITICAL | Check drainage channels; clear blocked drains; consider raised beds | 24–48h | Rainy (Aug–Sep) |
| ALR-WAT-03 | Irrigation Needed | Soil VWC 18–25% AND no rain forecast 5 days | 🟡 WARNING | Schedule irrigation; prepare drip system | 3–5 days | Dry (Nov–Mar) |
| ALR-WAT-04 | Drainage Check Needed | Soil VWC >40% AND rain forecast >20mm | 🟡 WARNING | Inspect contour drains; clear debris from channels | 1–2 days | Rainy (Jun–Sep) |
| ALR-TEM-01 | Frost Warning | Forecast min temp <5°C OR current <3°C | 🔴 EMERGENCY | Deploy frost protection; see [[#Temperature Remediation]] | Immediate | Cool-Dry (Dec–Jan) |
| ALR-TEM-02 | Heat Stress | Temp >32°C sustained >6h AND VWC <25% | 🟠 CRITICAL | Increase shade; irrigate; apply mulch | 12–24h | Hot-Dry (Mar–May) |
| ALR-TEM-03 | Suboptimal DTR | Diurnal range <7°C sustained >5 days | 🟡 WARNING | Monitor bean quality; adjust shade; may affect flavor development | Monitor | Any |
| ALR-TEM-04 | Cold Damage (Robusta) | Temp <10°C sustained >12h | 🟠 CRITICAL | Deploy windbreaks; consider shade cloth; monitor for damage signs | 24h | Cool-Dry (Dec–Feb) |
| ALR-LIT-01 | Excessive Shade | PAR <200 µmol/m²/s at midday sustained | 🟡 WARNING | Prune shade trees; thin canopy; see [[#Temperature Remediation]] | 1–2 weeks | Any |
| ALR-LIT-02 | Insufficient Shade | PAR >1800 µmol/m²/s at midday AND Temp >30°C | 🟡 WARNING | Plant additional shade trees; install temporary shade cloth | 1–2 weeks | Hot (Mar–May) |
| ALR-LIT-03 | UV Stress Risk | UV index >11 sustained >4h during fruit development | 🟡 WARNING | Increase shade coverage; monitor cherry for sunburn damage | 2–3 days | Hot (Mar–May) |
| ALR-SOI-01 | pH Too Low | Soil pH <4.5 | 🟠 CRITICAL | Apply agricultural lime; see [[#Soil Remediation]] | 1–2 weeks | Any (best pre-monsoon) |
| ALR-SOI-02 | pH Too High | Soil pH >6.5 | 🟡 WARNING | Apply sulfur or acidic organic matter; test with DOA lab | 2–4 weeks | Any |
| ALR-SOI-03 | Nutrient Depletion Suspected | EC <0.3 mS/cm AND pH drift AND leaf symptoms | 🟡 WARNING | Collect soil sample for lab analysis; consider compost application | 2–4 weeks | Any |
| ALR-SOI-04 | Salinity Risk | EC >1.5 mS/cm sustained | 🟠 CRITICAL | Reduce fertilizer application; flush with clean water; test irrigation source | 1–2 weeks | Dry season |
| ALR-HAR-01 | Optimal Harvest Conditions | Dry weather forecast 5+ days AND cherry maturity >80% | 🟢 INFO | Begin harvest; ideal conditions for picking and drying | Plan ahead | Harvest (Nov–Jan) |
| ALR-HAR-02 | Rain During Harvest | Rain >5mm forecast during active harvest | 🟡 WARNING | Cover drying cherries; delay picking if possible; ensure drying area sheltered | Same day | Harvest (Nov–Jan) |
| ALR-HAR-03 | Poor Drying Conditions | RH >75% sustained >48h during drying | 🟠 CRITICAL | Move cherries to covered area; use mechanical drying if available; increase airflow | 12–24h | Harvest (Nov–Jan) |
| ALR-HAR-04 | Cherry Maturity Peak | Cherry color sensor indicates >85% red/purple | 🟡 WARNING | Harvest within 3–5 days to avoid over-ripening and cherry drop | 3–5 days | Harvest (Nov–Jan) |
| ALR-FLW-01 | Flowering Predicted | Dry period >14 days AND rain forecast >10mm | 🟢 INFO | Prepare for flowering; avoid pesticide application; ensure pollinator habitat | 3–7 days | Pre-monsoon (Mar–Apr) |
| ALR-FLW-02 | Unsynchronized Flowering | Multiple small rain events during dry period | 🟡 WARNING | Expect staggered flowering; plan multiple harvest passes; may reduce uniformity | Monitor | Pre-monsoon (Feb–Apr) |
| ALR-SYS-01 | Sensor Offline | No data received >2 hours from expected interval | 🟡 WARNING | Check sensor physically; check battery; check wireless connection | 1–2 days | Any |
| ALR-SYS-02 | Calibration Needed | Sensor drift detected (cross-reference with manual reading) | 🟡 WARNING | Perform manual calibration; compare with DOA lab results | 1–2 weeks | Any |
| ALR-SYS-03 | Battery Low | Battery voltage <3.3V (or <20% estimated) | 🟡 WARNING | Replace or recharge battery within 1 week | 1 week | Any |
| ALR-SYS-04 | Data Anomaly | Reading >3 standard deviations from rolling mean | 🟡 WARNING | Verify sensor; check for damage or interference; replace if faulty | 1–3 days | Any |

---

## 4. Remediation Action Detail

This section provides detailed, actionable remediation steps for each major alert category. All costs are in Thai Baht (THB) and based on 2025–2026 market prices in Northern Thailand. One **rai** (ไร่) = 1,600 m² = 0.16 hectares.

### 4.1 Disease Remediation (CLR Focus)

Coffee leaf rust (*Hemileia vastatrix*) is the single most destructive disease affecting coffee in Northern Thailand. The IoT system's greatest value proposition is precision disease management — applying fungicides only when conditions warrant it, rather than on a fixed calendar schedule.

#### Preventive Fungicide Types Available in Thailand

| Fungicide Type | Active Ingredient | Product Examples | Cost (THB/rai/application) | Effectiveness | Notes |
|---------------|-------------------|-----------------|---------------------------|---------------|-------|
| Copper-based (protectant) | Copper hydroxide / Copper oxychloride | Kocide 3000, Cuproxat | 150–250 | Good (prevention) | Must be applied BEFORE infection; leaves blue residue; max 3–4 applications/season |
| Triazole (systemic) | Propiconazole / Tebuconazole | Tilt, Folicur | 200–350 | Excellent (curative) | Absorbed into leaf tissue; can halt early infections; rotate to prevent resistance |
| Strobilurin (systemic) | Azoxystrobin | Amistar | 250–400 | Very good | Preventive + curative; expensive; limit to 2 applications/season |
| Biological | *Beauveria bassiana* / *Trichoderma* | Local DOA products | 80–150 | Moderate | Organic-certified; best as supplement; requires higher humidity to be effective |

#### Application Timing Based on LWD Data

The critical insight from [[Leaf-Wetness-Sensors]] is that fungicide effectiveness depends on application timing relative to the infection cycle:

| Timing | Condition | Action | Effectiveness |
|--------|-----------|--------|---------------|
| **Pre-infection** (best) | LWD approaching 24h threshold, CLR risk rising | Apply copper-based protectant before rain event | 85–95% prevention |
| **Early infection** (good) | LWD >24h already occurred, within 48h window | Apply systemic triazole to halt developing infection | 70–85% control |
| **Late infection** (poor) | CLR lesions visible on leaves | Systemic fungicide + cultural controls; yield loss likely | 40–60% control |

#### Cultural Controls

Beyond chemical intervention, the following cultural practices reduce CLR pressure and should be recommended alongside any fungicide alert:

- **Pruning**: Remove densely shaded interior branches to improve airflow and reduce LWD by 15–30%. Cost: 200–400 THB/rai in labor.
- **Shade management**: Thin shade trees to 30–40% canopy cover. Excess shade increases LWD; insufficient shade stresses plants. See [[#Temperature Remediation]] for shade tree species.
- **Plant spacing**: Maintain 1.5–2m between Arabica plants. Overcrowding increases humidity within the canopy. For new plantings, follow DOA recommendations.
- **Resistant varieties**: If CLR is chronic, consider replacing susceptible Catimor with more tolerant varieties like Chiang Mai 801 or CIMC 02. See [[Arabica-for-North-Thailand]].

#### Cost Impact: How IoT Data Reduces Fungicide Use

| Approach | Applications/Season | Cost (THB/rai/year) | Chemical Load | CLR Control |
|----------|--------------------|--------------------|---------------|-------------|
| Calendar-based (no sensors) | 6–8 | 1,200–2,000 | High | 60–70% |
| LWD-triggered (with sensors) | 3–4 | 600–1,000 | Reduced 50% | 80–90% |
| LWD + cultural controls | 2–3 | 400–700 | Reduced 60% | 85–95% |

The IoT system reduces fungicide use by **30–50%** while improving disease control effectiveness by **15–25 percentage points**. For a 10-rai farm, this represents savings of 6,000–13,000 THB per year in chemical costs alone, plus the intangible benefit of reduced chemical exposure and environmental contamination.

---

### 4.2 Water Remediation

Water management is the second most impactful intervention after disease control. Northern Thailand's monsoon climate creates a stark divide: too much water June–September, too little November–April. The IoT system's soil moisture sensors ([[Soil-Moisture-Sensors]]) provide the data needed to manage this cycle.

#### Irrigation Methods for Northern Thailand Coffee Terrain

| Method | Setup Cost (THB/rai) | Operating Cost (THB/season) | Water Efficiency | Suitability |
|--------|---------------------|-----------------------------|-----------------|-------------|
| **Drip irrigation** | 3,000–5,000 | 500–800 | 90–95% | ⭐ Best for Arabica on slopes; precise VWC management |
| **Micro-sprinkler** | 2,500–4,000 | 600–1,000 | 75–85% | Good for Robusta; covers wider area; also cools canopy |
| **Hose/flood** | 500–1,000 | 800–1,500 | 40–55% | Cheap but wasteful; causes erosion on slopes |
| **Rain gun** | 1,500–2,500 | 700–1,200 | 55–70% | Better than flood; still significant runoff on slopes |

#### How Much Water to Apply Based on VWC Deficit

| Current VWC | Target VWC | Water to Apply (L/rai) | Duration (drip @2L/hr) | Frequency |
|-------------|-----------|----------------------|------------------------|-----------|
| <15% | 28–32% | 8,000–10,000 | 6–8 hours | Daily until recovered |
| 15–20% | 28–32% | 5,000–7,000 | 4–5 hours | Every 2 days |
| 20–25% | 28–32% | 3,000–4,000 | 2–3 hours | Every 3 days |
| 25–30% | 28–32% | 1,500–2,000 | 1–1.5 hours | Weekly maintenance |

#### Drainage Solutions for Waterlogged Soil

When ALR-WAT-02 (Waterlogging) triggers, the following drainage interventions are recommended based on farm terrain:

| Solution | Cost (THB/rai) | Effectiveness | Labor | Best For |
|----------|---------------|---------------|-------|----------|
| **Contour drains** (V-shaped, 30cm deep) | 300–600 | High | 4–8 person-days/rai | Sloped Arabica farms; prevents erosion too |
| **Raised beds** (20–30cm height) | 500–1,000 | Very high | 6–10 person-days/rai | Flat or low-lying areas; new plantings |
| **Grassed waterways** | 100–300 | Moderate | 2–3 person-days/rai | Natural swales; low maintenance |
| **Subsoil drainage pipes** | 2,000–4,000 | Very high | Professional installation | High-value areas; persistent waterlogging |

#### Rainwater Harvesting

During the wet season (June–September), collect and store rainwater for dry-season irrigation:

- **Farm pond** (1,600 m³ = 1 rai-meter): Excavation cost 15,000–25,000 THB; lining (if needed) 5,000–10,000 THB
- **Storage tanks** (2,000–5,000 L): 3,000–8,000 THB per tank; suitable for smaller farms
- **Roof catchment** from farm buildings: Gutters + piping 2,000–5,000 THB; essentially free water

A 1-rai pond collecting wet-season runoff can provide 3–4 months of dry-season drip irrigation for 5 rai of coffee.

---

### 4.3 Temperature Remediation

Temperature extremes — both cold and hot — threaten coffee quality and survival in Northern Thailand. The [[Temperature-Sensors]] and [[Light-Sensors]] data feed the decision engine for these alerts.

#### Frost Protection Methods

| Method | Cost (THB/rai) | Effectiveness | Setup Time | Notes |
|--------|---------------|---------------|------------|-------|
| **Smudge pots** (oil burners) | 200–400 per pot (8–12/rai) | Moderate (+2–4°C) | 2–3 hours | Smoke pollutes; check local fire regulations; Chiang Rai DOAE may restrict |
| **Overhead sprinkler irrigation** | 2,500–4,000 (if already installed) | High (+3–5°C from ice insulating) | 30 min | Must start BEFORE freezing; ice coating actually protects buds; requires water supply |
| **Shade cloth** (frost blanket, 50% weave) | 800–1,500 | Moderate (+1–3°C) | 1–2 hours | Deploy before sunset; remove in morning; reusable 3–5 years |
| **Wind machines** | Not practical for smallholders | — | — | Only viable for >50 rai estates |

#### Heat Stress Mitigation

| Method | Cost (THB/rai) | Effectiveness | Notes |
|--------|---------------|---------------|-------|
| **Shade trees** (established) | 0 (already planted) | Very high | Long-term solution; takes 2–3 years to establish |
| **Temporary shade cloth** (40–50%) | 500–1,200 per season | Good | Essential for young plants <2 years old |
| **Mulching** (10cm organic layer) | 200–400 | Good | Reduces soil temp by 5–8°C; retains moisture; see below |
| **Misting / micro-sprinkler** | 2,500–4,000 (if installed) | Good | Cools canopy by 3–6°C; use during peak heat (11am–2pm) |

#### Shade Tree Species for Northern Thailand

| Species | Thai Name | Growth Rate | Canopy Type | Additional Benefits | Spacing |
|---------|-----------|-------------|-------------|---------------------|---------|
| *Leucaena leucocephala* | กระถินณรงค์ | Fast (2–3m/yr) | Light, feathery | Nitrogen fixation; fodder; poles | 6–8m between |
| *Gliricidia sepium* | คราม | Fast | Light, open | Nitrogen fixation; live fence; firewood | 6–10m between |
| *Erythrina subumbrans* | ทองหลาง | Moderate | Spreading, deciduous | Sheds leaves in dry season (more light when needed) | 8–12m between |
| *Mangifera indica* (Mango) | มะม่วง | Slow | Dense | Fruit income (200–800 THB/tree/yr) | 10–15m between |
| *Litchi chinensis* (Lychee) | ลิ้นจี่ | Moderate | Medium | High-value fruit income | 8–12m between |
| *Persia americana* (Avocado) | อะโวคาโด | Moderate | Medium | Premium fruit; excellent coffee companion | 8–10m between |

Fruit trees as shade are especially recommended because they provide **diversified income** during the coffee off-season, making the farm more resilient. The DOA Northern Region office (Chiang Mai) provides free shade tree seedlings to registered coffee farmers.

#### Mulching Materials and Application Rates

| Material | Cost (THB/rai) | Application Rate | Longevity | Nutrient Value |
|----------|---------------|-----------------|-----------|----------------|
| Coffee husk/parchment | 0–200 (farm byproduct) | 5–8 kg/tree; 10cm depth | 4–6 months | Low N; adds organic matter |
| Rice straw | 100–300 | 8–10 kg/tree | 3–5 months | Low nutrients; excellent weed suppression |
| Dried leaves (forest) | 0 (collected) | 8–12 kg/tree | 3–4 months | Variable; free |
| Compost | 300–600 | 3–5 kg/tree | 6–8 months | High; also fertilizes |
| Plastic mulch sheet | 400–800 | Per row coverage | 1–2 seasons | None; weed control only; not recommended for organic |

---

### 4.4 Soil Remediation

Soil health is the foundation of coffee quality. The IoT system's pH and EC sensors ([[Soil-pH-Sensors]], [[NPK-Sensors]]) detect imbalances early, allowing correction before yield and quality suffer.

#### Lime Application Rates for pH Correction (Acidic Soil)

| Current pH | Target pH | Lime Required (kg/rai) | Lime Type | Cost (THB/rai) | Time to Effect |
|-----------|-----------|----------------------|-----------|---------------|----------------|
| <4.0 | 5.0–5.5 | 300–500 | Dolomite (CaMg(CO₃)₂) | 450–750 | 2–4 months |
| 4.0–4.5 | 5.0–5.5 | 150–300 | Dolomite or agricultural lime | 225–450 | 1–3 months |
| 4.5–5.0 | 5.0–5.5 | 75–150 | Agricultural lime (CaCO₃) | 100–225 | 1–2 months |

Agricultural lime costs approximately 1.5 THB/kg in bulk from Chiang Mai suppliers. Dolomite is preferred when magnesium is also deficient (common in Northern Thailand's granitic soils). Apply lime **before the rainy season** (March–April) so it incorporates with rainfall. Do not apply simultaneously with nitrogen fertilizers — separate by at least 4 weeks.

#### Sulfur Application for Alkaline Correction

Alkaline soil (pH >6.5) is rare in Northern Thailand coffee areas but can occur in limestone-influenced zones (e.g., certain areas in Mae Hong Son). If ALR-SOI-02 triggers:

- **Elemental sulfur**: 50–100 kg/rai to lower pH by 0.5 units; cost ~600–1,200 THB/rai; takes 3–6 months for full effect
- **Acidic organic matter**: Pine needle mulch, coffee pulp compost, or peat moss; slower but improves soil structure simultaneously
- **Ammonium sulfate fertilizer**: 21-0-0; provides nitrogen while acidifying; cost ~300–500 THB/rai; dual-purpose

#### Organic Matter Building

The most sustainable long-term strategy for soil health is continuous organic matter improvement:

| Method | Cost (THB/rai/year) | OM Increase (per year) | Labor | Notes |
|--------|-------------------|------------------------|-------|-------|
| Compost application | 500–1,000 | +0.3–0.5% | 2–3 person-days/rai | Apply 1–2 t/rai; best in early rainy season |
| Green manure (cover crops) | 100–300 | +0.2–0.4% | 1–2 person-days/rai | *Crotalaria juncea* or *Mucuna pruriens*; seed available from DOA |
| Mulching (continuous) | 200–400 | +0.1–0.3% | Ongoing | See mulching table above |
| Coffee pulp recycling | 0 (byproduct) | +0.2–0.4% | 1 person-day/rai | Compost pulp for 3 months before applying; raw pulp can be phytotoxic |
| Vermicompost | 1,000–2,000 | +0.4–0.6% | 3–5 person-days/rai | Premium product; excellent for nursery plants |

#### DOA Lab Testing

Regular professional soil analysis validates sensor readings and provides detailed nutrient profiles:

| Test | DOA Cost (THB) | Turnaround | Frequency | Contact |
|------|---------------|------------|-----------|---------|
| Basic (pH, OM, N-P-K) | 200–400 | 7–14 days | 2x/year (pre- and post-monsoon) | DOA Soil Analysis Division, Bangkok: 02-579-0123 |
| Comprehensive (+micronutrients, CEC) | 500–800 | 14–21 days | 1x/year | DOA Northern Region, Chiang Mai: 053-211-660 |
| Water quality test | 300–500 | 7–10 days | 1x/year | Same as above |

The DOA Northern Region office (San Pa Tong, Chiang Mai) accepts walk-in soil samples Monday–Friday 8:30–16:00. Results can be collected in person or mailed. Some district agriculture offices provide free basic testing for registered farmers.

---

## 5. Alert Delivery System Design

Getting alerts to the farmer is as important as generating them. Northern Thailand's connectivity landscape varies dramatically — from reliable 4G in Chiang Mai valley to spotty signal in remote mountain villages of Chiang Rai and Mae Hong Son. The delivery system must work across all these contexts.

### Delivery Channels

| Channel | Priority | Requirements | Latency | Use For |
|---------|----------|-------------|---------|---------|
| **Mobile App Push** | Primary (1st) | Smartphone + internet | <30 seconds | All alert levels; includes full detail + action |
| **LINE Messenger** | Primary (1st) | Smartphone + internet | <1 minute | All levels; most popular messaging app in Thailand (98% smartphone users have LINE) |
| **SMS** | Fallback (2nd) | Any mobile phone | <5 minutes | CRITICAL + EMERGENCY when no internet; works on basic phones |
| **Dashboard** | Parallel | Web browser | Real-time | Farm managers; cooperative monitoring; historical analysis |
| **Voice Call** | Last resort | Any phone | <10 minutes | EMERGENCY only; automated Thai-language voice message |

### Delivery Logic by Alert Level

```
🟢 INFO:
  → Push notification (silent/badge only)
  → LINE message (in daily summary at 7:00 AM)
  → Dashboard green indicator

🟡 WARNING:
  → Push notification (sound + vibration)
  → LINE message (immediate)
  → Dashboard amber indicator (pulsing)
  → Daily summary at 7:00 AM if not acknowledged

🟠 CRITICAL:
  → Push notification (sound + vibration + banner)
  → LINE message (immediate, with ⚠️ marker)
  → Dashboard orange indicator (flashing)
  → SMS after 2 hours if no acknowledgment on app/LINE
  → Escalate to secondary contact after 4 hours if no acknowledgment

🔴 EMERGENCY:
  → Push notification (full-screen alert)
  → LINE message (immediate, with 🚨 marker, group ping)
  → Dashboard red indicator (alarm icon + sound)
  → SMS (immediate)
  → Voice call (immediate, to primary + secondary contact)
  → Escalate to cooperative LINE group after 30 minutes if no acknowledgment
```

### Escalation Contact Hierarchy

1. **Primary contact**: Farmer (phone + LINE)
2. **Secondary contact**: Spouse / farm manager (phone + LINE)
3. **Tertiary contact**: Cooperative leader / local DOA extension officer (LINE group)
4. **Emergency services**: Village headman (ผู้ใหญ่บ้าน) — only for wildfire/frost events affecting multiple farms

---

## 6. Alert Fatigue Prevention

Alert fatigue is the single greatest risk to system adoption. Research from agricultural IoT deployments in Vietnam, Indonesia, and Thailand consistently shows that farmers who receive >5 non-actionable notifications per day will mute or uninstall the app within 2 weeks. The following rules ensure the system stays below this threshold.

### Maximum Alert Frequency

| Category | Max Alerts/Day | Deduplication Window | Rationale |
|----------|---------------|---------------------|-----------|
| Disease | 2 per disease type | 24 hours | Don't repeat CLR warning every hour; once triggered, next alert only if conditions worsen |
| Water | 2 per type | 12 hours | Soil moisture changes slowly; rapid-fire alerts are noise |
| Temperature | 3 per type | 6 hours | Frost/heat conditions can change rapidly; allow more frequent updates |
| Light | 1 per type | 48 hours | Light conditions change slowly; not urgent |
| Soil | 1 per type | 72 hours | Soil chemistry changes very slowly; weekly is sufficient |
| Harvest | 2 per type | 24 hours | Time-sensitive during harvest; but don't over-alert |
| System | 3 total | 6 hours | Sensor issues are important but not crop-threatening |

### Smart Deduplication Rules

1. **Same alert, same conditions**: If ALR-DIS-01 triggered at 8:00 AM and conditions haven't changed (LWD still >24h, same temp range), do NOT re-trigger at 2:00 PM. Instead, send a "condition persists" update via the 7:00 AM daily summary.
2. **Condition worsens**: If ALR-DIS-01 was at CRITICAL and conditions escalate to meet ALR-DIS-02 (EXTREME), this IS a new alert and should be delivered immediately.
3. **Condition improves**: Send a brief "all clear" notification when a WARNING or CRITICAL condition resolves. This builds trust — the farmer sees the system works both ways.
4. **Multi-zone deduplication**: If a farmer has sensors in multiple zones and the same alert triggers in 3+ zones simultaneously, consolidate into a single "farm-wide" alert rather than 3+ individual ones.

### Quiet Hours

| Time | Behavior | Rationale |
|------|----------|-----------|
| **10:00 PM – 5:00 AM** | Only EMERGENCY alerts delivered immediately | Farmers sleep; WARNING/CRITICAL can wait until morning |
| **5:00 AM – 7:00 AM** | WARNING and above delivered; daily summary at 7:00 AM | Early risers can prepare actions for the day |
| **7:00 AM – 10:00 PM** | All alerts delivered per normal rules | Full alerting active during working hours |

### Daily Summary (7:00 AM)

Every morning at 7:00 AM, the system delivers a concise daily summary including:
- Current conditions overview (temperature, humidity, soil moisture, LWD)
- Active warnings and their status (new, ongoing, resolved)
- Recommended actions for the day (prioritized)
- 3-day forecast and risk outlook
- Yesterday's data highlights (max/min temp, total rainfall, LWD hours)

### Weekly Health Report (Sunday 8:00 AM)

A more detailed weekly analysis including:
- Sensor data trends (graphs of key metrics over the week)
- Alert summary (how many of each level; resolution rate)
- Disease risk trend (is CLR pressure increasing or decreasing?)
- Soil health trend (pH, moisture, EC over time)
- Farm performance vs. optimal ranges
- Upcoming seasonal considerations

---

## 7. Seasonal Alert Calendar

Northern Thailand's coffee year follows the monsoon cycle. Different alerts dominate in different months. This calendar helps farmers anticipate what to watch for and helps the system adjust sensitivity thresholds seasonally.

| Month | Season | Top Alert Priorities | Key Sensors Active | Notes |
|-------|--------|---------------------|-------------------|-------|
| **January** | Cool-Dry | Frost (ALR-TEM-01), Cold damage-Robusta (ALR-TEM-04), Harvest conditions (ALR-HAR-01) | Temperature, Soil moisture | Peak harvest for Arabica; frost risk highest in Chiang Rai highlands |
| **February** | Cool-Dry | Cold damage (ALR-TEM-04), Unsynchronized flowering (ALR-FLW-02), Soil pH (ALR-SOI-01) | Temperature, Soil pH | Late harvest; flowering may begin with early rains; apply lime now |
| **March** | Hot-Dry | Heat stress (ALR-TEM-02), Irrigation needed (ALR-WAT-03), Insufficient shade (ALR-LIT-02), Flowering (ALR-FLW-01) | Soil moisture, Temperature, Light | Hottest month; critical irrigation period; flowering triggered by first rains |
| **April** | Hot-Dry | Heat stress (ALR-TEM-02), Irrigation (ALR-WAT-03), UV stress (ALR-LIT-03), Flowering (ALR-FLW-01) | Soil moisture, Light, Temperature | Songkran rains may trigger mass flowering; ensure irrigation running |
| **May** | Hot-Wet transition | Drought stress (ALR-WAT-01), Early CLR risk (ALR-DIS-01), Drainage prep (ALR-WAT-04) | Soil moisture, Leaf wetness | Pre-monsoon showers begin; CLR risk starts rising; prepare drainage |
| **June** | Wet | CLR HIGH risk (ALR-DIS-01), Waterlogging (ALR-WAT-02), Black rot (ALR-DIS-03), Root rot (ALR-DIS-05) | Leaf wetness, Humidity, Soil moisture | Monsoon arrives; LWD peaks; peak CLR season begins |
| **July** | Wet | CLR EXTREME (ALR-DIS-02), Black rot (ALR-DIS-03), Waterlogging (ALR-WAT-02), CBB (ALR-DIS-04) | All disease sensors | Worst CLR month; vigilance critical; fungicide timing is key |
| **August** | Wet | CLR HIGH (ALR-DIS-01), Root rot (ALR-DIS-05), Drainage (ALR-WAT-04), CBB (ALR-DIS-04) | Leaf wetness, Soil moisture | Cherry development; CBB emergence; sustained wetness |
| **September** | Wet | CLR (ALR-DIS-01/02), Waterlogging (ALR-WAT-02), Nutrient depletion (ALR-SOI-03) | All sensors | End of heavy rains; leaching depletes soil nutrients; collect soil samples |
| **October** | Wet-Dry transition | CLR declining, Rain during harvest prep (ALR-HAR-02), Nutrient depletion (ALR-SOI-03) | Humidity, Rainfall | Rains taper; begin harvest preparation; post-monsoon soil testing |
| **November** | Cool-Dry | Harvest conditions (ALR-HAR-01), Rain during harvest (ALR-HAR-02), Poor drying (ALR-HAR-03) | Rainfall, Humidity | Main Arabica harvest; drying conditions critical; cherry maturity peaks |
| **December** | Cool-Dry | Frost (ALR-TEM-01), Cherry maturity (ALR-HAR-04), Harvest conditions (ALR-HAR-01) | Temperature, Humidity | Late harvest; frost risk begins; excellent drying conditions |

---

## 8. Practical Recommendations

1. **Start with disease alerts first**: The CLR alert system (ALR-DIS-01, ALR-DIS-02) delivers the highest ROI of any alert category. A single prevented CLR outbreak saves 5,000–15,000 THB/rai in yield loss. Deploy [[Leaf-Wetness-Sensors]] and [[Humidity-Sensors]] as the first priority, even before the full sensor suite is installed.

2. **Calibrate alert thresholds to your farm**: The default thresholds in this document are based on general Northern Thailand conditions. Every farm has microclimatic variation. After 2–3 months of data collection, review alert frequency and adjust thresholds — if you're getting too many false WARNING alerts, raise the threshold slightly; if you missed a CLR outbreak, lower it. See [[Sensor-Metrics-Thresholds]] for calibration methodology.

3. **Train the whole household on alert meanings**: Don't assume only the farm owner will see alerts. Spouses, children, and farm workers all carry phones. Ensure everyone knows that 🟠 CRITICAL means "act today" and 🔴 EMERGENCY means "act now." Print a one-page alert guide in Thai and post it in the farm office and drying area.

4. **Set up LINE group integration**: Create a farm LINE group that includes the farmer, spouse/co-manager, and local cooperative extension contact. Connect the alert system to this group for CRITICAL and EMERGENCY alerts. LINE is the communication backbone of rural Thailand — use it.

5. **Review the weekly health report every Sunday**: The 8:00 AM Sunday report contains trend data that no individual alert can provide. Use it for medium-term planning: when to schedule fungicide, whether irrigation investment is paying off, and how this season compares to last. Share the report with your cooperative for benchmarking.

6. **Don't ignore system alerts**: ALR-SYS-01 (Sensor Offline) and ALR-SYS-03 (Battery Low) seem boring, but an offline sensor means you're flying blind. A dead leaf wetness sensor during the July CLR peak is dangerous. Treat system alerts with the same urgency as agricultural alerts — a non-functioning sensor provides zero protection.

7. **Combine IoT alerts with field scouting**: No sensor system replaces the farmer's eyes. Use alerts to know **when and where** to look, but always verify conditions in the field. Walk the farm at least once per week during the rainy season, checking for early CLR symptoms, CBB bore holes, and cherry development that sensors can't detect.

---

## 9. Related Topics & References

### Related Topics (within this Knowledge Base)

- [[Sensor-Metrics-Thresholds]] — The numeric thresholds that trigger each alert
- [[Decision-Logic]] — The IF-THEN rule engine that evaluates sensor data against thresholds
- [[Environment-Intervention]] — Physical actions farmers can take to modify growing conditions
- [[Leaf-Wetness-Sensors]] — The primary sensor for CLR disease alert generation
- [[Humidity-Sensors]] — Companion sensor for disease risk models
- [[Temperature-Sensors]] — Frost and heat stress alert source
- [[Soil-Moisture-Sensors]] — Drought and waterlogging alert source
- [[Soil-pH-Sensors]] — Soil pH and nutrient alert source
- [[Arabica-for-North-Thailand]] — Variety-specific disease susceptibility data
- [[Robusta-for-North-Thailand]] — Cold damage thresholds for Robusta

### External References

1. **ICAFE (Coffee Institute of Costa Rica)** — CLR prediction model using LWD + temperature; the foundational model adapted for this system
2. **DOA Thailand (Department of Agriculture)** — Fungicide recommendations, soil testing services, shade tree seedling program; [www.doa.go.th](https://www.doa.go.th)
3. **DOAE Thailand (Department of Agricultural Extension)** — Farmer training programs, regional extension officers; [www.doae.go.th](https://www.doae.go.th)
4. **CABI (Centre for Agriculture and Bioscience International)** — Coffee leaf rust management guides; Plantwise program in Thailand
5. **Aregbesola, S. et al. (2020)** — "A Systematic Review of Agricultural Alert Systems"; *Computers and Electronics in Agriculture* — Alert fatigue research and best practices
6. **Kushalappa, A.C. & Eskes, A.B. (1989)** — "Coffee Rust: Epidemiology, Resistance, and Management"; CRC Press — Classic CLR reference
7. **Nutongkaew, P. et al. (2019)** — "Climate Change Impact on Coffee Production in Northern Thailand"; *Khon Kaen Agriculture Journal* — Local climate data for threshold calibration

---

*Last updated: 2026-05-12*
