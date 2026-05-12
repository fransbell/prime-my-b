---
topic: Decision Logic Engine
phase: 5
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [decision-logic, if-then-rules, sensor-data, action-recommendations, arabica, robusta, thailand]
related: [Sensor-Metrics-Thresholds, Alerts-Remediation, Environment-Intervention, Yield-Quality-Prediction]
---

# Decision Logic Engine

> **Summary**: This document defines the complete set of IF-THEN decision rules that translate raw sensor readings into actionable farmer recommendations. This is the "brain" of the coffee agriculture sensor system — the critical layer between data collection and field action.

---

## 1. Overview

A sensor system without decision logic is merely a data logger. The Decision Logic Engine transforms raw sensor measurements — soil moisture percentages, temperature readings, humidity values, leaf wetness durations — into specific, prioritized, and confidence-weighted recommendations that a Northern Thailand coffee farmer can act upon immediately. This document defines every rule that powers that transformation.

The engine operates on a simple but powerful principle: **IF a specific sensor condition is met AND the agricultural context matches, THEN recommend a specific action WITH a defined priority level AND a confidence score.** This structure ensures that every recommendation is traceable to sensor data, contextualized for the farm's current growth stage and season, and calibrated for the reliability of the underlying measurement.

Northern Thailand's coffee-growing regions span elevations from 500m to over 1,700m, creating enormous variation in microclimate conditions (see [[Microclimate-Factors]]). A single set of static thresholds cannot serve all farms. Therefore, the decision rules are designed to be parameterized by crop variety (Arabica vs. Robusta), elevation zone, current growth stage, and seasonal context. The rule set covers seven critical domains: irrigation management, disease risk, temperature stress, shade and light, soil health, harvest and post-harvest processing, and flowering prediction. Together, these rules form a comprehensive advisory system that addresses the full coffee production cycle from pre-flowering through harvest and drying.

---

## 2. Decision Rule Architecture

### Rule Structure

Every decision rule in the engine follows a standardized format:

```
IF [sensor_condition] AND [context] THEN [action] WITH [priority] WITH [confidence]
```

| Component | Description | Example |
|-----------|-------------|---------|
| **sensor_condition** | One or more sensor readings meeting a threshold | `soil_moisture < 15% VWC` |
| **context** | Growth stage, season, variety, elevation, or weather state | `dry_season AND arabica` |
| **action** | Specific, actionable recommendation for the farmer | `"Irrigate immediately; apply 20–30L per plant"` |
| **priority** | Urgency classification (see below) | `CRITICAL` |
| **confidence** | Reliability weighting based on sensor quality (see Section 6) | `HIGH` |

### Priority Levels

| Priority | Color Code | Meaning | Response Time | Notification Method |
|----------|-----------|---------|---------------|-------------------|
| **EMERGENCY** | 🔴 Red | Immediate plant survival threat | Within 1 hour | SMS + App push + Siren |
| **CRITICAL** | 🟠 Orange | Significant risk to yield or plant health | Within 12 hours | SMS + App push |
| **WARNING** | 🟡 Yellow | Potential risk developing; preventive action needed | Within 48 hours | App push + Dashboard |
| **INFO** | 🟢 Green | Favorable conditions or routine guidance | Next farm visit | Dashboard only |

EMERGENCY-level rules address existential threats to the crop — frost events, extreme heat, or disease outbreaks that can cause irreversible damage within hours. CRITICAL rules address conditions that will cause measurable yield loss if not corrected within days. WARNING rules flag developing risks that preventive action can mitigate. INFO rules provide positive confirmations or routine scheduling suggestions.

### Context Variables

The decision engine tracks these context variables to activate or deactivate rules appropriately:

| Variable | Values | Source |
|----------|--------|--------|
| **variety** | `arabica`, `robusta` | Farm configuration |
| **season** | `dry_season` (Nov–Apr), `rainy_season` (May–Oct), `transition` | Calendar + rainfall sensor |
| **growth_stage** | `vegetative`, `flowering`, `fruit_development`, `cherry_maturation`, `harvest`, `dormant` | Calendar + farmer input |
| **elevation_zone** | `lowland` (<800m), `mid_elevation` (800–1200m), `highland` (>1200m) | Farm GPS configuration |
| **soil_type** | `clay`, `loam`, `sandy_loam`, `sand` | Farm configuration (see [[Soil-pH-Sensors]]) |

---

## 3. Core Decision Rules — Comprehensive IF-THEN Tables

### A. Irrigation Decision Rules

Irrigation is the most frequent and consequential decision a coffee farmer makes. Too little water during flowering and fruit set reduces cherry size and quality; too much water promotes root rot and nutrient leaching. Northern Thailand's distinct dry season (November–April) makes irrigation critical, while the rainy season demands drainage management. These rules integrate soil moisture readings (see [[Soil-Moisture-Sensors]]) with rainfall data (see [[Rainfall-Sensors]]) and growth stage context.

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| IR-01 | `soil_moisture < 15% VWC` | `dry_season AND no_rain_7days` | "Irrigate immediately; apply 20–30L per mature plant; repeat in 3 days if VWC remains below 20%" | CRITICAL | MEDIUM-HIGH |
| IR-02 | `soil_moisture 15–20% VWC` | `flowering_stage AND arabica` | "Irrigate to maintain 25–35% VWC; flowering stress reduces fruit set" | WARNING | MEDIUM-HIGH |
| IR-03 | `soil_moisture 20–25% VWC` | `fruit_development AND dry_season` | "Irrigate to maintain 30–40% VWC; consistent moisture needed for cherry sizing" | WARNING | MEDIUM-HIGH |
| IR-04 | `soil_moisture > 50% VWC` | `rainy_season` | "Check drainage channels; risk of root rot (Armillaria/Fusarium); clear blocked drains" | WARNING | MEDIUM |
| IR-05 | `soil_moisture > 60% VWC` | `any_stage AND clay_soil` | "Severe waterlogging; emergency drainage needed; plants at high risk of root disease" | CRITICAL | MEDIUM |
| IR-06 | `rainfall > 80mm/day` | `cherry_maturation OR harvest_season` | "Harvest pause; cherry drop and quality loss risk; cover drying cherries" | CRITICAL | HIGH |
| IR-07 | `rainfall > 50mm/day AND soil_moisture > 45%` | `rainy_season` | "Saturated soil; reduce irrigation to zero; check erosion on slopes" | WARNING | HIGH |
| IR-08 | `no_rain_14days AND soil_moisture 20–25%` | `vegetative AND arabica AND highland` | "Dry period stress; increase mulch layer; consider supplementary irrigation" | WARNING | MEDIUM-HIGH |
| IR-09 | `soil_moisture < 12% VWC` | `any_stage AND any_variety` | "Severe drought stress; emergency irrigation required; plants may be wilting" | EMERGENCY | MEDIUM-HIGH |
| IR-10 | `rainfall 5–15mm AND soil_moisture 25–35%` | `flowering OR fruit_development` | "Adequate moisture; no irrigation needed; ideal conditions" | INFO | HIGH |

---

### B. Disease Risk Decision Rules

Coffee Leaf Rust (CLR), Coffee Berry Disease (CBD), and root rot are the primary disease threats in Northern Thailand. CLR alone can reduce yields by 30–80% if unmanaged. The decision rules integrate humidity (see [[Humidity-Sensors]]), temperature (see [[Temperature-Sensors]]), and leaf wetness duration (see [[Leaf-Wetness-Sensors]]) to predict disease risk before symptoms appear, following METOS disease model thresholds (see [[Microclimate-Factors]]).

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| DR-01 | `leaf_wetness > 24h AND temp 18–28°C AND humidity > 80%` | `any_variety` | "Apply preventive copper-based fungicide within 48h; CLR infection likely" | CRITICAL | MEDIUM |
| DR-02 | `leaf_wetness 12–24h AND humidity > 70%` | `temp 20–25°C` | "Monitor closely; prepare fungicide; inspect lower canopy for early CLR lesions" | WARNING | MEDIUM |
| DR-03 | `humidity > 80% AND temp 18–28°C` | `no_leaf_wetness_sensor` | "Elevated CLR risk (no LWD data); assume leaf wetness from dew/fog; inspect plants" | WARNING | LOW-MEDIUM |
| DR-04 | `humidity > 85% AND temp 22–25°C AND continuous_3days` | `rainy_season AND arabica` | "Sustained CLR epidemic conditions; systemic fungicide application recommended; consult DOA" | CRITICAL | MEDIUM |
| DR-05 | `leaf_wetness > 48h AND temp 20–25°C` | `cherry_maturation` | "Coffee Berry Disease risk; apply preventive spray; remove mummified cherries" | CRITICAL | MEDIUM |
| DR-06 | `soil_moisture > 55% AND soil_temp > 22°C` | `rainy_season AND clay_soil` | "Root rot risk (Armillaria/Fusarium); improve drainage; drench with Trichoderma if available" | WARNING | MEDIUM |
| DR-07 | `humidity < 60% AND temp > 30°C` | `dry_season` | "Low disease risk; favorable for pruning and field sanitation activities" | INFO | HIGH |
| DR-08 | `leaf_wetness 6–12h AND humidity > 75%` | `transition_season AND highland` | "Borderline CLR conditions; monitor daily; ensure good air circulation through pruning" | WARNING | MEDIUM |
| DR-09 | `temp 15–20°C AND rainfall_event AND humidity > 90%` | `arabica AND highland` | "CBD spore dispersal conditions; check cherries for dark lesions" | WARNING | LOW-MEDIUM |
| DR-10 | `dew_point_within_2°C_of_air_temp AND forecast_rain` | `rainy_season` | "Extended leaf wetness expected; preventive fungicide application before rain event" | WARNING | MEDIUM |

---

### C. Temperature Stress Decision Rules

Temperature extremes pose existential threats to coffee plants. Arabica is particularly vulnerable: frost kills above 1,200m in Northern Thailand (see [[Microclimate-Factors]]), while temperatures above 30°C reduce photosynthetic efficiency and trigger stress responses. The diurnal temperature range is equally important for quality — wide day-night differences drive sugar accumulation in cherries. These rules integrate air temperature (see [[Temperature-Sensors]]) with soil temperature, shade coverage, and growth stage.

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|-------------|------------|
| TS-01 | `air_temp < 4°C` | `arabica` | "Frost alert; protect young plants with covers; activate overhead irrigation if available; check valley floor plants first" | EMERGENCY | HIGH |
| TS-02 | `air_temp < 2°C` | `arabica AND highland` | "Severe frost; all plants at risk; emergency frost protection; expect tissue damage on exposed branches" | EMERGENCY | HIGH |
| TS-03 | `air_temp > 30°C` | `arabica AND shade < 30%` | "Heat stress; increase shade urgently; install temporary shade nets; irrigate to cool root zone" | CRITICAL | HIGH |
| TS-04 | `air_temp > 35°C` | `arabica OR robusta` | "Extreme heat; photosynthesis shutting down; emergency shade and irrigation; cherries may be sunburned" | EMERGENCY | HIGH |
| TS-05 | `soil_temp > 28°C` | `any_variety` | "Root zone stress; add 10cm mulch layer and irrigate to cool soil; feeder roots at risk" | WARNING | MEDIUM-HIGH |
| TS-06 | `diurnal_range < 5°C` | `cherry_maturation` | "Quality risk; low sugar accumulation expected; cup quality may be flat; review shade level" | WARNING | HIGH |
| TS-07 | `air_temp 25–30°C AND diurnal_range > 10°C` | `cherry_maturation AND arabica` | "Excellent quality conditions; wide diurnal range driving sugar and acid development" | INFO | HIGH |
| TS-08 | `air_temp > 28°C AND humidity < 50%` | `dry_season AND fruit_development` | "Rapid evapotranspiration; increase irrigation frequency; mulch heavily; check for leaf curl" | WARNING | HIGH |

---

### D. Shade and Light Decision Rules

Shade management is a critical lever for both yield and quality in Northern Thailand coffee. The Royal Project Foundation recommends 30–50% shade for Arabica (see [[Coffee-Sunlight-Requirements]] and [[Microclimate-Factors]]). Too little shade causes heat stress and reduces quality; too much shade suppresses flowering and promotes disease. These rules use light sensor data (see [[Light-Sensors]]) combined with temperature and growth stage.

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| SL-01 | `shade < 30%` | `arabica AND temp > 28°C` | "Plant shade trees (Leucaena, Gliricidia, Erythrina); install temporary shade nets immediately" | WARNING | MEDIUM-HIGH |
| SL-02 | `shade < 20%` | `arabica AND highland` | "Severe sun exposure; cherry sunburn risk; emergency shade needed; yields declining" | CRITICAL | MEDIUM-HIGH |
| SL-03 | `shade > 70%` | `flowering_stage` | "Prune shade trees to increase light penetration; flowering requires light stimulus" | WARNING | MEDIUM |
| SL-04 | `shade > 80%` | `any_stage AND arabica` | "Excessive shade; yield reduction risk; prune shade canopy immediately; thin lower branches" | CRITICAL | MEDIUM |
| SL-05 | `shade 40–60%` | `cherry_maturation AND arabica` | "Optimal shade for quality cherry development; maintain current canopy" | INFO | MEDIUM |
| SL-06 | `shade < 30%` | `robusta AND lowland` | "Acceptable for Robusta; monitor temperature; Robusta tolerates more sun than Arabica" | INFO | MEDIUM |

---

### E. Soil Health Decision Rules

Soil health is the foundation of coffee productivity but changes slowly, making it easy to neglect. These rules address pH extremes (see [[Soil-pH-Sensors]]), nutrient trends (see [[NPK-Sensors]]), and soil structural issues. Coffee prefers slightly acidic soil (pH 5.0–6.0); deviations outside this range lock up essential nutrients and stress root systems. The NPK sensor rules are cautious — low-cost ion-selective electrodes provide relative trends rather than absolute values.

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| SH-01 | `soil_pH < 4.5` | `any_variety` | "Apply lime (CaCO₃) at 200–400 kg/rai; retest pH in 2 weeks; aluminum toxicity risk" | CRITICAL | MEDIUM |
| SH-02 | `soil_pH 4.5–5.0` | `arabica` | "Slightly low pH; apply moderate lime; check calcium and magnesium levels" | WARNING | MEDIUM |
| SH-03 | `soil_pH > 7.0` | `arabica` | "Apply sulfur; check iron and manganese availability; chlorosis likely" | WARNING | MEDIUM |
| SH-04 | `soil_pH > 6.5` | `robusta` | "Slightly high for Robusta preference; monitor for nutrient deficiency symptoms" | INFO | MEDIUM |
| SH-05 | `NPK_sensor sudden_drop > 30%` | `last_lab_test > 6months` | "Schedule DOA soil lab test; sensor trend suggests nutrient depletion; do not rely on sensor alone" | WARNING | LOW |
| SH-06 | `soil_EC > 1.5 dS/m` | `any_variety` | "High salinity risk; flush with clean water; check fertilizer application rates; possible salt accumulation from irrigation" | WARNING | MEDIUM |

---

### F. Harvest and Post-Harvest Decision Rules

Harvest timing and post-harvest processing (especially drying) are where quality is won or lost. Northern Thailand's transition from rainy to dry season (October–December) is the critical harvest window. These rules help farmers identify optimal picking conditions and manage the drying process, which is highly sensitive to humidity and airflow. Even 24 hours of high humidity during drying can ruin an entire lot (see [[Northern-Thailand-Weather]]).

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| HP-01 | `humidity < 65% AND no_rain_3days` | `cherry_maturation` | "Optimal harvest and drying conditions; prioritize picking ripe cherries" | INFO | HIGH |
| HP-02 | `humidity > 75%` | `harvest_season AND drying_cherries` | "Cover drying cherries immediately; mold and OTA risk; use raised drying beds" | WARNING | HIGH |
| HP-03 | `wind > 2 m/s AND humidity < 60%` | `drying_cherries` | "Good drying conditions; turn cherries frequently; target 11–12% moisture content" | INFO | HIGH |
| HP-04 | `wind < 0.5 m/s AND humidity > 70%` | `drying_cherries` | "Poor drying conditions; use mechanical fans or forced-air drying; risk of fermented/defective beans" | WARNING | MEDIUM |
| HP-05 | `rainfall_event AND drying_cherries` | `any_stage` | "Cover cherries immediately; even brief rain contact degrades quality; check for mold after uncovering" | CRITICAL | HIGH |
| HP-06 | `humidity 55–65% AND temp 25–30°C AND light_cloud` | `drying_cherries` | "Ideal slow-drying conditions; best for specialty quality development; expect 10–14 day drying" | INFO | HIGH |

---

### G. Flowering Prediction Rules

Synchronized flowering after the first rains of the dry-to-wet transition is critical for Arabica coffee in Northern Thailand. The flowering stimulus depends on a period of water stress (dry days) followed by a significant rainfall event. Predicting flowering allows farmers to schedule labor for harvest 7–9 months later and to apply pre-flowering nutrients. These rules are unique to the monsoon climate pattern of Southeast Asia.

| # | IF Sensor Condition | AND Context | THEN Action | Priority | Confidence |
|---|---------------------|-------------|-------------|----------|------------|
| FP-01 | `dry_days > 28 AND rainfall_first_event > 10mm AND temp 20–30°C` | `arabica AND pre_monsoon` | "Flowering expected in 7–14 days; apply pre-flowering fertilizer (NPK 15-15-15); schedule labor" | INFO | MEDIUM |
| FP-02 | `rain_during_dry_period AND flowering_not_started` | `arabica AND dry_season` | "Risk of unsynchronized flowering; multiple small rain events cause staggered bloom; harvest will be extended" | WARNING | MEDIUM |
| FP-03 | `dry_days > 35 AND no_rain_forecast_7days` | `arabica AND pre_monsoon` | "Extended dry period; when rain arrives, flowering will be intense and synchronized; prepare for concentrated harvest" | INFO | LOW-MEDIUM |
| FP-04 | `rainfall_event > 20mm AND previous_dry_period > 21days AND temp 22–28°C` | `arabica AND transition_season` | "Major flowering trigger; expect peak bloom in 7–10 days; ensure irrigation available if follow-up rain is delayed" | INFO | MEDIUM |
| FP-05 | `intermittent_rain AND humidity > 70% AND temp 18–25°C` | `robusta AND early_rainy_season` | "Robusta flowering conditions; Robusta flowers over a longer period; less synchronization than Arabica" | INFO | LOW-MEDIUM |

---

## 4. Rule Conflict Resolution

In practice, multiple rules may fire simultaneously — a common occurrence during the transition seasons when conditions change rapidly. For example, high humidity might trigger both a disease warning (DR-02) and a poor drying condition alert (HP-04), while simultaneously the soil moisture might be low enough to trigger an irrigation warning (IR-02). The system must resolve these conflicts intelligently and present clear, non-contradictory guidance to the farmer.

### Resolution Hierarchy

| Rank | Rule Category | Rationale |
|------|--------------|-----------|
| 1 | **EMERGENCY rules** (any category) | Existential threat to plants overrides all other concerns |
| 2 | **Disease risk rules** | Disease can kill plants or destroy an entire harvest in days; faster-acting than most other threats |
| 3 | **Frost/heat stress rules** | Temperature extremes cause irreversible damage quickly |
| 4 | **Irrigation rules** | Water stress develops over days to weeks; more recovery time available |
| 5 | **Shade/light rules** | Shade adjustments are seasonal and longer-term |
| 6 | **Soil health rules** | Soil chemistry changes slowly; weeks to correct |
| 7 | **Harvest/post-harvest rules** | Important but typically time-sensitive only during harvest window |
| 8 | **Flowering prediction** | Informational; no immediate action required |
| 9 | **INFO-level rules** | Advisory only; never override higher-priority rules |

### Contradictory Rule Handling

When two rules directly contradict each other, the following logic applies:

1. **Priority-based override**: A CRITICAL irrigation rule overrides a WARNING shade rule if both fire simultaneously
2. **Specificity-based override**: A rule with more specific conditions (3 conditions) overrides a less specific rule (1 condition) at the same priority level
3. **Category-based override**: Per the hierarchy above, disease rules win over irrigation rules at equal priority
4. **Merge compatible actions**: If two rules at the same priority recommend non-contradictory actions (e.g., "irrigate" and "apply mulch"), both recommendations are presented
5. **Defer to farmer judgment**: When automated resolution is ambiguous, present both recommendations with their confidence scores and let the farmer decide

---

## 5. Context-Aware Rule Activation

Rules are not universally active at all times. Running irrigation rules during peak rainy season or flowering prediction rules in December wastes computation and generates irrelevant alerts. The following table maps which rule categories are active during each growth stage and season combination.

| Rule Category | Vegetative | Flowering | Fruit Development | Cherry Maturation | Harvest | Dormant |
|---------------|-----------|-----------|-------------------|-------------------|---------|---------|
| **Irrigation** | ✅ Active (dry season) | ✅ Active (all seasons) | ✅ Active (all seasons) | ✅ Active (dry season) | ⬜ Inactive | ✅ Active (dry season) |
| **Disease Risk** | ✅ Active (rainy season) | ✅ Active (rainy season) | ✅ Active (rainy season) | ✅ Active (rainy/transition) | ⬜ Inactive | ⬜ Inactive |
| **Temperature Stress** | ✅ Active (all seasons) | ✅ Active (all seasons) | ✅ Active (all seasons) | ✅ Active (all seasons) | ⬜ Inactive | ✅ Active (cool season) |
| **Shade/Light** | ✅ Active (all seasons) | ✅ Active (all seasons) | ✅ Active (all seasons) | ✅ Active (all seasons) | ⬜ Inactive | ✅ Active (dry season) |
| **Soil Health** | ✅ Active (all seasons) | ✅ Active (pre-season) | ✅ Active (all seasons) | ⬜ Inactive | ⬜ Inactive | ✅ Active (post-harvest) |
| **Harvest/Post-Harvest** | ⬜ Inactive | ⬜ Inactive | ⬜ Inactive | ✅ Active (transition) | ✅ Active (transition/dry) | ⬜ Inactive |
| **Flowering Prediction** | ⬜ Inactive | ✅ Active (pre-monsoon) | ⬜ Inactive | ⬜ Inactive | ⬜ Inactive | ⬜ Inactive |

### Seasonal Rule Count Summary

| Season | Approximate Active Rules | Key Concerns |
|--------|------------------------|-------------|
| **Dry season (Nov–Apr)** | 25–30 | Irrigation, heat stress, flowering prediction, shade management |
| **Rainy season (May–Oct)** | 20–25 | Disease risk, drainage, harvest/post-harvest (Oct–Dec) |
| **Transition (Apr–May, Oct–Nov)** | 30–35 | Peak rule density; disease + irrigation + flowering overlap |

---

## 6. Confidence Scoring System

Not all sensor data is equally reliable. A temperature reading from an SHT31 sensor (±0.3°C accuracy) carries more weight than an NPK sensor reading from a low-cost ion-selective electrode (±20–30% accuracy). The confidence score attached to each rule recommendation reflects this reality, helping farmers calibrate their trust in the system's output.

### Sensor Confidence Ratings

| Sensor / Parameter | Sensor Model | Typical Accuracy | Confidence Level | Notes |
|-------------------|-------------|-----------------|-----------------|-------|
| **Air temperature** | SHT31 / SHT40 | ±0.2–0.3°C | **HIGH** | Well-calibrated; reliable for all temperature rules |
| **Relative humidity** | SHT31 / SHT40 | ±2% RH | **HIGH** | Reliable for disease risk assessment |
| **Soil moisture (calibrated)** | Capacitive V1.2 (calibrated) | ±5–10% VWC | **MEDIUM-HIGH** | Accuracy depends on calibration quality and soil type |
| **Soil moisture (uncalibrated)** | Capacitive V1.2 (raw) | ±15–20% VWC | **MEDIUM** | Only useful for trend detection; do not trust absolute thresholds |
| **Leaf wetness (DIY)** | DIY resistive grid | Qualitative (wet/dry + duration) | **MEDIUM** | Good for duration measurement; less reliable for absolute wetness level |
| **Leaf wetness (commercial)** | Davis / METOS | ±1h duration | **HIGH** | Professional-grade; trust for disease model inputs |
| **Rainfall** | Tipping bucket | ±2–5% | **HIGH** | Reliable for daily totals; may undercount in extreme wind |
| **Light / Shade %** | BH1750 | ±5–10% lux | **MEDIUM-HIGH** | Adequate for shade percentage estimation |
| **Soil pH** | Periodic probe / lab test | ±0.1–0.3 pH | **MEDIUM** (if recent) / **LOW** (if >3 months old) | Confidence decays with time since last measurement |
| **NPK (ion-selective)** | Low-cost RS485 NPK | ±20–30% (relative) | **LOW** | Use only for trend detection; never for absolute thresholds |
| **Soil temperature** | DS18B20 | ±0.5°C | **HIGH** | Reliable for root zone stress rules |
| **Wind speed** | Anemometer (cup/vane) | ±0.5 m/s | **MEDIUM-HIGH** | Adequate for drying condition assessment |

### Confidence Decay Rule

For periodic measurements (soil pH, lab NPK tests), confidence decays over time:

```
effective_confidence = base_confidence × max(0.3, 1.0 - (days_since_measurement / 180))
```

This means a pH reading taken 90 days ago operates at 50% of its base confidence, and readings older than 180 days are floored at 30% confidence. This ensures the system gradually reduces trust in stale data rather than ignoring it entirely.

---

## 7. Pseudocode Implementation

The following simplified pseudocode demonstrates how the Decision Logic Engine could be implemented on an ESP32 firmware or server-side application. It processes sensor readings through all active rules, resolves conflicts, and returns a prioritized recommendation list.

```
// Decision Logic Engine - Core Loop
// Runs every 15 minutes (configurable)

FUNCTION run_decision_engine(sensor_readings, farm_context):
    
    active_rules = load_active_rules(farm_context.growth_stage, farm_context.season)
    fired_rules = []
    
    // Evaluate all active rules
    FOR EACH rule IN active_rules:
        IF evaluate_condition(rule.sensor_condition, sensor_readings):
            IF evaluate_context(rule.context, farm_context):
                confidence = compute_confidence(rule, sensor_readings, farm_context)
                IF confidence >= MIN_CONFIDENCE_THRESHOLD:  // typically 0.3
                    fired_rules.append({
                        id: rule.id,
                        action: rule.action,
                        priority: rule.priority,
                        confidence: confidence,
                        category: rule.category
                    })
    
    // Sort by resolution hierarchy
    fired_rules.sort_by(
        primary: priority_rank DESC,     // EMERGENCY=4, CRITICAL=3, WARNING=2, INFO=1
        secondary: category_rank DESC,    // Disease > Temp > Irrigation > ...
        tertiary: confidence DESC         // Higher confidence first
    )
    
    // Remove contradictory rules
    resolved_rules = resolve_conflicts(fired_rules)
    
    // Merge compatible same-priority rules
    final_recommendations = merge_compatible(resolved_rules)
    
    // Generate notifications
    FOR EACH rec IN final_recommendations:
        IF rec.priority == EMERGENCY:
            send_sms(rec.action)
            send_push(rec.action)
            trigger_audible_alert()
        ELIF rec.priority == CRITICAL:
            send_sms(rec.action)
            send_push(rec.action)
        ELIF rec.priority == WARNING:
            send_push(rec.action)
        ELSE:  // INFO
            log_to_dashboard(rec.action)
    
    RETURN final_recommendations


FUNCTION evaluate_condition(condition, readings):
    // Parse compound conditions with AND/OR logic
    // e.g., "soil_moisture < 15 AND no_rain_7days"
    // Returns boolean


FUNCTION compute_confidence(rule, readings, context):
    base = rule.base_confidence
    // Apply sensor-specific confidence
    FOR EACH sensor_var IN rule.sensor_variables:
        base *= get_sensor_confidence(sensor_var, readings.freshness[sensor_var])
    // Apply context confidence
    IF context.growth_stage_uncertain:
        base *= 0.8
    RETURN max(base, 0.1)  // Floor at 10%


FUNCTION resolve_conflicts(fired_rules):
    result = []
    FOR i = 0 TO len(fired_rules) - 1:
        skip = FALSE
        FOR j = 0 TO i - 1:
            IF are_contradictory(fired_rules[i], fired_rules[j]):
                // Lower-ranked rule is suppressed
                skip = TRUE
                BREAK
        IF NOT skip:
            result.append(fired_rules[i])
    RETURN result
```

### Implementation Notes for ESP32

The full rule set (40+ rules) may be too large for ESP32 flash memory in a complex firmware. Practical options include:

1. **Server-side processing**: ESP32 sends sensor data via LoRa/WiFi to a server; server runs the decision engine and returns recommendations. This is the recommended approach for full rule coverage.
2. **Simplified firmware subset**: Embed only EMERGENCY and CRITICAL rules on the ESP32 for offline operation; offload WARNING and INFO rules to the server. This requires ~15 rules and fits comfortably in ESP32 flash.
3. **Hybrid approach**: ESP32 runs a reduced rule set locally for immediate alerts, while the full engine runs server-side for comprehensive recommendations. Best of both worlds but adds complexity.

---

## 8. Practical Recommendations

1. **Start with irrigation and disease rules only**: In the first deployment season, activate only the irrigation (IR-01 through IR-10) and disease risk (DR-01 through DR-10) rule categories. These address the two most impactful and time-sensitive decisions. Add other rule categories in subsequent seasons as sensor coverage and farmer trust grow.

2. **Calibrate soil moisture sensors before trusting irrigation rules**: The irrigation rules depend on accurate VWC readings. An uncalibrated Capacitive V1.2 sensor may report 20% when actual VWC is 35%, triggering unnecessary irrigation. Follow the calibration procedure in [[Soil-Moisture-Sensors]] before deploying any irrigation rules.

3. **Deploy leaf wetness sensors in fog-prone areas**: Disease rules that include leaf wetness data (DR-01, DR-02, DR-05) are significantly more reliable than rules that estimate leaf wetness from humidity alone (DR-03). Farms above 1,000m in Chiang Mai and Chiang Rai provinces should prioritize leaf wetness sensor installation (see [[Leaf-Wetness-Sensors]]).

4. **Set MIN_CONFIDENCE_THRESHOLD to 0.4 for initial deployment**: During the first 3–6 months, the system will generate many low-confidence recommendations as sensors calibrate and baseline data accumulates. Filtering out recommendations below 40% confidence reduces alert fatigue. Lower the threshold to 0.3 after the system stabilizes.

5. **Validate rules against farmer experience**: Before automating any CRITICAL or EMERGENCY alert, validate the rule against at least one experienced local farmer's judgment. Northern Thailand's microclimates are highly variable, and a rule calibrated for Doi Inthanon may not apply directly to Doi Chang without parameter adjustment.

6. **Implement a feedback loop**: When a farmer dismisses or overrides a recommendation, log the event. After 50+ override events for a specific rule, review and recalibrate the rule's thresholds or confidence level. The decision engine should learn from farmer expertise, not override it.

7. **Use the flowering prediction rules for labor planning**: Rule FP-01's flowering prediction gives 7–14 days advance notice, which translates to 7–9 months of lead time for harvest scheduling. Share these predictions with the farming cooperative to coordinate labor across multiple farms.

8. **Never rely on NPK sensor data for fertilization decisions**: The NPK sensor rules (SH-05, SH-06) are designed only to flag anomalies that warrant a proper DOA lab test. Low-cost ion-selective NPK sensors are unreliable for absolute nutrient levels. Always confirm with a laboratory analysis before adjusting fertilization (see [[NPK-Sensors]]).

---

## 9. Related Topics & References

### Related Topics

- [[Sensor-Metrics-Thresholds]] — The raw threshold values that underpin these decision rules
- [[Alerts-Remediation]] — Detailed remediation procedures for each rule's recommended action
- [[Environment-Intervention]] — Physical interventions farmers can make to alter microclimate conditions
- [[Yield-Quality-Prediction]] — How sensor-driven decisions impact predicted yield and cup quality
- [[Microclimate-Factors]] — Why microclimate variation demands parameterized, context-aware rules
- [[Arabica-Climate-Range]] — Optimal climate ranges that define Arabica-specific rule thresholds
- [[Robusta-Climate-Range]] — Climate ranges for Robusta, which requires different rule parameters
- [[Soil-Moisture-Sensors]] — Calibration and accuracy details affecting irrigation rule confidence
- [[Leaf-Wetness-Sensors]] — Sensor options and accuracy affecting disease rule confidence
- [[Temperature-Sensors]] — Temperature measurement hardware and accuracy specifications
- [[Northern-Thailand-Weather]] — Seasonal weather patterns driving context-aware rule activation

### References

1. METOS/Pessl Instrument — CLR disease models and leaf wetness duration thresholds for coffee
2. Royal Project Foundation — Shade management guidelines (30–50% recommended for Arabica)
3. FAO Arabica Coffee Manual for Lao PDR — Irrigation thresholds and flowering triggers
4. Thai Department of Agriculture (DOA) — Soil pH recommendations for coffee in Northern Thailand
5. Khun Mae Kuang Forest Reserve research — Shade-grown vs. open-field coffee microclimate data
6. Bangkok Post (2025–2026) — Frost event reporting at Doi Inthanon; temperature thresholds
7. A. Avelino et al. (2015) — Coffee Leaf Rust development models; humidity and leaf wetness thresholds
8. J. Baggio et al. — Rule-based decision support systems for precision agriculture
9. CIMMYT/IRRI — Decision rule architecture patterns for agricultural advisory systems
10. Heinrich Böll Foundation (2025) — Thailand coffee farming practices and adaptation strategies

---

*Last updated: 2026-05-12*
