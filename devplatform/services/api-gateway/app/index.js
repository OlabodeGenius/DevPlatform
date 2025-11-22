import express from 'express';
import { ok, log } from '@devplatform/common';

const app = express();
const port = process.env.PORT || 3000;

app.get('/healthz', (req, res) => {
  return ok(res, { status: 'healthy', service: 'api-gateway' });
});

app.get('/', (req, res) => {
  return ok(res, { message: 'DevPlatform api-gateway service' });
});

app.listen(port, () => log(`api-gateway listening on :${port}`));

