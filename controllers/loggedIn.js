const db = require("../routes/db-config");

const loggedIn = (req, res, next) => {
  if (!req.cookies.userRegistered) return;
};

module.exports = loggedIn;
