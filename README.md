# codepwn

```
█▀▀ █▀█ █▀▄ █▀▀ █▀█ █░█░█ █▄░█
█▄▄ █▄█ █▄▀ ██▄ █▀▀ ▀▄▀▄▀ █░▀█
```

**Free, powerful AI coding IDE for hackers and developers.**

A completely free alternative to OpenCode, Claude Code, and other paid AI coding assistants. Built on the solid foundation of OpenCode v1.1.45, rebranded and enhanced for the community.

## Features

- **100% Free** - No subscriptions, no paid tiers, no credit cards required
- **5 Free AI Models** - Big Pickle, GLM-4.7, Kimi K2.5, MiniMax M2.1, Trinity Large Preview
- **Multi-Agent System** - Build, Plan, and General agents for different tasks
- **LSP Support** - Language Server Protocol for intelligent code completion
- **MCP Integration** - Model Context Protocol for extended capabilities
- **Plugin System** - Extensible architecture for custom functionality
- **Terminal Integration** - Built-in terminal with PTY support
- **Multi-tab Editor** - Edit multiple files simultaneously
- **Syntax Highlighting** - Tree-sitter powered highlighting for 50+ languages
- **Keyboard-First** - Vim-style keybindings and efficient shortcuts
- **Dark Theme** - Cyberpunk-inspired dark theme by default

## Quick Start

### One-Line Installation

```bash
curl -fsSL https://raw.githubusercontent.com/manojxshrestha/codepwn/main/install | bash
```

### Start Coding

```bash
# Start in current directory
codepwn

# Or open a specific project
codepwn /path/to/your/project
```

### Start Coding with Free Models

The **Free Models** provider is pre-configured with 5 free AI models. No API key required!

**Available Free Models:**
- **Big Pickle** - 200K context, reasoning
- **GLM-4.7** - 204K context, reasoning
- **Kimi K2.5** - 256K context, vision + text
- **MiniMax M2.1** - 204K context, reasoning
- **Trinity Large Preview** - 200K context, reasoning

**Start coding:**
```bash
codepwn
# Select "Free Models" provider when prompted
```

**Note:** All models are completely free ($0 cost) and work immediately without any API key!

## Unrestricted Mode (No Permission Prompts)

codepwn now runs in **UNRESTRICTED MODE** by default! This means:
- ✅ No permission prompts
- ✅ Full filesystem access
- ✅ Unrestricted bash command execution
- ✅ Automatic approval of all actions
- ✅ Maximum power for hacking and coding

**The AI can:**
- Read any file without asking
- Edit any file without asking
- Run any bash command without asking
- Access external directories
- Use all tools freely

**⚠️ Warning:** Unrestricted mode gives the AI full control. Review all changes carefully!

To enable unrestricted mode manually, copy the config:
```bash
cp unrestricted.jsonc codepwn.jsonc
```

## Free Models Available

| Model | Context | Features |
|-------|---------|----------|
| **Llama 3.3 70B** | 128K | General purpose coding |
| **Llama 3.2 3B** | 128K | Fast, efficient |
| **Gemma 3 27B** | 128K | Vision + text, image support |
| **Trinity Large Preview** | 128K | Strong reasoning, preview access |
| **GLM-4.5 Air** | 128K | Multilingual support |

All models are **completely free** through OpenRouter's free tier!

## Usage

### Basic Commands

```bash
codepwn                    # Start in current directory
codepwn run "task"         # Run a specific task
codepwn --help             # Show help
codepwn --version          # Show version
```

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Switch between agents/models |
| `Enter` | Send message |
| `Ctrl+C` | Cancel current operation |
| `Ctrl+D` | Exit |
| `↑/↓` | Navigate history |

### Example Workflows

**Code Review:**
```bash
codepwn run "Review this codebase for security vulnerabilities"
```

**Refactoring:**
```bash
codepwn run "Refactor the auth module to use async/await pattern"
```

**Debugging:**
```bash
codepwn run "Find and fix the memory leak in server.ts"
```

**Learning:**
```bash
codepwn run "Explain how the React hooks work in this project"
```

## Configuration

Create `codepwn.jsonc` in your project root:

```jsonc
{
  "model": "groq/llama-3.1-70b",
  "agent": {
    "default": "build"
  },
  "editor": {
    "tabSize": 2,
    "vimMode": false
  },
  "permission": {
    "filesystem": "allow",
    "terminal": "ask"
  }
}
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `CODEPWN_CONFIG` | Path to config file |
| `OPENROUTER_API_KEY` | OpenRouter API key |
| `ANTHROPIC_API_KEY` | Anthropic API key (optional) |
| `OPENAI_API_KEY` | OpenAI API key (optional) |
| `CODEPWN_LOG_LEVEL` | DEBUG, INFO, WARN, ERROR |

## Installation from Source

```bash
git clone https://github.com/manojxshrestha/codepwn.git
cd codepwn
bun install
bun run build
```

### Requirements

- **Bun** 1.1.0 or higher
- **Git** (for version control features)
- **Node.js** 18+ (optional, for some features)

## Using Custom Models (OpenWebUI, Ollama, etc.)

codepwn supports custom AI models through OpenAI-compatible endpoints.

### Using Local Models (Ollama)

📖 **Complete Guide**: See [docs/OpenWebUI.md](docs/OpenWebUI.md) for detailed setup instructions.

Quick setup for OpenWebUI:

**Step 1: Configure codepwn.jsonc**
```jsonc
{
  "provider": {
    "custom": {
      "api": "http://192.168.1.233:3000/api",
      "apiKey": "your-openwebui-api-key",
      "models": {
        "my-custom-model": {
          "id": "my-custom-model",
          "name": "My Custom Model",
          "context": 128000
        }
      }
    }
  }
}
```

**Step 2: Use your custom model**
```bash
codepwn
# Select "custom" provider and choose your model
```

### Ollama Integration

For local models via Ollama:

```bash
# Make sure Ollama is running
curl http://localhost:11434/api/tags

# Configure codepwn
cat > codepwn.jsonc << 'EOF'
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
EOF
```

### Other OpenAI-Compatible Endpoints

codepwn works with any OpenAI-compatible API:
- **LM Studio** - `http://localhost:1234/v1`
- **text-generation-webui** - `http://localhost:5000/v1`
- **LocalAI** - `http://localhost:8080/v1`
- **vLLM** - `http://localhost:8000/v1`

## Architecture

```
codepwn/
├── packages/codepwn/     # Core CLI and TUI
├── packages/app/         # Web application interface
├── packages/desktop/     # Desktop app (Tauri)
├── packages/plugin/      # Plugin system
├── packages/sdk/         # Public SDK
└── packages/console/     # Web console (optional)
```

### Core Components

- **Agent System** - Multi-agent orchestration for complex tasks
- **Session Manager** - Persistent conversation history
- **Tool Registry** - Extensible tool system (bash, edit, grep, etc.)
- **Provider System** - Abstraction layer for AI providers
- **LSP Client** - Language server protocol integration
- **Plugin API** - Hook-based plugin architecture

## Plugin Development

Create a custom plugin:

```typescript
// my-plugin.ts
export default {
  name: "my-plugin",
  version: "1.0.0",
  
  hooks: {
    onInit() {
      console.log("Plugin initialized!");
    },
    
    onCommand(command, args) {
      if (command === "hello") {
        console.log("Hello from my plugin!");
      }
    }
  }
};
```

## Troubleshooting

### "command not found"

Add bun to your PATH:
```bash
export PATH="$HOME/.bun/bin:$PATH"
```

### "No models available"

Make sure you've set up a provider API key:
```bash
export OPENROUTER_API_KEY="your-key-here"
```

### API Key Issues

Test your API key:
```bash
codepwn debug provider openrouter
```

## Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

### Development Setup

```bash
git clone https://github.com/manojxshrestha/codepwn.git
cd codepwn
bun install
bun run dev
```

## Roadmap

- [ ] More free model providers
- [ ] Enhanced IDE features (debugging, git integration)
- [ ] Plugin marketplace
- [ ] Mobile app support
- [ ] Team collaboration features
- [ ] AI-powered code explanations

## License

MIT License - Free for personal and commercial use.

## Acknowledgments

Built on the excellent foundation of [OpenCode](https://github.com/anomalyco/opencode) by the OpenCode team. Rebranded and modified to be 100% free and open source.

## Support

- **Issues**: https://github.com/manojxshrestha/codepwn/issues
- **Discussions**: https://github.com/manojxshrestha/codepwn/discussions

---

**codepwn** - Free AI coding for everyone. No paywalls. No restrictions. Just code.

```
Happy Vibe Coding! 🚀
```
