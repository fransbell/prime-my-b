package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

// ═══════════════════════════════════════════════════════════════
// Analysis History — archives past AI analysis before overwrite
// ═══════════════════════════════════════════════════════════════
//
// When a new AI analysis is triggered, the previous analysis is
// copied here so users can review how fermentation progressed.

func init() {
	m.Register(func(app core.App) error {

		// Look up the batches collection for the relation
		batchesColl, err := app.FindCollectionByNameOrId("batches")
		if err != nil {
			return err
		}

		analysisHistory := core.NewCollection(core.CollectionTypeBase, "analysis_history")

		analysisHistory.Fields = core.NewFieldsList(
			&core.RelationField{
				Name:         "batch",
				Required:     true,
				CollectionId: batchesColl.Id,
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
			&core.TextField{Name: "originalAnalysisId"}, // id of the original batch_analysis record
			// autodate
			&core.AutodateField{Name: "created", OnCreate: true, OnUpdate: false},
			&core.AutodateField{Name: "updated", OnCreate: true, OnUpdate: true},
		)

		publicRule := ""
		authRule := "@request.auth.id != ''"

		analysisHistory.ListRule = &publicRule
		analysisHistory.ViewRule = &publicRule
		analysisHistory.CreateRule = &publicRule
		analysisHistory.UpdateRule = &authRule
		analysisHistory.DeleteRule = &authRule

		if err := app.Save(analysisHistory); err != nil {
			return err
		}

		return nil

	}, func(app core.App) error {
		// Down: remove the collection
		coll, err := app.FindCollectionByNameOrId("analysis_history")
		if err != nil {
			return nil
		}
		return app.Delete(coll)
	})
}
