const { WEBAPP_URL } = require("../config");

function preserveExtraQuery(req, consumedKeys) {
  const url = require("url");
  const parsed = url.parse(req.url, true);
  const q = parsed.query || {};
  const out = [];
  for (const [k, v] of Object.entries(q)) {
    if (consumedKeys.includes(k)) continue;
    if (v === undefined || v === null || v === "") continue;
    out.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
  }
  return out.length ? "&" + out.join("&") : "";
}

module.exports = (req, res) => {
  try {
    if (!WEBAPP_URL || !/^https?:\/\//i.test(WEBAPP_URL)) {
      res.statusCode = 500;
      return res.end("WEBAPP_URL is not set in config.js");
    }

    const url = require("url");
    const go = (url.parse(req.url, true).query || {}).go || "";

    let dest;
    if (go.includes(":")) {
      // format "PID:EVENTID" → page évènement + pid
      const [pid, event_id] = go.split(":");
      dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(event_id)}&pid=${encodeURIComponent(pid)}${preserveExtraQuery(req, ["go"])}`;
    } else if (/^P/i.test(go)) {
      // format "PID" → dashboard joueur
      dest = `${WEBAPP_URL}?page=dashboard&pid=${encodeURIComponent(go)}${preserveExtraQuery(req, ["go"])}`;
    } else if (go) {
      // format "EVENTID" → page publique évènement
      dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(go)}${preserveExtraQuery(req, ["go"])}`;
    } else {
      // fallback : renvoyer vers la racine Apps Script (ou une page d’info)
      dest = `${WEBAPP_URL}${preserveExtraQuery(req, [])}`;
    }

    res.statusCode = 307; // conserve la méthode
    res.setHeader("Location", dest);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end("go.js error: " + String(e));
  }
};
