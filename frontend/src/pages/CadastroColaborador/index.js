import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./styles.css";

function CadastroColaborador() {
  const [thereIsCurrentUser, setThereIsCurrentUser] = useState(true);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const currentUser = useSelector((state) => state.user.currentUser);
  const password = watch("password", "");

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

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/colaboradores/inserir-colaborador",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: data.name,
            email: data.email,
            senha: data.password,
          }),
        }
      );

      if (response.ok) {
        toastHandler("Colaborador cadastrado", "success");
      } else {
        toastHandler("Falha no cadastro do colaborador", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      toastHandler("Erro inesperado", "error");
    }
  };

  useEffect(() => {
    if (currentUser.length > 0) navigate("/restrito");
    else setThereIsCurrentUser(false);
  }, []);

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 bg-primary signup-container">
      <div className="form_container p-5 rounded bg-white">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="text-center">Cadastro de colaborador</h3>
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
          <div className="row g-2">
            <div className="mb-2 col-md-6">
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                {...register("password", {
                  required: "Preencha a senha",
                  minLength: {
                    value: 5,
                    message: "O tamanho mínimo é de 5 caracteres",
                  },
                })}
                placeholder="Digite sua senha"
                type="password"
                className="form-control"
              />
              {errors.password && (
                <span style={{ color: "red" }} role="alert">
                  {errors.password.message}
                </span>
              )}
            </div>
            <div className="mb-2 col-md-6">
              <label htmlFor="password">Confirme sua senha</label>
              <input
                id="confirmedPassword"
                {...register("confirmedPassword", {
                  required: "Preencha a senha",
                  minLength: {
                    value: 5,
                    message: "O tamanho mínimo é de 5 caracteres",
                  },
                  validate: (value) =>
                    value === password || "Senhas diferentes",
                })}
                placeholder="Digite novamente"
                type="password"
                className="form-control"
              />
              {errors.confirmedPassword && (
                <span style={{ color: "red" }} role="alert">
                  {errors.confirmedPassword.message}
                </span>
              )}
            </div>
          </div>
          <div className="d-grid mt-2">
            <button className="btn btn-primary">Cadastrar</button>
            <Link to="/" className="btn btn-link mb-3">
              Voltar para o Login
            </Link>
          </div>
        </form>
        <ToastContainer
          autoClose={3000}
          position={toast.POSITION.BOTTOM_LEFT}
        />
      </div>
    </div>
  );
}

export default CadastroColaborador;
