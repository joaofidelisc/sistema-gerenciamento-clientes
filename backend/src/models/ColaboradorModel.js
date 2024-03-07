const db = require("../config/db");
const bcrypt = require("bcrypt");

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
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);

      const hashedSenha = await bcrypt.hash(senha, salt);

      const query =
        "INSERT INTO colaborador (nome, email, senha) VALUES ($1, $2, $3) RETURNING *";
      const values = [nome, email, hashedSenha];
      const result = await db.query(query, values);
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  },

  authenticateUser: async (email, senha) => {
    try {
      const query = "SELECT * FROM colaborador WHERE email = $1";
      const result = await db.query(query, [email]);
      if (result.rows.length === 0) {
        return null;
      }
      const user = result.rows[0];
      const passwordMatch = await bcrypt.compare(senha, user.senha);
      if (passwordMatch) {
        return user;
      } else {
        return null;
      }
    } catch (error) {
      throw error;
    }
  },
};

module.exports = ColaboradorModel;
