# OpenWebUI Integration Guide

This guide explains how to integrate **OpenWebUI** with **codepwn** to use your custom-trained models.

## What is OpenWebUI?

[OpenWebUI](https://openwebui.com/) is a user-friendly interface for running local AI models. It supports various backends including Ollama, OpenAI-compatible APIs, and custom models.

## Prerequisites

- OpenWebUI installed and running (default: `http://localhost:3000`)
- At least one model configured in OpenWebUI
- codepwn installed

## Getting Your API Key

### Step 1: Access OpenWebUI
Open your browser and navigate to your OpenWebUI instance:
```
http://localhost:3000
```

### Step 2: Navigate to Account Settings
1. Click on your **profile picture/avatar** (top right corner)
2. Select **"Settings"** from the dropdown menu
3. Click on **"Account"** in the left sidebar

### Step 3: Generate API Key
1. Scroll down to the **"API Keys"** section
2. Click **"Create API Key"** button
3. Give your key a name (e.g., "codepwn-integration")
4. Copy the generated API key immediately (it won't be shown again!)

**Note:** The API key is different from a JWT token. Make sure you use the API Key.

## Configuring codepwn

Create or edit your `codepwn.jsonc` file in your project directory:

```jsonc
{
  "provider": {
    "openwebui": {
      "api": "http://localhost:3000/api",
      "apiKey": "YOUR_API_KEY_HERE",
      "models": {
        "llama3.1": {
          "id": "llama3.1",
          "name": "Llama 3.1",
          "family": "llama",
          "context": 128000,
          "attachment": true,
          "reasoning": false,
          "tool_call": true,
          "temperature": true,
          "cost": {
            "input": 0,
            "output": 0
          },
          "limit": {
            "context": 128000,
            "output": 4096
          },
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          }
        }
      }
    }
  }
}
```

## Configuration Options

### Custom Model Names
Replace the model configuration with your own trained model:

```jsonc
{
  "provider": {
    "openwebui": {
      "api": "http://localhost:3000/api",
      "apiKey": "YOUR_API_KEY",
      "models": {
        "my-custom-model": {
          "id": "my-custom-model",
          "name": "My Trained Model",
          "family": "custom",
          "context": 8192,
          "attachment": false,
          "reasoning": false,
          "tool_call": true,
          "temperature": true,
          "cost": {
            "input": 0,
            "output": 0
          },
          "limit": {
            "context": 8192,
            "output": 2048
          },
          "modalities": {
            "input": ["text"],
            "output": ["text"]
          }
        }
      }
    }
  }
}
```

### Remote OpenWebUI Instance
If OpenWebUI is running on a different machine:

```jsonc
{
  "provider": {
    "openwebui": {
      "api": "http://192.168.1.100:3000/api",
      "apiKey": "YOUR_API_KEY"
    }
  }
}
```

## Using Your Custom Model

### Start codepwn
```bash
codepwn
```

### Select Your Provider
1. Press `Tab` to open the model selector
2. Choose **"openwebui"** from the provider list
3. Select your custom model from the available models

### Start Coding
```bash
codepwn run "Explain how this codebase works"
```

## Troubleshooting

### "Connection refused" Error
**Problem:** codepwn can't connect to OpenWebUI

**Solutions:**
1. Verify OpenWebUI is running:
   ```bash
   curl http://localhost:3000/health
   ```
2. Check the correct port (default is 3000)
3. Ensure no firewall is blocking the connection

### "Invalid API key" Error
**Problem:** The API key is incorrect or expired

**Solutions:**
1. Generate a new API key in OpenWebUI settings
2. Make sure you're using the API Key (not JWT token)
3. Verify the key is copied correctly (no extra spaces)

### "Model not found" Error
**Problem:** The model ID doesn't exist in OpenWebUI

**Solutions:**
1. List available models:
   ```bash
   curl -H "Authorization: Bearer YOUR_API_KEY" \
        http://localhost:3000/api/models
   ```
2. Use the exact model ID from the response
3. Ensure the model is properly configured in OpenWebUI

### Model Response is Slow
**Problem:** Large context windows or complex prompts slow down responses

**Solutions:**
1. Reduce the `context` value in the configuration
2. Use a smaller/faster model for simple tasks
3. Check if your hardware (GPU/CPU) is sufficient

## Example: Complete Setup

### 1. Start OpenWebUI
```bash
# If using Docker
docker run -d -p 3000:8080 --add-host=host.docker.internal:host-gateway -v open-webui:/app/backend/data --name open-webui --restart always ghcr.io/open-webui/open-webui:main

# Or if installed locally
open-webui serve
```

### 2. Get API Key
- Navigate to `http://localhost:3000`
- Go to Settings → Account
- Create API Key

### 3. Create codepwn.jsonc
```bash
cat > codepwn.jsonc << 'EOF'
{
  "provider": {
    "openwebui": {
      "api": "http://localhost:3000/api",
      "apiKey": "sk-xxxxxxxxxxxxxxxxxxxxxxxx",
      "models": {
        "codellama": {
          "id": "codellama:7b",
          "name": "CodeLlama 7B",
          "context": 16384,
          "tool_call": true
        }
      }
    }
  }
}
EOF
```

### 4. Start Coding
```bash
codepwn
```

## Advanced Configuration

### Multiple Models
You can configure multiple models from OpenWebUI:

```jsonc
{
  "provider": {
    "openwebui": {
      "api": "http://localhost:3000/api",
      "apiKey": "YOUR_API_KEY",
      "models": {
        "codellama": {
          "id": "codellama:7b",
          "name": "CodeLlama 7B",
          "context": 16384
        },
        "mistral": {
          "id": "mistral:7b",
          "name": "Mistral 7B",
          "context": 8192
        },
        "llama3": {
          "id": "llama3:8b",
          "name": "Llama 3 8B",
          "context": 8192
        }
      }
    }
  }
}
```

### Environment Variables
Instead of hardcoding the API key, use environment variables:

```jsonc
{
  "provider": {
    "openwebui": {
      "api": "http://localhost:3000/api",
      "apiKey": "${OPENWEBUI_API_KEY}"
    }
  }
}
```

Then set the environment variable:
```bash
export OPENWEBUI_API_KEY="your-api-key"
codepwn
```

## Tips for Best Results

1. **Use Appropriate Context Sizes**: Don't set context larger than what your model supports
2. **Start with Smaller Models**: Test with 7B models before using larger ones
3. **Monitor Performance**: Local models can be slower than cloud APIs
4. **Keep Models Updated**: Regularly pull updates for your Ollama models
5. **Hardware Matters**: GPU acceleration significantly improves response times

## Alternative: Direct Ollama Integration

If you're running models through Ollama directly (without OpenWebUI):

```jsonc
{
  "provider": {
    "ollama": {
      "api": "http://localhost:11434",
      "models": {
        "llama3.1": {
          "id": "llama3.1",
          "name": "Llama 3.1",
          "context": 128000
        }
      }
    }
  }
}
```

## Resources

- [OpenWebUI Documentation](https://docs.openwebui.com/)
- [OpenWebUI GitHub](https://github.com/open-webui/open-webui)
- [Ollama Documentation](https://ollama.com/)

---

**Happy Vibe Coding with Your Custom Models! 🚀**
