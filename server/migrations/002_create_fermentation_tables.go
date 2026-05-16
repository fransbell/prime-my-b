package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

// ═══════════════════════════════════════════════════════════════
// Fermentation Copilot — Batch management tables
// ═══════════════════════════════════════════════════════════════
//
// Collections:
//   batches          — Fermentation batch records
//   batch_readings   — Sensor readings per batch (pH, temp, weight, CO₂)
//   batch_analysis   — AI analysis results per batch
//   alerts           — System-wide alerts (replaces old sensor-only alerts)
//
// All tables allow PUBLIC create/update for all users.
// This enables the dashboard to create batches, add readings,
// trigger analysis, and manage alerts without auth barriers.

func init() {
	m.Register(func(app core.App) error {

		// ── 1. Batches ────────────────────────────────────────
		batches := core.NewCollection(core.CollectionTypeBase, "batches")

		batches.Fields = core.NewFieldsList(
			&core.TextField{Name: "name", Required: true},
			&core.TextField{Name: "coffeeVariety"},
			&core.SelectField{
				Name:     "processType",
				Required: true,
				Values:   []string{"washed", "natural", "honey", "anaerobic"},
			},
			&core.SelectField{
				Name:     "status",
				Required: true,
				Values:   []string{"active", "completed", "paused", "failed"},
			},
			&core.TextField{Name: "currentStage"},
			&core.NumberField{Name: "latestPh"},
			&core.NumberField{Name: "latestTemp"},
			&core.NumberField{Name: "latestWeight"},
			&core.NumberField{Name: "latestCo2"},
			&core.NumberField{Name: "predictedScore"},
			&core.TextField{Name: "targetFlavorProfile"},
			&core.NumberField{Name: "ambientTemp"},
			&core.TextField{Name: "notes"},
			&core.DateField{Name: "startedAt", Required: true},
			&core.DateField{Name: "endedAt"},
			// autodate
			&core.AutodateField{Name: "created", OnCreate: true, OnUpdate: false},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		publicRule := ""
		authRule := "@request.auth.id != ''"

		batches.ListRule = &publicRule
		batches.ViewRule = &publicRule
		batches.CreateRule = &publicRule  // anyone can create
		batches.UpdateRule = &publicRule  // anyone can update
		batches.DeleteRule = &authRule    // only auth users can delete

		if err := app.Save(batches); err != nil {
			return err
		}

		// ── 2. Batch Readings ──────────────────────────────────
		batchReadings := core.NewCollection(core.CollectionTypeBase, "batch_readings")

		batchReadings.Fields = core.NewFieldsList(
			&core.RelationField{
				Name:         "batch",
				Required:     true,
				CollectionId: batches.Id,
			},
			&core.NumberField{Name: "ph"},
			&core.NumberField{Name: "temperature"},
			&core.NumberField{Name: "weight"},
			&core.NumberField{Name: "co2"},
			&core.DateField{Name: "timestamp", Required: true},
			// autodate
			&core.AutodateField{Name: "created", OnCreate: true, OnUpdate: false},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		batchReadings.ListRule = &publicRule
		batchReadings.ViewRule = &publicRule
		batchReadings.CreateRule = &publicRule
		batchReadings.UpdateRule = &publicRule
		batchReadings.DeleteRule = &authRule

		if err := app.Save(batchReadings); err != nil {
			return err
		}

		// ── 3. Batch Analysis ──────────────────────────────────
		batchAnalysis := core.NewCollection(core.CollectionTypeBase, "batch_analysis")

		batchAnalysis.Fields = core.NewFieldsList(
			&core.RelationField{
				Name:         "batch",
				Required:     true,
				CollectionId: batches.Id,
			},
			&core.TextField{Name: "stage", Required: true},
			&core.NumberField{Name: "stageNumber", Required: true},
			&core.NumberField{Name: "totalStages", Required: true},
			&core.SelectField{
				Name:     "riskLevel",
				Required: true,
				Values:   []string{"safe", "caution", "warning", "critical"},
			},
			&core.NumberField{Name: "predictedScore"},
			&core.NumberField{Name: "estimatedHoursRemaining"},
			&core.TextField{Name: "recommendation", Required: true},
			// autodate
			&core.AutodateField{Name: "createdAt", OnCreate: true, OnUpdate: false},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		batchAnalysis.ListRule = &publicRule
		batchAnalysis.ViewRule = &publicRule
		batchAnalysis.CreateRule = &publicRule
		batchAnalysis.UpdateRule = &publicRule
		batchAnalysis.DeleteRule = &authRule

		if err := app.Save(batchAnalysis); err != nil {
			return err
		}

		// ── 4. Alerts ─────────────────────────────────────────
		alerts := core.NewCollection(core.CollectionTypeBase, "alerts")

		alerts.Fields = core.NewFieldsList(
			&core.RelationField{
				Name:         "batch",
				CollectionId: batches.Id,
			},
			&core.TextField{Name: "sensor"},  // keep for backward compat
			&core.SelectField{
				Name:     "type",
				Required: true,
				Values:   []string{"threshold_exceeded", "sensor_offline", "anomaly_detected", "ph_dropped", "temperature_high", "co2_critical"},
			},
			&core.SelectField{
				Name:     "severity",
				Required: true,
				Values:   []string{"low", "medium", "high", "critical"},
			},
			&core.TextField{Name: "message", Required: true},
			&core.NumberField{Name: "threshold"},
			&core.NumberField{Name: "currentValue"},
			&core.BoolField{Name: "resolved"},
			&core.DateField{Name: "resolvedAt"},
			// autodate
			&core.AutodateField{Name: "created", OnCreate: true, OnUpdate: false},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		alerts.ListRule = &publicRule
		alerts.ViewRule = &publicRule
		alerts.CreateRule = &publicRule
		alerts.UpdateRule = &publicRule  // allow anyone to ack/resolve
		alerts.DeleteRule = &authRule

		if err := app.Save(alerts); err != nil {
			return err
		}

		return nil

	}, func(app core.App) error {
		// Down: remove all collections in reverse order
		for _, name := range []string{"alerts", "batch_analysis", "batch_readings", "batches"} {
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
