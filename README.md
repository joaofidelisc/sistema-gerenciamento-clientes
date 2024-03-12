# Projeto de Gerenciamento de Clientes

Projeto desenvolvido com React, Node.js, Express e Python, incluindo:
- Sistema de gerenciamento de clientes;
- Cálculo da melhor rota para visitas (algoritmo genético para o problema do caixeiro viajante).

Vídeo explicativo sobre o sistema:
- https://drive.google.com/file/d/1PjjlQO5gTq_fvc23L_lMScwWihEib169/view?usp=sharing  
  
Como executar o projeto:  
1º) Clone o repositório: git clone https://github.com/joaofidelisc/sistema-gerenciamento-clientes.git  
 - **IMPORTANTE** - **O projeto deve ser executado na branch "DEV"**
   
2º) Instale as dependências:  
 - Front-end: cd front-end && npm install  
 - Back-end: cd back-end && npm install
   
3º) Inicie os contêineres Docker: 
 - Acesse o diretório sistema-gerenciamento-clientes\backend\src
 - Execute o comando docker-compose up -d  
4º) Acesse o terminal do contêiner do backend: docker exec -it backend-sistema bash  
5º) Conecte-se ao banco de dados PostgreSQL: psql -U postgres -d gerenciaclientes  
6º) Crie as tabelas:  
``` sql
CREATE TABLE cliente (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL UNIQUE,
 telefone VARCHAR(20) NOT NULL,
 localizacao VARCHAR(10) NOT NULL
);

CREATE TABLE colaborador (
 id SERIAL PRIMARY KEY,
 nome VARCHAR(100) NOT NULL,
 email VARCHAR(100) NOT NULL UNIQUE,
 senha VARCHAR(100) NOT NULL
);
```
7º) Insira dados de clientes (opcional):  
``` sql
INSERT INTO cliente (nome, email, telefone, localizacao) VALUES
('Usuário Cliente 1', 'cliente1@email.com', '(11) 1111-1111', '(1, 1)'),
('Usuário Cliente 2', 'cliente2@email.com', '(22) 2222-2222', '(2, 2)'),
('Usuário Cliente 3', 'cliente3@email.com', '(33) 3333-3333', '(3, 3)'),
('Usuário Cliente 4', 'cliente4@email.com', '(44) 4444-4444', '(4, 4)'),
('Usuário Cliente 5', 'cliente5@email.com', '(55) 5555-5555', '(5, 5)');
```
8º) Inicie o front-end: cd front-end && npm start  
9º) Cadastre um colaborador pelo front-end para fazer login no sistema

Sobre o algoritmo genético:
O algoritmo genético implementado em Python resolve o problema do caixeiro viajante, buscando a rota mais eficiente para visitar um conjunto de clientes. O algoritmo utiliza:
- Representação baseada em índices dos clientes;
- Operadores de seleção, cruzamento e mutação;
- Gerações para convergir para uma solução ótima ou próxima disso.

