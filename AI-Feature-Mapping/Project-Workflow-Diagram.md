---
topic: Project Workflow Diagram
phase: 5
status: active
created: 2026-05-14
updated: 2026-05-15
tags: [workflow, diagram, fermentation, sensor, ai, dashboard, copilot]
related: [Fermentation-AI-Logic, Sensor-to-AI-Feature-Mapping, Fermentation-Sensor-Spec]
---

# Coffee Fermentation Copilot — Project Workflow Diagram

> End-to-end: sensor ในถัง/โต๊ะ ferment → AI วิเคราะห์ → Dashboard → แจ้งเตือน processor

---

## Pain Point

> **"30% ของ specialty coffee batch fail จาก inconsistent fermentation"**
>
> Washed: pH เลยเป้า → over-fermented, vinegary  
> Natural/Honey: moisture ไม่ลดถูกจังหวะ → mold  
> Anaerobic: pressure/CO₂ เกิน → บูดในถัง  
>
> ทั้งหมดนี้ป้องกันได้ถ้ารู้ก่อน 2–4 ชั่วโมง

---

## Overview: 4 Stages

```
╔══════════════════════════════════════════════════════════════════════════════════════════╗
║                   COFFEE FERMENTATION COPILOT — END-TO-END FLOW                         ║
╚══════════════════════════════════════════════════════════════════════════════════════════╝

┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐     ┌──────────────────────┐
│   1. FERMENT SENSOR  │────▶│  2. AI COPILOT       │────▶│  3. DASHBOARD        │────▶│  4. ALERT / LOG      │
│  วัดค่าในถัง/โต๊ะ   │     │  วิเคราะห์ + แนะนำ   │     │  แสดงผล processor    │     │  แจ้งเตือน + บันทึก  │
└──────────────────────┘     └──────────────────────┘     └──────────────────────┘     └──────────────────────┘
```

---

## 1. FERMENT SENSOR — วัดค่าภายในกระบวนการ

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                      FERMENTATION SENSOR NODE (ต่อ 1 batch)                       │
│                                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  🧪 pH (continuous)  │  │  🌡️ Temp (in-tank)   │  │  💧 Ambient RH       │   │
│  │  Atlas Scientific    │  │  DS18B20 Waterproof   │  │  SHT31 Module        │   │
│  │  pH E-201 probe      │  │  ±0.5°C accuracy      │  │  ±2% RH accuracy     │   │
│  │  range: 0–14 pH      │  │  วัดใน mucilage/น้ำ   │  │  สำหรับ natural/honey│   │
│  │  ราคา: ~1,800 THB    │  │  ราคา: ~80 THB        │  │  ราคา: ~115 THB      │   │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌──────────────────────┐   │
│  │  ⚖️ Weight/Load Cell  │  │  💨 CO₂ / Gas        │  │  🔋 Battery          │   │
│  │  HX711 + 10kg cell   │  │  MQ-135 (indicative) │  │  18650 + USB-C       │   │
│  │  สำหรับ natural/honey │  │  สำหรับ anaerobic    │  │  SOC monitoring      │   │
│  │  วัด moisture loss   │  │  เตือน pressure build │  │  ~1 สัปดาห์/ชาร์จ    │   │
│  │  ราคา: ~350 THB      │  │  ราคา: ~120 THB       │  │  ราคา: ~130 THB      │   │
│  └──────────────────────┘  └──────────────────────┘  └──────────────────────┘   │
│                                                                                  │
│  ┌────────────────────────────────────────────────────────────────────────────┐  │
│  │                        MCU + WiFi / BLE                                    │  │
│  │  ESP32-S3 · ส่งข้อมูลทุก 5 นาที → PocketBase (WiFi) หรือ BLE Gateway     │  │
│  │  ราคา: ~150 THB · ใช้งาน indoor ไม่ต้องการ LoRa                           │  │
│  └────────────────────────────────────────────────────────────────────────────┘  │
│                                                                                  │
│              ราคา DIY Fermentation Node: ~2,745 THB/batch node                   │
│              (washed/honey: ไม่ต้อง CO₂ sensor → ~2,625 THB)                    │
└──────────────────────────────────────────────────────────────────────────────────┘

                    Sensor ที่ใช้แตกต่างกันตาม Process

  Process          pH   Temp   Weight   CO₂/Gas   Ambient RH
  ───────────────────────────────────────────────────────────
  Washed           ●    ●       —         —          ○
  Natural          ○    ●       ●         —          ●
  Honey            ●    ●       ●         —          ●
  Anaerobic        ●    ●       —         ●          ○
  ───────────────────────────────────────────────────────────
  ● = required   ○ = optional/useful
```

---

## 2. AI COPILOT — วิเคราะห์ + แนะนำ

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         FERMENTATION AI ENGINE                                    │
│    Context: process_type · variety · target_profile · batch_start_time           │
└──────────────────────────────────────────────────────────────────────────────────┘
          │
          ├─── 🧪 Feature 1: FERMENTATION STAGE TRACKER
          │         Input:  pH (rate of change) + temp + elapsed time
          │         Output: "Stage 2/4 — Primary fermentation active
          │                  pH 5.1 → คาดถึงเป้า pH 4.2 ใน ~10h"
          │
          ├─── ⚠️ Feature 2: OVER-FERMENTATION ALERT
          │         Input:  pH drop rate > threshold + temp spike
          │         Output: "⚠️ pH ลดเร็วกว่าปกติ 2× — หยุด ferment ใน 2h
          │                  มิฉะนั้น batch นี้จะ over-fermented (vinegary)"
          │
          ├─── 🎯 Feature 3: PROCESS OPTIMIZER
          │         Input:  variety + process_type + target_profile + ambient temp
          │         Output: "Washed Typica → เป้า pH 4.2 ± 0.1 ใน 36h
          │                  อุณหภูมิวันนี้ 28°C → จะเร็วกว่าปกติ ~20%
          │                  แนะนำหยุดที่ pH 4.3 ก่อนล้าง"
          │
          ├─── 📊 Feature 4: BATCH LOG & QUALITY PREDICTOR
          │         Input:  historical batch data + cupping score records
          │         Output: "pH curve ของ batch นี้ similar กับ batch #23
          │                  (CM80 Washed, เดือนมกราคม, score 87.5)
          │                  คาดคะเน: 85–88 คะแนน"
          │
          ├─── 💧 Feature 5: DRYING READINESS (Natural/Honey)
          │         Input:  weight loss % + ambient RH + temp
          │         Output: "moisture ลดแล้ว 18% → ยังต้องตากอีก ~2 วัน
          │                  RH วันนี้ 72% — แนะนำคลุม/เพิ่มการหมุน"
          │
          └─── 🔋 Feature 6: DEVICE HEALTH
                    Input:  battery SOC% + data gap detection
                    Output: "แบตเตอรี่ 18% — ชาร์จก่อนเริ่ม batch ใหม่"
```

---

## 3. DASHBOARD — แสดงผลให้ processor

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                        FERMENTATION DASHBOARD (App)                               │
│                                                                                  │
│  ┌──────────────────────────────┐  ┌────────────────────────────────────────┐   │
│  │      🧫 BATCH STATUS         │  │       📈 pH CURVE (live)               │   │
│  │                              │  │                                        │   │
│  │  Batch #31 — Washed Typica   │  │  6.5│                                  │   │
│  │  เริ่ม: 14 พ.ค. 08:00        │  │  5.5│╮                                 │   │
│  │  ผ่านไป: 18h 24m             │  │  4.5│ ╰──╮                             │   │
│  │  Stage: ██████░░ 3/4         │  │  3.5│    ╰────── target: 4.2           │   │
│  │                              │  │      └──────────────── เวลา (h)        │   │
│  │  pH ตอนนี้:  4.61            │  │           ↑ now                        │   │
│  │  Temp (tank): 24.3°C         │  │  ── actual   ·· predicted              │   │
│  │  คาดถึงเป้า:  ~8h            │  │                                        │   │
│  └──────────────────────────────┘  └────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────┐  ┌────────────────────────────────────────┐   │
│  │      🌡️ ENVIRONMENT          │  │      🤖 AI RECOMMENDATION              │   │
│  │                              │  │                                        │   │
│  │  Ambient Temp:  27.8°C       │  │  ✅ Fermentation progress: ปกติ        │   │
│  │  Ambient RH:    68%          │  │     pH กำลังลดตาม curve มาตรฐาน       │   │
│  │  Tank Temp:     24.3°C       │  │                                        │   │
│  │                              │  │  ⏱️ แนะนำหยุดที่ pH 4.2               │   │
│  │  ─── Batch History ───       │  │     ประมาณ 08:00 น. พรุ่งนี้           │   │
│  │  pH start: 6.42              │  │                                        │   │
│  │  Δ pH: -1.81 (28.2%)        │  │  🌡️ Tank temp สูงกว่าปกติ 2°C         │   │
│  │  ΔpH/h: -0.10 avg            │  │     ferment จะเสร็จเร็วกว่าคาด        │   │
│  │                              │  │     เฝ้าระวัง pH ถี่ขึ้น               │   │
│  └──────────────────────────────┘  └────────────────────────────────────────┘   │
│                                                                                  │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │                      📋 ALL ACTIVE BATCHES                               │   │
│  │                                                                          │   │
│  │  Batch  │ Process    │ Variety     │ Stage  │ pH   │ ETA    │ Status     │   │
│  │  ──────────────────────────────────────────────────────────────────────  │   │
│  │  #31    │ Washed     │ Typica      │ 3/4    │ 4.61 │ ~8h    │ 🟢 OK     │   │
│  │  #32    │ Natural    │ CM80        │ 2/5    │ —    │ ~3d    │ 🟢 OK     │   │
│  │  #33    │ Anaerobic  │ Geisha      │ 1/3    │ 5.89 │ ~48h   │ 🟡 Watch  │   │
│  └──────────────────────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. ALERT / LOG — แจ้งเตือน + บันทึก batch

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                         NOTIFICATION + BATCH LOG SYSTEM                           │
└──────────────────────────────────────────────────────────────────────────────────┘

  Priority         ช่องทาง              ตัวอย่าง Alert
  ──────────────────────────────────────────────────────────────────────────────
  🔴 EMERGENCY     Push + เสียง         "⚠️ pH 3.6 — ต่ำกว่าเป้ามาก!
  (ทันที)                               หยุด ferment ทันที และล้างเมล็ด
                                        Batch #31 Washed Typica"

  🟠 CRITICAL      Push                 "pH กำลังลดเร็วผิดปกติ (3×)
  (ภายใน 30 นาที)                       คาดถึงเป้าใน ~1h แทนที่จะ 8h
                                        ตรวจสอบอุณหภูมิถัง"

  🟡 WARNING       Push                 "Tank temp 32°C — สูงกว่า optimal
  (ภายใน 2 ชั่วโมง)                    fermentation rate เร็วขึ้น ~40%
                                        พิจารณาย้ายถังไปที่เย็นกว่า"

  🟢 INFO          App only             "Batch #31 เข้า Stage 3 แล้ว
  (แวะดูเมื่อสะดวก)                    pH 5.1 → กำลัง secondary ferment
                                        ประมาณการ: หยุดพรุ่งนี้ 08:00"
  ──────────────────────────────────────────────────────────────────────────────

                        BATCH LOG — บันทึกอัตโนมัติทุก batch
  ──────────────────────────────────────────────────────────────────────────────

  ข้อมูลที่บันทึก                     ประโยชน์
  ──────────────────────────────────────────────────────────────────────────────
  pH curve ทั้ง batch               → เปรียบเทียบ batch-to-batch ได้
  Temperature log                   → วิเคราะห์ deviation จากปกติ
  Duration: start → stop pH         → calibrate prediction model
  Process + Variety + Season        → context สำหรับ AI training
  Cupping score (manual input)      → ground truth สำหรับ quality prediction
  Green bean price achieved         → ROI tracking ให้ผู้ใช้
  ──────────────────────────────────────────────────────────────────────────────
```

---

## End-to-End Architecture

```
     สถานีแปรรูป                  Cloud / Server                   มือถือ Processor
  ┌──────────────────┐           ┌─────────────────┐           ┌───────────────────┐
  │                  │  WiFi/BLE │                 │  REST API │                   │
  │  Ferment Sensor  │──────────▶│  PocketBase     │──────────▶│  Mobile App       │
  │  Node (ESP32-S3) │  ทุก 5min │  (Go server)    │           │  (Vite + Mantine) │
  │                  │           │                 │           │                   │
  │  · pH probe      │           │  ┌───────────┐  │           │  🧫 Batch Status  │
  │  · Temp (tank)   │           │  │ Ferment   │  │           │  📈 pH Curve Live │
  │  · Weight cell   │           │  │ AI Engine │  │           │  🤖 AI Advice     │
  │  · CO₂ sensor    │           │  └───────────┘  │  Push     │  📋 All Batches   │
  │  · Ambient RH    │           │                 │──────────▶│  🔔 Alerts        │
  └──────────────────┘           │  ┌───────────┐  │           │  📊 Batch Log     │
                                 │  │ Batch Log │  │           └───────────────────┘
  ┌──────────────────┐           │  │ & History │  │
  │  WiFi Router /   │           │  └───────────┘  │
  │  Mobile Hotspot  │           └─────────────────┘
  └──────────────────┘

  Hardware cost (per batch node):  ~2,745 THB (anaerobic) / ~2,625 THB (washed/honey)
  Target customer:                 specialty coffee processor ที่ทำ >10 batch/ปี
  Value proposition:               ป้องกัน batch fail มูลค่า 5,000–50,000 THB/ครั้ง
```

---

## Impact & Market

```
  Impact ที่วัดได้                          Thai Specialty Coffee Market
  ─────────────────────────────────────     ──────────────────────────────────────
  ✅ ลด batch fail rate จาก 30% → <5%      เชียงใหม่/เชียงราย: growing fast
  ✅ เพิ่มราคา green bean 20–40%           Thai specialty: 80+ คะแนน → export ได้
  ✅ ลด labor ตรวจสอบ pH manual            World of Coffee: Thai farms ขาย 15–30 USD/lb
  ✅ สร้าง batch database → AI ดีขึ้น       ≈800 specialty farms ใน Northern Thailand
     เรื่อยๆ ยิ่งใช้ยิ่งฉลาด              target: 200 farms year 1
```

---

## Related Documents

- [[Fermentation-AI-Logic]] — pH curves, thresholds, decision rules ทุก process และสายพันธุ์
- [[Sensor-to-AI-Feature-Mapping]] — mapping sensor → AI feature ที่ reframe แล้ว
- [[Fermentation-Sensor-Spec]] — hardware spec, cost, placement ต่อ process
- [[Batch-Log-Schema]] — data model สำหรับ batch history และ quality prediction

---

*Last updated: 2026-05-15 — reframed จาก "IoT farm platform" → "Coffee Fermentation Copilot"*
