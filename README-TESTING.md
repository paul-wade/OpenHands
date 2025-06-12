# Testing the Continue Button Feature

## Super Simple Docker Setup

Just run this single command to test your Continue button:

```bash
docker compose -f docker-compose.test.yml up --build
```

Or use the helper script:

```bash
./test-continue-button.sh
```

## What This Does

1. **Builds** a Docker image with your Continue button changes
2. **Starts** OpenHands on http://localhost:3001
3. **Creates** a workspace folder for testing
4. **Persists** settings between runs

## Testing the Continue Button

1. Open http://localhost:3001 in your browser
2. Configure an LLM provider (OpenAI, Anthropic, etc.)
3. Start a conversation with the agent
4. **Trigger rate limiting** by:
   - Making many rapid requests
   - Using a provider with low rate limits
   - Or setting very low rate limits in your provider settings
5. **Look for the Continue button** when the agent gets rate limited
6. **Click the Continue button** - it should send "continue" and resume

## Stop the Container

```bash
# Stop and remove
docker compose -f docker-compose.test.yml down

# Or just Ctrl+C if running in foreground
```

## Troubleshooting

- **Port 3001 busy**: Change the port in docker-compose.test.yml from "3001:3000" to "3002:3000"
- **Docker issues**: Make sure Docker Desktop is running
- **Build errors**: Try `docker system prune` to clean up old images

## Files Created

- `docker-compose.test.yml` - Simple Docker Compose config
- `test-continue-button.sh` - Helper script
- `./workspace/` - Local workspace folder (auto-created)

This setup is completely isolated and won't interfere with any other development setup!