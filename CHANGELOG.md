# Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- Project initialization with Ministral 3B baseline app
- Qwen3.6 27B model test app (`models/qwen3-6-27b/`) — port 3001, benchmarks pending
- Comprehensive documentation structure:
  - `docs/hardware.md` - RX 9070 XT specs & LLM capacity analysis
  - `docs/tools.md` - LM Studio + opencode setup guides
  - `docs/benchmarks.md` - Standardized benchmark methodology
  - `docs/agentic-workflows.md` - Multi-step task patterns to test
  - `docs/experience-log.md` - Living findings document
  - `docs/prompt-guide.md` - Reusable prompts for new model apps
- `.agent/config.json` - opencode agent configuration
- `AGENTS.md` - Instructions for AI agents working on this project
- `CONTRIBUTING.md` - Human contribution guidelines

### Technical Details
- LM Studio integration via OpenAI-compatible API at `localhost:1234`
- Express.js apps with timing metrics (TTFT, TPS)
- AMD RX 9070 XT (16GB VRAM) as primary inference accelerator
- MacBook Air M3 as development client

## Future Plans

- [ ] Add more models for comparison (Qwen, Llama, Mistral variants)
- [ ] Automated benchmark runner script
- [ ] Visualization dashboard for comparing model performance
- [ ] Agentic workflow testing framework
- [ ] VRAM usage monitoring integration

---

**Versioning:** This project uses semantic versioning for major documentation updates. Model additions are tracked in `AGENTS.md` and individual model folders.
