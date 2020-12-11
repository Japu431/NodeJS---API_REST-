const mysql = require("mysql");

("ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'admin' ");

const conexao = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "admin",
  database: "agenda-petshop",
});

module.exports = conexao;
