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

## Server Configuration

- **Port:** 3001 (avoids conflict with Ministral's port 3000)
- **LM Studio:** `http://localhost:1234/v1/chat/completions`
- **Expected TTFT:** Higher than smaller models due to parameter count

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
