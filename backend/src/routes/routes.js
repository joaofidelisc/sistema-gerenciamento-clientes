const express = require("express");
const { exec } = require("child_process");
const path = require("path");
const routes = express.Router();

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

routes.get("/api/calcular-rota", (req, res) => {
 const pythonScriptPath = path.join(__dirname, "..", "services", "tsm.py");
 console.log("Entrou na rota")
 exec(`python "${pythonScriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Erro ao executar o comando: ${error.message}`);
      res.status(500).json({ error: "Erro ao chamar a função Python" });
      return;
    }

    if (stderr) {
      console.error(`Erro na execução do script Python: ${stderr}`);
      res.status(500).json({ error: "Erro ao chamar a função Python" });
      return;
    }

    console.log(`Saída do script Python: ${stdout}`);
    res.status(200).json({ message: "Função Python chamada com sucesso" });
 });
});

module.exports = routes;
