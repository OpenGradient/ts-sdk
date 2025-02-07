import { Client, InferenceMode, LLMInferenceMode } from "../";
import dotenv from "dotenv";

dotenv.config();

const { PRIVATE_KEY } = process.env;

// Ensure environment variables are set
if (!PRIVATE_KEY) {
  throw new Error("Required environment variables are not set");
}

describe("OpenGradient Client Integration Tests", () => {
  let client: Client;

  beforeAll(() => {
    // Initialize client with real blockchain connection
    client = new Client({
      privateKey: PRIVATE_KEY,
    });
  });

  describe("Inference", () => {
    it.skip("should perform inference on the blockchain", async () => {
      // This test might take a while due to blockchain interaction
      jest.setTimeout(30000); // 30 seconds timeout

      const modelInput = {
        input: [1, 2, 3, 4, 5],
      };

      try {
        const [txHash, output] = await client.infer(
          "test-model-cid", // Replace with your actual model CID
          InferenceMode.VANILLA,
          modelInput,
        );

        console.log("Transaction Hash:", txHash);
        console.log("Model Output:", output);

        // Basic validation
        expect(txHash).toBeTruthy();
        expect(output).toBeDefined();
      } catch (error) {
        console.error("Inference failed:", error);
        throw error;
      }
    }, 30000); // Timeout of 30 seconds
  });

  describe("LLM Completion", () => {
    it("should perform LLM completion on the blockchain", async () => {
      jest.setTimeout(30000);

      try {
        const [txHash, response] = await client.llmCompletion(
          "Qwen/Qwen2.5-72B-Instruct",
          LLMInferenceMode.VANILLA,
          "What is the capital of France?",
          100, // maxTokens
          [], // stopSequence
          0, // temperature
        );

        console.log("Transaction Hash:", txHash);
        console.log("LLM Response:", response);

        expect(txHash).toBeTruthy();
        expect(response).toBeTruthy();
      } catch (error) {
        console.error("LLM completion failed:", error);
        throw error;
      }
    }, 30000);
  });

  describe("LLM Chat", () => {
    it("should perform LLM chat on the blockchain", async () => {
      jest.setTimeout(30000);

      const messages = [
        {
          role: "user",
          content: "What is the weather like in Paris?",
        },
      ];

      try {
        const [txHash, finishReason, message] = await client.llmChat(
          "Qwen/Qwen2.5-72B-Instruct",
          LLMInferenceMode.VANILLA,
          messages,
          100, // maxTokens
          [], // stopSequence
          0, // temperature
        );

        console.log("Transaction Hash:", txHash);
        console.log("Finish Reason:", finishReason);
        console.log("Message:", message);

        expect(txHash).toBeTruthy();
        expect(message).toBeDefined();
      } catch (error) {
        console.error("LLM chat failed:", error);
        throw error;
      }
    }, 30000);
  });
});
