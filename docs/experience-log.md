# Experience Log

A living record of findings, surprises, and lessons learned while building this project.

## Format

Each entry follows: **Date** | **Topic** | **Finding** | **Impact**

---

## 2025-06-10 | Project Setup | Initial architecture defined | Foundation for all future work

Started with a simple Express app calling LM Studio's OpenAI-compatible API. The core insight: each model should get its own isolated Node.js app folder under `models/`, making comparison and iteration straightforward.

**Lesson:** Keep the app template minimal. The value is in benchmarking, not fancy frameworks.

## 2025-06-10 | Hardware Research | RX 9070 XT confirmed as viable LLM accelerator | Informed model selection strategy

Verified specs via TechPowerUp: 16GB GDDR6 VRAM, RDNA 4 architecture with Matrix Cores for AI acceleration. The 128 Matrix Cores and 64MB Infinity Cache are particularly relevant for local inference workloads.

**Lesson:** AMD GPUs can run LLMs effectively via llama.cpp Vulkan backend. NVIDIA CUDA has an ecosystem advantage, but AMD's value proposition ($599 for 16GB) is hard to beat for hobbyists.

## 2025-06-10 | LM Studio Discovery | Headless `llmster` server exists | Enables unattended benchmarking runs

Found that LM Studio offers a headless deployment mode (`llmster`) — the core inference engine without GUI overhead. Installable via one-liner:
```bash
curl -fsSL https://lmstudio.ai/install.sh | bash
```

**Lesson:** For automated benchmark pipelines, use `llmster` instead of the full LM Studio app to reduce resource overhead.

## 2025-06-10 | opencode Integration | Agent can create model apps autonomously | Accelerates experimentation cycle

opencode connects to local LM Studio via OpenAI-compatible provider config. This means we can ask any model to generate its own test app, creating a meta-loop: models building tools that test other models.

**Lesson:** The agentic workflow of "model creates app → app benchmarks model" is both practical and philosophically interesting. Worth documenting as a pattern.

---

## Pending Investigations

- [ ] How does Vulkan backend performance compare to CUDA on equivalent hardware?
- [ ] What's the smallest useful model for code generation tasks? (1B vs 3B vs 7B)
- [ ] Does quantization level (Q4 vs Q8) meaningfully impact agentic workflow quality?
- [ ] Can we run two models simultaneously on 16GB VRAM for A/B testing?
- [ ] How does context window size affect multi-turn conversation coherence?

## Model-Specific Findings

### Ministral 3B (3.3B parameters)

*To be filled after first benchmark run.*

---

**Add new entries as you discover things. This document should grow with the project.**
