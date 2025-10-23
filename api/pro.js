// api/pro.js — version ultra simple, aucun import
// ⬇️ colle ici l'URL /exec exacte de ta WebApp Apps Script
const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbzCy2YP2SzZHBWeF3C_dRGBNZ7fQ_OIFTyW2acNT3uskWrGwH4r_G1_RNRMUTCI1vKS/exec";

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
