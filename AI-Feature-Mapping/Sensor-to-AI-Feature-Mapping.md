---
topic: Sensor → AI Feature Mapping (Fermentation Copilot)
phase: 5
status: active
created: 2026-05-14
updated: 2026-05-15
tags: [ai, sensor, fermentation, washed, natural, honey, anaerobic, ph, decision-logic]
related: [Fermentation-AI-Logic, Project-Workflow-Diagram, Fermentation-Sensor-Spec]
---

# Sensor → AI Feature Mapping
## Coffee Fermentation Copilot Edition

> **Focus:** กระบวนการ fermentation และ drying — จาก sensor ในถัง/โต๊ะ → AI decision สำหรับ processor  
> ครอบคลุมทุก 4 process: Washed · Natural · Honey · Anaerobic/Carbonic Maceration

---

## Sensors ในระบบ Fermentation Node

| Sensor | หน่วย | Process ที่ใช้ | ความน่าเชื่อถือ |
|--------|-------|--------------|----------------|
| **pH probe (continuous)** | pH 0–14 | Washed ●, Honey ●, Anaerobic ● | HIGH (ต้อง calibrate 2-point) |
| **อุณหภูมิในถัง (tank temp)** | °C | ทุก process ● | HIGH |
| **อุณหภูมิอากาศ (ambient)** | °C | Natural ●, Honey ● | HIGH |
| **ความชื้นอากาศ (ambient RH)** | RH % | Natural ●, Honey ● | HIGH |
| **น้ำหนัก / Load Cell** | kg → % moisture loss | Natural ●, Honey ● | MEDIUM-HIGH |
| **CO₂ / Gas sensor** | ppm (indicative) | Anaerobic ● | MEDIUM |
| **แบตเตอรี่** | SOC % | ทุก process ● | HIGH |

> Sensor ที่ไม่ได้ใช้ใน fermentation copilot: ความชื้นดิน, แสง, pH ดิน, ปริมาณฝน (ใช้ใน farm module แยก)

---

## Feature 1 — Fermentation Stage Tracker

**Sensors หลัก:** pH (continuous) · อุณหภูมิในถัง · elapsed time

**AI Output:** "Batch กำลังอยู่ใน Stage X/Y — คาดถึงเป้าอีก ~Nh"

### Stages ตาม Process

**Washed (4 stages):**

| Stage | pH Range | สิ่งที่เกิดขึ้น | ETA ปกติ (28°C) |
|-------|----------|----------------|----------------|
| 1. Mucilage breakdown | 6.0–5.5 | เชื้อรา/แบคทีเรียเริ่มทำงาน | 0–8h |
| 2. Primary ferment | 5.5–5.0 | Lactic acid เพิ่ม | 8–18h |
| 3. Active ferment | 5.0–4.5 | pH ลดเร็ว | 18–30h |
| 4. Finishing | 4.5–4.0 | ถึงเป้า → หยุดล้าง | 30–40h |

**Honey (4 stages):**

| Stage | Indicator | สิ่งที่เกิดขึ้น | ETA (Black Honey) |
|-------|-----------|----------------|-------------------|
| 1. Surface dry | RH ambient | mucilage surface dry | 0–24h |
| 2. Slow ferment | pH (optional) + weight | ferment เริ่มในชั้น mucilage | 24–72h |
| 3. Moisture reduction | weight loss 30–40% | drying ควบคู่ ferment | 3–7 วัน |
| 4. Finish | moisture <12% | พร้อม rest | 7–21 วัน |

**Natural (5 stages):**

| Stage | Indicator | สิ่งที่เกิดขึ้น | ETA |
|-------|-----------|----------------|-----|
| 1. Bloom | weight stable | surface microbes ตั้งตัว | 0–48h |
| 2. Active ferment (fruit) | weight loss starts | ferment ใน fruit | 2–5 วัน |
| 3. Mid-dry | weight loss 20–35% | moisture ลดชัดเจน | 5–14 วัน |
| 4. Slow-dry | weight loss 35–45% | ferment ช้าลง | 14–21 วัน |
| 5. Finish | moisture ≤11% | พร้อม rest | 21–35 วัน |

**Anaerobic / Carbonic Maceration (3 stages):**

| Stage | Indicator | สิ่งที่เกิดขึ้น | ETA |
|-------|-----------|----------------|-----|
| 1. Purge & seal | CO₂ buildup | ไล่ O₂ ออกจากถัง | 0–6h |
| 2. Anaerobic ferment | pH + CO₂ + tank temp | yeast ทำงาน ไม่มี O₂ | 6–72h |
| 3. Release & wash/dry | pressure release | ล้าง (washed anaerobic) หรือตาก | ทันที |

**Context ที่ต้องใช้:** `process_type`, `variety`, `batch_start_time`, `ambient_temp`

---

## Feature 2 — Over-Fermentation Alert

**Sensors หลัก:** pH (rate of change per hour) · อุณหภูมิในถัง

**AI Output:** "⚠️ pH ลดเร็วกว่า baseline X× — ต้องหยุดใน Nh มิฉะนั้น over-fermented"

### ΔpH/h Threshold ตาม Process และ Variety

| Process | Variety | ΔpH/h ปกติ | WARNING (เร็วกว่า) | CRITICAL (เร็วกว่า) |
|---------|---------|-----------|-------------------|---------------------|
| Washed | Typica | 0.08–0.12 | >0.18 | >0.25 |
| Washed | CM80 | 0.07–0.10 | >0.15 | >0.22 |
| Washed | Geisha | 0.06–0.09 | >0.14 | >0.20 |
| Honey | ทุก Arabica | 0.03–0.06 | >0.10 | >0.15 |
| Anaerobic | ทุก Arabica | 0.05–0.09 | >0.16 | >0.24 |

> Temperature correction: ทุกๆ +3°C จาก baseline 28°C → rate เพิ่ม ~15%  
> ดังนั้น: `adjusted_rate = actual_rate × (1 - ((tank_temp - 28) × 0.05))`

### pH Floor (ห้ามเลย)

| Process | Variety | Target stop pH | Floor (over-ferment zone) |
|---------|---------|----------------|--------------------------|
| Washed | Typica | 4.0–4.3 | <3.8 |
| Washed | CM80 | 4.1–4.4 | <3.9 |
| Washed | Geisha | 4.2–4.5 | <4.0 |
| Honey | ทุก | 4.0–4.5 (soft) | N/A — วัด weight แทน |
| Anaerobic | ทุก | 3.8–4.2 | <3.5 |
| Natural | ทุก | N/A — วัด moisture | N/A |

**Context ที่ต้องใช้:** `process_type`, `variety`, `tank_temp`, `batch_elapsed_hours`

---

## Feature 3 — Process Optimizer (AI Recommendation)

**Sensors หลัก:** pH · อุณหภูมิในถัง · ambient temp · elapsed time  
**Input เพิ่ม:** `variety` + `target_flavor_profile` + `ambient_season`

**AI Output:** "สำหรับ [variety] [process] ที่ต้องการ [profile] — เป้า pH [X] ใน [Nh]  
อุณหภูมิวันนี้ [T°C] → ferment จะ [เร็ว/ช้า]กว่าปกติ [Y%]"

### Target pH ตาม Flavor Profile

| Flavor Target | Process | pH Stop Zone | ลักษณะที่ได้ |
|---------------|---------|-------------|--------------|
| Clean / Bright | Washed | 4.2–4.5 | กรดผลไม้, clean cup |
| Complex / Winey | Washed | 3.9–4.2 | fruity, wine-like, risky |
| Sweet / Balanced | Honey | 4.0–4.4 (soft) | sweet, body ดี |
| Fruity / Tropical | Natural | moisture <11% | tropical, boozy notes |
| Exotic / Funky | Anaerobic | 3.8–4.1 | intense, unique, luxury |

### Temperature Effect Table

| Tank Temp | Effect on Rate | AI Action |
|-----------|---------------|-----------|
| <18°C | ช้ากว่า baseline 30%+ | เตือน: ferment นานมาก เสี่ยง undesirable bacteria |
| 18–24°C | Ideal — ช้าและ controlled | แนะนำ: ปล่อยตาม target pH |
| 24–28°C | ปกติ | ปกติ |
| 28–32°C | เร็วกว่า 20–40% | เตือน: เฝ้าระวัง pH ถี่ขึ้นทุก 30 นาที |
| >32°C | เร็วกว่า 50%+ และ off-flavors เสี่ยง | CRITICAL: ย้ายถัง/ลดอุณหภูมิทันที |

**Context ที่ต้องใช้:** `variety`, `process_type`, `target_profile`, `tank_temp`, `ambient_temp`, `season`

---

## Feature 4 — Batch Log & Quality Predictor

**Sensors หลัก:** ทุก sensor (บันทึกตลอด batch)  
**Input เพิ่ม:** cupping score (manual, หลัง batch เสร็จ)

**AI Output:** "batch นี้ similar กับ batch #X ([variety], [process], score YY.Y)  
คาดคะเน: [score range]"

### ข้อมูลที่ log ทุก batch

| Field | Source | ใช้ทำอะไร |
|-------|--------|----------|
| `ph_curve[]` | pH sensor (ทุก 5 นาที) | fingerprint ของ batch |
| `temp_log[]` | tank temp sensor | deviation analysis |
| `ambient_rh_log[]` | RH sensor | context |
| `duration_hours` | start → stop pH | model calibration |
| `process_type` | manual input | feature |
| `variety` | manual input | feature |
| `batch_weight_kg` | load cell / manual | yield tracking |
| `season` | system date | context |
| `cupping_score` | manual input (SCA) | ground truth label |
| `green_bean_price` | manual input | ROI tracking |

### Similarity Logic (early version)

```
similarity_score = weighted average of:
  - pH curve shape (DTW distance)           weight: 40%
  - peak fermentation temp                  weight: 20%
  - total duration                          weight: 20%
  - variety match                           weight: 15%
  - season match                            weight: 5%

if similarity_score > 0.85 → "Very similar to batch #X"
```

**Context ที่ต้องใช้:** `historical_batches[]` (min 5 batches สำหรับ prediction ที่มีความหมาย)

---

## Feature 5 — Drying Readiness (Natural & Honey)

**Sensors หลัก:** น้ำหนัก (load cell) · ambient RH · ambient temp

**AI Output:** "moisture ลดไป X% → ยังต้องตากอีก ~N วัน  
RH วันนี้ [Y]% — [แนะนำ/เตือน]"

### Target Moisture Loss

| Process | เริ่มต้น moisture | เป้าสุดท้าย | % ที่ต้องลด |
|---------|-----------------|------------|------------|
| Natural | ~60–65% | ≤11% (green bean) | ~49–54% loss |
| Honey (Black) | ~50% | ≤11% | ~39% loss |
| Honey (Yellow) | ~40% | ≤11% | ~29% loss |
| Honey (White) | ~25–30% | ≤11% | ~14–19% loss |

> วัดจาก load cell: `moisture_loss_pct = (initial_weight - current_weight) / initial_weight × 100`

### Ambient RH Alert (Drying)

| Ambient RH | Action | Priority |
|-----------|--------|----------|
| <55% + ลม | เงื่อนไขดี ตากได้เร็ว | 🟢 INFO |
| 55–70% | ปกติ | 🟢 OK |
| 70–80% | drying ช้า พลิกเมล็ดบ่อยขึ้น | 🟡 WARNING |
| >80% + กำลังตาก | คลุมทันที เสี่ยง mold | 🔴 CRITICAL |
| ฝนตก + natural/honey | คลุมทันที | 🔴 EMERGENCY |

**Context ที่ต้องใช้:** `process_type` (natural/honey only), `initial_weight_kg`, `current_weight_kg`, `days_drying`

---

## Feature 6 — Device Health

**Sensors หลัก:** Battery SOC%

**AI Output:** "แบตเตอรี่ [X]% — [status]"

| SOC % | Status | Action |
|-------|--------|--------|
| >50% | ปกติ | — |
| 20–50% | 🟡 WARNING | แจ้งเตือน ชาร์จก่อน batch ใหม่ |
| <20% | 🔴 CRITICAL | ข้อมูลอาจหาย — ชาร์จทันที |

> Cross-reference กับ data gap: ถ้าขาดข้อมูล >15 นาที ใน batch ที่กำลัง ferment → CRITICAL alert

---

## สรุป Sensor → Feature Matrix

| Sensor | F1 Stage | F2 Over-Ferm | F3 Optimizer | F4 Quality | F5 Drying | F6 Health |
|--------|----------|-------------|-------------|-----------|----------|----------|
| **pH probe** | ● | ● | ● | ● | ○ | — |
| **Tank temp** | ● | ● | ● | ● | — | — |
| **Ambient temp** | ○ | ○ | ● | ○ | ● | — |
| **Ambient RH** | — | — | ○ | ○ | ● | — |
| **Weight/Load cell** | ● | — | — | ● | ● | — |
| **CO₂ sensor** | ● | ● | ○ | ○ | — | — |
| **Battery** | — | — | — | — | — | ● |

`●` = primary &nbsp;&nbsp; `○` = secondary/context &nbsp;&nbsp; `—` = ไม่เกี่ยวข้อง

---

## Context Variables ที่ทุก Feature ต้องรู้

```
process_type     = washed | natural | honey_white | honey_yellow | honey_red | honey_black
                   | anaerobic_washed | anaerobic_natural | carbonic_maceration
variety          = chiang_mai_80 | typica | sl28 | sl34 | geisha | caturra | robusta | ...
target_profile   = clean | bright | complex | sweet | fruity | exotic
batch_start_time = ISO 8601 timestamp
ambient_season   = cool_dry (พย–กพ) | hot_dry (มีค–พค) | rainy (พค–ตค)
elevation_zone   = lowland (<800m) | mid (800–1,200m) | highland (>1,200m)
```

---

## Sensor Priority ตาม Process

| Process | Priority 1 | Priority 2 | Priority 3 | Optional |
|---------|-----------|-----------|-----------|---------|
| **Washed** | pH probe | Tank temp | Battery | Ambient temp |
| **Honey** | Tank temp + Ambient RH | Load cell (weight) | pH probe | Ambient temp |
| **Natural** | Load cell (weight) | Ambient RH | Ambient temp | — |
| **Anaerobic** | pH probe | CO₂ sensor | Tank temp | Battery |

---

## Related Documents

- [[Fermentation-AI-Logic]] — decision rules, pH curves, thresholds ครบทุก process
- [[Project-Workflow-Diagram]] — end-to-end flow ของ Fermentation Copilot
- [[Fermentation-Sensor-Spec]] — hardware spec และ DIY cost per process
- [[Batch-Log-Schema]] — data schema สำหรับ batch history

---

*Last updated: 2026-05-15 — reframed จาก farm IoT → Fermentation Copilot*
