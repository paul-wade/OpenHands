# OpenHands Contributor Guide

Welcome to OpenHands! This comprehensive guide will help you become an effective contributor to the project. OpenHands is an AI-powered software development platform with a Python backend and React frontend.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Development Environment Setup](#development-environment-setup)
3. [Code Quality Standards](#code-quality-standards)
4. [Contribution Workflows](#contribution-workflows)
5. [AI Actions & Automation](#ai-actions--automation)
6. [Testing Guidelines](#testing-guidelines)
7. [Best Practices](#best-practices)
8. [Community Guidelines](#community-guidelines)

## Project Overview

### Architecture
- **Backend**: Python 3.12+ with FastAPI, uvicorn server
- **Frontend**: React 19+ with TypeScript, Vite build system
- **Runtime**: Docker-based sandboxed execution environment
- **AI Integration**: LiteLLM for multiple LLM provider support
- **Testing**: pytest (backend), vitest (frontend)
- **Package Management**: Poetry (Python), npm (Node.js)

### Key Components
- `openhands/`: Python backend code
- `frontend/`: React frontend application
- `evaluation/`: Benchmarking and evaluation framework
- `microagents/`: AI-enhanced development workflows
- `tests/`: Unit and integration tests
- `containers/`: Docker configurations

## Development Environment Setup

### Prerequisites
- **OS**: Linux, macOS, or WSL on Windows (Ubuntu >= 22.04)
- **Python**: 3.12+
- **Node.js**: 22.x+
- **Docker**: Latest version
- **Poetry**: 1.8+
- **Git**: Latest version

### Quick Setup
```bash
# 1. Clone the repository
git clone https://github.com/All-Hands-AI/OpenHands.git
cd OpenHands

# 2. Build the project (installs all dependencies)
make build

# 3. Configure your LLM settings
make setup-config

# 4. Run the application
make run
```

### Detailed Setup Steps

#### 1. System Dependencies
```bash
# Ubuntu/WSL
sudo apt-get install build-essential python3.12-dev netcat

# macOS (using Homebrew)
brew install python@3.12 node@22 poetry docker
```

#### 2. Install Poetry (if not installed)
```bash
curl -sSL https://install.python-poetry.org | python3.12 -
# Add Poetry to your PATH as instructed
```

#### 3. Environment Configuration
```bash
# Install pre-commit hooks (MANDATORY)
make install-pre-commit-hooks

# Set up basic configuration
make setup-config-basic
```

#### 4. Development Modes

**Full Application**:
```bash
make run  # Starts both backend and frontend
```

**Individual Services**:
```bash
make start-backend   # Backend only (port 3000)
make start-frontend  # Frontend only (port 3001)
```

**Docker Development**:
```bash
make docker-dev  # Complete Docker environment
```

## Code Quality Standards

### Pre-commit Hooks (MANDATORY)
Before making any changes, ensure pre-commit hooks are installed:
```bash
make install-pre-commit-hooks
```

### Backend Code Quality
```bash
# Run all backend linters
make lint-backend

# Or run pre-commit manually
poetry run pre-commit run --config ./dev_config/python/.pre-commit-config.yaml
```

**Tools Used**:
- **Ruff**: Code formatting and linting
- **MyPy**: Static type checking
- **Pre-commit**: Automated code quality checks

### Frontend Code Quality
```bash
# Run frontend linters
make lint-frontend

# Or manually
cd frontend && npm run lint:fix && npm run build
```

**Tools Used**:
- **ESLint**: Code linting
- **TypeScript**: Type checking
- **Prettier**: Code formatting

### Code Style Requirements
- **Python**: Follow PEP 8, use type hints
- **TypeScript**: Strict TypeScript configuration
- **Commits**: Use conventional commit format (feat:, fix:, docs:, etc.)
- **Documentation**: Update docs for user-facing changes

## Contribution Workflows

### Issue-Based Development
1. **Find an Issue**: Browse [good first issues](https://github.com/All-Hands-AI/OpenHands/labels/good%20first%20issue)
2. **Comment**: Express interest and ask for assignment
3. **Branch**: Create a feature branch from main
4. **Develop**: Make your changes following code quality standards
5. **Test**: Ensure all tests pass
6. **Submit**: Create a pull request

### Pull Request Process

#### PR Title Format
Use conventional commit prefixes:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes
- `refactor`: Code refactoring
- `test`: Test additions/modifications
- `chore`: Maintenance tasks

Example: `feat(frontend): add dark mode toggle`

#### PR Template Checklist
- [ ] This change is worth documenting at https://docs.all-hands.dev/
- [ ] Include this change in the Release Notes
- [ ] End-user friendly description provided
- [ ] Non-trivial design decisions explained
- [ ] Linked to specific issues

#### Review Process
1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: For core agent changes, evaluation benchmarks may be required
4. **Documentation**: Update relevant documentation

### Branch Management
```bash
# Create feature branch
git checkout -b feat/your-feature-name

# Keep branch updated
git fetch origin
git rebase origin/main

# Push changes
git push origin feat/your-feature-name
```

## AI Actions & Automation

### Microagents System
OpenHands uses microagents to enhance development workflows with AI assistance.

#### Repository Microagent
Create `.openhands/microagents/repo.md` in your repository:
```markdown
# Repository Guidelines

## Setup Instructions
1. Run `make build` to set up the environment
2. Configure LLM settings with `make setup-config`
3. Start development with `make run`

## Code Standards
- All Python code must pass mypy type checking
- Frontend code must pass ESLint and TypeScript checks
- Pre-commit hooks are mandatory

## Testing Requirements
- Write unit tests for new functionality
- Ensure all existing tests pass
- Add integration tests for complex features
```

#### Knowledge Microagents
Contribute domain-specific knowledge to `microagents/`:
```markdown
---
name: "Python Best Practices"
triggers: ["python", "pytest", "mypy"]
file_patterns: ["*.py"]
---

# Python Development Guidelines

## Type Hints
Always use type hints for function parameters and return values:
```python
def process_data(items: list[str]) -> dict[str, int]:
    return {item: len(item) for item in items}
```

## Testing
Use pytest for all tests with descriptive names:
```python
def test_should_process_empty_list_correctly():
    result = process_data([])
    assert result == {}
```
```

### AI-Enhanced Development
1. **Code Review**: Use AI to review code changes
2. **Documentation**: Generate documentation from code
3. **Testing**: AI-assisted test case generation
4. **Debugging**: AI-powered error analysis

## Testing Guidelines

### Backend Testing
```bash
# Run all unit tests
poetry run pytest tests/unit/

# Run specific test file
poetry run pytest tests/unit/test_specific.py

# Run with coverage
poetry run pytest tests/unit/ --cov=openhands
```

### Frontend Testing
```bash
# Run all tests
cd frontend && npm run test

# Run specific test
npm run test -- -t "TestName"

# Watch mode
npm run test:watch
```

### Test Writing Standards
- **Unit Tests**: Test individual functions/components
- **Integration Tests**: Test component interactions
- **E2E Tests**: Test complete user workflows
- **Coverage**: Aim for >80% code coverage
- **Naming**: Use descriptive test names

### Test Structure
```python
# Backend test example
def test_should_handle_valid_input_correctly():
    # Arrange
    input_data = {"key": "value"}

    # Act
    result = process_function(input_data)

    # Assert
    assert result.status == "success"
    assert result.data == expected_data
```

```typescript
// Frontend test example
describe('Component', () => {
  it('should render correctly with valid props', () => {
    const props = { title: 'Test Title' };
    render(<Component {...props} />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });
});
```

## Best Practices

### Security Guidelines
- **API Keys**: Never commit API keys or secrets
- **Input Validation**: Validate all user inputs
- **Sandboxing**: Use Docker for code execution
- **Dependencies**: Keep dependencies updated
- **Code Review**: Security-focused code reviews

### Performance Optimization
- **Backend**: Use async/await for I/O operations
- **Frontend**: Implement lazy loading and code splitting
- **Database**: Optimize queries and use indexing
- **Caching**: Implement appropriate caching strategies

### Documentation Standards
- **Code Comments**: Explain complex logic, not obvious code
- **API Documentation**: Use OpenAPI/Swagger for APIs
- **User Documentation**: Update docs.all-hands.dev for user-facing changes
- **README Updates**: Keep module READMEs current

### Git Workflow
```bash
# Configure git for OpenHands
git config user.name "openhands"
git config user.email "openhands@all-hands.dev"

# Commit with conventional format
git commit -m "feat(backend): add new agent capability"

# Keep commits atomic and focused
git add specific_file.py
git commit -m "fix: resolve memory leak in agent controller"
```

### Dependency Management
```bash
# Python dependencies
poetry add new-package
poetry lock --no-update

# Frontend dependencies
cd frontend && npm install new-package
```

### Environment Variables
```bash
# Development environment
export DEBUG=1  # Enable LLM debugging
export SANDBOX_RUNTIME_CONTAINER_IMAGE=custom-image
```

## Community Guidelines

### Communication Channels
- **Slack**: [OpenHands Workspace](https://join.slack.com/t/openhands-ai/shared_invite/zt-34zm4j0gj-Qz5kRHoca8DFCbqXPS~f_A) - Development discussions
- **Discord**: [Community Server](https://discord.gg/ESHStjSjD4) - General questions
- **GitHub Issues**: Bug reports and feature requests

### Code of Conduct
- Be respectful and inclusive
- Provide constructive feedback
- Help newcomers learn
- Follow community guidelines
- Report inappropriate behavior to contact@all-hands.dev

### Getting Help
1. **Documentation**: Check [docs.all-hands.dev](https://docs.all-hands.dev)
2. **Search Issues**: Look for existing solutions
3. **Ask Questions**: Use appropriate channels
4. **Provide Context**: Include relevant details when asking for help

### Contributing Areas
- **UI/UX**: Frontend improvements and new features
- **Agent Development**: Core AI agent capabilities
- **Runtime**: Execution environment enhancements
- **Testing**: Test coverage and quality improvements
- **Documentation**: User and developer documentation
- **Evaluation**: Benchmarking and performance testing

## Quick Reference

### Essential Commands
```bash
# Setup
make build                    # Complete project setup
make install-pre-commit-hooks # Install code quality hooks

# Development
make run                      # Start full application
make start-backend           # Backend only
make start-frontend          # Frontend only

# Code Quality
make lint                    # Run all linters
make test                    # Run all tests
pre-commit run --all-files   # Check all files

# Configuration
make setup-config            # Configure LLM settings
make help                    # Show all available commands
```

### File Structure
```
OpenHands/
├── openhands/              # Python backend
├── frontend/               # React frontend
├── tests/                  # Test suites
├── microagents/           # AI workflow enhancements
├── evaluation/            # Benchmarking framework
├── containers/            # Docker configurations
├── docs/                  # Documentation
└── .openhands/            # Repository-specific AI config
```

### Resources
- [Main Documentation](https://docs.all-hands.dev)
- [Contributing Guidelines](./CONTRIBUTING.md)
- [Development Setup](./Development.md)
- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Issue Templates](./.github/ISSUE_TEMPLATE/)

---

Welcome to the OpenHands community! We're excited to have you contribute to the future of AI-powered software development. 🚀
