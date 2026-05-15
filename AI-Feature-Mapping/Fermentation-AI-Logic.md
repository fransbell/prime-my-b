---
topic: Fermentation AI Logic & Decision Rules
phase: 5
status: active
created: 2026-05-15
updated: 2026-05-15
tags: [fermentation, ai, decision-logic, ph-curve, threshold, washed, natural, honey, anaerobic, variety]
related: [Sensor-to-AI-Feature-Mapping, Project-Workflow-Diagram]
---

# Fermentation AI Logic & Decision Rules

> รายละเอียด decision rules, pH curves, และ thresholds สำหรับทุก process และสายพันธุ์  
> เอกสารนี้คือ "source of truth" สำหรับ AI engine ของ Coffee Fermentation Copilot

---

## 1. pH Curve Profiles (Washed Process)

pH curves เป็น fingerprint ของการ ferment ที่ดี — deviation จาก curve = signal ให้ AI แจ้งเตือน

### Standard Washed pH Curves (@ 26°C ambient, 24°C tank)

```
pH
6.5 │●──────────────────────────────────── batch start
    │  \
6.0 │   ╲
    │    ╲  ← Phase 1: slow breakdown (0–8h)
5.5 │     ╲
    │      ╲
5.0 │       ╲──╮ ← Phase 2: primary ferment (8–20h)
    │           ╲
4.5 │            ╲
    │             ╲ ← Phase 3: active drop (20–32h)
4.0 │──────────────●────────── TARGET ZONE (4.0–4.4)
    │                   \      ← Phase 4: finish here
3.8 │────────────────────●──── FLOOR (do not cross)
    │
    └──────────────────────────────────────────── time (h)
    0    8    16   24   32   40   48
```

### pH Targets ตามสายพันธุ์ (Washed)

| Variety | Optimal Stop pH | Acceptable Range | Floor (over-ferm) | Notes |
|---------|----------------|-----------------|-------------------|-------|
| Typica | 4.2 | 4.0–4.4 | <3.8 | CLR-susceptible → ferment ระวัง temp spike |
| Chiang Mai 80 | 4.3 | 4.1–4.5 | <3.9 | robust, forgiving |
| SL28 / SL34 | 4.1 | 3.9–4.3 | <3.7 | complex acid profile |
| Geisha | 4.4 | 4.2–4.6 | <4.0 | delicate — stop เร็วกว่า |
| Caturra / Catuai | 4.2 | 4.0–4.4 | <3.8 | average |

### Duration ตาม Temperature (Washed Typica, target pH 4.2)

| Tank Temp | Expected Duration | Rate multiplier |
|-----------|------------------|----------------|
| 18°C | 55–70h | 0.60× |
| 22°C | 44–55h | 0.75× |
| 26°C | 36–44h | 1.00× (baseline) |
| 28°C | 28–36h | 1.25× |
| 30°C | 22–28h | 1.55× |
| 32°C | 16–22h | 2.00× + off-flavor risk |

> Formula: `estimated_hours = baseline_hours / rate_multiplier`  
> Baseline = ค่าที่ calibrate ได้จาก batch history ของแต่ละ farm

---

## 2. Decision Rules — Washed Process

```
RULE W-01: Over-fermentation rate alert
  IF  ΔpH/h > (variety_baseline_rate × 1.8) for 2 consecutive readings
  AND tank_temp > 26°C
  THEN alert = CRITICAL
       message = "pH ลดเร็วกว่าปกติ X× — ตรวจสอบอุณหภูมิถัง"

RULE W-02: pH floor breach
  IF  pH < variety_floor
  THEN alert = EMERGENCY
       message = "pH เลย floor — หยุดและล้างทันที batch นี้ over-fermented"

RULE W-03: Target pH approaching
  IF  pH <= (target_ph + 0.3)
  AND ETA <= 2h
  THEN alert = INFO
       message = "ใกล้ถึงเป้าแล้ว — เตรียมล้างและหยุด ferment"

RULE W-04: Tank temp too high
  IF  tank_temp > 30°C
  THEN alert = WARNING
       message = "อุณหภูมิถัง [T]°C — เร็วกว่าปกติ [X]%
                  เฝ้าระวัง pH ทุก 30 นาที"

RULE W-05: Tank temp too low
  IF  tank_temp < 18°C
  AND elapsed_hours > 24
  AND pH > 5.5
  THEN alert = WARNING
       message = "fermentation ช้าผิดปกติ — อุณหภูมิต่ำเกิน
                  เสี่ยง undesirable bacteria หากนานเกิน 72h"

RULE W-06: Stalled fermentation
  IF  |ΔpH/h| < 0.02 for 4 consecutive readings
  AND elapsed_hours > 12
  AND pH > 5.0
  THEN alert = WARNING
       message = "fermentation หยุดนิ่ง — pH ไม่ขยับ
                  ตรวจสอบ: อุณหภูมิ, สัดส่วนน้ำ, cleanliness ถัง"
```

---

## 3. Decision Rules — Natural Process

Natural ไม่มี continuous pH sensor โดยตรง — AI ใช้ **weight loss** และ **ambient RH** เป็น primary signal

```
RULE N-01: Mold risk from humidity
  IF  ambient_RH > 80%
  AND days_drying > 1
  THEN alert = CRITICAL
       message = "RH [X]% — เสี่ยงเชื้อรา คลุมเมล็ดและเพิ่มการพลิก"

RULE N-02: Rain during drying
  IF  rain_detected = true
  AND process_type = natural
  THEN alert = EMERGENCY
       message = "ฝนตก — คลุมเมล็ดทันที!"

RULE N-03: Drying too slow
  IF  moisture_loss_pct_per_day < 2.0
  AND ambient_RH > 70%
  THEN alert = WARNING
       message = "drying ช้าเกินไป — [X]%/วัน (ปกติ 2–3%/วัน)
                  ตรวจสอบ RH และการพลิกเมล็ด"

RULE N-04: Drying too fast (cracking risk)
  IF  moisture_loss_pct_per_day > 4.5
  AND ambient_temp > 32°C
  THEN alert = WARNING
       message = "drying เร็วเกิน — เสี่ยง cracking และ uneven moisture
                  พิจารณาใช้ raised bed หรือ shade net"

RULE N-05: Moisture target reached
  IF  estimated_moisture <= 11.5%
  THEN alert = INFO
       message = "moisture ≈ 11% — ใกล้เสร็จแล้ว
                  ตรวจสอบด้วย handheld meter ก่อน bag"

RULE N-06: Over-fermented (natural) — smell/visual detection note
  (ใช้ร่วมกับ manual check)
  IF  elapsed_days > 30
  AND moisture_loss_pct < 40%
  THEN alert = WARNING
       message = "ตากนานผิดปกติ moisture ยังสูง — ตรวจ smell/visual
                  อาจเป็น over-fermented แล้ว"
```

---

## 4. Decision Rules — Honey Process

Honey: ผสม pH monitoring (ถ้ามี) + weight loss + ambient condition

```
RULE H-01: Mucilage mold (early stage)
  IF  ambient_RH > 75%
  AND days_drying <= 3
  THEN alert = CRITICAL
       message = "RH สูงในช่วงแรก — mucilage เสี่ยงขึ้นรา
                  พลิกเมล็ดทุก 2 ชั่วโมง หรือเพิ่ม airflow"

RULE H-02: Uneven drying (turning reminder)
  IF  hours_since_last_turn > 4
  AND days_drying <= 7
  THEN alert = INFO
       message = "ถึงเวลาพลิกเมล็ด — ป้องกัน uneven ferment"

RULE H-03: pH target (if probe available)
  IF  pH_probe_enabled = true
  AND pH < (honey_target_ph - 0.2)
  THEN alert = WARNING
       message = "pH ต่ำกว่าเป้า [target] — ferment เร็วกว่าปกติ
                  พิจารณาย้ายไปที่อากาศถ่ายเทได้ดีกว่า"

RULE H-04: Black honey ferment complete
  IF  process_type = honey_black
  AND moisture_loss_pct >= 38%
  THEN alert = INFO
       message = "Black honey ใกล้เสร็จ — เข้า rest phase ต่อได้"

RULE H-05: Rain critical (honey)
  IF  rain_detected = true
  THEN alert = EMERGENCY
       message = "ฝนตก — คลุม honey batch ทันที! mucilage ดูดน้ำเร็วมาก"
```

---

## 5. Decision Rules — Anaerobic / Carbonic Maceration

Anaerobic เป็น process ที่ควบคุมยากที่สุด — pH + CO₂ + tank temp ต้องดูพร้อมกัน

```
RULE A-01: O₂ purge complete (tank sealed)
  IF  CO₂_ppm > 2000
  AND elapsed_hours <= 8
  THEN alert = INFO
       message = "CO₂ สะสมแล้ว — ถังถูก purge ดี พร้อม anaerobic ferment"

RULE A-02: Pressure warning (gas buildup)
  IF  CO₂_ppm > 5000
  AND valve_open = false
  THEN alert = WARNING
       message = "CO₂ สูงมาก — ตรวจ pressure release valve
                  ไม่ควรปล่อยให้ pressure เกิน safety limit"

RULE A-03: pH drop (anaerobic active)
  IF  ΔpH/h > 0.06 (anaerobic baseline)
  AND tank_temp within 18–28°C
  THEN status = INFO
       message = "Anaerobic ferment กำลัง active — pH ลดปกติ"

RULE A-04: pH target approaching (anaerobic)
  IF  pH <= (anaerobic_target_ph + 0.2)
  THEN alert = WARNING
       message = "ใกล้ถึงเป้า pH [target] — เตรียม release pressure
                  และล้าง (washed anaerobic) หรือ transfer to drying bed"

RULE A-05: Temperature spike (anaerobic critical)
  IF  tank_temp > 30°C
  THEN alert = CRITICAL
       message = "อุณหภูมิในถัง [T]°C — ผิดปกติสำหรับ anaerobic
                  เสี่ยง undesirable fermentation — ตรวจและย้ายถัง"

RULE A-06: Fermentation stalled (anaerobic)
  IF  |ΔpH/h| < 0.01 for 6 consecutive readings
  AND elapsed_hours > 20
  AND pH > 4.5
  THEN alert = WARNING
       message = "Anaerobic ferment หยุดนิ่ง — ตรวจ CO₂ level และ seal ถัง
                  อาจมี O₂ รั่วเข้า"
```

---

## 6. Variety × Process Compatibility Matrix

ใช้สำหรับ Process Optimizer — แนะนำว่า variety นี้ควรทำ process อะไร และคาด flavor profile ไหน

| Variety | Washed | Natural | Honey | Anaerobic | Recommended primary |
|---------|--------|---------|-------|-----------|---------------------|
| **Typica** | ✅ Classic | ✅ Fruity | ✅ Sweet | ⚠️ Risky (delicate) | Washed, Honey |
| **Chiang Mai 80** | ✅ Clean | ✅ Tropical | ✅ Excellent | ✅ Good | ทุก process |
| **SL28 / SL34** | ✅ Complex acid | ⚠️ Heavy (oily) | ✅ Good | ✅ Excellent | Washed, Anaerobic |
| **Geisha** | ✅ Floral/Delicate | ✅ Premium | ✅ Sweet floral | ✅ Exotic premium | ขึ้นกับ target market |
| **Robusta Chumphon** | ✅ Body/Bitter | ❌ Not typical | ❌ Not typical | ❌ Not typical | Washed only |

> ⚠️ = ทำได้แต่ต้องการ expertise และ attention สูง  
> ❌ = ไม่แนะนำ — ไม่ได้ flavor ที่ดีขึ้น

---

## 7. Flavor Profile × Market Price Correlation

ข้อมูลนี้ใช้ใน Batch Log เพื่อ motivate processor และแสดง ROI จริง

| Process | Variety | Cupping Score range | Typical export price (USD/lb, green) |
|---------|---------|--------------------|-----------------------------------------|
| Washed | Typica / CM80 | 82–87 | 4–8 USD |
| Washed | Geisha / SL28 | 86–90+ | 10–20 USD |
| Natural | CM80 | 83–88 | 6–12 USD |
| Natural | Geisha | 87–92+ | 20–40 USD |
| Honey (Black) | CM80 / Typica | 84–89 | 8–15 USD |
| Anaerobic | ทุก Arabica | 85–90+ | 12–25 USD |

> Source: World of Coffee market data + Thai specialty coffee export estimates (2024–2025)  
> Thai specialty โตเร็วมาก — Chiang Mai / Chiang Rai origin เริ่มเป็นที่รู้จักในตลาดญี่ปุ่นและยุโรป

---

## 8. AI Prediction Model Roadmap

### Phase 1 (MVP): Rule-based Engine
- IF-THEN rules ทั้งหมดใน document นี้
- ไม่ต้องใช้ ML — deterministic, explainable
- เหมาะสำหรับ launch ตัวแรก

### Phase 2: Statistical Baseline (batch 10+)
- สร้าง pH curve baseline จาก batch history จริง ของแต่ละ farm
- Dynamic threshold แทน static — ปรับตาม farm นั้นๆ
- Temperature correction calibration per farm

### Phase 3: Similarity Engine (batch 30+)
- DTW (Dynamic Time Warping) เปรียบเทียบ pH curve
- Nearest-neighbor quality prediction
- "batch นี้คล้าย batch #X ที่ได้คะแนน 87.5"

### Phase 4: Predictive ML (batch 100+)
- Time-series model (LSTM หรือ Prophet)
- Predict cupping score จาก pH curve shape
- Optimize process parameters per farm per season

---

## Related Documents

- [[Sensor-to-AI-Feature-Mapping]] — sensor inputs และ output ครบทุก feature
- [[Project-Workflow-Diagram]] — end-to-end flow และ architecture
- [[Batch-Log-Schema]] — data schema สำหรับเก็บ batch history

---

*Created: 2026-05-15 — เอกสารใหม่สำหรับ Coffee Fermentation Copilot*
