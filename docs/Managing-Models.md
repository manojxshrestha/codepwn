# Managing and Replacing Models in codepwn

This guide explains how to identify non-working models, remove them, and replace them with working alternatives.

## Table of Contents

1. [Identifying Non-Working Models](#identifying-non-working-models)
2. [Removing Models](#removing-models)
3. [Adding New Models](#adding-new-models)
4. [Model Configuration Reference](#model-configuration-reference)
5. [Troubleshooting](#troubleshooting)

## Identifying Non-Working Models

### Common Error Messages

When a model isn't working, you'll typically see these errors:

**Error: "Not a valid model ID"**
```
ProviderInitError: Not a valid model ID
```
**Cause:** The model ID doesn't exist on the provider's API

**Error: "No endpoints found"**
```
No endpoints found for model-name
```
**Cause:** The model exists but has no available endpoints (often due to rate limits or server issues)

**Error: "This request requires more credits"**
```
This request requires more credits, or fewer max_tokens. 
You requested up to 32000 tokens, but can only afford 533.
```
**Cause:** The model is no longer free or your quota has been exhausted

**Error: "ProviderInitError"**
```
ProviderInitError: undefined is not an object
```
**Cause:** API endpoint is down or the model configuration is incorrect

### How to Check if a Model is Working

**Method 1: Test via API**
```bash
# For OpenRouter models
curl -H "Authorization: Bearer YOUR_API_KEY" \
     https://openrouter.ai/api/v1/models | grep "model-name"

# For OpenCode Zen models
curl https://opencode.ai/zen/v1/models | grep "model-name"
```

**Method 2: Test in codepwn**
1. Start codepwn: `codepwn`
2. Select the model
3. Send a simple prompt: "Hello"
4. If it responds, the model is working

## Removing Models

### From the Free Models Provider

Edit `/home/pwn/codepwn/packages/codepwn/src/provider/free-models.ts`:

**Example: Remove a non-working model**

```typescript
// BEFORE - with non-working model
models: {
  "broken-model": {
    id: "broken-model",
    name: "Broken Model",
    // ... config
  },
  "working-model": {
    id: "working-model", 
    name: "Working Model",
    // ... config
  }
}

// AFTER - removed broken model
models: {
  "working-model": {
    id: "working-model",
    name: "Working Model", 
    // ... config
  }
}
```

### From Custom Configuration

Edit your `codepwn.jsonc` file:

```jsonc
{
  "provider": {
    "openrouter": {
      "models": {
        // Remove this entire block
        // "broken-model": {
        //   "id": "broken-model",
        //   "name": "Broken Model"
        // },
        
        // Keep only working models
        "working-model": {
          "id": "working-model",
          "name": "Working Model"
        }
      }
    }
  }
}
```

## Adding New Models

### Finding Working Free Models

**OpenRouter Free Models:**
```bash
# List all free models
curl -s https://openrouter.ai/api/v1/models | \
  python3 -c "import json,sys; data=json.load(sys.stdin); 
  [print(m['id']) for m in data.get('data',[]) if ':free' in m.get('id','')]"
```

**Currently Working Free Models (Verified):**
- `meta-llama/llama-3.3-70b-instruct:free`
- `meta-llama/llama-3.2-3b-instruct:free`
- `google/gemma-3-27b-it:free`
- `arcee-ai/trinity-large-preview:free`
- `z-ai/glm-4.5-air:free`

**OpenCode Zen Free Models:**
```bash
curl -s https://opencode.ai/zen/v1/models | \
  python3 -c "import json,sys; data=json.load(sys.stdin); 
  [print(m['id']) for m in data.get('data',[])]"
```

### Adding a New Model

**Step 1: Add to free-models.ts**

```typescript
"meta-llama/llama-3.3-70b-instruct:free": {
  id: "meta-llama/llama-3.3-70b-instruct:free",
  name: "Llama 3.3 70B",
  family: "llama",
  release_date: "2024-12-01",
  attachment: true,
  reasoning: false,
  temperature: true,
  tool_call: true,
  cost: {
    input: 0,
    output: 0,
  },
  limit: {
    context: 128000,
    output: 4096,
  },
  modalities: {
    input: ["text"],
    output: ["text"],
  },
  options: {},
  provider: {
    npm: "@openrouter/ai-sdk-provider",
  },
}
```

**Step 2: Rebuild codepwn**
```bash
cd /home/pwn/codepwn/packages/codepwn
bun run build
```

## Model Configuration Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Unique model identifier from the API |
| `name` | string | Display name shown in UI |
| `family` | string | Model family (llama, gpt, etc.) |
| `cost.input` | number | Cost per input token (0 for free) |
| `cost.output` | number | Cost per output token (0 for free) |
| `limit.context` | number | Maximum context window size |
| `limit.output` | number | Maximum output tokens |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `attachment` | boolean | Supports file attachments |
| `reasoning` | boolean | Supports reasoning/thinking |
| `temperature` | boolean | Supports temperature setting |
| `tool_call` | boolean | Supports function calling |
| `modalities.input` | string[] | Input types: ["text", "image"] |
| `modalities.output` | string[] | Output types: ["text"] |
| `release_date` | string | Model release date (YYYY-MM-DD) |

### Provider-Specific Fields

**OpenRouter:**
```typescript
provider: {
  npm: "@openrouter/ai-sdk-provider"
}
```

**OpenAI-Compatible (OpenWebUI, Ollama):**
```typescript
provider: {
  npm: "@ai-sdk/openai-compatible"
}
```

## Complete Example: Replacing a Broken Model

### Scenario: Replacing "broken-model" with "llama-3.3-70b"

**Step 1: Identify the broken model**
```bash
# Test if model exists
curl -s https://opencode.ai/zen/v1/models | grep "broken-model"
# No output = model doesn't exist
```

**Step 2: Edit free-models.ts**
```typescript
// Remove this:
"broken-model": {
  id: "broken-model",
  name: "Broken Model",
  ...
},

// Add this:
"llama-3.3-70b": {
  id: "meta-llama/llama-3.3-70b-instruct:free",
  name: "Llama 3.3 70B",
  family: "llama",
  release_date: "2024-12-01",
  attachment: true,
  reasoning: false,
  temperature: true,
  tool_call: true,
  cost: {
    input: 0,
    output: 0,
  },
  limit: {
    context: 128000,
    output: 4096,
  },
  modalities: {
    input: ["text"],
    output: ["text"],
  },
  options: {},
  provider: {
    npm: "@openrouter/ai-sdk-provider",
  },
},
```

**Step 3: Commit and push**
```bash
git add packages/codepwn/src/provider/free-models.ts
git commit -m "Replace broken-model with llama-3.3-70b"
git push
```

**Step 4: Rebuild**
```bash
cd packages/codepwn
bun run build
```

## Best Practices

### 1. Test Before Adding
Always test a model via API before adding it to codepwn:
```bash
curl -X POST https://opencode.ai/zen/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer public" \
  -d '{
    "model": "model-name",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

### 2. Keep Backups
Before removing models, backup your configuration:
```bash
cp packages/codepwn/src/provider/free-models.ts \
   packages/codepwn/src/provider/free-models.ts.backup
```

### 3. Document Changes
Update commit messages with model changes:
```bash
git commit -m "Remove kimi-k2.5 (no longer free), add llama-3.3-70b"
```

### 4. Monitor Model Status
Free models can stop working. Check periodically:
- OpenRouter status: https://openrouter.ai/docs
- OpenCode Zen: Test models monthly

## Troubleshooting

### Model Was Working But Now Fails

**Check 1: API Status**
```bash
curl https://opencode.ai/zen/v1/health
curl https://openrouter.ai/api/v1/health
```

**Check 2: Rate Limits**
Free models often have rate limits. Wait a few minutes and retry.

**Check 3: Model Deprecation**
Models get deprecated. Check provider documentation:
- OpenRouter: https://openrouter.ai/docs

### "Model ID not found" After Adding

1. Verify the exact model ID:
```bash
curl -s https://opencode.ai/zen/v1/models | grep "your-model-id"
```

2. Check for typos in the ID

3. Ensure the model is still available (not removed by provider)

### Multiple Models Not Working

If multiple models fail:
1. Check your internet connection
2. Verify API endpoints are accessible
3. Check if your IP is rate-limited
4. Try using a VPN (some regions block APIs)

## Quick Reference: Common Model IDs

### OpenRouter Free Tier
```
meta-llama/llama-3.3-70b-instruct:free
meta-llama/llama-3.2-3b-instruct:free
google/gemma-3-27b-it:free
arcee-ai/trinity-large-preview:free
z-ai/glm-4.5-air:free
```

### OpenCode Zen (Public API Key)
```
big-pickle
glm-4.7-free
kimi-k2.5-free
minimax-m2.1-free
trinity-large-preview-free
```

### Ollama (Local)
```
llama3.1
mistral
codellama:7b
phi3
```

---

**Need Help?** 
- Check [OpenWebUI.md](OpenWebUI.md) for custom model setup
- Review [README.md](../README.md) for general usage
- Report issues: https://github.com/manojxshrestha/codepwn/issues
