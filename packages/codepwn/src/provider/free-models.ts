import type { ModelsDev } from "./models"

export const FreeModelsProvider: ModelsDev.Provider = {
  name: "Free Models",
  id: "free-models",
  api: "https://opencode.ai/zen/v1",
  npm: "@ai-sdk/openai-compatible",
  env: [],
  models: {
    "big-pickle": {
      id: "big-pickle",
      name: "Big Pickle",
      family: "big-pickle",
      release_date: "2025-10-17",
      attachment: false,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: {
        input: 0,
        output: 0,
        cache_read: 0,
        cache_write: 0,
      },
      limit: {
        context: 200000,
        output: 128000,
      },
      modalities: {
        input: ["text"],
        output: ["text"],
      },
      options: {
        apiKey: "public",
      },
      provider: {
        npm: "@ai-sdk/openai-compatible",
      },
    },
    "glm-4.7-free": {
      id: "glm-4.7-free",
      name: "GLM-4.7",
      family: "glm-free",
      release_date: "2025-12-22",
      attachment: false,
      reasoning: true,
      temperature: true,
      tool_call: true,
      interleaved: { field: "reasoning_content" },
      cost: {
        input: 0,
        output: 0,
        cache_read: 0,
      },
      limit: {
        context: 204800,
        output: 131072,
      },
      modalities: {
        input: ["text"],
        output: ["text"],
      },
      options: {
        apiKey: "public",
      },
      provider: {
        npm: "@ai-sdk/openai-compatible",
      },
    },
    "kimi-k2.5-free": {
      id: "kimi-k2.5-free",
      name: "Kimi K2.5",
      family: "kimi",
      release_date: "2025-01-01",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: {
        input: 0,
        output: 0,
        cache_read: 0,
        cache_write: 0,
      },
      limit: {
        context: 256000,
        output: 8192,
      },
      modalities: {
        input: ["text", "image"],
        output: ["text"],
      },
      options: {
        apiKey: "public",
      },
      provider: {
        npm: "@ai-sdk/openai-compatible",
      },
    },
    "minimax-m2.1-free": {
      id: "minimax-m2.1-free",
      name: "MiniMax M2.1",
      family: "minimax-free",
      release_date: "2025-12-23",
      attachment: false,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: {
        input: 0,
        output: 0,
        cache_read: 0,
      },
      limit: {
        context: 204800,
        output: 131072,
      },
      modalities: {
        input: ["text"],
        output: ["text"],
      },
      options: {
        apiKey: "public",
      },
      provider: {
        npm: "@ai-sdk/openai-compatible",
      },
    },
    "trinity-large-preview-free": {
      id: "trinity-large-preview-free",
      name: "Trinity Large Preview",
      family: "trinity",
      release_date: "2025-01-01",
      attachment: true,
      reasoning: true,
      temperature: true,
      tool_call: true,
      cost: {
        input: 0,
        output: 0,
      },
      limit: {
        context: 200000,
        output: 8192,
      },
      modalities: {
        input: ["text"],
        output: ["text"],
      },
      options: {
        apiKey: "public",
      },
      provider: {
        npm: "@ai-sdk/openai-compatible",
      },
    },
  },
}
