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
  if (!WEBAPP_URL || !/^https?:\/\//i.test(WEBAPP_URL)) {
    res.statusCode = 500;
    res.end("WEBAPP_URL is not set in config.js");
    return;
  }
  try {
    const dest = `${WEBAPP_URL}?page=pro${preserveExtraQuery(req, [])}`;
    res.statusCode = 307;
    res.setHeader("Location", dest);
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end("Redirect error: " + String(e));
  }
};
