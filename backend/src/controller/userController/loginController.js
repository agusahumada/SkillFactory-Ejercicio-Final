const mysql = require("mysql");
const connection = require("../../database/database");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
  connection.query(
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
      const passValid = await bcrypt.compare(password, results[0].password);
      if(passValid){
        const id = results[0].id;

        const token = jwt.sign(
          {id},
          process.env.SECRET_TOKEN, {
            expiresIn: 300
          });
          res.json({auth: true, token: token, results});
      }else{
        return res
          .status(400)
          .json({ error: true, message: "Contraseña inválida" });
      }
    }
  );
}

module.exports = { login };
