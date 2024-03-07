-- Tabela para Clientes
CREATE TABLE cliente (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  telefone VARCHAR(20) NOT NULL,
  localizacao VARCHAR(10) NOT NULL
);

-- Tabela para Colaboradores
CREATE TABLE colaborador (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  senha VARCHAR(100) NOT NULL
);

psql -U admin -d gerenciaclientes

\l lista todos os bancos de dados;
\dt lista todas as tabelas;
\d mostra as características de uma tabela;
\dn lista todos os schmas;