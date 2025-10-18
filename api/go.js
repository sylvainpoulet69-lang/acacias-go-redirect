// api/go.js
export default async function handler(req, res) {
  try {
    // 1) Source unique de vérité : variable d'environnement
    const WEBAPP = process.env.WEBAPP_EXEC_URL;
    if (!WEBAPP) {
      return res.status(500).json({ error: "WEBAPP_EXEC_URL not set" });
    }

    // 2) Format attendu: /api/go?go=PID:EVENT_ID  (ex: P001:N3-2025-10-20-20h)
    const raw = (req.query.go || "").toString();
    const [pid, event_id] = raw.split(":");

    // 3) Mode debug (ne redirige pas, affiche la cible)
    if (req.query.debug === "1") {
      return res.status(200).json({
        ok: true,
        raw,
        pid,
        event_id,
        target: event_id
          ? `${WEBAPP}?event_id=${encodeURIComponent(event_id)}&pid=${encodeURIComponent(pid || "")}`
          : pid
          ? `${WEBAPP}?pid=${encodeURIComponent(pid)}`
          : WEBAPP
      });
    }

    // 4) Redirection
    const target = event_id
      ? `${WEBAPP}?event_id=${encodeURIComponent(event_id)}&pid=${encodeURIComponent(pid || "")}`
      : pid
      ? `${WEBAPP}?pid=${encodeURIComponent(pid)}`
      : WEBAPP;

    res.writeHead(302, { Location: target });
    res.end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
