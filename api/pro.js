// api/pro.js — version ultra simple, aucun import
// ⬇️ colle ici l'URL /exec exacte de ta WebApp Apps Script
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbxBqeOKPdpsGYyI8ZHMYmZsbO6qxhh4sQxDx-LfvOanR_zFT68OqTFYpplnHB8CzCsj/exec";

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
