const moment = require("moment");

const connection = require("../infraestrutura/conexao");

class Atendimento {
  adiciona(atendimento, res) {
    const dataCriacao = moment().format("YYYY-MM-DD HH:mm:ss");
    const data = moment(atendimento.data, "DD/MM/YYYY").format(
      "YYYY-MM-DD HH:mm:ss"
    );

    const dataValida = moment(data).isSameOrAfter(dataCriacao);

    const clienteValido = atendimento.cliente.length >= 5;

    const validacao = [
      {
        nome: "data",
        valido: dataValida,
        mensagem: "Data deve ser maior ou igual a data atual",
      },
      {
        nome: "cliente",
        valido: clienteValido,
        mensagem: "Cliente deve ter pelo menos cinco caracteres",
      },
    ];

    const erros = validacao.filter((campo) => !campo.valido);

    const existemErros = erros.length;

    if (existemErros) {
      res.status(400).json(erros);
    } else {
      const atendimentoDatado = { ...atendimento, dataCriacao, data };

      const sql = `INSERT INTO Atendimentos SET ?`;

      connection.query(sql, atendimentoDatado, (err, result) => {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(201).json(atendimento);
        }
      });
    }
  }

  lista(res) {
    const sql = "SELECT * FROM Atendimentos";

    connection.query(sql, (err, resultados) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(resultados);
      }
    });
  }

  buscaPorID(id, res) {
    const sql = `SELECT * FROM Atendimentos WHERE id=${id}`;

    connection.query(sql, (err, resultados) => {
      const atendimento = resultados[0];

      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(atendimento);
      }
    });
  }

  altera(id, valores, res) {
    if (valores.data) {
      valores.data = moment(valores.data, "DD/MM/YYYY").format(
        "YYYY-MM-DD HH:mm:ss"
      );
    }
    const sql = "UPDATE Atendimentos SET ? WHERE id=?";

    connection.query(sql, [valores, id], (err, resultados) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ ...valores, id });
      }
    });
  }

  deleta(id, res) {
    const sql = "DELETE FROM Atendimentos WHERE id=?";

    connection.query(sql, id, (err, resultados) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ id });
      }
    });
  }
}

module.exports = new Atendimento();
