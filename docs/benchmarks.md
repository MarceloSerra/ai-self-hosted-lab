# Benchmark Methodology

## Overview

Every model added to this project is evaluated using the same standardized benchmark suite. This ensures apples-to-apples comparison across models of different sizes, architectures, and quantizations.

## Metrics

### Performance

| Metric | Description | Target |
|---------|-------------|--------|
| **TTFT** (Time to First Token) | Latency from request to first output byte | < 500ms |
| **TPS** (Tokens Per Second) | Sustained generation throughput | > 20 tok/s |
| **Avg Response Time** | Total time for complete response | Varies by task |

### Resource Usage

| Metric | Description | How Measured |
|---------|-------------|--------------|
| **VRAM Peak** | Maximum GPU memory consumed during inference | `rocm-smi` / LM Studio stats |
| **RAM Usage** | System memory used by the process | OS monitoring tools |
| **CPU Load** | CPU utilization during inference | `top` / Activity Monitor |

### Quality (Subjective)

| Score | Meaning |
|-------|---------|
| 5/5 | Excellent — production-ready quality |
| 4/5 | Very good — minor issues only |
| 3/5 | Good — usable with some limitations |
| 2/5 | Fair — significant gaps in output quality |
| 1/5 | Poor — not suitable for practical use |

## Benchmark Tasks

Each model runs through these standardized tasks:

### Task 1: Simple Greeting (Baseline)

**Prompt:** `"Hello, introduce yourself in one sentence."`

Measures TTFT and basic coherence. Expected output: ~20 tokens.

### Task 2: Code Generation

**Prompt:** `"Write a Python function that calculates the Fibonacci sequence up to n terms using memoization."`

Evaluates code correctness, formatting, and reasoning. Expected output: ~150-300 tokens.

### Task 3: Creative Writing

**Prompt:** `"Write a short haiku about artificial intelligence running on consumer hardware."`

Tests creativity, instruction following, and stylistic control. Expected output: ~12 tokens.

### Task 4: Long Context (Window Test)

**Prompt:** A ~2000-token passage followed by `"Summarize the key points in bullet form."`

Measures how well the model handles long contexts and retrieves relevant information. Tests context window limits.

### Task 5: Multi-Turn Conversation

Three sequential turns testing memory and coherence:
1. `"My name is Alex and I'm a software engineer based in São Paulo."`
2. `"What do you remember about me?"`
3. `"I just moved to Lisbon. Update that and tell me what you know now."`

Evaluates conversation state management over multiple turns.

### Task 6: Instruction Following (Strict)

**Prompt:** `"List exactly three benefits of open source software. Use numbered format. Do not add any introduction or conclusion text."`

Tests precision in following constraints — a critical capability for agentic workflows.

## Measurement Procedure

```bash
# For each task, run:
curl -s -w "\n%{time_start} %{time_total} %{size_download}" \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"<prompt>"}]}' \
  http://localhost:1234/v1/chat/completions

# Record:
# - time_start → TTFT proxy (time to first byte)
# - time_total → total response time
# - Token count from response metadata (if available)
```

For streaming endpoints, measure TTFT as time until the first SSE chunk arrives.

## Result Template

When adding a new model, create `models/<model-name>/benchmarks.md` using this template:

````markdown
# Benchmarks: <Model Name>

| Model | Quantization | Date Tested | Host GPU |
|-------|-------------|-------------|----------|
| <name> | Q4_K_M | YYYY-MM-DD | RX 9070 XT (16GB) |

## Performance Results

| Task | TTFT (ms) | TPS | Total Time (s) | Tokens Generated | Quality (/5) | Notes |
|------|-----------|-----|-----------------|-------------------|-------------|-------|
| Greeting | | | | | | |
| Code Gen | | | | | | |
| Creative | | | | | | |
| Long Context | | | | | | |
| Multi-Turn | | | | | | |
| Strict Format | | | | | | |

## Resource Usage

- VRAM Peak: ___ MB
- RAM Usage: ___ MB
- CPU Load: ___% avg during inference

## Observations

- [Empirical findings go here]
````

## Environment Variables

All benchmarks run under consistent conditions:

| Variable | Value |
|----------|-------|
| LM Studio Port | 1234 |
| Context Length | Model default (typically 8K or 32K) |
| Temperature | 0.7 |
| Top-P | 0.9 |
| GPU Backend | Vulkan (AMD) / Metal (Apple Silicon) |
| Network | Local LAN (<1ms latency client↔host) |

## Tools Used for Measurement

- `curl` with timing flags (`-w`) — HTTP-level metrics
- `hyperfine` — statistical benchmarking with multiple runs
- LM Studio server stats panel — VRAM, token counts
- `rocm-smi` / `nvidia-smi` — GPU utilization monitoring
- Node.js `performance.now()` — application-level timing
