const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "gerenciaclientes",
  password: "admin",
  port: 5432,
});

client.connect();

module.exports = client;
