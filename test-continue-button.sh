#!/bin/bash

echo "🚀 Starting OpenHands with Continue Button Feature"
echo "=================================================="

# Create workspace directory if it doesn't exist
mkdir -p ./workspace

echo "📦 Building and starting OpenHands container..."
echo "This will:"
echo "  - Build the Docker image with your Continue button changes"
echo "  - Start OpenHands on http://localhost:3001"
echo "  - Create a persistent workspace in ./workspace"
echo ""

# Use the test docker-compose file
docker compose -f docker-compose.test.yml up --build

echo ""
echo "🎯 To test the Continue button:"
echo "1. Open http://localhost:3001 in your browser"
echo "2. Start a conversation with an agent"
echo "3. Trigger rate limiting (make many rapid requests)"
echo "4. Look for the Continue button when rate limited"
echo "5. Click it to resume operation"
echo ""
echo "To stop: Press Ctrl+C or run 'docker compose -f docker-compose.test.yml down'"