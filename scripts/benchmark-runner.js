#!/usr/bin/env node
/**
 * Automated Benchmark Runner
 * 
 * Runs standardized benchmark tasks against LM Studio and outputs results as JSON.
 * Usage: node scripts/benchmark-runner.js [--model <model-name>] [--output <file.json>]
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

// Configuration
const LM_STUDIO_URL = 'http://localhost:1234/v1/chat/completions';
const DEFAULT_OUTPUT = './benchmark-results.json';

// Benchmark tasks defined in docs/benchmarks.md
const BENCHMARK_TASKS = [
  {
    name: 'greeting',
    description: 'Simple greeting (baseline)',
    prompt: 'Hello, introduce yourself in one sentence.',
    expectedTokens: '~20'
  },
  {
    name: 'code_generation', 
    description: 'Code generation task',
    prompt: 'Write a Python function that calculates the Fibonacci sequence up to n terms using memoization.',
    expectedTokens: '~150-300'
  },
  {
    name: 'creative_writing',
    description: 'Creative writing test',
    prompt: 'Write a short haiku about artificial intelligence running on consumer hardware.',
    expectedTokens: '~12'
  },
  {
    name: 'instruction_following',
    description: 'Strict instruction following',
    prompt: 'List exactly three benefits of open source software. Use numbered format. Do not add any introduction or conclusion text.',
    expectedTokens: '~50-80'
  }
];

/**
 * Make HTTP request to LM Studio API
 */
async function callLMStudio(prompt, maxTokens = 1024) {
  const startTime = Date.now();
  
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      model: 'auto',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: maxTokens
    });

    const options = {
      hostname: 'localhost',
      port: 1234,
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      
      res.on('data', (chunk) => {
        if (!responseData.includes('{')) {
          // First byte received - this is TTFT
          resolve({ ttft: Date.now() - startTime });
        }
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({
            response: parsed.choices?.[0]?.message?.content || '',
            tokens: parsed.usage?.completion_tokens || 0,
            model: parsed.model || 'unknown'
          });
        } catch (e) {
          reject(new Error('Failed to parse LM Studio response'));
        }
      });
    });

    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

/**
 * Run a single benchmark task
 */
async function runBenchmarkTask(task) {
  console.log(`\n📊 Running: ${task.name}`);
  console.log(`   "${task.prompt.substring(0, 60)}..."`);
  
  try {
    const result = await callLMStudio(task.prompt);
    
    return {
      task: task.name,
      description: task.description,
      ttft_ms: result.ttft,
      tokens_generated: result.tokens || 0,
      response_preview: result.response?.substring(0, 100) + '...',
      success: true,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    return {
      task: task.name,
      description: task.description,
      error: error.message,
      success: false,
      timestamp: new Date().toISOString()
    };
  }
}

/**
 * Main benchmark runner
 */
async function runBenchmarks(args = []) {
  const modelName = args.model || 'unknown';
  const outputFile = args.output || DEFAULT_OUTPUT;
  
  console.log('🚀 Starting Self-Hosted AI Benchmark Runner');
  console.log(`   Model: ${modelName}`);
  console.log(`   Output: ${outputFile}\n`);

  // Check if LM Studio is running
  try {
    await fetch('http://localhost:1234/v1/models').catch(() => {});
  } catch (e) {
    console.error('❌ Error: LM Studio server not available at localhost:1234');
    process.exit(1);
  }

  const results = [];
  
  for (const task of BENCHMARK_TASKS) {
    const result = await runBenchmarkTask(task);
    results.push(result);
    
    // Small delay between tasks to avoid overwhelming the GPU
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Compile final report
  const report = {
    model: modelName,
    date: new Date().toISOString(),
    hardware: 'AMD RX 9070 XT (16GB VRAM)',
    lm_studio_url: LM_STUDIO_URL,
    tasks_run: results.length,
    successful_tasks: results.filter(r => r.success).length,
    failed_tasks: results.filter(r => !r.success).length,
    average_ttft_ms: Math.round(results.reduce((acc, r) => acc + (r.ttft_ms || 0), 0) / results.length),
    total_tokens_generated: results.reduce((acc, r) => acc + (r.tokens_generated || 0), 0),
    results: results
  };

  // Write output file
  const outputPath = path.join(__dirname, '..', outputFile);
  fs.writeFileSync(outputPath, JSON.stringify(report, null, 2));
  
  console.log('\n✅ Benchmark complete!');
  console.log(`   Results saved to: ${outputPath}`);
  console.log(`   Average TTFT: ${report.average_ttft_ms}ms`);
  console.log(`   Total tokens generated: ${report.total_tokens_generated}`);
  
  return report;
}

// Parse command line arguments
const args = {};
for (let i = 2; i < process.argv.length; i += 2) {
  if (process.argv[i].startsWith('--')) {
    const key = process.argv[i].substring(2);
    args[key] = process.argv[i + 1];
  }
}

// Run benchmarks
runBenchmarks(args).catch(console.error);
