const mysql = require("mysql");

async function register(req, res) {
  const { name, email, password, admin } = req.body;
  if (!name || !email | !password) {
    return res
      .status(400)
      .json({ message: "User info is not complete", status: 400 });
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
      console.log("BASE DE DATOS CONECTADA");

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
            //   Agrega usuraio admin
            connection.query(
              "INSERT INTO `movies_db`.`users` (`name`, `email`, `password`, `admin`) VALUES " +
                "(" +
                [
                  mysql.escape(name),
                  mysql.escape(email),
                  mysql.escape(password),
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

          if(results.length === 0) {
            connection.query(
              "INSERT INTO `movies_db`.`users` (`name`, `email`, `password`) VALUES " +
                "(" +
                [
                  mysql.escape(name),
                  mysql.escape(email),
                  mysql.escape(password),
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
  });
}

module.exports = { register };
