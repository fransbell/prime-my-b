---
topic: Soil Management and Fertilization
phase: 04-Farmer-Knowledge
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [soil, fertilization, NPK, organic-matter, pH, compost, arabica, robusta, northern-thailand]
related: [[Cultivation-Best-Practices]], [[Pest-Disease-Management]], [[Soil-pH-Sensors]], [[NPK-Sensors]], [[Soil-Moisture-Sensors]]
---

# Soil Management and Fertilization

> **Summary**: Comprehensive guide to soil management and fertilization for coffee cultivation in Northern Thailand, covering ideal soil parameters, province-specific soil types, pH and organic matter management, NPK and micronutrient requirements, fertilizer costs in THB, a month-by-month fertilization calendar, soil conservation on steep highland slopes, and IoT sensor integration for precision nutrient monitoring.

---

## Overview

Soil is the foundation of every coffee farm. The health, structure, and nutrient content of the soil directly determine coffee tree vigor, cherry yield, bean density, and ultimately cup quality. For coffee farmers in Northern Thailand, soil management is especially critical because the highland terrain presents unique challenges: steep slopes prone to erosion, naturally acidic mountain soils, variable depth to bedrock, and a history of deforestation that has depleted organic matter in many areas. The Royal Project Foundation, which launched Arabica coffee as an opium replacement crop in the 1970s, identified soil fertility as one of the primary constraints on yield and quality across its project areas.

Soil management for coffee encompasses four interconnected domains: (1) maintaining the correct pH range so that nutrients remain available to plant roots, (2) building and preserving organic matter to feed the soil microbiome and improve water retention, (3) providing balanced macronutrient and micronutrient fertilization matched to each growth stage, and (4) conserving the soil itself against erosion on the steep slopes that characterize Northern Thailand's coffee-growing regions. IoT sensor systems for [[Soil-pH-Sensors]], [[NPK-Sensors]], and [[Soil-Moisture-Sensors]] enable real-time monitoring of key soil parameters, shifting fertilization from calendar-based guessing to data-driven precision. However, as documented in the NPK sensor analysis, budget IoT sensors provide only relative trend data; all fertilizer rate decisions should be cross-validated with Department of Agriculture (DOA) laboratory testing at 200-500 THB per test.

The economic case for proper soil management is compelling. Well-managed coffee farms in Northern Thailand can achieve 250-300 kg/rai (1,563-1,875 kg/ha), while poorly managed farms may yield only 80-120 kg/rai (500-750 kg/ha) — a difference attributable largely to soil fertility. At specialty-grade Arabica prices of 120-280 THB/kg green bean, the yield gap translates to a revenue difference of 15,600-53,600 THB/rai per year.

---

## Ideal Soil Parameters for Coffee

Coffee is a perennial shrub with a deep taproot and extensive feeder root system in the top 15-30 cm of soil. It demands well-drained, slightly acidic, friable soils with high organic matter content. The following tables present optimal ranges for Arabica and Robusta, reflecting the different native habitats of each species — Arabica evolved in the well-drained volcanic soils of the Ethiopian highlands, while Robusta adapted to the warmer, more variable lowland soils of sub-Saharan Africa.

### Arabica Optimal Soil Ranges

| Parameter | Optimal Range | Acceptable Range | Critical Threshold |
|-----------|--------------|------------------|--------------------|
| **pH (H2O)** | 5.0-6.0 | 4.5-6.5 | <4.0 (Al toxicity) or >7.5 (Fe deficiency) |
| **Organic Matter** | 3-5+% | 2-3% | <1.5% (severe depletion) |
| **CEC (cmol/kg)** | 10-25 | 5-10 | <5 (very low nutrient holding) |
| **Bulk Density (g/cm3)** | 0.8-1.2 | 1.2-1.4 | >1.5 (compacted; root growth inhibited) |
| **Drainage** | Well-drained | Moderately drained | Poorly drained (root rot risk) |
| **Effective Soil Depth** | >100 cm | 60-100 cm | <40 cm (shallow; drought risk) |
| **Sand:Silt:Clay** | Loam to sandy loam | Sandy clay loam to clay loam | Heavy clay (waterlogging) |
| **Available P (mg/kg)** | 15-30 | 8-15 | <5 (P deficiency) |
| **Available K (mg/kg)** | 200-400 | 100-200 | <80 (K deficiency) |
| **Ca (cmol/kg)** | 2-8 | 1-2 | <0.5 (Ca deficiency) |
| **Mg (cmol/kg)** | 0.5-3 | 0.3-0.5 | <0.2 (Mg deficiency) |

### Robusta Optimal Soil Ranges

| Parameter | Optimal Range | Acceptable Range | Critical Threshold |
|-----------|--------------|------------------|--------------------|
| **pH (H2O)** | 5.5-6.5 | 4.5-7.0 | <4.0 or >7.5 |
| **Organic Matter** | 2-4+% | 1.5-2% | <1.0% |
| **CEC (cmol/kg)** | 8-20 | 5-8 | <4 |
| **Bulk Density (g/cm3)** | 0.9-1.3 | 1.3-1.5 | >1.6 |
| **Drainage** | Well to moderately drained | Moderately well drained | Poorly drained |
| **Effective Soil Depth** | >80 cm | 50-80 cm | <30 cm |
| **Available P (mg/kg)** | 10-25 | 5-10 | <3 |
| **Available K (mg/kg)** | 150-350 | 80-150 | <60 |

Robusta is more tolerant of a wider pH range, lower organic matter, and shallower soils than Arabica, reflecting its adaptation to more diverse lowland environments. However, both species suffer yield and quality penalties when key parameters fall outside optimal ranges.

---

## Northern Thailand Soil Types

Northern Thailand's coffee-growing regions are dominated by upland soils formed on granite, schist, limestone, and volcanic parent materials. The steep topography creates complex soil catenas, with well-drained soils on ridges and upper slopes transitioning to deeper, more fertile colluvial soils in lower positions. Understanding the soil type on a particular farm is essential for making correct fertilization and management decisions.

### Major Soil Types in Coffee-Growing Areas

| Soil Type | Thai Classification | Characteristics | Provinces | Coffee Suitability |
|-----------|--------------------| ---------------|-----------|--------------------|
| **Red Latosol** | ดินแดง (Din Daeng) | Deep, well-drained, high Fe/Al oxides, pH 4.5-5.5, low base saturation, good structure | Chiang Mai (Mae Chaem, Chom Thong), Chiang Rai (Mae Suai), Mae Hong Son | Good for Arabica with liming and OM addition |
| **Reddish Brown Lateritic** | ดินน้ำตาลแดง (Din Nam Tan Daeng) | Moderate depth, lateritic layer, pH 4.5-5.5, low CEC, moderate drainage | Chiang Mai (Doi Pui, Doi Suthep), Chiang Rai (Doi Tung), Nan | Suitable with management; watch for hardpan |
| **Black Volcanic Soil** | ดินดำภูเขาไฟ (Din Dam Phu Khao Fai) | High OM, rich in minerals, excellent structure, pH 5.0-6.0, high CEC | Chiang Rai (Doi Chang) | Excellent; premium coffee terroir |
| **Alluvial Soil** | ดินตะกอนน้ำไหล (Din Ta Kon Nam Lai) | Deep, fertile, pH 5.5-7.0, high CEC, variable drainage | Valley floors across all provinces | Good for Robusta; Arabica only at elevation |
| **Sandy Loam / Gravelly Soil** | ดินทราย (Din Sai) | Shallow, low OM, rapid drainage, pH 4.5-5.5, low CEC | Ridge tops and steep slopes, all provinces | Marginal; requires heavy OM amendment |

### Province-Specific Soil Characteristics

| Province | Dominant Coffee Soil | pH Range | OM Typical % | Key Challenge |
|----------|---------------------|----------|--------------|---------------|
| **Chiang Mai** | Red Latosol, Reddish Brown Lateritic | 4.5-5.5 | 1.5-3.0% | Acidity and low base saturation on granite-derived slopes |
| **Chiang Rai** | Black volcanic (Doi Chang), Red Latosol (Doi Tung) | 4.5-6.0 | 2.0-5.0% | Variable; Doi Chang volcanic soil is exceptional, other areas acidic |
| **Mae Hong Son** | Red Latosol, sandy loam on limestone | 4.5-5.5 | 1.0-2.5% | Shallow soils on steep limestone terrain; rapid drainage |
| **Nan** | Reddish Brown Lateritic, alluvial valley soils | 4.5-6.0 | 1.5-3.5% | Lateritic hardpan at 40-60 cm depth limits root penetration |

The Doi Chang black volcanic soil is a notable outlier — its high mineral content and organic matter contribute to the distinctive cup profile of Doi Chang coffee, which earned EU Geographical Indication status in 2015. Farmers on this soil type can achieve excellent results with minimal liming, while those on Red Latosol must invest significantly in pH correction and organic matter building.

---

## pH Management

Soil pH is the single most important chemical parameter for coffee because it governs the availability of all essential nutrients. At the optimal pH range of 5.0-6.5, coffee plants can efficiently absorb N, P, K, Ca, Mg, and micronutrients. Below pH 4.5, aluminum and manganese become soluble at toxic concentrations, phosphorus is immobilized by iron and aluminum oxides, and calcium and magnesium are severely depleted. Above pH 7.0, iron, manganese, zinc, and boron become insoluble and unavailable, causing micronutrient deficiency symptoms even when total soil concentrations are adequate.

### Target pH Ranges

| Species | Target pH | Action if Below | Action if Above |
|---------|----------|----------------|-----------------|
| **Arabica** | 5.0-6.0 | Apply liming material | Apply sulfur or acidifying fertilizer |
| **Robusta** | 5.5-6.5 | Apply liming material | Apply sulfur or acidifying fertilizer |

### Liming Materials and Application Rates

| Material | CaCO3 Equivalent | Effective pH Rise per 100 kg/rai | Price (THB/50kg bag) | Application Rate for 0.5 pH Unit Rise |
|----------|-----------------|----------------------------------|-----------------------|---------------------------------------|
| **Agricultural Lime (CaCO3)** | 85-100% | 0.2-0.3 units | 150-250 THB | 150-300 kg/rai |
| **Dolomite (CaMg(CO3)2)** | 95-110% | 0.2-0.3 units | 180-300 THB | 150-250 kg/rai |
| **Quicklime (CaO)** | 150-180% | 0.3-0.5 units | 200-350 THB | 80-150 kg/rai |
| **Wood Ash** | 30-60% | 0.1-0.2 units | Free (byproduct) | 500-1,000 kg/rai |

Dolomite is generally preferred for coffee because it supplies both calcium and magnesium, two nutrients frequently deficient in Northern Thailand's acidic mountain soils. Agricultural lime is cheaper but provides only calcium. Quicklime is the most concentrated but must be applied carefully as it can burn plant roots if not thoroughly incorporated.

### Liming Timing and Application Guidelines

- **Best timing**: Apply lime 2-4 weeks before the onset of the rainy season (March-April) so that rainfall can incorporate it into the soil profile before the main growing period
- **Application method**: Broadcast evenly over the soil surface and lightly incorporate into the top 10-15 cm; avoid concentrating lime in the planting hole
- **Frequency**: Every 2-3 years, based on annual pH monitoring; avoid over-liming as pH above 6.5 creates micronutrient lockout
- **Cost per rai**: 450-1,500 THB per application (every 2-3 years), depending on soil acidity and material chosen

### Causes of Acidification in Northern Thailand

1. **Natural leaching**: High rainfall (1,200-2,500 mm/year) leaches basic cations (Ca, Mg, K) from the soil profile
2. **Chemical nitrogen fertilizers**: Ammonium sulfate and urea generate H+ ions during nitrification; each kg of urea produces approximately 1.8 kg of CaCO3 equivalent acidity
3. **Crop removal**: Harvested cherries remove basic cations from the system
4. **Organic matter decomposition**: Produces organic acids that lower pH
5. **Deforestation and erosion**: Loss of topsoil and organic matter reduces the soil's buffering capacity

### pH Testing Methods

| Method | Accuracy | Cost | Turnaround | Best For |
|--------|----------|------|------------|----------|
| **DOA Laboratory** | High (pH meter in 1:1 soil:water) | 200-500 THB | 1-2 weeks | Baseline and annual monitoring |
| **DOA Field Test Kit** | Moderate (colorimetric) | ~100 THB | Immediate | Quick field assessment |
| **Portable pH Meter** | Good (calibrated glass electrode) | 300-2,000 THB (one-time) | Immediate | Monthly spot checks |
| **IoT pH Sensor** | Moderate (see [[Soil-pH-Sensors]]) | 1,200-1,800 THB | Real-time (periodic) | Trend monitoring between lab tests |

---

## Organic Matter Management

Organic matter (OM) is the lifeblood of coffee soil. It improves soil structure and water-holding capacity, feeds beneficial microorganisms, slowly releases nutrients, chelates micronutrients for plant availability, buffers pH changes, and reduces aluminum toxicity in acidic soils. Northern Thailand's mountain soils have typically lost 30-60% of their original organic matter due to deforestation, burning, and continuous cultivation. Rebuilding OM is the single most impactful long-term investment a coffee farmer can make.

### Target Organic Matter Levels

| Soil Condition | OM % | Action Required |
|---------------|------|-----------------|
| **Severely depleted** | <1.5% | Aggressive amendment: 2,000-3,000 kg compost/rai/year + green manure + mulch |
| **Below optimal** | 1.5-3.0% | Regular amendment: 1,000-2,000 kg compost/rai/year + mulch |
| **Optimal** | 3.0-5.0% | Maintenance: 500-1,000 kg compost/rai/year + mulch |
| **Excellent** | >5.0% | Maintenance only: 300-500 kg compost/rai/year |

### Composting Methods for Coffee Farms

| Method | Materials | Maturation Time | Nutrient Profile (approx.) | Suitability |
|--------|-----------|-----------------|---------------------------|-------------|
| **Traditional Windrow** | Coffee pulp, leaves, manure, rice husk | 3-6 months | N 1.5-2.5%, P 0.5-1.0%, K 1.0-2.0% | All farms; low cost |
| **Vermicompost** | Cow manure + coffee pulp + vegetable waste | 2-3 months | N 2.0-3.0%, P 1.0-1.5%, K 1.5-2.5% | Small-medium farms; premium product |
| **Coffee Pulp Compost** | Fresh coffee pulp + lime + rice husk (3:1:1) | 3-4 months | N 2.0-3.0%, P 0.3-0.8%, K 2.5-3.5% | Ideal; uses on-farm waste |
| **Bokashi (EM)** | Rice bran + manure + EM microbes | 2-4 weeks | Variable; adds beneficial microbes | Rapid; requires EM purchase |
| **Sheet Composting** | Green manure crops turned into soil | 2-3 months (in-situ) | Depends on crop; adds OM primarily | Large farms; low labor |

Coffee pulp compost is particularly valuable because every kg of green cherry produces approximately 0.45 kg of wet pulp. A farm producing 200 kg/rai of green bean generates roughly 900 kg of wet pulp per rai, which can be composted into 300-400 kg of high-quality organic fertilizer, recycling approximately 60% of the potassium removed in the harvest. This represents a cost saving of 500-1,000 THB/rai per year in purchased potassium fertilizer.

### Application Rates

| Amendment | Rate (kg/rai) | Frequency | Cost (THB/rai) | Notes |
|-----------|--------------|-----------|-----------------|-------|
| **Mature compost** | 1,000-2,000 | Annual (pre-rainy season) | 500-2,000 | If purchased at 5-10 THB/kg |
| **Vermicompost** | 500-1,000 | Annual | 1,500-3,000 | Premium product; higher nutrient density |
| **Coffee pulp compost** | 1,000-2,000 | Annual | Near zero (on-farm) | Best value; recycles nutrients |
| **Cow manure (aged)** | 2,000-3,000 | Annual | 400-800 | Must be well-aged to avoid root burn |
| **Chicken manure (aged)** | 500-1,000 | Annual | 300-700 | Higher N than cow manure; apply cautiously |

### Green Manure Crops and Mulching

Green manure crops are leguminous species grown between coffee rows and incorporated into the soil to add organic matter and fix atmospheric nitrogen. In Northern Thailand, suitable green manure species include Crotalaria juncea (sun hemp, สุรินทร์หญ้า), Vigna radiata (mung bean, ถั่วเขียว), and Arachis pintoi (wild peanut, ถั่วลิสงเพ้นต์). These can fix 50-100 kg N/ha per season (8-16 kg N/rai), equivalent to 17-35 kg urea/rai, saving 300-600 THB/rai in nitrogen fertilizer costs.

Mulching with coffee leaves, pruned branches, rice straw, or vetiver grass cuttings maintains soil moisture, moderates soil temperature, suppresses weeds, and slowly adds organic matter as the mulch decomposes. A mulch layer of 5-10 cm thickness is recommended, applied at the onset of the dry season (November) and replenished as needed. Cost is minimal if on-farm materials are used; rice straw may cost 200-400 THB/rai if purchased.

---

## NPK Requirements

Nitrogen, phosphorus, and potassium are the three primary macronutrients required in the largest quantities by coffee plants. Their relative importance shifts dramatically across the annual growth cycle: nitrogen dominates during vegetative growth, phosphorus is critical during flowering and root development, and potassium becomes paramount during cherry fill and ripening. Fertilization programs that do not account for these shifting demands waste money and can even reduce quality — excess nitrogen during cherry development, for example, promotes vegetative growth at the expense of bean density and sugar accumulation.

### NPK Requirements by Growth Stage

| Growth Stage | NPK Ratio | N (kg/rai) | P2O5 (kg/rai) | K2O (kg/rai) | Primary Objective |
|-------------|-----------|------------|---------------|-------------|-------------------|
| **Vegetative (young trees 1-3 yr)** | 2:1:1 | 15-25 | 8-12 | 8-12 | Canopy and root establishment |
| **Pre-flowering (Feb-Mar)** | 1:2:1 | 5-8 | 10-16 | 5-8 | Bloom initiation and fruit set |
| **Post-flowering / fruit set (Apr-May)** | 1:1:1 | 8-12 | 8-12 | 8-12 | General nutrition during fruit set |
| **Cherry development (Jun-Sep)** | 1:1:2 | 8-10 | 8-10 | 16-20 | Cherry sizing and sugar accumulation |
| **Cherry ripening (Oct-Nov)** | 0:1:2 | 0 | 5-8 | 10-16 | Bean density and quality |
| **Post-harvest recovery (Dec-Jan)** | 2:1:1 | 12-18 | 6-10 | 6-10 | Rebuild reserves for next season |

### Annual Application Rates: Arabica vs Robusta

| Nutrient | Arabica (kg/rai/year) | Arabica (kg/ha/year) | Robusta (kg/rai/year) | Robusta (kg/ha/year) |
|----------|----------------------|---------------------|----------------------|---------------------|
| **N** | 30-50 | 188-313 | 40-60 | 250-375 |
| **P2O5** | 20-35 | 125-219 | 25-40 | 156-250 |
| **K2O** | 30-50 | 188-313 | 40-65 | 250-406 |

Robusta requires approximately 20-30% more NPK than Arabica due to its larger tree size, longer fruiting period, and higher yield potential per tree.

### Organic vs Synthetic Nutrient Sources

| Nutrient Source | Nutrient Content | Availability | Cost (THB/kg nutrient) | Soil Impact |
|----------------|-----------------|-------------|------------------------|-------------|
| **Urea (46-0-0)** | 46% N | Rapid (7-14 days) | 15-20 | Acidifying; no OM benefit |
| **15-15-15** | 15% each N-P2O5-K2O | Moderate | 20-28 | Balanced; convenient |
| **13-13-21** | 13% N, 13% P2O5, 21% K2O | Moderate | 22-30 | K-enriched; good for cherry development |
| **Compost (mature)** | 1.5-3% N, 0.5-1% P, 1-2% K | Slow (1-3 months) | 50-100 | Builds OM; improves soil structure |
| **Vermicompost** | 2-3% N, 1-1.5% P, 1.5-2.5% K | Moderate-slow | 80-150 | Premium; adds microbes |
| **Aged cow manure** | 0.5-1% N, 0.2-0.5% P, 0.5-1% K | Very slow | 30-60 | High OM volume; bulk amendment |
| **Biofertilizer (PGPR)** | Variable; N-fixing + P-solubilizing | Moderate | 200-400/rai | Enhances nutrient uptake efficiency |

A practical approach for Northern Thailand is the integrated nutrient management (INM) strategy: apply 50-60% of nutrient requirements through chemical fertilizers for immediate availability, and 40-50% through organic sources for long-term soil health. This balances short-term yield needs with long-term sustainability and reduces total fertilizer cost by 20-30% compared to chemical-only programs.

---

## Micronutrient Management

Micronutrients are required in small quantities but play outsized roles in coffee plant physiology. Deficiencies are common in Northern Thailand due to the region's acidic soils (which can cause excess availability of some micronutrients and deficiency of others), high rainfall leaching, and the intensive harvesting that removes micronutrients in cherry tissue. Visual deficiency diagnosis is unreliable because many symptoms resemble disease damage; tissue analysis or soil testing is preferred.

| Micronutrient | Deficiency Symptoms | Critical Soil Level | Correction Method | Application Rate | Cost (THB/rai) |
|---------------|--------------------| --------------------|-------------------|-----------------|-----------------|
| **Boron (B)** | Malformed cherries, hollow beans, poor flowering, dieback of terminal shoots | <0.5 mg/kg | Borax (11% B) soil application or foliar | 0.5-1.0 kg borax/rai; foliar 0.2-0.5% solution | 50-150 |
| **Zinc (Zn)** | Little leaf, rosetting, interveinal chlorosis on young leaves, shortened internodes | <2.0 mg/kg | Zinc sulfate (22% Zn) soil or foliar | 2-4 kg ZnSO4/rai; foliar 0.3-0.5% solution | 80-200 |
| **Iron (Fe)** | Interveinal chlorosis on young leaves (green veins, yellow blade), especially at high pH | <10 mg/kg | Fe-EDTA or Fe-EDDHA chelate; foliar | Foliar 0.5-1.0% FeSO4 solution; chelate per label | 100-300 |
| **Manganese (Mn)** | Interveinal chlorosis on older leaves, reduced growth; toxicity at low pH causes brown spots | <5 mg/kg (deficiency); >50 mg/kg (toxicity) | Foliar MnSO4 if deficient; lime if toxic | Foliar 0.2-0.5% MnSO4 solution | 60-150 |
| **Copper (Cu)** | Dieback of young shoots, pale leaves, reduced cherry set | <1.0 mg/kg | Copper sulfate (25% Cu) soil or foliar | 1-2 kg CuSO4/rai every 2-3 years | 80-200 |

Boron deficiency is the most economically significant micronutrient problem for coffee in Northern Thailand. It causes "monkey face" or "elephant ear" bean malformations that render cherries unmarketable at specialty grade. The DOA recommends an annual boron application as part of standard coffee fertilization, particularly in high-rainfall areas where boron leaching is severe.

---

## Fertilizer Types and Costs in Thailand

Thailand's fertilizer market is regulated by the DOA, which sets standards for nutrient content and labeling. Chemical fertilizers are subject to government price controls, but actual retail prices vary by province and season. Organic fertilizers are less regulated and quality can vary significantly between producers.

### Chemical Fertilizer Prices (2025-2026)

| Fertilizer Grade | N-P2O5-K2O | Common Use | Price (THB/50kg bag) | Price (THB/kg) | Nutrient Cost (THB/kg N+P2O5+K2O) |
|-----------------|------------|------------|----------------------|-----------------|----------------------------------|
| **15-15-15** | 15-15-15 | General purpose; vegetative stage | 650-900 | 13-18 | 29-40 |
| **13-13-21** | 13-13-21 | Cherry development; K-enriched | 700-950 | 14-19 | 26-35 |
| **46-0-0 (Urea)** | 46-0-0 | Nitrogen top-dressing | 500-700 | 10-14 | 22-30 (N only) |
| **18-46-0 (DAP)** | 18-46-0 | Phosphorus supplement; pre-flowering | 800-1,100 | 16-22 | 25-34 |
| **0-0-60 (MOP)** | 0-0-60 | Potassium supplement; cherry stage | 750-1,050 | 15-21 | 25-35 (K only) |
| **12-12-17+TE** | 12-12-17+TE | Fruit tree special; includes micronutrients | 750-1,000 | 15-20 | 30-42 |

### Organic Fertilizer Prices

| Fertilizer Type | Nutrient Content (approx.) | Price (THB/kg) | Application Rate (kg/rai) | Cost/rai (THB) |
|----------------|---------------------------|-----------------|---------------------------|-----------------|
| **Mature compost** | 1.5-2.5% N, 0.5-1% P, 1-2% K | 5-10 | 1,000-2,000 | 5,000-20,000 |
| **Vermicompost** | 2-3% N, 1-1.5% P, 1.5-2.5% K | 15-25 | 500-1,000 | 7,500-25,000 |
| **Aged cow manure** | 0.5-1% N, 0.2-0.5% P, 0.5-1% K | 2-5 | 2,000-3,000 | 4,000-15,000 |
| **Aged chicken manure** | 1.5-3% N, 1-2% P, 0.8-1.5% K | 4-8 | 500-1,000 | 2,000-8,000 |
| **Biofertilizer (PGPR)** | Variable; microbial inoculant | 200-400/rai (applied) | Per label | 200-400 |

### Foliar Feeding

Foliar fertilizer application provides rapid nutrient delivery during critical growth stages but is a supplement, not a replacement, for soil-applied nutrients. Foliar sprays are particularly effective for micronutrient correction and for providing a quick N or K boost during cherry development. Typical costs are 150-400 THB/rai per application for commercial foliar fertilizer products.

### Annual Fertilizer Cost Comparison per Rai

| Approach | Chemical (THB/rai) | Organic (THB/rai) | Total (THB/rai) | Notes |
|----------|--------------------|--------------------|------------------|-------|
| **Chemical only** | 3,000-5,000 | 0 | 3,000-5,000 | Fast results; degrades soil over time |
| **Organic only** | 0 | 8,000-20,000 | 8,000-20,000 | Slow results; excellent soil health |
| **Integrated (recommended)** | 1,800-3,000 | 4,000-8,000 | 5,800-11,000 | Best balance; 50:50 nutrient split |

---

## Fertilization Schedule for Northern Thailand

The fertilization calendar for Northern Thailand must be aligned with the region's distinct seasonal pattern: a dry season from November to April, a rainy season from May to October, and harvest periods that differ between Arabica (November-January) and Robusta (January-March). The timing of fertilizer applications relative to rainfall is critical — applying urea before heavy rain wastes nitrogen through leaching and volatilization, while applying fertilizer during drought means nutrients cannot be taken up by roots.

### Arabica Fertilization Calendar

| Month | Season / Growth Stage | Fertilizer | Rate (kg/rai) | Method | Notes |
|-------|----------------------|-----------|---------------|--------|-------|
| **January** | Late harvest | Compost/organic matter | 1,000-2,000 | Broadcast + incorporate | Apply after final picking; rebuild soil |
| **February** | Post-harvest recovery | 15-15-15 + urea | 30-40 + 10-15 | Ring application | N emphasis for vegetative recovery |
| **March** | Pre-flowering | 18-46-0 (DAP) or 10-30-20 | 20-30 | Ring application | P emphasis for flower initiation |
| **April** | Early flowering / fruit set | 15-15-15 | 30-40 | Ring application | Balanced nutrition during bloom |
| **May** | Rainy season onset; fruit set | 13-13-21 | 30-40 | Ring application | Begin K-enriched program |
| **June** | Cherry development | 13-13-21 + 0-0-60 (MOP) | 30-40 + 10-15 | Split application | K emphasis for cherry sizing |
| **July** | Cherry development | 13-13-21 | 30-40 | Ring application | Continue K-enriched program |
| **August** | Cherry fill | 0-0-60 (MOP) + foliar K | 15-20 + foliar | Split + foliar | Maximum K for sugar development |
| **September** | Cherry ripening | Foliar micronutrients (B, Zn) | Per label | Foliar spray | B critical for bean quality |
| **October** | Late cherry ripening | No soil fertilizer | — | — | Avoid N that promotes vegetative growth |
| **November** | Early harvest | No soil fertilizer | — | — | Focus on selective picking |
| **December** | Mid harvest | No soil fertilizer | — | — | Continue selective picking |

### Robusta Fertilization Calendar

| Month | Season / Growth Stage | Fertilizer | Rate (kg/rai) | Method | Notes |
|-------|----------------------|-----------|---------------|--------|-------|
| **January** | Early harvest | No soil fertilizer | — | — | Active picking period |
| **February** | Mid-late harvest | No soil fertilizer | — | — | Continue picking |
| **March** | Post-harvest recovery | 15-15-15 + urea | 35-50 + 15-20 | Ring application | Strong N for vegetative recovery |
| **April** | Vegetative growth | 15-15-15 | 35-50 | Ring application | Continue canopy rebuilding |
| **May** | Pre-flowering | 18-46-0 (DAP) | 25-35 | Ring application | P for flower initiation |
| **June** | Flowering / fruit set | 15-15-15 | 35-45 | Ring application | Balanced during bloom |
| **July** | Cherry development | 13-13-21 | 35-50 | Ring application | Begin K-enriched program |
| **August** | Cherry development | 13-13-21 + MOP | 35-50 + 15-20 | Split application | K emphasis for cherry sizing |
| **September** | Cherry fill | MOP + foliar K | 20-25 + foliar | Split + foliar | Maximum K application |
| **October** | Cherry ripening | Foliar micronutrients | Per label | Foliar spray | B and Zn for bean quality |
| **November** | Late cherry / early harvest | No soil fertilizer | — | — | Begin selective picking |
| **December** | Harvest | No soil fertilizer | — | — | Active picking |

**Note**: "Ring application" means broadcasting fertilizer in a ring around the tree drip line (the area below the outer edge of the canopy), where feeder roots are most concentrated. Avoid applying fertilizer directly against the trunk, which can cause bark burn.

---

## Soil Conservation

Northern Thailand's coffee is grown on slopes ranging from 15-60% gradient, making soil erosion the single greatest threat to long-term farm sustainability. The DOA estimates that unmanaged hillside farms can lose 20-50 tonnes of topsoil per hectare per year (3-8 tonnes/rai/year) through water erosion. Since it takes nature 200-1,000 years to form 1 cm of topsoil, the loss is effectively irreversible. Soil conservation measures are not optional — they are essential for farm survival.

### Conservation Techniques

| Technique | Description | Slope Suitability | Cost (THB/rai) | Effectiveness |
|-----------|------------|-------------------|-----------------|---------------|
| **Contour planting** | Plant coffee rows along contour lines, not up-and-down slope | 15-35% | 200-500 (surveying) | Reduces erosion 50-70% |
| **Terracing** | Construct bench terraces or half-moon terraces on steep slopes | 35-60% | 3,000-8,000 (initial) | Reduces erosion 80-95% |
| **Cover crops** | Plant Arachis pintoi, Calopogonium, or Centrosema between rows | All slopes | 300-600 (seed) | Reduces erosion 60-80%; fixes N |
| **Vetiver grass (Vetiveria zizanoides)** | Plant vetiver hedgerows along contour lines every 5-10 m vertical interval | All slopes | 500-1,500 (planting material) | Reduces erosion 70-90%; stabilizes soil |
| **Mulching** | Apply organic mulch layer 5-10 cm thick under coffee trees | All slopes | 0-400 (on-farm vs. purchased) | Reduces erosion 40-60%; adds OM |
| **Strip cropping** | Alternate coffee with nitrogen-fixing tree rows (e.g., Gliricidia, Leucaena) | 15-45% | 200-500 (seedlings) | Reduces erosion 50-70%; provides shade + N |

### Vetiver Grass for Highland Coffee

Vetiver grass (หญ้าแฝก, Ya Faek) is the Royal Project Foundation's recommended soil conservation plant for Northern Thailand's highland agriculture. It forms dense, deep-rooted hedgerows (roots penetrate 3-5 meters) that act as living barriers to slow water flow and trap sediment. The Land Development Department (LDD) distributes vetiver slips free of charge to farmers and provides technical assistance for contour planting. Key specifications for coffee farms:

- Plant vetiver hedgerows along contour lines at 5-10 meter vertical intervals (approximately 15-30 meters horizontal distance on moderate slopes)
- Use 3-5 slips per planting hole, spaced 10-15 cm apart within the hedgerow
- Trim vetiver to 30-40 cm height 2-3 times per year; use cuttings as mulch under coffee trees
- Vetiver hedgerows trap 20-40 cm of sediment per year on steep slopes, gradually creating natural terraces

---

## Soil Testing and IoT Integration

Soil testing provides the data foundation for all fertilization decisions. Without testing, farmers are guessing — and guessing with fertilizer is expensive. A single DOA soil test at 200-500 THB can save 2,000-5,000 THB/rai in unnecessary or misapplied fertilizer. The integration of IoT sensors with periodic laboratory testing creates a powerful decision-support system.

### DOA Soil Testing Services

| Service | Cost (THB) | Parameters | Turnaround | Contact |
|---------|------------|------------|------------|---------|
| **Standard analysis** | 200-500 | pH, OM%, N, P, K, CEC, texture | 1-2 weeks | DOA Agricultural Chemistry Group, Tel 02-579-8600 ext 700 |
| **Comprehensive analysis** | 500-1,000 | Standard + micronutrients (B, Zn, Fe, Mn, Cu) + heavy metals | 2-3 weeks | DOA or private labs (SGS, ALTEL) |
| **Field test kit** | ~100 | Rapid NPK + pH estimation | Immediate | DOA district offices |
| **LDD soil test** | Free (limited) | pH, N, P, K basic | Variable | Land Development Department offices |

### IoT Sensor Integration

| Sensor Type | What It Measures | Price (THB) | Accuracy | Best Use | See Also |
|-------------|-----------------|-------------|----------|----------|----------|
| **Soil moisture (capacitive)** | Volumetric water content | 35-6,000 | 3-10% VWC | Irrigation scheduling | [[Soil-Moisture-Sensors]] |
| **Soil pH** | Acidity/alkalinity | 300-1,800 | 0.1-0.5 pH | pH trend monitoring | [[Soil-pH-Sensors]] |
| **NPK sensor** | N, P, K estimation | 2,500-5,000 | 50-200% error | Trend monitoring only | [[NPK-Sensors]] |
| **Soil temperature** | Temperature at root zone | 30-100 | 0.5°C | Germination and root activity | [[Temperature-Sensors]] |
| **Soil EC** | Electrical conductivity | Integrated in many sensors | Variable | Salinity monitoring | [[Soil-Moisture-Sensors]] |

### Recommended Testing Frequency

| Test Type | Frequency | Timing | Annual Cost (THB/rai) |
|-----------|-----------|--------|----------------------|
| **DOA laboratory (full analysis)** | 2x per year | Pre-season (March) and post-harvest (January) | 400-1,000 |
| **Portable pH meter spot checks** | Monthly | Year-round | 100-200 (calibration solutions) |
| **IoT soil moisture monitoring** | Continuous | Year-round | 200-500 (sensor + maintenance) |
| **IoT NPK trend monitoring** | Continuous | Year-round | 500-1,000 (sensor + calibration) |
| **Tissue analysis** | 1x per year | Mid-season (July) | 500-1,000 |

**Total recommended annual monitoring budget**: 1,200-3,200 THB/rai — a small fraction of the 5,800-11,000 THB/rai annual fertilizer investment it helps optimize.

---

## Data and Specifications Table

| Parameter | Arabica Optimal | Robusta Optimal | Northern Thailand Typical | Unit | Testing Method |
|-----------|----------------|----------------|--------------------------|------|---------------|
| **pH (H2O)** | 5.0-6.0 | 5.5-6.5 | 4.5-5.5 | - | DOA lab or pH meter |
| **Organic Matter** | 3-5+ | 2-4+ | 1.5-3.0 | % | DOA lab (Walkley-Black) |
| **CEC** | 10-25 | 8-20 | 5-15 | cmol/kg | DOA lab |
| **Bulk Density** | 0.8-1.2 | 0.9-1.3 | 1.0-1.4 | g/cm3 | Core sample |
| **Available N** | 200-300 | 250-350 | 100-200 | mg/kg | DOA lab (Kjeldahl) |
| **Available P** | 15-30 | 10-25 | 5-15 | mg/kg | DOA lab (Bray II) |
| **Available K** | 200-400 | 150-350 | 80-200 | mg/kg | DOA lab (NH4OAc) |
| **Ca** | 2-8 | 1.5-6 | 0.5-3 | cmol/kg | DOA lab |
| **Mg** | 0.5-3 | 0.4-2.5 | 0.2-1.5 | cmol/kg | DOA lab |
| **Boron** | 0.5-1.0 | 0.4-0.8 | 0.2-0.5 | mg/kg | DOA lab or tissue |
| **Zinc** | 2-5 | 1.5-4 | 1-3 | mg/kg | DOA lab or tissue |
| **Effective Soil Depth** | >100 | >80 | 40-120 | cm | Auger observation |
| **Drainage Class** | Well-drained | Well to moderate | Variable | - | Field observation |
| **Annual N Application** | 30-50 | 40-60 | — | kg N/rai | Calculated |
| **Annual P2O5 Application** | 20-35 | 25-40 | — | kg P2O5/rai | Calculated |
| **Annual K2O Application** | 30-50 | 40-65 | — | kg K2O/rai | Calculated |
| **Compost Application** | 1,000-2,000 | 800-1,500 | — | kg/rai | Measured |
| **Lime Application (if needed)** | 150-300 | 100-250 | — | kg/rai | Based on pH test |
| **Urea Cost** | 10-14 | — | — | THB/kg | Retail |
| **15-15-15 Cost** | 13-18 | — | — | THB/kg | Retail |
| **13-13-21 Cost** | 14-19 | — | — | THB/kg | Retail |
| **Compost Cost** | 5-10 | — | — | THB/kg | Retail; less if on-farm |
| **DOA Soil Test** | 200-500 | — | — | THB/test | Per sample |

---

## Northern Thailand Context

Coffee farming in Northern Thailand operates within a unique set of constraints and opportunities shaped by geography, history, and policy. The highland environment presents soil management challenges that flatland coffee regions do not face, and the social context of hill tribe farming communities requires approaches that are both agronomically sound and culturally appropriate.

### Highland Soil Challenges

The steep terrain of Northern Thailand's coffee regions (typically 800-1,700 masl on 15-60% slopes) creates three interconnected soil management problems. First, erosion removes the nutrient-rich topsoil at rates far exceeding natural soil formation, particularly during the intense rainfall events of the monsoon season (May-October), when 200-300 mm can fall in a single week. Second, the mountain soils are inherently shallow, with depth to bedrock or lateritic hardpan often less than 60 cm, limiting the volume of soil available for root exploration and water storage. Third, the combination of high rainfall and steep terrain leaches basic cations (Ca, Mg, K) from the soil profile, driving pH downward and requiring ongoing liming to maintain fertility.

### Deforestation Impact

Much of Northern Thailand's current coffee land was originally under montane evergreen forest, which maintained soil organic matter at 5-10% through continuous leaf litter deposition and root turnover. When these forests were cleared for shifting cultivation (the traditional swidden system that included opium poppy), organic matter levels dropped to 1-3% within 5-10 years due to burning, erosion, and the removal of biomass. The Royal Project's introduction of coffee as a permanent tree crop was specifically designed to break this cycle by providing a perennial canopy that could begin to restore soil organic matter. However, even well-managed coffee farms typically maintain only 2-4% OM — far below the original forest levels, highlighting the need for active organic matter management.

### Royal Project Soil Management Guidelines

The Royal Project Foundation provides soil management recommendations specifically tailored to its highland coffee project areas. Key guidelines include:

1. Annual soil testing through the Royal Project's agricultural extension service, with results interpreted and recommendations provided free of charge to member farmers
2. Mandatory contour planting and vetiver grass integration on all slopes exceeding 20% gradient
3. Integrated nutrient management with a target of 50% organic + 50% chemical fertilizer
4. Coffee pulp composting as a mandatory on-farm practice, with technical training provided
5. Liming recommendations based on DOA soil test results, typically 100-200 kg dolomite/rai every 2-3 years for Red Latosol soils
6. Mulching with on-farm materials (coffee leaves, pruned branches, vetiver cuttings) to maintain soil moisture and add organic matter
7. Shade tree integration (e.g., macadamia, plum, persimmon) at 30-50% canopy cover to mimic forest litter dynamics

---

## Practical Recommendations

1. **Test your soil before applying any fertilizer.** A DOA soil test (200-500 THB) provides the baseline data needed to make informed decisions. Applying fertilizer without a soil test is like taking medicine without a diagnosis — potentially wasteful, possibly harmful, and certainly more expensive than the test itself.
2. **Correct pH first.** If your soil pH is below 4.5, liming should be the first action. At very low pH, most applied nutrients are unavailable to plants, making fertilizer investment pointless. Apply 150-300 kg dolomite/rai every 2-3 years, timed before the rainy season.
3. **Build organic matter every year.** Apply 1,000-2,000 kg of compost per rai annually, prioritizing on-farm coffee pulp compost as the most cost-effective source. Every 1% increase in OM improves water-holding capacity by approximately 75,000 liters per rai and reduces the need for chemical fertilizer by 15-20%.
4. **Match NPK ratios to growth stage.** Use high-N formulations (15-15-15 + urea) for vegetative growth and post-harvest recovery, high-P formulations (18-46-0 or 10-30-20) for pre-flowering, and high-K formulations (13-13-21 or 0-0-60) for cherry development. Never apply nitrogen during cherry ripening.
5. **Do not neglect boron.** Apply 0.5-1.0 kg borax/rai annually, either as a soil application in June or as a foliar spray (0.2-0.5% solution) in September. Boron deficiency is the most common micronutrient problem in Northern Thailand and directly causes bean quality defects.
6. **Install vetiver grass hedgerows on all slopes.** Contact the LDD for free vetiver slips and planting guidance. Vetiver hedgerows are the single most cost-effective erosion control measure, reducing topsoil loss by 70-90% and creating natural terraces over time.
7. **Use IoT sensors for monitoring, not decision-making.** Deploy capacitive soil moisture sensors (35 THB each) for irrigation scheduling, and use periodic pH spot-checks with a portable meter. For NPK decisions, rely on DOA lab tests 2-4 times per year rather than IoT NPK sensors, which are too inaccurate for fertilizer rate calculations (see [[NPK-Sensors]]).
8. **Integrate coffee pulp composting into your post-harvest routine.** Every 200 kg of green bean produced generates approximately 900 kg of wet pulp. Composting this on-farm produces 300-400 kg of high-K compost worth 1,500-4,000 THB at commercial prices, while solving a waste disposal problem.
9. **Budget 5,800-11,000 THB/rai per year for integrated fertilization.** This covers chemical fertilizers (1,800-3,000 THB), organic amendments (4,000-8,000 THB), soil testing (400-1,000 THB), and micronutrients (200-500 THB). This investment should return 3-8x in yield improvement at current Arabica prices.
10. **Apply lime 2-4 weeks before the rainy season.** Lime needs moisture to react with soil particles. Applying in the dry season wastes the material; applying during heavy rains risks runoff. March-April is the ideal window in Northern Thailand.

---

## Related Topics

- [[Cultivation-Best-Practices]] — Overall coffee cultivation guidelines for Northern Thailand
- [[Pest-Disease-Management]] — Soil-borne diseases and their relationship to drainage and pH
- [[Soil-pH-Sensors]] — IoT pH monitoring hardware and calibration
- [[NPK-Sensors]] — IoT nutrient monitoring capabilities and limitations
- [[Soil-Moisture-Sensors]] — Soil moisture monitoring for irrigation scheduling
- [[Arabica-for-North-Thailand]] — Arabica variety requirements and soil preferences
- [[Robusta-for-North-Thailand]] — Robusta variety requirements and soil preferences
- [[Arabica-Climate-Range]] — How climate and soil interact to determine coffee quality
- [[Microclimate-Factors]] — Local environmental factors affecting soil conditions

---

## References

1. Department of Agriculture (DOA) Thailand — Soil analysis services and fertilizer recommendations for coffee (doa.go.th)
2. Royal Project Foundation — Highland coffee soil management guidelines (royalproject.org)
3. Land Development Department (LDD) Thailand — Vetiver grass technical manual for hillside farming (lld.go.th)
4. Warin Worakul, et al. (2017) — "Soil Properties and Coffee Quality in Northern Thailand," Khon Kaen Agriculture Journal, 45(3), 501-508
5. Phrueksa Worasan, et al. (2019) — "Effects of Organic and Chemical Fertilizers on Arabica Coffee Growth and Soil Properties in Chiang Mai," Journal of Agriculture, 37(2), 145-156
6. International Coffee Organization (ICO) — "Coffee Fertilizer Guide: Optimum Nutrient Management" (ico.org)
7. World Coffee Research — "Best Management Practices for Coffee Nutrition" (worldcoffeeresearch.org)
8. Coffee Research Institute of Thailand — Arabica variety soil requirements and fertilization schedules (CRT, Chiang Mai)
9. Food and Agriculture Organization (FAO) — "Soil Management for Coffee Production" (fao.org)
10. Navarrete-Gomez, et al. (2022) — "Soil Organic Matter and Coffee Quality: A Global Meta-Analysis," Agronomy Journal, 114(4), 2341-2358
11. Chonthira Kuntuwattanakul, et al. (2020) — "Nutrient Removal by Arabica Coffee Harvest in Northern Thailand and Fertilizer Replacement Recommendations," Thai Journal of Agricultural Science, 53(1), 15-26
12. Somsak Suwanlee, et al. (2018) — "Vetiver Grass for Soil Conservation in Highland Coffee Plantations," LDD Technical Bulletin No. 47
13. Heinrich Boll Foundation (2025) — "Brewing Change in Thailand: Soil Health and Sustainability in Highland Coffee"
14. Peterson, et al. (2021) — "Boron Deficiency in Tropical Coffee: Diagnosis and Correction," Plant and Soil, 463, 189-205
15. Thailand Department of Agriculture — "Fertilizer Grade and Price Schedule 2025-2026" (regulated pricing)
16. Pannangpetch, et al. (2016) — "Integrated Nutrient Management for Arabica Coffee in Thailand's Royal Project Areas," Maejo International Journal of Science and Technology, 10(2), 134-148
17. Buffo, R.A. & Freire, A.I. (2020) — "Coffee Pulp Composting and Nutrient Recycling: A Review," Waste Management, 105, 129-141
18. Chiang Mai University — "Soil Survey of Northern Thailand Highland Areas" (CMU Faculty of Agriculture, 2019)
19. Specialized Expert Report on Coffee Nutrition — Nutrient removal rates and replacement recommendations for Arabica and Robusta
20. Nutrient Management Institute (NMI) — "Coffee Fertilizer Decision Support: From Soil Test to Application Rate" (nmi-agro.com)

---

*Last updated: 2026-05-12*
