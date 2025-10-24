// api/pro.js — version ultra simple, aucun import
// ⬇️ colle ici l'URL /exec exacte de ta WebApp Apps Script
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycby65rGOePUXkeQTPkbyddYC1nFXmp4NvllPHcugi9pXBC2WEbNJbsAUvyY3JV58PdoW/exec";

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
