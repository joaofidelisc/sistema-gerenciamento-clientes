const ColaboradorModel = require("../models/ColaboradorModel");

const colaboradorController = {
  getAllCollaborators: async (req, res) => {
    try {
      const collaborators = await ColaboradorModel.getAllCollaborators();
      res.status(200).json(collaborators);
    } catch (error) {
      res.status(500).json({ error: "Erro ao obter lista de colaboradores." });
    }
  },

  createNewCollaborator: async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
      const newCollaborator = await ColaboradorModel.createNewCollaborator(
        nome,
        email,
        senha
      );
      res.status(201).json(newCollaborator);
    } catch (error) {
      console.log("ERROR.CODE", error.code, typeof error.code);
      if (
        error.code === "23505" &&
        error.constraint === "colaborador_email_key"
      ) {
        res.status(400).json({ error: "E-mail já cadastrado." });
      } else {
        res.status(500).json({ error: "Erro ao criar novo colaborador." });
      }
    }
  },

  loginUser: async (req, res) => {
    const { email, senha } = req.body;
    try {
      const authenticatedUser = await ColaboradorModel.authenticateUser(
        email,
        senha
      );

      if (authenticatedUser) {
        res.status(200).json(authenticatedUser);
      } else {
        res.status(401).json({ error: "Credenciais inválidas." });
      }
    } catch (error) {
      res.status(500).json({ error: "Erro ao autenticar o usuário." });
    }
  },
};

module.exports = colaboradorController;
