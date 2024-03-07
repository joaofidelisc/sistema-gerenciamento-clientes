const ClienteModel = require("../models/ClienteModel");

const clienteController = {
  getAllClients: async (req, res) => {
    try {
      const clients = await ClienteModel.getAllClients();
      res.status(200).json(clients);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de clientes." });
    }
  },

  createNewClient: async (req, res) => {
    const { nome, email, telefone, localizacao } = req.body;
    try {
      const newClient = await ClienteModel.createNewClient(
        nome,
        email,
        telefone,
        localizacao
      );
      res.status(201).json(newClient);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar novo cliente." });
    }
  },

  updateClientByEmail: async (req, res) => {
    const clientEmail = req.params.email;
    const { nome, email, telefone, localizacao } = req.body;
    try {
      const updatedClient = await ClienteModel.updateClientByEmail(
        nome,
        email,
        telefone,
        localizacao,
        clientEmail 
      );
      res.status(200).json(updatedClient);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar cliente." });
    }
  },
  
  deleteClientByEmail: async (req, res) => {
    const clientEmail = req.params.email;
    try {
      await ClienteModel.deleteClientByEmail(clientEmail);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao excluir cliente." });
    }
  },

  getClientByNome: async (req, res) => {
    const nome = decodeURIComponent(req.params.nome);
    try {
      const client = await ClienteModel.getClientByNome(nome);
      if (!client) {
        res.status(404).json({ error: "Cliente não encontrado." });
      } else {
        res.status(200).json(client);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente." });
    }
  },

  getClientByEmail: async (req, res) => {
    const email = req.params.email;
    try {
      const client = await ClienteModel.getClientByEmail(email);
      if (!client) {
        res.status(404).json({ error: "Cliente não encontrado." });
      } else {
        res.status(200).json(client);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente." });
    }
  },

  getClientByTelefone: async (req, res) => {
    const telefone = decodeURIComponent(req.params.telefone);
    try {
      const client = await ClienteModel.getClientByTelefone(telefone);
      if (!client) {
        res.status(404).json({ error: "Cliente não encontrado." });
      } else {
        res.status(200).json(client);
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter cliente." });
    }
  },
};

module.exports = clienteController;
