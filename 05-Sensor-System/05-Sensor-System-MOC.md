# 📊 Sensor Metrics & Decision System

> How sensor data translates to actionable decisions, yield predictions, and alerts for coffee farmers.

---

## Topics

| Topic | File | Status |
|-------|------|--------|
| Sensor Metrics & Thresholds | [[Sensor-Metrics-Thresholds]] | ✅ |
| Decision Logic Engine | [[Decision-Logic]] | ✅ |
| Alerts & Remediation Actions | [[Alerts-Remediation]] | ✅ |
| Environment Intervention Guide | [[Environment-Intervention]] | ✅ |
| Yield & Quality Prediction | [[Yield-Quality-Prediction]] | ✅ |
| Visualization & Dashboard Design | [[Visualization-Dashboard]] | ✅ |
| ML Predictive Models for Coffee | [[ML-Predictive-Models]] | 📝 Draft |
| Farmer Alert UX Design | [[Farmer-Alert-UX-Design]] | 📝 Draft |

---

**Core System Flow**:

```
┌──────────┐    ┌──────────────┐    ┌──────────────┐    ┌───────────────┐
│  Sensors  │───→│  Data Analysis │───→│  Decision     │───→│  Farmer Alert  │
│  (Field)  │    │  (Thresholds)  │    │  (IF-THEN)    │    │  (Action)      │
└──────────┘    └──────────────┘    └──────────────┘    └───────────────┘
                        │                    │
                        ▼                    ▼
                ┌──────────────┐    ┌───────────────┐
                │  Prediction   │    │  Remediation   │
                │  (Yield/Qual) │    │  (Fix Actions)  │
                └──────────────┘    └───────────────┘
```

---

**Key Question**: "The weather is not ideal for producing X quality — what can we do to fix that?" This section answers that with sensor-driven, data-backed recommendations.

---

**Key Insights from Phase 5**:

- **Thresholds** are the foundation: every sensor reading maps to optimal/warning/critical zones by coffee type and growth stage
- **51 IF-THEN decision rules** cover irrigation, disease, temperature, shade, soil, harvest, and flowering decisions
- **30 specific alerts** with 4 severity levels (INFO → EMERGENCY) and detailed remediation actions in THB
- **Environment interventions** can shift microclimate by 2–5°C (shade) or 25–50% moisture retention (mulch), equivalent to gaining hundreds of meters of altitude
- **Yield prediction** accuracy reaches 80–85% pre-harvest; quality prediction links DTR, shade, and harvest conditions to SCA scores and THB pricing
- **Dashboard design** is mobile-first with LINE bot as the lightweight entry point for Thai farmers
- **ML predictive models** can improve yield prediction accuracy from 80-85% (rule-based) to 85-90% (ML-based) and forecast CLR risk 3-7 days ahead, but require 2-3 seasons of sensor data for training — start collecting data now even if ML deployment is a Year 2+ goal
- **Farmer alert UX** is the critical last mile: LINE bot (used by 98% of Thai smartphone users) is the primary channel, with Thai-language actionable messages, severity color coding, and alert fatigue prevention (max 5-8 alerts/day) ensuring farmers trust and act on sensor-driven recommendations

---

← [[04-Farmer-Knowledge-MOC|Farmer Knowledge ←]] | [[Home]]
