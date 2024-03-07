const db = require("../config/db");

const ColaboradorModel = {
  getAllCollaborators: async () => {
    try {
      const query = "SELECT * FROM colaborador";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  createNewCollaborator: async (nome, email, senha) => {
    try {
      const query =
        "INSERT INTO colaborador (nome, email, senha) VALUES ($1, $2, $3) RETURNING *";
      const values = [nome, email, senha];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ColaboradorModel;
