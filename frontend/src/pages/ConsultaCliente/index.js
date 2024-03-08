import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.js";
import "react-toastify/dist/ReactToastify.css";
import { Table, InputGroup, FormControl, Modal, Button } from "react-bootstrap";

import "./styles.css";

function ConsultaCliente() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    email: "",
    nome: "",
    telefone: "",
  });
  const [editedUser, setEditedUser] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const filteredUsers = users.filter((user) => {
    return (
      user.email.includes(filter.email) &&
      user.nome.includes(filter.nome) &&
      user.telefone.includes(filter.telefone)
    );
  });

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  const otimizarRota = async () => {
    setIsCalculating(true);
    try {
      const response = await fetch("http://localhost:8000/api/calcular-rota", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(users),
      });

      if (response.ok) {
        const data = await response.json();
        setOptimizedRoute(data.data.data);
        setShowModal(true);
      } else {
        console.error("Não foi possível otimizar a rota.");
      }
    } catch (error) {
      console.error("Erro ao otimizar rota:", error);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/api/clientes/listar-clientes");
  }, []);

  return (
    <div>
      <NavBar />
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary consulta_container_externo">
        <div className="consulta_container p-5 rounded bg-white">
          <h3 className="text-center">Consulta de clientes</h3>
          <div className="filtro-container mb-3">
            <InputGroup>
              <FormControl
                type="text"
                placeholder="Filtrar por E-mail"
                name="email"
                value={filter.email}
                onChange={handleFilterChange}
              />
              <FormControl
                type="text"
                placeholder="Filtrar por Nome"
                name="nome"
                value={filter.nome}
                onChange={handleFilterChange}
              />
              <FormControl
                type="text"
                placeholder="Filtrar por Telefone"
                name="telefone"
                value={filter.telefone}
                onChange={handleFilterChange}
              />
            </InputGroup>
          </div>
          <div className="lista-clientes">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nome</th>
                  <th>Telefone</th>
                  <th>Localização</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      {editedUser?.id === user.id ? (
                        <FormControl
                          type="text"
                          name="email"
                          value={editedUser.email}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editedUser?.id === user.id ? (
                        <FormControl
                          type="text"
                          name="nome"
                          value={editedUser.nome}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.nome
                      )}
                    </td>
                    <td>
                      {editedUser?.id === user.id ? (
                        <FormControl
                          type="text"
                          name="telefone"
                          value={editedUser.telefone}
                          onChange={handleInputChange}
                        />
                      ) : (
                        user.telefone
                      )}
                    </td>
                    <td>{user.localizacao}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {isCalculating ? (
              <p>Calculando rota...</p> // Você pode substituir isso por um componente de spinner, se preferir
            ) : (
              <Button variant="primary" onClick={otimizarRota}>
                Otimizar Rota
              </Button>
            )}
            <Modal
              show={showModal}
              onHide={() => setShowModal(false)}
              size="lg"
            >
              <Modal.Header closeButton>
                <Modal.Title>Melhor Rota</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="modal-table-responsive">
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Localização</th>
                      </tr>
                    </thead>
                    <tbody>
                      {optimizedRoute.map((cliente, index) => (
                        <tr key={index}>
                          <td>{cliente.nome}</td>
                          <td>{cliente.email}</td>
                          <td>{cliente.telefone}</td>
                          <td>{cliente.localizacao}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>
                  Fechar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultaCliente;
