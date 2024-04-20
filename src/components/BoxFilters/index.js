import "./styles.css";
import { getItem, getHeaders } from "../../utils/storageAndFunctions";
import SingleProgess from "../SingleProgress";
import IconCloseWhite from "../../assets/icon-close-rotate-wihte.svg";
import IconPlusBlack from "../../assets/icon-plus-black.svg";
import api from "../../services/api";
import { useEffect, useState } from "react";

function BoxFilters({
  setTransactions,
  lodaTransactions,
  setOpenAddCat,
  setOpenFilters,
  setMessageSearchFilter,
  containerRef
}) {
  const token = getItem("token");
  const [btnActive, setBtnActive] = useState([]);
  const [loading, setLoading] = useState(false);
  const [accordion, setaccordion] = useState(false);

  let wordsFilter = "filtro[]=";

  let arrayCategories = [...btnActive];

  async function listCategories() {
    setLoading(true);
    try {
      const response = await api.get("/categoria", getHeaders(token));
      const resultResponse = [...response.data];
      setaccordion(true);
      // eslint-disable-next-line
      resultResponse.map((item) => {
        arrayCategories.push({
          id: item.id,
          name: item.nome,
          status: false,
        });
      });
      setBtnActive(arrayCategories);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error.response);
    }
  }

  function handleActiveFilter(categories, index) {
    let categorieFind = arrayCategories.find((item) => {
      return item.id === categories.id;
    });

    if (categories.status) {
      arrayCategories[index] = {
        ...categorieFind,
        status: false,
      };
      setBtnActive(arrayCategories);
    }
    if (!categories.status) {
      arrayCategories[index] = {
        ...categorieFind,
        status: true,
      };
      setBtnActive(arrayCategories);
    }
  }

  async function aplicationFilters() {
    let existFilter = arrayCategories.find((item) => {
      return item.status === true;
    });
    if (existFilter) {
      for (let cat of arrayCategories) {
        if (cat.status) {
          wordsFilter += `${cat.name}&filtro[]=`;
        }
      }
    }

    try {
      const response = await api.get(
        `/transacao?${wordsFilter}`,
        getHeaders(token)
      );
      if (!response.data.length) {
        setMessageSearchFilter(
          "Não há transações associadas à categoria selecionada"
        );
      }
      setTransactions([...response.data]);
    } catch (error) {
      return;
    }
  }

  function clearFilter() {
    for (let cat of arrayCategories) {
      if (cat.status) {
        cat.status = false;
      }
    }
    wordsFilter = "filtro[]=";
    setBtnActive(arrayCategories);
    lodaTransactions();
  }

  function openCategorieModal() {
    setOpenAddCat(true);
    setOpenFilters(false);
  }

  useEffect(() => {
    listCategories();
    // eslint-disable-next-line
  }, []);

  return (
    <div ref={containerRef} className={`container-filter ${accordion ? 'open' : '' }`}>
      {loading && (
        <div className="progess-loading">
          <SingleProgess />
        </div>
      )}

      <div className="title-box-filter">
        <h4>Categorias</h4>
      </div>
      <div className="container-categories">
        {btnActive.map((categories, index) => (
          <button
            key={categories.id}
            className="btn-filter"
            style={{
              color: !categories.status ? "#000" : "#fff",
              backgroundColor: !categories.status ? "#FAFAFA" : "#7978D9",
            }}
          >
            {categories.name}
            <img
              src={!categories.status ? IconPlusBlack : IconCloseWhite}
              alt="icon-close"
              onClick={() => handleActiveFilter(categories, index)}
            />
          </button>
        ))}
      </div>
      <div className="buttons-filters">
        <div>
          <button className="clear-filter" onClick={clearFilter}>
            Limpar Filtros
          </button>
          <button className="applicated-filter" onClick={aplicationFilters}>
            Aplicar Filtros
          </button>
        </div>
        <button onClick={() => openCategorieModal()} className="add-categorie">
          Adicionar Categoria
        </button>
      </div>
    </div>
  );
}

export default BoxFilters;
