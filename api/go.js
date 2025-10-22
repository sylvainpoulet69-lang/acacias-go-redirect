import { APPSCRIPT_WEBAPP } from "./config.js";

export default async function handler(req, res) {
  try {
    const raw = (req.query.go || "").toString();
    if (!raw) return res.status(400).send("Paramètre ?go manquant");

    const token = decodeURIComponent(raw).trim();

    // 1) pid:eventId  -> /?event_id=EVxxx&pid=Pxxx
    if (token.includes(":")) {
      const [pid, ev] = token.split(":");
      if (pid && ev) {
        const url = `${APPSCRIPT_WEBAPP}?event_id=${encodeURIComponent(ev)}&pid=${encodeURIComponent(pid)}`;
        return res.redirect(302, url);
      }
    }

    // 2) P\d+ -> dashboard joueur
    if (/^P\d+$/i.test(token)) {
      const url = `${APPSCRIPT_WEBAPP}?page=dashboard&pid=${encodeURIComponent(token.toUpperCase())}`;
      return res.redirect(302, url);
    }

    // 3) EV... -> page évènement publique
    if (/^EV/i.test(token)) {
      const url = `${APPSCRIPT_WEBAPP}?event_id=${encodeURIComponent(token)}`;
      return res.redirect(302, url);
    }

    // Optionnel : mot-clé "PRO" pour l’orga (sinon utiliser /api/pro)
    if (token.toUpperCase() === "PRO") {
      const url = `${APPSCRIPT_WEBAPP}?page=pro`;
      return res.redirect(302, url);
    }

    return res.status(400).send("Token ?go inconnu");
  } catch (e) {
    return res.status(500).send("Erreur go.js: " + e);
  }
}
