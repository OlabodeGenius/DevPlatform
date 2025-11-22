export function ok(res, data = {}) {
  return res.status(200).json({ ok: true, data });
}

export function error(res, status = 500, message = "Internal error") {
  return res.status(status).json({ ok: false, message });
}

export function log(msg) {
  console.log(`[DevPlatform] ${msg}`);
}
