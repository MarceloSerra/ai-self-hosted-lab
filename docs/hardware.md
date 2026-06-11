# Hardware Specifications

## Host Machine (Inference Server)

### CPU: Intel Core i9-13900K

| Spec | Value |
|------|-------|
| Cores | 32 (8 Performance + 16 Efficiency) |
| Threads | 32 |
| Base Clock | 3.0 GHz |
| Boost Clock | Up to 5.6 GHz |
| Cache | 36 MB Intel Smart Cache |
| TDP | 250W (PL2) |

### GPU: AMD Radeon RX 9070 XT

Our primary inference accelerator for local LLM workloads.

| Spec | Value |
|------|-------|
| Architecture | RDNA 4.0 |
| GPU Name | Navi 48 (Navi 48 XTX variant) |
| Process | TSMC 4nm (N4P FinFET) |
| Transistors | 53.9 billion |
| Die Size | 357 mm² |
| Shading Units | 4096 |
| Compute Units | 64 |
| TMUs | 256 |
| ROPs | 128 |
| Matrix Cores (AI) | 128 (3rd Gen) |
| RT Cores | 64 (3rd Gen) |
| L2 Cache | 8 MB |
| L3 Cache (Infinity Cache) | 64 MB |

#### VRAM — Critical for LLMs

| Spec | Value |
|------|-------|
| Memory Size | **16 GB** |
| Memory Type | GDDR6 |
| Bus Width | 256-bit |
| Memory Clock | 2518 MHz (20.1 Gbps effective) |
| Bandwidth | **644.6 GB/s** |

#### Clock Speeds

| Spec | Value |
|------|-------|
| Base Clock | 1660 MHz |
| Game Clock | 2400 MHz |
| Boost Clock | 2970 MHz |

#### Power & Interface

| Spec | Value |
|------|-------|
| TDP | 304W |
| Suggested PSU | 700W |
| Power Connectors | 2x 8-pin |
| Bus Interface | PCIe 5.0 x16 |
| Slot Width | Dual-slot |

#### Launch Info

| Spec | Value |
|------|-------|
| Released | March 6, 2025 |
| Launch Price | $599 USD |

Source: [TechPowerUp GPU Database — Radeon RX 9070 XT](https://www.techpowerup.com/gpu-specs/radeon-rx-9070-xt.c4229)

## LLM Capacity Analysis (16GB VRAM)

With 16GB of VRAM, here's the approximate model size we can run:

| Quantization | Approx. Max Parameters | Example Models |
|--------------|------------------------|----------------|
| Q8_0 (8-bit) | ~2B | TinyLlama-1.1B, Ministral-3B (tight) |
| Q4_K_M (4-bit) | ~4-5B | Llama-3.2-3B, Qwen2.5-3B |
| Q4_K_M (4-bit) | ~8-9B | Llama-3.1-8B, Mistral-7B, Qwen2.5-7B |
| Q3_K_M (3-bit) | ~10-12B | Llama-3.1-8B (comfortable), Phi-3-mini-3.8B |
| Q2_K (2-bit) | ~14-16B | Llama-3.1-8B, Mixtral-8x7B (single expert) |

**Notes:**
- These estimates assume the model fits entirely in VRAM. Host RAM can overflow but at much lower speed.
- RDNA 4's Matrix Cores accelerate FP16/BF16 compute — beneficial for frameworks that leverage them (e.g., llama.cpp with Vulkan, ROCm).
- AMD GPU support in llama.cpp uses the Vulkan backend. Performance is good but typically trails NVIDIA CUDA by 20-40% on equivalent hardware.

## Client Machine: MacBook Air M3

| Spec | Value |
|------|-------|
| CPU | Apple M3 (8-core: 4P + 4E) |
| GPU | Apple M3 (10-core) |
| RAM | 16GB unified memory |
| Architecture | ARM64 (Apple Silicon) |
| OS | macOS Sonoma |

Used for development, testing, and running opencode. Not used for heavy inference — that's the host machine's job.

## Network

Client ↔ Host communication over local network (LAN). LM Studio serves on `0.0.0.0:1234` to accept connections from the MacBook.
