// /api/go.js
export default async function handler(req, res) {
  try {
    // 👉 Ton /exec actuel (tu pourras le passer en variable d'environnement plus tard)
    const WEBAPP = "https://script.google.com/macros/s/AKfycbzSHCTUeOAE3WiQwTRCG2jmw4qyrN6hAP_ZyCNuaZT39moAvsYZu_iajpQLINhDf-af/exec";

    const url = new URL(req.url, `http://${req.headers.host}`);
    const go = url.searchParams.get("go") || "";

    if (!WEBAPP || !/^https?:\/\//i.test(WEBAPP)) {
      return res.status(500).send("WEBAPP_EXEC_URL non configurée ou invalide");
    }
    if (!go) return res.status(400).send("Paramètre go manquant");

    // Formats acceptés :
    //  - "PID"              → dashboard ?pid=PID
    //  - "PID:EVENT_ID"     → évènement ?event_id=EVENT_ID&pid=PID
    const [pid, eventId] = go.split(":");

    if (pid && !eventId) {
      const target = `${WEBAPP}?pid=${encodeURIComponent(pid)}`;
      res.setHeader("Location", target);
      return res.status(302).end();
    }
    if (pid && eventId) {
      const target = `${WEBAPP}?event_id=${encodeURIComponent(eventId)}&pid=${encodeURIComponent(pid)}`;
      res.setHeader("Location", target);
      return res.status(302).end();
    }
    return res.status(400).send("Format go invalide");
  } catch (e) {
    return res.status(500).send("Erreur: " + String(e));
  }
}
