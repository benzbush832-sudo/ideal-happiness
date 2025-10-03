# Aura Providers API

Dynamic providers API for AuraCoder VS Code extension. Serves provider and model configurations dynamically.

## 🚀 Quick Start

### Local Development
```bash
npm install
npm run dev
```

### Test the API
```bash
curl http://localhost:8080/v1/models
```

## 📡 API Endpoints

### GET /v1/models
Returns all providers and their models:
```json
{
  "providers": [
    {
      "id": "a9x11",
      "name": "A9X11.COM",
      "baseUrl": "https://api.a9x11.com/v1",
      "models": [
        { "id": "gpt-4o-mini", "name": "GPT-4o Mini" },
        { "id": "claude-3-5-sonnet", "name": "Claude 3.5 Sonnet" }
      ]
    }
  ]
}
```

### GET /v1/providers/:providerId
Get specific provider details.

### POST /v1/admin/providers
Update providers configuration (admin only).

### GET /health
Health check endpoint.

## 🌐 Deploy to Google Cloud Run

### 1. Build and Push Docker Image
```bash
# Set your project ID
export PROJECT_ID=your-project-id

# Build the image
docker build -t gcr.io/$PROJECT_ID/aura-providers-api .

# Push to Google Container Registry
docker push gcr.io/$PROJECT_ID/aura-providers-api
```

### 2. Deploy to Cloud Run
```bash
# Replace PROJECT_ID in deploy.yaml
sed -i "s/PROJECT_ID/$PROJECT_ID/g" deploy.yaml

# Deploy
gcloud run services replace deploy.yaml --region=us-central1
```

### 3. Alternative: Direct Deploy
```bash
gcloud run deploy aura-providers-api \
  --image gcr.io/$PROJECT_ID/aura-providers-api \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --max-instances 10
```

## 🔧 Configuration

Update the `PROVIDERS_CONFIG` in `server.js` to add/modify providers:

```javascript
const PROVIDERS_CONFIG = {
  providers: [
    {
      id: 'your-provider',
      name: 'Your Provider Name',
      baseUrl: 'https://api.yourprovider.com/v1',
      models: [
        { id: 'model-1', name: 'Model 1' },
        { id: 'model-2', name: 'Model 2' }
      ]
    }
  ]
};
```

## 🔗 VS Code Integration

Set your deployed URL in VS Code settings:
```json
{
  "aura.api.baseUrl": "https://your-cloud-run-url"
}
```

The extension will automatically fetch providers from `/v1/models` endpoint.

## 📊 Monitoring

- Health check: `GET /health`
- Admin config: `GET /v1/admin/config`
- Logs: `gcloud run logs tail aura-providers-api --region=us-central1`
