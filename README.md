# Les Acacias – routes pro/orga (Vercel)

Ce dossier ajoute des routes propres **/pro, /orga/:event_id, /dashboard/:pid, /event/...**
qui redirigent (307) vers ta **WebApp Apps Script**.

## 1) Configure `config.js`
Ouvre `config.js` et remplace la valeur de `WEBAPP_URL` par l'URL **/exec** de ta WebApp Apps Script :

```js
exports.WEBAPP_URL = "https://script.google.com/macros/s/AKfycbx.../exec";
```

## 2) Déploie sur Vercel
Commit/push sur GitHub → Vercel déploie → Teste :
- `/pro` → liste pro
- `/orga/EV123` → page Orga pour l’évènement EV123
- `/dashboard/P001` → dashboard joueur
- `/event/EV123` (ou `/event/EV123/P001`) → page publique

> Les paramètres additionnels (ex: `?days=120`) sont préservés par les handlers.

## Notes
- On **ne touche pas** à votre `/api/go` existant.
- Si l’accès pro affiche “Accès réservé”, vérifie la feuille **Admin** (email, role=pro, actif=TRUE).
