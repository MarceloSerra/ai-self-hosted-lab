const express = require('express');
const http = require('http');
const app = express();
app.use(express.json());

// LM Studio API configuration
const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';
const PORT = 3001;

/**
 * Chat endpoint - proxies to LM Studio with timing metrics
 */
app.post('/api/chat', async (req, res) => {
  const startTime = Date.now();
  
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call LM Studio API
    const response = await fetch(LM_STUDIO_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'auto',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
        max_tokens: 1024
      })
    });

    const data = await response.json();
    const ttft = Date.now() - startTime;

    res.json({
      response: data.choices?.[0]?.message?.content || 'No response',
      metrics: {
        ttft_ms: ttft,
        tokens_generated: data.usage?.completion_tokens || 0,
        model_used: data.model || 'unknown'
      }
    });

  } catch (error) {
    console.error('LM Studio API error:', error.message);
    res.status(503).json({ 
      error: 'LM Studio server unavailable',
      hint: 'Make sure LM Studio is running on port 1234'
    });
  }
});

/**
 * Simple greeting endpoint (baseline test)
 */
app.get('/api/greet', (req, res) => {
  res.json({ message: 'Hello Self-Hosted AI - Qwen3.6 27B' });
});

/**
 * Benchmark results endpoint
 */
app.get('/api/benchmarks', async (req, res) => {
  const tasks = [
    { name: 'greeting', prompt: 'Say hello in one sentence.' },
    { name: 'code', prompt: 'Write a Python function to calculate fibonacci up to n terms.' }
  ];

  const results = [];

  for (const task of tasks) {
    const start = Date.now();
    
    try {
      const response = await fetch(LM_STUDIO_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'auto',
          messages: [{ role: 'user', content: task.prompt }],
          temperature: 0.7,
          max_tokens: 512
        })
      });

      const data = await response.json();
      const ttft = Date.now() - start;

      results.push({
        task: task.name,
        ttft_ms: ttft,
        tokens: data.usage?.completion_tokens || 0,
        success: true
      });
    } catch (error) {
      results.push({
        task: task.name,
        error: error.message,
        success: false
      });
    }
  }

  res.json({ benchmarks: results });
});

// Start server
app.listen(PORT, () => {
  console.log(`Qwen3.6 27B Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  POST /api/chat       - Chat with LM Studio model');
  console.log('  GET  /api/greet      - Simple greeting test');
  console.log('  GET  /api/benchmarks - Run quick benchmark suite');
});

module.exports = app;
