const mysql = require('mysql');
require('dotenv').config();

const {HOST, DATABASE, USER} = process.env;

 const connection = mysql.createConnection({
    host: HOST,
    database: DATABASE,
    user: USER,
    password: "",
  });

  connection.connect(function (error) {
    if (error) {
      throw error;
    } else {
        console.log('Base de datos conectada');
    }
  });

module.exports = connection;