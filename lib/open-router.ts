import OpenAI from "openai";

let client: OpenAI | null = null;

export function getOpenRouterClient() {
  if (!client) {
    client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
    });
  }
  return client;
}
