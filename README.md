# Redirection Vercel → Apps Script

## Paramètre attendu
- `go=PID` → redirige vers `WEBAPP?pid=PID`
- `go=PID:EVENT_ID` → redirige vers `WEBAPP?event_id=EVENT_ID&pid=PID`

## Fichiers
- `api/go.js` — endpoint serverless qui redirige selon le paramètre `go`
- `vercel.json` — routes (inclut aussi `/?go=...`)
- `package.json` — optionnel (Node 18+)

## À faire après import dans Vercel
- (Facultatif mais recommandé) Créer une variable d'environnement `WEBAPP_EXEC_URL` = l'URL `/exec` de votre Apps Script, puis adapter `api/go.js` pour la lire au lieu de la valeur codée en dur.
