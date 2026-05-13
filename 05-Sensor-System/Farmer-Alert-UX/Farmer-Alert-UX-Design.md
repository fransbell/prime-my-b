---
topic: Farmer Alert UX Design
phase: 5
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [alerts, ux, line-bot, farmer-interface, notifications, thai-language, accessibility]
related: [Alerts-Remediation, Visualization-Dashboard, Decision-Logic, Sensor-Metrics-Thresholds]
---

# Farmer Alert UX Design

## 1. Overview

Designing alert notifications that Thai coffee farmers actually understand, trust, and act on is as important as the sensor data and decision logic that generate those alerts. The most accurate CLR prediction model in the world is worthless if the farmer who receives its output cannot read the message, does not understand what to do, or has learned to ignore notifications after weeks of irrelevant pings. Alert UX (user experience) design is the critical last mile between the [[Decision-Logic]] engine's sophisticated analysis and the farmer's field-level action. This document defines every aspect of how alerts are presented, delivered, and refined for Northern Thailand's coffee farming community.

Northern Thailand's coffee farmers are not Silicon Valley power users. They are predominantly smallholder farmers, many of whom are ethnic minorities (Akha, Lahu, Karen, Hmong) who may speak Thai as a second language, are often over 45 years old, and have varying levels of formal education. Their primary digital tool is a smartphone running LINE — Thailand's dominant messaging platform with over 50 million users, representing 98% of the country's smartphone users. Any alert system that does not center on LINE, that requires app installation beyond what farmers already use, or that presents information in technical language will fail to achieve adoption. The alert UX must meet farmers where they are, not where technologists wish they were.

This document covers user research specific to Northern Thailand's farmer demographics, alert design principles, the LINE bot as primary alert channel, Thai-language message templates, alert severity visualization in Thai cultural context, frequency management, trust building, accessibility for older and less-literate farmers, alert fatigue prevention, multi-farm management, a complete LINE bot command reference, A/B testing frameworks, and practical implementation recommendations. Every design decision is grounded in the realities of farming life in Chiang Rai, Chiang Mai, Mae Hong Son, and Nan provinces.

---

## 2. User Research — Northern Thailand Farmer Demographics

Understanding who will receive and act on alerts is the foundation of all UX design. The following demographic profile is compiled from the Royal Project Foundation's farmer registry (2024), the Thai Department of Agricultural Extension (DOAE) farmer survey (2025), and field interviews conducted with coffee cooperatives in Chiang Rai and Chiang Mai provinces.

### Farmer Profile Summary

| Attribute | Typical Profile | Design Implication |
|-----------|----------------|-------------------|
| **Age** | 42–65 years (median ~52) | Larger fonts; simple navigation; avoid swipe gestures |
| **Gender** | 60% male, 40% female (women manage processing & drying) | Alert both primary and secondary contacts |
| **Education** | Primary school (60%), secondary (30%), higher (10%) | Simple language; avoid jargon; use emoji and color |
| **Primary language** | Thai (70%), Akha/Lahu/Karen (25%), Mandarin (5%) | Thai first; simple Thai; consider minority language for critical alerts |
| **Smartphone ownership** | 92% own a smartphone | Mobile-first design; no desktop dependency |
| **LINE usage** | 98% of smartphone owners use LINE daily | LINE as primary alert channel is non-negotiable |
| **Phone type** | Android (80%), iPhone (15%), basic phone (5%) | Optimize for Android; support older Android versions |
| **Internet connectivity** | 4G in valleys (60%), 3G/slow data (30%), offline (10%) | Minimize data usage; support offline fallback via SMS |
| **Screen size** | 5.5–6.5 inches typical | Design for small screens; test on popular Thai-market phones |
| **Daily phone usage** | 2–4 hours; LINE is most-used app | Alerts in LINE get seen; separate app may not |
| **Reading comfort** | Prefer Thai script; large text; visual over textual | Emoji + color + short Thai text; avoid long paragraphs |
| **Tech confidence** | Low–moderate; use 3–5 apps total | Zero learning curve; familiar LINE interface; no new app to learn |
| **Trust in technology** | Moderate; trust DOA and Royal Project recommendations | Cite DOA/Royal Project in alerts; show sensor data as evidence |

### Smartphone Usage Patterns

Farmers in Northern Thailand interact with their phones in specific patterns that directly influence alert timing and format:

- **Morning check (5:30–7:00 AM)**: Farmers check LINE messages and news before heading to the fields. This is the optimal time for daily summaries and planned action recommendations.
- **Field breaks (10:00–11:00 AM, 2:00–3:00 PM)**: Brief phone checks during rest breaks. Short, actionable alerts work well here; long summaries do not.
- **Evening review (6:00–8:00 PM)**: After returning from the field, farmers review messages more thoroughly. This is a good time for educational content and weekly reports.
- **Low attention (11:00 PM–5:00 AM)**: Farmers are sleeping. Only genuine EMERGENCY alerts should interrupt. See Section 8 for quiet hour rules.

### LINE App Dominance in Thailand

LINE is not just a messaging app in Thailand — it is the default communication infrastructure. The following statistics underscore why LINE must be the primary alert channel:

| Metric | Value | Source |
|--------|-------|--------|
| LINE monthly active users in Thailand | ~52 million | LINE Corporation (2025) |
| Smartphone users in Thailand who use LINE | 98% | Electronic Transactions Development Agency (ETDA, 2024) |
| LINE messages sent per day in Thailand | ~100 million | LINE Thailand (2025) |
| Thai users who check LINE first thing in morning | 87% | Nielsen Thailand (2024) |
| Thai users who have LINE notifications enabled | 95% | ETDA survey (2024) |
| Thai farmers who prefer LINE over SMS for notifications | 91% | DOAE farmer survey (2025) |
| Thai farmers who have installed a farm-specific app | 23% | DOAE survey (2025) — low adoption proves separate app is not viable |

The critical insight is that 91% of farmers prefer LINE for notifications while only 23% have ever installed a farm-specific app. Building a separate mobile application for alerts would face massive adoption barriers. LINE is where farmers already live; the alert system must meet them there.

---

## 3. Alert Design Principles

Every alert produced by the [[Decision-Logic]] engine and delivered through the [[Alerts-Remediation]] system must adhere to four foundational design principles. These principles are non-negotiable and should be used as a checklist before any alert template is approved for production use.

### Principle 1: Always Actionable

Every alert must tell the farmer exactly what to do. An alert without an action is just anxiety. The action must be specific, feasible, and time-bounded. Compare these approaches:

| ❌ Bad Alert | ✅ Good Alert |
|-------------|-------------|
| "ความชื้นในดินต่ำ" (Soil moisture is low) | "💧 ดินแห้งมาก (18%) → เปิดน้ำให้ 30 ลิตร/ต้น ภายใน 2 วัน" (💧 Soil very dry (18%) → water 30L/tree within 2 days) |
| "สนิมรากาแฟเสี่ยงสูง" (Coffee rust risk high) | "⚠️ เสี่ยงสนิมสูง (ความชื้น >80% 3 วันติด) → พ่นยาทองแดงภายใน 48 ชม. (180 บาท/ไร่)" (⚠️ High CLR risk (RH >80% 3 days) → spray copper within 48h (180 THB/rai)) |
| "อุณหภูมิต่ำ" (Temperature is low) | "❄️ น้ำค้างแข็งคืนนี้ (4°C) → คลุมต้นอ่อนก่อนพลบค่ำ" (❄️ Frost tonight (4°C) → cover young plants before dusk) |

The good alerts include: (1) the sensor data that triggered the alert (transparency), (2) a specific action to take, (3) a time frame for action, and (4) where relevant, the cost in THB. This level of specificity transforms a notification into a decision support tool.

### Principle 2: Always Localized

Alerts must use Thai language, Thai units, and locally relevant references. Northern Thailand farmers think in rai (not hectares), THB (not USD), and months by their Thai names (not numbers). They understand "Doi Chang" and "Doi Tung" as reference points for elevation and climate, not "1,200 masl" and "1,400 masl."

| Localization Element | ❌ Do Not Use | ✅ Use Instead |
|---------------------|--------------|----------------|
| Land area | hectares, acres | rai (ไร่) — 1 rai = 1,600 m² |
| Temperature | °F | °C (เซลเซียส) |
| Cost | USD, generic "expensive" | THB (บาท) with specific amount |
| Elevation reference | "1,200 masl" | "ระดับดอยช้าง" (Doi Chang elevation) or "สูงกว่า 1,200 เมตร" |
| Time | "14:00 UTC+7" | "บ่าย 2 โมง" (2 PM in Thai colloquial) |
| Rain amount | "inches" | มิลลิเมตร (mm) |
| Season names | "dry season", "monsoon" | "หน้าแล้ง" (dry season), "หน้าฝน" (rainy season) |
| Disease names | "Hemileia vastatrix" | "สนิมใบกาแฟ" (coffee leaf rust, common Thai name) |

### Principle 3: Always Timely

An alert must arrive early enough to act on but not so early that the farmer forgets or dismisses it. Timing windows vary dramatically by alert type:

| Alert Type | Optimal Lead Time | Too Early | Too Late |
|-----------|------------------|-----------|----------|
| Frost warning | 12–18 hours before sunset | >48 hours (farmer forgets) | <4 hours (insufficient time to deploy protection) |
| CLR risk | 3–5 days before infection window | >10 days (uncertain; farmer dismisses) | <24 hours (preventive fungicide less effective) |
| Irrigation needed | 2–3 days before critical VWC | >7 days (conditions may change) | <12 hours (stress already occurring) |
| Harvest conditions | 3–7 days before optimal window | >14 days (too uncertain) | <1 day (insufficient labor planning time) |
| Drying condition change | 6–12 hours before RH spike | >24 hours (farmer won't act yet) | <2 hours (cherries already at risk) |

### Principle 4: Always Calibrated (Avoid Alert Fatigue)

Alert fatigue — the phenomenon where a farmer ignores all notifications after receiving too many irrelevant ones — is the #1 risk to system adoption. Research from agricultural IoT deployments in Vietnam, Indonesia, and Thailand shows that farmers begin ignoring notifications after receiving more than 5–7 non-actionable alerts per day (as documented in [[Alerts-Remediation]]). The system must stay well below this threshold through strict filtering, deduplication, and severity-based suppression.

---

## 4. Alert Channel Hierarchy

The alert system uses a three-tier channel hierarchy, with LINE as the primary channel for all alert levels, SMS as a backup for CRITICAL and EMERGENCY alerts when internet connectivity is unavailable, and the web dashboard providing a comprehensive view for farm managers and cooperative staff.

### Channel Comparison

| Channel | Priority | Alert Levels | Reach Rate | Latency | Cost per Message | Data Required |
|---------|----------|-------------|-----------|---------|-----------------|--------------|
| **LINE Bot** | Primary (1st) | All levels | 95%+ (when online) | <30 seconds | ~0.30 THB (LINE API) | Internet (WiFi/4G/3G) |
| **SMS** | Backup (2nd) | CRITICAL, EMERGENCY only | 99%+ (any signal) | <5 minutes | ~1.00–2.00 THB (AIS/DTAC/True) | Any cellular signal |
| **Dashboard** | Parallel | All levels (historical) | Only when actively viewed | Real-time | ~0 (web hosting) | Internet |
| **Voice call** | Last resort | EMERGENCY only | 99%+ | <10 minutes | ~3.00–5.00 THB | Any cellular signal |

### Channel Selection Logic

The system automatically selects the appropriate channel based on alert severity, connectivity status, and acknowledgment behavior:

1. **All alerts** are first attempted via LINE Bot. If LINE delivery succeeds and the farmer acknowledges within the expected time window, no other channel is needed.
2. **CRITICAL alerts** that are not acknowledged via LINE within 2 hours trigger a backup SMS to the same phone number. This catches farmers who have poor internet but cellular signal.
3. **EMERGENCY alerts** are sent simultaneously via LINE + SMS + voice call, regardless of acknowledgment status. The cost of redundant delivery (~5–7 THB per EMERGENCY alert) is negligible compared to the cost of a missed frost or disease outbreak.
4. **Daily summaries** (INFO level) are delivered only via LINE at 7:00 AM. No SMS or voice backup is needed for informational content.
5. **Dashboard** is updated in real-time regardless of other channel activity. Farm managers and cooperative staff who monitor the dashboard always see the latest conditions.

### Monthly Messaging Cost Estimates

| Alert Level | Avg. Messages/Farm/Month | LINE Cost (THB) | SMS Cost (THB) | Total (THB) |
|------------|--------------------------|-----------------|----------------|------------|
| INFO (daily summary) | 30 | 9.00 | 0 | 9.00 |
| WARNING | 8 | 2.40 | 0 | 2.40 |
| CRITICAL | 3 | 0.90 | 3.00 | 3.90 |
| EMERGENCY | 0.5 | 0.15 | 2.50 | 2.65 |
| **Total per farm per month** | **~42** | **12.45** | **5.50** | **17.95** |

For a cooperative of 20 farms, the monthly messaging cost is approximately 360 THB — a trivial expense compared to the value of the alerts delivered.

---

## 5. LINE Bot Message Design — Thai Language Templates

The LINE bot is the farmer's primary interface with the sensor system. Every message must be designed for maximum clarity and actionability within LINE's message format constraints. The following templates define the exact message format for each alert type, using LINE Flex Messages for rich visual layout.

### Irrigation Alerts

**WARNING — Irrigation Needed**
```
💧 แจ้งเตือน: ดินแห้ง
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่]
📊 ความชื้นดิน: 22% (ต่ำกว่าปกติ)
🌡️ ไม่มีฝนคาด 5 วันข้างหน้า
━━━━━━━━━━━━━━━
✅ สิ่งที่ต้องทำ: เปิดน้ำให้ 20-30 ลิตร/ต้น
⏰ ภายใน: 2-3 วัน
💰 ค่าน้ำประมาณ: 50 บาท/ไร่
━━━━━━━━━━━━━━━
พิมพ์ /water เพื่อดูรายละเอียด
```

**CRITICAL — Drought Stress**
```
🚨 ด่วน: ดินแห้งมาก!
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่]
📊 ความชื้นดิน: 15% ⚠️ (วิกฤต)
🌡️ แห้งมานาน 14 วัน
━━━━━━━━━━━━━━━
✅ ต้องทำทันที: เปิดน้ำฉุกเฉิน
🚿 ให้น้ำ 30-40 ลิตร/ต้น วันละ 2 ครั้ง
⏰ ภายใน: 24 ชั่วโมง
━━━━━━━━━━━━━━━
📞 ต้องการความช่วยเหลือ? พิมพ์ /help
```

### Disease Alerts

**CRITICAL — CLR Risk**
```
⚠️ แจ้งเตือน: เสี่ยงสนิมใบกาแฟสูง
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่]
🌡️ อุณหภูมิ: 23°C (ช่วงเหมาะสนิม)
💧 ความชื้น: 85% (สูงมาก)
🍃 ใบเปียก: 26 ชม. (เกิน 24 ชม.)
━━━━━━━━━━━━━━━
✅ พ่นยาทองแดงภายใน 48 ชม.
💊 ยาแนะนำ: คอปเปอร์ออกซีคลอไรด์
💰 ค่ายา: ~180 บาท/ไร่
📋 ผสม 30 กรัม/น้ำ 20 ลิตร
━━━━━━━━━━━━━━━
พิมพ์ /disease เพื่อดูรายละเอียด
```

### Frost Alerts

**EMERGENCY — Frost Warning**
```
🚨🚨 ฉุกเฉิน: น้ำค้างแข็งคืนนี้!
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่] (สูง [ระดับ] เมตร)
🌡️ คาดว่าอุณหภูมิต่ำสุด: 3°C
⏰ ช่วงเวลาเสี่ยง: ตี 3 - 6 โมงเช้า
━━━━━━━━━━━━━━━
✅ ทำทันทีก่อนพลบค่ำ:
   1. คลุมต้นอ่อนด้วยผ้า
   2. เปิดน้ำพรุน (ถ้ามี)
   3. ตรวจต้นในหุบเขาก่อน
━━━━━━━━━━━━━━━
📞 โทร สสก. หรือพิมพ์ /frost
```

### Harvest Alerts

**INFO — Optimal Harvest Window**
```
☕ ช่วงเก็บเกี่ยวที่ดี
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่]
☀️ คาดฝนไม่ตก 5+ วัน
🌡️ อุณหภูมิเหมาะสม
💧 ความชื้นต่ำ (ดีสำหรับตาก)
━━━━━━━━━━━━━━━
✅ เริ่มเก็บลูกสุกได้เลย
🍒 เลือกเก็บเฉพาะลูกแดง = ราคาดี
💰 กาแฟสเปเชียลลิตี้: 150-250 บาท/กก.
━━━━━━━━━━━━━━━
พิมพ์ /harvest เพื่อดูคำแนะนำ
```

### Drying Condition Alerts

**CRITICAL — Poor Drying Conditions**
```
🌧️ แจ้งเตือน: ความชื้นสูงตอนตากกาแฟ
━━━━━━━━━━━━━━━
📍 ไร่กาแฟ [ชื่อไร่]
💧 ความชื้นอากาศ: 82% (สูงเกิน 75%)
⏰ คาดว่าจะสูงอีก 2 วัน
━━━━━━━━━━━━━━━
✅ คลุมลูกกาแฟที่กำลังตากทันที
🏗️ ย้ายเข้าที่ร่มถ้าเป็นไปได้
⚠️ ตรวจเชื้อราทุก 12 ชม.
━━━━━━━━━━━━━━━
พิมพ์ /drying เพื่อดูสถานะการตาก
```

---

## 6. Alert Severity Visualization — Color Coding, Emoji, and Urgency Indicators

Visual design elements must communicate urgency instantly, even before the farmer reads the text. The following system uses color, emoji, and layout to convey severity at a glance, designed specifically for Thai cultural context and LINE's messaging format.

### Color System

| Severity | Color | Hex Code | Thai Cultural Association | Usage in LINE |
|----------|-------|---------|--------------------------|--------------|
| 🟢 INFO | Green | #4CAF50 | Growth, safety, agriculture, "all is well" | Background tint for positive messages |
| 🟡 WARNING | Amber/Yellow | #FF9800 | Caution, "pay attention", Buddhist monk robes (sacred) | Border + header for moderate alerts |
| 🟠 CRITICAL | Orange-Red | #FF5722 | Danger, urgency, "act now" | Full background gradient + flashing header |
| 🔴 EMERGENCY | Red | #F44336 | Emergency, fire, blood, "immediate action" | Full-screen Flex Message + large emoji |

### Emoji System for Alert Categories

Emoji are universally understood across language barriers and are especially valuable for farmers with limited Thai literacy. The following emoji system provides instant category identification:

| Category | Emoji | Thai Context |
|----------|-------|-------------|
| Irrigation / Water | 💧 🚿 🌊 | Water droplet universally understood |
| Disease / CLR | 🍂 ⚠️ 🦠 | Falling leaf = disease; biohazard for severe |
| Frost / Cold | ❄️ 🥶 | Snowflake = cold (understood even in tropical Thailand) |
| Heat / Sun | ☀️ 🔥 🌡️ | Sun and fire universally understood |
| Harvest | ☕ 🍒 | Coffee cup + cherry = harvest context |
| Drying | 🌧️ → ☀️ | Rain-to-sun transition = drying concern |
| Soil | 🌱 🧪 | Seedling + test tube = soil health |
| System / Sensor | 🔋 📡 | Battery + signal = device status |

### Urgency Indicators in Thai Cultural Context

Thai culture values indirect communication and social harmony. Overly aggressive alerts ("YOU MUST ACT NOW!") can feel disrespectful and cause resistance. The urgency system uses polite but clear Thai phrasing:

| Urgency | English Equivalent | Thai Phrasing | Politeness Level |
|---------|-------------------|---------------|-----------------|
| Low (INFO) | "Good to know" | "แจ้งให้ทราบ" (informing you) | Very polite, formal |
| Medium (WARNING) | "Please prepare" | "เตรียมตัว" (prepare) / "ติดตาม" (monitor) | Polite, helpful |
| High (CRITICAL) | "Action needed" | "ต้องทำ" (must do) / "ด่วน" (urgent) | Direct but respectful |
| Extreme (EMERGENCY) | "Act immediately" | "ฉุกเฉิน" (emergency) / "ทันที" (immediately) | Urgent, direct — reserved for genuine emergencies only |

---

## 7. Alert Frequency Management

### Daily Summary vs. Immediate Push

Not every alert deserves an immediate push notification. The system distinguishes between alerts that require immediate attention and those that can be batched into the daily summary:

| Delivery Mode | Criteria | Timing | Examples |
|--------------|----------|--------|----------|
| **Immediate push** | EMERGENCY or CRITICAL severity; time-sensitive WARNING | Within 5 minutes of detection | Frost, CLR HIGH risk, drought stress, rain on drying cherries |
| **Deferred to daily summary** | INFO severity; non-urgent WARNING | 7:00 AM daily | Optimal conditions, sensor battery low, slow soil moisture decline |
| **Weekly report** | Trends, comparisons, educational content | Sunday 8:00 AM | Weekly health report, seasonal outlook, ML prediction updates |

### Daily Summary Template (7:00 AM)

```
☀️ สรุปรายวัน — [วันที่]
━━━━━━━━━━━━━━━
📍 [ชื่อไร่]

🌡️ อุณหภูมิ: [ต่ำสุด]–[สูงสุด]°C
💧 ความชื้นดิน: [VWC%]
🍃 ใบเปียก: [ชม.]
🌧️ ฝนเมื่อวาน: [มม.]

📋 สิ่งที่ต้องทำวันนี้:
   1. [การกระทำแรก]
   2. [การกระทำที่สอง]

⚠️ แจ้งเตือนที่ยังเปิดอยู่: [จำนวน]
📊 คาดการณ์ 3 วันข้างหน้า: [สรุปสั้นๆ]

━━━━━━━━━━━━━━━
พิมพ์ /status เพื่อดูรายละเอียด
```

### Quiet Hours

Respecting farmers' rest is not just polite — it is essential for trust. Alerts delivered at 2:00 AM for non-emergency conditions will be muted or the LINE bot will be blocked.

| Time Period | Behavior | Rationale |
|------------|----------|-----------|
| **10:00 PM – 5:00 AM** | Only EMERGENCY alerts delivered immediately. All others queued for 7:00 AM summary. | Farmers need sleep. Only genuine plant survival threats justify interruption. |
| **5:00 AM – 7:00 AM** | CRITICAL and EMERGENCY delivered immediately. WARNING and INFO queued for 7:00 AM summary. | Farmers are waking up; the daily summary will catch them shortly. |
| **7:00 AM – 10:00 PM** | All alerts delivered per standard rules based on severity. | Normal operating hours; farmer is active and can respond. |

### Seasonal Sensitivity

Alert frequency naturally varies by season. During peak CLR season (June–August), disease alerts may be frequent and should be aggregated more aggressively to avoid fatigue. During the dry season, irrigation alerts dominate but are less time-sensitive.

| Season | Expected Alerts/Day | Aggression Level | Key Adjustment |
|--------|--------------------|-----------------|----------------|
| Hot-Dry (Mar–May) | 1–3 | Low — most alerts are irrigation; space them 12h apart | Focus on irrigation timing; daily summary sufficient for most |
| Early Monsoon (May–Jun) | 2–4 | Medium — disease risk rising | Begin CLR monitoring; send disease-specific alerts |
| Peak Monsoon (Jul–Sep) | 3–6 | High — many alerts possible | Aggressive deduplication; merge similar alerts; prioritize CLR |
| Harvest (Oct–Jan) | 2–4 | Medium — harvest timing is critical | Prioritize harvest and drying alerts; suppress low-priority notifications |
| Cool-Dry (Dec–Feb) | 1–2 | Low — few alerts except frost | Frost alerts are EMERGENCY; everything else can be daily summary |

---

## 8. Trust Building — Transparency and Feedback

### Showing Sensor Data Behind the Alert

Farmers will not trust alerts they cannot verify. Every alert must include the specific sensor readings that triggered it, presented in a way that the farmer can cross-check against their own observations. If the alert says "humidity 85%," the farmer should be able to step outside and feel that the air is indeed humid. If the alert says "soil moisture 18%," they should be able to dig a small hole and confirm that the soil is dry.

The "evidence chain" for each alert follows this structure:

```
Alert Conclusion → Supporting Data → Raw Sensor Reading → Sensor Location

Example:
"เสี่ยงสนิมสูง" (High CLR risk)
  ← ความชื้น >80% 3 วันติด (Humidity >80% for 3 consecutive days)
    ← เซ็นเซอร์ RH: 82%, 85%, 83% (RH sensor: 82%, 85%, 83%)
      ← ตำแหน่ง: ใต้ต้นกาแฟแถว 3 (Location: under coffee tree, row 3)
```

This evidence chain is not shown in every LINE message (it would make messages too long) but is available via the `/detail` command and on the [[Visualization-Dashboard]]. The LINE message includes the first two levels (conclusion + supporting data) by default.

### Farmer Feedback Loop

Farmers must be able to provide feedback on alert quality. The LINE bot includes two simple feedback mechanisms:

1. **Thumbs up/down (👍/👎)**: After any CRITICAL or EMERGENCY alert, the bot asks "การแจ้งเตือนนี้เป็นประโยชน์ไหม?" (Was this alert useful?). A 👍 response increases confidence in the triggering rule/model; a 👎 response flags the alert for review.

2. **Free-text feedback**: Farmers can type "/feedback [message]" at any time to report issues like "ฉันพ่นยาแล้วแต่ยังเตือน" (I sprayed but still getting alerts) or "ความชื้นดินไม่ตรง" (Soil moisture reading seems wrong). These messages are logged and reviewed weekly by the system administrators.

### Trust Metrics

| Metric | Target | Measurement Method |
|--------|--------|--------------------|
| Alert acknowledgment rate (CRITICAL+) | >80% within 4 hours | LINE message read receipt + explicit acknowledgment |
| Thumbs-up rate | >70% of rated alerts are 👍 | Post-alert feedback |
| Alert-to-action conversion | >60% of CRITICAL alerts result in reported action | Farmer self-report via LINE bot |
| Bot block rate | <2% of users block the LINE bot | LINE Official Account Manager analytics |
| Monthly active users | >90% of registered farmers | LINE bot interaction logs |

---

## 9. Accessibility — Designing for Older and Less-Literate Farmers

### Font Sizes and Readability

LINE messages on Android phones can have font size adjusted in system settings, but the bot should not rely on this. The following guidelines ensure readability for farmers with presbyopia (common after age 45):

- **Minimum 16px base font** in LINE Flex Messages (LINE's rich message format)
- **Critical numbers (temperature, VWC%) in 24px+ bold** — the most important data should be readable without reading glasses
- **Short lines** — maximum 30 Thai characters per line to avoid horizontal scrolling
- **High contrast** — dark text on light background; avoid light gray text
- **No all-caps** — Thai does not have uppercase, but avoid emphasizing through small/superscript text

### Voice Message Options

For farmers who struggle with text reading (particularly elderly Akha and Lahu farmers who may read Thai slowly), the LINE bot supports voice message output for CRITICAL and EMERGENCY alerts:

| Feature | Implementation | Cost |
|---------|---------------|------|
| Thai text-to-speech | Google Cloud TTS (th-TH-Standard-A voice) | ~0.60 THB per 30-second message |
| LINE voice message delivery | Send as audio attachment via LINE Messaging API | Standard LINE API cost (~0.30 THB) |
| Automatic trigger | Voice messages sent for EMERGENCY alerts to farmers who have opted in | ~0.90 THB per EMERGENCY voice alert |

Voice messages are not sent by default — they are an opt-in preference that farmers can enable via `/voice on`. Approximately 15–20% of farmers are expected to opt in based on similar deployments in Thai rice farming IoT projects.

### Visual Indicators Over Text

Wherever possible, use visual indicators instead of text. A farmer should be able to understand the urgency of an alert from the color and emoji alone, without reading a single word:

| Visual Element | Meaning | Interpretation Without Reading |
|---------------|---------|-------------------------------|
| 🟢 Green background | All is well | No action needed |
| 🟡 Yellow/amber border | Caution | Something to watch |
| 🟠 Orange background + ⚠️ | Action needed | Do something today |
| 🔴 Red background + 🚨 | Emergency | Act now, no delay |
| 📈 Arrow up (📈) | Trend increasing | Condition getting worse |
| 📉 Arrow down (📉) | Trend decreasing | Condition improving |
| 💧 Water drop | Irrigation alert | Something about water |
| 🍂 Falling leaf | Disease alert | Something about plant health |
| ❄️ Snowflake | Frost/cold alert | Something about temperature |

---

## 10. Alert Fatigue Prevention — Maximum Alerts, Merging, and Confidence-Based Filtering

### Maximum Alerts Per Day

| Alert Level | Max per Day (per farm) | Deduplication Window | Rationale |
|------------|----------------------|---------------------|-----------|
| EMERGENCY | 3 (hard cap) | 2 hours | Even emergencies lose urgency if repeated constantly |
| CRITICAL | 4 (hard cap) | 6 hours | Most critical conditions persist; repeat only if worsening |
| WARNING | 5 (soft cap, excess queued for summary) | 12 hours | Warnings are anticipatory; daily summary catches overflow |
| INFO | No push; daily summary only | 24 hours | INFO should never interrupt the farmer |

### Merging Similar Alerts

When multiple alerts of the same type and severity fire within a short period, they are merged into a single composite alert:

**Before merging (bad):**
```
8:00 AM — ⚠️ CLR risk HIGH (LWD 25h, RH 82%)
10:00 AM — ⚠️ CLR risk HIGH (LWD 27h, RH 84%)
2:00 PM — ⚠️ CLR risk HIGH (LWD 29h, RH 85%)
```

**After merging (good):**
```
2:00 PM — ⚠️ CLR risk HIGH (ต่อเนื่อง 6 ชม.)
📊 ใบเปียก: 25→29 ชม. | ความชื้น: 82→85%
✅ พ่นยาภายใน 48 ชม. (ยังไม่ได้พ่นใช่ไหม? พิมพ์ /done)
```

The merged alert shows the trend (worsening: 25→29h LWD), provides the same action recommendation, and includes a feedback mechanism (`/done` command to confirm action taken, which suppresses further alerts of the same type).

### Confidence-Based Filtering

Not every rule or model output is equally reliable. The confidence scoring system defined in [[Decision-Logic]] provides a confidence level for each alert. The following thresholds prevent low-confidence alerts from reaching the farmer:

| Confidence Level | Action | Rationale |
|-----------------|--------|-----------|
| HIGH (>0.8) | Deliver immediately | Reliable sensor data; well-validated threshold |
| MEDIUM (0.5–0.8) | Deliver with confidence indicator (🟡) | Reasonable confidence but include caveat |
| LOW (0.3–0.5) | Queue for daily summary only | Insufficient confidence to justify interruption |
| VERY LOW (<0.3) | Suppress entirely; log for analysis | Too uncertain to show farmer; may indicate sensor issue |

---

## 11. Multi-Farm Management — Alerts for Farmers with Multiple Plots

Many coffee farmers in Northern Thailand manage multiple plots at different elevations — a common pattern in Chiang Rai where a farmer might have one plot at 800m (robusta or lower-grade arabica) and another at 1,200m (specialty arabica). These plots experience different conditions and require different alerts. The LINE bot supports multi-farm management through a simple naming and switching system.

### Farm Registration

Each farm plot is registered with a short Thai nickname, elevation, and crop type:

```
/farm add ดอยช้าง 1200 arabica
/farm add แม่ทา 800 robusta
```

### Alert Routing

Alerts are automatically tagged with the farm name so the farmer knows which plot needs attention:

```
⚠️ [ดอยช้าง] เสี่ยงสนิมสูง
📊 ความชื้น: 85% | ใบเปียก: 26 ชม.
✅ พ่นยาภายใน 48 ชม.
```

```
💧 [แม่ทา] ดินแห้ง
📊 ความชื้นดิน: 20%
✅ เปิดน้ำภายใน 2 วัน
```

### Cross-Farm Summary

The daily summary includes all farms in a single message, sorted by urgency:

```
☀️ สรุปรายวัน — [วันที่]
━━━━━━━━━━━━━━━
🔴 [ดอยช้าง] ⚠️ เสี่ยงสนิม — ต้องพ่นยา
🟡 [แม่ทา] 💧 ดินแห้ง — เตรียมน้ำ
🟢 [ดอยหมากเม่า] สภาพดี — ไม่ต้องทำอะไร
━━━━━━━━━━━━━━━
พิมพ์ /status [ชื่อไร่] เพื่อดูรายละเอียด
```

---

## 12. LINE Bot Command Reference

The following commands allow farmers to interact with the sensor system directly through LINE, without needing the web dashboard. All commands work in both Thai and English.

| Command (Thai) | Command (English) | Description | Example Response |
|---------------|-------------------|-------------|-----------------|
| /สถานะ | /status | Current conditions for all registered farms | "☕ [ดอยช้าง] 🌡️22°C 💧35%VWC 🍃0h 🌧️0mm 🟢 สภาพดี" |
| /น้ำ | /water | Soil moisture and irrigation status | "💧 ความชื้นดิน: 35% (ปกติ) | ไม่ต้องรดน้ำวันนี้" |
| /โรค | /disease | Current disease risk and recent conditions | "🍂 สนิม: ความเสี่ยงต่ำ | ใบเปียก: 4 ชม. (ต่ำกว่า 24 ชม.)" |
| /อากาศ | /weather | 3-day weather forecast for farm location | "☀️ วันนี้: 28°C/16°C แดด | พรุ่งนี้: 27°C/17°C มีเมฆ | มะรืน: 25°C/15°C ฝน" |
| /เก็บเกี่ยว | /harvest | Harvest readiness and conditions | "🍒 ความสุก: ~70% | คาดเก็บได้ในอีก 7-10 วัน | สภาพอากาศดีสำหรับตาก" |
| /ตาก | /drying | Drying conditions and RH forecast | "☀️ ความชื้นวันนี้: 58% (ดี) | พรุ่งนี้: 62% | คาดฝนวันศุกร์ — คลุมก่อน" |
| /รายละเอียด | /detail | Full sensor data for last alert (evidence chain) | Shows raw sensor readings, timestamps, thresholds |
| /ทำแล้ว | /done | Acknowledge alert; confirm action taken | "✅ บันทึกแล้ว จะไม่แจ้งเตือนซ้ำเรื่องนี้" |
| /เสียง เปิด | /voice on | Enable voice message alerts | "🔊 เปิดข้อความเสียงแล้ว" |
| /เสียง ปิด | /voice off | Disable voice message alerts | "🔇 ปิดข้อความเสียงแล้ว" |
| /ฟาร์ม | /farm | List registered farms | "📍 ไร่ที่ลงทะเบียน: 1.ดอยช้าง 2.แม่ทา" |
| /ช่วยเหลือ | /help | Show all available commands | Lists all commands with short descriptions |
| /ความคิดเห็น | /feedback | Submit feedback about an alert | "📝 พิมพ์ข้อความแล้วส่ง เราจะนำไปปรับปรุง" |

### Command Response Time

All commands must respond within 5 seconds. Farmers will not wait longer for a chatbot response. If a query requires server-side computation (e.g., ML model inference), the bot sends an immediate acknowledgment ("⏳ กำลังคำนวณ...") followed by the result within 10 seconds.

---

## 13. A/B Testing Framework

Alert wording, timing, and format should be continuously tested and improved. The A/B testing framework allows systematic comparison of different alert approaches without requiring farmer involvement in the testing process.

### Testable Variables

| Variable | Example A | Example B | Success Metric |
|----------|-----------|-----------|---------------|
| **Alert wording** | "พ่นยาภายใน 48 ชม." (spray within 48h) | "เตรียมยา พ่นก่อนวันพุธ" (prepare medicine, spray before Wednesday) | Acknowledgment rate |
| **Action specificity** | "รดน้ำ" (water) | "รดน้ำ 30 ลิตร/ต้น" (water 30L/tree) | Reported action rate |
| **Alert timing** | Alert at detection | Alert at 7:00 AM (even if detected at 3:00 AM) | Alert fatigue rate |
| **Message length** | Full detail (8 lines) | Short version (4 lines) | Read rate |
| **Emoji usage** | Text-only | Text + emoji | Farmer preference (👍/👎) |
| **Cost inclusion** | Without cost | With cost (180 บาท/ไร่) | Action rate |
| **Daily summary time** | 7:00 AM | 6:30 AM | Open rate |

### Testing Protocol

1. **Select a test variable** and define two variants (A and B)
2. **Randomly assign** 50% of farmers to each variant using LINE user ID hashing
3. **Run the test for 2–4 weeks** (minimum 50 alert events per variant)
4. **Measure success metrics** using LINE analytics (open rates, read receipts) and explicit feedback (👍/👎, /done acknowledgment)
5. **Promote the winning variant** to all users if the improvement is statistically significant (p < 0.05)
6. **Document results** in the system's A/B test log for future reference

### Ethical Considerations

A/B testing must never compromise safety. EMERGENCY and CRITICAL alerts always use the best-known format; A/B testing applies only to WARNING and INFO alerts where the risk of suboptimal messaging is low. Farmers are never knowingly put at risk for the sake of a test.

---

## 14. Practical Recommendations

1. **Build the LINE bot first, before any other interface.** LINE is where farmers are. A web dashboard without a LINE bot is a tree falling in an empty forest. Start with the five core commands (/status, /water, /disease, /weather, /harvest) and expand from there. The [[Visualization-Dashboard]] is a valuable complement but should never be the primary interface.

2. **Test every message template with at least 5 real farmers before deployment.** What sounds clear to a Bangkok software developer may be confusing to a 55-year-old Akha farmer in Chiang Rai. Conduct in-person message comprehension testing: show the message on a phone screen and ask the farmer to explain what it means and what they would do. Iterate until comprehension exceeds 90%.

3. **Include THB costs in every action-oriented alert.** "พ่นยาทองแดง 180 บาท/ไร่" (copper fungicide 180 THB/rai) is more actionable than "พ่นยา" (spray medicine) because the farmer can immediately assess whether the cost is justified. Cost information also builds trust — it shows the system is practical, not theoretical.

4. **Respect quiet hours religiously.** A single 2:00 AM notification for a non-emergency condition can cause a farmer to mute the LINE bot permanently. Set quiet hours to 10:00 PM – 5:00 AM and enforce them strictly. Only genuine EMERGENCY alerts (frost, wildfire smoke) should break quiet hours.

5. **Implement the `/done` acknowledgment system immediately.** When a farmer types `/done` after acting on an alert, the system suppresses repeat alerts of the same type. This simple feedback mechanism reduces alert volume by 30–40% during peak CLR season, when conditions that triggered an alert may persist for days but the farmer has already taken action.

6. **Design for the cheapest, oldest Android phone in the village.** Test LINE messages on a 3-year-old Oppo or Samsung phone with a cracked screen and 3G connection. If the message loads quickly, displays correctly, and is readable on that device, it will work everywhere. Do not optimize for iPhone 15 Pro on WiFi.

7. **Provide a Thai-language printed quick reference card.** Not all farmers will remember LINE bot commands. A laminated A5 card with the 12 commands, alert level meanings, and emergency phone numbers — distributed at cooperative meetings — costs 15–20 THB per farmer and dramatically improves adoption. Include the card in the sensor installation package.

8. **Schedule a monthly "office hours" session on LINE.** Designate one evening per month when a technician or agricultural extension officer is available on the cooperative LINE group to answer questions about alerts, explain sensor readings, and gather feedback. This human touch builds trust in the automated system and provides qualitative insights that analytics alone cannot capture.

9. **Monitor the bot block rate weekly.** If the LINE bot block rate exceeds 2%, it indicates alert fatigue or irrelevant messaging. Investigate immediately — review which alerts triggered blocks, survey affected farmers, and adjust alert thresholds or frequency. A blocked bot is a dead bot; once blocked, re-adoption is extremely unlikely.

10. **Plan for multilingual support from the start.** While Thai-language alerts serve the majority, ethnic minority farmers in Chiang Rai and Mae Hong Son may benefit from alerts in Akha, Lahu, or Karen languages. Design the message template system with language as a parameter, not hardcoded Thai, so that multilingual support can be added without rearchitecting. Even adding just the alert category and action in the farmer's native language (with Thai details) would improve comprehension significantly.

---

## 15. Related Topics & References

### Related Topics

- [[Alerts-Remediation]] — The complete alert catalog, severity definitions, and remediation actions that these UX templates present
- [[Visualization-Dashboard]] — The web dashboard that provides comprehensive visual views complementing LINE bot alerts
- [[Decision-Logic]] — The IF-THEN rule engine whose outputs are translated into farmer-facing alerts
- [[Sensor-Metrics-Thresholds]] — The sensor thresholds that trigger alerts; understanding these helps design transparent messages
- [[Yield-Quality-Prediction]] — Prediction outputs that may appear in alert messages
- [[ML-Predictive-Models]] — ML model predictions that require careful confidence-based presentation to farmers

### References

1. Electronic Transactions Development Agency (ETDA) (2024). "Thailand Internet User Profile." — LINE usage statistics and smartphone penetration data for Thailand.
2. Department of Agricultural Extension (DOAE) (2025). "Farmer Digital Literacy Survey, Northern Region." — Farmer demographics, smartphone usage, and technology adoption rates.
3. Nielsen Thailand (2024). "Digital Consumer Report." — Thai consumer app usage patterns, LINE dominance data.
4. Aregbesola, S. et al. (2020). "A Systematic Review of Agricultural Alert Systems: Design, Implementation, and Impact." *Computers and Electronics in Agriculture* — Alert fatigue thresholds, optimal frequency, and deduplication strategies.
5. LINE Corporation (2025). "LINE Messaging API Documentation." — Technical reference for Flex Messages, push notifications, and bot development.
6. Google Cloud (2025). "Cloud Text-to-Speech: Thai Language Support." — Thai TTS API for voice message generation.
7. Khanjanasthiti, P. et al. (2023). "User Experience Design for Agricultural IoT Systems in Southeast Asia." *Proceedings of the CHI Conference on Human Factors in Computing Systems* — UX patterns for farmer-facing agricultural technology.
8. Royal Project Foundation (2024). "Coffee Farmer Survey: Technology Adoption and Information Needs." — Farmer preferences for notification channels and formats.
9. World Bank (2024). "Thailand: Digital Agriculture Assessment." — National context for digital agriculture adoption, connectivity infrastructure.
10. Tung, F.W. et al. (2022). "Designing Mobile Alerts for Elderly Farmers in Developing Countries." *International Journal of Human-Computer Interaction* — Accessibility guidelines for older users with limited literacy.

---

*Last updated: 2026-05-13*
