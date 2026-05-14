package main

import (
	"log"
	"os"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: getEnv("PB_DATA_DIR", "./pb_data"),
	})

	// Register auto-migration plugin
	migratecmd.MustRegister(app, migratecmd.Config{
		Dir:         "migrations",
		Automigrate: getEnv("PB_AUTO_MIGRATE", "true") == "true",
	})

	// Register custom API routes
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// Health check endpoint
		se.Router.GET("/api/custom/health", func(e *core.RequestEvent) error {
			return e.JSON(200, map[string]interface{}{
				"ok":      true,
				"version": "0.0.1",
			})
		})

		return se.Next()
	})

	// Register hooks for sensor readings
	app.OnRecordAfterCreateRequest("sensor_readings").Add(func(e *core.RecordCreateEvent) error {
		// After a sensor reading is created, update the sensor's lastReading timestamp
		// and check for threshold alerts
		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}
