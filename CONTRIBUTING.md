# Contributing to Self-Hosted AI Hello World

## Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b add-model/<model-name>`
3. Add your model app under `models/<model-name>/`
4. Test locally with LM Studio running
5. Submit a PR with benchmark results

## Adding a New Model

Follow this checklist:

- [ ] Create folder: `mkdir models/<model-name>`
- [ ] Copy template from `models/ministral-3-3b/server.js`
- [ ] Install dependencies: `npm install express node-fetch`
- [ ] Test endpoints work with your LM Studio setup
- [ ] Add benchmark results to the model's README.md
- [ ] Update `AGENTS.md` with new model in "Current Models Tested" table
- [ ] Log findings in `docs/experience-log.md`

## Documentation Standards

All documentation follows Markdown format. Use:

- Headings for structure (`#`, `##`, `###`)
- Tables for comparisons and specs
- Code blocks with language tags (```bash, ```json, etc.)
- Links to external resources where applicable

## Benchmarking Protocol

When adding benchmark data:

1. Run the same tasks defined in `docs/benchmarks.md`
2. Record TTFT, TPS, VRAM usage
3. Give quality score (1-5) with justification
4. Note any environmental factors (network latency, GPU load, etc.)

## Code Review Guidelines

PRs should include:

- Clear description of what was added/changed
- Benchmark results if applicable
- Any known issues or limitations
- Screenshots/logs if helpful for context

## Questions?

This is a learning project. If you're unsure about something, ask! The documentation itself is part of the experiment.
