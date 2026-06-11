# Qwen3.6 27B

## Model Details

| Field | Value |
|-------|-------|
| Model Name | Qwen3.6 27B |
| Parameters | 27 Billion |
| Quantization | Q4_K_M (recommended for 16GB VRAM) |
| Context Length | 131K tokens |
| Date Added | 2025-06-11 |

## Hardware Requirements

This model is significantly larger than Ministral 3B. With the RX 9070 XT's 16GB VRAM:

- **Q4_K_M quantization** (~15GB) — fits, minimal headroom
- **Q8_0 quantization** (~27GB) — will not fit in VRAM alone
- Full precision (~54GB) — impossible on this hardware

**Recommendation:** Use Q4_K_M GGUF format for best balance of quality vs. VRAM usage.

## LM Studio Server Parameters

These are the exact server settings used for this model. Documenting these ensures reproducible benchmarks across sessions.

| Parameter | Value | Notes |
|-----------|-------|-------|
| Context Length | 32760 (of 262144 max) | Reduced from native to fit VRAM; 32K is plenty for coding tasks |
| GPU Offload Layers | 64 | Max layers that fit in 16GB VRAM with Q4_K_M quantization |
| CPU Thread Pool Size | 16 | Matches host CPU cores for offloaded layers |
| Evaluation Batch Size | 512 | Prompts processed per batch during prefill |
| Physical Batch Size | 512 | Tokens processed per batch during generation |
| Max Concurrent Predictions | 4 | Simultaneous requests the server handles |
| Unified KV Cache | Off | Separate K/V caches for better quantization control |
| RoPE Frequency Base | Auto | Model default (typically 1e6 for Qwen) |
| RoPE Frequency Scale | Auto | Model default; auto-scales for extended context |
| Offload KV Cache to GPU Memory | On | Keeps attention cache in VRAM for faster generation |
| Keep Model in Memory | Off | Frees VRAM when server is idle; reloads on next request |
| Try mmap() | On | Memory-maps model file for faster loading, less RAM pressure |
| Seed | Random (off) | No fixed seed — results vary between runs |
| Flash Attention | On | Required for performance with large context windows |
| K Cache Quantization Type | Q8_0 | 8-bit quantized K cache saves ~50% VRAM vs. f32 |
| V Cache Quantization Type | Q8_0 | 8-bit quantized V cache — minimal quality loss, huge VRAM savings |

See `docs/lm-studio-server-config.md` for parameter explanations and tuning guide.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat` | Chat with model, returns response + metrics |
| GET | `/api/greet` | Baseline health check |
| GET | `/api/benchmarks` | Quick 2-task benchmark suite |

## Running the App

```bash
cd models/qwen3-6-27b
npm install
node server.js
```

Ensure LM Studio has Qwen3.6 27B (Q4_K_M) loaded before starting.

## Benchmark Results

*Pending — benchmarks will be run and documented here.*

Expected characteristics vs. Ministral 3B:
- Higher TTFT (more parameters to process)
- Lower TPS (larger model = slower generation)
- Better quality on complex tasks (reasoning, code, long context)

## Notes

- This model was added as part of the self-hosted AI benchmarking project
- Created by Qwen3.6 27B itself (meta: the model documenting its own test app)
- See `docs/experience-log.md` for setup findings
