---
topic: Sensor Calibration Field Guide
phase: 1
status: draft
created: 2026-05-13
updated: 2026-05-13
tags: [calibration, sensors, field-guide, soil-moisture, temperature, humidity, thailand]
related: [Soil-Moisture-Sensors, Temperature-Sensors, Humidity-Sensors, Soil-pH-Sensors, NPK-Sensors, Sensor-Metrics-Thresholds]
---

# Sensor Calibration Field Guide

> **Summary**: Uncalibrated sensors can be off by 20–200%, especially soil moisture and NPK sensors. This field guide provides step-by-step calibration procedures for every sensor type in the coffee IoT system, using methods and equipment practical for Northern Thailand farms. Includes soil-specific calibration for Thai soil types, THB pricing for all calibration tools, a field calibration log template, and a seasonal calibration schedule.

---

## Overview

Sensor calibration is the single most impactful — and most frequently neglected — step in any IoT deployment. An uncalibrated sensor does not measure reality; it measures an approximation colored by manufacturing tolerances, environmental drift, and installation artifacts. For coffee farmers in Northern Thailand, the consequences of uncalibrated sensors are severe and directly economic: an uncalibrated soil moisture sensor reading 30% VWC when the true value is 18% will cause the farmer to skip irrigation during a critical dry period, potentially reducing cherry size by 30–50% and losing thousands of baht per rai. An uncalibrated humidity sensor reading 70% RH when the actual value is 85% will fail to trigger a coffee leaf rust alert, allowing an epidemic to establish before the farmer notices yellow spots on the leaves.

The problem is compounded in Northern Thailand by extreme environmental conditions. Temperatures swing from 5°C on a January morning at 1,200m elevation to 38°C on an April afternoon. Humidity ranges from 30% during the hot dry season to 95%+ during monsoon downpours. Soil types vary dramatically even within a single farm — clay in low-lying areas, sandy loam on slopes, and organic-rich forest soil under shade trees. Each of these factors affects sensor readings differently, and a calibration performed in an air-conditioned lab in Bangkok bears little relation to field performance on a mountainside in Chiang Mai's Doi Saket district. This guide provides calibration procedures designed to be performed **in the field, by farmers or local technicians, using affordable equipment available in Thailand**.

---

## Why Calibration Matters

### Error Magnitudes by Sensor Type

| Sensor Type | Typical Uncalibrated Error | Cost of Error (per rai per season) | Example Consequence |
|-------------|---------------------------|-----------------------------------|---------------------|
| **Soil Moisture** (Capacitive V1.2) | ±15–25% VWC | 5,000–15,000 THB | Over-irrigation (wasted water, root rot) or under-irrigation (drought stress, small cherries) |
| **Soil Moisture** (Resistive FC-28) | ±30–50% VWC | Unusable | Cannot be calibrated; sensor itself is unreliable |
| **Air Temperature** (SHT31) | ±0.5–1.0°C | 1,000–3,000 THB | Missed frost alert; incorrect flowering prediction |
| **Air Humidity** (SHT31) | ±3–5% RH | 2,000–5,000 THB | CLR alert missed or false alarm; incorrect drying time estimate |
| **Light / Shade** (BH1750) | ±10–20% lux | 500–2,000 THB | Incorrect shade management; over-pruning or under-pruning shade trees |
| **Soil pH** (continuous probe) | ±1.0–2.0 pH | 3,000–8,000 THB | Unnecessary liming (waste of 500–1,000 THB/rai) or missed acidity correction |
| **NPK** (RS485 7-in-1) | ±50–200% | Unquantifiable | Cannot calibrate reliably; use DOA lab test instead |
| **Rainfall** (tipping bucket) | ±5–15% volume | 1,000–3,000 THB | Incorrect irrigation scheduling; misjudged flowering trigger |
| **Wind** (cup anemometer) | ±1–3 m/s | 500–1,500 THB | Missed storm warning; incorrect CLR spore dispersal estimate |
| **Leaf Wetness** | Qualitative ±1 level | 2,000–5,000 THB | Missed CLR infection window or unnecessary fungicide application |

The total cost of uncalibrated sensors across a 10-rai farm can easily reach **15,000–40,000 THB per season** — more than the entire cost of the IoT system itself. Calibration is not optional; it is the difference between a system that pays for itself and one that becomes an expensive paperweight.

### Common Calibration Mistakes in Thailand

1. **Calibrating in AC then deploying in 35°C field**: A sensor calibrated at 25°C in an air-conditioned office will drift significantly when deployed in a field where temperatures reach 35–40°C. Always calibrate at or near operating temperature.
2. **Using tap water instead of distilled water**: Thailand's tap water contains dissolved minerals (hardness varies 50–300 ppm across provinces) that affect electrical conductivity and pH readings. Always use distilled water (น้ำกลั่น, available at 7-Eleven and pharmacies for 15–25 THB per bottle).
3. **Ignoring soil-type variation**: Calibration performed in clay soil does not transfer to sandy loam. Northern Thailand farms commonly have 2–3 distinct soil types across a single plot. Calibrate each zone separately.
4. **One-time calibration, never recalibrating**: Sensors drift over time. Soil moisture sensors shift as the PCB coating degrades. Humidity sensors drift with contamination (dust, pollen). pH probes degrade with use. Establish a recurring calibration schedule.
5. **Calibrating only at two points**: A simple two-point (dry + wet) calibration assumes a linear sensor response. Most sensors are non-linear, especially at the extremes. Use at least 3–5 calibration points for research-grade accuracy.

---

## Soil Moisture Calibration

### Why Soil-Specific Calibration is Essential

The Capacitive V1.2 soil moisture sensor measures the dielectric permittivity of the soil-water-air mixture around its sensing element. The raw analog output (0–4095 on ESP32's 12-bit ADC) corresponds to a voltage that increases with soil water content — but the relationship between voltage and volumetric water content (VWC) depends on soil texture, bulk density, salinity, and temperature. A reading of 2100 (raw ADC) might correspond to 25% VWC in sandy loam, 35% VWC in clay, and 30% VWC in loam. Without soil-specific calibration, the VWC values reported by the system are merely rough estimates with ±15–25% error.

### Gravimetric Method: Step-by-Step

The gravimetric method is the gold standard for soil moisture calibration. It involves collecting soil samples, weighing them wet, oven-drying them, and weighing them dry. The difference gives the gravimetric water content, which is then converted to VWC using bulk density. While more labor-intensive than a simple two-point calibration, it provides accuracy of ±3–5% VWC — sufficient for irrigation scheduling decisions.

#### Equipment Required

| Item | Price (THB) | Where to Buy | Notes |
|------|-------------|--------------|-------|
| Digital kitchen scale (0.1g precision) | 250–500 | Shopee, Lazada, Big C | Must measure to 0.1g; cheaper 1g scales are inadequate |
| Soil sampling rings (100 mL, stainless) | 200–400 | AliExpress, science supply shops | Alternatively use a known-volume container |
| Oven (for drying) | 0 (use kitchen oven) | — | Must maintain 105°C for 24 hours; inform household first |
| Aluminum foil or drying trays | 20–50 | 7-Eleven, Tesco Lotus | For holding soil samples in oven |
| Distilled water (น้ำกลั่น) | 15–25/bottle | 7-Eleven, pharmacies | For preparing saturated samples |
| Zip-lock bags (various sizes) | 30–50/pack | 7-Eleven, Makro | For storing samples |
| Marker pen (waterproof) | 15–25 | 7-Eleven | For labeling samples |
| Trowel or soil corer | 50–150 | Local hardware shop | For collecting samples at depth |
| **Total calibration kit** | **~600–1,200 THB** | | One-time purchase; reusable for years |

#### Step-by-Step Procedure

**Step 1: Identify soil types on your farm**

Walk the farm and collect surface soil from 5–10 locations. Squeeze a handful of moist soil: if it forms a sticky ball that holds its shape, it's clay; if it forms a ball that crumbles easily, it's loam; if it won't form a ball at all, it's sandy. Northern Thailand coffee farms typically have:

| Soil Type | Provinces Where Common | Characteristics | Typical VWC Range |
|-----------|----------------------|-----------------|-------------------|
| **Clay** | Chiang Mai lowlands, Lampang | Sticky when wet; hard when dry; slow drainage; dark red or gray | 35–55% at field capacity |
| **Loam** | Chiang Rai, Nan valleys | Crumbly; good drainage; dark brown; ideal for coffee | 25–40% at field capacity |
| **Sandy loam** | Chiang Mai slopes, Mae Hong Son ridges | Gritty; fast drainage; light brown; common on hillsides | 15–30% at field capacity |
| **Forest humus** | Under shade trees, all provinces | High organic matter; spongy; dark; excellent for Arabica | 30–50% at field capacity |

**Step 2: Collect calibration samples (3–5 moisture levels per soil type)**

For each soil type, prepare samples at different moisture levels:

1. **Air-dry**: Spread soil thinly in the sun for 2–3 days. Stir daily. This represents the lower bound (~0–5% VWC).
2. **Low moisture**: Add a small amount of distilled water to air-dry soil, mix thoroughly, seal in a zip-lock bag for 24 hours to equilibrate. Target: field soil that feels barely moist.
3. **Medium moisture**: Add more water. Target: soil that forms a ball when squeezed but breaks apart easily.
4. **High moisture**: Add water until soil is at field capacity — wet but not dripping. Target: soil that forms a sticky ball.
5. **Saturated**: Add water until the soil is visibly wet and water pools on the surface. This represents the upper bound.

**Step 3: Take sensor readings at each moisture level**

For each prepared sample:

1. Insert the Capacitive V1.2 sensor fully into the soil, ensuring good contact between the sensing element and soil (no air gaps).
2. Wait 30 seconds for the reading to stabilize.
3. Record the raw ADC value (0–4095) from the ESP32.
4. Take 3 readings, removing and reinserting the sensor each time. Average the results.
5. Record the reading in the calibration log.

**Step 4: Determine gravimetric water content (GWC)**

For each sample where you took a sensor reading:

1. Fill a soil sampling ring (known volume, e.g., 100 mL) with the same soil, gently compacting to field density.
2. Weigh the ring + wet soil: **W_wet** (grams)
3. Empty the soil into an aluminum tray, break up clumps, and place in oven at 105°C for 24 hours.
4. Weigh the tray + dry soil: **W_dry** (grams)
5. Weigh the empty ring: **W_ring** (grams)
6. Weigh the empty tray: **W_tray** (grams)
7. Calculate: **GWC = (W_wet - W_ring - W_dry + W_tray) / (W_dry - W_tray) × 100%**

**Step 5: Convert GWC to VWC**

VWC = GWC × (Bulk Density / Water Density)

Where bulk density = (W_dry - W_tray) / Volume_of_ring

Typical bulk densities for Northern Thailand soils:

| Soil Type | Bulk Density (g/cm³) | Notes |
|-----------|---------------------|-------|
| Clay | 1.1–1.3 | Compacted clay can reach 1.5 |
| Loam | 1.2–1.4 | Ideal coffee soil |
| Sandy loam | 1.3–1.6 | Higher bulk density = more mineral, less pore space |
| Forest humus | 0.6–0.9 | Low bulk density due to high organic matter |

**Step 6: Build calibration curve**

Plot the raw ADC values (x-axis) against calculated VWC (y-axis) for all 3–5 moisture levels. Fit a curve (polynomial or linear, depending on the sensor's response). The calibration equation is then programmed into the ESP32 firmware.

Example calibration results for a loam soil in Chiang Mai:

| Moisture Level | Raw ADC (avg) | GWC (%) | Bulk Density (g/cm³) | VWC (%) |
|---------------|--------------|---------|---------------------|---------|
| Air-dry | 3750 | 3.2% | 1.30 | 4.2% |
| Low | 3050 | 12.5% | 1.28 | 16.0% |
| Medium | 2400 | 22.1% | 1.25 | 27.6% |
| High | 1850 | 31.8% | 1.22 | 38.8% |
| Saturated | 1450 | 40.5% | 1.18 | 47.8% |

The resulting calibration equation (2nd-order polynomial): `VWC = 0.0000152 × ADC² - 0.148 × ADC + 372.5`

### Quick Two-Point Calibration (Field Method)

For farmers who cannot perform the full gravimetric method, a simplified two-point calibration provides acceptable accuracy (±5–10% VWC) for irrigation scheduling:

1. **Dry point**: Hold the sensor in dry air. Record ADC value → this is "0% VWC" (approximately).
2. **Wet point**: Submerge the sensor in a container of the farm's soil saturated with distilled water. Record ADC value → this is "100% VWC" (approximately — actual saturation depends on soil type).
3. **Linear mapping**: `VWC = (ADC_dry - ADC_raw) / (ADC_dry - ADC_wet) × 100`

> **Warning**: The two-point method overestimates VWC in clay soils (true saturation may be 55% VWC, not 100%) and underestimates in sandy soils (saturation may be 45%). Always note that two-point VWC is "relative" rather than absolute. For critical irrigation decisions, perform the full gravimetric calibration at least once and use the two-point method for periodic recalibration.

---

## Temperature & Humidity Calibration

### SHT31 Offset Correction

The Sensirion SHT31 is the recommended air temperature and humidity sensor (see [[Temperature-Sensors]] and [[Humidity-Sensors]]). Out of the box, the SHT31 has a typical accuracy of ±0.3°C for temperature and ±2% RH for humidity — good enough for most coffee farm applications. However, long-term drift, contamination from dust and agricultural chemicals, and installation effects (heat from the ESP32, solar radiation on the enclosure) can introduce systematic offsets that accumulate over time.

### Temperature Calibration Using Reference Thermometer

The simplest field calibration method compares the SHT31 reading against a calibrated reference thermometer:

| Equipment | Price (THB) | Where to Buy | Notes |
|-----------|-------------|--------------|-------|
| Reference digital thermometer (±0.1°C) | 300–800 | Shopee (search: "thermometer 0.1") | Look for calibrated or NIST-traceable models |
| Alternatively: glass mercury thermometer | 100–200 | Pharmacy, science supply | Accurate but fragile; no battery needed |

**Procedure**:

1. Place both the SHT31 sensor and the reference thermometer in the same location, away from direct sunlight and heat sources.
2. Wait 15 minutes for thermal equilibration.
3. Record both readings simultaneously.
4. Repeat at 3 different times of day (early morning, midday, evening) to capture a range of temperatures.
5. Calculate the average offset: `Offset = SHT31_reading - Reference_reading`
6. Apply the offset correction in firmware: `Corrected_temp = SHT31_reading - Offset`

Typical offsets for SHT31 in Northern Thailand field conditions:

| Condition | Typical Offset | Cause |
|-----------|---------------|-------|
| Inside IP65 enclosure (no ventilation) | +1.0 to +3.0°C | Greenhouse effect; solar heating of enclosure |
| Inside Stevenson screen (proper ventilation) | +0.2 to +0.8°C | Minor radiative heating |
| Exposed (no enclosure) | ±0.1 to ±0.3°C | Close to true reading but sensor at risk |
| Near ESP32 (within 5cm) | +0.5 to +1.5°C | Heat from ESP32 during WiFi/LoRa TX |

> **Critical lesson**: The enclosure itself is often the largest source of temperature error. Always use a **ventilated radiation shield** (DIY Stevenson screen or commercial) for air temperature measurements. A simple DIY shield can be made from stacked white plastic plates separated by 1cm spacers — cost approximately 30–50 THB.

### Humidity Calibration Using Saturated Salt Solutions

Saturated salt solutions provide known, stable relative humidity reference points at a given temperature. This is the standard field method for calibrating humidity sensors:

| Salt | Stable RH at 25°C | Price (THB) | Where to Buy | Notes |
|------|-------------------|-------------|--------------|-------|
| **Lithium Chloride (LiCl)** | 11.3% | 150–300 | Chemical supply, Lazada | Low humidity reference point |
| **Magnesium Chloride (MgCl₂)** | 32.8% | 100–200 | Chemical supply, Lazada | |
| **Sodium Chloride (NaCl)** | 75.3% | 15–25 | 7-Eleven (table salt) | ⭐ Easiest to obtain; kitchen salt works |
| **Potassium Chloride (KCl)** | 84.3% | 50–100 | Pharmacy, chemical supply | |
| **Potassium Nitrate (KNO₃)** | 93.6% | 50–100 | Chemical supply | High humidity reference point |

**Minimum calibration**: Use NaCl (75.3% RH) as a single-point check. If the SHT31 reads within ±3% of 75.3%, it is within specification.

**Recommended calibration**: Use LiCl (11.3%) and NaCl (75.3%) as two-point calibration.

**Procedure**:

1. Place approximately 2 tablespoons of salt in a small airtight container (e.g., Lock&Lock box, ~50 THB at Big C).
2. Add just enough distilled water to wet the salt — you want a slurry, not a pool. The salt should be damp but not dissolved.
3. Place the SHT31 sensor inside the container, suspended above the salt solution (do not let it touch the salt or water).
4. Seal the container and wait **4–6 hours** for the humidity to stabilize. (At 35°C field temperature, equilibrium may take only 2–3 hours; at 20°C, allow 6–8 hours.)
5. Record the SHT31 RH reading and compare to the known equilibrium RH for that salt at the current temperature.
6. Calculate offset and apply correction.

**Temperature correction**: The equilibrium RH of salt solutions varies with temperature. For NaCl: RH = 75.3% at 25°C, but 75.1% at 30°C and 75.5% at 20°C. This variation is small (<1% RH) for the accuracy levels needed in coffee farming, but reference tables are available online for precise work.

---

## Light Sensor Calibration

### BH1750 Calibration Against Reference Lux Meter

The BH1750 light sensor (see [[Light-Sensors]]) is used to measure shade percentage — the ratio of light under shade trees to light in the open. The dual-sensor method (one sensor in open area, one under canopy) cancels out most calibration errors because both sensors share the same manufacturing tolerance. However, individual sensor offsets still matter when absolute lux values are needed (e.g., comparing to PAR research data).

| Equipment | Price (THB) | Where to Buy | Notes |
|-----------|-------------|--------------|-------|
| Reference lux meter (digital) | 500–2,000 | Shopee (search: "lux meter") | Look for ±3% accuracy models |
| Professional lux meter (e.g., Extech) | 3,000–8,000 | Specialized instrument suppliers | For research-grade work |

**Field Procedure**:

1. On a clear sunny day between 11:00–13:00 (when solar angle is highest and most consistent), place the BH1750 sensor and the reference lux meter side by side in an open area with no shade.
2. Record both readings simultaneously. Take 5 readings at 30-second intervals and average.
3. Move both sensors under a shade tree. Record 5 more readings.
4. Move to a partially shaded location. Record 5 more readings.
5. Calculate the calibration factor: `Factor = Reference_lux / BH1750_lux`
6. Apply in firmware: `Corrected_lux = BH1750_reading × Factor`

**Typical BH1750 calibration results in Northern Thailand**:

| Condition | BH1750 Raw (lux) | Reference (lux) | Factor | Shade % |
|-----------|------------------|-----------------|--------|---------|
| Full sun (open area) | 85,000 | 95,000 | 1.12 | 0% |
| Under Macadamia shade tree | 38,000 | 42,500 | 1.12 | 55% |
| Under dense Pluang canopy | 15,000 | 16,800 | 1.12 | 82% |
| Inside shade net house (50%) | 42,000 | 47,000 | 1.12 | 50% |

> **Note for shade percentage**: When using the dual-sensor method, the calibration factor cancels out: `Shade% = (1 - Canopy_sensor / Open_sensor) × 100`. This is why the dual-sensor approach is preferred — it is inherently self-calibrating. Calibrate individual BH1750 sensors only when you need absolute lux or PPFD values.

---

## Soil pH Sensor Calibration

### Why pH Probes Degrade Fast in Field Use

Glass electrode pH probes are the most fragile and fastest-degrading sensors in the coffee IoT toolkit. The glass membrane at the tip of the probe is permeable to hydrogen ions, which is how it measures pH — but this same permeability makes it vulnerable to contamination and physical damage. In soil deployment, the glass membrane is attacked by:

- **Clay particles** that coat and scratch the glass surface
- **Organic acids** from decomposing leaf litter that shift the reference junction potential
- **Aluminum ions** (Al³⁺) in acidic Thai mountain soils that poison the reference electrode
- **Temperature cycling** (5°C at night to 35°C during the day) that stresses the glass-to-seal bond

A new pH probe may be accurate to ±0.01 pH out of the box, but after 1–2 weeks of continuous burial in Northern Thailand soil, drift of ±0.5–1.0 pH is typical. After 1–2 months, the probe may read 1–2 pH units off. **This is why we recommend periodic spot-check measurement rather than continuous burial** (see [[Soil-pH-Sensors]]).

### Two-Point Calibration with Buffer Solutions

pH sensor calibration requires at least two buffer solutions spanning the expected measurement range:

| Buffer pH | Price (THB) | Where to Buy | Color Code | Notes |
|-----------|-------------|--------------|------------|-------|
| **pH 4.0** | 50–120 | Shopee, science supply shops, Lazada | Red | Slightly below coffee soil range; essential low-point |
| **pH 7.0** | 50–120 | Shopee, science supply shops, Lazada | Green | Mid-point; closest to most coffee soils |
| pH 10.0 | 50–120 | Shopee, science supply shops | Blue | Not needed for coffee (soils are acidic) |

**Recommended**: Use pH 4.0 and pH 7.0 buffers for coffee farm calibration. Northern Thailand mountain soils range from pH 4.0 to 6.5, so these two points bracket the working range.

**Procedure**:

1. Rinse the pH probe with distilled water. Gently blot dry with a clean tissue (do not rub the glass bulb).
2. Immerse the probe in pH 7.0 buffer solution. Wait 60 seconds for the reading to stabilize.
3. Adjust the meter's calibration to read 7.0 (or record the raw reading for offset calculation in firmware).
4. Rinse the probe with distilled water again.
5. Immerse in pH 4.0 buffer. Wait 60 seconds. Adjust or record.
6. Rinse and store the probe in storage solution (3M KCl, usually included with the probe).

**Critical field tip**: Perform pH calibration **at field temperature**. Buffer solution pH values are temperature-dependent: pH 7.0 buffer is actually pH 7.00 at 25°C but pH 7.02 at 15°C and pH 6.97 at 35°C. Most modern pH meters have automatic temperature compensation (ATC), but if yours does not, correct manually using the buffer's temperature table (printed on the bottle).

### pH Probe Maintenance

| Action | Frequency | Cost (THB) | Notes |
|--------|-----------|------------|-------|
| Recalibrate with buffers | Before each spot-check session | 0 (buffers reusable 6–12 months) | Essential; drift is rapid |
| Replace storage solution (3M KCl) | Monthly | 50–100 | Never let the probe dry out |
| Replace probe | Every 6–12 months | 200–600 | Glass electrodes have finite lifespan |
| Clean junction | When response becomes slow | 0 (use distilled water) | Gently rinse; never scrub the glass bulb |

---

## Rainfall Sensor Calibration

### Tipping Bucket Volume Verification

Tipping bucket rain gauges (see [[Rainfall-Sensors]]) measure rainfall by counting the number of times a small bucket tips. Each tip represents a known volume of water — typically 0.2mm or 0.5mm of rainfall per tip. However, the factory calibration can drift due to wear on the pivot mechanism, insect nests in the funnel, or deformation of the bucket from heat or impact.

**Equipment**: Graduated cylinder (10 mL, 0.1 mL graduations) — ~50–80 THB at pharmacies or science supply shops.

**Procedure**:

1. Measure the collector funnel diameter (typically 100mm or 200mm).
2. Calculate the volume of water equivalent to 10mm of rainfall:
   - For 100mm diameter funnel: Volume = π × (50mm)² × 10mm = 78.5 mL
   - For 200mm diameter funnel: Volume = π × (100mm)² × 10mm = 314.2 mL
3. Slowly pour this volume of distilled water through the funnel at a rate that mimics moderate rainfall (~20–30 mL/minute). Use a drip bottle or syringe for control.
4. Count the number of tips. Expected tips = 10mm / tip_volume. For a 0.2mm gauge: 50 tips. For a 0.5mm gauge: 20 tips.
5. Calculate actual tip volume: `Volume_poured / Number_of_tips`
6. Update the firmware with the measured tip volume.

**Example**: For a 100mm gauge calibrated at 0.2mm/tip, pouring 78.5 mL should produce 50 tips. If you count 47 tips, the actual tip volume is 78.5/47 = 1.67 mL/tip, corresponding to 0.213mm/tip — a 6.5% error worth correcting.

### Common Rainfall Calibration Issues in Thailand

| Issue | Cause | Effect | Fix |
|-------|-------|--------|-----|
| **Under-reading in heavy rain** | Bucket can't tip fast enough; water spills | 10–30% under-reporting during storms | Accept as inherent limitation; note in data |
| **Spider webs in mechanism** | Tropical spiders love small enclosed spaces | Bucket sticks; false zero-rain readings | Inspect and clean monthly; apply silicone spray |
| **Leaf debris in funnel** | Shade trees drop leaves | Clogged funnel; no water reaches bucket | Install mesh screen over funnel; clean weekly |
| **Evaporation before tip** | Small amounts of dew/light drizzle evaporate | Under-reading light rain events | Accept; dew measurement is better served by leaf wetness sensor |
| **Splash-out** | Heavy drops splash out of bucket | Under-reading by 5–10% | Ensure inner funnel is intact; consider wind shield |

---

## Wind Sensor Calibration

### Cup Anemometer Cross-Check

Cup anemometers (see [[Wind-Sensors]]) are mechanical devices with bearings that wear over time. Dust, rain, and insects all accelerate bearing degradation. A worn bearing causes the cups to spin slower than they should, leading to systematic under-reading of wind speed.

**Equipment**: Handheld digital anemometer — 300–800 THB on Shopee Thailand (search: "anemometer digital").

**Procedure**:

1. On a moderately windy day (2–5 m/s), hold the handheld anemometer at the same height as the installed cup anemometer.
2. Hold it within 1 meter laterally (not directly behind or in front of the installed sensor, which would create turbulence).
3. Record simultaneous readings from both instruments at 10-second intervals for 5 minutes (30 data points).
4. Calculate the average and standard deviation for each instrument.
5. If the installed sensor consistently reads lower than the handheld by more than 0.5 m/s, it likely has bearing wear and should be replaced.

**Acceptable tolerance**: ±1 m/s for agricultural applications. Wind speed is used primarily for storm warning and CLR spore dispersal estimation, where ±1 m/s is adequate for decision-making.

### Bearing Maintenance

| Action | Frequency | Cost (THB) |
|--------|-----------|------------|
| Spin test (give cups a flick — they should coast 30+ seconds) | Monthly | 0 |
| Clean bearings with compressed air | Quarterly | 0 (if you have a compressor) |
| Replace bearings | Annually or when spin test fails | 50–100 ( bearings from bearing shop) |
| Replace entire anemometer | Every 2–3 years | 200–500 |

---

## Leaf Wetness Calibration

### Qualitative Validation by Visual Inspection

Leaf wetness sensors (see [[Leaf-Wetness-Sensors]]) measure the presence and duration of free water on leaf surfaces — the critical input for coffee leaf rust (CLR) infection risk models. Unlike other sensors that measure continuous physical quantities, leaf wetness is inherently binary (wet or dry) with a duration component. Calibration is therefore qualitative rather than quantitative.

**Procedure**:

1. Every morning at 6:00–7:00 AM (before the sun dries the dew), check the actual coffee leaves near the sensor for visible moisture.
2. Record your observation: **Wet** (visible water droplets or film on leaves), **Damp** (leaves feel moist but no visible water), or **Dry** (no moisture).
3. Compare your observation with the sensor's wet/dry reading at the same time.
4. If the sensor consistently reads "dry" when leaves are visibly wet (or vice versa), adjust the threshold value in firmware.

### Visual Inspection Schedule

| Time | Observation | Sensor Reading | Match? | Notes |
|------|------------|----------------|--------|-------|
| 06:00 | Wet (dew) | WET | ✅ | Expected during cool season mornings |
| 08:00 | Damp (drying) | WET | ⚠️ | Sensor may lag; adjust threshold if persistent |
| 10:00 | Dry | DRY | ✅ | |
| 14:00 | Dry | DRY | ✅ | |
| 16:00 (after rain) | Wet | WET | ✅ | |
| 18:00 | Damp | WET | ⚠️ | Sensor stays wet longer than leaves — may need threshold adjustment |

**Target accuracy**: The leaf wetness sensor should agree with visual observation at least **85% of the time**. If agreement is below 85%, adjust the analog threshold or reposition the sensor (angle, height, exposure). The most common calibration issue is the sensor staying "wet" longer than actual leaves because the sensor surface retains water differently than a waxy coffee leaf.

---

## Calibration Schedule

### Recommended Recalibration Intervals

| Sensor | Calibration Method | Recommended Interval | Time Required | Who Should Do It |
|--------|-------------------|---------------------|---------------|-----------------|
| **Soil Moisture** (Capacitive V1.2) | Two-point (field) | **Monthly** | 15 min per sensor | Farmer or local technician |
| **Soil Moisture** (Capacitive V1.2) | Gravimetric (full) | **Every 6 months** | 4–6 hours (includes oven drying) | Technician or extension worker |
| **Air Temperature** (SHT31) | Reference thermometer comparison | **Quarterly** | 30 min | Farmer or technician |
| **Air Humidity** (SHT31) | Saturated salt (NaCl) | **Quarterly** | 6–8 hours (mostly waiting) | Technician |
| **Light / Shade** (BH1750) | Reference lux meter | **Bi-annually** | 1 hour | Technician |
| **Soil pH** (portable probe) | Buffer solutions (pH 4 + 7) | **Before each spot-check** | 10 min | Farmer |
| **Rainfall** (tipping bucket) | Volume verification | **Quarterly** | 30 min | Technician |
| **Wind** (cup anemometer) | Handheld cross-check | **Bi-annually** | 30 min | Technician |
| **Leaf Wetness** | Visual inspection | **Weekly during rainy season** | 5 min | Farmer |
| **NPK** (RS485) | DOA lab test comparison | **Every 3–6 months** | 1–2 weeks turnaround | DOA lab (200–500 THB/test) |

### Seasonal Calibration Calendar (Northern Thailand)

| Month | Season | Priority Calibration Actions |
|-------|--------|------------------------------|
| **January** | Cool-Dry | Soil moisture two-point (pre-irrigation season); pH probe calibration (pre-liming season) |
| **February** | Cool-Dry → Hot | Temperature offset check (before heat stress period); leaf wetness threshold adjustment |
| **March** | Hot-Dry | All sensor quarterly calibration round; rainfall bucket check (before rainy season) |
| **April** | Hot-Dry (burning season) | Clean all sensors (heavy dust and PM2.5); check enclosure ventilation |
| **May** | Rainy season start | Soil moisture gravimetric calibration (soil structure changes with first rains); humidity salt calibration |
| **June** | Rainy | Weekly leaf wetness visual validation; spider check on rain gauge |
| **July** | Rainy | Mid-season quarterly calibration; rainfall bucket volume recheck |
| **August** | Rainy (peak CLR risk) | Verify humidity sensor accuracy (CLR model depends on it); leaf wetness threshold fine-tuning |
| **September** | Rainy | Soil moisture gravimetric calibration (post-heavy-rain soil compaction) |
| **October** | Rainy → Cool | Clean all sensors; replace any degraded components before harvest monitoring |
| **November** | Cool-Dry (harvest) | All sensor quarterly calibration round; temperature/humidity calibration for drying monitoring |
| **December** | Cool-Dry | Frost season: verify temperature sensor accuracy at low end; battery voltage calibration |

---

## Field Calibration Log Template

Use this table (printed or on a mobile device) to record every calibration event. Consistent logging enables tracking of sensor drift over time and identifies sensors that need replacement.

### Soil Moisture Calibration Log

| Date | Node ID | Sensor ID | Soil Type | ADC (dry air) | ADC (saturated) | ADC (field check) | Calculated VWC | Method | Technician | Notes |
|------|---------|-----------|-----------|---------------|-----------------|-------------------|---------------|--------|------------|-------|
| 2026-05-13 | NODE03 | SM01 | Loam | 3780 | 1420 | 2380 | 28.3% | Two-point | Somchai | Applied new calibration |
| 2026-05-13 | NODE03 | SM02 | Sandy loam | 3750 | 1350 | 2650 | 22.1% | Two-point | Somchai | Different soil type, separate calibration |
| | | | | | | | | | | |

### Air Sensor Calibration Log

| Date | Node ID | Sensor | Reference Reading | Sensor Reading | Offset | Method | Technician | Notes |
|------|---------|--------|-------------------|----------------|--------|--------|------------|-------|
| 2026-05-13 | NODE03 | SHT31-TEMP | 24.1°C | 24.8°C | +0.7°C | Ref thermometer | Somchai | Offset from enclosure heating |
| 2026-05-13 | NODE03 | SHT31-RH | 75.3% | 73.1% | -2.2% | NaCl salt | Somchai | Within spec |
| | | | | | | | | |

### pH Calibration Log

| Date | Probe ID | pH 4.0 Reading | pH 7.0 Reading | Slope | Offset | Buffer Temp | Technician | Notes |
|------|----------|---------------|----------------|-------|--------|-------------|------------|-------|
| 2026-05-13 | PH-01 | 4.02 | 7.01 | 99.7% | +0.01pH | 28°C | Somchai | Probe in good condition |
| | | | | | | | | |

### Rainfall Calibration Log

| Date | Gauge ID | Funnel Ø (mm) | Volume Poured (mL) | Tips Counted | Calculated mm/tip | Expected mm/tip | Error % | Technician | Notes |
|------|----------|---------------|-------------------|-------------|-------------------|-----------------|---------|------------|-------|
| 2026-05-13 | RG-01 | 100 | 78.5 | 48 | 0.208 | 0.200 | +4.0% | Somchai | Acceptable; updated firmware |
| | | | | | | | | | |

---

## Cost of Calibration Equipment

### Complete Calibration Kit

| Item | Price (THB) | Essential? | Notes |
|------|-------------|------------|-------|
| Digital scale (0.1g) | 250–500 | ✅ Yes | For gravimetric soil moisture calibration |
| Reference thermometer (±0.1°C) | 300–800 | ✅ Yes | For temperature calibration |
| NaCl (table salt) | 15–25 | ✅ Yes | For humidity calibration (75.3% RH) |
| pH 4.0 buffer solution | 50–120 | ✅ Yes | For pH probe calibration |
| pH 7.0 buffer solution | 50–120 | ✅ Yes | For pH probe calibration |
| Distilled water (น้ำกลั่น) | 15–25/bottle | ✅ Yes | For all wet calibrations; buy 3–4 bottles |
| Graduated cylinder (10 mL) | 50–80 | ✅ Yes | For rainfall calibration |
| Handheld anemometer | 300–800 | ⚠️ Recommended | For wind sensor cross-check |
| Reference lux meter | 500–2,000 | ⚠️ Recommended | For light sensor calibration |
| MgCl₂ salt | 100–200 | Optional | Second humidity calibration point (32.8% RH) |
| KCl salt | 50–100 | Optional | High humidity calibration point (84.3% RH) |
| Soil sampling rings | 200–400 | Optional | For precise gravimetric calibration |
| Lock&Lock containers (3 pack) | 80–150 | ✅ Yes | For salt solution humidity calibration |
| Waterproof marker | 15–25 | ✅ Yes | For labeling |
| Zip-lock bags (various) | 30–50 | ✅ Yes | For soil sample storage |
| **Total (essential kit)** | **~850–1,800 THB** | | One-time purchase; reusable for years |
| **Total (full kit with optional items)** | **~2,200–5,400 THB** | | For farms wanting professional-grade calibration |

### Ongoing Calibration Costs

| Item | Annual Cost (THB) | Frequency |
|------|-------------------|-----------|
| pH buffer solutions (replacement) | 100–240 | 2–4× per year |
| Distilled water | 180–300 | Monthly use |
| pH probe replacement | 200–600 | 1–2× per year |
| Anemometer bearings | 50–100 | 1× per year |
| **Total annual calibration cost** | **~530–1,240 THB** | |

This annual calibration cost of roughly 500–1,200 THB is negligible compared to the 15,000–40,000 THB in potential losses from uncalibrated sensors. **Calibration pays for itself many times over.**

---

## Practical Recommendations

1. **Calibrate soil moisture sensors for each distinct soil zone on your farm** — Northern Thailand farms commonly have 2–3 soil types (clay in low areas, loam on mid-slopes, sandy loam on ridges). Perform at least a two-point calibration for each zone. The 30 minutes per zone investment prevents thousands of baht in irrigation mistakes. See [[Soil-Moisture-Sensors]] for hardware details.

2. **Use the dual-sensor shade method to avoid light sensor calibration** — By placing one BH1750 in the open and one under the canopy, shade percentage is calculated as a ratio that cancels individual sensor offsets. This eliminates the need for an expensive reference lux meter on most farms. See [[Light-Sensors]] for the dual-sensor setup.

3. **Never bury pH probes — use periodic spot-checks instead** — Glass pH electrodes degrade within days to weeks when buried in soil, especially in Northern Thailand's acidic mountain soils. Instead, use a portable pH meter for spot-checks at 5–10 locations, performed weekly during the growing season and monthly otherwise. Calibrate the portable meter before each use with pH 4.0 and 7.0 buffers. See [[Soil-pH-Sensors]] for the full rationale.

4. **Check rainfall gauge for spider webs monthly** — In Northern Thailand's tropical climate, spiders build webs inside tipping bucket mechanisms with remarkable speed. A single web strand can prevent the bucket from tipping, causing the system to report zero rainfall during storms. Open the gauge and inspect the mechanism monthly during the rainy season. A can of compressed air or a gentle brush removes most obstructions. See [[Rainfall-Sensors]] for maintenance procedures.

5. **Perform gravimetric soil moisture calibration at least twice per year** — Once before the dry season (November) to ensure irrigation scheduling accuracy, and once after the first major rains (June) to recalibrate for the changed soil structure. Soil that has been wet and compacted by monsoon rains has different bulk density and water-holding characteristics than soil that has been dry and cracked during the hot season.

6. **Build a DIY Stevenson screen for temperature sensors** — A simple radiation shield made from stacked white plastic plates with 1cm spacers (total cost ~30–50 THB) reduces solar heating errors from +3°C to less than +0.5°C. This is the single most impactful improvement you can make to air temperature accuracy. Plans are widely available online; search for "DIY Stevenson screen plastic plates."

7. **Keep a calibration log and review it annually** — The calibration log is not just paperwork — it reveals trends. If a soil moisture sensor's dry-point ADC value shifts from 3780 to 3650 over 6 months, the sensor's coating is degrading and it will need replacement soon. If a humidity sensor's offset grows from +1% to +5% over a year, contamination is building up and the sensor needs cleaning or replacement. Without a log, these trends are invisible until the sensor fails catastrophically.

8. **Validate IoT NPK readings with DOA lab tests every 3–6 months** — Budget NPK sensors (see [[NPK-Sensors]]) have 50–200% error and cannot be reliably calibrated. Use them only for relative trend monitoring and always cross-validate with a proper soil test from the Department of Agriculture (DOA) laboratory. A DOA soil test costs 200–500 THB and provides N, P, K, pH, and organic matter values with laboratory-grade accuracy.

---

## Related Topics

- [[Soil-Moisture-Sensors]] — Capacitive V1.2 sensor details and installation
- [[Temperature-Sensors]] — SHT31 specifications and enclosure recommendations
- [[Humidity-Sensors]] — SHT31 humidity measurement and disease risk applications
- [[Soil-pH-Sensors]] — Why continuous pH measurement fails; spot-check approach
- [[NPK-Sensors]] — Budget sensor limitations and DOA lab test alternative
- [[Light-Sensors]] — BH1750 dual-sensor shade measurement method
- [[Rainfall-Sensors]] — Tipping bucket specifications and maintenance
- [[Wind-Sensors]] — Cup anemometer deployment and bearing maintenance
- [[Leaf-Wetness-Sensors]] — DIY and commercial leaf wetness options
- [[Sensor-Metrics-Thresholds]] — Threshold definitions that depend on accurate calibration
- [[Installation-Guide]] — Physical deployment instructions affecting calibration accuracy
- [[System-Cost-Estimate]] — Total system cost including calibration equipment

---

## References

1. Decagon Devices (now METER Group) — Soil Moisture Sensor Calibration Guide: gravimetric method for capacitive sensors
2. Sensirion SHT31 Datasheet — Accuracy specifications, long-term drift, and reconditioning procedures
3. ASTM E104-02 — Standard Practice for Maintaining Constant Relative Humidity by Means of Aqueous Solutions (saturated salt method)
4. Department of Agriculture (DOA), Thailand — Soil testing protocols and laboratory services: doa.go.th
5. Royal Project Foundation — Soil management recommendations for Northern Thailand coffee farms
6. Bogena, H.R. et al. (2007) — Evaluation of a low-cost soil moisture sensor for wireless network applications, *Journal of Hydrology* 344:1-2
7. Apogee Instruments — Technical reference for PAR/lux measurement and calibration
8. ICAFE (Coffee Institute of Costa Rica) — Coffee leaf rust disease model: leaf wetness duration threshold validation
9. FAO — Soil description and classification for tropical soils: clay, loam, and sandy loam in Southeast Asia
10. Thailand Meteorological Department (TMD) — Rainfall measurement standards and gauge calibration protocols

---

*Last updated: 2026-05-13*
