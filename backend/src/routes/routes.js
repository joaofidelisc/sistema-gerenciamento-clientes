const express = require('express');
const routes = express.Router();

const clienteController = require('../controllers/ClienteController');
const colaboradorController = require('../controllers/ColaboradorController');


//Rotas do cliente
routes.get("/api/clientes/listar-clientes", clienteController.getAllClients);
routes.post("/api/clientes/inserir-cliente", clienteController.createNewClient);
routes.put("/api/clientes/atualizar-cliente-por-email", clienteController.updateClientByEmail);
routes.post("/api/clientes/remover-por-email", clienteController.deleteClientByEmail);
routes.get("/api/clientes/listar-cliente-por-email/:email", clienteController.getClientByEmail);
routes.get("/api/clientes/listar-cliente-por-nome/:nome", clienteController.getClientByNome);
routes.get("/api/clientes/listar-cliente-por-telefone/:telefone", clienteController.getClientByTelefone);

//Rotas do colaborador
routes.get("/api/colaborador/listarcolaboradores")


module.exports = routes;
