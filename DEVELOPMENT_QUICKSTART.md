# OpenHands Development Quickstart

## Prerequisites
- Linux, macOS, or WSL on Windows (Ubuntu >= 22.04)
- Python 3.12+
- Node.js 22.x+
- Docker (latest version)
- Poetry 1.8+
- Git

## Quick Setup Commands

```bash
# 1. Clone and enter directory
git clone https://github.com/All-Hands-AI/OpenHands.git
cd OpenHands

# 2. Install pre-commit hooks (MANDATORY - do this first!)
make install-pre-commit-hooks

# 3. Build the project (installs all dependencies)
make build

# 4. Configure LLM settings (interactive setup)
make setup-config

# 5. Run the application
make run
```

## Development Modes

### Full Application (Recommended)
```bash
make run  # Starts both backend (port 3000) and frontend
```

### Individual Services
```bash
# Backend only
make start-backend

# Frontend only  
make start-frontend
```

### Docker Development
```bash
# Complete Docker environment
make docker-dev
```

## Code Quality (Before Committing)

### Backend
```bash
# Run all backend checks
pre-commit run --config ./dev_config/python/.pre-commit-config.yaml
```

### Frontend
```bash
cd frontend && npm run lint:fix && npm run build
```

## Testing

### Backend Tests
```bash
poetry run pytest tests/unit/test_*.py
```

### Frontend Tests
```bash
cd frontend && npm run test
```

## Key Files
- `openhands/` - Python backend
- `frontend/` - React frontend  
- `tests/unit/` - Unit tests
- `.openhands/microagents/` - AI workflow configs

## Common Issues
- **Permission errors**: Ensure Docker daemon is running
- **Port conflicts**: Default ports are 3000 (backend) and 3001 (frontend)
- **Build failures**: Run `make clean` then `make build`

## Access
- Frontend: http://localhost:3000 (when running full app)
- Backend API: http://localhost:3000/api (when running backend only)

## Git Configuration
```bash
git config user.name "openhands"
git config user.email "openhands@all-hands.dev"
```

## Branch and PR Workflow
```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Make changes, then commit
git add .
git commit -m "feat: your change description"

# Push and create PR
git push origin feat/your-feature-name
```

## Environment Variables (Optional)
```bash
export DEBUG=1  # Enable LLM debugging
export SANDBOX_RUNTIME_CONTAINER_IMAGE=custom-image
```

## Help
```bash
make help  # Show all available commands
```