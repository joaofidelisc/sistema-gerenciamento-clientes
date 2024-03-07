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
      console.log("ERROR.CODE", error.code, typeof(error.code))
      if (error.code === '23505' && error.constraint === 'colaborador_email_key') {
        res.status(400).json({ error: "E-mail já cadastrado." });
      } else {
        res.status(500).json({ error: "Erro ao criar novo colaborador." });
      }
    }
  },
};

module.exports = colaboradorController;
