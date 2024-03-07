import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar.js";
import "react-toastify/dist/ReactToastify.css";
import {
  Table,
  InputGroup,
  FormControl,
} from "react-bootstrap";

import "./styles.css";

function ConsultaColaborador() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState({
    email: "",
    nome: "",
  });
  const [editedUser, setEditedUser] = useState(null);

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
      user.nome.includes(filter.nome)
    );
  });

  const fetchData = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar colaboradores:", error);
    }
  };

  useEffect(() => {
    fetchData("http://localhost:8000/api/colaboradores/listar-colaboradores");
  }, []);

  return (
    <div>
      <NavBar />
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary consulta_container_externo">
        <div className="consulta_container p-5 rounded bg-white">
          <h3 className="text-center">Consulta de colaboradores</h3>
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
            </InputGroup>
          </div>
          <div className="lista-clientes">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nome</th>
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
