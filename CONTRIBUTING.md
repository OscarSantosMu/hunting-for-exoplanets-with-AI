# Contributing Guide

Thanks for your interest in contributing! 🚀

## Getting Started
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Install dependencies (see README)
4. Run tests: `pytest -q`
5. Open a Pull Request (PR)

## Code Style
We use Ruff (lint+format) and Black compatibility.

Run before committing:
```
ruff check . --fix
ruff format .
pytest -q
```

## Commit Messages
Conventional commits recommended:
- feat: new feature
- fix: bug fix
- docs: documentation only
- refactor: no behavior change
- test: adding/updating tests
- chore: maintenance

## Adding Dependencies
Update `pyproject.toml` and lock if using a resolver (e.g. `uv pip compile`). Keep runtime deps minimal; move tooling to dev dependencies.

## Data
Do NOT commit large raw datasets. Use scripts in `scripts/` to download.

## Issues & Discussions
Use GitHub Issues for bugs/enhancements. Provide reproduction steps and environment info.

## Code Review Checklist
- [ ] Tests added/updated
- [ ] Docs updated (README, docstrings, examples)
- [ ] Lint passes
- [ ] No secrets / API keys committed

Thank you! 🌌
