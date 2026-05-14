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
	IDToken string `json:"idToken"`
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
	migratecmd.MustRegister(app, migratecmd.Config{
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
		se.Router.GET("/api/custom/dashboard/summary", func(e *core.RequestEvent) error {
			return e.JSON(200, map[string]interface{}{
				"totalSensors": 0,
				"totalReadings": 0,
				"activeAlerts": 0,
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

		if req.IDToken == "" {
			return e.JSON(400, map[string]string{
				"error": "idToken is required",
			})
		}

		// ── Step 1: Verify ID token with LINE ──
		verification, err := verifyLineIDToken(req.IDToken, lineClientID)
		if err != nil {
			return e.JSON(401, map[string]string{
				"error": fmt.Sprintf("LINE token verification failed: %s", err.Error()),
			})
		}

		// ── Step 2: Validate the token was issued for our channel ──
		if verification.Aud != lineClientID {
			return e.JSON(401, map[string]string{
				"error": "ID token was not issued for this LINE channel",
			})
		}

		// ── Step 3: Check token expiration ──
		if time.Now().Unix() > verification.Exp {
			return e.JSON(401, map[string]string{
				"error": "LINE ID token has expired",
			})
		}

		// ── Step 4: Find or create PocketBase user ──
		lineUID := verification.Sub
		displayName := verification.Name
		pictureURL := verification.Picture
		email := verification.Email

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
