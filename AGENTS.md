# AGENTS.md - Instructions for AI Agents Working on This Project

## Project Context

This is a self-hosted LLM benchmarking project where each model gets its own Node.js Express app. We test models via LM Studio's local server and document empirical findings.

**Core principle:** Each model = isolated app folder under `models/<model-name>/`

## Architecture Overview

```
Hardware: MacBook Air M3 (client) ↔ i9-13900K/RX 9070 XT (host)
         ↓
LM Studio: Local LLM server at http://localhost:1234/v1/chat/completions
           ↓
Node.js Apps: One per model, calling LM Studio API with timing metrics
              ↓
opencode: AI coding agent assisting with app creation & documentation
```

## Coding Standards

### File Structure for New Model Apps

When creating a new model test app, follow this exact structure:

```
models/<model-name>/
├── README.md          # Model-specific notes & benchmark results
├── server.js          # Express app with LM Studio integration
├── package.json       # Dependencies (express, node-fetch)
└── benchmarks.md      # This model's benchmark data
```

### Server.js Template Requirements

Every `server.js` must include:
1. **POST /api/chat** - Chat endpoint that calls LM Studio API with timing metrics
2. **GET /api/greet** - Simple greeting test (baseline)
3. **GET /api/benchmarks** - Quick benchmark suite runner
4. **Timing metrics** - TTFT, tokens generated, TPS calculation
5. **Error handling** - Graceful fallback when LM Studio is unavailable

### Naming Conventions

- Model folders: lowercase with hyphens (e.g., `ministral-3-3b`, not `MiniStral_3B`)
- Endpoints: RESTful, lowercase, kebab-case
- Variables: camelCase in JavaScript
- Comments: JSDoc style for public functions

## LM Studio Integration

**API Endpoint:** `http://localhost:1234/v1/chat/completions`
**Format:** OpenAI-compatible JSON API
**Default model:** `"auto"` (uses whatever is loaded)

Example request structure:
```json
{
  "model": "auto",
  "messages": [{"role": "user", "content": "Your prompt here"}],
  "temperature": 0.7,
  "max_tokens": 1024
}
```

## Documentation Standards

### When Creating New Model Apps

1. Create the app structure following `models/ministral-3-3b/` as reference
2. Add model-specific notes to its README.md:
   - Model name and quantization used
   - Date tested
   - Key findings from benchmarks
   - Any quirks or issues observed
3. Update `docs/experience-log.md` with initial setup findings

### Benchmark Reporting

Use the template in `docs/benchmarks.md`. Always include:
- TTFT (Time to First Token)
- TPS (Tokens Per Second)  
- VRAM usage if measurable
- Quality score (1-5 scale)
- Notes on any anomalies

## Hardware Context

**Host GPU:** AMD Radeon RX 9070 XT (16GB GDDR6, RDNA 4.0)
- 128 Matrix Cores for AI acceleration
- PCIe 5.0 x16 interface
- Launch price: $599 USD

**Client:** MacBook Air M3 (development machine only)

See `docs/hardware.md` for full specs and LLM capacity analysis.

## Tool Stack References

| Tool | Purpose | Install | Docs |
|------|---------|---------|------|
| LM Studio | Local LLM hosting | [Download](https://lmstudio.ai/download) or `curl -fsSL https://lmstudio.ai/install.sh \| bash` | [Docs](https://lmstudio.ai/docs) · [API](https://lmstudio.ai/docs/app/api/endpoints/openai) |
| opencode | AI coding agent | `curl -fsSL https://opencode.ai/install \| bash` | [Docs](https://opencode.ai/docs) · [GitHub](https://github.com/anomalyco/opencode) |
| Node.js + Express | App framework | `npm install express node-fetch` | [Node.js](https://nodejs.org) · [Express](https://expressjs.com) |

## What NOT to Do

- ❌ Don't create apps that don't actually call LM Studio API (static responses only)
- ❌ Don't hardcode model names - use `"auto"` or read from config
- ❌ Don't ignore benchmark timing - metrics are the point of this project
- ❌ Don't skip updating experience-log.md with findings

## What to Do

- ✅ Always measure real response times and token counts
- ✅ Document everything in the living docs structure
- ✅ Follow existing patterns when adding new models
- ✅ Test endpoints after creation before claiming completion

## Current Models Tested

| Model | Folder | Port | Status |
|-------|--------|------|--------|
| Ministral 3B (3.3B params) | `models/ministral-3-3b/` | 3000 | Initial setup complete |
| Qwen3.6 27B (27B params) | `models/qwen3-6-27b/` | 3001 | App created, benchmarks pending |

Add new models to this table as you create them.
