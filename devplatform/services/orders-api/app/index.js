import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/healthz", (req, res) => {
  res.status(200).json({
    status: "healthy",
    service: "orders-api",
    ts: new Date().toISOString(),
  });
});

app.get("/", (req, res) => {
  res.json({ message: "DevPlatform orders-api service" });
});

app.listen(port, () => console.log(`orders-api listening on :${port}`));
