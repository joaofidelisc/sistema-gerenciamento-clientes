const db = require("../config/db");

const ClienteModel = {
  getAllClients: async () => {
    try {
      const query = "SELECT * FROM cliente";
      const result = await db.query(query);
      return result.rows;
    } catch (error) {
      throw error;
    }
  },

  createNewClient: async (nome, email, telefone, localizacao) => {
    try {
      const query =
        "INSERT INTO Cliente (nome, email, telefone, localizacao) VALUES ($1, $2, $3, $4) RETURNING *";
      const values = [nome, email, telefone, localizacao];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ClienteModel;
