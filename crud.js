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

const properties = [
  {
    id: 0,
    proprietario: "Alessandro Oliver Andrade",
    nome_casa: "residencial multfamiliar",
    endereco: "Nova vitoria,80 - Zona Leste",
    contato: "92992232715",
    status: "Em negociação",
    valor_imovel: "100000",
    valor_compra: "150000",
    comissao: "20",
    descricao:
      "250m²: 2 quartos sendo 1 suíte, garagem para 2 carros, banheiro social e área gourmet",
  },
  {
    id: 1,
    proprietario: "Mateus de Santos Cunha",
    nome_casa: "residencia familiar",
    endereco: "Av Autaz Mirim , 70 - Distrito 2",
    contato: "92992233715",
    status: "Disponível",
    valor_imovel: "100000",
    valor_compra: "150000",
    comissao: "10",
    descricao:
      "270m²: 3 quartos sendo 2 suítes, garagem para 4 carros, banheiro social, piscina e área gourmet",
  },
  {
    id: 2,
    proprietario: "Rosana Silva Lira",
    nome_casa: "duplex",
    endereco: "Armando Mendes,50 - Distrito 1",
    contato: "92992233715",
    status: "Vendido",
    valor_imovel: "270000",
    valor_compra: "160000",
    comissao: "70",
    descricao:
      "300m²: 2 quartos e 1 suíte, banheiro social, garagem para 1 carro, escritório",
  },
];

const pedidos = [
  {
    id: 0,
    nome_fornecedor: "Alessandro Oliver Andrade",
    data_pedido: "residencial multfamiliar",
    nome_produto: "Nova vitoria,80 - Zona Leste",
    quantidade: "92992232715",
    valor_total: "Em negociação",
    status_pedido: "100000",
  },
  {
    id: 1,
    nome_fornecedor: "Alessandro Oliver Andrade",
    data_pedido: "residencial multfamiliar",
    nome_produto: "Nova vitoria,80 - Zona Leste",
    quantidade: "92992232715",
    valor_total: "Em negociação",
    status_pedido: "100000",
  },
  {
    id: 2,
    nome_fornecedor: "Alessandro Oliver Andrade",
    data_pedido: "residencial multfamiliar",
    nome_produto: "Nova vitoria,80 - Zona Leste",
    quantidade: "92992232715",
    valor_total: "Em negociação",
    status_pedido: "100000",
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

// 03-  CRUD DE IMOVEIS

server.get("/imoveis", (req, res) => {
  let imoveis = properties.reduce((list, sub) => list.concat(sub), []);
  return res.json(imoveis);
}); // rota para listar todos os Imoveis

server.post("/imoveis", (req, res) => {
  const {
    proprietario,
    nome_casa,
    endereco,
    contato,
    status,
    valor_imovel,
    valor_compra,
    comissao,
    descricao,
  } = req.body;

  let ultimo = properties[properties.length - 1];
  let id_numnber = ultimo.id;

  const imoveis_registers = {
    id: id_numnber + 1,
    proprietario,
    nome_casa,
    endereco,
    contato,
    status,
    valor_imovel,
    valor_compra,
    comissao,
    descricao,
  };
  properties.push(imoveis_registers);
  return res.json(properties); // retorna a informação da variavel properties
});

server.put("/imoveis/:id", (req, res) => {
  const { id } = req.params; // recupera o index com os dados
  const {
    proprietario,
    nome_casa,
    endereco,
    contato,
    status,
    valor_imovel,
    valor_compra,
    comissao,
    descricao,
  } = req.body;

  const id_number = parseInt(id);

  const result = {
    id: id_number,
    proprietario,
    nome_casa,
    endereco,
    contato,
    status,
    valor_imovel,
    valor_compra,
    comissao,
    descricao,
  };

  properties[id] = result; // sobrepõe/edita o index obtido na rota de acordo com o novo valor

  return res.json(properties);
}); // retorna novamente os properties atualizados após o update

server.delete("/imoveis/:id", (req, res) => {
  const { id } = req.params; // recupera o id com os dados

  const id_number = parseInt(id);

  const idParaRemover = id_number; // o id que queremos remover
  const indexParaRemover = properties.findIndex(
    (propriedade) => propriedade.id === idParaRemover
  );
  if (indexParaRemover !== -1) {
    properties.splice(indexParaRemover, 1);
  }

  return res.send({ sucesso: "excluido com sucesso", id_number });
}); // retorna os dados após exclusão

server.listen(3000);
