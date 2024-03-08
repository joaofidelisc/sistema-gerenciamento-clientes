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
      console.log("ERROR.CODE", error.code, typeof(error.code))
      if (error.code === '23505') {
        res.status(400).json({ error: "E-mail já cadastrado." });
      } else {
        res.status(500).json({ error: "Erro ao criar novo cliente." });
      }
    }
  },
};

module.exports = clienteController;
