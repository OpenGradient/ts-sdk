export enum InferenceMode {
  VANILLA = 0,
  TEE = 1,
}

export type RawModelInput = {
  [key: string]: string | string[] | number | number[] | number[][];
};

export enum LLMInferenceMode {
  VANILLA = InferenceMode.VANILLA,
  TEE = InferenceMode.TEE,
}

export interface LLMRequest {
  mode: LLMInferenceMode;
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
}

export class OpenGradientError extends Error {
  statusCode?: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    this.name = "OpenGradientError";
    this.statusCode = statusCode;
  }
}
