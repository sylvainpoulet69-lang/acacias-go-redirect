const { WEBAPP_URL } = require("./config");

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
  if (!WEBAPP_URL || !/^https?:\/\//i.test(WEBAPP_URL)) {
    res.statusCode = 500;
    res.end("WEBAPP_URL is not set in config.js");
    return;
  }

  try {
    const url = require("url");
    const q = url.parse(req.url, true).query || {};
    const raw = (q.go || "").toString();
    if (!raw) {
      res.statusCode = 400;
      res.end("Paramètre ?go manquant");
      return;
    }

    const token = decodeURIComponent(raw).trim();
    let dest = null;

    // 1) pid:event → /?event_id=EVxxx&pid=Pxxx
    if (token.includes(":")) {
      const [pid, ev] = token.split(":");
      if (pid && ev) {
        dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(ev)}&pid=${encodeURIComponent(pid)}`;
      }
    }

    // 2) PRO → page orga
    if (!dest && token.toUpperCase() === "PRO") {
      dest = `${WEBAPP_URL}?page=pro`;
    }

    // 3) P\d+ → dashboard joueur
    if (!dest && /^P\d+$/i.test(token)) {
      dest = `${WEBAPP_URL}?page=dashboard&pid=${encodeURIComponent(token.toUpperCase())}`;
    }

    // 4) EV… → page publique évènement
    if (!dest && /^EV/i.test(token)) {
      dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(token)}`;
    }

    if (!dest) {
      res.statusCode = 400;
      res.end("Token ?go inconnu");
      return;
    }

    // Conserver les paramètres additionnels éventuels
    dest += preserveExtraQuery(req, ["go"]);
    res.statusCode = 307;             // 302/307 OK, je garde 307
    res.setHeader("Location", dest);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end("Erreur go.js: " + String(e));
  }
};
