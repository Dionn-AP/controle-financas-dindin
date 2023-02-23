import { useState, useEffect } from "react";
import {
  getItem,
  getHeaders,
  dateFormat,
  convertValues,
} from "../../utils/storageAndFunctions";
import SingleProgess from "../SingleProgress";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Close from "../../assets/close.svg";
import IconTrash from "../../assets/icon-trash.svg";
import api from "../../services/api";
import "./style.css";

function AddCategorie({ setOpenAddCat, setAlertSuccessfullDelete, setOpen }) {
  const token = getItem("token");
  const [inputCategorie, setinputCategorie] = useState("");
  const [loadinProgress, setLoadingProgress] = useState(false);
  const [loadinDelete, setLoadingDelete] = useState(false);
  const [errorNameCategorie, setErrorNameCategorie] = useState(false);
  const [errorDescriptionCategorie, setErrorDescriptionCategorie] =
    useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [idDelete, setIdDelete] = useState([]);
  const [errorDelete, setErrorDelete] = useState("");
  const [dataErrorDelete, setDataErrorDelete] = useState([]);
  const [successDelete, setSuccessDelete] = useState("");
  const [newCategorie, setNewCategorie] = useState([]);
  const [textAreaDescription, setTextAreaDescription] = useState("");
  const [categories, setCategories] = useState([]);

  const arrayNewCategorie = [];

  async function listCategories() {
    try {
      const response = await api.get("/categoria", getHeaders(token));
      setCategories([...response.data]);
    } catch (error) {
      console.log(error.response);
    }
  }

  async function addCategorie() {
    setErrorNameCategorie(false);
    setErrorDescriptionCategorie(false);
    if (!inputCategorie.trim() && !textAreaDescription.trim()) {
      setErrorNameCategorie(true);
      setErrorDescriptionCategorie(true);
      return;
    }
    if (inputCategorie.trim() && !textAreaDescription.trim()) {
      return setErrorDescriptionCategorie(true);
    }
    if (!inputCategorie.trim() && textAreaDescription.trim()) {
      return setErrorNameCategorie(true);
    }

    try {
      setLoadingProgress(true);
      const response = await api.post(
        "/categoria",
        {
          nome: inputCategorie,
          descricao: textAreaDescription,
        },
        getHeaders(token)
      );
      setOpen(true);
      setAlertSuccessfullDelete("Nova Categoria adicionada com sucesso");
      arrayNewCategorie.push(response.data);
      setNewCategorie([...newCategorie, response.data]);
      setLoadingProgress(false);
      setinputCategorie("");
      setTextAreaDescription("");
    } catch (error) {
      setLoadingProgress(false);
      return;
    }
  }

  function modalDelete(categorire) {
    setOpenModalDelete(true);
    setIdDelete(categorire);
  }

  function closedModalDelete() {
    setErrorDelete("");
    setSuccessDelete("");
    setOpenModalDelete(false);
    setDataErrorDelete([]);
  }

  async function deleteCategorie() {
    setLoadingDelete(true);
    try {
      const response = await api.delete(
        `/categoria/${idDelete.id}`,
        getHeaders(token)
      );
      setSuccessDelete(response.data.mensagem);
      listCategories();
      setLoadingDelete(false);
      setTimeout(() => {
        setOpenModalDelete(false);
      }, 5000);
    } catch (error) {
      setLoadingDelete(false);
      setDataErrorDelete(error.response.data.descricao);
      setErrorDelete(error.response.data.mensagem);
    }
  }

  useEffect(() => {
    listCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="card-add-categorie">
      {loadinProgress && (
        <div className="progess-loading">
          <SingleProgess />
        </div>
      )}
      {openModalDelete && (
        <div className="modal-delete-categorie">
          <img
            className="btn-close-add-categorie"
            src={Close}
            alt="close button"
            onClick={() => closedModalDelete()}
          />
          {!errorDelete && (
            <div className="box-modal-delete-categorie">
              <h3>Deseja realmente excluir essa categoria?</h3>
              <div className="buttons-yes-no">
                <button onClick={() => deleteCategorie()} className="btn-yes">
                  Sim
                </button>
                <button onClick={() => closedModalDelete()} className="btn-no">
                  Não
                </button>
              </div>
            </div>
          )}
          <div className="box-error">
            {loadinDelete && (
              <div className="progess-loading">
                <SingleProgess />
              </div>
            )}
            {errorDelete ? (
              <h5 className="error-menssage">
                {errorDelete && `${errorDelete}:`}
              </h5>
            ) : (
              <h5 className="success-menssage">
                {successDelete && `${successDelete}`}
              </h5>
            )}
            {dataErrorDelete && (
              <div className="descrition-categories-scroll">
                {dataErrorDelete.map((descricao) => (
                  <div key={descricao.id} className="description-categories">
                    <span>
                      <p>Categoria:</p>
                      {idDelete.nome}
                    </span>
                    <span>
                      <p>Descrição:</p>
                      {descricao.descricao}
                    </span>
                    <span>
                      <p>Valor:</p>
                      {convertValues(descricao.valor)}
                    </span>
                    <span>
                      <p>Data:</p>
                      {dateFormat(descricao.data)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      <h1>Adicionar Categoria</h1>
      <div
        style={{
          opacity: loadinProgress ? "0.5" : "1",
        }}
        className="scroll-form-add-categorie"
      >
        <img
          className="btn-close-add-categorie"
          src={Close}
          alt="close button"
          onClick={() => setOpenAddCat(false)}
        />
        <div className="card-content-form">
          <div className="input-categorie">
            <AddCircleIcon
              onClick={() => addCategorie()}
              className="icon-plus"
              htmlColor="#3A9FF1"
              fontSize="large"
            />
            <label>Nome da categoria</label>
            <input
              name="nome"
              type="text"
              style={{ borderColor: errorNameCategorie && "#FF0000" }}
              value={inputCategorie}
              onChange={(e) => setinputCategorie(e.target.value)}
            />
          </div>
          <div className="description-categorie">
            <label>Descrição</label>
            <textarea
              name="descricao"
              type="text"
              style={{ borderColor: errorDescriptionCategorie && "#FF0000" }}
              value={textAreaDescription}
              onChange={(e) => setTextAreaDescription(e.target.value)}
              rows={2}
              cols="20"
            />
          </div>
          <div className="existing-categories">
            {newCategorie &&
              newCategorie.map((categorie) => (
                <div key={categorie.id} className="name-categorie">
                  <span>{categorie.nome}</span>

                  <span className="new-categorie">novo</span>
                </div>
              ))}
            {!categories.length ? (
              <div className="progess-loading">
                <SingleProgess />
              </div>
            ) : (
              categories.map((categorie) => (
                <div key={categorie.id} className="name-categorie">
                  <span>{categorie.nome}</span>
                  <img
                    onClick={() => modalDelete(categorie)}
                    className="image-trash"
                    src={IconTrash}
                    alt="lixeira"
                  />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCategorie;
