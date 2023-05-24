import "./style.css";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Background from "../../assets/background.svg";
import Logo from "../../assets/logo.svg";
import api from "../../services/api";
import { messaErroTreatment } from "../../utils/storageAndFunctions";
import { useState } from "react";
import InputPassword from "../../components/TextFildPassword/TextFildPass";
import InputEmailOrName from "../../components/TextFildEmail/TextFildEmail";
import AlertMessage from "../../components/Alert";

function SignUp() {
  const [open, setOpen] = useState(false);
  const [erro, setErro] = useState("");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    contrasenha: "",
  });

  const navigate = useNavigate();

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      if (
        form.senha.length &&
        form.contrasenha.length &&
        form.senha !== form.contrasenha
      ) {
        setErro("As senhas precisam ser iguais.");
        return;
      }
      if (form.senha && !form.contrasenha.trim().length) {
        setErro("Você precisa confirmar a senha.");
        return;
      }
      await api.post("/usuario", {
        nome: form.nome,
        email: form.email,
        senha: form.senha,
      });

      setOpen(true);

      setTimeout(() => {
        navigate("/sign-in");
      }, 5000);
    } catch (error) {
      if (error.response.data.mensagem) {
        return setErro(error.response.data.mensagem);
      } else if (error.response.data) {
        const erro = messaErroTreatment("Erro de conexão com o servidor");
        return setErro(erro);
      }
    }
  }

  return (
    <div
      className="container"
      style={{ backgroundImage: `url(${Background})` }}
    >
      {open && (
        <AlertMessage
          open={open}
          setOpen={setOpen}
          message="Cadastro concluído com sucesso"
        />
      )}
      <div className="container-signup">
        <div className="logo">
          <img src={Logo} alt="logo-mark" />
        </div>
        <form className="sign-up" onSubmit={handleSubmit}>
          <h2>Cadastre-se</h2>
          <div className="inputs-group-signup">
            <InputEmailOrName
              form={form}
              type="text"
              label="Nome"
              setForm={setForm}
              handleChangeInputValue={handleChangeInputValue}
            />
            <InputEmailOrName
              form={form}
              type="text"
              label="E-mail"
              setForm={setForm}
              handleChangeInputValue={handleChangeInputValue}
            />
            <InputPassword
              form={form}
              type="password"
              label="Senha"
              mrBottom="2rem"
              setForm={setForm}
              handleChangeInputValue={handleChangeInputValue}
            />
            <InputPassword
              form={form}
              type="password"
              label="Confirmação de senha"
              mrBottom="0"
              setForm={setForm}
              handleChangeInputValue={handleChangeInputValue}
            />
          </div>
          <button className="btn-singup">Cadastrar</button>
          <span className="text-bottom">
            Já tem cadastro? <Link to="/sign-in">Clique aqui!</Link>
          </span>
          <span className="error-signup">{erro && erro}</span>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

