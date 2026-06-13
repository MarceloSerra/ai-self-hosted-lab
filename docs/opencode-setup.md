# OpenCode Setup & Plugins Guide

## Overview

This document covers the complete OpenCode setup including plugins, MCP servers, skills, and configuration for enhanced AI coding workflows.

**Source:** [Best OpenCode Plugins - Composio Blog](https://composio.dev/content/best-opencode-plugins)

---

## Plugin Architecture

OpenCode has two extension types:

- **Skills = better instructions** — Teach the agent how to do tasks (code reviews, debugging, workflows)
- **Plugins = extra functionality** — Extend what OpenCode can do (connect apps, notifications, memory)

### Installation Paths

| Type | Location | Format |
|------|----------|--------|
| Local plugins | `.opencode/plugins/` or `~/.config/opencode/plugins/` | JavaScript/TypeScript files |
| npm plugins | Listed in `opencode.json` plugin array | Package names |
| MCP servers | Listed in `opencode.json` mcp object | Server configs |

---

## Currently Installed Plugins

### 1. Dynamic Context Pruning (`@tarquinen/opencode-dcp`)

**Purpose:** Reduces token usage by pruning stale context during long OpenCode sessions without changing actual session history.

**What it does:**
- Automatically replaces older, less useful content with placeholders before requests are sent to the model
- Does not modify your actual session history — only changes what gets sent to the LLM
- Super handy for bigger repos and longer coding sessions

**Installation:**
```bash
opencode plugin @tarquinen/opencode-dcp@latest --global
```

**Config file:** `~/.config/opencode/dcp.jsonc`

**Resources:**
- GitHub: [Opencode-DCP/opencode-dynamic-context-pruning](https://github.com/Opencode-DCP/opencode-dynamic-context-pruning)

---

### 2. Opencode Mem (`opencode-mem`)

**Purpose:** Adds persistent memory across OpenCode sessions so the agent doesn't forget project context.

**What it does:**
- Gives OpenCode memory across sessions
- Stores useful project and user context (conventions, patterns, preferences)
- Helps the agent avoid repeating old mistakes
- Works well for long-running projects where you constantly give the same instructions

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["opencode-mem"]
```

**Config file:** `~/.config/opencode/opencode-mem.jsonc`

Key settings:
- Embedding model for similarity search (default: Xenova/nomic-embed-text-v1)
- Web UI accessible at http://localhost:4747
- Storage path for vector database

**Resources:**
- GitHub: [tickernelz/opencode-mem](https://github.com/tickernelz/opencode-mem)

---

### 3. Envsitter Guard (`envsitter-guard`)

**Purpose:** Protects `.env` files and sensitive secrets from unsafe agent reads or edits.

**What it does:**
- Blocks unsafe reads or edits of sensitive environment files
- Helps protect API keys and secrets
- Still allows safer inspection of environment structure
- Essential for production repos and team projects with real credentials

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["envsitter-guard"]
```

**Resources:**
- GitHub: [boxpositron/envsitter-guard](https://github.com/boxpositron/envsitter-guard)
- Related project: [boxpositron/envsitter](https://github.com/boxpositron/envsitter)

---

### 4. Oh My Opencode Slim (`oh-my-opencode-slim`)

**Purpose:** Adds lightweight agent orchestration, background tasks, LSP/AST tools, and MCP support.

**What it does:**
- Adds specialized sub-agents for complex tasks
- Helps with background task management
- Provides LSP and AST-aware tools
- Supports tmux visibility for live agent work
- Includes MCP support

Use when a single OpenCode agent starts feeling too messy — not needed for small changes, but valuable for larger tasks where you want exploration, planning, implementation, and review to feel more separated.

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["oh-my-opencode-slim"]
```

Or local plugin files in `.opencode/plugins/`

**Resources:**
- GitHub: [alvinunreal/oh-my-opencode-slim](https://github.com/alvinunreal/oh-my-opencode-slim)

---

### 5. OpenCode Worktree (`opencode-worktree`)

**Purpose:** Makes Git worktree-based agent workflows less annoying for isolated coding sessions.

**What it does:**
- Creates isolated worktree sessions
- Helps keep agent work away from your current branch
- Auto-spawns terminals for separate work areas
- Helps clean up after sessions

Useful when you want OpenCode to work on experimental changes without touching your main workspace, or when running multiple agents simultaneously.

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["opencode-worktree"]
```

Or local plugin in `.opencode/plugins/`

**Resources:**
- GitHub: [kdcokenny/opencode-worktree](https://github.com/kdcokenny/opencode-worktree)
- Git docs: [git worktree](https://git-scm.com/docs/git-worktree)

---

### 6. Opencode Notify (`opencode-notify`)

**Purpose:** Sends native OS notifications when OpenCode finishes tasks.

**What it does:**
- Sends native desktop notifications on task completion
- Helps you step away while OpenCode works (tests run, builds fail, agent retries)
- Keeps the workflow lightweight — no need to stare at terminal

Simple plugin that's very easy to appreciate after one long test run.

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["opencode-notify"]
```

Or install locally in `~/.config/opencode/plugins/`

**Resources:**
- GitHub: [kdcokenny/opencode-notify](https://github.com/kdcokenny/opencode-notify)

---

### 7. Daytona Sandbox (`@daytona/opencode`)

**Purpose:** Runs OpenCode sessions inside isolated Daytona sandboxes so agents can work without directly touching your local machine.

**What it does:**
- Each session gets its own remote sandbox environment
- Changes are synced back to your local machine through Git branches
- Creates branches like `opencode/1`, `opencode/2` for inspection before merging
- Complete security isolation — even those against coding agents can use this safely

**Installation:**
```bash
# Add to opencode.json plugin array:
"plugin": ["@daytona/opencode"]

# Set up Daytona API key:
export DAYTONA_API_KEY="your-daytona-api-key"

# Start OpenCode in a git repo:
opencode
```

**Requirements:** Daytona account and API key needed.

**Resources:**
- GitHub: [daytonaio/daytona/libs/opencode-plugin](https://github.com/daytonaio/daytona/tree/main/libs/opencode-plugin)

---

## MCP Servers

### 1. Context7 (`context7`)

**Purpose:** Gives OpenCode up-to-date library docs and code examples so it stops guessing outdated APIs.

**What it does:**
- Fetches current library documentation (Next.js, React, Prisma, Stripe, LangChain, etc.)
- Helps avoid outdated APIs and hallucinated function names
- Works through MCP or CLI-style workflows
- Useful for frontend, backend, SDK, and framework-heavy work

**Usage Example:**
```
Build this with the latest Next.js middleware docs. Use Context7.
```

**Installation (Manual):**
```json
{
  "mcp": {
    "context7": {
      "type": "local",
      "command": ["npx", "-y", "@upstash/context7-mcp"]
    }
  }
}
```

**Installation (Quick Setup):**
```bash
npx ctx7 setup --opencode
```

**Resources:**
- GitHub: [upstash/context7](https://github.com/upstash/context7)

---

### 2. Composio (`composio`) — ⚠️ Requires Authentication

**Purpose:** Connects OpenCode to external apps, MCP tools, and real-world services through 1,000+ toolkits and 20,000+ tools.

**What it does:**
- Connects OpenCode to GitHub, Linear, Jira, Slack, Figma, Stripe, Gmail, Notion, and more
- Handles authentication flows instead of making you build them manually
- Lets OpenCode use external context and take actions outside the repo
- Works through MCP-style workflows

**Installation:**
```json
{
  "mcp": {
    "composio": {
      "type": "remote",
      "url": "https://connect.composio.dev/mcp"
    }
  }
}
```

**Authentication (REQUIRED):**
```bash
opencode mcp auth composio
```
This opens a browser for OAuth authentication. Complete the flow in your browser to authenticate.

**Resources:**
- GitHub: [ComposioHQ/composio](https://github.com/ComposioHQ/composio)
- Docs: [Composio MCP docs](https://docs.composio.dev/)

---

## Current Configuration

### `~/.config/opencode/opencode.json`

```json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "lmstudio": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "LM Studio Self-Hosted AI Server",
      "options": {
        "baseURL": "http://192.168.31.249:1234/v1"
      },
      "models": {
        "unsloth/qwen3.6-27b": {
          "name": "qwen3.6-27b"
        },
        "unsloth/qwen3.6-27b@q2_k_xl": {
          "name": "qwen3.6-27b@q2_k_xl"
        },
        "google/gemma-4-12b": {
          "name": "gemma-4-12b"
        }
      }
    }
  },
  "plugin": [
    "superpowers@git+https://github.com/obra/superpowers.git",
    "opencode-mem",
    "envsitter-guard",
    "oh-my-opencode-slim",
    "opencode-worktree",
    "opencode-notify",
    "@daytona/opencode",
    "@tarquinen/opencode-dcp@latest"
  ],
  "mcp": {
    "context7": {
      "type": "remote",
      "url": "https://mcp.context7.com/mcp",
      "enabled": true,
      "headers": {
        "CONTEXT7_API_KEY": "ctx7sk-58784262-b87f-4900-8408-191877b460f7"
      }
    },
    "composio": {
      "type": "remote",
      "url": "https://connect.composio.dev/mcp"
    }
  }
}
```

### Config Files Created by Plugins

| File | Purpose |
|------|---------|
| `~/.config/opencode/dcp.jsonc` | Dynamic Context Pruning settings |
| `~/.config/opencode/opencode-mem.jsonc` | Memory plugin configuration (embedding model, storage path, web UI) |
| `~/.config/opencode/opencode.jsonc` | General OpenCode config overrides |

---

## Skills Currently Installed

### Process & Workflow Skills (from superpowers)

| Skill | Purpose |
|-------|---------|
| `brainstorming` | Explore requirements before any creative work or feature implementation |
| `test-driven-development` | Write tests before implementation code |
| `systematic-debugging` | Structured bug investigation before proposing fixes |
| `writing-plans` | Create implementation plans for multi-step tasks before touching code |
| `executing-plans` | Execute written plans with review checkpoints |
| `subagent-driven-development` | Delegate independent tasks to parallel subagents |
| `dispatching-parallel-agents` | Spawn multiple agents for independent work |
| `verification-before-completion` | Run verification commands before claiming work is done |
| `finishing-a-development-branch` | Guide completion: merge, PR, or cleanup decisions |

### Code Review Skills (from superpowers)

| Skill | Purpose |
|-------|---------|
| `requesting-code-review` | Request review when completing tasks or before merging |
| `receiving-code-review` | Evaluate review feedback critically before implementing suggestions |

### Domain-Specific Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `cloudflare` | Cloudflare Workers, Pages, KV/D1/R2, AI, WAF, Terraform | ~/.config/opencode/skills/ |
| `frontend-design` | Visual design guidance for distinctive UI | ~/.config/opencode/skills/ |
| `mcp-builder` | Create MCP servers to integrate external APIs with LLMs | ~/.config/opencode/skills/ |
| `webapp-testing` | Playwright-based browser testing and debugging | ~/.config/opencode/skills/ |
| `vercel-react-best-practices` | React/Next.js performance optimization guidelines | ~/.config/opencode/skills/ |
| `composio` | Integrate 1000+ external apps via Composio SDK | superpowers |

### Utility Skills

| Skill | Purpose | Source |
|-------|---------|--------|
| `using-superpowers` | Establishes how to find and use skills (loaded automatically) | superpowers |
| `using-git-worktrees` | Create isolated workspaces for feature development | superpowers |
| `stop-slop` | Remove AI writing patterns from prose | ~/.agents/skills/ |
| `skill-creator` | Create new skills, modify existing ones, run performance evals | ~/.config/opencode/skills/ |
| `writing-skills` | Author and verify custom skills before deployment | superpowers |
| `customize-opencode` | Configure opencode itself (opencode.json, agents, plugins, MCP) | built-in |

---

## How to Install New Plugins

### Method 1: npm Plugin (Recommended for published packages)

```bash
# Add plugin name to ~/.config/opencode/opencode.json plugin array:
{
  "plugin": ["your-plugin-name"]
}
```

Restart OpenCode after adding plugins.

### Method 2: Global Plugin Installation

```bash
opencode plugin <package-name>@latest --global
```

This installs the plugin and adds it to your global config automatically.

### Method 3: Local Plugin Files

Create `.opencode/plugins/` in your project or `~/.config/opencode/plugins/` for global plugins, then place JavaScript/TypeScript files inside.

### Method 4: MCP Server Configuration

Add to `opencode.json`:

```json
{
  "mcp": {
    "server-name": {
      "type": "local",
      "command": ["npx", "-y", "@package/name"]
    }
  }
}
```

For remote MCP servers:

```json
{
  "mcp": {
    "server-name": {
      "type": "remote",
      "url": "https://example.com/mcp"
    }
  }
}
```

---

## Converting Claude Code Plugins to OpenCode

Claude Code plugins can't be installed directly, but most convert easily:

### MCP Servers (Easiest)
Copy the MCP server config into `opencode.json`:
```json
{
  "mcp": {
    "my-tool": {
      "type": "local",
      "command": ["npx", "-y", "my-mcp-server"]
    }
  }
}
```

### Skills
Copy Claude Code skills into OpenCode skills folder:
```bash
mkdir -p .opencode/skills/code-review
cp my-plugin/skills/code-review/SKILL.md .opencode/skills/code-review/SKILL.md
```
Adjust Claude-specific variables like `${CLAUDE_PLUGIN_ROOT}` as needed.

### Agents
Convert Claude Code agents to OpenCode format:
```markdown
---
name: code-reviewer
description: Reviews code for bugs, security issues, and maintainability
tools:
  write: false
  edit: false
---

You are a strict code reviewer...
```
Save to `.opencode/agents/code-reviewer.md` or `~/.config/opencode/agents/`.

### Commands
Create markdown files in `.opencode/commands/` or `~/.config/opencode/commands/`:
```markdown
---
description: Review the current git diff
---

Review the current git diff.

Focus on:
- bugs
- security issues
- confusing code
- missing tests

Here is the diff:

!`git diff`
```

---

## Recommended Setup by Use Case

| Problem | Solution Plugin |
|---------|----------------|
| OpenCode keeps forgetting context | Opencode Mem |
| Using outdated APIs/framework docs | Context7 |
| Want OpenCode to work with team tools (GitHub, Linear, Jira) | Composio |
| Worried about secrets/credentials safety | Envsitter Guard |
| Bigger tasks feel messy/unorganized | Oh My Opencode Slim or OpenCode Worktree |
| Don't want to stare at terminal during long runs | Opencode Notify |
| Want maximum security isolation | Daytona Sandbox |
| High token usage on long sessions | Dynamic Context Pruning |

---

## Important Notes

### Security Warning
Plugins are easy supply-chain attack vectors. Always verify plugin sources before installing:
- Check GitHub repositories for activity and contributors
- Review plugin code if unfamiliar with the author
- Don't blindly install everything — start with what you actually need

### Composio Authentication Required
The Composio MCP server is configured but **requires manual authentication**:
```bash
opencode mcp auth composio
```
This opens a browser for OAuth. Complete the flow to enable access to 1,000+ tools.

### Restart After Changes
After adding plugins or MCP servers, restart OpenCode if they don't show up properly:
```bash
# Stop current session and start fresh
opencode
```

---

## Resources

- **OpenCode Docs:** [opencode.ai/docs](https://opencode.ai/docs)
- **OpenCode Plugins Guide:** [How to Add MCP to OpenCode](https://opencode.ai/docs/plugins)
- **Awesome OpenCode:** Curated list of plugins, themes, agents, and resources
- **Composio Blog Source:** [Best OpenCode Plugins](https://composio.dev/content/best-opencode-plugins)
