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

  updateClientByEmail: async (nome, email, telefone, localizacao) => {
    try {
      const query =
        "UPDATE cliente SET nome = $1, email = $2, telefone = $3, localizacao = $4 WHERE email = $5 RETURNING *";
      const values = [nome, email, telefone, localizacao];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  deleteClientByEmail: async (clientId) => {
    try {
      const query = "DELETE FROM cliente WHERE email = $1";
      const values = [clientId];
      await db.query(query, values);
    } catch (error) {
      throw error;
    }
  },

  getClientByEmail: async (email) => {
    try {
      const query = "SELECT * FROM cliente WHERE email = $1";
      const values = [email];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  getClientByNome: async (nome) => {
    try {
      const query = "SELECT * FROM cliente WHERE nome = $1";
      const values = [nome];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  getClientByTelefone: async (telefone) => {
    try {
      const query = "SELECT * FROM cliente WHERE telefone = $1";
      const values = [telefone];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ClienteModel;
