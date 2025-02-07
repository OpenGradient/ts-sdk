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

export function convertToModelOutput(output: any): RawModelInput {
  return output;
}

export async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
