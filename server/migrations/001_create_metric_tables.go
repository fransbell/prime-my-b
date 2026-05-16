package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

// ═══════════════════════════════════════════════════════════════
// IoT Demo — Per-device metric data tables
// ═══════════════════════════════════════════════════════════════
// Each IoT device metric gets its own PocketBase collection for
// storing readings. All tables allow PUBLIC access (no auth).
//
// Collections:
//   metric_soil_moisture  — Soil Moisture VWC
//   metric_temperature    — Ambient Temperature
//   metric_humidity       — Relative Humidity
//   metric_ph             — Soil pH Level
//   metric_par            — PAR Intensity
//   metric_rainfall       — Daily Rainfall
//   metric_nitrogen       — Nitrogen (N)
//   metric_phosphorus     — Phosphorus (P)
//   metric_potassium      — Potassium (K)

func init() {
	m.Register(func(app core.App) error {
		type metricDef struct {
			name     string
			deviceId string
			metricId string
			unit     string
		}

		metrics := []metricDef{
			{name: "metric_soil_moisture", deviceId: "soil-moisture-sensor", metricId: "soil-moisture-vwc", unit: "%"},
			{name: "metric_temperature", deviceId: "temp-humidity-sensor", metricId: "ambient-temperature", unit: "°C"},
			{name: "metric_humidity", deviceId: "temp-humidity-sensor", metricId: "relative-humidity", unit: "%"},
			{name: "metric_ph", deviceId: "soil-ph-sensor", metricId: "soil-ph-level", unit: "pH"},
			{name: "metric_par", deviceId: "light-par-sensor", metricId: "par-intensity", unit: "μmol/m²/s"},
			{name: "metric_rainfall", deviceId: "rain-gauge", metricId: "daily-rainfall", unit: "mm"},
			{name: "metric_nitrogen", deviceId: "npk-sensor", metricId: "nitrogen-level", unit: "mg/kg"},
			{name: "metric_phosphorus", deviceId: "npk-sensor", metricId: "phosphorus-level", unit: "mg/kg"},
			{name: "metric_potassium", deviceId: "npk-sensor", metricId: "potassium-level", unit: "mg/kg"},
		}

		for _, mc := range metrics {
			coll := core.NewCollection(core.CollectionTypeBase, mc.name)

			// ── Fields ──
			coll.Fields = core.NewFieldsList(
				// System autodate fields (timestamps for sorting & chart)
				&core.AutodateField{Name: "created", OnCreate: true, OnUpdate: false},
				&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
				// Custom data fields
				&core.NumberField{Name: "value", Required: true},
				&core.TextField{Name: "unit", Required: true},
				&core.SelectField{
					Name:     "status",
					Required: true,
					Values:   []string{"best", "good", "normal", "bad", "critical"},
				},
				&core.TextField{Name: "device_id", Required: true},
				&core.TextField{Name: "metric_id", Required: true},
				&core.SelectField{
					Name:     "source",
					Required: false,
					Values:   []string{"sensor", "manual", "demo_action"},
				},
			)

			// ── Public API Rules (no auth required) ──
			// In PocketBase v0.38:
			//   nil (pointer) = only superusers (most restrictive)
			//   "" (empty string) = public, no auth needed (least restrictive)
			//   "@request..." = rule-based filter
			publicRule := ""
			coll.ListRule = &publicRule
			coll.ViewRule = &publicRule
			coll.CreateRule = &publicRule
			// Update/Delete: nobody
			deny := "@request.auth.id != '' && @request.auth.id = 'nobody'"
			coll.UpdateRule = &deny
			coll.DeleteRule = &deny

			if err := app.Save(coll); err != nil {
				return err
			}
		}

		return nil
	}, func(app core.App) error {
		names := []string{
			"metric_soil_moisture", "metric_temperature", "metric_humidity",
			"metric_ph", "metric_par", "metric_rainfall",
			"metric_nitrogen", "metric_phosphorus", "metric_potassium",
		}

		for _, name := range names {
			coll, err := app.FindCollectionByNameOrId(name)
			if err != nil {
				continue
			}
			if err := app.Delete(coll); err != nil {
				return err
			}
		}

		return nil
	})
}
