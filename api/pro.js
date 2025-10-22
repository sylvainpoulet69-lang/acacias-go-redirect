const { APPSCRIPT_WEBAPP } = require("./config");

module.exports = (req, res) => {
  const url = `${APPSCRIPT_WEBAPP}?page=pro`;
  return res.redirect(302, url);
};
