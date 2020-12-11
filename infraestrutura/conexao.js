const mysql = require("mysql");

const connection = mysql.createConnection({
  user: "root",
  host: "localhost",
  port: 3306,
  password: "admin",
  database: "agenda-petshop",
});

module.exports = connection;
