const mysql = require("mysql");
const connection = require("../../database/database");
const Joi = require("joi");
const bcrypt = require("bcrypt");

// Validate inputs
const schemaRegister = Joi.object({
  name: Joi.string().min(6).max(255).required(),
  email: Joi.string().min(6).max(255).required().email(),
  password: Joi.string().min(6).max(1024).required(),
  admin: Joi.number().min(1),
});

async function register(req, res) {
  const { error } = schemaRegister.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(req.body.password, salt);

  const { name, email, password, admin } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "La informacion del usuario está incompleta",
      status: 400,
    });
  }
    connection.query(
        "SELECT * FROM movies_db.users WHERE email =" + mysql.escape(email),
        function (error, results) {
          if (error) throw error;

          if (results.length > 0) {
            return res
              .status(400)
              .json({ message: "El usuario ya está registrado", status: 400 });
          }

          if (results.length === 0 && admin === 1) {
            // Add a new admin User
            connection.query(
              "INSERT INTO `movies_db`.`users` (`name`, `email`, `password`, `admin`) VALUES " +
                "(" +
                [
                  mysql.escape(name),
                  mysql.escape(email),
                  mysql.escape(passwordHash),
                  mysql.escape(admin),
                ] +
                ")",
              function (error, results) {
                if (error) throw error;
              }
            );
            return res
              .status(200)
              .json({ message: "Usuario admin registrado", status: 200 });
          }

          if (results.length === 0) {
            // Add a new user
            connection.query(
              "INSERT INTO `movies_db`.`users` (`name`, `email`, `password`) VALUES " +
                "(" +
                [
                  mysql.escape(name),
                  mysql.escape(email),
                  mysql.escape(passwordHash),
                ] +
                ")",
              function (error, results) {
                if (error) throw error;
              }
            );
            return res
              .status(200)
              .json({ message: "Usuario común registrado", status: 200 });
          }
        }
    );
}

module.exports = { register };
