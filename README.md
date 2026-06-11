# Self-Hosted AI Hello World

> Empirical benchmarking of local LLMs through Node.js apps — one model at a time.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![LM Studio](https://img.shields.io/badge/Local%20LLM-LM%20Studio-green)](https://lmstudio.ai)
[![GPU](https://img.shields.io/badge/GPU-RX_9070_XT-orange)](https://www.techpowerup.com/gpu-specs/radeon-rx-9070-xt.c4229)

---

## Vision

Each model gets its own self-contained Node.js app. We test, measure, and document real-world performance on our hardware stack. The goal: build a living knowledge base of what works, what doesn't, and how each model behaves when running locally on consumer-grade GPUs.

**Why this approach?**
- Isolated apps per model → easy to compare side-by-side
- Real HTTP endpoints → production-like testing conditions  
- Empirical data over theory → actual numbers from our hardware
- Living documentation → learn as we go, document everything

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Your Hardware                     │
│  MacBook Air M3 (client) ↔ i9-13900K/RX 9070 XT     │
│                         (host)                       │
└─────────────────────────────────────────────────────┘
                       ↕ HTTP/REST
┌─────────────────────────────────────────────────────┐
│                   LM Studio                          │
│  Local LLM server (OpenAI-compatible API endpoint)   │
│  :1234/v1/chat/completions                           │
└─────────────────────────────────────────────────────┘
                       ↕ HTTP/REST
┌─────────────────────────────────────────────────────┐
│              Node.js Apps (per model)                │
│  models/<model-name>/server.js                       │
│  - Chat endpoint                                     │
│  - Benchmark timing                                  │
│  - Agentic workflow tests                            │
└─────────────────────────────────────────────────────┘
                       ↕ CLI/Desktop
┌─────────────────────────────────────────────────────┐
│                   opencode                           │
│  Open-source AI coding agent                         │
│  Assists with app creation, testing, docs            │
└─────────────────────────────────────────────────────┘
```

---

## Tool Stack

| Tool | Purpose | Install | Docs |
|------|---------|---------|------|
| [LM Studio](https://lmstudio.ai) | Local LLM hosting & inference | [Download](https://lmstudio.ai/download) or `curl -fsSL https://lmstudio.ai/install.sh \| bash` (headless `llmster`) | [Docs](https://lmstudio.ai/docs) · [API](https://lmstudio.ai/docs/app/api/endpoints/openai) · [JS SDK](https://lmstudio.ai/docs/sdk) |
| [opencode](https://opencode.ai) | AI coding agent for app creation & docs | `curl -fsSL https://opencode.ai/install \| bash` | [Docs](https://opencode.ai/docs) · [GitHub](https://github.com/anomalyco/opencode) (160K stars) |
| Node.js + Express | App framework | `npm install express` | [Node.js](https://nodejs.org) · [Express](https://expressjs.com) |

---

## GPU: AMD Radeon RX 9070 XT

Our host machine's inference engine. See [docs/hardware.md](./docs/hardware.md) for full specs.

**Key numbers:**
- **16GB GDDR6 VRAM** — enough for models up to ~8B parameters at Q4 quantization
- RDNA 4.0 architecture with 128 Matrix Cores (AI acceleration)
- PCIe 5.0 x16 interface, 644.6 GB/s memory bandwidth
- Launch price: $599 — excellent value for local LLM workloads

> Source: [TechPowerUp GPU Database](https://www.techpowerup.com/gpu-specs/radeon-rx-9070-xt.c4229)

---

## Project Structure

```
ai-self-hosted-hw/
├── .agent/                  # opencode agent configuration (global for repo)
│   └── config.json          # Agent instructions & tool references
├── docs/                    # Living documentation
│   ├── hardware.md          # GPU/CPU specs, VRAM capacity analysis
│   ├── tools.md             # LM Studio + opencode setup guides with refs
│   ├── benchmarks.md        # Benchmark methodology & results per model
│   ├── agentic-workflows.md # Multi-step task patterns to test
│   ├── experience-log.md    # Findings, lessons learned, empirical notes
│   └── prompt-guide.md      # Reusable prompts for creating new model apps
├── models/                  # One Node.js app per model
│   └── <model-name>/        # e.g. ministral-3-3b/
│       ├── README.md        # Model-specific notes & results
│       ├── server.js        # Express app calling LM Studio API
│       ├── package.json     # Dependencies
│       └── benchmarks.md    # This model's benchmark data
├── README.md                # This file
└── package.json             # Root dependencies (shared)
```

---

## Quick Start

### 1. Set up LM Studio

1. Download from [lmstudio.ai/download](https://lmstudio.ai/download)
2. Import a model (GGUF format recommended for AMD GPU via `llmster` headless server)
3. Start local server: click **Start Server** in LM Studio, or use CLI:
   ```bash
   lms serve --model <path-to-gguf> --port 1234
   ```
4. Verify: `curl http://localhost:1234/v1/models`

### 2. Create a model app

Each model gets its own folder under `models/`:

```bash
mkdir models/<model-name>
cd models/<model-name>
npm init -y
npm install express node-fetch
```

Copy the template from [models/ministral-3-3b/server.js](./models/ministral-3-3b/server.js) and adjust.

### 3. Run and test

```bash
node server.js
curl http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"prompt":"Hello"}'
```

---

## Benchmarking

We measure every model on the same tasks for apples-to-apples comparison. See [docs/benchmarks.md](./docs/benchmarks.md) for methodology.

**Metrics tracked per model:**
- **Time to first token (TTFT)** — latency indicator
- **Tokens per second** — throughput measurement  
- **VRAM usage** — memory efficiency
- **Quality score** — subjective assessment of output quality
- **Context window behavior** — how the model handles long contexts

---

## Agentic Workflows

Beyond simple chat, we test models on multi-step agentic tasks. See [docs/agentic-workflows.md](./docs/agentic-workflows.md).

**Workflows tested:**
- Code generation + self-correction loops
- Research pipelines: search → synthesize → summarize
- Tool use patterns: calculator, file operations, API calls
- Multi-turn conversations with memory retention

---

## Experience Log

A living document of what we discover. Every finding, surprise, and lesson goes into [docs/experience-log.md](./docs/experience-log.md).

> This is a learning project — the documentation itself is part of the experiment.

---

## References

| Resource | Links |
|----------|-------|
| **LM Studio** | [Website](https://lmstudio.ai) · [Docs](https://lmstudio.ai/docs) · [GitHub](https://github.com/lmstudio-ai) · [Discord](https://discord.gg/lmstudio) |
| **opencode** | [Website](https://opencode.ai) · [Docs](https://opencode.ai/docs) · [GitHub](https://github.com/anomalyco/opencode) (160K stars, 900 contributors) |
| **TechPowerUp GPU DB** | [RX 9070 XT specs](https://www.techpowerup.com/gpu-specs/radeon-rx-9070-xt.c4229) |
| **GGUF Format** | [ggerret/GGML GitHub](https://github.com/ggerganov/ggml) · [Qwen models](https://huggingface.co/Qwen) |

---

## License

MIT — this is a learning project, feel free to fork and adapt. Contributions welcome!
