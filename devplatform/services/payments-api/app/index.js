import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

app.get('/healthz', (req, res) => {
  res.status(200).json({ status: 'ok', ts: new Date().toISOString() });
});

app.get('/health', (req, res) => res.send('DevPlatform payments-api service'));

app.listen(port, () => console.log(`service listening on :${port}`));
