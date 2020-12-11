const customExpress = require("./config/customExpress");
const connection = require("./infraestrutura/conexao");
const Tabelas = require("./infraestrutura/Tabelas");

connection.connect((erro) => {
  if (erro) {
    console.log(erro);
  } else {
    console.log("\n\nConectado com sucesso... !");

    Tabelas.init(connection);

    const app = customExpress();

    app.listen(3000, () => {
      console.log("\nServer is running... PORT: localhost:3000 !!!\n\n");
    });

  }
});
