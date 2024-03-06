import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/slices/userSlice';
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import LoginImage from "../../assets/login-background.svg";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  const [thereIsCurrentUser, setThereIsCurrentUser] = useState(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser);
  const users = useSelector(state => state.user.users);

  const toastHandler = (message) => {
    toast.error(`${message}`, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
  };

  const userExists = (email) => {
      return users.findIndex((user) => user.email === email);
  }

  const onSubmit = (data) => {
    const thereIsUser = userExists(data.email);
    console.log('thereIsUser', thereIsUser);
    if (thereIsUser>=0){
        if (users[thereIsUser].password === data.password){
            dispatch(loginUser({email:data.email, password:data.password}));
            navigate('/restrito/cadastro-cliente');
        }
        else
            toastHandler('Senha incorreta');
    }else{
        toastHandler('Usuário não cadastrado!');
    }
  };

  useEffect(()=>{
      if (currentUser.length > 0)
          navigate('/restrito/cadastro-cliente');
      else
          setThereIsCurrentUser(false);
  }, []);

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-primary login-container">
      {!thereIsCurrentUser && (
        <>
          <div className="col-md-6">
            <img
              src={LoginImage}
              alt="BackgroundLogin"
              className="img-fluid p_5"
            />
          </div>
          <div className="form_container p-5 rounded bg-white">
            <form onSubmit={handleSubmit(onSubmit)}>
              <h3 className="text-center">Login</h3>
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
              <div className="mb-4 form-group">
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
              <div className="d-grid mt-2 mb-2">
                <button className="btn btn-primary block">Entrar</button>
              </div>
              <p className="text-center">
                Ainda não tem uma conta?{" "}
                <a href="" onClick={() => navigate("/cadastro")}>
                  Cadastre-se
                </a>
              </p>
            </form>
            <ToastContainer
              autoClose={3000}
              position={toast.POSITION.BOTTOM_LEFT}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
