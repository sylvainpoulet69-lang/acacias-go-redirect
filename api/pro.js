// api/pro.js — version ultra simple, aucun import
// ⬇️ colle ici l'URL /exec exacte de ta WebApp Apps Script
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwD-ruMMZd3HG97pQrqum-TEHBm_KvTVc8b73wexgySGWbd75Vh25yQcCcigqU_LnQ7/exec";

module.exports = (req, res) => {
  try {
    const dest = `${WEBAPP_URL}?page=pro`;
    res.writeHead(307, { Location: dest });
    res.end();
  } catch (e) {
    res.statusCode = 500;
    res.end("Redirect error: " + String(e));
  }
};
