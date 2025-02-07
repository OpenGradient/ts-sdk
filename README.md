# OpenGradient TypeScript SDK

A TypeScript/JavaScript SDK for performing on-chain inference using the OpenGradient network. Run machine learning models and LLMs directly on the blockchain with robust transaction handling and retry mechanisms.

## Installation

```bash
npm install opengradient-sdk
```

## Quick Start

```typescript
import { Client, LLMInferenceMode } from 'opengradient-sdk';

// Initialize the client
const client = new Client({
  privateKey: 'your-private-key'
});

// Run LLM chat inference
const [txHash, finishReason, response] = await client.llmChat(
  'model-cid',
  LLMInferenceMode.VANILLA,
  [{ role: 'user', content: 'Hello!' }],
  100 // max tokens
);

// Run general model inference
const [txHash, output] = await client.infer(
  'model-cid',
  InferenceMode.VANILLA,
  inputData
);
```

## Features

- On-chain ML model inference
- LLM completion and chat interfaces
- Support for vanilla and TEE (Trusted Execution Environment) inference modes
- Automatic transaction retry with configurable parameters
- Built-in gas estimation and management
- Tool calling support for LLM chat

## Contributing

We welcome contributions! Please check our contribution guidelines for more details.
