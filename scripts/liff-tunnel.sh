#!/usr/bin/env bash
# liff-tunnel.sh — Start Cloudflare tunnel for LIFF dev & launch Vite
#
# Usage: ./scripts/liff-tunnel.sh
#
# 1. Starts a cloudflared quick tunnel on port 3001
# 2. Extracts the public HTTPS URL
# 3. Launches Vite with VITE_LIFF_REDIRECT_URI set to the tunnel URL
#
# Prerequisites:
#   - cloudflared installed (brew install cloudflared)
#   - In LINE Developers Console, add the tunnel URL to your LIFF app's
#     endpoint URL each session (or use a custom domain + CNAME setup).

set -euo pipefail

PORT=3001
LOG_FILE=$(mktemp)

echo "🌐 Starting Cloudflare tunnel on port ${PORT}..."

# Start tunnel in background, capture log output
cloudflared tunnel --url "http://localhost:${PORT}" > "$LOG_FILE" 2>&1 &
TUNNEL_PID=$!

cleanup() {
    echo ""
    echo "🛑 Stopping tunnel (PID ${TUNNEL_PID})..."
    kill "$TUNNEL_PID" 2>/dev/null || true
    rm -f "$LOG_FILE"
}
trap cleanup EXIT INT TERM

# Wait for the tunnel URL to appear in logs
echo "⏳ Waiting for tunnel URL..."
TUNNEL_URL=""
for i in $(seq 1 30); do
    TUNNEL_URL=$(grep -oE 'https://[a-z0-9-]+\.trycloudflare\.com' "$LOG_FILE" | head -1 || true)
    if [ -n "$TUNNEL_URL" ]; then
        break
    fi
    sleep 1
done

if [ -z "$TUNNEL_URL" ]; then
    echo "❌ Failed to get tunnel URL. Check cloudflared logs:"
    cat "$LOG_FILE"
    exit 1
fi

echo "✅ Tunnel active: ${TUNNEL_URL}"
echo ""
echo "⚠️  IMPORTANT: Go to LINE Developers Console and set this LIFF endpoint URL:"
echo "   ${TUNNEL_URL}"
echo ""
echo "   https://developers.line.biz/console/ → your provider → LIFF tab → edit app → Endpoint URL"
echo ""
echo "🚀 Starting LIFF app on port ${PORT}..."
echo ""

cd "$(git rev-parse --show-toplevel 2>/dev/null || echo ".")/client"

VITE_PB_URL=http://localhost:8090 \
VITE_LIFF_REDIRECT_URI="${TUNNEL_URL}" \
bun run --filter @prime-my-brain/liff-app dev
