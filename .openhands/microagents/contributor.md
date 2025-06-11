---
name: "OpenHands Contributor Assistant"
description: "Comprehensive guidance for OpenHands contributors"
triggers: ["contribute", "development", "setup", "quality", "testing", "pr"]
---

# OpenHands Contributor Assistant

I'm your AI assistant for contributing to OpenHands. I'll help you follow best practices, maintain code quality, and navigate the development workflow efficiently.

## Quick Start Commands

### Initial Setup
```bash
# Complete development environment setup
make build                    # Install all dependencies
make install-pre-commit-hooks # MANDATORY: Install code quality hooks
make setup-config            # Configure LLM settings
```

### Development Workflow
```bash
# Start development
make run                     # Full application (backend + frontend)
make start-backend          # Backend only (port 3000)
make start-frontend         # Frontend only (port 3001)

# Code quality (MANDATORY before commits)
make lint                   # Run all linters
make test                   # Run all tests
```

## Code Quality Standards (MANDATORY)

### Pre-commit Hooks
**CRITICAL**: Always run `make install-pre-commit-hooks` before making changes.

### Backend Quality Checks
```bash
# Run before committing backend changes
poetry run pre-commit run --config ./dev_config/python/.pre-commit-config.yaml

# Tools used:
# - Ruff: Code formatting and linting
# - MyPy: Static type checking
# - Pre-commit: Automated quality checks
```

### Frontend Quality Checks
```bash
# Run before committing frontend changes
cd frontend && npm run lint:fix && npm run build && cd ..

# Tools used:
# - ESLint: Code linting
# - TypeScript: Type checking
# - Prettier: Code formatting
```

## Development Guidelines

### Repository Structure
- `openhands/`: Python backend (FastAPI, uvicorn)
- `frontend/`: React frontend (TypeScript, Vite)
- `tests/unit/`: Unit tests (pytest for backend, vitest for frontend)
- `evaluation/`: Benchmarking framework
- `microagents/`: AI workflow enhancements
- `.openhands/`: Repository-specific AI configurations

### Testing Requirements
**Backend Testing**:
```bash
# Run specific test file
poetry run pytest tests/unit/test_xxx.py

# Run with coverage
poetry run pytest tests/unit/ --cov=openhands
```

**Frontend Testing**:
```bash
# Run all tests
npm run test

# Run specific test
npm run test -- -t "TestName"
```

### Commit Standards
Use conventional commit format:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Maintenance tasks

Example: `feat(frontend): add dark mode toggle`

## Pull Request Process

### PR Checklist
- [ ] Pre-commit hooks pass successfully
- [ ] All tests pass locally
- [ ] Code follows project style guidelines
- [ ] Documentation updated for user-facing changes
- [ ] Conventional commit format used
- [ ] PR template completed

### PR Template Requirements
1. **Documentation**: Check if changes need documentation at docs.all-hands.dev
2. **Release Notes**: Include end-user friendly description
3. **Design Decisions**: Explain non-trivial implementation choices
4. **Issue Links**: Reference specific issues addressed

## Common Development Tasks

### Adding New Features
1. Create feature branch: `git checkout -b feat/feature-name`
2. Implement feature with tests
3. Run quality checks: `make lint && make test`
4. Update documentation if needed
5. Commit with conventional format
6. Create PR following template

### Bug Fixes
1. Create bug fix branch: `git checkout -b fix/bug-description`
2. Write test that reproduces the bug
3. Implement fix
4. Verify test passes
5. Run full test suite
6. Create PR with bug reproduction steps

### Frontend Action Handling
To add new action types to the UI:
1. Add action type to `HANDLED_ACTIONS` array in `frontend/src/state/chat-slice.ts`
2. Implement handling in `addAssistantAction` function
3. Add translation key `ACTION_MESSAGE$ACTION_NAME` to i18n files

### Adding User Settings
**Frontend**:
1. Update `Settings` type in `frontend/src/types/settings.ts`
2. Add to `DEFAULT_SETTINGS` in `frontend/src/services/settings.ts`
3. Update hooks in `frontend/src/hooks/`
4. Add UI components in settings screens
5. Add i18n translations

**Backend**:
1. Update `Settings` model in `openhands/storage/data_models/settings.py`
2. Apply setting in relevant backend code

## Debugging and Troubleshooting

### LLM Debugging
```bash
export DEBUG=1              # Enable LLM debugging
make start-backend          # Logs saved in logs/llm/
```

### Common Issues
- **ModuleNotFoundError**: Run `poetry install`
- **Port in use**: Kill process or use different port
- **Type errors**: Run `poetry run mypy --config-file dev_config/python/mypy.ini openhands/`
- **Lint failures**: Run auto-fix commands above

## Environment Variables

### Development
```bash
DEBUG=1                     # Enable verbose logging
SANDBOX_RUNTIME_CONTAINER_IMAGE=custom-image  # Use custom runtime
```

### Frontend
Set in `frontend/.env`:
- `VITE_BACKEND_HOST`: Backend host
- `VITE_USE_TLS`: Enable TLS
- `VITE_FRONTEND_PORT`: Frontend port

## AI-Enhanced Development

### Microagents
- **Repository Agent**: `.openhands/microagents/repo.md` (this file)
- **Knowledge Agents**: `microagents/*.md` (triggered by keywords)
- **Custom Agents**: Create domain-specific microagents

### AI Workflows
Use AI assistance for:
- Code review and quality checks
- Test generation and coverage analysis
- Documentation generation
- Error analysis and debugging
- Performance optimization

## Security Guidelines
- Never commit API keys or secrets
- Validate all user inputs
- Use Docker for code execution sandboxing
- Keep dependencies updated
- Conduct security-focused code reviews

## Performance Best Practices
- **Backend**: Use async/await for I/O operations
- **Frontend**: Implement lazy loading and code splitting
- **Testing**: Optimize test execution time
- **Dependencies**: Regular dependency updates

## Community Resources
- **Slack**: [OpenHands Workspace](https://join.slack.com/t/openhands-ai/shared_invite/zt-34zm4j0gj-Qz5kRHoca8DFCbqXPS~f_A)
- **Discord**: [Community Server](https://discord.gg/ESHStjSjD4)
- **Documentation**: [docs.all-hands.dev](https://docs.all-hands.dev)
- **Issues**: [GitHub Issues](https://github.com/All-Hands-AI/OpenHands/issues)

## Quick Reference

### Essential Files
- `CONTRIBUTOR_GUIDE.md`: Comprehensive contributor documentation
- `AI_WORKFLOWS.md`: AI-powered development workflows
- `CONTRIBUTING.md`: Official contribution guidelines
- `Development.md`: Development setup instructions
- `.github/pull_request_template.md`: PR template

### Key Commands
```bash
make help                   # Show all available commands
make build                  # Complete project setup
make lint                   # Run all linters
make test                   # Run all tests
make docker-dev            # Docker development environment
```

---

Remember: Quality is paramount in OpenHands. Always run pre-commit hooks and ensure all tests pass before submitting changes. When in doubt, ask in the community channels!
