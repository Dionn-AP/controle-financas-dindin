import "./style.css";
import { getItem, getHeaders, money } from "../../utils/storageAndFunctions";

import { formatEditDate } from "../../utils/storageAndFunctions";
import { useState, useEffect } from "react";
import api from "../../services/api";
import Close from "../../assets/close.svg";

function EditRegister({
  lodaTransactions,
  balance,
  loadBalance,
  setShowEdit,
  showEdit,
  setOpen,
  setAlertSuccessfullDelete,
}) {
  const token = getItem("token");
  const [types, setTypes] = useState(showEdit.transaction.tipo);
  const [erro, setErro] = useState("");
  const [options, setOptions] = useState([
    {
      id: showEdit.transaction.id,
      nome: showEdit.transaction.categoria_nome,
      descricao: showEdit.transaction.descricao,
    },
  ]);
  const [select, setSelect] = useState({ id: "", nome: "" });
  const [form, setForm] = useState({
    tipo: showEdit.transaction.tipo,
    valor: showEdit.transaction.valor,
    categoria_id: showEdit.transaction.categoria_id,
    data: formatEditDate(showEdit.transaction.data),
    descricao: showEdit.transaction.descricao
      ? showEdit.transaction.descricao
      : "",
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

    if (!form.valor) {
      setErro("Valor é um campo obrigtório");
      return;
    }
    // eslint-disable-next-line
    if (Number(form.valor.replace(/[^\w\s]|\s|[A-Z]/gi, "")) == 0) {
      setErro("O valor da transação não pode ser '0,00'");
      return;
    }

    try {
      await api.put(
        `/transacao/${showEdit.transaction.id}`,
        {
          tipo: types,
          valor: form.valor
            ? Number(form.valor.replace(/[^\w\s]|\s|[A-Z]/gi, ""))
            : showEdit.transaction.valor,
          categoria_id: select.id
            ? select.id
            : showEdit.transaction.categoria_id,
          data: form.data ? form.data : showEdit.transaction.data,
          descricao: form.descricao
            ? form.descricao
            : showEdit.transaction.descricao,
        },
        getHeaders(token)
      );
      setOpen(true);
      setAlertSuccessfullDelete("Informações editadas com sucesso!");
      setErro("");
      setShowEdit({ ...showEdit, show: false });
      lodaTransactions();
      loadBalance();
    } catch (error) {
      setErro(error.response);
    }
  }

  useEffect(() => {
    async function listCategories() {
      try {
        const response = await api.get("/categoria", getHeaders(token));
        setOptions([...options, ...response.data]);
      } catch (error) {
        console.log(error.response);
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
    <form className="edit-register" onSubmit={handleSubmit}>
      <h1>Editar Registro</h1>
      <img
        className="btn-close"
        src={Close}
        alt="close button"
        onClick={() => setShowEdit(false)}
      />
      <div className="scroll-form-edit-register">
        <div className="content-form-edit-register">
          <div className="register-buttons">
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
              value={money(form.valor)}
              onChange={handleChangeInputValue}
            />
          </div>
          <div className="input-categories-edit">
            <label>Categorias</label>
            <select
              value={select.id}
              onChange={(event) => handleChangeSelect(event)}
            >
              <option>{options[0].nome}</option>
              {options.map(
                (item) =>
                  item.id !== showEdit.transaction.id && (
                    <option key={item.id} type="text" value={item.id}>
                      {item.nome}
                    </option>
                  )
              )}
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
              value={form.descricao}
              onChange={handleChangeInputValue}
            />
          </div>
        </div>
      </div>
      <button className="btn-confirm-edit-register">Confirmar</button>
      <span className="error">{erro && erro}</span>
    </form>
  );
}

export default EditRegister;
