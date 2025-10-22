// api/go.js
const { WEBAPP_URL } = require("./config");
const url = require("url");

function bad(res, code, msg) {
  res.statusCode = code;
  res.end(msg);
}

module.exports = (req, res) => {
  if (!WEBAPP_URL || !/^https?:\/\//i.test(WEBAPP_URL)) {
    return bad(res, 500, "WEBAPP_URL is not set in config.js");
  }

  try {
    const parsed = url.parse(req.url, true);
    const raw = (parsed.query && parsed.query.go ? String(parsed.query.go) : "").trim();
    if (!raw) return bad(res, 400, "Paramètre ?go manquant");

    // on ne re-décode pas deux fois — Vercel te donne déjà la valeur décodée dans parsed.query.go
    const token = raw;

    // 0) Orga / Pro d'abord
    if (["PRO", "ORGA", "ADMIN"].includes(token.toUpperCase())) {
      const dest = `${WEBAPP_URL}?page=pro`;
      res.statusCode = 307;
      res.setHeader("Location", dest);
      return res.end();
    }

    // 1) pid:eventId
    if (token.includes(":")) {
      const [pid, ev] = token.split(":");
      if (pid && ev) {
        const dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(ev)}&pid=${encodeURIComponent(pid)}`;
        res.statusCode = 307;
        res.setHeader("Location", dest);
        return res.end();
      }
    }

    // 2) Dashboard joueur (P\d+)
    if (/^P\d+$/i.test(token)) {
      const dest = `${WEBAPP_URL}?page=dashboard&pid=${encodeURIComponent(token.toUpperCase())}`;
      res.statusCode = 307;
      res.setHeader("Location", dest);
      return res.end();
    }

    // 3) Page évènement publique (EV…)
    if (/^EV/i.test(token)) {
      const dest = `${WEBAPP_URL}?event_id=${encodeURIComponent(token)}`;
      res.statusCode = 307;
      res.setHeader("Location", dest);
      return res.end();
    }

    return bad(res, 400, "Token ?go inconnu");
  } catch (e) {
    return bad(res, 500, "Redirect error (go.js): " + String(e));
  }
};
