import express from 'express';
import { ok, log } from '@devplatform/common';

const app = express();
const port = process.env.PORT || 3000;

app.get('/healthz', (req, res) => {
  return ok(res, { status: 'healthy', service: 'orders-api' });
});

app.get('/', (req, res) => {
  return ok(res, { message: 'DevPlatform orders-api service' });
});

app.listen(port, () => log(`orders-api listening on :${port}`));

