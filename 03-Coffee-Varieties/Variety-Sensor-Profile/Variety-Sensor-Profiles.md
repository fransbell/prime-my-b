---
topic: Variety-Specific Sensor Profiles
phase: 3
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [variety, sensor-profiles, thresholds, catimor, typica, sl28, robusta, thailand]
related: [Arabica-for-North-Thailand, Robusta-for-North-Thailand, Variety-Selection-Guide, Sensor-Metrics-Thresholds, Decision-Logic]
---

# Variety-Specific Sensor Profiles

> **Summary**: How different coffee varieties (Catimor, Typica, Caturra, SL28, Chumphon Robusta) respond differently to the same environmental conditions, and how the IoT monitoring system should adjust thresholds, alert priorities, and sensor placement per variety to optimize both quality and yield.

---

## Why One-Size-Fits-All Thresholds Don't Work

The existing [[Sensor-Metrics-Thresholds]] document defines thresholds by species (Arabica vs. Robusta) and growth stage — a critical first layer of parameterization. However, within Arabica alone, different varieties have dramatically different physiological responses to the same environmental conditions. A single humidity reading of 82% RH at 22°C means something very different for Chiang Mai 80 (Catimor-type, CLR-resistant) than for Typica (CLR-susceptible heirloom). For Chiang Mai 80, this humidity level triggers a mild monitoring alert; for Typica, it represents a significant disease risk that demands immediate preventive action. Similarly, a temperature of 29°C is stressful for Catimor (which is heat-sensitive despite its CLR resistance) but merely warm for Typica (which tolerates heat better than most Arabica varieties).

These variety-specific differences are not minor calibration adjustments — they fundamentally change the priority, timing, and economic consequence of every alert the system generates. Without variety-level parameterization, the IoT system will either over-alert for resistant varieties (causing alert fatigue and farmer disengagement) or under-alert for susceptible varieties (allowing preventable losses). The goal of variety-specific sensor profiles is to make every alert as relevant and actionable as possible, protecting the farmer's specific investment in their chosen varieties.

This document builds upon the species-level thresholds in [[Sensor-Metrics-Thresholds]] and the decision rules in [[Decision-Logic]], adding the variety dimension that transforms a good monitoring system into a precision agriculture tool.

---

## How Varieties Differ: Key Physiological Distinctions

### Disease Susceptibility Differences

| Variety | CLR Resistance | CBD Susceptibility | CBB Susceptibility | Root Nematode Susceptibility |
|---------|---------------|--------------------|--------------------|------------------------------|
| **Chiang Mai 80 (Catimor)** | **HIGH** (HDT-derived Shrz genes) | Low-Moderate | Moderate | High (Arabica roots) |
| **Typica** | **VERY LOW** | Moderate | Moderate | High |
| **Caturra** | **VERY LOW** | Moderate-High | Moderate | High |
| **SL28 / SL34** | **LOW** | Moderate | Moderate-High | High |
| **Geisha** | **LOW** | Low-Moderate | Moderate | High |
| **Chumphon Robusta** | **IMMUNE** (Shrz gene) | Low | Moderate | Low-Moderate |

These disease susceptibility differences mean that the same humidity + leaf wetness conditions that are merely "monitor closely" for Chiang Mai 80 should trigger "apply preventive fungicide within 48 hours" for Typica. The three-factor CLR risk model (humidity >80% + temperature 18–28°C + leaf wetness >24h — see [[Sensor-Metrics-Thresholds]]) must be variety-weighted.

### Temperature Sensitivity Differences

| Variety | Optimal Temp Range | Heat Stress Threshold | Cold Tolerance | Diurnal Range Sensitivity |
|---------|-------------------|----------------------|----------------|--------------------------|
| **Chiang Mai 80** | 18–24°C | >28°C (stress onset) | Moderate (0–2°C damage) | Low — quality less dependent on diurnal range |
| **Typica** | 17–25°C | >30°C (stress onset) | Good (−1 to 0°C damage) | Moderate — benefits from cool nights |
| **SL28 / SL34** | 16–23°C | >27°C (stress onset) | Good (−1 to 0°C) | **HIGH** — requires >10°C diurnal range for quality |
| **Geisha** | 16–22°C | >26°C (stress onset) | Moderate | **HIGH** — quality degrades without cool nights |
| **Chumphon Robusta** | 22–30°C | >35°C (stress onset) | Poor (<10°C damage) | Low — less quality impact |

Chiang Mai 80 is the most heat-sensitive of the common Thai Arabica varieties, which is counterintuitive given its dominance at lower elevations. Its popularity at 800–1,000m in Northern Thailand stems from its CLR resistance, not heat tolerance — a critical distinction for the IoT monitoring system.

### Water Requirement Differences

| Variety | Soil Moisture Optimal (VWC) | Drought Tolerance | Waterlogging Tolerance | Root Depth (mature) |
|---------|-----------------------------|-------------------|----------------------|---------------------|
| **Chiang Mai 80** | 28–38% | Low-Moderate | Low | 0.5–1.0m (shallow for Arabica) |
| **Typica** | 25–35% | Moderate | Low | 0.8–1.2m |
| **SL28 / SL34** | 25–35% | Moderate-Good | Low | 1.0–1.5m (deep for Arabica) |
| **Geisha** | 25–35% | Moderate | Very Low | 0.6–1.0m |
| **Chumphon Robusta** | 30–45% | Low (avoids via deep roots) | Moderate | 1.5–2.5m (very deep) |

---

## Per-Variety Sensor Threshold Tables

### Chiang Mai 80 (Catimor-Type) — Specific Thresholds

Chiang Mai 80 is the dominant variety in Northern Thailand (70–80% of all Arabica — see [[Arabica-for-North-Thailand]]). Its threshold profile reflects its unique combination of CLR resistance and heat sensitivity.

#### Temperature Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Air temperature (overall)** | 18–24°C | 24–28°C or 15–18°C | >28°C or <15°C sustained | Heat stress threshold is LOWER than other Arabica varieties |
| **Cherry maturation** | 18–23°C | 23–27°C | >27°C sustained | Quality degrades quickly above 27°C — earlier intervention needed |
| **Night temperature (flowering)** | 10–15°C | 15–18°C | >18°C or <8°C | Standard Arabica flowering trigger |
| **Soil temperature** | 18–22°C | 22–26°C | >26°C | Shallow roots make Chiang Mai 80 more vulnerable to warm soil |
| **Diurnal range (maturation)** | 8–15°C | 5–8°C | <5°C | Wider range beneficial but less critical than for SL28/Geisha |

#### Humidity & Disease Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Relative humidity (vegetative)** | 70–85% | 85–90% | >90% sustained | MORE FORGIVING than susceptible varieties — CLR resistance allows higher humidity |
| **Relative humidity (cherry development)** | 65–80% | 80–88% | >88% sustained | Even CLR-resistant varieties risk non-CLR fungal diseases above 88% |
| **CLR risk (3-factor model)** | N/A | LWD >36h + 18–28°C + RH >85% | LWD >48h + 18–28°C + RH >85% | Higher LWD/RH thresholds than susceptible varieties — CLR resistance requires more extreme conditions for breakthrough infection |
| **Post-harvest drying humidity** | <65% | 65–75% | >75% | Same as standard Arabica |

**Key Chiang Mai 80 Insight**: The humidity thresholds for Chiang Mai 80 are 5–10% RH higher than for CLR-susceptible varieties because the plant's genetic resistance means it takes more extreme conditions for CLR infection to establish. This means fewer false-alarm CLR alerts and less unnecessary fungicide application — a direct economic benefit of matching thresholds to variety.

#### Soil Moisture Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Soil moisture (fruit development)** | 28–38% | 23–28% or 38–45% | <23% or >45% | Chiang Mai 80 has slightly higher moisture needs than other Arabica |
| **Soil moisture (flowering)** | 25–35% | 20–25% | <20% | Standard Arabica range |
| **Soil moisture (cherry maturation)** | 25–33% | 20–25% | <20% | Slightly tighter range to maintain quality |

---

### Typica — Specific Thresholds

Typica is a heritage variety prized for cup quality but devastatingly susceptible to CLR. Its threshold profile reflects tight humidity monitoring and more aggressive disease alerting, balanced by somewhat wider temperature tolerance.

#### Temperature Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Air temperature (overall)** | 17–25°C | 25–30°C or 14–17°C | >30°C or <14°C sustained | WIDER heat tolerance than Chiang Mai 80 |
| **Cherry maturation** | 17–24°C | 24–28°C | >28°C sustained | Good quality retention at moderately warm temperatures |
| **Night temperature (flowering)** | 10–15°C | 15–18°C | >18°C or <8°C | Standard Arabica flowering trigger |
| **Frost risk** | — | 2–5°C | <2°C | Typica is slightly hardier than Catimor at cold extremes |
| **Diurnal range (maturation)** | 10–15°C | 7–10°C | <7°C | Benefits from wider diurnal range for acidity development |

#### Humidity & Disease Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Relative humidity (vegetative)** | 60–75% | 75–80% | >80% sustained | TIGHTER than Chiang Mai 80 — CLR susceptibility demands lower humidity thresholds |
| **Relative humidity (cherry development)** | 60–75% | 75–80% | >80% sustained | Any sustained humidity above 80% is a CLR threat for Typica |
| **CLR risk (3-factor model)** | N/A | LWD >12h + 18–28°C + RH >70% | LWD >24h + 18–28°C + RH >75% | MUCH LOWER thresholds than Chiang Mai 80 — infection can establish quickly |
| **Post-harvest drying humidity** | <65% | 65–75% | >75% | Same as standard Arabica |

**Key Typica Insight**: The CLR risk thresholds for Typica are dramatically lower than for Chiang Mai 80. A leaf wetness duration of just 12 hours at favorable temperatures and 70% humidity triggers a warning for Typica, while Chiang Mai 80 requires 36+ hours at 85% humidity for the same alert level. This means Typica blocks need leaf wetness sensors as the **highest priority** sensor investment (see Sensor Placement Recommendations below).

#### Soil Moisture Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Soil moisture (fruit development)** | 25–35% | 20–25% or 35–40% | <20% or >40% | Standard Arabica range; Typica has moderate drought tolerance |
| **Soil moisture (flowering)** | 22–30% | 17–22% | <17% | Slight dry stress promotes bud differentiation |

---

### SL28 / SL34 — Specific Thresholds

SL28 and SL34 are Kenyan selections that require specific conditions for quality expression, particularly a wide diurnal temperature range. Their presence in Northern Thailand is limited (see [[Arabica-for-North-Thailand]]) but growing among specialty-focused farmers. SL28 genetics are embedded in Chiang Mai 80 via the SL28 backcross.

#### Temperature Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Air temperature (overall)** | 16–23°C | 23–27°C or 13–16°C | >27°C or <13°C sustained | Narrower optimal band; quality demands cooler conditions |
| **Cherry maturation** | 16–22°C | 22–25°C | >25°C sustained | Quality drops sharply above 25°C — diurnal range is critical |
| **Diurnal range (maturation)** | >12°C | 8–12°C | <8°C | **MOST CRITICAL PARAMETER** — SL28 needs wide day-night differences for the bright acidity it's known for |
| **Night temperature (flowering)** | 8–14°C | 14–18°C | >18°C | Cooler nights than most varieties for flowering trigger |
| **Altitude recommendation** | >1,200m | 1,000–1,200m | <1,000m | SL28 really needs high altitude; below 1,000m, diurnal range is insufficient |

#### Humidity & Disease Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Relative humidity (vegetative)** | 65–80% | 80–85% | >85% sustained | Moderately CLR-susceptible; thresholds between Chiang Mai 80 and Typica |
| **CLR risk (3-factor model)** | N/A | LWD >18h + 18–28°C + RH >75% | LWD >30h + 18–28°C + RH >80% | Intermediate CLR susceptibility |

**Key SL28 Insight**: The diurnal temperature range is the make-or-break parameter for SL28 quality. In Northern Thailand, only sites above 1,200m (Doi Inthanon, Doi Chang, Baan Maneepruek) consistently achieve the >10°C diurnal range that SL28 needs. The IoT system should calculate diurnal range as a primary quality indicator for SL28 blocks and alert when the range narrows below 10°C during cherry maturation (September–November).

---

### Chumphon Robusta 1–4 — Specific Thresholds

Chumphon Robusta clones have fundamentally different threshold profiles from any Arabica variety, reflecting their adaptation to hot, humid, lowland conditions. See [[Robusta-for-North-Thailand]] for full variety details.

#### Temperature Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Air temperature (overall)** | 25–30°C | 20–25°C or 30–35°C | <20°C or >35°C sustained | Heat-LOVING; optimal range is 5–8°C above Arabica |
| **Cherry maturation** | 25–32°C | 22–25°C or 32–35°C | <22°C or >35°C | Slower maturation below 25°C; quality unaffected by warmth |
| **Cold damage** | — | 10–15°C | <10°C sustained | **Zero frost tolerance**; Robusta cannot survive freezing; below 10°C growth stops completely |
| **Soil temperature** | 22–28°C | 18–22°C or 28–32°C | <18°C or >32°C | Robusta roots prefer warm soil |

#### Humidity & Disease Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Relative humidity (vegetative)** | 75–90% | 65–75% or 90–95% | <65% or >95% | Much higher humidity tolerance than Arabica |
| **Relative humidity (cherry development)** | 75–88% | 88–92% | >92% sustained | Even Robusta faces non-CLR fungal risks above 92% |
| **CLR risk** | **NONE** (immune) | N/A | N/A | Robusta carries the Shrz gene; CLR is not a concern |
| **Non-CLR fungal risk** | — | RH >90% + temp 25–30°C | RH >92% sustained + warm | Black rot, pink disease, and other non-CLR fungi |

**Key Chumphon Robusta Insight**: The complete absence of CLR risk means the entire leaf wetness + humidity + temperature disease model that dominates Arabica monitoring is irrelevant for Robusta. The IoT system can skip CLR-related alerts entirely for Robusta blocks, reducing alert noise and focusing on soil moisture (Robusta's primary sensitivity) and non-CLR fungal risks.

#### Soil Moisture Thresholds

| Parameter | Optimal | Warning (Yellow) | Critical (Red) | Notes |
|-----------|---------|-------------------|-----------------|-------|
| **Soil moisture (fruit development)** | 35–45% | 30–35% or 45–55% | <30% or >55% | **Highest moisture demand of any variety** — deep roots need consistent deep moisture |
| **Soil moisture (vegetative)** | 30–40% | 25–30% or 40–50% | <25% or >50% | Robusta needs more water than Arabica at every stage |
| **Soil moisture (flowering trigger)** | 20–30% (dry period) | 30–40% | >40% (no dry period) | Robusta flowering triggered by dry period + rain; no cool night requirement |

---

## Consolidated Variety-Specific Threshold Comparison

### Air Temperature Comparison

| Variety | Optimal (°C) | Warning (°C) | Critical (°C) | Special Notes |
|---------|-------------|-------------|--------------|---------------|
| **Chiang Mai 80** | 18–24 | 24–28 | >28 | Most heat-sensitive Arabica; earliest heat alerts needed |
| **Typica** | 17–25 | 25–30 | >30 | Widest Arabica temperature band |
| **SL28 / SL34** | 16–23 | 23–27 | >27 | Narrowest band; diurnal range >10°C required |
| **Geisha** | 16–22 | 22–26 | >26 | Quality drops sharply above 26°C |
| **Chumphon Robusta** | 25–30 | 30–35 | >35 | Fundamentally different temperature preference |

### CLR Risk Threshold Comparison (3-Factor Model)

| Variety | LWD Trigger (Warning) | RH Trigger (Warning) | LWD Trigger (Critical) | RH Trigger (Critical) | Effective Alert Timing |
|---------|----------------------|---------------------|------------------------|----------------------|----------------------|
| **Chiang Mai 80** | >36h | >85% | >48h | >85% | Latest — CLR resistance buys time |
| **Typica** | >12h | >70% | >24h | >75% | **Earliest — must act fast** |
| **Caturra** | >12h | >70% | >24h | >75% | Same as Typica — very susceptible |
| **SL28 / SL34** | >18h | >75% | >30h | >80% | Intermediate |
| **Geisha** | >18h | >75% | >30h | >80% | Intermediate — low CLR resistance |
| **Chumphon Robusta** | N/A | N/A | N/A | N/A | **No CLR risk — immune** |

---

## How the Decision Logic Engine Parameterizes by Variety

The [[Decision-Logic]] engine currently parameterizes rules by `variety` (Arabica vs. Robusta), `growth_stage`, `season`, `elevation_zone`, and `soil_type`. This document adds the `cultivar` dimension — a sub-classification within the `variety` variable that enables variety-specific threshold adjustment.

### Implementation Approach

```
// Decision Logic Engine - Cultivar Parameterization
// Extends the existing rule evaluation to include variety-specific thresholds

FUNCTION get_variety_thresholds(cultivar, parameter, growth_stage):
    // Load base thresholds (species-level from Sensor-Metrics-Thresholds)
    base = load_base_thresholds(variety_of(cultivar), parameter, growth_stage)
    
    // Apply cultivar-specific adjustments
    adjustments = load_cultivar_adjustments(cultivar, parameter, growth_stage)
    
    // Merge: cultivar adjustments override base thresholds where defined
    RETURN merge_thresholds(base, adjustments)


// Example: Evaluating CLR risk for Typica vs. Chiang Mai 80
// Same sensor readings, different alert priority

READINGS = {
    humidity: 78%,
    temperature: 22°C,
    leaf_wetness_hours: 15
}

// For Chiang Mai 80:
//   LWD 15h < 36h (warning threshold) → NO CLR alert generated
//   Result: INFO — "Conditions within normal range for CLR-resistant variety"

// For Typica:
//   LWD 15h > 12h AND RH 78% > 70% AND temp 22°C in 18-28°C range → WARNING CLR alert
//   Result: WARNING — "Monitor closely; prepare fungicide; inspect lower canopy for CLR"
```

### Cultivar Context Variable

The decision engine's context variables (see [[Decision-Logic]] Section 2) should be extended with:

| Variable | Values | Source | Impact |
|----------|--------|--------|--------|
| **cultivar** | `chiang_mai_80`, `typica`, `caturra`, `sl28`, `sl34`, `geisha`, `chumphon_1`, `chumphon_2`, `frt_141`, `grafted_cm80_chumphon1` | Farm configuration (per-block) | Adjusts all thresholds per variety profiles in this document |
| **clr_susceptibility** | `high`, `moderate`, `low`, `immune` | Derived from cultivar | Modifies CLR risk rule thresholds (DR-01 through DR-10) |
| **heat_sensitivity** | `high`, `moderate`, `low` | Derived from cultivar | Modifies temperature stress rule thresholds (TS-01 through TS-08) |
| **diurnal_requirement** | `high` (>10°C), `moderate` (>7°C), `low` (>5°C) | Derived from cultivar | Activates quality-related diurnal range alerts during maturation |

### Modified Decision Rules with Cultivar Context

Example modifications to existing rules from [[Decision-Logic]]:

| Original Rule | Original Condition | Modified for Typica | Modified for Chiang Mai 80 | Modified for Chumphon Robusta |
|--------------|-------------------|--------------------|-----------------------------|-------------------------------|
| **DR-01** (CLR CRITICAL) | LWD >24h + 18–28°C + RH >80% | LWD >24h + 18–28°C + RH >**75%** | LWD >**48h** + 18–28°C + RH >**85%** | **DISABLED** (immune) |
| **DR-02** (CLR WARNING) | LWD 12–24h + RH >70% | LWD **>12h** + RH >**70%** | LWD **>36h** + RH >**85%** | **DISABLED** (immune) |
| **TS-03** (heat stress) | Air temp >30°C + Arabica + shade <30% | Air temp >**30°C** (unchanged) | Air temp >**28°C** (lower threshold) | Air temp >**35°C** (Robusta range) |
| **TS-06** (diurnal quality) | Diurnal <5°C + cherry maturation | Diurnal <**7°C** | Diurnal <**5°C** | **DISABLED** (not quality-relevant) |

---

## Impact on Alert Generation: Same Reading, Different Priority

The following examples demonstrate how the same sensor readings produce different alerts depending on the variety being monitored. This is the core value proposition of variety-specific profiles — making every alert relevant to the farmer's specific crop risk.

### Scenario 1: Humid Morning at 22°C

| Sensor Readings | Humidity 82%, Temperature 22°C, Leaf Wetness 14 hours |
|----------------|-------------------------------------------------------|
| **Chiang Mai 80 block** | 🟡 WARNING — "Humidity elevated; monitor for non-CLR fungal issues" (CLR resistance means this is not an urgent CLR threat) |
| **Typica block** | 🟠 CRITICAL — "CLR infection risk HIGH; apply preventive copper fungicide within 48h; inspect lower canopy immediately" (CLR-susceptible; conditions favorable for infection) |
| **SL28 block** | 🟡 WARNING — "Moderate CLR risk; monitor closely; prepare fungicide" (Intermediate susceptibility) |
| **Chumphon Robusta block** | 🟢 INFO — "Normal humid conditions for Robusta; no disease risk" (CLR immune; humidity within Robusta's preferred range) |

**Economic impact**: For a 10-rai Typica block producing 100 kg/rai at 300 THB/kg specialty price, a CLR outbreak could cost 300,000 THB in lost revenue. The same conditions for Chiang Mai 80 pose minimal CLR risk due to genetic resistance. Variety-specific alerting ensures the Typica farmer acts immediately while the Chiang Mai 80 farmer avoids unnecessary fungicide costs (approximately 500–800 THB per application per rai).

### Scenario 2: Hot Afternoon at 29°C

| Sensor Readings | Air Temperature 29°C, Soil Moisture 22% VWC, Shade 45% |
|----------------|---------------------------------------------------------|
| **Chiang Mai 80 block** | 🟠 CRITICAL — "Heat stress for Chiang Mai 80; increase irrigation; verify soil moisture at depth; consider additional temporary shade" (Heat-sensitive variety; 29°C exceeds stress threshold) |
| **Typica block** | 🟡 WARNING — "Warm conditions; monitor soil moisture; ensure adequate shade" (Typica tolerates 29°C; not yet critical) |
| **SL28 block** | 🟠 CRITICAL — "Heat stress + quality risk; SL28 above optimal; diurnal range likely insufficient for quality at this temperature" (27°C threshold exceeded; quality degradation in progress) |
| **Chumphon Robusta block** | 🟢 INFO — "Good growing temperature for Robusta; ensure adequate soil moisture" (29°C is well within Robusta's optimal range) |

### Scenario 3: Cool Night Followed by Rain During Cherry Maturation

| Sensor Readings | Night Temp 9°C, Day Temp 24°C (diurnal 15°C), Rainfall 18mm, Humidity 88% |
|----------------|-----------------------------------------------------------------------------|
| **Chiang Mai 80 block** | 🟡 WARNING — "High humidity after rain; monitor for fungal disease; check drainage" (CLR risk low but other fungi possible) |
| **Typica block** | 🟠 CRITICAL — "CLR epidemic risk after rain + high humidity; apply preventive fungicide; inspect all plants within 48h" (Maximum CLR risk) |
| **SL28 block** | 🟢 INFO — "Excellent quality conditions: wide diurnal range (15°C) driving sugar/acid development; monitor CLR risk from humidity" (Diurnal range ideal; quality outlook excellent) |
| **Chumphon Robusta block** | 🟡 WARNING — "Temperature dropping to 9°C; monitor for cold stress; Robusta growth may slow" (Cold is the primary concern, not humidity) |

---

## Economic Implications: Variety-Specific Alerts Protect Premium Pricing

### Specialty vs. Commodity Price Protection

| Variety | Specialty Price Range (THB/kg) | Commodity Price (THB/kg) | Premium at Risk | Key Quality Threats That Variety-Specific Alerts Mitigate |
|---------|-------------------------------|--------------------------|----------------|----------------------------------------------------------|
| **Chiang Mai 80** | 280–400 | 80–120 | 200–280 | Heat stress (reduces cup score below specialty threshold) |
| **Typica** | 400–800+ | 80–120 | 320–680 | CLR (can destroy entire harvest if uncontrolled) |
| **SL28** | 500–1,000+ | 80–120 | 420–880 | Insufficient diurnal range (flat acidity = below specialty grade) |
| **Geisha** | 800–10,000+ | 80–120 | 720–9,880 | Heat stress + CLR (both can eliminate ultra-premium pricing) |
| **Chumphon Robusta** | 150–450 | 40–80 | 110–370 | Drought (reduces cherry size and yield) |

For a farmer growing Typica on 5 rai at 100 kg/rai, the difference between catching a CLR outbreak early (variety-specific alert) and discovering it late (generic or no alert) can be the difference between 200,000 THB specialty income and 50,000 THB commodity income — a 150,000 THB swing from a single timely alert.

### Fungicide Cost Savings from Accurate CLR Alerts

| Scenario | Fungicide Applications per Season | Cost per Application (THB/rai) | Total Season Cost (10 rai) | Outcome |
|----------|----------------------------------|-------------------------------|---------------------------|---------|
| **Generic alerts (no variety specificity)** | 8–12 calendar-based applications | 500–800 | 40,000–96,000 | Overtreatment for resistant varieties; potential undertreatment for susceptible |
| **Variety-specific alerts — Chiang Mai 80** | 2–4 applications (only when conditions exceed high threshold) | 500–800 | 10,000–32,000 | 60–75% cost reduction vs. calendar spraying; CLR resistance provides natural buffer |
| **Variety-specific alerts — Typica** | 6–10 applications (lower thresholds, more alerts) | 500–800 | 30,000–80,000 | More applications but triggered by actual risk, not calendar; better ROI per application |
| **Variety-specific alerts — Chumphon Robusta** | 0 CLR applications (immune) | 0 | 0 | Complete elimination of unnecessary CLR fungicide |

---

## Sensor Placement Recommendations by Variety

Different varieties have different priority sensors. A farm deploying IoT sensors on a budget should prioritize sensors based on the most impactful parameters for each variety.

### Priority Sensor Matrix

| Variety | 1st Priority Sensor | 2nd Priority Sensor | 3rd Priority Sensor | 4th Priority Sensor | Rationale |
|---------|--------------------|--------------------|--------------------|--------------------|-----------|
| **Chiang Mai 80** | Soil Moisture | Air Temperature | Humidity | Light/Shade | Heat sensitivity + shallow roots make soil moisture and temperature critical |
| **Typica** | **Leaf Wetness** | Humidity | Air Temperature | Soil Moisture | CLR susceptibility makes leaf wetness duration the single most important parameter |
| **SL28 / SL34** | Air Temperature (min/max for diurnal) | Humidity | Leaf Wetness | Soil Moisture | Diurnal range is the quality-determining parameter; needs both min and max temp logging |
| **Geisha** | Air Temperature | Leaf Wetness | Humidity | Light/Shade | Heat sensitivity + CLR susceptibility; temperature most critical at >1,200m |
| **Chumphon Robusta** | **Soil Moisture (deep)** | Air Temperature | Rainfall | Humidity | Deep root moisture needs are primary concern; humidity/CLR irrelevant |

### Specific Placement Guidance

**Typica blocks — Leaf Wetness Priority**: Deploy at least one leaf wetness sensor per 2 rai of Typica. Place sensors at mid-canopy height (approximately 80–100cm), angled 45° in a location representative of the canopy interior (not at the edge). The DIY resistive grid sensor (50–100 THB — see [[Leaf-Wetness-Sensors]]) is adequate for LWD measurement. For Typica, the early warning from a leaf wetness sensor can prevent thousands of THB in CLR damage and fungicide costs.

**SL28 blocks — Dual Temperature Sensors**: SL28 quality depends on the diurnal temperature range, which requires measuring both night minimum and day maximum accurately. Deploy temperature sensors at standard height (1.5m) and ensure the data logging interval captures the true minimum (typically 04:00–06:00) and maximum (typically 13:00–15:00) with at least 15-minute resolution. A single daily average temperature is insufficient for SL28 quality assessment.

**Chumphon Robusta blocks — Deep Soil Moisture Priority**: Robusta's deep root system (1.5–2.5m) means surface soil moisture readings alone are inadequate. Deploy soil moisture sensors at two depths: 20cm (standard) and 50–60cm (deep). The deep sensor is more informative for Robusta irrigation decisions than the surface sensor, which may read dry while deep moisture is adequate. If budget allows only one depth for Robusta, choose 40cm over 20cm.

**Chiang Mai 80 blocks — Surface Temperature Priority**: Chiang Mai 80's heat sensitivity makes canopy-level temperature the most critical early warning parameter. Position air temperature sensors where they capture the actual conditions experienced by the plant (1.2–1.5m height, in the shade of the coffee canopy, not in open air). An exposed sensor overreads by 2–4°C, triggering false heat stress alerts.

---

## Practical Recommendations for Multi-Variety Farms

Many Northern Thailand farms grow multiple varieties — typically Chiang Mai 80 as the commercial backbone with smaller blocks of Typica, Caturra, or Geisha for specialty differentiation. Managing IoT sensors and alerts across multiple varieties requires deliberate system design.

1. **Map every block by variety** in the farm configuration system. Each IoT sensor node should be tagged with the variety it monitors. The decision engine uses this tag to select the correct threshold profile. A single farm may have 3–4 different threshold profiles active simultaneously.

2. **Prioritize sensor investment by the most vulnerable variety**. If you grow Typica (CLR-susceptible) alongside Chiang Mai 80 (CLR-resistant), invest in leaf wetness sensors for the Typica block first. The ROI on a 100 THB leaf wetness sensor in a Typica block is orders of magnitude higher than in a Chiang Mai 80 block.

3. **Set separate alert routing by variety**. Typica CLR alerts should be routed to the farm manager's phone as high-priority SMS, while Chiang Mai 80 humidity alerts can be dashboard-only notifications. Don't dilute urgent alerts with non-urgent ones.

4. **Use variety-specific spray calendars**. The IoT system should generate fungicide application reminders based on actual disease risk conditions per variety, not a single calendar for the entire farm. Typica blocks may need 6–10 applications per rainy season while Chiang Mai 80 blocks need 2–4, and Robusta blocks need zero CLR applications.

5. **Calculate variety-specific ROI for the IoT system**. Present the value of the monitoring system in terms each variety's risk profile protects. For Typica: "This sensor prevented an estimated 150,000 THB in CLR losses." For Chiang Mai 80: "This sensor optimized irrigation, saving 5,000 THB in water costs and preventing 20,000 THB in heat-stress yield loss." Different value propositions for different varieties make the system's value tangible to farmers.

6. **Implement gradual threshold refinement**. Start with the default variety-specific thresholds in this document, then adjust based on your farm's actual experience. If Chiang Mai 80 shows heat stress at 27°C (not 28°C), lower the threshold. If Typica tolerates humidity up to 82% without CLR, raise the warning threshold. The variety profiles are starting points, not final answers — every microclimate is unique.

7. **Document variety-specific outcomes** for continuous improvement. At the end of each season, review which variety-specific alerts were most valuable, which were false alarms, and what yield/quality outcomes resulted. Feed this data back into threshold adjustments for the next season.

8. **Consider grafted plant profiles** (see [[Grafted-Seedlings-Thailand]]) as a distinct cultivar in the system. Grafted Chiang Mai 80 on Chumphon 1 rootstock has different soil moisture and temperature thresholds than own-root Chiang Mai 80, and the system must apply the correct profile. Use the `grafted_cm80_chumphon1` cultivar tag for these blocks.

---

## Related Topics

- [[Arabica-for-North-Thailand]] — Detailed variety profiles including Chiang Mai 80, Typica, Caturra, SL28, Geisha
- [[Robusta-for-North-Thailand]] — Chumphon Robusta varieties and their climate characteristics
- [[Variety-Selection-Guide]] — Decision framework for choosing varieties by altitude
- [[Sensor-Metrics-Thresholds]] — Base threshold tables that these variety profiles extend
- [[Decision-Logic]] — How the IF-THEN rule engine parameterizes by variety and cultivar
- [[Alerts-Remediation]] — Alert design and remediation actions for threshold breaches
- [[Grafted-Seedlings-Thailand]] — Threshold adjustments for grafted Arabica/Robusta plants
- [[Leaf-Wetness-Sensors]] — Critical sensor for CLR-susceptible varieties (Typica, Caturra)
- [[Soil-Moisture-Sensors]] — Priority sensor for Robusta and shallow-rooted varieties
- [[Temperature-Sensors]] — Essential for diurnal range monitoring (SL28, Geisha)
- [[Climate-Change-Impact]] — How shifting climate may change variety-specific thresholds

---

## References

1. DaMatta, F.M. & Ramalho, J.D.C. (2006) — Impacts of drought and temperature stress on coffee physiology; variety-specific responses documented
2. Kath, J. et al. (2020) — Not so robust: Robusta coffee production is highly sensitive to temperature; defines Robusta-specific thresholds
3. World Coffee Research — Variety Catalog; disease resistance ratings and climate preferences for all major varieties
4. ICAFE (Coffee Institute of Costa Rica) — CLR disease prediction model; leaf wetness duration thresholds by variety susceptibility
5. Royal Project Foundation — Variety performance data across Northern Thailand research stations
6. Department of Agriculture (DOA) Thailand — Chiang Mai 80, DOA Chiang Mai 1 variety fact sheets; field performance data
7. Chumphon Horticultural Research Center — Robusta clone performance data; environmental response characteristics
8. Avelino et al. (2015) — Coffee leaf rust development models; humidity and leaf wetness thresholds modulated by variety resistance
9. Bertrand et al. (2011) — "Cup quality of Arabica coffee lines with different CLR resistance gene introgressions"; quality impact of disease resistance genes
10. Partelli, F.L. et al. (2010, 2013) — C. canephora growth and temperature response; Robusta-specific environmental thresholds
11. Böll Foundation (2025) — Coffee farming in Northern Thailand; variety-specific farmer experiences
12. Thai Cup of Excellence 2025 — Variety-specific cup scores under Northern Thailand conditions

---

*Last updated: 2026-05-13*
