const db = require("../routes/db-config");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { email, password: Npassoword } = req.body;
  if (!email || !Npassoword)
    return res.json({
      status: "error",
      error: "Please enter your email and password",
    });
  else {
    db.query(
      "SELECT email FROM users WHERE email = ?",
      [email],
      async (err, result) => {
        if (err) throw err;
        if (result[0])
          return res.json({
            status: "error",
            error: "Email has already been registered",
          });
        else {
          const password = await bcrypt.hash(Npassoword, 8);
          db.query(
            "INSERT INTO users SET ?",
            { email: email, password: password },
            (error, results) => {
              if (error) throw error;
              return res.json({
                status: "success",
                success: "User has been registered",
              });
            }
          );
        }
      }
    );
  }
};

module.exports = register;
