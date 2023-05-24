import "./style.css";
import {
  getItem,
  getHeaders,
  messaErroTreatmentCategoriesAddRegister,
  money,
} from "../../utils/storageAndFunctions";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Close from "../../assets/close.svg";

function AddRegister({
  lodaTransactions,
  balance,
  loadBalance,
  setShowRegister,
  setAlertSuccessfullDelete,
  setOpen,
}) {
  const token = getItem("token");

  const [types, setTypes] = useState("saida");
  const [erro, setErro] = useState("");
  const [options, setOptions] = useState([
    { id: 0, nome: "Selecione uma categoria", descricao: "" },
  ]);
  const [select, setSelect] = useState({ id: "", nome: "" });
  const [form, setForm] = useState({
    tipo: null,
    valor: "",
    categoria_id: "",
    data: "",
    descricao: "",
  });

  function handleChangeInputValue(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleChangeSelect(event) {
    const localOptions = [...options];

    const myOption = localOptions.find(
      (item) => item.id === parseInt(event.target.value)
    );

    setSelect({ id: myOption.id, nome: myOption.nome });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (!form.valor) {
        setErro("Valor é um campo obrigtório");
        return;
      }
      // eslint-disable-next-line
      if (Number(form.valor.replace(/[^\w\s]|\s|[A-Z]/gi, "")) == 0) {
        setErro("O valor da transação não pode ser '0,00'");
        return;
      }

      await api.post(
        "/transacao",
        {
          tipo: types,
          valor: Number(form.valor.replace(/[^\w\s]|\s|[A-Z]/gi, "")),
          categoria_id: select.id,
          data: form.data,
          descricao: form.descricao,
        },
        getHeaders(token)
      );
      setOpen(true);
      setAlertSuccessfullDelete("Informações cadastradas com sucesso!");
      setErro("");
      lodaTransactions();
      loadBalance();
    } catch (error) {
      if (error.response.data) {
        return setErro(
          messaErroTreatmentCategoriesAddRegister(error.response.data)
        );
      }
      setErro(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    async function listCategories() {
      try {
        const response = await api.get("/categoria", getHeaders(token));
        setOptions([...options, ...response.data]);
      } catch (error) {
        setErro(error.response.data.mensagem);
      }
    }
    listCategories();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    loadBalance();
    // eslint-disable-next-line
  }, [balance]);

  return (
    <form className="card-add-register" onSubmit={handleSubmit}>
      <h1>Adicionar Registro</h1>
      <div className="scroll-form">
        <div className="form-add-register-into">
          <img
            className="btn-close"
            src={Close}
            alt="close button"
            onClick={() => setShowRegister(false)}
          />
          <div className="add-register-buttons">
            <div
              style={{ backgroundColor: types === "entrada" && "#3A9FF1" }}
              className="btn-received"
              onClick={() => setTypes("entrada")}
            >
              Entrada
            </div>
            <div
              style={{ backgroundColor: types === "entrada" && "#B9B9B9" }}
              className="btn-exits"
              onClick={() => setTypes("saida")}
            >
              Saída
            </div>
          </div>
          <div className="input-value">
            <label>Valor</label>
            <input
              name="valor"
              placeholder="0,00"
              value={money(form.valor)}
              onChange={handleChangeInputValue}
            />
          </div>
          <div className="input-categories">
            <label>Categorias</label>
            <select
              value={select.id}
              onChange={(event) => handleChangeSelect(event)}
            >
              {options.map((item) => (
                <option key={item.id} type="text" value={item.id}>
                  {item.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="input-date">
            <label>Data</label>
            <input
              name="data"
              type="date"
              value={form.data}
              onChange={handleChangeInputValue}
            />
          </div>
          <div className="input-description">
            <label>Descrição</label>
            <input
              name="descricao"
              type="text"
              placeholder="Detalhes da transação"
              value={form.descricao}
              onChange={handleChangeInputValue}
            />
          </div>
        </div>
      </div>

      <button className="btn-confirm-add-register">Confirmar</button>
      <span className="error-add-register">{erro && erro}</span>
    </form>
  );
}

export default AddRegister;
