package main

import (
	"fmt"
	"log"

	"github.com/pocketbase/pocketbase/core"
)

// alertCandidate matches AlertGuidelineModal thresholds.
type alertCandidate struct {
	alertType    string
	severity     string
	message      string
	sensor       string
	threshold    float64
	currentValue float64
}

// evaluateBatchAlerts creates alerts for a batch based on latest sensor metrics.
// Skips duplicate unresolved alerts of the same type for the same batch.
func evaluateBatchAlerts(app core.App, batchId string) error {
	if batchId == "" {
		return nil
	}

	batchColl, err := app.FindCollectionByNameOrId("batches")
	if err != nil {
		return err
	}
	batch, err := app.FindRecordById(batchColl, batchId)
	if err != nil {
		return err
	}

	ph := batch.GetFloat("latestPh")
	temp := batch.GetFloat("latestTemp")
	weight := batch.GetFloat("latestWeight")
	co2 := batch.GetFloat("latestCo2")

	var candidates []alertCandidate

	if ph > 0 {
		candidates = append(candidates, evaluatePH(ph)...)
	}
	if temp > 0 {
		candidates = append(candidates, evaluateTemperature(temp)...)
	}
	if co2 > 0 {
		candidates = append(candidates, evaluateCO2(co2)...)
	}
	if weight > 0 {
		if weightAlerts := evaluateWeightLoss(app, batchId, weight); len(weightAlerts) > 0 {
			candidates = append(candidates, weightAlerts...)
		}
	}

	alertsColl, err := app.FindCollectionByNameOrId("alerts")
	if err != nil {
		return err
	}

	for _, c := range candidates {
		if err := createAlertIfNew(app, alertsColl, batchId, c); err != nil {
			log.Printf("Warning: failed to create alert: %v", err)
		}
	}

	return nil
}

func evaluatePH(ph float64) []alertCandidate {
	switch {
	case ph > 6.0:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "low", sensor: "ph",
			threshold: 6.0, currentValue: ph,
			message: "Fermentation has not started yet — pH is too high",
		}}
	case ph > 5.0:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "low", sensor: "ph",
			threshold: 5.0, currentValue: ph,
			message: "Early fermentation — pH beginning to drop",
		}}
	case ph > 4.5:
		return []alertCandidate{{
			alertType: "ph_dropped", severity: "medium", sensor: "ph",
			threshold: 4.5, currentValue: ph,
			message: "Active acid development — entering critical zone",
		}}
	case ph > 4.0:
		return []alertCandidate{{
			alertType: "ph_dropped", severity: "high", sensor: "ph",
			threshold: 4.0, currentValue: ph,
			message: "pH approaching over-fermentation — consider stopping",
		}}
	default:
		return []alertCandidate{{
			alertType: "ph_dropped", severity: "critical", sensor: "ph",
			threshold: 4.0, currentValue: ph,
			message: "pH critically low — over-fermentation risk, batch may be lost",
		}}
	}
}

func evaluateTemperature(temp float64) []alertCandidate {
	switch {
	case temp < 18:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "high", sensor: "temperature",
			threshold: 18, currentValue: temp,
			message: "Too cold — fermentation stalled or very slow",
		}}
	case temp < 22:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "low", sensor: "temperature",
			threshold: 22, currentValue: temp,
			message: "Below optimal range — slow fermentation",
		}}
	case temp > 32:
		return []alertCandidate{{
			alertType: "temperature_high", severity: "critical", sensor: "temperature",
			threshold: 32, currentValue: temp,
			message: "Overheating — fermentation out of control, off-flavors likely",
		}}
	case temp > 28:
		return []alertCandidate{{
			alertType: "temperature_high", severity: "high", sensor: "temperature",
			threshold: 28, currentValue: temp,
			message: "Elevated temperature — risk of off-flavors",
		}}
	default:
		return nil
	}
}

func evaluateCO2(co2 float64) []alertCandidate {
	switch {
	case co2 > 70:
		return []alertCandidate{{
			alertType: "co2_critical", severity: "critical", sensor: "co2",
			threshold: 70, currentValue: co2,
			message: "Critical CO₂ level — ventilation needed, risk of contamination",
		}}
	case co2 > 50:
		return []alertCandidate{{
			alertType: "co2_critical", severity: "medium", sensor: "co2",
			threshold: 50, currentValue: co2,
			message: "High CO₂ activity — peak fermentation, monitor closely",
		}}
	case co2 < 20:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "low", sensor: "co2",
			threshold: 20, currentValue: co2,
			message: "Low microbial activity — fermentation may be stuck",
		}}
	default:
		return nil
	}
}

func evaluateWeightLoss(app core.App, batchId string, currentWeight float64) []alertCandidate {
	readingsColl, err := app.FindCollectionByNameOrId("batch_readings")
	if err != nil {
		return nil
	}

	records, err := app.FindRecordsByFilter(
		readingsColl,
		fmt.Sprintf(`batch="%s" && weight > 0`, batchId),
		"timestamp",
		1,
		0,
	)
	if err != nil || len(records) == 0 {
		return nil
	}

	initial := records[0].GetFloat("weight")
	if initial <= 0 || currentWeight <= 0 {
		return nil
	}

	lossPct := (initial - currentWeight) / initial * 100
	if lossPct < 10 {
		return nil
	}

	switch {
	case lossPct > 25:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "high", sensor: "weight",
			threshold: 25, currentValue: lossPct,
			message: "Excessive weight loss — possible batch failure",
		}}
	case lossPct > 15:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "medium", sensor: "weight",
			threshold: 15, currentValue: lossPct,
			message: "Significant weight loss — check for leaks or excessive drainage",
		}}
	default:
		return []alertCandidate{{
			alertType: "threshold_exceeded", severity: "low", sensor: "weight",
			threshold: 10, currentValue: lossPct,
			message: "Normal weight loss during fermentation",
		}}
	}
}

func createAlertIfNew(app core.App, alertsColl *core.Collection, batchId string, c alertCandidate) error {
	filter := fmt.Sprintf(`batch="%s" && type="%s" && resolved=false`, batchId, c.alertType)
	existing, _ := app.FindRecordsByFilter(alertsColl, filter, "-created", 1, 0)
	if len(existing) > 0 {
		return nil
	}

	record := core.NewRecord(alertsColl)
	record.Set("batch", batchId)
	record.Set("type", c.alertType)
	record.Set("severity", c.severity)
	record.Set("message", c.message)
	record.Set("sensor", c.sensor)
	record.Set("threshold", c.threshold)
	record.Set("currentValue", c.currentValue)
	record.Set("resolved", false)

	return app.Save(record)
}
