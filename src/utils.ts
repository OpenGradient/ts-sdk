import { RawModelInput } from "./types";

export function convertToModelInput(input: RawModelInput): any {
  const numbers = [];
  const strings = [];

  for (const [key, value] of Object.entries(input)) {
    if (typeof value === "string") {
      strings.push({
        name: key,
        values: [value],
      });
    } else if (Array.isArray(value) && typeof value[0] === "string") {
      strings.push({
        name: key,
        values: value as string[],
      });
    } else if (typeof value === "number") {
      // Handle single number
      numbers.push({
        name: key,
        values: [{ value: value, decimals: 0 }],
        shape: [1],
      });
    } else if (Array.isArray(value)) {
      if (value.length === 0) continue;

      if (typeof value[0] === "number") {
        // Handle 1D number array
        numbers.push({
          name: key,
          values: value.map((n) => ({ value: n, decimals: 0 })),
          shape: [value.length],
        });
      } else if (Array.isArray(value[0])) {
        // Handle 2D number array
        const rows = value.length;
        const cols = (value[0] as number[]).length;
        const flatValues = [];

        for (const row of value) {
          for (const col of row as number[]) {
            flatValues.push({ value: col, decimals: 0 });
          }
        }

        numbers.push({
          name: key,
          values: flatValues,
          shape: [rows, cols],
        });
      }
    }
  }

  return {
    numbers,
    strings,
  };
}

export function convertToModelOutput(rawOutput: any): RawModelInput {
  const result: RawModelInput = {};
  
  // Get the actual output array from the event data
  const output = rawOutput[0] || rawOutput.output;
  
  // Handle number tensors (first element of output array)
  const numberTensors = output[0];
  for (const tensor of numberTensors) {
    const name = tensor[0];
    const values = tensor[1].map((v: string[]) => Number(v[0]));  // Each value is [value, decimals]
    const shape = tensor[2].map(Number);
    
    if (shape.length === 1) {
      result[name] = values;
    } else if (shape.length === 2) {
      const rows = shape[0];
      const cols = shape[1];
      const matrix: number[][] = [];
      for (let i = 0; i < rows; i++) {
        const row: number[] = [];
        for (let j = 0; j < cols; j++) {
          row.push(values[i * cols + j]);
        }
        matrix.push(row);
      }
      result[name] = matrix;
    }
  }

  // Handle string tensors (second element of output array)
  const stringTensors = output[1];
  for (const tensor of stringTensors) {
    const name = tensor[0];
    const values = tensor[1];
    
    if (values.length === 1) {
      result[name] = values[0];
    } else {
      result[name] = values;
    }
  }

  return result;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
