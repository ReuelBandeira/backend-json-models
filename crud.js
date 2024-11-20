const express = require("express");

const server = express();

const cors = require("cors");

server.use(cors()); // autenticação das rotas para o frontend

server.use(express.json()); // faz com que o express entenda JSON

const users = [
  {
    id: 0,
    usuario: "arianny.soares",
    nome: "Arianny Soares Costa",
    endereco: "Av Autaz Mirim , 282 - Cidade Nova",
    contato: "9299233778",
    cidade: "Manaus",
    estado: "Amazonas",
    creci: "5480",
    senha: "123456",
  },
  {
    id: 1,
    usuario: "leonardo.souza",
    nome: "Leonardo da Silva Souza",
    endereco: "BR 319, KM 13 - Centro",
    contato: "92905857896",
    cidade: "Manaus",
    estado: "Amazonas",
    creci: "1205",
    senha: "654321",
  },
  {
    id: 2,
    usuario: "ana.brito",
    nome: "Ana Pacheco Brito",
    endereco: "Av das Flores ,785 - Cidade Nova",
    contato: "92980857896",
    cidade: "Manaus",
    estado: "Amazonas",
    creci: "1205",
    senha: "252525",
  },
];

const pedidos = [
  {
    id: 0,
    nome_fornecedor: "dasmasceno speed",
    data_pedido: "31/12/2024",
    nome_produto: "produto teste A",
    quantidade: 10,
    valor_total: "238,00",
    status_pedido: "em andamento",
  },
  {
    id: 1,
    nome_fornecedor: "Alessandro Oliver Andrade",
    data_pedido: "31/12/2024",
    nome_produto: "agricula",
    quantidade: 5,
    valor_total: "100,00",
    status_pedido: "concluido",
  },
  {
    id: 2,
    nome_fornecedor: "Carlos mult andrade",
    data_pedido: "31/12/2024",
    nome_produto: "bicicleta",
    quantidade: "15",
    valor_total: "5000",
    status_pedido: "em andamento",
  },
];

// 0 - MIDDLEWARE GLOBAL

server.use((req, res, next) => {
  // server.use cria o middleware global
  console.time("Request"); // marca o início da requisição
  console.log(`Método: ${req.method}; URL: ${req.url}; `); // retorna qual o método e url foi chamada

  next(); // função que chama as próximas ações

  console.log("Finalizou"); // será chamado após a requisição ser concluída

  console.timeEnd("Request"); // marca o fim da requisição
});

//  01 - CRUD DE USUARIOS

server.get("/usuarios", (req, res) => {
  let users_teste = users.reduce((list, sub) => list.concat(sub), []);
  return res.json(users_teste);
}); // rota para listar todos os usuarios

server.post("/users", (req, res) => {
  const { usuario, nome, endereco, contato, cidade, estado, creci, senha } = req.body;
  let ultimo = users[users.length - 1];
  let id_numnber = ultimo.id;
  const result = {
    id: id_numnber + 1,
    usuario,
    nome,
    endereco,
    contato,
    cidade,
    estado,
    creci,
    senha,
  };
  users.push(result);
  return res.json(users);
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados
  const { usuario, nome, endereco, contato, cidade, estado, creci, senha } = req.body;
  const id_number = parseInt(id);

  const result = {
    id: id_number,
    usuario,
    nome,
    endereco,
    contato,
    cidade,
    estado,
    creci,
    senha,
  };

  users[id] = result; // sobrepõe/edita o index obtido na rota de acordo com o novo valor

  return res.json(users);
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados

  const id_number = parseInt(id);

  const idParaRemover = id_number; // o id que queremos remover
  const indexParaRemover = users.findIndex(
    (propriedade) => propriedade.id === idParaRemover
  );
  if (indexParaRemover !== -1) {
    users.splice(indexParaRemover, 1);
  }

  return res.send({ sucesso: "cadstro de usuario excluido com sucesso", id_number });
}); // retorna os dados após exclusão

//  02 - VALIDAÇÃO LOGINS

server.get("/login/users", (req, res) => {
  const { usuario, senha } = req.body;

  let login_sucesso = users.filter(function (item) {
    return item.usuario == usuario && item.senha == senha;
  });

  if (login_sucesso.length != 0) {
    console.log("login realizado com sucesso!");
    return res.json({ sucesso: "login realizado com sucesso!" });
  } else {
    console.log("problemas com autenticação!");
    return res.status(400).json({ error: "problemas com autenticação!" });
  }
});

// 02 - VALIDAÇÃO LOGINS
server.post("/login/users", (req, res) => {
  const { usuario, senha } = req.body;

  let login_sucesso = users.filter((item) => {
    return item.usuario === usuario && item.senha === senha;
  });

  if (login_sucesso.length !== 0) {
    console.log("login realizado com sucesso!");
    return res.json({ sucesso: "login realizado com sucesso!" });
  } else {
    console.log("problemas com autenticação!");
    return res.status(400).json({ error: "problemas com autenticação!" });
  }
});

// 03-  CRUD DE PEDIDOS
server.get("/orders", (req, res) => {
  let orders = pedidos.reduce((list, sub) => list.concat(sub), []);
  return res.json(orders);
}); // rota para listar todos os pedidos

server.post("/orders", (req, res) => {
  const {
    nome_fornecedor,
    data_pedido,
    nome_produto,
    quantidade,
    valor_total,
    status_pedido,
  } = req.body;

  let ultimo = pedidos[pedidos.length - 1];
  let id_numnber = ultimo.id;

  const orders_registers = {
    id: id_numnber + 1,
    nome_fornecedor,
    data_pedido,
    nome_produto,
    quantidade,
    valor_total,
    status_pedido,
  };
  pedidos.push(orders_registers);
  return res.json(pedidos); // retorna a informação da variavel pedidos
});

server.put("/orders/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados
  const {
    nome_fornecedor,
    data_pedido,
    nome_produto,
    quantidade,
    valor_total,
    status_pedido,
  } = req.body;

  const id_number = parseInt(id);

  const result = {
    id: id_number,
    nome_fornecedor,
    data_pedido,
    nome_produto,
    quantidade,
    valor_total,
    status_pedido,
  };

  pedidos[id] = result; // sobrepõe/edita o index obtido na rota de acordo com o novo valor

  return res.json(pedidos);
}); // retorna novamente os pedidos atualizados após o update

server.delete("/orders/:id", (req, res) => {
  const { id } = req.params; // recupera o id com os dados

  const id_number = parseInt(id);

  const idParaRemover = id_number; // o id que queremos remover
  const indexParaRemover = pedidos.findIndex(
    (propriedade) => propriedade.id === idParaRemover
  );
  if (indexParaRemover !== -1) {
    pedidos.splice(indexParaRemover, 1);
  }

  return res.send({ sucesso: "excluido com sucesso", id_number });
}); // retorna os dados após exclusão

server.listen(3000);
