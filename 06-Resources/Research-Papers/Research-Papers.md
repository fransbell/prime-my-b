---
topic: Research Papers & References
phase: 06-Resources
status: complete
created: 2026-05-12
updated: 2026-05-12
tags: [research, references, academic, coffee, iot, thailand, climate, sensors, agriculture]
related: [[Suppliers-Thailand]], [[Government-Programs]], [[Glossary]]
---

# Research Papers & References

> **Summary**: Comprehensive bibliography of all research papers, academic studies, government reports, and authoritative sources cited across the Coffee Agriculture Knowledge Base, organized by topic with annotations for Northern Thailand relevance.

---

## Overview

This document consolidates every reference cited across Phases 1-5 of the Coffee Agriculture Knowledge Base into a single, searchable bibliography. Sources range from peer-reviewed journal articles on coffee physiology and climate science, to Thai government agricultural extension publications, to commercial product specifications for IoT sensors. The references are organized thematically to help researchers, developers, and farmers quickly locate authoritative sources on specific topics. Each entry includes a brief annotation explaining its relevance to IoT-driven coffee farming in Northern Thailand.

The knowledge base draws on approximately 95+ unique sources, with the heaviest concentration of scholarly citations in the Environment (Phase 2) and Coffee Varieties (Phase 3) sections. Phase 1 (IoT Hardware) relies primarily on commercial specifications and practical engineering sources, while Phase 2 incorporates climate science, physiology, and disease modeling literature. Phase 3 draws on Thai government variety registration data, international coffee research institutions, and market analysis.

---

## Climate Science & Coffee Physiology

### Core Climate-Coffee Studies

| # | Reference | Key Finding | Relevance |
|---|-----------|-------------|-----------|
| 1 | **Kath, J., Byrareddy, V.M., Craparo, A., et al. (2020)**. "Not so robust: Robusta coffee production is highly sensitive to temperature." *Global Change Biology*, 26(6):3677-3688. | Robusta yields decline sharply above 20.5°C mean annual temperature; optimal range is narrower than previously thought (22-26°C not 22-30°C) | Critical for understanding Robusta viability in warming Northern Thailand lowlands; directly challenges assumption that Robusta is "climate-safe" |
| 2 | **DaMatta, F.M. & Ramalho, J.D.C. (2006)**. "Impacts of drought and temperature stress on coffee physiology and production." *Brazilian Journal of Plant Physiology*, 18(1):55-74. | Coffee has narrow optimal temperature ranges; drought stress reduces photosynthesis by 50-80%; recovery depends on stress duration | Foundational physiology reference for understanding sensor threshold design — explains why temperature and soil moisture monitoring are critical |
| 3 | **Bunn, C., Laderach, P., Ovalle, O., et al. (2015)**. "A bitter cup: Climate change profile of global production of Arabica and Robusta coffee." *Climatic Change*, 129:89-101. | Global Arabica suitability projected to decline 50% by 2050 under moderate warming scenarios; high-altitude refugia identified | Context for long-term coffee farming strategy in Northern Thailand; explains urgency of climate adaptation and IoT monitoring |
| 4 | **IPCC AR6 (2021-2023)**. Sixth Assessment Report — Regional projections for Southeast Asia. | Southeast Asia warming 0.5-1.5°C by 2050; rainfall intensity increasing while dry seasons lengthen; extreme heat events doubling | Baseline climate projection for all climate impact analysis in the knowledge base |
| 5 | **Grüssner, A., Laderach, P., et al.** Global Arabica suitability projections using multiple climate models. | Model ensemble projections show 25-75% Arabica area loss depending on emission scenario; high-elevation areas gain suitability | Validates Northern Thailand's highland advantage for Arabica production under climate change |

### Drought & Temperature Stress

| # | Reference | Key Finding |
|---|-----------|-------------|
| 6 | **Partelli, F.L., et al. (2010, 2013)**. C. canephora growth rate and minimum temperature thresholds. *Agronomy* and *Australian Journal of Crop Science*. | Robusta growth ceases below 10°C; leaf damage below 7°C; optimal night temperature 18-22°C. Confirms limited Robusta potential above 800m in Northern Thailand |
| 7 | **Noppakoonwong, U., et al. (2015)**. Thai Arabica research. *ASIC Proceedings*. | Thailand-specific Arabica yield data; 18.9% yield loss per 1°C minimum temperature drop during fruit maturity stage |
| 8 | **WMO (2023)**. Global warming trends and diurnal temperature range analysis. | Diurnal temperature range (DTR) is narrowing globally; impacts coffee quality which depends on large DTR (10-15°C) for slow cherry maturation and sugar development |

---

## Coffee Leaf Rust & Disease Modeling

| # | Reference | Key Finding | Relevance |
|---|-----------|-------------|-----------|
| 9 | **ICAFE (Coffee Institute of Costa Rica)**. Leaf wetness duration as CLR infection predictor. | CLR infection risk: >6h leaf wetness at 20-25°C = infection likely; >24h = HIGH risk; sporulation peaks at 21°C with 95% RH | Directly informs sensor alert thresholds for leaf wetness + humidity monitoring |
| 10 | **López-Bravo, D.E., Virginio-Filho, E.M., et al. (2012)**. "Shade is conducive to coffee leaf rust." *Crop Protection*, 49:47-57. | Shade trees increase CLR incidence by 5-15% due to higher humidity and leaf wetness; but also reduce CBB; trade-off management required | Critical for designing shade management recommendations that balance CLR risk against CBB protection |
| 11 | **PMC/NIH (2023)**. Coffee leaf rust epidemiology and humidity thresholds. Systematic review. | CLR epidemics require: (1) susceptible host, (2) inoculum, (3) free water on leaves >6h, (4) temperature 15-28°C. Removing any factor breaks the disease triangle | Foundation for sensor-driven CLR prediction model design |
| 12 | **METOS/Pessl Instruments**. CLR disease models and climate interaction documentation. | Commercial disease model integrates leaf wetness, temperature, and humidity into CLR risk index; validated in multiple coffee-growing regions | Practical model for adapting to Thai conditions; basis for alert threshold design |

---

## Light, Shade & Photosynthesis

| # | Reference | Key Finding | Relevance |
|---|-----------|-------------|-----------|
| 13 | **Kumar, D. & Tieszen, L.L. (1980)**. "Photosynthesis in Coffea arabica." *Journal of Experimental Botany*, 31(121):33-41. | Arabica light saturation at ~300 µmol/m²/s PPFD; only 15-20% of full tropical sunlight needed for maximum photosynthesis | Scientific basis for shade requirements; explains why 40-70% shade is optimal for coffee |
| 14 | **Friend, D.J.C. (1984)**. Light saturation 300-600 µmol/m²/s for Arabica. Cited in Springer (2025) review. | Confirmed saturation range; shade-acclimated plants saturate at lower PPFD | Validates sensor-based shade monitoring approach using BH1750 lux sensors |
| 15 | **Frontiers in Sustainable Food Systems (2022)**. "Coffee maintains net photosynthesis up to 55% light reduction." DOI: 10.3389/fsufs.2022.877476 | Shade-acclimated Arabica maintains photosynthesis at 45% full sun; confirms shade tolerance for agroforestry systems | Supports shade management recommendations and sensor threshold design |
| 16 | **Piato, K., et al.** Shade optima for yield under 40% for both C. arabica and C. canephora. | Maximum cherry yield at ~40% shade for both species; yield declines above 60% shade | Optimal shade target for sensor monitoring |
| 17 | **EyouAgro (2025)**. Best shade percentage for Arabica seedlings. | 75-80% shade optimal for nursery seedlings; gradually reduce to 40-50% for mature trees | Stage-specific shade targets for sensor-based monitoring |
| 18 | **López-Bravo et al. (2012)**. Antagonistic effects of shade on CLR vs. yield. See #10 above. | Shade reduces yield slightly but increases CLR; optimal balance at 35-50% shade | Trade-off analysis for shade management |

---

## Coffee Quality & Processing Science

| # | Reference | Key Finding |
|---|-----------|-------------|
| 19 | **Rajamangala University of Technology Lanna**. Coffee fermentation and processing innovations (Brixter Process, Coffivino Process). | Novel fermentation techniques developed in Northern Thailand for specialty coffee quality enhancement; controlled fermentation using temperature and pH monitoring |
| 20 | **PubMed 24458775**. Net photosynthesis values for shade-acclimated coffee. | Shade-acclimated Arabica: 2.0 and 4.4 µmol CO₂/m²/s; sun-acclimated: significantly higher; demonstrates physiological adaptation |
| 21 | **CQI (Coffee Quality Institute)**. Fine Robusta standards and Q Robusta Grader certification. | Standardized protocol for evaluating Robusta quality; scoring 80+ = Fine Robusta; relevant for emerging Northern Thailand Robusta quality programs |
| 22 | **Thailand Cup of Excellence 2025**. Results and scoring data. | First CoE event in Thailand; demonstrates specialty coffee potential; winning lots scored 86+; provides price benchmarks for Thai specialty coffee |

---

## Thai Coffee-Specific Studies & Reports

### Government & Institutional Reports

| # | Reference | Coverage |
|---|-----------|----------|
| 23 | **DOA Horticulture Research Institute**. Arabica Coffee Variety Fact Sheets. doaplant.doa.go.th | Official variety registration data for Chiang Mai 80, DOA Chiang Mai 1; yield, disease resistance, cup quality |
| 24 | **DOAE**. Arabica Coffee Seedling Production Program 2024. ndoae.doae.go.th | Seedling production schedules, distribution system, variety availability |
| 25 | **HRDI**. Arabica Coffee Knowledge Base. hkm.hrdi.or.th | Comprehensive Thai-language coffee farming knowledge base; planting, cultivation, processing guides |
| 26 | **OAE (2024)**. Chiang Mai Arabica production statistics. | Planted area: 35,385 rai; Cherry production: 17,250 tons; Average yield: 500 kg/rai |
| 27 | **Lanna Thai Coffee Hub, Chiang Mai University**. lannathaicoffeehub.agri.cmu.ac.th | Production cost ~7,911 THB/rai; Arabica bean price 163 THB/kg (2025); online mapping platform for coffee areas |
| 28 | **ThaiPublica (2024)**. "กวก.เชียงใหม่ 1" variety announcement. | DOA Chiang Mai 1 variety details; 3.8-4.0 kg cherry/tree yield; cup score 76.75/100 |

### International Organization Reports

| # | Reference | Coverage |
|---|-----------|----------|
| 29 | **Heinrich Böll Foundation (2025)**. "Brewing Change in Thailand: Coffee Farming in Northern Thailand." | Comprehensive report on Thai coffee farming social, economic, and environmental dimensions; cited across 6 documents in this knowledge base |
| 30 | **FAO**. Arabica Coffee Production Manual for Lao PDR. | Slope aspect recommendations, altitude-climate relationships; applicable to similar conditions in Northern Thailand |
| 31 | **FAO (2013)**. National yield average data. | Thailand average coffee yield 980 kg/hectare; benchmark for yield improvement targets |
| 32 | **FAO**. Climate-smart agriculture for coffee. | Climate adaptation framework; IoT integration recommendations for coffee monitoring |
| 33 | **GIZ Thai-German Cooperation**. Coffee++ Thailand Project documentation (2023-2025). | Climate adaptation for coffee communities; farmer training programs; market access improvement in Northern Thailand |

### Media & Industry Reports

| # | Reference | Coverage |
|---|-----------|----------|
| 34 | **Nation Thailand (2025)**. "The Coffee Tree of 'Father': From Opium Fields to Arabica Forests." | History of Royal Project coffee development; opium replacement success story |
| 35 | **Nation Thailand (Jan 2026)**. "Thai GI coffee sales top THB 1.49bn in 2025." | GI-registered coffee (Doi Tung, Doi Chaang) market performance; consumer demand growth |
| 36 | **Thai PBS World (2025)**. Thai coffee market value 65 billion THB. | Total Thai coffee market size; growth trends; specialty segment expansion |
| 37 | **Money and Banking Magazine (2024)**. Specialty coffee price analysis. | Price premiums for specialty vs. commodity; investment analysis for coffee farming |
| 38 | **Rabobank (2026)**. Coffee market analysis. | Global coffee market projections; 20% suitable area loss by 2050; price volatility forecasts |
| 39 | **ODI (2025)**. Halving of suitable coffee area by 2050. | Development implications of coffee area loss; adaptation financing needs |
| 40 | **Climate Central (2025)**. Thailand heat analysis. | Thailand warming rate exceeding global average; additional hot days projection for Northern Thailand provinces |

---

## IoT & Smart Agriculture Research

| # | Reference | Key Finding | Relevance |
|---|-----------|-------------|-----------|
| 41 | **NECTEC/NSTDA**. HandySense B-Farm platform documentation. | Open-source IoT platform for Thai agriculture; free cloud hosting; supports soil moisture, temperature, humidity sensors; estimated cost ~2,000-5,000 THB/node | Primary reference for IoT system architecture; can be used as foundation for coffee sensor system |
| 42 | **Apogee Instruments**. PPFD to Lux conversion: factor 54 for sunlight. | Technical conversion factor for using lux sensors (BH1750) as proxy for PAR measurement | Enables low-cost light monitoring with BH1750 instead of expensive PAR sensors |
| 43 | **Cave Pearl Project (2024)**. BH1750 calibration for PAR measurement. | Validated method for using BH1750 as coffee shade monitoring tool; calibration protocol for field deployment | Practical guide for sensor calibration in coffee farms |
| 44 | **Khun Mae Kuang Forest Reserve research**. Shade-grown vs. open-field coffee microclimate. | Shade-grown coffee has 2-4°C lower temperature, 15-25% higher humidity, 60-80% lower soil temperature fluctuation | Quantifies microclimate benefits of shade trees; validates sensor-based monitoring approach |
| 45 | **HOBO / METER / Campbell Scientific**. Sensor placement protocols for agricultural monitoring. | Standard protocols for sensor height, shielding, and placement for accurate agricultural microclimate measurement | Installation standards for field deployment |

---

## Coffee Variety Research

### International Variety Research

| # | Reference | Coverage |
|---|-----------|----------|
| 46 | **World Coffee Research**. Variety Catalog (worldcoffeeresearch.org). | Comprehensive catalog of Arabica and Robusta varieties worldwide; disease resistance, cup quality, altitude range, yield data |
| 47 | **World Coffee Research (2024)**. "The Roots of Robusta: Global Breeding Program." | New global Robusta breeding initiative; 15 countries participating; aims to develop climate-resilient Robusta varieties |
| 48 | **Ozone Coffee UK**. Chiang Mai 80 varietal profile. | Detailed cup profile analysis; tasting notes, roast recommendations; market positioning for specialty segment |

### Thai Variety Development

| # | Reference | Coverage |
|---|-----------|----------|
| 49 | **ResearchGate**. "Research and Development of Arabica Coffee in Thailand" (H528 cultivar data). | Academic publication on Thai Arabica breeding; H528/46 and H420/9 Catimor line performance data |
| 50 | **ASEAN Sustainable Agrifood Systems (2020)**. "Taking Robusta coffee of Southern Thailand to another level." | Chumphon Horticultural Research Center Robusta development roadmap; Chumphon 1 & 2 variety performance |
| 51 | **ThaiJO**. "Cultivar-specific plasticity of robusta coffee" (FRT141 at Chumphon). | FRT-series clone performance data; yield, disease resistance, cup quality evaluation at CHRC |
| 52 | **Nestle (May 2026)**. "New research reveals how a carefully selected mix of coffee varieties can increase yields." | Variety mixture approach; 15-25% yield improvement with strategic variety combinations |
| 53 | **Q Project Thailand (2024)**. Chiang Rai coffee directory. | Comprehensive directory of Chiang Rai coffee producers, varieties, and processing methods |
| 54 | **Old Quarter Coffee**. Heirloom Thai varieties profile. | Documentation of traditional/historical varieties in Northern Thailand beyond registered varieties |

---

## Microclimate & Environmental Factors

| # | Reference | Key Finding |
|---|-----------|-------------|
| 55 | **FAO**. Slope aspect recommendations for coffee (Arabica Coffee Manual). | East-facing slopes preferred; morning sun + afternoon shade; 10-15% yield advantage vs. west-facing |
| 56 | **Bangkok Post / Nation Thailand (2025-2026)**. Frost coverage at Doi Inthanon. | Annual frost events at 1,800+ masl; January-February peak; critical for Arabica site selection at highest altitudes |
| 57 | **USDA Forest Service**. Windbreak design and protection distance. | Effective windbreak distance = 10-15x tree height; 30-50% wind reduction within protected zone |
| 58 | **PMC/NIH (2023)**. Water body microclimate moderation study. | Water bodies reduce temperature extremes by 2-4°C within 50-100m; increase humidity 5-10%; relevant for coffee planted near reservoirs |
| 59 | **Vikaspedia India Coffee Guide**. Slope aspect for coffee. | Confirms east-facing preference; adds mid-slope thermal belt concept for frost avoidance |
| 60 | **Ethiopian coffee quality studies**. East-facing slope quality advantages. | East-facing slopes produce higher-quality coffee in Ethiopian studies; attributed to morning dew + afternoon protection pattern |

---

## Climate Data Sources

| # | Reference | Coverage | URL |
|---|-----------|----------|-----|
| 61 | **Thai Meteorological Department (TMD)** | Official 30-year rainfall normals; temperature records; monthly climate data for all provinces | tmd.go.th |
| 62 | **Climate-data.org** | Temperature, precipitation, humidity, sunshine hours (1991-2021 baseline) for Thai provinces | climate-data.org |
| 63 | **Climatestotravel.com** | Detailed monthly climate data (1991-2020) | climatestotravel.com |
| 64 | **Weather-atlas.com** | Monthly climate data for Mae Hong Son and other provinces | weather-atlas.com |
| 65 | **KÖPPEN-GEIGER Climate Classification** | Thailand climate zone classification; Aw/Am (lowland tropical), Cwa (highland subtropical) | ResearchGate publication |
| 66 | **Thai Land Development Department** | Monsoon timing, soil classification, land use data for Northern Thailand | ldd.go.th |

---

## Robusta-Specific Research

| # | Reference | Coverage |
|---|-----------|----------|
| 67 | **Helena Coffee Vietnam (2022)**. "Ecological Requirements of Coffee Plants." | Comprehensive Robusta ecological requirements from Vietnamese perspective; applicable to similar conditions in Thailand |
| 68 | **MDPI Agronomy (2025)**. "Genotypic Performance of Coffea canephora at Transitional Altitudes." | Robusta performance at 600-1,000m; yield and quality data for transitional elevation zones relevant to Northern Thailand |
| 69 | **ChocoStory Belgium**. Thailand Expedition Report; Chumphon Horticultural Research Center. | Historical development of Thai Robusta; CHRC breeding program; French-Thai coffee cooperation |
| 70 | **RootsBKK (2021)**. "Bringing Thailand's Robusta coffee to new heights." Kaleb Jordan interview. | Fine Robusta movement in Thailand; specialty Robusta processing; Nan Province case study |
| 71 | **MySakonnakhon**. "The Best Robusta Coffee in Thailand - Mo Kro, Tak Province." | Northern Thailand Robusta production; Mo Kro GI potential; quality differentiation |
| 72 | **Thailand NOW**. "Robusta Yala Coffee: A unique taste from Yala." | Southern Thailand Robusta traditions; GI registration; market positioning |

---

## Agroforestry & Shade Management

| # | Reference | Key Finding |
|---|-----------|-------------|
| 73 | **SAN (Sustainable Agriculture Network)**. Minimum 70 shade trees/ha, 12 native species recommendation. | Agroforestry standard for sustainable coffee certification; biodiversity + microclimate benefits |
| 74 | **ResearchGate**. Khun Mae Kuang Forest, N. Thailand: Inga sp. most compatible shade model. | Inga (Inga edulis) identified as most compatible shade tree for Northern Thailand coffee; nitrogen-fixing, appropriate canopy density |
| 75 | **Agriculture Institute India**. Robusta shade: 40-50% (rainfed), 30-40% (irrigated). | Irrigated Robusta needs less shade; relevant for farms with irrigation infrastructure |
| 76 | **Nation Thailand**. Doi Tung: 100% Arabica under lychee trees at 1,200 masl. | Lychee as shade tree for coffee; dual-income model; success story from Doi Tung Development Project |

---

## Market & Economic Analysis

| # | Reference | Coverage |
|---|-----------|----------|
| 77 | **Thai PBS World (2025)**. Thai coffee market value 65 billion THB. | Total market size; growth trajectory; domestic vs. export breakdown |
| 78 | **Money and Banking Magazine (2024)**. Specialty coffee price analysis. | Investment returns for specialty vs. commodity coffee; cost-benefit analysis |
| 79 | **Rabobank (2026)**. Coffee market analysis. | Global coffee commodity market; supply-demand projections; price forecasts |
| 80 | **OAE (2024)**. Chiang Mai Arabica production statistics. | Per-province production data; yield benchmarks; area statistics |
| 81 | **Arabica coffee futures $4.30/lb record (2025)**. Market data. | Record commodity coffee prices in 2025; impact on Thai farmer income and planting decisions |

---

## Geographic Indication & Certification

| # | Reference | Coverage |
|---|-----------|----------|
| 82 | **DIP (Department of Intellectual Property), Ministry of Commerce**. GI Registration database. | Doi Tung Coffee GI (2006); Doi Chaang Coffee GI (2006, EU PGI 2015); registration process and requirements |
| 83 | **ASEAN Sustainable Agrifood Systems (2020)**. Robusta development roadmap. | GI development for Robusta; quality standardization; market positioning for Thai Robusta |

---

## Cross-Reference Index

The following sources are cited in multiple knowledge base documents and serve as foundational references:

| Source | Cited In |
|--------|----------|
| **Kath et al. (2020)** — Robusta temperature sensitivity | Climate-Change-Impact, Arabica-Climate-Range, Robusta-Climate-Range, Robusta-for-North-Thailand |
| **DaMatta & Ramalho (2006)** — Drought and temperature stress | Arabica-Climate-Range, Robusta-Climate-Range |
| **Heinrich Böll Foundation (2025)** — Thailand coffee farming | Climate-Change-Impact, Arabica-Climate-Range, Northern-Thailand-Weather, Microclimate-Factors, Arabica-for-North-Thailand, Variety-Selection-Guide |
| **World Coffee Research** — Variety catalog and climate adaptation | Climate-Change-Impact, Arabica-Climate-Range, Robusta-Climate-Range, Arabica-for-North-Thailand, Variety-Selection-Guide |
| **FAO** — Coffee production manuals | Climate-Change-Impact, Arabica-Climate-Range, Microclimate-Factors |
| **PMC/NIH** — Coffee quality, CLR epidemiology | Climate-Change-Impact, Arabica-Climate-Range, Microclimate-Factors |
| **Royal Project Foundation** — Highland agriculture, variety development | Climate-Change-Impact, Microclimate-Factors, Seed-Source-Thailand, Arabica-for-North-Thailand, Variety-Selection-Guide |
| **METOS/Pessl** — CLR disease models | Climate-Change-Impact, Microclimate-Factors |
| **Nation Thailand** — Multiple articles | Coffee-Sunlight-Requirements, Microclimate-Factors, Seed-Source-Thailand, Variety-Selection-Guide, Robusta-for-North-Thailand |
| **ASEAN Sustainable Agrifood Systems** — Robusta development | Robusta-Climate-Range, Robusta-for-North-Thailand, Variety-Selection-Guide, Seed-Source-Thailand |
| **NECTEC/NSTDA** — HandySense/B-Farm platform | Communication-Modules, Climate-Change-Impact |
| **ICAFE (Costa Rica)** — CLR prediction model | Leaf-Wetness-Sensors |

---

## Practical Recommendations

1. **For IoT system developers**: Prioritize references #9 (ICAFE CLR model), #11 (PMC CLR epidemiology), #41 (HandySense B-Farm), and #42-43 (sensor calibration) as the technical foundation for alert threshold design and sensor deployment.
2. **For coffee agronomists**: Kath et al. (2020), DaMatta & Ramalho (2006), and the FAO coffee manuals provide the physiological basis for understanding why specific sensor thresholds matter for coffee quality and yield.
3. **For Thai government program designers**: The Böll Foundation (2025) report, OAE production statistics, and Royal Project Foundation publications provide the socioeconomic context needed for program design and farmer adoption strategies.
4. **For researchers**: This bibliography identifies significant gaps — particularly the lack of Thailand-specific IoT coffee farming studies, Northern Thailand Robusta quality research, and parametric insurance models for coffee — that represent high-value research opportunities.
5. **For variety selection**: World Coffee Research variety catalog, DOA variety registration data, and CHRC Robusta breeding publications are the primary decision-making references.

---

## Related Topics

- [[Suppliers-Thailand]] — Where to purchase sensors and equipment
- [[Government-Programs]] — Government support programs for coffee IoT farming
- [[Glossary]] — Terminology used in this knowledge base
- [[System-Cost-Estimate]] — Hardware cost analysis based on supplier pricing

---

*Last updated: 2026-05-12*
