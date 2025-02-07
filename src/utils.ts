import { ModelInput, ModelOutput } from './types';

export function convertToModelInput(input: ModelInput): any {
  // Implementation for converting model input to contract format
  return input;
}

export function convertToModelOutput(output: any): ModelOutput {
  // Implementation for converting contract output to model output format
  return output;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}
