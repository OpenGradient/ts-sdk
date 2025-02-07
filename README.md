# OpenGradient TypeScript SDK

A TypeScript/JavaScript SDK for performing on-chain inference using the OpenGradient network. Run machine learning models and LLMs directly on the blockchain with robust transaction handling and retry mechanisms.

## Installation

```bash
npm install opengradient-sdk
```

## Quick Start

```typescript
import { Client, InferenceMode, LLMInferenceMode } from 'opengradient-sdk';

// Initialize the client
const client = new Client({
  privateKey: 'your-private-key'
});

// Run LLM chat inference
const [txHash, finishReason, response] = await client.llmChat(
  'Qwen/Qwen2.5-72B-Instruct',
  LLMInferenceMode.VANILLA,
  [{ role: 'user', content: 'Hello!' }],
  100 // max tokens
);

// Run general model inference
const modelInput = {
  num_input1: [1.0, 2.0, 3.0],
  num_input2: 10,
  str_input1: ["hello", "ONNXY"],
  str_input2: " world"
};

const [txHash, output] = await client.infer(
  "QmbUqS93oc4JTLMHwpVxsE39mhNxy6hpf6Py3r9oANr8aZ",
  InferenceMode.VANILLA,
  modelInput
);
```

## Features

- On-chain ML model inference
- LLM completion and chat interfaces
- Support for vanilla, ZKML and TEE (Trusted Execution Environment) inference modes
- Automatic transaction retry with configurable parameters
- Built-in gas estimation and management
- Tool calling support for LLM chat

## Contributing

We welcome contributions! Please check our contribution guidelines for more details.
