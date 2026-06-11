# Tools Setup Guide

## LM Studio

**Website:** [lmstudio.ai](https://lmstudio.ai)
**GitHub:** [lmstudio-ai](https://github.com/lmstudio-ai)
**Discord:** [discord.gg/lmstudio](https://discord.gg/lmstudio)
**Docs:** [lmstudio.ai/docs](https://lmstudio.ai/docs)

### Installation

#### Desktop App (GUI — recommended for beginners)

1. Visit [lmstudio.ai/download](https://lmstudio.ai/download)
2. Download for your OS (Windows, macOS, Linux)
3. Install and launch

#### Headless Server (`llmster` — for servers/CI)

```bash
# Mac / Linux
curl -fsSL https://lmstudio.ai/install.sh | bash

# Windows PowerShell
irm https://lmstudio.ai/install.ps1 | iex
```

Learn more: [Headless deployment blog](https://lmstudio.ai/blog/0.4.0)

### Starting the Local Server (GUI)

1. Open LM Studio
2. Go to **Local Server** (icon on left sidebar)
3. Select your loaded model from the dropdown
4. Click **Start Server**
5. Default endpoint: `http://localhost:1234/v1/chat/completions`

The server implements the [OpenAI-compatible API](https://lmstudio.ai/docs/app/api/endpoints/openai), so any OpenAI client library works.

### Loading Models

1. Go to **Search Models** (sidebar)
2. Search for a model by name (e.g., "Llama 3.1", "Qwen2.5", "Mistral")
3. Select desired quantization (recommend Q4_K_M for best speed/quality balance)
4. Click **Download**
5. Go to **My Models** to see downloaded models
6. Double-click a model to load it into the server

### Model Format: GGUF

LM Studio uses [GGUF](https://github.com/ggerganov/ggml) format — the standard for consumer-grade local LLM inference. GGUF files are single-file, self-contained, and optimized for CPU/GPU split inference.

**Quantization options:**
| Quant | Quality | Size vs Q8_0 | Use Case |
|-------|---------|--------------|----------|
| Q8_0 | Excellent | 100% | When VRAM allows |
| Q6_K | Great | 75% | Good balance |
| Q4_K_M | Very Good | 50% | Recommended default |
| Q3_K_M | Good | 38% | Tighter VRAM constraints |
| Q2_K | Fair | 25% | Maximum size, reduced quality |

### SDK Options

#### JavaScript SDK

```bash
npm install @lmstudio/sdk
```

Docs: [lmstudio.ai/docs/sdk](https://lmstudio.ai/docs/sdk)

#### Python SDK

```bash
pip install lmstudio
```

Docs: [lmstudio-python](https://lmstudio.ai/docs/python)

### CLI (`lms`)

LM Studio ships with a CLI tool for headless operation:

```bash
# List available models
lms list

# Serve a model
lms serve --model <path-to-gguf> --port 1234

# Check server status
lms status
```

Docs: [lmstudio.ai/docs/cli](https://lmstudio.ai/docs/cli)

---

## opencode

**Website:** [opencode.ai](https://opencode.ai)
**GitHub:** [github.com/anomalyco/opencode](https://github.com/anomalyco/opencode) (160K stars, 900 contributors, 7.5M monthly devs)
**Docs:** [opencode.ai/docs](https://opencode.ai/docs)

### Installation

```bash
# curl (macOS/Linux)
curl -fsSL https://opencode.ai/install | bash

# npm
npm install -g opencode

# Homebrew
brew install opencode

# bun
bun install -g opencode
```

### Connecting to LM Studio

opencode supports 75+ LLM providers through [Models.dev](https://models.dev), including local models. To connect to your LM Studio server:

1. Create `~/.config/opencode/opencode.json` (or use the interactive setup):

```json
{
  "provider": {
    "name": "openai-compatible",
    "url": "http://localhost:1234/v1",
    "apiKey": "not-needed"
  },
  "model": "auto"
}
```

2. Start opencode in your project directory:
```bash
cd /path/to/your/project
opencode
```

### Key Features

- **LSP enabled**: Automatically loads the right Language Server Protocols for your codebase
- **Multi-session**: Run multiple agents in parallel on the same project
- **Share links**: Share any session via link for reference or debugging
- **Any model**: Connect to Claude, GPT, Gemini, local LM Studio, or 75+ providers
- **Privacy first**: No code or context data is stored

### Desktop App (Beta)

Available for macOS, Windows, and Linux. Download from [opencode.ai/download](https://opencode.ai/download).

### Installed Skills

Skills extend opencode with specialized workflows. These are the skills currently installed:

#### Process & Workflow Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `brainstorming` | Explore requirements before any creative work or feature implementation | superpowers |
| `test-driven-development` | Write tests before implementation code | superpowers |
| `systematic-debugging` | Structured bug investigation before proposing fixes | superpowers |
| `writing-plans` | Create implementation plans for multi-step tasks before touching code | superpowers |
| `executing-plans` | Execute written plans with review checkpoints | superpowers |
| `subagent-driven-development` | Delegate independent tasks to parallel subagents | superpowers |
| `dispatching-parallel-agents` | Spawn multiple agents for independent work | superpowers |
| `verification-before-completion` | Run verification commands before claiming work is done | superpowers |
| `finishing-a-development-branch` | Guide completion: merge, PR, or cleanup decisions | superpowers |

#### Code Review Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `requesting-code-review` | Request review when completing tasks or before merging | superpowers |
| `receiving-code-review` | Evaluate review feedback critically before implementing suggestions | superpowers |

#### Domain-Specific Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `cloudflare` | Cloudflare Workers, Pages, KV/D1/R2, AI, WAF, Terraform | ~/.config/opencode/skills/ |
| `frontend-design` | Visual design guidance for distinctive UI | ~/.config/opencode/skills/ |
| `mcp-builder` | Create MCP servers to integrate external APIs with LLMs | ~/.config/opencode/skills/ |
| `webapp-testing` | Playwright-based browser testing and debugging | ~/.config/opencode/skills/ |
| `vercel-react-best-practices` | React/Next.js performance optimization guidelines | ~/.config/opencode/skills/ |
| `composio` | Integrate 1000+ external apps via Composio SDK | superpowers |

#### Utility Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `using-superpowers` | Establishes how to find and use skills (loaded automatically) | superpowers |
| `using-git-worktrees` | Create isolated workspaces for feature development | superpowers |
| `stop-slop` | Remove AI writing patterns from prose | ~/.agents/skills/ |
| `skill-creator` | Create new skills, modify existing ones, run performance evals | ~/.config/opencode/skills/ |
| `writing-skills` | Author and verify custom skills before deployment | superpowers |
| `customize-opencode` | Configure opencode itself (opencode.json, agents, plugins, MCP) | built-in |

### Skill Loading Behavior

Skills are invoked automatically when the task matches their description. The rule: if there's even a 1% chance a skill applies, it must be loaded. Priority order:

1. Process skills first (brainstorming, debugging) — determine **how** to approach
2. Implementation skills second (frontend-design, mcp-builder) — guide execution

---

## Node.js + Express

**Node.js:** [nodejs.org](https://nodejs.org)
**Express:** [expressjs.com](https://expressjs.com)

### Installation

```bash
# Install Node.js (use nvm for version management)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
nvm install 20

# In your model app directory:
npm init -y
npm install express node-fetch
```

### Why This Stack?

- **Lightweight**: Minimal overhead, fast startup — perfect for quick prototyping
- **Familiar**: JavaScript/TypeScript is the lingua franca of web development
- **Async-first**: Non-blocking I/O ideal for making HTTP calls to LM Studio and measuring response times
- **Ecosystem**: Rich npm ecosystem for testing, benchmarking, and tooling
