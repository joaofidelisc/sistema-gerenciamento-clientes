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
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(100) NOT NULL
);

INSERT INTO cliente (nome, email, telefone, localizacao) VALUES
('Usuário Cliente 1', 'cliente1@email.com', '(11) 1111-1111', '(1, 1)'),
('Usuário Cliente 2', 'cliente2@email.com', '(22) 2222-2222', '(2, 2)'),
('Usuário Cliente 3', 'cliente3@email.com', '(33) 3333-3333', '(3, 3)'),
('Usuário Cliente 4', 'cliente4@email.com', '(44) 4444-4444', '(4, 4)'),
('Usuário Cliente 5', 'cliente5@email.com', '(55) 5555-5555', '(5, 5)');

DELETE FROM colaborador;
DELETE FROM cliente;

ALTER SEQUENCE colaborador_id_seq RESTART WITH 1;
ALTER SEQUENCE cliente_id_seq RESTART WITH 1;

psql -U admin -d gerenciaclientes
\l lista todos os bancos de dados;
\dt lista todas as tabelas;
\d mostra as características de uma tabela;
\dn lista todos os schmas;