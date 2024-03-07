import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Login from "../pages/Login";
import CadastroColaborador from "../pages/CadastroColaborador";
import ConsultaColaborador from "../pages/ConsultaColaborador";
import CadastroCliente from "../pages/CadastroCliente";
import ConsultaCliente from "../pages/ConsultaCliente";

function RestrictedRoute() {
  return (
    <Routes>
      <Route exact path="/" element={<CadastroCliente />} />
      <Route exact path="/consulta-cliente" element={<ConsultaCliente />} />
      <Route exact path="/consulta-colaborador"element={<ConsultaColaborador />} />
    </Routes>
  );
}

function EntryRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route exact path="/cadastro" element={<CadastroColaborador />} />
        <Route exact path="/restrito/*" element={<RestrictedRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default EntryRoute;
