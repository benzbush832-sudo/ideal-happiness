const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

// Enable CORS for all origins (adjust for production)
app.use(cors());
app.use(express.json());

// Dynamic providers configuration - 3 providers with ALL models
const PROVIDERS_CONFIG = {
  version: 1,
  providers: [
    {
      id: 'a9x11',
      name: 'A9X11.COM',
      baseUrl: 'https://api.a9x11.com/v1',
      models: [
        // OpenAI Models (including GPT-5!)
        { id: 'gpt-5', name: 'GPT-5', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-5-mini', name: 'GPT-5 Mini', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-5-nano', name: 'GPT-5 Nano', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'o3', name: 'o3', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'o4-mini', name: 'o4-mini', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-4.1', name: 'GPT-4.1', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4.1-mini', name: 'GPT-4.1 mini', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4.1-nano', name: 'GPT-4.1 nano', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4o-2024-11-20', name: 'GPT-4o (2024-11-20)', maxInputTokens: 111616, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4o-mini', name: 'GPT-4o Mini', maxInputTokens: 128000, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4', name: 'GPT-4', maxInputTokens: 128000, maxOutputTokens: 4096, toolCalling: true, turboMode: true },
        
        // Anthropic Models (including Claude 4!)
        { id: 'claude-opus-4-20250514', name: 'Claude Opus 4', maxInputTokens: 111616, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-sonnet-4-20250514', name: 'Claude Sonnet 4', maxInputTokens: 111616, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', maxInputTokens: 130000, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-3-7-sonnet-20250219', name: 'Claude 3.7 Sonnet', maxInputTokens: 64000, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet', maxInputTokens: 64000, maxOutputTokens: 8192, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-3-5-haiku-20241022', name: 'Claude 3.5 Haiku', maxInputTokens: 64000, maxOutputTokens: 8192, toolCalling: true, vision: true, turboMode: true },
        
        // Google Gemini Models
        { id: 'models/gemini-2.5-pro', name: 'Gemini 2.5 Pro', maxInputTokens: 819600, maxOutputTokens: 65536, toolCalling: true, vision: true, turboMode: true },
        { id: 'models/gemini-2.5-flash', name: 'Gemini 2.5 Flash Preview', maxInputTokens: 819600, maxOutputTokens: 65536, toolCalling: true, vision: true, turboMode: true },
        
        // xAI Grok Models
        { id: 'grok-4-0709', name: 'Grok 4', maxInputTokens: 120000, maxOutputTokens: 120000, toolCalling: true, vision: true, turboMode: true },
        { id: 'grok-code-fast-1', name: 'Grok Code Fast 1', maxInputTokens: 120000, maxOutputTokens: 120000, toolCalling: true, turboMode: true },
        { id: 'grok-3', name: 'Grok 3', maxInputTokens: 80000, maxOutputTokens: 30000, toolCalling: true, turboMode: true },
        { id: 'grok-3-mini', name: 'Grok 3 Mini', maxInputTokens: 80000, maxOutputTokens: 30000, toolCalling: true, turboMode: true }
      ]
    },
    {
      id: 'helloaura',
      name: 'HELLOAURA.DEV',
      baseUrl: 'https://ai.helloaura.dev/v1',
      models: [
        // OpenAI Models (including GPT-5!)
        { id: 'gpt-5', name: 'GPT-5', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-5-mini', name: 'GPT-5 Mini', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-5-nano', name: 'GPT-5 Nano', maxInputTokens: 300000, maxOutputTokens: 100000, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'o3', name: 'o3', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'o4-mini', name: 'o4-mini', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, thinking: true, turboMode: true },
        { id: 'gpt-4.1', name: 'GPT-4.1', maxInputTokens: 1014808, maxOutputTokens: 32768, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4o', name: 'GPT-4o', maxInputTokens: 128000, maxOutputTokens: 4096, toolCalling: true, vision: true, turboMode: true },
        { id: 'gpt-4', name: 'GPT-4', maxInputTokens: 128000, maxOutputTokens: 4096, toolCalling: true, turboMode: true },
        
        // Anthropic Models (including Claude 4!)
        { id: 'claude-opus-4-20250514', name: 'Claude Opus 4', maxInputTokens: 111616, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-sonnet-4-5-20250929', name: 'Claude Sonnet 4.5', maxInputTokens: 130000, maxOutputTokens: 16384, toolCalling: true, vision: true, turboMode: true },
        { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', maxInputTokens: 64000, maxOutputTokens: 8192, toolCalling: true, vision: true, turboMode: true },
        
        // Google Gemini Models
        { id: 'models/gemini-2.5-pro', name: 'Gemini 2.5 Pro', maxInputTokens: 819600, maxOutputTokens: 65536, toolCalling: true, vision: true, turboMode: true },
        
        // xAI Grok Models
        { id: 'grok-4-0709', name: 'Grok 4', maxInputTokens: 120000, maxOutputTokens: 120000, toolCalling: true, vision: true, turboMode: true }
      ]
    },
    {
      id: 'llm-based',
      name: 'LLM BASED',
      baseUrl: 'https://api.llm-based.com/v1',
      models: [
        // Open Source LLMs only (via Groq and others)
        { id: 'qwen-qwq-32b', name: 'Qwen QWQ 32B', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'qwen-2.5-coder-32b', name: 'Qwen 2.5 Coder 32B', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'qwen-2.5-32b', name: 'Qwen 2.5 32B', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'deepseek-r1-distill-qwen-32b', name: 'DeepSeek R1 Distill Qwen 32B', maxInputTokens: 131072, maxOutputTokens: 16384, toolCalling: true, turboMode: true },
        { id: 'deepseek-r1-distill-llama-70b', name: 'DeepSeek R1 Distill Llama 70B', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', maxInputTokens: 131072, maxOutputTokens: 32768, toolCalling: true, turboMode: true },
        { id: 'llama-3.1-70b', name: 'Llama 3.1 70B', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', maxInputTokens: 131072, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B 32768', maxInputTokens: 32768, maxOutputTokens: 8192, toolCalling: true, turboMode: true },
        { id: 'mistral-7b', name: 'Mistral 7B', maxInputTokens: 32768, maxOutputTokens: 8192 },
        { id: 'gemma2-9b-it', name: 'Gemma2 9B IT', maxInputTokens: 8192, maxOutputTokens: 8192, toolCalling: true },
        { id: 'codellama-34b', name: 'CodeLlama 34B', maxInputTokens: 16384, maxOutputTokens: 4096 },
        { id: 'openai/gpt-oss-20b', name: 'GPT OSS 20b', maxInputTokens: 100000, maxOutputTokens: 30000, toolCalling: true },
        { id: 'openai/gpt-oss-120b', name: 'GPT OSS 120b', maxInputTokens: 100000, maxOutputTokens: 30000, toolCalling: true }
      ]
    }
  ]
};

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Main providers endpoint - Returns all providers with models
app.get('/v1/models', (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] GET /v1/models - Serving ${PROVIDERS_CONFIG.providers.length} providers`);
    res.json(PROVIDERS_CONFIG);
  } catch (error) {
    console.error('Error serving providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific provider details
app.get('/v1/providers/:providerId', (req, res) => {
  try {
    const { providerId } = req.params;
    const provider = PROVIDERS_CONFIG.providers.find(p => p.id === providerId);
    
    if (!provider) {
      return res.status(404).json({ error: 'Provider not found' });
    }
    
    console.log(`[${new Date().toISOString()}] GET /v1/providers/${providerId}`);
    res.json(provider);
  } catch (error) {
    console.error('Error serving provider:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Removed redundant /v1/models/thinking endpoint
// All thinking models are already in the 3 providers with thinking: true property

// Update provider configuration (for admin use)
app.post('/v1/admin/providers', (req, res) => {
  try {
    const { providers } = req.body;
    
    if (!Array.isArray(providers)) {
      return res.status(400).json({ error: 'Providers must be an array' });
    }
    
    // Validate provider structure
    for (const provider of providers) {
      if (!provider.id || !provider.name || !provider.baseUrl || !Array.isArray(provider.models)) {
        return res.status(400).json({ 
          error: 'Each provider must have id, name, baseUrl, and models array' 
        });
      }
    }
    
    PROVIDERS_CONFIG.providers = providers;
    console.log(`[${new Date().toISOString()}] Updated providers configuration`);
    
    res.json({ success: true, message: 'Providers updated successfully' });
  } catch (error) {
    console.error('Error updating providers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current configuration (for debugging)
app.get('/v1/admin/config', (req, res) => {
  const totalModels = PROVIDERS_CONFIG.providers.reduce((sum, p) => sum + p.models.length, 0);
  
  res.json({
    config: PROVIDERS_CONFIG,
    stats: {
      totalProviders: PROVIDERS_CONFIG.providers.length,
      totalModels
    },
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Catch-all for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Not found',
    availableEndpoints: [
      'GET /health',
      'GET /v1/models',
      'GET /v1/providers/:providerId',
      'POST /v1/admin/providers',
      'GET /v1/admin/config'
    ]
  });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  const totalModels = PROVIDERS_CONFIG.providers.reduce((sum, p) => sum + p.models.length, 0);
  
  console.log(`🚀 Aura Providers API running on port ${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
  console.log(`🔧 Models endpoint: http://localhost:${PORT}/v1/models`);
  console.log(`⚙️  Admin config: http://localhost:${PORT}/v1/admin/config`);
  console.log(`\n📊 Stats:`);
  console.log(`   - ${PROVIDERS_CONFIG.providers.length} providers (A9X11, HELLOAURA, LLM-BASED)`);
  console.log(`   - ${totalModels} total models`);
  console.log(`\n🎯 Featured Models:`);
  console.log(`   - GPT-5, o3, o4-mini (thinking capability)`);
  console.log(`   - Claude Opus 4, Claude Sonnet 4.5`);
  console.log(`   - Gemini 2.5 Pro (819K context!)`);
  console.log(`   - Grok 4, DeepSeek R1, Qwen models`);
});

module.exports = app;
