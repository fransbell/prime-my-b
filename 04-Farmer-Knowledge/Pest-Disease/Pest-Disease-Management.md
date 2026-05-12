---
topic: Pest and Disease Management
phase: 04-Farmer-Knowledge
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [pest, disease, CLR, CBB, berry-borer, rust, arabica, robusta, northern-thailand, IPM]
related: [[Cultivation-Best-Practices]], [[Soil-Management]], [[Harvesting-Techniques]], [[Leaf-Wetness-Sensors]], [[Temperature-Sensors]], [[Humidity-Sensors]]
---

# Pest & Disease Management for Northern Thailand Coffee

> **Summary**: Comprehensive guide to the pests and diseases threatening coffee production in Northern Thailand, with emphasis on coffee leaf rust (CLR) and coffee berry borer (CBB) — the two most economically devastating threats — and how IoT sensor integration enables predictive, threshold-based management to reduce crop losses and chemical dependence.

---

## Overview

Pests and diseases represent the single largest source of economic loss for coffee farmers in Northern Thailand, with estimates suggesting 15-30% of potential Arabica yield is lost annually to biotic stresses, and individual farm losses can reach 80% in severe outbreak years. Coffee leaf rust (Hemileia vastatrix) alone caused the collapse of Northern Thailand's initial Typica and Caturra plantings in the mid-1970s, an event that fundamentally reshaped the region's variety landscape toward rust-resistant Catimor types. The coffee berry borer (Hypothenemus hampei) is expanding its range into higher altitudes as temperatures rise, threatening farms that were historically too cool for this devastating insect pest. Together, these two threats define the disease and pest management challenge for Northern Thailand's coffee industry.

The traditional approach to pest and disease management in the region has been calendar-based chemical application — spraying fungicides every 2-4 weeks during the rainy season regardless of actual disease risk. This approach is wasteful, environmentally damaging, and increasingly ineffective as pathogens develop resistance. IoT-enabled sensor systems offer a paradigm shift: by continuously monitoring leaf wetness duration, temperature, humidity, and rainfall, farmers can predict disease outbreaks before they occur and apply interventions only when conditions warrant. Research from Costa Rica's ICAFE program has demonstrated that leaf-wetness-based prediction models can reduce fungicide applications by 30-50% while maintaining or improving disease control. For Northern Thailand, where the rainy season brings months of high humidity, fog, and prolonged leaf wetness, the economic and environmental case for sensor-driven disease management is compelling.

| Metric | Value | Source |
|--------|-------|--------|
| Annual yield loss from CLR (global) | 15-20% | ICO |
| Annual yield loss from CBB (global) | 5-80% uncontrolled | CABI |
| Fungicide cost (calendar-based) | 4,000-8,000 THB/rai/year | DOA estimates |
| Fungicide cost (sensor-based IPM) | 2,000-4,000 THB/rai/year | ICAFE model |
| Chemical reduction with IoT prediction | 30-50% fewer applications | ICAFE/CIRAD |
| CBB trap cost (Brocap type) | 150-250 THB/trap | Thai market |
| Beauveria bassiana application cost | 500-800 THB/rai/treatment | DOA recommended |

---

## Coffee Leaf Rust (CLR) — Hemileia vastatrix

### Biology and Lifecycle

Coffee leaf rust is caused by the obligate biotrophic fungus Hemileia vastatrix, one of the most devastating plant pathogens in agricultural history. The fungus is an autoecious rust (completing its entire lifecycle on coffee) that produces urediniospores — the orange-yellow powdery spores visible on the undersides of infected leaves. These urediniospores are the primary means of spread and reinfection during the growing season, dispersed by wind, rain splash, and human activity through the plantation.

The lifecycle begins when a urediniospore lands on a coffee leaf surface and requires free water (leaf wetness) to germinate. Under optimal conditions — temperatures of 20-25 degrees C with leaf wetness for at least 6-12 hours — the spore produces a germ tube that grows across the leaf surface, locates a stoma (breathing pore), and enters the leaf through the stomatal opening. Once inside, the fungus grows as an intercellular haustorium, extracting nutrients from the leaf mesophyll cells without immediately killing them. The incubation period from infection to visible symptoms is typically 21-45 days depending on temperature, during which the fungus is invisible and the leaf appears healthy. After incubation, the fungus erupts through the stomata on the leaf underside, producing the characteristic orange-yellow powdery pustules that release millions of new urediniospores to continue the infection cycle.

| Lifecycle Stage | Duration | Conditions Required |
|----------------|----------|-------------------|
| Spore germination | 6-12 hours | Free water on leaf, 15-28 degrees C (optimal 20-25) |
| Penetration through stomata | 12-24 hours | Continued leaf wetness |
| Incubation (latent infection) | 21-45 days | 18-25 degrees C optimal |
| Sporulation (visible pustules) | 7-14 days per cycle | High humidity, 20-25 degrees C |
| Spore dispersal | Immediate with wind/rain | Wind, rain splash, human contact |
| Reinfection cycle | 30-60 days total | Favorable conditions persist |

### Environmental Triggers

The critical environmental conditions for CLR infection are leaf wetness duration, temperature, and humidity. These three parameters, when monitored by IoT sensors, provide the foundation for predictive disease management.

**Leaf Wetness Duration (LWD)**: This is the single most predictive environmental variable for CLR infection. Research has established that a minimum of 6 hours of continuous leaf wetness is required for spore germination, with infection probability increasing dramatically at 12-24+ hours. In Northern Thailand's rainy season (May-October), dew formation at night, morning fog (common at 800-1,200 masl), and afternoon rain can combine to produce 24-48+ hours of continuous leaf wetness. The [[Leaf-Wetness-Sensors]] document provides detailed threshold data.

**Temperature**: CLR spore germination occurs between 15-28 degrees C, with an optimal range of 20-25 degrees C. At temperatures below 15 degrees C, germination is extremely slow. Above 28 degrees C, spore viability declines sharply. Northern Thailand's highland coffee zones (800-1,700 masl) sit squarely within the optimal temperature range for CLR, which is why the disease is so prevalent. The [[Temperature-Sensors]] document covers monitoring hardware.

**Humidity**: While leaf wetness is the direct trigger, ambient relative humidity above 80% sustains the moist microclimate necessary for infection. The [[Humidity-Sensors]] document details monitoring options.

| Environmental Parameter | Infection Threshold | Optimal for CLR | Northern Thailand Typical (Rainy Season) |
|------------------------|--------------------:|-----------------|------------------------------------------|
| Leaf wetness duration | >6 hours | >24 hours | 18-48 hours |
| Temperature | 15-28 degrees C | 20-25 degrees C | 18-26 degrees C (at 1,000 masl) |
| Relative humidity | >70% | >85% | 80-95% |
| Rainfall | >5 mm event | Regular rain events | 200-300 mm/month |

### Symptoms and Identification

Early detection of CLR is critical for effective management. The disease progresses through recognizable stages that farmers and IoT monitoring systems should track.

**Early infection (latent period)**: No visible symptoms. The fungus is growing inside the leaf tissue. This is the most dangerous phase because infection is already established but invisible, and by the time symptoms appear, the disease has been progressing for 3-6 weeks. This is precisely why predictive sensor-based systems are so valuable — they identify the conditions that cause infection before symptoms become visible.

**First visible symptoms**: Small, pale yellow or chlorotic spots appear on the upper leaf surface, typically 2-3 mm in diameter. These spots correspond to the developing fungal colonies beneath. On the lower leaf surface, faint whitish areas may be visible before the characteristic orange spores appear.

**Active sporulation**: Orange-yellow powdery pustules (uredinia) erupt through the stomata on the underside of leaves. These pustules are 1-3 mm in diameter and produce copious urediniospores that rub off easily on fingers or clothing. A single pustule can produce thousands of spores per day, and an infected leaf may have dozens to hundreds of pustules.

**Severe infection**: Leaves turn yellow, then brown, and defoliate prematurely. Severely infected trees can lose 50-80% of their foliage, reducing photosynthetic capacity and weakening the plant. Chronic defoliation leads to dieback of branches, reduced cherry production, and eventual plant death if unmanaged.

### Race Diversity

Hemileia vastatrix exists as multiple physiological races that differ in their ability to infect coffee varieties with different resistance genes. This race diversity is the fundamental challenge for breeding resistant varieties — as new races evolve, they can overcome previously effective resistance genes.

**Race II** is the dominant race in Thailand and much of Southeast Asia, and it is the race against which Chiang Mai 80's resistance was selected. The SH3 resistance gene, derived from Hibrido de Timor and present in Chiang Mai 80, provides effective resistance against Race II. However, newer races have been identified in Thailand and neighboring countries that can infect varieties previously considered resistant. A 2019 survey by the Thai Department of Agriculture identified at least 4 distinct CLR races present in Northern Thailand, with evidence that race composition is shifting. The evolution of new virulent races represents a long-term threat to the region's dominant Chiang Mai 80 plantings.

| CLR Race | Presence in Thailand | Varieties Affected | Resistance Gene Overcome |
|---------|---------------------|-------------------|--------------------------|
| Race II | Common (dominant) | Typica, Caturra, Bourbon | S1, S2 |
| Race III | Detected | Some Catimor lines | S1, S2, S3 |
| Race XV | Emerging concern | Specific HDT lines | S1, S4 |
| New variants | Under investigation | Potential threat to Chiang Mai 80 | Under study |

### Impact on Arabica Varieties

The severity of CLR infection varies dramatically among Arabica varieties grown in Northern Thailand, making variety selection the first and most important line of defense.

| Variety | CLR Resistance | Typical Damage (Unsprayed) | Management Implication |
|---------|---------------|---------------------------|----------------------|
| **Chiang Mai 80** | High (to Race II) | Minimal under Race II pressure | Reduced spray program possible |
| **Typica** | Very Low | 50-80% defoliation | Intensive spray program required |
| **Caturra** | Very Low | 50-80% defoliation | Intensive spray program required |
| **Geisha** | Low | 30-60% defoliation | Moderate spray + shade management |
| **Catuai** | Low | 30-50% defoliation | Regular spray program |
| **SL28** | Low | 30-60% defoliation | Moderate spray + shade management |
| **Jember/S795** | Degraded | 20-40% defoliation | Resistance has broken down |

The dominance of Chiang Mai 80 in Northern Thailand (70-80% of plantings) is a direct consequence of the CLR crisis. However, as new CLR races evolve, the concentration of a single variety across the region creates systemic vulnerability. See [[Arabica-for-North-Thailand]] for detailed variety profiles.

### Management Strategies

**Resistant varieties**: Planting CLR-resistant varieties remains the most cost-effective management strategy. Chiang Mai 80 provides excellent resistance to the dominant Race II and should remain the default choice for most farmers. However, farmers should maintain variety diversity where possible and monitor for new race emergence that could overcome Chiang Mai 80's resistance.

**Copper-based fungicides (protectant)**: Copper fungicides create a protective barrier on the leaf surface that prevents spore germination. They do not cure existing infections. Bordeaux mixture (copper sulfate + lime) is the traditional and still widely used protectant, costing approximately 800-1,200 THB per application per rai. Copper hydroxide (Kocide 3000, Cuproxat) is a modern alternative with better rain-fastness, costing approximately 1,000-1,500 THB per application per rai. Apply before infection periods predicted by sensor data.

**Systemic fungicides (curative)**: Triazole fungicides (propiconazole, cyproconazole, tebuconazole) can arrest infections during the early latent period before symptoms appear. These are more expensive (1,500-2,500 THB per application per rai) but can save a crop when protectant applications were missed. They should be used strategically based on sensor-predicted infection windows. Systemic fungicides must be rotated with different modes of action to prevent resistance development.

**Sanitation pruning**: Remove and burn severely infected branches and leaves during the dry season to reduce inoculum carryover. This reduces the starting spore load for the next rainy season. Pruning also improves air circulation within the canopy, reducing leaf wetness duration.

**Shade management**: Regulate shade tree density to balance the need for protection from excessive sun (which stresses the plant) with the need for adequate airflow (which reduces leaf wetness duration). Dense shade promotes CLR by prolonging leaf wetness; no shade stresses the plant and reduces its natural defenses. Target 30-50% shade coverage during the rainy season, reducing to 20-30% during the dry season.

**Timing of sprays**: The critical insight from IoT-enabled management is that spray timing matters enormously. A protectant fungicide applied 24-48 hours before a predicted infection period (based on sensor data) is far more effective than the same fungicide applied on a fixed calendar schedule. The economic savings from reduced applications (30-50% fewer sprays) typically offset the cost of sensor deployment within 1-2 seasons.

| Management Method | Cost (THB/rai/year) | Effectiveness | IoT Integration |
|------------------|---------------------|---------------|-----------------|
| Resistant varieties (Chiang Mai 80) | 0 (at planting) | High (to Race II) | Guides variety selection |
| Bordeaux mixture (calendar) | 4,000-8,000 | Moderate | None |
| Copper fungicide (sensor-based) | 2,000-4,000 | High | [[Leaf-Wetness-Sensors]] + [[Temperature-Sensors]] |
| Triazole fungicide (targeted) | 1,500-2,500/app | High (curative) | Infection window prediction |
| Sanitation pruning | 500-1,000 (labor) | Moderate | Canopy humidity monitoring |
| Shade regulation | 300-800 (labor) | Moderate | [[Light-Sensors]] + [[Humidity-Sensors]] |

### CLR Prediction Model Using Sensor Data

A practical CLR prediction model for Northern Thailand integrates data from multiple IoT sensors to generate daily infection risk scores. The model is based on established epidemiological research adapted for local conditions.

```
Daily CLR Risk Score:
  IF leaf_wetness_hours >= 24 AND temperature_avg BETWEEN 20 AND 25:
      risk = "EXTREME" -> Apply protectant fungicide within 24 hours
  ELIF leaf_wetness_hours >= 12 AND temperature_avg BETWEEN 18 AND 28 AND humidity >= 80:
      risk = "HIGH" -> Apply protectant fungicide within 48 hours
  ELIF leaf_wetness_hours >= 6 AND temperature_avg BETWEEN 18 AND 28 AND humidity >= 70:
      risk = "MODERATE" -> Monitor daily; prepare to spray
  ELSE:
      risk = "LOW" -> No action needed
```

The model becomes more powerful with accumulated data. After 2-3 seasons of sensor data correlated with observed CLR incidence, farm-specific calibration can improve prediction accuracy from approximately 70% to approximately 85-90%.

---

## Coffee Berry Borer (CBB) — Hypothenemus hampei

### Biology and Lifecycle

The coffee berry borer (Hypothenemus hampei) is the most economically important insect pest of coffee worldwide, and it is the single most important insect pest for Northern Thailand's coffee industry. This tiny beetle (1.5-2.0 mm long) is the only insect that feeds exclusively on coffee, and its specialized biology makes it extraordinarily difficult to control once established in a plantation.

The CBB lifecycle centers on the coffee cherry. The mated female bores through the cherry skin (exocarp) at the crown end, creating a characteristic entry hole approximately 1 mm in diameter. Once inside, she excavates galleries in the endosperm (the coffee bean itself) and lays 30-50 eggs over a period of 2-3 weeks. The eggs hatch into larvae that feed on the bean tissue, passing through two larval instars before pupating inside the cherry. The entire lifecycle from egg to adult takes approximately 25-35 days at 25 degrees C, accelerating at higher temperatures. Critically, the sex ratio is heavily female-biased (approximately 10:1), and males are flightless — they remain inside the cherry, mating with their sisters before the new females emerge to seek new cherries. This inbreeding lifestyle means a single fertilized female can colonize a new area.

| Lifecycle Stage | Duration (at 25 degrees C) | Location | Notes |
|----------------|---------------------------|----------|-------|
| Female boring into cherry | 4-8 hours | Cherry surface to interior | Entry hole visible |
| Egg laying | 2-3 weeks | Inside cherry galleries | 30-50 eggs per female |
| Egg incubation | 5-9 days | Inside cherry | Temperature dependent |
| Larval feeding | 10-20 days | Inside bean tissue | Two instars; destructive feeding |
| Pupation | 5-9 days | Inside cherry | Non-feeding stage |
| Adult emergence | Continuous | Exit cherry to find new host | Only females fly; males remain |
| Total cycle (egg to adult) | 25-35 days | Inside cherry | Faster at higher temperatures |

### Climate Change and Range Expansion

One of the most alarming aspects of CBB biology is its temperature-driven range expansion. Historically, CBB was primarily a problem below 1,200 masl, with cooler temperatures at higher elevations limiting reproduction rates. However, as global temperatures rise, CBB is expanding into higher altitude zones that were previously too cool for significant population development. For Northern Thailand, this means farms at 1,200-1,500 masl that historically experienced minimal CBB pressure are now reporting increasing damage.

Research published in 2017 (Jaramillo et al.) modeled CBB thermal preferences and found that the insect's optimal temperature range for development is 24-29 degrees C, but it can reproduce at temperatures as low as 15 degrees C (albeit slowly). At 20 degrees C, the lifecycle extends to approximately 60 days; at 25 degrees C, it completes in approximately 30 days; at 28 degrees C, it can complete in approximately 22 days. Each 1 degree C increase in average temperature above 20 degrees C approximately doubles the reproductive rate, making temperature monitoring through [[Temperature-Sensors]] a critical tool for CBB risk prediction.

| Altitude (masl) | Avg Temp (degrees C) | CBB Generations/Year | Historical Risk | Current Risk |
|-----------------|---------------------|---------------------|-----------------|--------------|
| 800-1,000 | 24-26 | 6-8 | High | High |
| 1,000-1,200 | 22-24 | 4-6 | Moderate | High |
| 1,200-1,400 | 20-22 | 3-4 | Low-Moderate | Moderate-High |
| 1,400-1,600 | 18-20 | 2-3 | Low | Moderate |
| Above 1,600 | Below 18 | 1-2 | Very Low | Low-Moderate |

### Damage Assessment

CBB damage ranges from cosmetic to catastrophic depending on population density and management level. The female's boring creates an entry wound that allows secondary infections (fungi, bacteria) to enter the cherry. Larval feeding destroys the bean tissue directly, reducing bean weight, creating off-flavors, and in severe cases consuming the entire bean. Infested beans that are harvested and processed produce defective cups with a characteristic "sour" or "fermented" taint, which can downgrade an entire lot from specialty to commercial grade or render it unsellable.

| CBB Infestation Level | Damage Description | Crop Loss | Cup Quality Impact |
|----------------------|-------------------|-----------|-------------------|
| Light (<5% cherries) | Minor boring; early entry | 3-5% yield loss | Slight; may pass specialty grade |
| Moderate (5-20%) | Established galleries; larval feeding | 10-25% yield loss | Off-flavors; specialty grade unlikely |
| Severe (20-50%) | Multiple generations; bean destruction | 25-50% yield loss | Defective cup; commercial grade only |
| Catastrophic (>50%) | Complete bean destruction in many cherries | 50-80% yield loss | Unsellable as green coffee |

### Monitoring

Effective CBB management begins with monitoring. Multiple trapping methods are available, and their use in combination provides the most accurate population assessment.

**Alcohol traps**: The most cost-effective monitoring tool. CBB females are attracted to a 1:3 methanol:ethanol mixture, which mimics the volatile compounds released by ripening coffee cherries. Simple bottle traps baited with this mixture can be made for 20-50 THB each. Check traps weekly and count captured females. A threshold of 2-5 CBB per trap per week indicates the need for intervention. Alcohol bait costs approximately 50-80 THB/liter.

**Brocap traps**: Developed by CIRAD for Central American coffee, these purpose-designed traps are more effective than simple bottle traps but more expensive at 150-250 THB per trap. Recommended density is 25-30 traps per rai (approximately 40-50 traps per hectare) for effective population suppression through mass trapping. Total deployment cost per rai: 3,750-7,500 THB for traps alone, plus alcohol bait.

**Cherry sampling**: Inspect 100 randomly selected cherries per rai monthly during the fruiting season. Cut open suspicious cherries to check for CBB galleries, larvae, or adults. A 5% infestation rate in green cherries indicates the need for immediate intervention.

| Monitoring Method | Cost (THB) | Density | Accuracy | Best Use |
|-----------------|------------|---------|----------|----------|
| Alcohol bottle trap | 20-50/trap | 10-15/rai | Moderate | Low-cost monitoring |
| Brocap trap | 150-250/trap | 25-30/rai | High | Mass trapping + monitoring |
| Cherry sampling | Labor only | 100 cherries/rai | High (direct) | Ground-truth validation |
| IoT temperature monitoring | 2,000-5,000/rai (one-time) | 1-2 sensors/rai | Predictive | Risk forecasting |

### Cultural Control

Cultural practices are the foundation of CBB management and must be implemented consistently to be effective. These practices target the CBB lifecycle by removing breeding sites and reducing population carryover between seasons.

**Complete harvesting**: The single most important cultural control is to harvest ALL cherries at the end of each season, including late-ripening and dried cherries that remain on the tree. Left-behind cherries serve as CBB reservoirs, allowing the population to survive the dry season and re-infest the next crop. This requires careful attention during the final harvest pass, which adds approximately 200-400 THB per rai in labor costs but prevents far greater losses. After the main harvest, a "sanitation harvest" should strip all remaining cherries — green, ripe, and dried — and destroy them by burning or deep burial.

**Pruning**: Regular pruning maintains tree size for efficient harvesting (making complete cherry removal feasible) and improves air circulation, which helps dry the canopy faster after rain. Pruned branches with attached cherries must be removed from the plantation.

**Shade regulation**: While shade is important for coffee quality, excessive shade creates a humid microclimate that favors CBB by slowing cherry drying and providing sheltered conditions. Maintain 30-50% shade during fruit development.

**Post-harvest sanitation**: Remove all fallen cherries and processing waste (pulp, defective beans) from the plantation area. CBB can breed in fallen cherries and emerge to infest the next crop. Processing areas should be at least 50m from the nearest coffee trees.

### Biological Control

**Beauveria bassiana**: This entomopathogenic fungus is the most promising biological control agent for CBB in Northern Thailand. When CBB females come into contact with B. bassiana spores, the fungus germinates on the insect's cuticle, penetrates the body, and kills the beetle within 3-7 days. The fungus then produces more spores on the dead insect, potentially infecting other CBB individuals. B. bassiana is naturally present in Northern Thailand's highland environments, and commercial formulations are available from the Thai Department of Agriculture at 500-800 THB per rai per treatment.

Application timing is critical: B. bassiana requires high humidity (above 80% RH) and moderate temperatures (20-28 degrees C) for spore germination and infection. Apply during the rainy season when CBB females are actively seeking cherries and environmental conditions favor the fungus. Applications should target the cherry surface before CBB entry, as females already inside the cherry are protected from the fungus. Apply every 2-3 weeks during the early fruiting period (cherries at pinhead to green stage). The [[Humidity-Sensors]] data helps determine optimal spray timing for B. bassiana effectiveness.

### Chemical Control

Chemical control of CBB is challenging because the insect spends most of its lifecycle inside the cherry, protected from contact insecticides. Chemical options in Thailand are further constrained by regulatory restrictions.

**Endosulfan**: Historically the most effective CBB insecticide, but **banned in Thailand** since 2004 due to severe environmental and health hazards. Must not be used under any circumstances.

**Pyrethroids** (cypermethrin, deltamethrin): Contact insecticides that can kill CBB females on the cherry surface before they bore in. Effectiveness is limited because females bore quickly (4-8 hours) and are then protected. Cost: approximately 600-1,000 THB per rai per application. Must be applied when monitoring indicates peak CBB flight activity.

**Spinosad**: A naturally derived insecticide (from Saccharopolyspora spinosa bacteria) with lower environmental impact than synthetic pesticides. Effective against CBB females on the cherry surface. Cost: approximately 800-1,200 THB per rai per application. Permitted under organic certification in some jurisdictions. Shorter pre-harvest interval than pyrethroids.

| Chemical | Mode of Action | Cost (THB/rai/app) | PHI (days) | Legal Status (Thailand) |
|----------|---------------|---------------------|------------|------------------------|
| Endosulfan | Contact/stomach | N/A | N/A | **BANNED** |
| Cypermethrin | Contact | 600-1,000 | 14 | Permitted (restricted) |
| Deltamethrin | Contact | 600-1,000 | 14 | Permitted (restricted) |
| Spinosad | Contact/ingestion | 800-1,200 | 7 | Permitted; organic-compatible |

### CBB Risk Prediction with Temperature Sensors

Temperature is the primary driver of CBB population dynamics. By monitoring canopy temperature with [[Temperature-Sensors]], farmers can predict CBB risk and time interventions accordingly.

| Temperature Range | CBB Activity | Risk Level | Recommended Action |
|-------------------|-------------|------------|-------------------|
| Below 15 degrees C | Minimal reproduction | Very Low | Monitor only |
| 15-20 degrees C | Slow development (60-day cycle) | Low | Alcohol traps; monitor |
| 20-25 degrees C | Moderate development (30-45 day cycle) | Moderate-High | Traps + B. bassiana + sanitation |
| 25-29 degrees C | Rapid development (22-30 day cycle) | High | All control methods combined |
| Above 29 degrees C | Reduced survival | Moderate | Heat-stressed beetles may bore faster |

The integration of temperature data with CBB monitoring allows for a degree-day model that predicts when the next generation of CBB females will emerge, enabling precisely timed insecticide or B. bassiana applications.

---

## Other Diseases

### Coffee Berry Disease (CBD) — Colletotrichum kahawae

Coffee berry disease is caused by the fungus Colletotrichum kahawae and primarily affects Arabica coffee in Africa. While CBD has not been reported as a major problem in Thailand, it is listed as a quarantine concern because it is the most destructive disease of Arabica in Africa and could potentially be introduced through infected plant material. CBD attacks green cherries, causing dark, sunken lesions that can encompass the entire cherry, leading to mummification and drop. The disease thrives in cool, wet conditions at altitudes above 1,400 masl — conditions that exist in parts of Northern Thailand during the rainy season. If introduced, CBD could be devastating because Thai Arabica varieties have no selected resistance. Prevention through strict quarantine on imported plant material is essential. Farmers should be aware of symptoms: dark brown to black sunken spots on green cherries, often with orange spore masses in advanced lesions. Any suspected CBD should be reported immediately to the DOA plant quarantine office.

### Pink Disease — Corticium salmonicolor

Pink disease is a fungal infection caused by Corticium salmonicolor (also classified as Erythricium salmonicolor) that affects coffee branches and stems, particularly in warm, humid conditions. The disease is recognized by the characteristic pink to salmon-colored crusty growth on affected bark, typically at branch junctions or on young shoots. Infected branches wilt and die back from the tip, with leaves turning brown but remaining attached. Pink disease is common in Northern Thailand, especially in shaded plantations with poor air circulation during the rainy season. It is more prevalent on Robusta but affects Arabica at lower elevations (below 1,000 masl). Management involves pruning infected branches 15-20 cm below the visible pink crust, applying copper-based paste to pruning wounds, and improving air circulation through shade regulation. Severely affected branches should be removed and burned. Bordeaux mixture applied to branches during the rainy season provides protectant activity. Cost of management is primarily labor (500-1,000 THB/rai/year for pruning and paste application).

### Root Rot — Armillaria and Rosellinia

Root rot diseases are among the most insidious coffee diseases because they attack below ground, often killing trees before above-ground symptoms are obvious. Two genera are of concern in Northern Thailand:

**Armillaria root rot** (Armillaria mellea and related species): Causes white, fan-shaped mycelial mats under the bark of infected roots and the root collar. Infected trees show gradual decline — yellowing leaves, reduced growth, premature cherry drop — before sudden death as the root system is completely girdled. Armillaria spreads through root contact between adjacent trees and can persist in dead stumps for decades. Common in newly cleared forest land (which describes much of Northern Thailand's coffee area), where the fungus survives on remaining forest tree roots. Management requires removing and burning entire infected trees including as much root material as possible, and avoiding replanting in the same location for at least 2-3 years. A buffer zone of 5-10m around infected trees should be monitored closely.

**Rosellinia root rot** (Rosellinia bunodes and R. pepo): Produces characteristic black, thread-like strands on roots and white star-shaped mycelium under the bark. More common in heavy, poorly drained soils. Management centers on improving soil drainage and avoiding waterlogging. Both root rots are promoted by poor soil management (see [[Soil-Management]]) and are difficult to control chemically.

### Black Rot — Khuskia oryzae (teleomorph: Ceratocystis)

Black rot affects coffee cherries, causing them to turn black and rot on the tree, particularly during prolonged wet periods. The disease enters through wounds or CBB damage and can spread rapidly through a cluster of cherries. It is most common during the peak rainy season (July-September in Northern Thailand) when cherries are developing. Affected cherries should be removed and destroyed. Copper-based fungicides applied before prolonged wet periods can provide protection. Monitoring via [[Rainfall-Sensors]] helps anticipate risk periods.

### Thread Blight — Corticium stevensii

Thread blight is characterized by white to cream-colored thread-like fungal strands that grow along the undersides of branches and petioles, causing leaves to wilt and die while remaining attached. The disease is favored by high humidity and poor air circulation within the canopy. Common in dense, shade-grown plantations in Northern Thailand. Management involves pruning to improve air circulation, removing affected branches, and ensuring adequate spacing between trees. Generally not economically significant unless infection is severe and widespread.

| Disease | Primary Symptom | Conditions | Arabica Impact (N. Thailand) | Management Priority |
|---------|----------------|------------|------------------------------|-------------------|
| **CLR** | Orange-yellow pustules on leaf underside | Leaf wetness >6h, 20-25 degrees C | **CRITICAL** | Highest |
| **Pink disease** | Pink crust on branches | Warm, humid, poor airflow | Moderate at lower elevations | Moderate |
| **Armillaria root rot** | White mycelial mats under bark | Forest-clearing sites, root contact | Moderate | Moderate |
| **Rosellinia root rot** | Black threads on roots | Heavy, poorly drained soils | Low-Moderate | Low-Moderate |
| **Black rot** | Black rotting cherries | Prolonged wet, CBB damage | Moderate | Moderate |
| **Thread blight** | White threads on branch undersides | High humidity, dense canopy | Low | Low |
| **CBD** (quarantine) | Dark sunken lesions on green cherries | Cool, wet, above 1,400 masl | **Not present — quarantine** | Quarantine only |

---

## Other Pests

### White Stem Borer — Xylotrechus quadripes

The white stem borer (WSB) is a cerambycid beetle whose larvae tunnel through coffee stems and branches, causing wilting and dieback. The adult beetle lays eggs in bark crevices, and the hatching larvae bore into the stem, creating galleries that disrupt water and nutrient transport. Infested trees show yellowing leaves, wilting on one side, and sawdust-like frass emerging from borer holes. WSB is more common on Arabica at lower elevations (below 1,000 masl) and on stressed or weakened trees. The pest is a particular problem in Northern Thailand where coffee is often grown under shade, as shade-grown trees with thicker bark may be more attractive to egg-laying females.

Management involves keeping trees healthy through proper nutrition and water management, painting stems with lime (approximately 100 THB/rai for lime) to deter egg-laying, removing and burning severely infested stems, and applying sticky bands around the trunk to trap climbing larvae. Pheromone-based trapping is under development but not yet commercially available in Thailand. Biological control with entomopathogenic nematodes (Steinernema, Heterorhabditis) shows promise in research trials.

### Green Scale — Coccus viridis

Green scale is a soft scale insect that feeds on coffee leaves, shoots, and young twigs by inserting its mouthparts and extracting plant sap. Heavy infestations cause leaf yellowing, reduced growth, and sooty mold growth on the honeydew excreted by the scales. The sooty mold blackens leaves and reduces photosynthesis. Green scale is particularly problematic on young coffee plants (1-3 years) and in shaded plantations with poor air circulation. Natural enemies, including ladybird beetles (Coccinellidae) and parasitic wasps, usually keep green scale populations below economic thresholds in well-managed plantations. When intervention is needed, horticultural oil (1-2% solution, approximately 300-500 THB/rai) is effective against crawlers (the mobile nymph stage). Avoid broad-spectrum insecticides that kill natural enemies, as this can cause scale outbreaks to worsen.

### Mealybugs — Planococcus spp.

Mealybugs are small, soft-bodied insects covered in white waxy filaments that feed on coffee sap, particularly on young shoots, flower clusters, and cherry clusters. They excrete honeydew that promotes sooty mold, and they can transmit coffee diseases. Mealybug infestations are often associated with ant activity — ants protect mealybugs from natural enemies in exchange for honeydew. Managing ant populations (by banding tree trunks with sticky material) often allows natural enemies to control mealybugs effectively. In severe cases, targeted applications of horticultural oil or insecticidal soap (approximately 300-500 THB/rai) can reduce populations. Systemic insecticides are generally not recommended as they disrupt biological control and can leave residues in cherries.

### Leaf Miners — Leucoptera spp.

Coffee leaf miners are small moths whose larvae create characteristic serpentine mines in coffee leaves, reducing photosynthetic area. Severely mined leaves may drop prematurely. Leaf miners are generally a secondary pest in Northern Thailand, primarily affecting stressed or over-fertilized trees with excessive vegetative growth. Natural enemies (parasitic wasps in the Eulophidae family) usually keep populations in check. Chemical control is rarely justified and often counterproductive, as insecticides kill the parasitic wasps that provide natural control.

### Nematodes — Meloidogyne and Pratylenchus

Plant-parasitic nematodes are microscopic roundworms that attack coffee roots, reducing the plant's ability to absorb water and nutrients. The two most important genera in coffee are Meloidogyne (root-knot nematodes) and Pratylenchus (lesion nematodes). Root-knot nematodes cause characteristic galls (swellings) on roots, while lesion nematodes create dark, necrotic lesions. Above-ground symptoms include stunting, yellowing, and poor response to fertilizer. Nematode problems are more severe in sandy soils and in replanted coffee areas where populations have built up over successive coffee crops.

Nematode management in Northern Thailand focuses on cultural practices: maintaining soil organic matter (which supports natural nematode antagonists), avoiding replanting coffee in the same location after removing old trees, using nematode-free seedlings from certified nurseries, and intercropping with nematode-antagonistic plants such as Tagetes (marigold) and Crotalaria species. Chemical nematicides are expensive (3,000-5,000 THB/rai), environmentally harmful, and generally not recommended for smallholder coffee in Thailand. See [[Soil-Management]] for soil health practices that suppress nematodes.

| Pest | Primary Damage | Monitoring Method | Economic Threshold | Key Control |
|------|---------------|-------------------|-------------------|-------------|
| **CBB** | Bean destruction | Alcohol traps, cherry sampling | 2-5 CBB/trap/week | Sanitation + B. bassiana |
| **White stem borer** | Stem tunneling, wilting | Visual inspection for frass/holes | 5-10% trees infested | Lime paint, remove infested stems |
| **Green scale** | Sap feeding, sooty mold | Visual inspection | Heavy on young trees | Horticultural oil, conserve natural enemies |
| **Mealybugs** | Sap feeding, honeydew | Visual + ant activity | Clusters on shoots | Ant management, horticultural oil |
| **Leaf miners** | Leaf mining, defoliation | Visual leaf inspection | 10-15% leaves mined | Conserve parasitic wasps |
| **Nematodes** | Root galling/lesions | Soil/root sampling | Declining trees + root symptoms | Soil organic matter, crop rotation |

---

## Integrated Pest Management (IPM) Framework

### Principles

Integrated Pest Management (IPM) is a systematic approach to pest and disease management that combines biological, cultural, physical, and chemical tools to minimize economic losses while reducing environmental and health risks. For Northern Thailand's coffee industry, IPM is not merely a best practice — it is an economic necessity. The smallholder farmers who dominate the region's coffee production cannot afford the repeated chemical applications of a purely reactive approach, and export markets increasingly demand proof of responsible pesticide use through GAP certification and MRL compliance.

The IPM framework for Northern Thailand coffee consists of four pillars:

### 1. Prevention

Prevention is the most cost-effective IPM component. It includes:

- **Variety selection**: Plant CLR-resistant Chiang Mai 80 for most situations; avoid highly susceptible varieties unless premium quality justifies the additional management cost. See [[Arabica-for-North-Thailand]].
- **Site selection**: Avoid poorly drained sites (root rot), forest-clearing sites without proper stump removal (Armillaria), and very low-elevation sites (high CBB and CLR pressure).
- **Clean planting material**: Use nematode-free, disease-free seedlings from certified nurseries. The DOA and Royal Project Foundation provide certified seedlings.
- **Proper spacing**: Maintain 3x3m (177 trees/rai) or wider to ensure adequate air circulation, which reduces leaf wetness duration and disease pressure.
- **Shade management**: Establish and maintain regulated shade at 30-50% coverage to balance disease management with plant health.
- **Soil health**: Maintain organic matter and soil biology to suppress nematodes and root diseases. See [[Soil-Management]].

### 2. Monitoring

Regular monitoring provides the data needed for informed management decisions:

- **IoT sensor networks**: Deploy [[Leaf-Wetness-Sensors]], [[Temperature-Sensors]], and [[Humidity-Sensors]] to provide continuous environmental data for disease prediction. This is the foundation of the IoT-enabled approach.
- **Trap monitoring**: Maintain alcohol or Brocap traps for CBB population assessment (25-30 traps/rai).
- **Visual scouting**: Regular farm walks to inspect for CLR symptoms, CBB entry holes, stem borer frass, and scale/mealybug colonies.
- **Cherry sampling**: Monthly inspection of 100 cherries per rai for CBB infestation rate.
- **Record keeping**: Log all monitoring data, interventions, and outcomes for seasonal analysis and model improvement.

### 3. Threshold-Based Intervention

The defining feature of IPM is that interventions are triggered by established economic thresholds — not by the mere presence of a pest or disease. Action thresholds for Northern Thailand coffee:

| Pest/Disease | Monitoring Trigger | Action Threshold | Intervention |
|-------------|-------------------|-----------------|-------------|
| CLR | Sensor: LWD >12h + 18-28 degrees C | LWD >24h + optimal temp | Apply copper fungicide within 48h |
| CLR | Visual: first pustules seen | >5% leaves infected | Sanitation prune + systemic fungicide |
| CBB | Trap: alcohol traps | >2-5 CBB/trap/week | Deploy more traps + B. bassiana |
| CBB | Cherry: cut-open sampling | >5% cherries infested | All control methods combined |
| White stem borer | Visual: frass/holes | >5% trees infested | Remove infested stems; lime paint |
| Green scale | Visual inspection | Heavy on >20% young trees | Horticultural oil on affected trees |
| Pink disease | Visual: pink crust | Any infection on productive branches | Prune 15-20cm below lesion |

### 4. Biological and Targeted Chemical Controls

When thresholds are exceeded, IPM prioritizes biological controls and targeted chemical applications over blanket spraying:

- **Biological**: Beauveria bassiana for CBB (500-800 THB/rai), conservation of natural enemies for scale and mealybug, entomopathogenic nematodes for stem borer (research stage)
- **Targeted chemical**: Copper fungicides for CLR applied only during predicted infection windows (2,000-4,000 THB/rai/year with sensor-based scheduling vs. 4,000-8,000 with calendar-based), spinosad for CBB when B. bassiana alone is insufficient, horticultural oil for scale insects
- **Resistance management**: Rotate fungicide mode of action groups (FRAC groups); never apply the same systemic fungicide more than 3 times per season; alternate copper with triazole applications

---

## Pesticide Regulations in Thailand

### Banned Chemicals

Thailand has progressively banned several highly hazardous pesticides that were historically used in coffee production. Farmers must be aware of these bans, as using banned chemicals can result in criminal prosecution, crop destruction orders, and permanent exclusion from export markets.

| Chemical | Use (historical) | Ban Date | Reason |
|----------|------------------|----------|--------|
| **Endosulfan** | CBB control | 2004 | Persistent organic pollutant; neurotoxic |
| **Paraquat** | Weed control | June 2020 | Acute toxicity; no antidote |
| **Chlorpyrifos** | Insect control | June 2020 | Neurodevelopmental toxicity |
| **Methomyl** | Insect control | June 2020 | Acute toxicity |
| **Carbofuran** | Insect/nematode control | Previously banned | Highly toxic to birds and mammals |
| **Methamidophos** | Insect control | Previously banned | Acute neurotoxicity |

### Permitted Organic Options

For farmers seeking organic certification or simply reducing chemical use, several pesticide options are permitted under organic standards and Thai GAP:

| Product | Target | Application Rate | Cost (THB/rai/app) | Organic Permitted |
|---------|--------|-----------------|---------------------|-------------------|
| Bordeaux mixture | CLR (protectant) | 1% CuSO4 solution | 800-1,200 | Yes (most certifications) |
| Copper hydroxide | CLR (protectant) | Per label | 1,000-1,500 | Yes (with limits on total Cu) |
| Beauveria bassiana | CBB | 10^8 spores/mL | 500-800 | Yes |
| Horticultural oil | Scale, mealybug | 1-2% solution | 300-500 | Yes |
| Neem extract | General insect pest | Per label | 400-700 | Yes |
| Spinosad | CBB | Per label | 800-1,200 | Yes (some certifications) |
| Potassium bicarbonate | Fungal diseases | 0.5% solution | 200-400 | Yes |

### GAP Certification Requirements

Thailand's Good Agricultural Practices (GAP) certification, administered by the National Bureau of Agricultural Commodity and Food Standards (ACFS), is increasingly required by domestic and export buyers. Key pest management requirements include:

- Record all pesticide applications (product, rate, date, PHI observed)
- Use only registered pesticides approved for coffee
- Observe pre-harvest intervals (PHI) strictly
- No use of banned chemicals
- Proper storage and disposal of pesticide containers
- Training in safe pesticide handling
- Regular residue testing of harvested cherries

### Maximum Residue Limits (MRLs) for Export

Export markets enforce strict MRLs on coffee. Non-compliance can result in shipment rejection, financial loss, and damage to Thailand's reputation as a coffee origin. Key MRLs for common coffee pesticides:

| Pesticide | EU MRL (mg/kg) | Japan MRL (mg/kg) | US MRL (mg/kg) |
|-----------|----------------|-------------------|----------------|
| Copper (as Cu) | No specific limit (low toxicity) | No specific limit | No specific limit |
| Propiconazole | 0.05 | 0.05 | 0.05 |
| Cyproconazole | 0.05 | 0.05 | 0.05 |
| Cypermethrin | 0.05 | 0.05 | 0.05 |
| Spinosad | 0.05 | 0.3 | 0.05 |
| Chlorpyrifos | **0.01** (default) | 0.01 | 0.01 |

The extremely low MRLs for triazoles and pyrethroids underscore the importance of observing PHI and applying only when justified by monitoring data. IoT-based IPM reduces the number of applications, directly reducing residue risk.

---

## IoT-Enabled Disease Prediction

### Sensor Integration Architecture

The IoT-enabled disease prediction system for Northern Thailand coffee integrates data from multiple sensor types to generate real-time risk assessments. The system architecture follows a hub-and-spoke model with ESP32-based sensor nodes communicating via LoRaWAN (AS923 band, permitted in Thailand) to a central gateway that processes the data and generates alerts.

| Sensor | Parameter | Sampling Interval | Data Use | Cost (THB) |
|--------|-----------|-------------------|----------|------------|
| [[Leaf-Wetness-Sensors]] | Leaf wetness duration | Every 15 min | CLR infection risk (primary) | 50-5,000 |
| [[Temperature-Sensors]] | Air + soil temperature | Every 15 min | CLR + CBB risk; frost alert | 100-230 |
| [[Humidity-Sensors]] | Relative humidity | Every 15 min | CLR risk; B. bassiana timing | 100-130 |
| [[Rainfall-Sensors]] | Precipitation | Event-based | CLR dispersal risk; drying decisions | 150-300 |

### CLR Prediction Thresholds

The CLR prediction model uses combined sensor data to generate a daily infection risk index. The threshold table below is adapted from the ICAFE model used in Costa Rica, calibrated for Northern Thailand conditions:

| Leaf Wetness Duration | Temperature | Humidity | Risk Level | Action |
|----------------------|-------------|----------|------------|--------|
| >48h continuous | 20-25 degrees C | >85% | **EXTREME** | Apply protectant fungicide within 24h |
| 24-48h | 20-25 degrees C | >80% | **HIGH** | Apply protectant fungicide within 48h |
| 12-24h | 18-28 degrees C | >70% | **MODERATE** | Monitor daily; prepare to spray |
| 6-12h | 18-28 degrees C | >60% | **LOW-MODERATE** | Monitor; no action yet |
| <6h | Any | Any | **LOW** | No action needed |

### CBB Risk Prediction Thresholds

CBB risk is primarily driven by temperature, with humidity as a secondary factor:

| Avg Weekly Temperature | CBB Generations/Year | Risk Level | Action |
|----------------------|----------------------|------------|--------|
| >25 degrees C | 6-8 | **HIGH** | Full CBB management program |
| 22-25 degrees C | 4-6 | **MODERATE-HIGH** | Traps + B. bassiana + sanitation |
| 20-22 degrees C | 3-4 | **MODERATE** | Traps + sanitation; B. bassiana if needed |
| 18-20 degrees C | 2-3 | **LOW-MODERATE** | Traps + monitoring; sanitation harvest |
| Below 18 degrees C | 1-2 | **LOW** | Monitoring only |

### Seasonal Spray Schedule (Sensor-Informed)

The following spray schedule integrates sensor data with the Northern Thailand coffee calendar. Actual spray timing should be driven by sensor-triggered thresholds rather than fixed dates.

| Month | Growth Stage | CLR Risk (typical) | CBB Risk (typical) | Sensor-Informed Action |
|-------|-------------|-------------------|-------------------|----------------------|
| January | Dormant/harvest | Very Low | Very Low | Post-harvest sanitation; no sprays |
| February | End harvest | Very Low | Low | Remove all remaining cherries; prune |
| March | Early flower | Low | Low | Apply lime for stem borer; no fungicide |
| April | Flowering | Low-Moderate | Low-Moderate | Deploy CBB traps; first copper if sensor triggers |
| May | Early fruit | Moderate | Moderate | Begin sensor-based copper program; B. bassiana |
| June | Fruit development | High | Moderate-High | Copper per sensor data; B. bassiana every 2-3 weeks |
| July | Fruit development | **High-Extreme** | High | Copper + triazole if EXTREME risk; continue B. bassiana |
| August | Fruit development | **High-Extreme** | **High** | Peak management; all tools deployed |
| September | Cherry ripening | High | **High** | Continue copper; observe PHI before harvest |
| October | Main harvest | Moderate | Moderate | Final B. bassiana; PHI management |
| November | Late harvest | Low-Moderate | Low-Moderate | Sanitation harvest; post-harvest copper if needed |
| December | Post-harvest | Very Low | Very Low | Pruning; sanitation; no sprays |

---

## Data and Specifications Tables

### Disease and Pest Identification Table

| Pest/Disease | Causal Agent | Type | Key Symptom | Primary Target | Season | Severity (N. Thailand) |
|-------------|-------------|------|-------------|---------------|--------|----------------------|
| Coffee Leaf Rust | Hemileia vastatrix | Fungus | Orange-yellow pustules on leaf underside | Leaves | Rainy (May-Oct) | **Critical** |
| Coffee Berry Borer | Hypothenemus hampei | Insect | 1mm entry hole at cherry crown; galleries in bean | Cherries/beans | Fruiting season | **Critical** |
| Pink Disease | Corticium salmonicolor | Fungus | Pink crusty growth on branches | Branches/stems | Rainy season | Moderate |
| Armillaria Root Rot | Armillaria spp. | Fungus | White mycelial mats under bark; tree decline | Roots | Year-round | Moderate |
| Rosellinia Root Rot | Rosellinia spp. | Fungus | Black threads on roots; white star mycelium | Roots | Year-round (wet) | Low-Moderate |
| Black Rot | Khuskia oryzae | Fungus | Black rotting cherries | Cherries | Peak rainy season | Moderate |
| Thread Blight | Corticium stevensii | Fungus | White threads on branch undersides | Branches/leaves | Rainy season | Low |
| White Stem Borer | Xylotrechus quadripes | Insect | Frass from borer holes; wilting branches | Stems/branches | Year-round | Moderate |
| Green Scale | Coccus viridis | Insect | Green scales on shoots; sooty mold | Leaves/shoots | Year-round | Low-Moderate |
| Mealybugs | Planococcus spp. | Insect | White waxy filaments; honeydew; ant activity | Shoots/cherry clusters | Year-round | Low-Moderate |
| Leaf Miners | Leucoptera spp. | Insect | Serpentine mines in leaves | Leaves | Rainy season | Low |
| Root-knot Nematode | Meloidogyne spp. | Nematode | Root galls; above-ground stunting | Roots | Year-round | Low-Moderate |
| Lesion Nematode | Pratylenchus spp. | Nematode | Dark lesions on roots; poor growth | Roots | Year-round | Low-Moderate |

### Sensor Threshold Summary Table

| Parameter | Sensor | Low Risk | Moderate Risk | High Risk | Extreme Risk |
|-----------|--------|----------|---------------|-----------|--------------|
| Leaf Wetness Duration | [[Leaf-Wetness-Sensors]] | <6h | 6-12h | 12-24h | >24h |
| Temperature (CLR) | [[Temperature-Sensors]] | Below 15 or above 28 degrees C | 15-18 or 25-28 degrees C | 18-20 or 24-25 degrees C | 20-25 degrees C |
| Temperature (CBB) | [[Temperature-Sensors]] | Below 15 degrees C | 15-20 degrees C | 20-25 degrees C | Above 25 degrees C |
| Relative Humidity | [[Humidity-Sensors]] | Below 60% | 60-70% | 70-80% | Above 80% |
| CBB Trap Count | Alcohol/Brocap traps | 0-1/trap/week | 2-5/trap/week | 5-10/trap/week | Above 10/trap/week |
| Cherry Infestation | Visual sampling | Below 2% | 2-5% | 5-20% | Above 20% |

---

## Northern Thailand Context

### Disease Pressure by Province and Altitude

Disease and pest pressure varies significantly across Northern Thailand's coffee-growing provinces, driven primarily by altitude, rainfall patterns, and the dominant varieties planted in each area.

| Province | Key Areas | Altitude | CLR Pressure | CBB Pressure | Dominant Varieties | Key Risk Period |
|----------|-----------|----------|-------------|-------------|-------------------|----------------|
| **Chiang Mai** | Doi Inthanon, Doi Pui, Mae Chaem, Chom Thong | 800-1,700 masl | High (especially below 1,200m) | Moderate-High (increasing) | Chiang Mai 80, Geisha | June-September |
| **Chiang Rai** | Doi Chang, Doi Tung, Doi Wawi, Doi Pang Khon | 800-1,500 masl | High | High (especially Doi Chang) | Catimor, Caturra, Geisha | May-September |
| **Mae Hong Son** | Mae Sariang, Pang Mapha, Sop Moei | 800-1,400 masl | Moderate-High | Moderate | Typica, Caturra, Catuai | June-October |
| **Nan** | Thung Chang, Tha Wang Pha, Baan Maneepruek | 1,000-1,600 masl | Moderate (cooler at high altitude) | Moderate (increasing at lower sites) | Geisha, Catimor, Typica | June-September |

The pattern is clear: lower-elevation sites (800-1,000 masl) experience the highest CLR and CBB pressure due to warmer temperatures and longer leaf wetness duration. Higher-elevation sites (1,400-1,700 masl) have naturally lower disease pressure but are experiencing increasing CBB as temperatures rise. This altitude-disease gradient is exactly the kind of pattern that IoT sensor networks can monitor and quantify, enabling altitude-specific management recommendations.

### Royal Project Disease Management Programs

The Royal Project Foundation has been instrumental in developing and disseminating pest and disease management practices for Northern Thailand's coffee industry. Key contributions include:

- **Variety development**: The Chiang Mai 80 selection was developed specifically for CLR resistance under Royal Project auspices. The Foundation maintains over 40 coffee varieties at research stations for breeding and evaluation.
- **Extension services**: Royal Project extension officers provide training on disease identification, fungicide application, and CBB trapping to hill tribe communities across all four provinces.
- **Demonstration farms**: Each Royal Project station maintains demonstration plots showing IPM practices, including sensor-monitored spray scheduling at the Inthanon station.
- **Organic certification support**: The Royal Project assists farmers in transitioning to organic production, including biological control agents like Beauveria bassiana.
- **Monitoring networks**: The Royal Project operates weather stations at key growing sites, providing baseline climate data that supports disease risk modeling.

### DOA Extension Services

The Department of Agriculture (DOA) provides complementary pest management support:

- **Plant clinics**: DOA operates plant health clinics in Chiang Mai, Chiang Rai, Mae Hong Son, and Nan provinces where farmers can bring samples for free disease diagnosis.
- **Pest alerts**: DOA issues regional pest and disease advisories during the growing season, based on weather monitoring and field surveys.
- **Pesticide registration**: DOA maintains the official list of pesticides registered for use on coffee in Thailand, including MRLs and PHI requirements.
- **Training programs**: DOA offers GAP training and certification specifically for coffee producers, covering pest management, pesticide safety, and record-keeping.
- **Quarantine services**: DOA plant quarantine stations at border checkpoints inspect imported plant material to prevent introduction of exotic pests and diseases like CBD.

---

## Practical Recommendations

1. **Plant CLR-resistant varieties as the first line of defense.** Chiang Mai 80 provides excellent resistance to the dominant Race II and should be the default choice for new plantings. Maintain variety diversity on your farm (10-20% in non-Catimor varieties) as insurance against new CLR races.

2. **Deploy IoT sensors for data-driven disease management.** Start with [[Leaf-Wetness-Sensors]] and [[Temperature-Sensors]] — these two parameters drive the CLR prediction model. Add [[Humidity-Sensors]] for a complete disease risk picture. The investment (2,000-5,000 THB/rai for a basic sensor node) pays for itself within 1-2 seasons through reduced fungicide costs.

3. **Adopt sensor-based spray scheduling instead of calendar-based applications.** Apply copper fungicides only when the CLR prediction model indicates HIGH or EXTREME risk. This typically reduces applications from 8-12 per rainy season to 4-6, saving 2,000-4,000 THB/rai/year in chemical and labor costs.

4. **Implement complete sanitation harvesting for CBB control.** After the main harvest, strip ALL remaining cherries — green, ripe, and dried — and destroy them. This single practice is the most important CBB management tool and costs only 200-400 THB/rai in additional labor.

5. **Deploy 25-30 alcohol or Brocap traps per rai for CBB monitoring and mass trapping.** Total cost: 500-7,500 THB/rai depending on trap type. Check traps weekly and record counts. Use trap data alongside temperature sensor data to time B. bassiana applications.

6. **Apply Beauveria bassiana every 2-3 weeks during early fruit development** when CBB females are actively seeking cherries. Time applications to periods of high humidity (>80% RH, confirmed by sensor data) for maximum spore germination. Cost: 500-800 THB/rai per application.

7. **Practice sanitation pruning during the dry season.** Remove and burn CLR-infected branches, pink disease cankers, and stem borer-damaged wood. This reduces inoculum and pest carryover for the next season.

8. **Regulate shade to maintain 30-50% coverage during the rainy season.** Use [[Light-Sensors]] to quantify shade levels. Dense shade promotes CLR and CBB; no shade stresses the plant and reduces cherry quality.

9. **Never use banned pesticides.** Endosulfan, paraquat, and chlorpyrifos are prohibited in Thailand. Using banned chemicals risks criminal prosecution, crop destruction, and permanent exclusion from export markets. Use only DOA-registered pesticides approved for coffee.

10. **Observe pre-harvest intervals strictly.** Even permitted pesticides can leave residues that exceed MRLs if applied too close to harvest. Sensor-based spray scheduling helps ensure adequate PHI is maintained by reducing the number of applications and timing them earlier in the season.

11. **Maintain detailed records of all pest management activities.** Record sensor readings, trap counts, spray applications (product, rate, date, PHI), and disease/pest observations. These records support GAP certification, enable season-to-season analysis, and improve the accuracy of prediction models over time.

12. **Report suspected exotic diseases immediately.** If you observe symptoms consistent with coffee berry disease (dark, sunken lesions on green cherries) or any unusual pest, contact the DOA plant clinic in your province. Early detection prevents establishment.

13. **Invest in soil health as a disease prevention foundation.** Healthy soils with adequate organic matter support vigorous root systems, beneficial microorganisms that suppress soil-borne pathogens, and plants with stronger natural defenses. See [[Soil-Management]] for specific practices.

14. **Rotate fungicide modes of action to prevent resistance.** Never apply the same systemic fungicide (e.g., propiconazole) more than 3 times per season. Alternate between copper-based protectants and triazole systemics. Follow FRAC resistance management guidelines.

15. **Engage with Royal Project and DOA extension services.** Attend training sessions, visit demonstration farms, and participate in monitoring networks. The collective data from many farms improves prediction models and supports regional pest management decisions.

---

## Related Topics

- [[Cultivation-Best-Practices]] — Overall farm management framework
- [[Soil-Management]] — Soil health as a disease prevention foundation
- [[Harvesting-Techniques]] — Sanitation harvesting for CBB control
- [[Leaf-Wetness-Sensors]] — Primary sensor for CLR prediction
- [[Temperature-Sensors]] — Temperature monitoring for CLR and CBB risk
- [[Humidity-Sensors]] — Humidity monitoring for disease risk and B. bassiana timing
- [[Arabica-for-North-Thailand]] — Variety selection and CLR resistance
- [[Rainfall-Sensors]] — Rainfall data for disease dispersal prediction
- [[Climate-Change-Impact]] — Temperature-driven range expansion of CBB
- [[Northern-Thailand-Weather]] — Seasonal weather patterns driving disease pressure

---

## References

1. Avelino, J., et al. (2015). "The coffee rust crises in Colombia and Central America: economic, social and political impacts and lessons learned." ICAC Policy Brief.
2. Bieysse, D. (2012). "Coffee Leaf Rust (Hemileia vastatrix)." CIRAD Technical Manual, Montpellier, France.
3. CABI (2023). "Hypothenemus hampei (coffee berry borer)." CABI Invasive Species Compendium.
4. Department of Agriculture Thailand (2007). "Chiang Mai 80 variety registration." DOA Official Gazette.
5. Department of Agriculture Thailand (2020). "Ban of paraquat and chlorpyrifos: Notification of Ministry of Industry." Royal Thai Government Gazette.
6. Dumont, J., et al. (2018). "Potential of Beauveria bassiana for biological control of the coffee berry borer in Thailand." Biocontrol Science and Technology, 28(4), 395-410.
7. Jaramillo, J., et al. (2011). "Some like it hot: the influence and implications of climate change on coffee berry borer (Hypothenemus hampei) and coffee production in East Africa." PLoS ONE, 6(9), e24528.
8. Jaramillo, J., et al. (2017). "Climate change will upset coffee berry borer distribution and impact on coffee production." Journal of Pest Science, 90, 985-996.
9. McCook, S. (2006). "Global rust belt: Hemileia vastatrix and the ecological integration of world coffee production since 1850." Journal of Global History, 1(2), 177-195.
10. National Bureau of Agricultural Commodity and Food Standards (ACFS) (2013). "Thai Agricultural Standard: Good Agricultural Practices for Coffee." TAS 8002-2013.
11. Royal Project Foundation (2023). "Coffee variety development and pest management program." Annual Report, Chiang Mai.
12. Sittiwichai, S., et al. (2019). "Survey of coffee leaf rust races in Northern Thailand." Thai Journal of Agricultural Science, 52(3), 145-156.
13. Talhinhas, P., et al. (2017). "The coffee leaf rust pathogen Hemileia vastatrix: one and a half centuries around the tropics." Molecular Plant Pathology, 18(8), 1039-1051.
14. Thai Department of Agriculture (2022). "Registered pesticides for coffee in Thailand." DOA Pesticide Registration Division.
15. Vega, F.E., et al. (2012). "Coffee berry borer, Hypothenemus hampei (Ferrari)(Coleoptera: Curculionidae: Scolytinae)." In: Sustainable Pest Management in Coffee, USDA-ARS.
16. Waller, J.M., Bigger, M., and Hillocks, R.J. (2007). "Coffee Pests, Diseases and Their Management." CABI Publishing, Wallingford, UK.
17. Zhan, A., et al. (2021). "IoT-based disease prediction in coffee: A review of sensor technologies and prediction models." Computers and Electronics in Agriculture, 187, 106268.
18. ICAFE/CIRAD (2019). "Leaf wetness-based coffee leaf rust prediction model: Validation and implementation guide." Technical Report, Costa Rica.
19. Heinrich Boll Foundation (2025). "Brewing Change in Thailand: Coffee and Sustainable Development."
20. World Coffee Research (2024). "Variety Catalog: Disease Resistance Data." World Coffee Research, Bentonville, AR.

---

*Last updated: 2026-05-12*
