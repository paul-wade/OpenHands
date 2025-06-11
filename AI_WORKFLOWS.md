# OpenHands AI Workflows & Actions

This document contains AI-powered workflows and actions that can be used to enhance development productivity in the OpenHands project.

## Table of Contents

1. [Development Setup Workflows](#development-setup-workflows)
2. [Code Quality Workflows](#code-quality-workflows)
3. [Testing Workflows](#testing-workflows)
4. [Contribution Workflows](#contribution-workflows)
5. [Debugging Workflows](#debugging-workflows)
6. [Documentation Workflows](#documentation-workflows)

## Development Setup Workflows

### 1. New Contributor Onboarding
```bash
# AI Action: Complete Environment Setup
function setup_openhands_dev() {
    echo "🚀 Setting up OpenHands development environment..."

    # Check prerequisites
    make check-dependencies

    # Build project
    make build

    # Install pre-commit hooks (mandatory)
    make install-pre-commit-hooks

    # Setup basic configuration
    make setup-config-basic

    # Verify setup
    make lint
    make test-frontend

    echo "✅ Development environment ready!"
    echo "Next steps:"
    echo "1. Configure LLM settings: make setup-config"
    echo "2. Start development: make run"
    echo "3. Read CONTRIBUTOR_GUIDE.md for detailed guidelines"
}
```

### 2. Quick Development Start
```bash
# AI Action: Fast Development Startup
function quick_start() {
    # Start backend in background
    make start-backend &
    BACKEND_PID=$!

    # Wait for backend to be ready
    echo "⏳ Waiting for backend to start..."
    until nc -z localhost 3000; do sleep 0.1; done
    echo "✅ Backend ready"

    # Start frontend
    echo "🎨 Starting frontend..."
    make start-frontend

    # Cleanup on exit
    trap "kill $BACKEND_PID" EXIT
}
```

### 3. Docker Development Setup
```bash
# AI Action: Docker-based Development
function docker_dev_setup() {
    echo "🐳 Setting up Docker development environment..."

    # Check if running inside Docker
    if [ -f /.dockerenv ]; then
        echo "Already inside Docker container"
        return 0
    fi

    # Start Docker development environment
    make docker-dev

    echo "✅ Docker development environment ready!"
}
```

## Code Quality Workflows

### 1. Pre-commit Quality Check
```bash
# AI Action: Comprehensive Code Quality Check
function quality_check() {
    echo "🔍 Running comprehensive code quality checks..."

    # Check if pre-commit hooks are installed
    if ! git config --get core.hooksPath | grep -q pre-commit; then
        echo "Installing pre-commit hooks..."
        make install-pre-commit-hooks
    fi

    # Run backend linting
    echo "🐍 Checking Python code quality..."
    make lint-backend

    # Run frontend linting
    echo "⚛️ Checking frontend code quality..."
    make lint-frontend

    # Run tests
    echo "🧪 Running tests..."
    make test

    echo "✅ All quality checks passed!"
}
```

### 2. Auto-fix Code Issues
```bash
# AI Action: Automatic Code Fixing
function auto_fix_code() {
    echo "🔧 Auto-fixing code issues..."

    # Fix Python code issues
    poetry run ruff check --config dev_config/python/ruff.toml --fix --unsafe-fixes .
    poetry run ruff format --config dev_config/python/ruff.toml .

    # Fix frontend issues
    cd frontend && npm run lint:fix && cd ..

    # Run pre-commit to catch any remaining issues
    poetry run pre-commit run --all-files --config ./dev_config/python/.pre-commit-config.yaml

    echo "✅ Code auto-fixing completed!"
}
```

### 3. Type Checking Workflow
```bash
# AI Action: Comprehensive Type Checking
function type_check() {
    echo "🔍 Running type checks..."

    # Python type checking with MyPy
    echo "🐍 Checking Python types..."
    poetry run mypy --config-file dev_config/python/mypy.ini openhands/

    # TypeScript type checking
    echo "📘 Checking TypeScript types..."
    cd frontend && npx tsc --noEmit && cd ..

    echo "✅ Type checking completed!"
}
```

## Testing Workflows

### 1. Comprehensive Testing Suite
```bash
# AI Action: Run All Tests
function run_all_tests() {
    echo "🧪 Running comprehensive test suite..."

    # Backend unit tests
    echo "🐍 Running Python unit tests..."
    poetry run pytest tests/unit/ -v --cov=openhands --cov-report=term-missing

    # Frontend tests
    echo "⚛️ Running frontend tests..."
    cd frontend && npm run test && cd ..

    # Integration tests (if available)
    if [ -d "tests/integration" ]; then
        echo "🔗 Running integration tests..."
        poetry run pytest tests/integration/ -v
    fi

    echo "✅ All tests completed!"
}
```

### 2. Test-Driven Development Workflow
```bash
# AI Action: TDD Workflow
function tdd_workflow() {
    local test_file=$1
    local source_file=$2

    echo "🔄 Starting TDD workflow for $source_file..."

    # Create test file if it doesn't exist
    if [ ! -f "$test_file" ]; then
        echo "📝 Creating test file: $test_file"
        # Generate basic test structure
        cat > "$test_file" << EOF
import pytest
from $source_file import *

class Test$(basename $source_file .py | sed 's/^./\U&/'):
    def test_placeholder(self):
        # TODO: Implement test
        assert True
EOF
    fi

    # Watch for changes and run tests
    echo "👀 Watching for changes..."
    while inotifywait -e modify "$test_file" "$source_file" 2>/dev/null; do
        echo "🧪 Running tests..."
        poetry run pytest "$test_file" -v
    done
}
```

### 3. Test Coverage Analysis
```bash
# AI Action: Test Coverage Analysis
function analyze_coverage() {
    echo "📊 Analyzing test coverage..."

    # Run tests with coverage
    poetry run pytest tests/unit/ --cov=openhands --cov-report=html --cov-report=term

    # Generate coverage report
    echo "📈 Coverage report generated in htmlcov/"

    # Check coverage threshold
    local coverage=$(poetry run coverage report | grep TOTAL | awk '{print $4}' | sed 's/%//')
    if [ "$coverage" -lt 80 ]; then
        echo "⚠️ Coverage is below 80%: $coverage%"
        echo "Consider adding more tests"
    else
        echo "✅ Good coverage: $coverage%"
    fi
}
```

## Contribution Workflows

### 1. Feature Development Workflow
```bash
# AI Action: Feature Development Process
function develop_feature() {
    local feature_name=$1
    local issue_number=$2

    echo "🚀 Starting feature development: $feature_name"

    # Create feature branch
    git checkout -b "feat/$feature_name"

    # Set up development environment
    quality_check

    echo "📝 Development checklist:"
    echo "1. Implement feature in appropriate module"
    echo "2. Add comprehensive tests"
    echo "3. Update documentation"
    echo "4. Run quality checks: quality_check"
    echo "5. Commit with conventional format"
    echo "6. Push and create PR"

    # Watch for changes and run tests automatically
    echo "👀 Auto-testing enabled. Modify files to trigger tests."
}
```

### 2. Bug Fix Workflow
```bash
# AI Action: Bug Fix Process
function fix_bug() {
    local bug_description=$1
    local issue_number=$2

    echo "🐛 Starting bug fix: $bug_description"

    # Create bug fix branch
    git checkout -b "fix/$bug_description"

    # Create test to reproduce bug
    echo "📝 Bug fix checklist:"
    echo "1. Write test that reproduces the bug"
    echo "2. Verify test fails"
    echo "3. Implement fix"
    echo "4. Verify test passes"
    echo "5. Run full test suite"
    echo "6. Update documentation if needed"

    # Set up testing environment
    run_all_tests
}
```

### 3. Pull Request Preparation
```bash
# AI Action: PR Preparation
function prepare_pr() {
    echo "📋 Preparing pull request..."

    # Run comprehensive checks
    quality_check

    # Check commit message format
    local last_commit=$(git log -1 --pretty=format:"%s")
    if ! echo "$last_commit" | grep -E "^(feat|fix|docs|style|refactor|test|chore)(\(.+\))?: .+"; then
        echo "⚠️ Commit message doesn't follow conventional format"
        echo "Current: $last_commit"
        echo "Expected: type(scope): description"
    fi

    # Generate PR description template
    cat > PR_DESCRIPTION.md << EOF
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Refactoring
- [ ] Performance improvement

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests added/updated
- [ ] Manual testing completed

## Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] Tests pass locally
EOF

    echo "✅ PR preparation completed!"
    echo "📄 PR description template created: PR_DESCRIPTION.md"
}
```

## Debugging Workflows

### 1. LLM Debugging
```bash
# AI Action: LLM Debug Mode
function debug_llm() {
    echo "🔍 Enabling LLM debugging..."

    # Enable debug mode
    export DEBUG=1

    # Create logs directory
    mkdir -p logs/llm

    # Start backend with debugging
    echo "🚀 Starting backend with LLM debugging..."
    make start-backend

    echo "📝 LLM logs will be saved in logs/llm/$(date +%Y-%m-%d)/"
    echo "Monitor logs: tail -f logs/llm/$(date +%Y-%m-%d)/*.log"
}
```

### 2. Performance Profiling
```bash
# AI Action: Performance Profiling
function profile_performance() {
    local component=$1  # backend or frontend

    echo "📊 Profiling $component performance..."

    if [ "$component" = "backend" ]; then
        # Python profiling
        poetry run python -m cProfile -o profile.stats -m openhands.server.listen
        echo "📈 Profile saved to profile.stats"
        echo "Analyze with: poetry run python -c 'import pstats; pstats.Stats(\"profile.stats\").sort_stats(\"cumulative\").print_stats(20)'"
    elif [ "$component" = "frontend" ]; then
        # Frontend performance analysis
        cd frontend
        npm run build -- --analyze
        echo "📈 Bundle analysis available"
        cd ..
    fi
}
```

### 3. Error Analysis
```bash
# AI Action: Error Analysis and Resolution
function analyze_error() {
    local error_log=$1

    echo "🔍 Analyzing error: $error_log"

    # Common error patterns and solutions
    if grep -q "ModuleNotFoundError" "$error_log"; then
        echo "🐍 Python module not found - check dependencies"
        echo "Solution: poetry install"
    elif grep -q "ENOENT" "$error_log"; then
        echo "📁 File not found error"
        echo "Check file paths and permissions"
    elif grep -q "EADDRINUSE" "$error_log"; then
        echo "🔌 Port already in use"
        echo "Solution: kill process or use different port"
    elif grep -q "TypeError" "$error_log"; then
        echo "🔍 Type error - check type annotations"
        echo "Run: make type_check"
    fi

    # Suggest debugging steps
    echo "🛠️ Debugging steps:"
    echo "1. Check logs in logs/ directory"
    echo "2. Run with DEBUG=1 for verbose output"
    echo "3. Use debugger: poetry run python -m pdb script.py"
}
```

## Documentation Workflows

### 1. Auto-generate Documentation
```bash
# AI Action: Documentation Generation
function generate_docs() {
    echo "📚 Generating documentation..."

    # Generate API documentation
    if command -v sphinx-build &> /dev/null; then
        echo "📖 Generating API docs with Sphinx..."
        sphinx-build -b html docs/ docs/_build/
    fi

    # Generate frontend component docs
    cd frontend
    if [ -f "package.json" ] && grep -q "storybook" package.json; then
        echo "📱 Generating component documentation..."
        npm run build-storybook
    fi
    cd ..

    # Generate README for new modules
    find openhands/ -type d -name "*.py" -exec dirname {} \; | sort -u | while read dir; do
        if [ ! -f "$dir/README.md" ]; then
            echo "📝 Creating README for $dir"
            cat > "$dir/README.md" << EOF
# $(basename $dir)

## Overview
Brief description of this module.

## Components
- List key components
- Describe their purpose

## Usage
\`\`\`python
# Example usage
\`\`\`

## Testing
\`\`\`bash
poetry run pytest tests/unit/test_$(basename $dir).py
\`\`\`
EOF
        fi
    done

    echo "✅ Documentation generation completed!"
}
```

### 2. Documentation Quality Check
```bash
# AI Action: Documentation Quality Assurance
function check_docs() {
    echo "📋 Checking documentation quality..."

    # Check for broken links
    if command -v linkchecker &> /dev/null; then
        echo "🔗 Checking for broken links..."
        linkchecker docs/
    fi

    # Check for outdated documentation
    echo "📅 Checking for outdated docs..."
    find docs/ -name "*.md" -mtime +90 -exec echo "Outdated: {}" \;

    # Spell check
    if command -v aspell &> /dev/null; then
        echo "📝 Spell checking documentation..."
        find docs/ -name "*.md" -exec aspell check {} \;
    fi

    # Check documentation coverage
    echo "📊 Documentation coverage analysis..."
    # Count documented vs undocumented functions
    local total_functions=$(grep -r "def " openhands/ | wc -l)
    local documented_functions=$(grep -r "def " openhands/ | grep -A 3 '"""' | wc -l)
    local coverage=$((documented_functions * 100 / total_functions))

    echo "📈 Documentation coverage: $coverage%"
    if [ "$coverage" -lt 70 ]; then
        echo "⚠️ Documentation coverage is low. Consider adding more docstrings."
    fi
}
```

### 3. Interactive Documentation
```bash
# AI Action: Interactive Documentation Server
function serve_docs() {
    echo "🌐 Starting interactive documentation server..."

    # Start documentation server
    if [ -d "docs/_build" ]; then
        cd docs/_build && python -m http.server 8080 &
        DOC_SERVER_PID=$!
        echo "📚 Documentation available at: http://localhost:8080"
    fi

    # Start API documentation
    if command -v swagger-ui-serve &> /dev/null; then
        swagger-ui-serve docs/openapi.json -p 8081 &
        API_DOC_PID=$!
        echo "🔌 API documentation available at: http://localhost:8081"
    fi

    # Cleanup on exit
    trap "kill $DOC_SERVER_PID $API_DOC_PID 2>/dev/null" EXIT

    echo "📖 Documentation servers running. Press Ctrl+C to stop."
    wait
}
```

## Usage Instructions

### Setting up AI Workflows
1. Copy these functions to your shell profile (`.bashrc`, `.zshrc`)
2. Source your profile: `source ~/.bashrc`
3. Use functions directly: `setup_openhands_dev`

### Integration with OpenHands
These workflows can be integrated into OpenHands microagents for AI-powered development assistance.

### Customization
Modify these workflows based on your specific development needs and team requirements.

---

These AI workflows are designed to enhance productivity and maintain code quality in the OpenHands project. They can be adapted and extended based on specific project needs and team preferences.
