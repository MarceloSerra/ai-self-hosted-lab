# Agentic Workflows

## What Are Agentic Workflows?

An agentic workflow is a multi-step process where an LLM acts autonomously: reasoning, planning, using tools, and iterating until a goal is achieved. Unlike simple chat (one prompt → one response), agents loop through cycles of thought and action.

We test each model on these workflows to evaluate its suitability for real-world autonomous tasks.

## Workflow 1: Code Generation + Self-Correction

**Pattern:** Generate code → detect errors → fix iteratively

```
User: "Write a Node.js Express endpoint that returns JSON with the current time."
Model: [generates code]
Agent: [runs code, captures error output]
User: "The code failed with this error: <error>. Fix it."
Model: [provides corrected code]
Agent: [runs again until success or max retries]
```

**What we measure:**
- Does the model produce working code on first try?
- Can it understand and fix its own errors?
- How many iterations to reach a working solution?
- Does it explain what changed and why?

## Workflow 2: Research Pipeline

**Pattern:** Search → Read → Synthesize → Summarize

```
User: "Research the top 3 local LLM frameworks for AMD GPUs in 2025."
Agent Step 1: [generates search queries]
Agent Step 2: [reads retrieved content — simulated via provided text]
Agent Step 3: [synthesizes findings across sources]
Model: [produces structured summary with citations]
```

**What we measure:**
- Quality of research planning (good query formulation)
- Ability to extract key information from long texts
- Synthesis quality — connecting dots between sources
- Citation accuracy and formatting

## Workflow 3: Tool Use

**Pattern:** Recognize need for tool → select correct tool → format call → interpret result

```
User: "What's the weather in São Paulo right now?"
Model: [recognizes it needs a weather API]
Model: [outputs tool call: {"tool":"weather","args":{"city":"São Paulo"}}]
Agent: [executes tool, returns result]
Model: [interprets result and answers naturally]
```

**What we measure:**
- Does the model know when to use tools vs. answer directly?
- Correct tool selection from available options
- Proper argument formatting (JSON schema compliance)
- Natural interpretation of tool output in final response

## Workflow 4: Multi-Turn Task with Memory

**Pattern:** Maintain context across many turns while executing a complex task

```
Turn 1: "I want to build a REST API for a todo app. Let's start planning."
Model: [proposes architecture, tech stack]
Turn 2: "Good. Now let's define the database schema."
Model: [designs schema referencing earlier decisions]
Turn 3: "Great. Write the user model first."
Model: [writes code consistent with agreed schema]
Turn 4: "Now add authentication middleware."
Model: [integrates auth, references existing models]
Turn 5: "Summarize everything we've built so far."
Model: [accurate summary of all prior work]
```

**What we measure:**
- Context retention over many turns
- Consistency — does the model contradict earlier decisions?
- Coherent progression through complex tasks
- Summary accuracy after extended conversation

## Workflow 5: Planning + Execution

**Pattern:** Break down a goal into steps → execute sequentially

```
User: "Create a simple web scraper that extracts headlines from a news site."
Model: [produces step-by-step plan]
Plan:
  1. Set up project with Node.js + dependencies
  2. Write HTTP request function to fetch page HTML
  3. Parse HTML and extract headline elements
  4. Format output as JSON array
  5. Add error handling and rate limiting

Agent: [executes each step, feeding results back]
Model: [adapts next step based on actual outcomes]
```

**What we measure:**
- Quality of decomposition (logical, complete steps)
- Adaptability when execution reveals unexpected issues
- Ability to revise plan mid-execution
- Final output completeness and correctness

## Workflow 6: Critique + Refinement

**Pattern:** Generate → Self-critique → Improve

```
User: "Write a product description for a smart home device."
Model: [draft v1]
Agent: [triggers self-critique mode]
Model: ["Here are issues with my draft: too generic, no specs, weak CTA."]
Model: [revised v2 addressing all identified issues]
```

**What we measure:**
- Self-awareness — can the model identify its own weaknesses?
- Specificity of critique (vague vs. actionable feedback)
- Improvement quality between versions
- Does refinement actually address the stated problems?

## Scoring Framework

Each workflow is scored on a 1-5 scale:

| Score | Meaning |
|-------|---------|
| 5 | Flawless execution — production-ready agent behavior |
| 4 | Strong performance — minor issues, easily fixable |
| 3 | Functional — works but needs human oversight |
| 2 | Partial success — frequent failures or inconsistencies |
| 1 | Not viable for agentic use cases |

## Implementation in Node.js Apps

Each model's `server.js` should expose these endpoints:

```
POST /api/chat              # Simple chat (baseline)
POST /api/code-gen          # Code generation task
POST /api/research          # Research pipeline simulation
POST /api/tool-use          # Tool calling test
POST /api/multi-turn        # Multi-turn conversation
POST /api/plan-execute      # Planning + execution workflow
POST /api/critique-refine   # Self-critique loop
GET  /api/benchmarks        # Retrieve benchmark results
```

## Notes on AMD GPU Considerations

- llama.cpp Vulkan backend works with AMD GPUs but may have different performance characteristics vs. CUDA
- Some models optimized for NVIDIA (e.g., certain tensor parallelism features) may not translate directly
- Test each model's actual throughput — don't assume based on parameter count alone
- Quantization choice matters more on VRAM-constrained setups like ours
