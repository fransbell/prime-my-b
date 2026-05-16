package main

import (
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"

	// Register Go migrations (auto-init via init())
	_ "github.com/fransbell/prime-my-b/server/migrations"
)

// ═══════════════════════════════════════════════════════════════
// LINE Login OAuth2 Flow — PocketBase Custom Auth
// ═══════════════════════════════════════════════════════════════
//
// Flow:
// 1. LIFF app initializes LINE Login → gets ID token
// 2. LIFF sends POST /api/custom/auth/line { idToken }
// 3. Server verifies ID token with LINE's verification API
// 4. Server finds or creates PocketBase user with lineUserId
// 5. Server authenticates and returns PocketBase auth token
//
// Only requires LINE_CLIENT_ID for verification.
// We verify the ID token against LINE's public endpoint to ensure
// the token was issued for our channel and hasn't expired.

// LineIDTokenVerification represents the response from LINE's verify endpoint
type LineIDTokenVerification struct {
	Iss     string `json:"iss"`     // https://access.line.me
	Sub     string `json:"sub"`     // LINE user ID
	Aud     string `json:"aud"`     // Channel ID
	Exp     int64  `json:"exp"`     // Expiration timestamp
	Iat     int64  `json:"iat"`     // Issued at timestamp
	Name    string `json:"name"`    // Display name
	Picture string `json:"picture"` // Profile image URL
	Email   string `json:"email"`   // Email (if email permission granted)
}

// LineAuthRequest is the request body for LINE login
type LineAuthRequest struct {
	IDToken     string `json:"idToken"`
	AccessToken string `json:"accessToken"`
}

// LineProfile represents the response from LINE's /v2/profile endpoint
type LineProfile struct {
	UserID      string `json:"userId"`
	DisplayName string `json:"displayName"`
	PictureURL  string `json:"pictureUrl"`
	StatusMsg   string `json:"statusMessage"`
}

// LineAuthResponse is the response after successful LINE auth
type LineAuthResponse struct {
	Token  string `json:"token"`
	Record struct {
		ID      string `json:"id"`
		Name    string `json:"name"`
		Email   string `json:"email"`
		LineUID string `json:"lineUserId"`
		Role    string `json:"role"`
	} `json:"record"`
}

func main() {
	app := pocketbase.NewWithConfig(pocketbase.Config{
		DefaultDataDir: getEnv("PB_DATA_DIR", "./pb_data"),
	})

	// Register auto-migration plugin
	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Dir:         "migrations",
		Automigrate: getEnv("PB_AUTO_MIGRATE", "true") == "true",
	})

	// Register custom API routes
	app.OnServe().BindFunc(func(se *core.ServeEvent) error {
		// ── Health check ──
		se.Router.GET("/api/custom/health", func(e *core.RequestEvent) error {
			return e.JSON(200, map[string]interface{}{
				"ok":      true,
				"version": "0.0.1",
			})
		})

		// ── LINE Login Auth ──
		// POST /api/custom/auth/line
		// Body: { "idToken": "<LINE ID token from LIFF>" }
		// Returns: PocketBase auth token + user record
		se.Router.POST("/api/custom/auth/line", handleLineAuth(app))

		// ── Dashboard Summary ──
		se.Router.GET("/api/custom/dashboard/summary", handleDashboardSummary(app))

		return se.Next()
	})

	// ═══════════════════════════════════════════════════════════
	// Hooks — keep batch latest readings in sync
	// ═══════════════════════════════════════════════════════════

	// When a batch_reading is created, update the parent batch's latest* fields
	app.OnRecordAfterCreateSuccess("batch_readings").BindFunc(func(e *core.RecordEvent) error {
		record := e.Record
		batchId := record.GetString("batch")
		if batchId == "" {
			return e.Next()
		}

		batchColl, err := app.FindCollectionByNameOrId("batches")
		if err != nil {
			return e.Next()
		}
		batch, err := app.FindRecordById(batchColl, batchId)
		if err != nil {
			return e.Next()
		}

		if ph := record.GetFloat("ph"); ph != 0 {
			batch.Set("latestPh", ph)
		}
		if temp := record.GetFloat("temperature"); temp != 0 {
			batch.Set("latestTemp", temp)
		}
		if weight := record.GetFloat("weight"); weight != 0 {
			batch.Set("latestWeight", weight)
		}
		if co2 := record.GetFloat("co2"); co2 != 0 {
			batch.Set("latestCo2", co2)
		}

		if err := app.Save(batch); err != nil {
			log.Printf("Warning: failed to update batch latest readings: %v", err)
		}

		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}

// ═══════════════════════════════════════════════════════════════
// LINE Login Handler
// ═══════════════════════════════════════════════════════════════

func handleLineAuth(app *pocketbase.PocketBase) func(e *core.RequestEvent) error {
	lineClientID := getEnv("LINE_CLIENT_ID", "")

	return func(e *core.RequestEvent) error {
		// Validate LINE_CLIENT_ID is configured
		if lineClientID == "" {
			return e.JSON(500, map[string]string{
				"error": "LINE_CLIENT_ID is not configured on the server",
			})
		}

		// Parse request body
		var req LineAuthRequest
		if err := e.BindBody(&req); err != nil {
			return e.JSON(400, map[string]string{
				"error": "Invalid request body",
			})
		}

		if req.IDToken == "" && req.AccessToken == "" {
			return e.JSON(400, map[string]string{
				"error": "idToken or accessToken is required",
			})
		}

		var lineUID string
		var displayName string
		var pictureURL string
		var email string

		if req.IDToken != "" {
			// ── Path A: Verify ID token with LINE ──
			verification, err := verifyLineIDToken(req.IDToken, lineClientID)
			if err != nil {
				return e.JSON(401, map[string]string{
					"error": fmt.Sprintf("LINE token verification failed: %s", err.Error()),
				})
			}

			// Validate the token was issued for our channel
			if verification.Aud != lineClientID {
				return e.JSON(401, map[string]string{
					"error": "ID token was not issued for this LINE channel",
				})
			}

			// Check token expiration
			if time.Now().Unix() > verification.Exp {
				return e.JSON(401, map[string]string{
					"error": "LINE ID token has expired",
				})
			}

			lineUID = verification.Sub
			displayName = verification.Name
			pictureURL = verification.Picture
			email = verification.Email
		} else {
			// ── Path B: Verify via access token (fallback for external browser) ──
			// In external browser redirect flow, ID token may not be available.
			// Use access token to get user profile from LINE's /v2/profile endpoint.
			profile, err := verifyLineAccessToken(req.AccessToken)
			if err != nil {
				return e.JSON(401, map[string]string{
					"error": fmt.Sprintf("LINE access token verification failed: %s", err.Error()),
				})
			}

			lineUID = profile.UserID
			displayName = profile.DisplayName
			pictureURL = profile.PictureURL
			// email not available via /v2/profile
		}

		// Try to find existing user by lineUserId
		usersCollection, err := app.FindCollectionByNameOrId("users")
		if err != nil {
			return e.JSON(500, map[string]string{
				"error": "Users collection not found",
			})
		}

		// Search for user with this lineUserId
		existingUser, err := app.FindFirstRecordByFilter(
			usersCollection,
			"lineUserId = {:lineUserId}",
			map[string]interface{}{"lineUserId": lineUID},
		)

		var user *core.Record
		if err != nil {
			// User doesn't exist — create new user
			user = core.NewRecord(usersCollection)
			user.Set("lineUserId", lineUID)
			user.Set("name", displayName)
			user.Set("role", "farmer")
			user.Set("email", email)
			if email == "" {
				// Generate a placeholder email for PocketBase (requires unique email)
				user.Set("email", fmt.Sprintf("line_%s@prime-my-brain.local", lineUID))
			}
			user.Set("password", generateRandomPassword())
			user.Set("passwordConfirm", user.GetString("password"))

			if err := app.Save(user); err != nil {
				return e.JSON(500, map[string]string{
					"error": fmt.Sprintf("Failed to create user: %s", err.Error()),
				})
			}
		} else {
			// User exists — update profile info from LINE
			user = existingUser
			user.Set("name", displayName)
			if pictureURL != "" {
				user.Set("avatarUrl", pictureURL)
			}
			if email != "" {
				user.Set("email", email)
			}
			if err := app.Save(user); err != nil {
				// Non-critical — profile update failure shouldn't block login
				log.Printf("Warning: failed to update user profile: %v", err)
			}
		}

		// ── Step 5: Generate PocketBase auth token ──
		token, err := user.NewAuthToken()
		if err != nil {
			return e.JSON(500, map[string]string{
				"error": "Failed to generate auth token",
			})
		}

		// Return auth response
		response := LineAuthResponse{
			Token: token,
		}
		response.Record.ID = user.Id
		response.Record.Name = user.GetString("name")
		response.Record.Email = user.GetString("email")
		response.Record.LineUID = user.GetString("lineUserId")
		response.Record.Role = user.GetString("role")

		return e.JSON(200, response)
	}
}

// ═══════════════════════════════════════════════════════════════
// LINE ID Token Verification
// ═══════════════════════════════════════════════════════════════
// Verifies the ID token by calling LINE's verification endpoint.
// https://developers.line.biz/en/reference/line-login/#verify-id-token

func verifyLineIDToken(idToken, clientID string) (*LineIDTokenVerification, error) {
	// Call LINE's ID token verification endpoint
	verifyURL := "https://api.line.me/oauth2/v2.1/verify"

	payload := strings.NewReader(fmt.Sprintf(
		"id_token=%s&client_id=%s",
		idToken, clientID,
	))

	req, err := http.NewRequest("POST", verifyURL, payload)
	if err != nil {
		return nil, fmt.Errorf("failed to create verification request: %w", err)
	}
	req.Header.Set("Content-Type", "application/x-www-form-urlencoded")

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to call LINE verification API: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read verification response: %w", err)
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("LINE verification failed (status %d): %s", resp.StatusCode, string(body))
	}

	var verification LineIDTokenVerification
	if err := json.Unmarshal(body, &verification); err != nil {
		return nil, fmt.Errorf("failed to parse verification response: %w", err)
	}

	return &verification, nil
}

// ═══════════════════════════════════════════════════════════════
// LINE Access Token Verification (fallback for external browser flow)
// ═══════════════════════════════════════════════════════════════
// Uses the access token to fetch user profile from LINE.
// https://developers.line.biz/en/reference/line-login/#get-user-profile

func verifyLineAccessToken(accessToken string) (*LineProfile, error) {
	profileURL := "https://api.line.me/v2/profile"

	req, err := http.NewRequest("GET", profileURL, nil)
	if err != nil {
		return nil, fmt.Errorf("failed to create profile request: %w", err)
	}
	req.Header.Set("Authorization", "Bearer "+accessToken)

	client := &http.Client{Timeout: 10 * time.Second}
	resp, err := client.Do(req)
	if err != nil {
		return nil, fmt.Errorf("failed to call LINE profile API: %w", err)
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("failed to read profile response: %w", err)
	}

	if resp.StatusCode != 200 {
		return nil, fmt.Errorf("LINE profile request failed (status %d): %s", resp.StatusCode, string(body))
	}

	var profile LineProfile
	if err := json.Unmarshal(body, &profile); err != nil {
		return nil, fmt.Errorf("failed to parse profile response: %w", err)
	}

	if profile.UserID == "" {
		return nil, fmt.Errorf("LINE profile returned empty userId")
	}

	return &profile, nil
}

// ═══════════════════════════════════════════════════════════════
// Dashboard Summary Handler
// ═══════════════════════════════════════════════════════════════
// GET /api/custom/dashboard/summary
// Returns aggregated stats for the fermentation dashboard.

func handleDashboardSummary(app *pocketbase.PocketBase) func(e *core.RequestEvent) error {
	return func(e *core.RequestEvent) error {
		batchesColl, err := app.FindCollectionByNameOrId("batches")
		if err != nil {
			return e.JSON(500, map[string]string{"error": "batches collection not found"})
		}

		alertsColl, err := app.FindCollectionByNameOrId("alerts")
		if err != nil {
			return e.JSON(500, map[string]string{"error": "alerts collection not found"})
		}

		// Count by status
		allBatches, _ := app.FindRecordsByFilter(batchesColl, "1=1", "-startedAt", 0, 0)
		activeBatches := 0
		completedBatches := 0
		var totalScore float64
		scoreCount := 0

		processMap := map[string]int{}

		for _, b := range allBatches {
			switch b.GetString("status") {
			case "active":
				activeBatches++
			case "completed":
				completedBatches++
			}
			if s := b.GetFloat("predictedScore"); s > 0 {
				totalScore += s
				scoreCount++
			}
			pt := b.GetString("processType")
			if pt != "" {
				processMap[pt]++
			}
		}

		var avgScore *float64
		if scoreCount > 0 {
			v := totalScore / float64(scoreCount)
			avgScore = &v
		}

		// Unacknowledged alerts
		unackAlerts, _ := app.FindRecordsByFilter(alertsColl, "resolved=false", "-created", 0, 0)
		unackCount := len(unackAlerts)

		// Recent alerts (last 5)
		recentAlertsRaw, _ := app.FindRecordsByFilter(alertsColl, "resolved=false", "-created", 5, 0)
		recentAlerts := make([]map[string]interface{}, 0, len(recentAlertsRaw))
		for _, a := range recentAlertsRaw {
			recentAlerts = append(recentAlerts, map[string]interface{}{
				"id":        a.Id,
				"type":      a.GetString("type"),
				"severity":  a.GetString("severity"),
				"message":   a.GetString("message"),
				"resolved":  a.GetBool("resolved"),
				"created":   a.GetString("created"),
			})
		}

		// Process breakdown
		processByType := make([]map[string]interface{}, 0)
		for pt, count := range processMap {
			processByType = append(processByType, map[string]interface{}{
				"processType": pt,
				"count":      count,
			})
		}

		result := map[string]interface{}{
			"activeBatches":        activeBatches,
			"completedBatches":     completedBatches,
			"unacknowledgedAlerts": unackCount,
			"recentAlerts":         recentAlerts,
			"processByType":        processByType,
		}
		if avgScore != nil {
			result["avgPredictedScore"] = *avgScore
		}

		return e.JSON(200, result)
	}
}

// ═══════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════

func getEnv(key, defaultValue string) string {
	if value, exists := os.LookupEnv(key); exists {
		return value
	}
	return defaultValue
}

// generateRandomPassword creates a random password for LINE-only users.
// These users never use password login — they always auth via LINE.
// The password is set to satisfy PocketBase's user model requirement.
func generateRandomPassword() string {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%"
	b := make([]byte, 32)
	for i := range b {
		b[i] = charset[time.Now().UnixNano()%int64(len(charset))]
	}
	return string(b)
}
