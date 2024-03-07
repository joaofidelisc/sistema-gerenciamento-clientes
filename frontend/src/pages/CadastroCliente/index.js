import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../redux/slices/userSlice";
import { useForm } from "react-hook-form";
import NavBar from "../../components/NavBar.js";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

function CadastroCliente() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const users = useSelector((state) => state.user.users);
  const currentUser = useSelector((state) => state.user.currentUser);

  const toastHandler = (message, status) => {
    if (status === "success")
      toast.success(`${message}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    else
      toast.error(`${message}`, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
  };

  const userExists = (email) => {
    return users.findIndex((user) => user.email === email);
  };

  const onSubmit = async (data) => {
    try {
      const generateRandomCoordinate = () => Math.floor(Math.random() * 100); // Gera valores de 0 a 99

      const x = generateRandomCoordinate();
      const y = generateRandomCoordinate();

      const response = await fetch(
        "http://localhost:8000/api/clientes/inserir-cliente",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: data.name,
            email: data.email,
            telefone: data.phone,
            localizacao: `(${x}, ${y})`,
          }),
        }
      );

      if (response.ok) {
        toastHandler("Cliente cadastrado", "success");
        // Adicione lógica adicional, se necessário
      } else {
        toastHandler("Falha no cadastro do cliente", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      toastHandler("Erro inesperado", "error");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary signup-container">
        <div className="form_container p-5 rounded bg-white">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="text-center">Cadastro de cliente</h3>
            <div className="mb-2">
              <label htmlFor="text">Nome</label>
              <input
                id="name"
                {...register("name", {
                  required: "Preencha o nome",
                })}
                placeholder="Digite o seu nome"
                type="text"
                className="form-control"
              />
            </div>
            {errors.name && (
              <span style={{ color: "red" }} role="alert">
                {errors.name.message}
              </span>
            )}
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                {...register("email", {
                  required: "Preencha o email",
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Email inválido",
                  },
                })}
                placeholder="Digite o seu email"
                type="email"
                className="form-control"
              />
              {errors.email && (
                <span style={{ color: "red" }} role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="mb-2">
              <label htmlFor="phone">Telefone</label>
              <input
                id="phone"
                {...register("phone", {
                  required: "Preencha o telefone",
                  pattern: {
                    value: /\(\d{2}\)\s\d{4,5}-\d{4}/,
                    message: "Telefone inválido (ex: (99) 12345-6789)",
                  },
                })}
                placeholder="(99) 12345-6789"
                type="tel"
                className="form-control"
              />
              {errors.phone && (
                <span style={{ color: "red" }} role="alert">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <div className="d-grid mt-2">
              <button className="btn btn-primary">Cadastrar</button>
            </div>
          </form>
          <ToastContainer
            autoClose={3000}
            position={toast.POSITION.BOTTOM_LEFT}
          />
        </div>
      </div>
    </div>
  );
}

export default CadastroCliente;
