import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import http from 'http';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname));

// API endpoint to check service health
app.get('/api/health/:service', async (req, res) => {
  const serviceMap = {
    'api-gateway': 'api-gateway.dev.svc.cluster.local',
    'orders-api': 'orders-api.dev.svc.cluster.local',
    'payments-api': 'payments-api.dev.svc.cluster.local'
  };

  const serviceName = req.params.service;
  const serviceHost = serviceMap[serviceName];

  if (!serviceHost) {
    return res.status(404).json({ error: 'Service not found' });
  }

  const options = {
    hostname: serviceHost,
    port: 80,
    path: '/healthz',
    method: 'GET',
    timeout: 5000
  };

  const startTime = Date.now();
  
  const healthRequest = http.request(options, (healthRes) => {
    let data = '';
    
    healthRes.on('data', (chunk) => {
      data += chunk;
    });
    
    healthRes.on('end', () => {
      const responseTime = Date.now() - startTime;
      try {
        const parsed = JSON.parse(data);
        res.json({
          ...parsed,
          responseTime: `${responseTime}ms`,
          statusCode: healthRes.statusCode
        });
      } catch (e) {
        res.json({
          status: 'ok',
          responseTime: `${responseTime}ms`,
          statusCode: healthRes.statusCode
        });
      }
    });
  });

  healthRequest.on('error', (error) => {
    res.status(503).json({
      error: error.message,
      service: serviceName
    });
  });

  healthRequest.on('timeout', () => {
    healthRequest.destroy();
    res.status(504).json({
      error: 'Request timeout',
      service: serviceName
    });
  });

  healthRequest.end();
});

app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Dashboard listening on :${port}`);
});
