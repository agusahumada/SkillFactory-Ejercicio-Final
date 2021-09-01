const mysql = require("mysql");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const schemaLogin = Joi.object({
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
});

async function login(req, res) {
  const { error } = schemaLogin.validate(req.body);
  
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      message: "La informacion del usuario está incompleta",
      status: 400,
    });
  }


  const connection = mysql.createConnection({
    host: "localhost",
    database: "movies_db",
    user: "root",
    password: "",
  });

  connection.connect(function (error) {
    if (error) {
      throw error;
    } else {
      const user = connection.query(
        "SELECT * FROM movies_db.users WHERE email =" + mysql.escape(email),
        async function (error, results) {
          if (error) throw error;
          //   validacion de email
          if (results.length === 0) {
            return res
              .status(400)
              .json({ message: "Usuario no registrado", status: 400 });
          }
         
          //   validacion de password QUE NO ANDA
          const passValid = await bcrypt.compare(
            password,
            results[0].password
          );
       
          if (!passValid)
            return res
              .status(400)
              .json({ error: true, message: "Contraseña inválida" });

          res.json({
            error: null,
            message: "Bienvenido",
          });
        }
      );
    }
  });
}

module.exports = { login };
