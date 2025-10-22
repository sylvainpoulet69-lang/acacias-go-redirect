import { APPSCRIPT_WEBAPP } from "./config.js";

export default async function handler(req, res) {
  const url = `${APPSCRIPT_WEBAPP}?page=pro`;
  return res.redirect(302, url);
}
