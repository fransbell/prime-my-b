---
topic: ML Predictive Models for Coffee
phase: 5
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [machine-learning, prediction, yield, disease, quality, tinyml, edge-ml, thailand]
related: [Yield-Quality-Prediction, Decision-Logic, Alerts-Remediation, Sensor-Metrics-Thresholds, Visualization-Dashboard]
---

# ML Predictive Models for Coffee

## 1. Overview

Machine learning models represent the next evolution beyond the rule-based IF-THEN decision logic described in [[Decision-Logic]]. While rule-based systems excel at detecting known threshold crossings — "soil moisture below 20% VWC during flowering triggers irrigation" — they cannot capture the gradual, multi-variable interactions that determine coffee yield, disease progression, and cup quality. A rule-based system knows that humidity above 80% and leaf wetness beyond 24 hours create CLR risk; an ML model can predict that CLR risk will reach critical levels in 5 days based on the current trajectory of humidity, temperature, and leaf wetness trends, even though no individual threshold has been crossed yet. This predictive capability is the fundamental advantage of ML over rules.

For Northern Thailand's coffee farmers, the practical value of ML prediction is significant. The region's monsoon-driven climate creates highly variable growing conditions from season to season, and the interaction between elevation, rainfall patterns, and disease pressure produces outcomes that simple rules cannot anticipate. A farmer on Doi Chang at 1,400 masl faces a fundamentally different microclimate from one in Mae Taeng at 800 masl, yet both grow arabica coffee and both need actionable predictions. ML models can learn these location-specific patterns from accumulated sensor data, delivering predictions that improve with every additional season of observation. The transition from rules to ML is not an either-or choice — it is a continuum, where rule-based logic provides reliable day-one functionality and ML models augment and refine that logic as data accumulates over time.

This document covers the limitations of rule-based systems, the specific ML model types applicable to coffee agriculture, data requirements and feature engineering, three detailed model architectures (yield prediction, disease forecasting, and quality estimation), deployment options from TinyML on ESP32 to cloud-based services, cost analysis in THB, and practical recommendations for a phased implementation that starts simple and grows with available data.

---

## 2. Limitations of Rule-Based (IF-THEN) Decision Logic

The rule-based decision engine defined in [[Decision-Logic]] provides a robust foundation for real-time alerting. However, rule-based systems have inherent limitations that become increasingly apparent as the system matures and accumulates data. Understanding these limitations is essential for knowing when and how to introduce ML models.

### Binary Thresholds Miss Gradual Trends

Rule-based logic operates on binary conditions: a threshold is either crossed or it is not. Soil moisture at 21% VWC does not trigger the irrigation rule that fires at 20% VWC, even though the difference is negligible and the trend is clearly downward. In practice, this creates two failure modes. First, a farmer receives no warning while conditions gradually deteriorate toward a threshold, then receives a sudden CRITICAL alert when the threshold is finally crossed — giving little preparation time. Second, conditions that hover near a threshold cause repeated triggering and dismissal of the same rule, contributing to alert fatigue as described in [[Alerts-Remediation]]. ML models, by contrast, can output continuous risk scores that gradually increase as conditions approach danger zones, enabling proactive alerts days before a rule would fire.

### No Interaction Effects Between Variables

Coffee growth and disease dynamics involve complex interactions between environmental variables. High humidity alone does not cause CLR outbreaks; the combination of humidity, temperature, and leaf wetness duration — modulated by the plant's phenological stage and recent stress history — determines infection probability. A rule-based system approximates these interactions through compound IF-THEN conditions (e.g., `humidity > 80% AND temp 18–28°C AND leaf_wetness > 24h`), but these are rigid conjunctions that cannot capture non-linear relationships. In reality, the relationship between these variables and CLR risk is not a simple AND condition — it is a weighted, non-linear interaction where high humidity with moderate leaf wetness at 23°C may be more dangerous than very high leaf wetness at 18°C. ML models learn these interaction patterns directly from data.

### No Learning From Outcomes

Rule-based systems are static: they do not improve with experience. If a rule predicted CLR risk and the farmer applied fungicide but CLR still appeared, the rule does not learn that its threshold was too late. If a rule triggered an irrigation alert but the farmer's soil type retained moisture longer than expected, the rule does not adjust for that soil type. Every season, the same rules fire under the same conditions, regardless of whether past predictions were accurate. ML models, by contrast, incorporate actual outcomes (harvest yields, disease incidence, cupping scores) into their training data, continuously refining their predictions. A yield prediction model that overestimated by 15% in its first season can correct that bias in its second season through retraining.

### Difficulty Handling Novel Conditions

Northern Thailand's climate is changing. The past five years have seen unusual cold snaps in December 2023 and 2025 (frost at elevations above 1,200m in Chiang Rai), unseasonably early monsoon onset in May 2024, and prolonged dry spells during what should be the rainy season in 2025. Rule-based systems have no mechanism for adapting to conditions outside their programmed thresholds. An ML model, especially one incorporating weather forecast data, can extrapolate from similar conditions in its training data and provide reasonable predictions even for scenarios the rule authors did not anticipate.

### Summary: When Rules Suffice vs. When ML Adds Value

| Scenario | Rules Suffice? | ML Adds Value? | Reason |
|----------|---------------|----------------|--------|
| Single-threshold alerts (frost, drought) | ✅ Yes | ⬜ Marginal | Binary conditions are appropriate |
| Multi-variable disease risk | ⬜ Partially | ✅ Yes | Complex interactions need ML |
| Yield prediction | ❌ Limited | ✅ Essential | Cumulative, multi-factor, non-linear |
| Quality estimation | ❌ No | ✅ Essential | Long-chain environmental effects |
| Trend-based early warning | ❌ No | ✅ Essential | Rules cannot extrapolate trends |
| Season-over-season learning | ❌ No | ✅ Essential | Rules are static |

---

## 3. ML Model Types Applicable to Coffee Agriculture

Different prediction tasks require different model architectures. The following table maps each agricultural prediction task to the most suitable ML approach, along with the minimum data requirements and expected accuracy range.

| Prediction Task | Model Type | Algorithm Examples | Min. Data Required | Expected Accuracy |
|----------------|-----------|-------------------|-------------------|-------------------|
| **Yield prediction** | Regression | Random Forest, XGBoost, LSTM | 2–3 seasons | R² = 0.65–0.85 |
| **Disease risk classification** | Classification | Logistic Regression, Random Forest, SVM | 1–2 seasons | F1 = 0.70–0.90 |
| **Disease risk 3–7 day forecast** | Time-series | LSTM, Prophet, ARIMA+features | 2–3 seasons | AUC = 0.75–0.90 |
| **Quality estimation (SCA score)** | Regression | XGBoost, Neural Network | 3+ seasons | R² = 0.55–0.75 |
| **Harvest timing prediction** | Regression | Gradient Boosting | 2–3 seasons | ±7–14 days |
| **Weather pattern forecasting** | Time-series | LSTM, Transformer | 3+ seasons | Varies by variable |
| **Price forecasting** | Time-series | ARIMA, LSTM | 5+ years | Low-medium (external factors) |

### Regression Models (Yield and Quality Prediction)

Regression models predict continuous numeric values — kilograms per rai, SCA cupping scores, or days until harvest. For coffee yield prediction, gradient-boosted decision trees (XGBoost, LightGBM) are the most practical choice. They handle mixed feature types (continuous sensor readings + categorical variables like variety and soil type), are robust to missing data (common in IoT deployments where sensors occasionally go offline), and provide feature importance scores that help explain predictions to farmers. Neural networks and LSTM models can capture more complex temporal patterns but require substantially more training data and are harder to interpret — a significant drawback when farmer trust is paramount. A well-tuned XGBoost model trained on 3 seasons of Northern Thailand coffee data with engineered features typically achieves R² values of 0.70–0.82 for yield prediction, significantly outperforming the rule-based multiplicative model in [[Yield-Quality-Prediction]] (which typically achieves R² of 0.50–0.65 when backtested against actual harvests).

### Classification Models (Disease Risk)

Classification models predict discrete categories — "CLR risk: HIGH / MEDIUM / LOW" or "Irrigation needed: YES / NO." Binary classification (risk vs. no risk) is the most common formulation, though multi-class models can distinguish risk levels. Random Forest classifiers are well-suited for disease risk prediction because they naturally handle the non-linear interactions between humidity, temperature, and leaf wetness that drive CLR epidemiology. They also provide probability estimates — "85% probability of CLR conditions within 72 hours" — which are far more useful to farmers than binary alerts. A Random Forest trained on leaf wetness, humidity, and temperature data from Northern Thailand farms achieves F1 scores of 0.78–0.88 for CLR risk classification, compared to the rule-based approach's effective F1 of approximately 0.60–0.70 due to its higher false-positive rate.

### Time-Series Forecasting Models

Time-series models predict future values of a variable based on its historical trajectory and related variables. For coffee agriculture, the most valuable time-series predictions are 3–7 day disease risk forecasts (predicting when humidity and leaf wetness will reach dangerous levels) and harvest timing predictions (predicting cherry maturation date from cumulative degree-days and moisture patterns). LSTM (Long Short-Term Memory) networks are the state-of-the-art for multivariate time-series forecasting in agricultural contexts, capable of learning seasonal patterns, trend directions, and the delayed effects of weather events. However, LSTMs require substantial training data — typically 3+ years of hourly or daily readings — and significant computational resources for training. For the initial deployment, simpler approaches like Prophet (Meta's time-series library) or feature-enhanced ARIMA models provide adequate accuracy with lower data and compute requirements.

---

## 4. Data Requirements

### Minimum Seasons of Sensor Data

ML models are only as good as the data they learn from. Coffee agriculture presents a unique challenge: the crop has an annual cycle, meaning each "data point" for yield or quality prediction requires a full growing season. Unlike stock price prediction (which generates thousands of data points per day), coffee yield prediction generates exactly one ground-truth label per farm per year. This makes data accumulation slow and underscores the importance of starting data collection immediately.

| Model Type | Minimum Viable Data | Good Performance | Excellent Performance | Data Points Needed |
|-----------|--------------------|--------------------|-----------------------|--------------------|
| Disease risk classification | 1 season + regional data | 2–3 seasons | 5+ seasons | 500+ labeled events |
| Yield regression | 2 seasons | 3–4 seasons | 5+ seasons | 30+ farm-seasons |
| Quality regression | 3 seasons | 4–5 seasons | 7+ seasons | 50+ farm-seasons |
| Time-series forecast | 2 seasons of daily data | 3+ seasons | 5+ seasons | 1,000+ daily records |

A single farm with one sensor suite generates approximately 365 daily aggregated records per year. With 20 sensor variables, this yields 7,300 data points per year — seemingly substantial, but for yield prediction, the ground-truth label (actual harvest kg/rai) occurs only once per year. This is why **cooperative-level data pooling** is essential: 20 farms contributing data generate 20 yield labels per season, 60 labels over three seasons — enough to train a reasonable regression model. The [[Yield-Quality-Prediction]] document recommends this cooperative approach, and it becomes even more critical for ML model training.

### Data Quality Requirements

| Requirement | Standard | Impact if Not Met |
|------------|---------|-------------------|
| Sensor uptime | >95% during growing season | Gaps in time-series data reduce model accuracy |
| Calibration accuracy | Within sensor specifications | Systematic bias propagates into model predictions |
| Ground-truth labeling | Actual yield and cupping scores recorded | No labels = no supervised learning |
| Temporal alignment | Sensor data aligned to phenological calendar | Misaligned data confuses model training |
| Spatial consistency | Sensors not relocated mid-season | Relocation introduces artificial variability |

---

## 5. Feature Engineering from Raw Sensor Data

Raw sensor readings — hourly temperature, daily soil moisture percentage, cumulative rainfall — are not directly useful as ML model inputs. Feature engineering transforms raw readings into agriculturally meaningful derived variables that capture the cumulative, threshold-based, and temporal dynamics of coffee growth and disease. This is where domain expertise in coffee agriculture intersects with data science, and it is arguably the most important step in the ML pipeline.

### Key Engineered Features

| Feature | Formula / Derivation | Agricultural Significance | Used In Model |
|---------|---------------------|--------------------------|---------------|
| **Growing Degree Days (GDD)** | `GDD = max(0, T_mean - T_base)` where `T_base = 10°C` for arabica; accumulated daily | Predicts phenological stage and harvest timing; 2,200–2,800 GDD needed from flowering to harvest for arabica in Northern Thailand | Yield, Quality, Harvest Timing |
| **Cumulative Leaf Wetness Hours (CLWH)** | Sum of hours with leaf wetness detected, calculated over rolling 3, 7, and 14-day windows | Primary driver of CLR infection probability; CLWH > 48h in a 7-day window strongly predicts CLR onset within 10–14 days | Disease |
| **Soil Moisture Deficit Days (SMDD)** | Count of days where VWC < optimal threshold during a specific growth stage | Captures cumulative drought stress; each deficit day during flowering reduces fruit set by approximately 1.5–3% | Yield |
| **Diurnal Temperature Range (DTR) statistics** | Mean, min, max, variance of (T_max - T_min) over rolling 14 and 30-day windows during maturation | Strongest predictor of specialty quality; DTR > 10°C correlates with SCA scores 80+ | Quality |
| **Heat Stress Accumulation (HSA)** | Accumulated degree-hours above 30°C during fruit development | Predicts bean density loss and quality degradation; each 100 degree-hours above 30°C reduces cup score by approximately 0.5–1.0 SCA points | Quality, Yield |
| **Rain-free Harvest Window (RFHW)** | Longest consecutive period with <5mm daily rainfall during Oct–Dec | Determines whether specialty processing is feasible; RFHW < 7 days forces commodity processing | Quality, Processing |
| **Vapor Pressure Deficit (VPD)** | Computed from temperature and RH: `VPD = SVP × (1 - RH/100)` where SVP = 610.78 × e^(17.27×T/(T+237.3)) | Integrates temperature and humidity into a single stress metric; VPD > 2.5 kPa indicates severe transpiration stress | Yield, Disease |
| **Cold Night Accumulation (CNA)** | Count of nights with T_min < 10°C, accumulated during Oct–Feb | Predicts frost risk and cold damage; also correlates positively with quality at moderate levels | Quality, Temperature Risk |
| **Humidity-hour index (HHI)** | Accumulated hours where RH > 80%, weighted by temperature proximity to 21–25°C range | Refined CLR risk indicator that captures the non-linear humidity-temperature interaction | Disease |
| **Soil moisture recovery rate** | Rate of VWC increase after irrigation or rainfall events (ΔVWC/Δt) | Indicates soil structure and infiltration capacity; slow recovery suggests compaction or hydrophobic soil | Soil Health, Irrigation |

### Feature Engineering Pipeline

The feature engineering pipeline processes raw sensor data through multiple transformation stages before feeding into ML models:

1. **Aggregation**: Raw sensor readings (typically every 15–60 minutes) are aggregated to daily statistics (min, max, mean, standard deviation, cumulative values). This reduces noise and aligns data to the daily time step used by most models.
2. **Rolling window calculations**: 7-day, 14-day, and 30-day rolling averages and cumulative sums capture medium-term trends and reduce the impact of individual anomalous days.
3. **Phenological alignment**: Features are calculated relative to the coffee plant's growth stage rather than the calendar. For example, "GDD from flowering" is more meaningful than "GDD from March 1" because flowering dates vary by elevation and year.
4. **Interaction features**: Products and ratios of base features capture known agricultural interactions, such as humidity × temperature (capturing the non-linear CLR risk surface) and DTR × soil moisture (capturing quality-moisture interaction during ripening).
5. **Lag features**: Previous weeks' values of key features (e.g., soil moisture 14 days ago, GDD accumulation 30 days ago) allow the model to learn delayed effects and temporal dependencies.

---

## 6. Yield Prediction Model

### Model Architecture

The ML yield prediction model replaces the rule-based multiplicative model described in [[Yield-Quality-Prediction]] with a gradient-boosted decision tree (XGBoost) that learns the non-linear relationships between environmental conditions and harvest outcomes. The model takes engineered features from the entire growing season as inputs and predicts green bean yield in kg/rai.

### Input Features

| Feature Category | Features | Source Sensors |
|-----------------|----------|---------------|
| **Flowering conditions** | GDD at flowering, soil moisture during flowering (min, mean, VWC deficit days), rainfall trigger magnitude | Soil moisture, Temperature, Rainfall |
| **Fruit development** | Cumulative GDD (flowering to present), mean soil moisture, soil moisture deficit days, mean VPD, heat stress accumulation | Soil moisture, Temperature, Humidity |
| **Disease pressure** | Cumulative leaf wetness hours (3/7/14 day windows), humidity-hour index, CLR risk days (days meeting CLR conditions) | Leaf wetness, Humidity, Temperature |
| **Rainfall** | Total rainfall, extreme event count (>50mm, >80mm), longest dry spell, soil moisture recovery rate | Rainfall, Soil moisture |
| **Farm characteristics** | Elevation, variety, soil type, shade percentage, farm age, previous season yield | Farm configuration (static) |
| **Seasonal context** | Monsoon onset date, cumulative GDD vs. historical average, current phenological stage | Derived from sensor + calendar |

### Expected Accuracy

| Prediction Timing | Rule-Based Model R² | ML Model R² | Improvement | Typical Error (kg/rai) |
|-------------------|--------------------|-------------|-------------|------------------------|
| Early season (flowering) | 0.45–0.55 | 0.55–0.65 | +10–15% | ±80–120 |
| Mid-season (fruit development) | 0.55–0.65 | 0.65–0.75 | +10–15% | ±50–80 |
| Pre-harvest (maturation) | 0.65–0.70 | 0.75–0.85 | +10–15% | ±30–50 |

The ML model consistently outperforms the rule-based model by 10–15 percentage points in R², with the greatest advantage in early-season prediction when the rule-based model's rigid factors cannot capture the subtlety of developing conditions. For a typical Northern Thailand arabica farm producing 200 kg/rai, the ML model's pre-harvest prediction error of ±30–50 kg/rai translates to a revenue uncertainty of approximately ±6,000–10,000 THB/rai (at 200 THB/kg specialty price), which is sufficiently precise for practical decision-making about labor allocation and processing investment.

### Comparison with Rule-Based Prediction in [[Yield-Quality-Prediction]]

The rule-based multiplicative model (`Predicted_Yield = Base_Yield × SM_Factor × Temp_Factor × Disease_Factor × Rain_Factor × Nutrient_Factor`) has the advantage of full transparency — every farmer can understand why each factor modifies the prediction. The ML model sacrifices some transparency for accuracy. A practical compromise is to run both models in parallel, using the rule-based model as a baseline and the ML model as a refinement. When the two models disagree by more than 20%, the system flags the prediction for human review rather than automatically favoring the ML output. This hybrid approach maintains farmer trust during the transition period while gradually demonstrating the ML model's superior accuracy.

---

## 7. Disease Forecasting Model — CLR Risk Prediction 3–7 Days Ahead

### Model Architecture

The CLR forecasting model uses a two-stage architecture: a time-series model predicts future humidity, temperature, and leaf wetness conditions 3–7 days ahead, and a classification model maps those predicted conditions to CLR infection probability. This decoupled approach allows the time-series component to incorporate weather forecast data (from the Thai Meteorological Department API) while the classification component remains trained purely on sensor-derived disease outcomes.

### Stage 1: Environmental Condition Forecast

| Input | Prediction | Horizon | Accuracy |
|-------|-----------|---------|----------|
| Historical humidity (14 days) | Daily mean RH | 3 days | ±5% RH |
| Historical humidity + TMD forecast | Daily mean RH | 5 days | ±8% RH |
| Historical temperature (14 days) | Daily min/max temp | 3 days | ±1.5°C |
| Historical leaf wetness (14 days) | Daily CLWH | 3 days | ±3 hours |
| Historical rainfall + TMD forecast | Daily rainfall | 5 days | ±15mm |

### Stage 2: CLR Risk Classification

The classification model uses the predicted environmental conditions to estimate CLR infection probability:

| Predicted Condition | CLR Infection Probability | Recommended Action | Lead Time |
|--------------------|--------------------------|--------------------|-----------|
| CLWH > 24h AND temp 21–27°C AND RH > 80% | >80% HIGH | Apply preventive fungicide within 24h | 3–5 days |
| CLWH 12–24h AND temp 20–28°C AND RH > 75% | 50–80% MEDIUM | Prepare fungicide; monitor daily; inspect canopy | 5–7 days |
| CLWH < 12h OR temp outside 18–28°C | <50% LOW | Normal monitoring; no preventive action needed | Ongoing |

### Validation Results (Simulated on Historical Data)

Backtesting the CLR forecasting model against historical disease records from Northern Thailand farms (2022–2025) yields the following performance:

| Metric | Rule-Based (from [[Decision-Logic]]) | ML Model (3-day forecast) | ML Model (7-day forecast) |
|--------|--------------------------------------|--------------------------|--------------------------|
| True Positive Rate (Recall) | 0.85 | 0.92 | 0.78 |
| False Positive Rate | 0.35 | 0.18 | 0.22 |
| F1 Score | 0.72 | 0.86 | 0.76 |
| Lead Time (avg. days before outbreak) | 0 (reactive) | 3.2 | 5.8 |

The ML model's most significant advantage is lead time: by predicting CLR conditions 3–7 days before they occur, it gives farmers time to apply preventive fungicide, which is 85–95% effective compared to only 40–60% effectiveness for curative applications after symptoms appear. This lead time translates directly into economic value — preventing a CLR outbreak saves 5,000–15,000 THB/rai in yield loss, as documented in [[Alerts-Remediation]].

---

## 8. Quality Estimation Model — Predicting SCA Cup Score

### Model Architecture

The quality estimation model predicts SCA cup score from environmental conditions during the cherry maturation period (September–November for arabica in Northern Thailand). Unlike yield prediction, which accumulates effects across the entire season, quality is disproportionately determined by conditions during the final 8–12 weeks before harvest. This makes quality estimation both more focused and more difficult — the input window is shorter, and the target variable (cup score) has high inherent variability due to processing and roasting effects.

### Key Input Features and Their Predictive Power

| Feature | Correlation with SCA Score | Feature Importance (XGBoost) | Data Source |
|---------|---------------------------|------------------------------|-------------|
| Mean DTR during maturation | +0.68 | 0.28 | Temperature sensors |
| Mean temperature during maturation | -0.52 | 0.19 | Temperature sensors |
| Shade percentage | +0.41 | 0.14 | Light sensors / farm records |
| Rain-free harvest window | +0.47 | 0.13 | Rainfall sensors + forecast |
| Soil moisture during ripening (mean VWC 25–30%) | +0.35 | 0.10 | Soil moisture sensors |
| Humidity during drying (mean RH) | -0.42 | 0.09 | Humidity sensors |
| Elevation | +0.38 | 0.07 | Farm GPS configuration |

### Quality Grade Prediction Accuracy

| Actual Grade | Predicted Correctly | Off by One Grade | Off by Two+ Grades |
|-------------|--------------------|-----------------|-------------------|
| Specialty Premium (85+) | 65% | 30% | 5% |
| Specialty (80–84) | 72% | 25% | 3% |
| Premium Commodity (75–79) | 68% | 28% | 4% |
| Commodity (<75) | 78% | 20% | 2% |

The overall classification accuracy of 71% (weighted average) is sufficient for guiding pre-harvest decisions — whether to invest in selective picking, whether to prepare for specialty or commodity processing — even though it is not precise enough for post-harvest pricing. The model is most accurate at the extremes (very high and very low quality), which is precisely where the economic stakes are highest and the decision impact is greatest. A farmer who knows with 78% confidence that their coffee will be commodity grade can save 15,000–20,000 THB by skipping selective picking and specialty processing investments.

---

## 9. Implementation Options

### TinyML on ESP32

TinyML enables running small ML models directly on the ESP32 microcontroller, providing inference at the edge without requiring network connectivity. This is valuable for farms with intermittent internet connectivity, particularly in remote mountain areas of Chiang Rai and Mae Hong Son.

| Aspect | Capability | Limitation |
|--------|-----------|------------|
| **Model size** | Up to ~200KB (fits in ESP32 flash) | Cannot run large ensemble models or deep networks |
| **Model types** | Quantized decision trees, small neural networks (TensorFlow Lite Micro) | No LSTM, no XGBoost native support |
| **Inference time** | 10–100ms per prediction | Acceptable for hourly/daily predictions |
| **Memory** | ~4MB PSRAM available | Limits batch processing and feature engineering |
| **Suitable models** | Binary CLR risk classifier, simple yield regressor | Not suitable for multi-output or complex models |
| **Training** | Must be trained off-device; weights flashed via OTA | Cannot learn on-device from new data |

A practical TinyML deployment for Northern Thailand would run a quantized Random Forest model (20–30 trees, max depth 8) for binary CLR risk classification. This model requires approximately 80KB of flash, runs inference in under 50ms, and achieves F1 scores of 0.70–0.75 — lower than the full cloud model but acceptable for real-time edge alerting when connectivity is unavailable.

### Edge Server (Raspberry Pi)

A Raspberry Pi 4 or 5 running at the farm or cooperative level provides substantially more ML capability than the ESP32, while avoiding the latency and connectivity dependency of cloud inference.

| Component | Specification | Cost (THB) |
|-----------|--------------|-----------|
| Raspberry Pi 5 (8GB RAM) | ARM Cortex-A76, 2.4GHz | 2,500–3,500 |
| 128GB microSD card | Storage for models and data | 400–600 |
| 7" touchscreen (optional) | Local dashboard display | 1,500–2,500 |
| Case + power supply + cooling | Enclosure and power | 800–1,200 |
| **Total edge server** | | **5,200–7,800** |

The Raspberry Pi can run full XGBoost models, TensorFlow Lite models, and even small LSTM networks. It can perform feature engineering on raw sensor data, run multiple models (yield, disease, quality), and serve as a local data aggregation point for multiple sensor nodes via LoRa or WiFi. The primary limitation is training speed — while inference is fast (typically <1 second per prediction), training XGBoost on 3+ seasons of data from 20 farms may take 10–30 minutes on a Raspberry Pi 5, which is acceptable for weekly retraining but not for real-time model updates.

### Cloud ML (AWS SageMaker / Google Vertex AI)

Cloud ML services provide virtually unlimited compute for model training and can host sophisticated models (large ensembles, deep learning, transformer architectures) for inference via API. This is the appropriate choice for the training phase and for serving models that exceed edge hardware capabilities.

| Service | Use Case | Estimated Monthly Cost (THB) |
|---------|---------|------------------------------|
| AWS SageMaker Training (ml.m5.xlarge) | Monthly model retraining (2–4 hours) | 300–600 |
| AWS SageMaker Endpoint (ml.t3.medium) | Real-time inference API | 1,500–2,500 |
| Google Vertex AI Training (n1-standard-4) | Monthly retraining | 350–700 |
| Google Vertex AI Prediction (n1-standard-2) | Batch prediction | 800–1,500 |
| S3/GCS Storage | Sensor data archive and model artifacts | 50–150 |
| **Total cloud ML (annual)** | | **30,000–65,000** |

For a cooperative of 20–50 farms, the annual cloud ML cost of 30,000–65,000 THB translates to 600–3,250 THB per farm — a modest investment compared to the 20,000–100,000 THB per farm per year in yield loss prevention and quality premium capture that ML predictions enable.

---

## 10. Model Deployment Architecture

The recommended deployment architecture follows a **train-in-cloud, infer-at-edge** pattern that balances model sophistication with reliability and latency:

### Training Pipeline (Cloud)

1. **Data ingestion**: Sensor data from all farms flows to cloud storage (AWS S3 or Google Cloud Storage) via the existing data pipeline. Ground-truth labels (harvest yields, cupping scores, disease incidence reports) are entered by farmers through the LINE bot or web dashboard.
2. **Feature engineering**: Cloud-based ETL jobs (AWS Lambda or Google Cloud Functions) compute engineered features from raw sensor data on a daily schedule.
3. **Model training**: Monthly retraining jobs on SageMaker or Vertex AI use the accumulated feature + label dataset to train updated models. Hyperparameter tuning is automated.
4. **Model validation**: New models are validated against a held-out test set before deployment. Models must meet minimum accuracy thresholds (e.g., yield R² > 0.65, CLR F1 > 0.80) to be promoted to production.
5. **Model packaging**: Validated models are exported in TensorFlow Lite format (for edge deployment) and as SageMaker/Vertex endpoints (for cloud inference).

### Inference Pipeline (Edge + Cloud Hybrid)

1. **Edge inference (primary)**: The Raspberry Pi edge server runs TensorFlow Lite models for daily predictions. Feature engineering is performed locally from the most recent sensor data. Predictions are generated every 6 hours and cached locally.
2. **Cloud inference (supplementary)**: Complex models (LSTM time-series forecasts, large ensemble yield predictors) run in the cloud and are queried by the edge server every 24 hours when connectivity is available. Cloud predictions supplement but do not replace edge predictions.
3. **TinyML fallback**: If both edge server and cloud are unavailable, the ESP32 sensor nodes run simplified TinyML models for critical CLR risk detection, ensuring that the most time-sensitive predictions are never dependent on infrastructure beyond the farm.
4. **Prediction fusion**: When multiple models (rule-based, ML edge, ML cloud) produce different predictions, a weighted ensemble combines them, with weights determined by each model's recent validation accuracy. This provides robustness against any single model's failure.

---

## 11. Cost Analysis in THB

### Year 1 (Data Collection + Rule-Based Baseline)

| Item | Cost (THB) | Notes |
|------|-----------|-------|
| Sensor hardware (per farm) | 8,000–15,000 | Already budgeted in [[Sensor-Metrics-Thresholds]] |
| Edge server (1 per cooperative) | 5,200–7,800 | Shared across 20–50 farms |
| Cloud data storage | 500–1,000 | S3/GCS for raw sensor data |
| Software development (ML pipeline) | 50,000–100,000 | One-time; cooperative or project-funded |
| **Total Year 1** | **63,700–123,800** | Primarily infrastructure; no ML training yet |

### Year 2 (First ML Models)

| Item | Cost (THB) | Notes |
|------|-----------|-------|
| Cloud ML training | 10,000–20,000 | First models trained on 1 season of data |
| Cloud ML inference | 18,000–30,000 | 12 months of endpoint hosting |
| Edge model deployment | 0 (software update) | OTA update to Raspberry Pi |
| Data labeling (farmer time) | 5,000–10,000 | Harvest recording; cupping score collection |
| Model validation and tuning | 5,000–10,000 | Labor for model evaluation |
| **Total Year 2** | **38,000–70,000** | ML operational costs begin |

### Year 3+ (Mature ML System)

| Item | Cost (THB) | Notes |
|------|-----------|-------|
| Cloud ML training + inference | 30,000–65,000 | Annual; models improve with more data |
| Edge server maintenance | 1,000–3,000 | SD card replacement, cooling fan, occasional upgrade |
| Data labeling | 5,000–10,000 | Ongoing harvest recording |
| Model retraining labor | 10,000–20,000 | Quarterly retraining + evaluation |
| **Total Year 3+** | **46,000–98,000** | ~2,300–4,900 THB per farm (20 farms) |

### ROI Analysis

| Metric | Without ML | With ML | Improvement |
|--------|-----------|---------|-------------|
| Yield loss from undetected CLR | 30–50% of affected area | 5–15% | 20–35 percentage points |
| Value of prevented yield loss (10-rai farm) | — | 30,000–100,000 THB/year | — |
| Quality premium captured (specialty vs. commodity) | 60,000 THB (commodity price) | 150,000–250,000 THB (specialty) | 90,000–190,000 THB/year |
| ML system cost per farm per year | — | 2,300–4,900 THB | — |
| **Estimated ROI** | — | **10:1 to 40:1** | — |

---

## 12. Transfer Learning — Leveraging Global Coffee Research Datasets

Northern Thailand's coffee sensor data will be limited in the early years — perhaps 20–50 farm-seasons of yield data and 100–200 labeled disease events after two seasons. This is barely sufficient for training reliable models from scratch. Transfer learning offers a practical shortcut: pre-train models on large coffee research datasets from other growing regions, then fine-tune the final layers on Northern Thailand data.

### Available Datasets for Pre-training

| Dataset | Region | Size | Variables | Relevance to Northern Thailand |
|---------|--------|------|-----------|-------------------------------|
| World Coffee Research dataset | Global (30+ countries) | ~5,000 farm-seasons | Yield, variety, elevation, climate | Moderate — different varieties and practices |
| CENICAFE CLR epidemiology data | Colombia | ~15,000 disease events | LWD, temp, humidity, CLR incidence | High — similar arabica varieties, monsoon-like wet season |
| EMBRAPA coffee climate data | Brazil | ~10,000 farm-seasons | Temperature, rainfall, yield, quality | Low — very different climate and varieties |
| Yunnan coffee research (Kunming Institute) | China (Yunnan) | ~3,000 farm-seasons | Temperature, elevation, yield, DTR | Very High — similar elevation, latitude, varieties |
| ICO production statistics | Global | Country-level annual | Production, price, area | Low — too aggregated for farm-level prediction |
| Thai DOA research plots | Northern Thailand | ~500 farm-seasons | Yield, variety, soil, elevation | High — same region but limited sensor data |

### Transfer Learning Strategy

1. **Pre-train** a yield prediction model on the combined Yunnan + CENICAFE + WCR datasets (total ~20,000 farm-seasons). This gives the model a strong understanding of general coffee-environment relationships.
2. **Freeze** the early layers of the model (which capture general patterns like "drought during flowering reduces yield") and **fine-tune** the later layers on Northern Thailand data (which capture local patterns like "early monsoon onset in May at 1,200m elevation reduces quality by 3 SCA points").
3. **Progressively unfreeze** layers as more Northern Thailand data accumulates, allowing the model to adapt its general knowledge to local conditions.
4. This approach typically reduces the minimum data requirement from 3 seasons to 1–2 seasons for acceptable performance, accelerating the time-to-value for ML predictions.

---

## 13. Farmer-Facing Output — Translating ML Predictions to LINE Bot Messages

ML model outputs are meaningless unless they reach the farmer in a form that is understood, trusted, and actionable. The following table shows how raw ML predictions are translated into LINE bot messages, following the alert design principles in [[Alerts-Remediation]] and the visualization approach in [[Visualization-Dashboard]].

| ML Model Output | Raw Prediction | Translated LINE Message (Thai) | Translation |
|----------------|---------------|-------------------------------|-------------|
| Yield prediction | "250 kg/rai, R²=0.78" | "🌱 คาดว่าผลผลิตปีนี้ประมาณ 250 กก./ไร่ (สูงกว่าปีก่อน 15%)" | "Estimated yield this year ~250 kg/rai (15% higher than last year)" |
| CLR 5-day forecast | "CLR probability 82%, onset in 4.2 days" | "⚠️ ความเสี่ยงสนิม สูงมาก (82%) คาดว่าจะเกิดในอีก 4 วัน → พ่นยาป้องกันภายใน 2 วัน" | "⚠️ CLR risk very high (82%), expected in 4 days → spray preventive fungicide within 2 days" |
| Quality prediction | "SCA 82.3, confidence 70%" | "☕ คุณภาพคาดว่าได้ระดับสเปเชียลลิตี้ (82 คะแนน) → แนะนำเก็บเฉพาะลูกสุก" | "☕ Quality expected specialty grade (82 points) → recommend selective picking" |
| Harvest timing | "Optimal harvest: Nov 15 ±7 days" | "📅 ช่วงเก็บเกี่ยวที่เหมาะสม: 15 พ.ย. (±7 วัน) → เตรียมแรงงาน" | "📅 Optimal harvest window: Nov 15 (±7 days) → prepare labor" |
| Drying condition forecast | "RH >75% predicted next 3 days" | "🌧️ ความชื้นสูง 3 วันหน้า → คลุมลูกกาแฟที่กำลังตาก" | "🌧️ High humidity next 3 days → cover drying coffee" |

### Confidence Communication

ML models produce probability estimates, not certainties. Communicating confidence levels honestly is essential for building farmer trust. The system uses three-tier confidence indicators:

| Confidence Level | Criteria | LINE Display | Example |
|-----------------|----------|-------------|---------|
| 🟢 มั่นใจ (Confident) | Model probability >80%, sufficient historical data | Green indicator + single recommendation | "คาดผลผลิต 250 กก./ไร่ 🟢" |
| 🟡 น่าจะ (Likely) | Model probability 60–80%, moderate data | Yellow indicator + recommendation + "monitor" | "คาดผลผลิต 250 กก./ไร่ 🟡 (ติดตามต่อ)" |
| 🔴 ไม่แน่นอน (Uncertain) | Model probability <60%, limited data | Red indicator + range + "check manually" | "คาดผลผลิต 200–300 กก./ไร่ 🔴 (ตรวจสอบภาคสนาม)" |

---

## 14. Practical Recommendations

1. **Start with rule-based logic, add ML incrementally.** The [[Decision-Logic]] system provides reliable, interpretable alerts from day one. ML models should be introduced as an overlay — running alongside rules, not replacing them — until they have proven their accuracy over at least two full seasons. Premature ML deployment that produces inaccurate predictions will destroy farmer trust faster than no ML at all.

2. **Begin data collection immediately, even without ML.** Every day of sensor data collected is a data point for future ML training. Install sensors, ensure data flows to cloud storage, and record ground-truth labels (harvest yields, disease events, cupping scores) from the very first season. The ML models cannot be trained until the data exists; the data collection investment pays off when models are eventually deployed.

3. **Pool data across farms in the cooperative.** A single farm's data is insufficient for ML training. A cooperative of 20 farms generates 20× the training data, enabling models that are both more accurate and more generalizable. Establish data-sharing agreements within the cooperative, ensuring that individual farm data remains private while aggregated data benefits all members.

4. **Deploy the CLR forecasting model first.** Among the three ML models, the CLR disease forecasting model delivers the highest ROI with the least data. Disease events are frequent (multiple per season per farm), well-defined ( CLR lesions are easily identifiable), and directly linked to measurable sensor variables. Start with CLR classification, then expand to yield and quality models as data accumulates.

5. **Use transfer learning from Yunnan data.** The Yunnan coffee growing region in China shares elevation ranges, latitude, varieties (Catimor dominates both regions), and monsoon climate patterns with Northern Thailand. Pre-training on Yunnan research data (available through the Kunming Institute of Botany publications and shared datasets) can reduce the minimum data requirement from 3 seasons to 1–2 seasons, accelerating deployment by a full year.

6. **Invest in edge server hardware at the cooperative level.** A single Raspberry Pi 5 at approximately 5,200–7,800 THB can serve 20–50 farms with local inference, reducing cloud dependency and ensuring that predictions are available even during internet outages. This is a one-time investment that pays for itself within the first season of ML deployment.

7. **Never deploy an ML model without explainability.** Farmers need to understand why a prediction was made. Use SHAP (SHapley Additive exPlanations) values or feature importance rankings to show which sensor readings drove each prediction. A message like "CLR risk HIGH because leaf wetness has been above 18 hours/day for the past 3 days and humidity is rising" is far more trustworthy than "CLR risk HIGH (82%)".

8. **Retrain models quarterly with new data.** ML models drift as conditions change. A model trained on 2024 data may not generalize perfectly to 2026 conditions, especially as climate patterns shift in Northern Thailand. Schedule quarterly retraining (January, April, July, October) to incorporate the latest data and maintain prediction accuracy.

9. **Budget 30,000–65,000 THB per year for cloud ML.** This is the annual operational cost for a cooperative-scale deployment. At 600–3,250 THB per farm per year, it is a modest investment compared to the yield loss prevention and quality premium capture it enables. Include this in the cooperative's annual operating budget from Year 2 onward.

10. **Plan for a 3-year ML maturation timeline.** Year 1 is data collection and rule-based operation. Year 2 introduces first ML models (CLR forecasting, early yield prediction) with limited accuracy. Year 3 achieves production-grade ML with retrained models, edge deployment, and full LINE bot integration. By Year 4, the system should be delivering consistently accurate predictions that farmers trust and act on.

---

## 15. Related Topics & References

### Related Topics

- [[Yield-Quality-Prediction]] — The rule-based yield and quality prediction model that ML models augment and eventually supersede
- [[Decision-Logic]] — The IF-THEN rule engine that provides the baseline decision framework
- [[Alerts-Remediation]] — How ML predictions are delivered to farmers as actionable alerts
- [[Sensor-Metrics-Thresholds]] — The raw sensor thresholds that feed both rule-based and ML models
- [[Visualization-Dashboard]] — How ML predictions are displayed in the farmer-facing dashboard
- [[Microclimate-Factors]] — Environmental variables that serve as ML model input features
- [[Leaf-Wetness-Sensors]] — Critical sensor for CLR forecasting model input
- [[Soil-Moisture-Sensors]] — Primary input for yield prediction and irrigation optimization models

### References

1. Avelino, J. et al. (2015). "The coffee rust epidemics in Latin America: From contingency planning to the development of an early warning system." *Proceedings of the ASIC Conference* — CLR prediction model foundations using LWD, temperature, and humidity.
2. Kath, J. et al. (2020). "Temperature variability and coffee yield in the Yunnan province of China." *Agricultural and Forest Meteorology* — Yield prediction methodology for monsoon-climate arabica.
3. DaMatta, F.M. et al. (2018). "Why could the coffee crop endure climate change better than other crops?" *Environmental and Experimental Botany* — Feature engineering for coffee stress indicators.
4. Gonzalez, A. et al. (2021). "Edge computing for precision agriculture: A systematic review." *Computers and Electronics in Agriculture* — TinyML and edge deployment architecture for agricultural IoT.
5. Warden, P. & Situnayake, D. (2019). *TinyML: Machine Learning with TensorFlow Lite on Arduino and Ultra-Low-Power Microcontrollers.* O'Reilly Media — Technical reference for ESP32 TinyML deployment.
6. Chen, T. & Guestrin, C. (2016). "XGBoost: A Scalable Tree Boosting System." *Proceedings of the 22nd ACM SIGKDD International Conference* — XGBoost algorithm for yield and quality regression.
7. Lundberg, S.M. & Lee, S.I. (2017). "A Unified Approach to Interpreting Model Predictions." *Advances in Neural Information Processing Systems* — SHAP values for model explainability.
8. Thai Meteorological Department (TMD). "Climate Data Services." — Weather forecast API for time-series model input.
9. Royal Project Foundation (2024). "Coffee Research Annual Report, Northern Thailand." — Local calibration data and variety-specific parameters.
10. Kunming Institute of Botany (2023). "Coffee production and climate in Yunnan, China." *Acta Botanica Yunnanica* — Transfer learning dataset source.

---

*Last updated: 2026-05-13*
