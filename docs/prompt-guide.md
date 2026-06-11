# Prompt Guide: Creating a New Model Test App

Use this template when asking an AI model (via opencode or any agent) to create its own Node.js test app for the Self-Hosted AI Hello World project.

---

## Copy-Paste Template

```
Create a new Node.js Express app for testing the [MODEL_NAME] model in our "Self-hosted AI Hello World" benchmarking project.

Project context:
- Root: /Users/marceloserra/Documents/coding/projects/ai-self-hosted-hw
- Each model gets its own folder under models/<model-name>/
- We use LM Studio's local server at http://localhost:1234/v1/chat/completions (OpenAI-compatible API)
- Goal: simple app to test the model, measure performance, and document findings

Requirements for the new app in models/[MODEL_NAME]/:

1. Create package.json with express and node-fetch dependencies
2. Create server.js that:
   - Has a POST /api/chat endpoint accepting {"prompt": "text"}
   - Calls LM Studio API at http://localhost:1234/v1/chat/completions
   - Measures response time (TTFT, total tokens, TPS)
   - Returns JSON with model response + benchmark metrics
   - Has a GET /api/benchmarks endpoint returning collected results
   - Logs all requests to console for debugging

3. Create README.md in the model folder documenting:
   - Model name and quantization used
   - Date tested
   - Key findings from benchmarks
   - Any quirks or issues observed

4. Follow the existing pattern from models/ministral-3-3b/ as reference

Hardware context:
- Host GPU: AMD Radeon RX 9070 XT (16GB VRAM, RDNA 4)
- Client: MacBook Air M3
- Network: Local LAN

Reference docs:
- Benchmark methodology: docs/benchmarks.md
- Agentic workflows: docs/agentic-workflows.md
- Tool setup: docs/tools.md
```

---

## Quick Version (for experienced agents)

```
Create a Node.js Express app in models/[MODEL_NAME]/ that tests the [MODEL_NAME] model via LM Studio at http://localhost:1234/v1/chat/completions. Follow the pattern from models/ministral-3-3b/. Include benchmark timing, chat endpoint, and README with findings. See docs/benchmarks.md for methodology.
```

---

## What to Check After Creation

After the agent creates the app:

1. **Verify structure:** `ls models/[MODEL_NAME]/` should show `server.js`, `package.json`, `README.md`
2. **Install deps:** `cd models/[MODEL_NAME] && npm install`
3. **Test endpoint:** `curl http://localhost:3000/api/chat -H "Content-Type: application/json" -d '{"prompt":"Hello"}'`
4. **Check benchmarks:** Results should appear in the model's README and console logs

---

## Tips for Different Agent Types

### For opencode (local LM Studio)

opencode can directly create files, run commands, and test endpoints. Ask it to:
- Create the folder structure
- Write all files
- Run `npm install`
- Start the server and test a request
- Report back with results

### For Claude / ChatGPT (remote models)

These can't execute code directly but can generate excellent file contents. Ask them to:
- Output complete file contents for each file
- You'll copy-paste into the project structure manually

### For Cursor / Copilot (IDE agents)

These have file system access and can create files in context. Provide the same prompt and let them scaffold the app directly.

---

## Model-Specific Notes to Include

When creating a new model test, always note:

| Field | Example |
|-------|---------|
| Model Name | Ministral 3B |
| Quantization | Q4_K_M |
| Date Tested | 2025-06-10 |
| LM Studio Version | 0.4.x |
| Context Length | 8K tokens |

This ensures consistent documentation across all model tests in the project.
