export enum InferenceMode {
  VANILLA = 0,
  TEE = 1,
}

export enum LLMInferenceMode {
  VANILLA = InferenceMode.VANILLA,
  TEE = InferenceMode.TEE,
}

export interface ModelInput {
  [key: string]: string | number | number[] | number[][];
}

export interface ModelOutput {
  [key: string]: number[];
}

export interface LLMRequest {
  mode: InferenceMode;
  modelCID: string;
  prompt: string;
  maxTokens: number;
  stopSequence: string[];
  temperature: number;
}

export interface LLMChatMessage {
  role: string;
  content: string;
  toolCalls?: any[];
  toolCallId?: string;
  name?: string;
}

export interface LLMChatRequest extends Omit<LLMRequest, "prompt"> {
  messages: LLMChatMessage[];
  tools?: any[];
  toolChoice?: string;
}

export interface ClientConfig {
  privateKey: string;
  rpcUrl: string;
  contractAddress: string;
}

export class OpenGradientError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "OpenGradientError";
    this.statusCode = statusCode;
  }
}
