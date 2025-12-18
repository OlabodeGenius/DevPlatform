import express from 'express';

const app = express();
const port = process.env.PORT || 3000;

// Simple metrics counter
let healthCheckCount = 0;
let totalRequests = 0;

app.use((req, res, next) => {
  totalRequests++;
  next();
});

app.get('/healthz', (req, res) => {
  healthCheckCount++;
  res.status(200).json({ 
    status: 'healthy', 
    service: 'api-gateway', 
    ts: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# HELP http_requests_total Total HTTP requests
# TYPE http_requests_total counter
http_requests_total{service="api-gateway"} ${totalRequests}

# HELP healthz_requests_total Total health check requests
# TYPE healthz_requests_total counter
healthz_requests_total{service="api-gateway"} ${healthCheckCount}

# HELP process_uptime_seconds Process uptime in seconds
# TYPE process_uptime_seconds gauge
process_uptime_seconds{service="api-gateway"} ${process.uptime()}
`);
});

app.get('/', (req, res) => {
  res.json({ message: 'DevPlatform api-gateway service', version: '1.0.0' });
});

app.listen(port, () => console.log(`api-gateway listening on :${port}`));
