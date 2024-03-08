const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const routes = express.Router();

routes.use(express.json());

const clienteController = require("../controllers/ClienteController");
const colaboradorController = require("../controllers/ColaboradorController");

//Rotas do cliente
routes.get("/api/clientes/listar-clientes", clienteController.getAllClients);
routes.post("/api/clientes/inserir-cliente", clienteController.createNewClient);

//Rotas do colaborador
routes.get("/api/colaboradores/listar-colaboradores", colaboradorController.getAllCollaborators);
routes.post("/api/colaboradores/inserir-colaborador", colaboradorController.createNewCollaborator);

//Rota de login
routes.post("/api/login", colaboradorController.loginUser);

routes.post("/api/calcular-rota", (req, res) => {
  const clientes = req.body;
  const pythonScriptPath = path.join(__dirname, "..", "services", "tsm.py");
  const pythonProcess = spawn('python', [pythonScriptPath]);

  pythonProcess.stdout.on('data', (data) => {
      res.status(200).json({ message: "Função Python chamada com sucesso", data: JSON.parse(data) });
  });

  pythonProcess.stderr.on('data', (data) => {
      console.error(`Erro na execução do script Python: ${data}`);
      res.status(500).json({ error: "Erro ao chamar a função Python" });
  });

  pythonProcess.stdin.write(JSON.stringify(clientes));
  pythonProcess.stdin.end();
});

module.exports = routes;
