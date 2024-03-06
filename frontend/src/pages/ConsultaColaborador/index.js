import React, { useState } from "react";
import NavBar from "../../components/NavBar.js";
import "react-toastify/dist/ReactToastify.css";
import { Button, Table, InputGroup, FormControl } from "react-bootstrap";

import "./styles.css";

function ConsultaColaborador() {
  const initialUsers = [
    {
      id: 1,
      email: "colaborador1@email.com",
      nome: "Colaborador 1",
      telefone: "(11) 1234-5678",
    },
    {
      id: 2,
      email: "colaborador2@email.com",
      nome: "Colaborador 2",
      telefone: "(22) 2345-6789",
    },
    {
      id: 3,
      email: "colaborador3@email.com",
      nome: "Colaborador 3",
      telefone: "(33) 3456-7890",
    },
  ];

  const [users, setUsers] = useState(initialUsers);
  const [filter, setFilter] = useState({
    email: "",
    nome: "",
    telefone: "",
  });
  const [editedUser, setEditedUser] = useState(null);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const handleEditClick = (id) => {
    const userToEdit = users.find((user) => user.id === id);
    setEditedUser(userToEdit);
  };

  const handleSaveEdit = () => {
    setEditedUser(null);
  };

  const handleCancelEdit = () => {
    setEditedUser(null);
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

  return (
    <div>
      <NavBar />
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary consulta_container_externo">
        <div className="consulta_container p-5 rounded bg-white">
          <h3 className="text-center">Consulta de colaborador</h3>
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
                  <th>Ações</th>
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
                    <td>
                      {editedUser?.id === user.id ? (
                        <>
                          <Button variant="success" onClick={handleSaveEdit}>
                            Salvar
                          </Button>
                          <Button variant="danger" onClick={handleCancelEdit}>
                            Cancelar
                          </Button>
                        </>
                      ) : (
                        <Button onClick={() => handleEditClick(user.id)}>
                          Editar
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConsultaColaborador;
