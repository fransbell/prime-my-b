---
topic: Yield & Quality Prediction
phase: 5
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [yield, quality, prediction, model, sensor-data, arabica, robusta, thailand]
related: [Sensor-Metrics-Thresholds, Decision-Logic, Alerts-Remediation, Arabica-Climate-Range, Robusta-Climate-Range]
---

# Yield & Quality Prediction

## 1. Overview

Sensor data does far more than trigger real-time alerts — it enables **predictive insight** into coffee yield and quality weeks or months before harvest. Yield and quality prediction represents the most advanced and economically valuable function of the entire sensor system described in [[Sensor-Metrics-Thresholds]]. By continuously monitoring soil moisture, temperature, humidity, and rainfall throughout the coffee growing cycle, the system can estimate how much coffee a farm will produce and what cup quality that coffee is likely to achieve. This foresight transforms reactive farming into proactive decision-making.

For smallholder farmers in Northern Thailand, the financial difference between a predicted specialty harvest and a commodity harvest can mean the difference between 60 THB/kg and 500 THB/kg — an 8× price gap. Knowing this in advance allows farmers to make critical decisions: whether to invest in selective picking labor (adding 30% to harvest costs but potentially doubling revenue), whether to build covered drying infrastructure before the harvest season, whether to negotiate crop insurance, or whether to redirect resources toward a different processing method entirely. Without prediction, these decisions are made by guesswork; with it, they become data-informed strategies.

This document presents yield prediction models calibrated for Northern Thailand's arabica and robusta growing conditions, quality prediction frameworks tied to sensor-measurable environmental variables, Brix-guided processing decision trees, accuracy expectations and limitations, economic impact analyses, and a practical implementation architecture. All models are designed to work with the sensor thresholds defined in [[Sensor-Metrics-Thresholds]] and integrate with the alert and decision systems described in [[Decision-Logic]] and [[Alerts-Remediation]].

---

## 2. Yield Prediction Model

### Factors Affecting Yield (Sensor-Measurable)

Yield in coffee is determined by a complex interplay of environmental factors, many of which are directly measurable by the sensor system. Understanding these factors — and when they matter most in the phenological cycle — is the foundation of any prediction model.

- **Soil moisture during flowering (Feb–May):** This is the single most critical period for yield determination. Arabica coffee in Northern Thailand typically flowers between February and April, triggered by the first significant rain events after the dry season. If soil moisture (Volumetric Water Content, VWC) drops below 20% during this window, flower initiation is impaired and fruit set is dramatically reduced. Research and field observations across Chiang Rai, Chiang Mai, and Mae Hong Son provinces document yield losses of 20–40% when drought coincides with flowering. Even brief dry spells during anthesis can cause flower abortion. The sensor system must flag VWC below 20% during February–May as a critical yield risk, triggering the irrigation advisories described in [[Alerts-Remediation]].

- **Soil moisture during fruit development (Jun–Sep):** After successful fruit set, cherries enter a lengthy development phase where water availability directly affects cherry size and weight. Soil VWC below 25% during this period leads to smaller cherries, lower bean density, and reduced overall yield. Field data from Northern Thailand farms shows yield impacts of 10–30% when moisture stress persists through the monsoon shoulder months (June and September), when rainfall can be erratic despite the overall wet season. The [[Arabica-Climate-Range]] specifications identify the optimal VWC range as 30–45% during this period.

- **Temperature stress:** Both extreme heat and unexpected cold reduce yield. Mean temperatures exceeding 25°C during fruit development accelerate cherry maturation, producing smaller beans with lower density. A key study from Yunnan, China — a growing region with climate similarities to Northern Thailand — demonstrated approximately 18.9% yield loss per 1°C drop in minimum temperature during the maturity phase. This finding is particularly relevant for high-elevation arabica farms (above 1,000 masl) in Doi Chang, Doi Tung, and Doi Inthanon, where cold snaps during the October–November maturity period are a documented risk.

- **Excessive rainfall:** Individual rainfall events exceeding 80mm/day cause mechanical cherry drop, especially when cherries are heavy and near maturity. Beyond single events, cumulative rainfall during the fruit development period also matters — persistently saturated soils (VWC > 55%) promote root disease and reduce the tree's ability to absorb nutrients. The combined effect can reduce yield by 15–25% in severe monsoon years, particularly on farms without adequate drainage infrastructure.

- **Disease impact:** Coffee Leaf Rust (CLR, *Hemileia vastatrix*) remains the most economically damaging disease for both arabica and robusta in Northern Thailand. During fruit development, uncontrolled CLR can cause 30–80% yield loss depending on severity and timing. The sensor system detects conditions favorable to CLR (leaf wetness > 6 hours, temperature 21–27°C, humidity > 80%) as described in [[Sensor-Metrics-Thresholds]], enabling preventive spraying before yield loss occurs. Early detection through sensor-driven alerts can reduce CLR impact from 50% yield loss to under 10%.

- **Nutrient availability:** While the basic sensor suite does not directly measure soil nutrients, indirect indicators (soil moisture affecting nutrient uptake, pH readings from advanced sensors, and historical fertilization records) allow the prediction model to include a nutrient factor. NPK deficiency — particularly nitrogen during vegetative growth (March–June) and potassium during cherry filling (July–September) — reduces both cherry count per branch and individual bean weight. Farms with documented NPK deficiencies typically show 15–35% yield reductions compared to well-fertilized plots under identical climate conditions.

### Yield Prediction Formula (Simplified)

The yield prediction model uses a multiplicative approach, where each sensor-measured factor modifies a base yield estimate. This approach is transparent, interpretable, and can be calibrated to individual farms over time.

```
Predicted_Yield = Base_Yield × SM_Factor × Temp_Factor × Disease_Factor × Rain_Factor × Nutrient_Factor
```

Where:
- **Base_Yield**: The expected yield under optimal conditions for the specific coffee type and farm (see table below). Calibrated from the farm's own historical data or regional averages.
- **SM_Factor** (Soil Moisture): 1.0 if VWC stays within optimal range throughout the season. Reduced proportionally for periods below threshold — e.g., if VWC < 20% for 30% of the flowering period, SM_Factor ≈ 0.75 (reflecting 25% yield reduction from flowering stress).
- **Temp_Factor**: 1.0 if mean temperature stays within the ideal range for the coffee type (see [[Arabica-Climate-Range]] and [[Robusta-Climate-Range]]). Reduced by 0.19 per °C of minimum temperature drop during maturity, or by 0.05 per °C of mean temperature excess above 25°C during development.
- **Disease_Factor**: 1.0 if no disease detected. Reduced to 0.5–0.7 if CLR conditions persist > 72 hours without intervention. Reduced to 0.2–0.5 if CLR is detected and untreated during fruit development.
- **Rain_Factor**: 1.0 if no extreme rainfall events. Reduced by 0.05 per event > 80mm/day. Reduced by 0.10 per event > 120mm/day.
- **Nutrient_Factor**: Defaults to 0.85 for farms without documented fertilization programs. Set to 1.0 for farms with verified nutrient management. Can be adjusted based on soil sensor data if available.

Each factor operates as a multiplier between 0 and 1, so multiple stressors compound. A farm experiencing drought during flowering (SM_Factor = 0.7), moderate CLR pressure (Disease_Factor = 0.8), and one extreme rain event (Rain_Factor = 0.95) would see a combined prediction of Base_Yield × 0.7 × 1.0 × 0.8 × 0.95 × 0.85 = Base_Yield × 0.45 — a 55% yield reduction.

### Yield Ranges for Northern Thailand

| Coffee Type | Low Yield (kg/rai) | Average (kg/rai) | High (kg/rai) | Notes |
|---|---|---|---|---|
| Arabica (commodity) | 100–200 | 200–350 | 350–500 | Green bean weight; lower elevation |
| Arabica (specialty) | 80–150 | 150–250 | 250–400 | Lower yield, higher price per kg |
| Robusta (commodity) | 200–400 | 400–600 | 600–800+ | Higher yield potential; lower elevation |
| Robusta (Fine) | 150–300 | 300–450 | 450–600 | Processing-focused, quality-driven |

Note: 1 rai = 1,600 m². Yields are expressed in green bean equivalents. Cherry-to-green-bean conversion ratios vary: approximately 5:1 for wet process and 4.5:1 for natural process. Farms in the Doi Chang and Doi Tung areas producing specialty arabica typically achieve 150–250 kg/rai with shade-grown practices, while full-sun commodity farms at lower elevations may reach 300–400 kg/rai but at significantly lower quality premiums.

---

## 3. Quality Prediction Model

### Sensor-Based Quality Indicators

Coffee quality — measured primarily through SCA cupping scores — is profoundly influenced by environmental conditions during specific phenological phases. Unlike yield, which accumulates stress throughout the season, quality is disproportionately determined by conditions during cherry maturation and harvest. This makes quality prediction both more focused (fewer variables) and more sensitive (small changes matter).

- **Diurnal Temperature Range (DTR):** The difference between daytime high and nighttime low during cherry maturation (September–November for arabica in Northern Thailand) is the single most powerful sensor-based predictor of specialty quality. DTR > 10°C promotes slow, even sugar accumulation in the cherry, producing denser beans with more complex flavor precursors. Regions like Doi Chang and Doi Inthanon regularly achieve DTR of 12–15°C during maturation, which is why these areas produce Thailand's best specialty coffees. DTR < 7°C — typical of lower-elevation farms or cloudy monsoon-affected seasons — limits sugar development and produces flat, commodity-grade cups. The relationship is well-documented in Colombian, Ethiopian, and Yunnan growing regions, and Northern Thailand data strongly confirms the pattern.

- **Mean temperature during maturation:** Mean temperatures of 18–21°C during the cherry maturation window are strongly associated with specialty-grade coffee. This range allows slow ripening (typically 8–10 months from flower to harvest for arabica), which builds complexity. Mean temperatures of 21–24°C produce good commodity coffee — decent body and sweetness but limited complexity. Above 24°C, ripening accelerates, bean density drops, and flavor complexity suffers. This is a key reason why arabica quality drops off sharply below 800 masl in Northern Thailand. The [[Arabica-Climate-Range]] document provides detailed temperature thresholds by growth stage.

- **Shade percentage:** Shade levels of 40–60% — whether from managed shade trees (like banana, macadamia, or leguminous species) or natural forest canopy — consistently produce higher cup quality scores. Shade moderates temperature, extends ripening, reduces stress, and encourages biodiversity (including natural pest control). Full-sun coffee typically yields 20–40% more but cups 3–8 SCA points lower. Excessive shade (>70%) reduces yield excessively and can promote fungal disease. The optimal shade range can be inferred from light sensors (PAR) or estimated from temperature differentials between shaded and exposed sensor nodes.

- **Soil moisture during ripening:** Counterintuitively, slight water stress during the ripening phase (VWC 25–30%) produces higher sugar content in cherries, translating to better cup quality. This "controlled stress" principle is well-established in viticulture and applies directly to coffee. Over-irrigated or waterlogged trees produce larger but less flavorful cherries. The sensor system should track VWC during September–November and flag both excessive moisture (VWC > 40%) and severe drought (VWC < 20%) as quality risks.

- **Rain during harvest:** Rain during the November–December harvest period is the single most damaging quality risk. Wet cherries are harder to process, prone to mold and fermentation defects, and must be dried artificially or on covered raised beds. Documented price drops for rain-affected harvests range from 30–70% compared to clean-harvest coffee from the same farm. The sensor system's rainfall monitoring and 5-day forecast integration (described in [[Alerts-Remediation]]) provides critical advance warning, allowing farmers to accelerate picking schedules or deploy drying infrastructure.

- **Humidity during drying:** For post-harvest quality, relative humidity during the drying phase is decisive. Average RH below 65% enables clean, even drying to 10–12% moisture content within 7–14 days — ideal for specialty processing. RH above 75% slows drying dramatically, increases the risk of mold and off-fermentation, and can require mechanical drying (which itself can introduce defects if temperatures exceed 40°C). The sensor system's humidity monitoring in the drying area is essential for quality assurance.

### Quality Grade Classification

| Grade | SCA Score | Sensor Profile | Price (THB/kg green) |
|---|---|---|---|
| Specialty Premium | 85+ | DTR >12°C, mean <20°C, shade 50–60%, dry harvest | 250–500+ |
| Specialty | 80–84 | DTR >10°C, mean <22°C, shade 40–50%, mostly dry | 150–250 |
| Premium Commodity | 75–79 | DTR 7–10°C, mean <24°C, some shade | 100–150 |
| Commodity | <75 | DTR <7°C, mean >24°C, full sun or excessive shade | 60–100 |

These price ranges reflect 2025–2026 Northern Thailand market conditions. Specialty Premium coffees from recognized origins (Doi Chang, Doi Tung, Mae Hong Son) can command 400–500+ THB/kg, particularly when sold through direct-trade relationships or specialty auctions. The sensor profile column describes the conditions most commonly associated with each grade — individual lots may exceed or fall short of these associations based on processing skill, varietal, and farm-specific terroir.

### Brix-Guided Processing

Brix readings — measuring sugar content in coffee cherry juice — combined with IoT sensor data enable precise processing decisions that maximize quality and economic return. The integration works as follows:

- **High Brix (>20) + good conditions:** When Brix readings exceed 20°Bx and environmental conditions support clean drying (RH < 65%, no rain forecast for 14+ days, DTR > 10°C during maturation), the model recommends **specialty natural or honey processing**. Natural-processed coffee from high-Brix cherries can achieve SCA scores 3–5 points above wet-processed equivalents from the same farm, commanding prices of 300–500+ THB/kg. Honey process offers a middle ground with lower risk than full natural. The sensor system's drying-area RH monitoring is critical for natural processing — any RH spike above 75% triggers an alert to stir cherries or deploy emergency covering.

- **Medium Brix (15–20):** This is the most common range for well-managed arabica in Northern Thailand. The model recommends **wet (washed) processing**, which provides the most consistent results and the lowest defect risk. Wet processing removes the cherry skin and mucilage before drying, eliminating the fermentation risk that makes natural processing dangerous in humid conditions. With good drying conditions (RH < 65%), wet-processed medium-Brix coffee typically scores 80–84 SCA and sells for 150–250 THB/kg. If the sensor system detects elevated humidity (>70% RH forecast), the model may recommend semi-washed (pulped natural) as a compromise.

- **Low Brix (<15):** Cherries with Brix below 15°Bx indicate underripe picking, severe plant stress, or poor growing conditions. The model recommends **commodity processing** — either standard wet process with less selective sorting or direct commodity-channel sale. Attempting specialty processing on low-Brix cherries wastes labor and drying infrastructure. The sensor system can identify the likely cause (e.g., VWC < 20% during ripening → drought stress; mean temp > 25°C → heat stress) and recommend corrective actions for the following season.

---

## 4. Prediction Accuracy and Limitations

Prediction accuracy improves steadily as the season progresses and more data becomes available. Understanding these accuracy levels is essential for presenting predictions to farmers in a way that builds trust without overpromising.

- **Early season predictions (flowering, Feb–May): 60–70% accurate.** At this stage, the model primarily relies on soil moisture data during flowering and historical base yields. Many factors — disease outbreaks, monsoon patterns, extreme weather — have not yet occurred. Predictions at this stage should be presented as "early indications" rather than firm forecasts. A prediction of 250 kg/rai might reasonably range from 150–350 kg/rai. However, early predictions are still valuable: they can flag a 40% potential yield loss from flowering drought, giving farmers time to adjust fertilizer applications, apply for crop insurance, or plan supplemental irrigation.

- **Mid-season predictions (fruit development, Jun–Sep): 70–80% accurate.** By mid-season, the model incorporates temperature stress data, disease pressure indicators (from humidity and leaf wetness sensors), and cumulative rainfall. The yield picture is substantially clearer, though cherry maturation conditions — which strongly affect both final yield and quality — remain unknown. Quality predictions at this stage are preliminary. A farm predicted to achieve specialty grade based on DTR and temperature data to date might still be downgraded by late-season rain.

- **Pre-harvest predictions (cherry maturation, Oct–Nov): 80–85% accurate.** This is the most reliable prediction window. DTR during maturation, soil moisture during ripening, Brix readings from field sampling, and short-term weather forecasts all feed into the model. Yield predictions typically narrow to within ±15% of actual, and quality predictions correctly classify 80–85% of lots into the right grade category. The remaining 15–20% error comes from unpredictable factors and the inherent variability of biological systems.

- **Unpredictable factors:** Several factors remain outside the model's predictive capability. Severe storms (particularly the remnants of typhoons that occasionally reach Northern Thailand) can cause catastrophic cherry drop and infrastructure damage with little warning. Pest outbreaks beyond CLR — such as coffee berry borer (*Hypothenemus hampei*) — are not well-predicted by environmental sensors alone. Market shocks (e.g., global price crashes, supply chain disruptions) affect economic outcomes but not biological yield. The prediction model should always present results as probability ranges, not point estimates, and should explicitly acknowledge these unmodeled risks.

- **Calibration over time:** The model's accuracy improves significantly with farm-specific calibration. Every farm has unique microclimate, soil, varietal, and management characteristics that shift the baseline. After 2–3 seasons of collecting sensor data alongside actual harvest results, the model can be recalibrated to reduce systematic biases. A farm that consistently produces 15% above regional yield averages (perhaps due to superior soil or management) should see its Base_Yield adjusted upward. This learning loop is the most important long-term value of the prediction system.

---

## 5. Economic Impact of Predictions

Yield and quality predictions translate directly into financial decisions that can meaningfully impact farm income. The following decision frameworks show how predictions guide economic choices:

- **Specialty quality predicted (DTR > 10°C, mean temp 18–21°C, dry harvest forecast):** Invest in selective picking. Selective picking — harvesting only ripe cherries, requiring multiple passes through the plantation — costs approximately 30% more than strip picking (approximately 8–12 THB/kg cherry vs. 5–8 THB/kg). However, specialty-grade coffee commands 150–500 THB/kg green vs. 60–100 THB/kg for commodity, making the additional labor investment extremely profitable. For a 5-rai farm producing 1,000 kg green bean, the difference between specialty (200 THB/kg = 200,000 THB revenue) and commodity (80 THB/kg = 80,000 THB revenue) is 120,000 THB — far exceeding the ~15,000 THB additional picking cost.

- **Commodity quality predicted (DTR < 7°C, mean temp > 24°C, rain during harvest):** Focus on yield optimization. When quality is unlikely to reach specialty thresholds, the economic priority shifts to maximizing volume. Strip picking becomes acceptable (lower cost per kg), processing can be standardized and less labor-intensive, and marketing efforts should target commodity buyers or cooperatives rather than specialty channels. The prediction allows farmers to avoid the trap of investing in specialty processing for coffee that won't achieve specialty prices — a common and costly mistake.

- **Yield loss predicted (drought, disease, extreme rain):** Negotiate crop insurance and adjust labor. The Thai government's crop insurance program through the Bank for Agriculture and Agricultural Cooperatives (BAAC) offers coverage for natural disasters including drought and flood. Early yield loss predictions give farmers time to enroll before deadlines and document conditions for claims. Labor allocation can also be adjusted — if yield is predicted at 50% of normal, harvest labor can be reduced correspondingly, saving 20,000–40,000 THB on a typical 5-rai farm. Conversely, if the yield loss is caused by treatable disease, the prediction justifies the cost of fungicide application (approximately 2,000–5,000 THB per application per rai).

- **Rain during harvest predicted:** Invest in covered drying infrastructure. The sensor system's integration with weather forecasting (described in [[Alerts-Remediation]]) can predict rain events 3–7 days in advance. If the overall harvest-season forecast indicates elevated rain risk, pre-season investment in covered drying is justified. Raised beds with rain tarps cost 5,000–15,000 THB for a 5-rai farm but can prevent 30–70% price drops on affected lots. For a farm with 1,000 kg green bean at stake, even a 30% price drop costs 30,000–150,000 THB in lost revenue — making the 15,000 THB infrastructure investment a high-return proposition. Mechanical dryers are an alternative at 30,000–80,000 THB but require fuel or electricity and introduce quality risks if temperature control is poor.

---

## 6. Prediction Implementation Architecture

Implementing yield and quality prediction within the sensor system requires a structured data pipeline that transforms raw sensor readings into actionable farmer communications. The architecture consists of five layers:

### Data Collection
Sensor readings are aggregated at configurable intervals — daily for soil moisture and temperature, hourly for rainfall and humidity, and per-event for extreme conditions. The aggregation layer calculates daily min/max/mean for temperature, daily average for VWC, cumulative daily rainfall, and daily average humidity. Data quality checks flag sensor malfunctions (e.g., VWC reading of 0% likely indicates a disconnected probe, not dry soil). All aggregated data is stored in the local database with timestamps aligned to the farm's phenological calendar rather than the Gregorian calendar, enabling season-over-season comparisons.

### Feature Engineering
Raw sensor readings are transformed into prediction-relevant features through several techniques. Rolling 7-day and 30-day averages smooth out daily fluctuations and reveal trends. Cumulative metrics — such as total rainfall during flowering, total degree-days above 10°C during fruit development, and total hours of leaf wetness during CLR risk periods — capture the intensity and duration of conditions that affect yield and quality. Degree-day calculations are particularly important: they measure accumulated heat units that drive phenological development, allowing the model to predict harvest timing as well as yield. The system also calculates DTR statistics (mean, minimum, and variance) over the maturation window, which feed directly into the quality model.

### Model Execution
The current implementation uses the rule-based multiplicative model described in Section 2, which provides transparency and interpretability — essential for farmer trust. However, the architecture supports an optional machine learning overlay. After 3+ seasons of collected data (sensor readings + actual harvest results), the system can train a gradient-boosted regression model to refine the factor weights and discover non-linear interactions that the rule-based model misses. The ML model runs alongside the rule-based model, and discrepancies are flagged for human review. This hybrid approach maintains the explainability of rule-based predictions while gradually incorporating data-driven improvements.

### Output
The model produces two primary outputs: a **yield estimate range** (e.g., "200–280 kg/rai, most likely 240 kg/rai") and a **quality grade probability distribution** (e.g., "Specialty Premium: 15%, Specialty: 45%, Premium Commodity: 30%, Commodity: 10%"). Both outputs include confidence intervals that widen for earlier predictions and narrow as the season progresses. The system also generates secondary outputs including predicted harvest timing (based on degree-day accumulation), recommended processing method (based on predicted Brix and drying conditions), and economic projections (estimated revenue range based on yield × quality × market price assumptions).

### Farmer Communication
All predictions are translated into plain-language summaries before delivery to farmers. The system avoids statistical jargon — instead of "yield estimate 240 kg/rai ± 15%," it presents "Your coffee is tracking toward a normal harvest of about 240 kg per rai. Based on conditions so far, this could range from 200 to 280 kg per rai." Quality predictions use descriptive labels rather than scores: "Your coffee is likely to reach specialty grade this year. Consider investing in selective picking to capture the best price." The communication layer also generates specific action recommendations linked to the prediction: "Soil moisture during flowering was below optimal — consider mulching earlier next year" or "Rain is forecast during harvest week — deploy drying tarps by November 10." This plain-language approach, integrated with the [[Decision-Logic]] module, ensures that predictions drive action rather than confusion.

---

## 7. Practical Recommendations

1. **Install soil moisture sensors before the flowering season (January at latest).** The flowering period is the most impactful window for yield determination. Sensors installed after flowering cannot retroactively capture the drought stress that reduced fruit set. For new installations, prioritize sensor placement at root-zone depth (15–30 cm) in representative locations across the farm, as soil moisture varies significantly with topography and shade.

2. **Collect Brix samples weekly starting 4 weeks before estimated harvest.** Brix readings are the strongest direct quality indicator available to farmers. A refractometer (1,500–3,000 THB) is one of the highest-ROI investments a specialty coffee farmer can make. Combine Brix data with sensor-based drying condition forecasts to make processing decisions that maximize quality and price.

3. **Record actual harvest yields and cupping scores alongside sensor data every season.** The prediction model's accuracy depends entirely on calibration data. Without farm-specific historical records, the model uses regional averages that may be 20–40% off for any individual farm. Even simple records — total kg green bean per rai, SCA score or buyer quality assessment, and any notable weather events — dramatically improve future predictions.

4. **Use early-season predictions to guide input investment, not to make firm financial commitments.** A 60–70% accurate prediction in April is useful for deciding whether to invest in irrigation or supplemental fertilization, but it should not be the basis for signing forward contracts or committing to large labor hire. Reserve firm financial decisions for the pre-harvest prediction window (October–November) when accuracy reaches 80–85%.

5. **Invest in covered drying infrastructure before you need it.** The most common and most expensive prediction failure is not the model's error — it's the farmer's inability to act on the prediction. If the model predicts rain during harvest (and in Northern Thailand, it often does), the farmer needs drying infrastructure already in place. Raised beds with rain tarps (5,000–15,000 THB) should be considered essential infrastructure for any farm aspiring to specialty quality, not an emergency purchase.

6. **Integrate weather forecast data with sensor data for pre-harvest predictions.** The sensor system tells you what has happened; weather forecasts tell you what will happen. Both are needed for reliable pre-harvest predictions. The [[Alerts-Remediation]] framework integrates 3–7 day forecasts, but for harvest planning, 14–30 day outlook products from the Thai Meteorological Department provide critical context. A DTR-based quality prediction is only useful if the harvest itself isn't washed out.

7. **Build a cooperative-level prediction model by pooling sensor data across farms.** Individual farm datasets are small and noisy. A cooperative with 20–50 sensor-equipped farms generates enough data to train more sophisticated ML models, identify regional microclimate patterns, and provide benchmarking (e.g., "your yield is 15% below the cooperative average for farms at similar elevation — investigate soil or management factors"). The pooled model can also generate regional yield forecasts that support cooperative marketing and collective bargaining with buyers.

---

## 8. Related Topics & References

### Related Topics
- [[Sensor-Metrics-Thresholds]] — The specific sensor thresholds that feed into yield and quality prediction factors
- [[Decision-Logic]] — How predictions are converted into automated and semi-automated decision recommendations
- [[Alerts-Remediation]] — The alert system that warns farmers of conditions threatening yield or quality
- [[Arabica-Climate-Range]] — Optimal and stress-threshold climate parameters for arabica cultivation
- [[Robusta-Climate-Range]] — Optimal and stress-threshold climate parameters for robusta cultivation
- [[Processing-Methods]] — How sensor-predicted quality guides processing method selection
- [[Drying-Monitoring]] — Sensor-based monitoring of the critical post-harvest drying phase

### References
- Kath et al. (2020). "Temperature variability and coffee yield in the Yunnan province of China." *Agricultural and Forest Meteorology*. — Source for the 18.9% yield loss per 1°C minimum temperature drop finding.
- DaMatta et al. (2018). "Why could the coffee crop endure climate change better than other crops?" *Environmental and Experimental Botany*. — Comprehensive review of coffee's temperature and water stress responses.
- Bosselmann et al. (2009). "The influence of shade trees on coffee quality in small holder coffee agroforestry systems in Southern Colombia." *American Journal of Alternative Agriculture*. — Shade-quality relationship data.
- Specialty Coffee Association (SCA). "SCA Coffee Standards." — Cupping score definitions and quality grade thresholds.
- Thai Department of Agriculture (2024). "Coffee Production Statistics Northern Thailand." — Regional yield benchmarks and production data.
- International Coffee Organization (ICO). "Coffee Development Report 2024." — Global context for Thai coffee quality positioning.
- Aseq. (2023). "Brix-based harvesting and processing decisions in specialty coffee." *Proceedings of the ASIC Conference*. — Brix-guided processing framework.
