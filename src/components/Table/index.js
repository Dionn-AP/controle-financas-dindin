import IconEdit from "../../assets/icon-pen.svg";
import {
  convertValues,
  convertDayOfWeek,
  dateFormat,
} from "../../utils/storageAndFunctions";
import IconTrash from "../../assets/icon-trash.svg";
import PopPup from "../../components/PopPup";
import SingleProgess from "../SingleProgress";
import "./style.css";

function Table({
  transactions,
  showIcons,
  setShowIcons,
  deleteTransaction,
  setShowEdit,
  setDetailTransaction,
  setOpenCardDetail,
  messageSearchFilter,
}) {

  function openDetailTransaction(detail) {
    setDetailTransaction(detail);
    setOpenCardDetail(true);
  }

  return (
    <div className="table">
      <div className="container-content-table">
        <div className="head-table">
          <span className="head-table-date">Data</span>
          <span className="head-table-date-week">Dia da Semana</span>
          <span className="head-table-description">Descrição</span>
          <span className="head-table-categorie">Categoria</span>
          <span className="head-table-value">Valor</span>
          <span className="head-table-empty"></span>
        </div>
        {!transactions.length &&
          (!messageSearchFilter ? (
            <div className="progress-loading-table">
              <SingleProgess />
            </div>
          ) : (
            <div className="message-filter">
              <h1>{messageSearchFilter}</h1>
            </div>
          ))}
        <div className="body-table">
          {transactions.map((transaction) => (
            <div className="content-table" key={transaction.id}>
              <div className="content-table-row">
                <span
                  className="content-table-date"
                  onClick={() => openDetailTransaction(transaction)}
                >
                  {dateFormat(transaction.data)}{" "}
                </span>
                <span
                  className="content-table-day-week"
                  onClick={() => openDetailTransaction(transaction)}
                >
                  {convertDayOfWeek(new Date(transaction.data))}
                </span>
                <span
                  className="content-table-description"
                  onClick={() => openDetailTransaction(transaction)}
                >
                  {transaction.descricao}
                </span>
                <span
                  className="content-table-categorie"
                  onClick={() => openDetailTransaction(transaction)}
                >
                  {transaction.categoria_nome}
                </span>
                <span
                  className="content-table-value"
                  onClick={() => openDetailTransaction(transaction)}
                  style={{
                    color:
                      transaction.tipo === "entrada" ? "#7B61FF" : "#FA8C10",
                  }}
                >
                  <strong>{convertValues(transaction.valor)}</strong>
                </span>
                <div className="icons">
                  {showIcons.id === transaction.id && showIcons.show && (
                    <PopPup
                      deleteTransaction={deleteTransaction}
                      setShowIcons={setShowIcons}
                      transaction={transaction}
                    />
                  )}
                  <img
                    className="icon-edit"
                    src={IconEdit}
                    alt="little pen"
                    onClick={() =>
                      setShowEdit({
                        transaction: { ...transaction },
                        show: true,
                      })
                    }
                  />
                  <img
                    className="icon-trash"
                    src={IconTrash}
                    alt="little trash"
                    onClick={() =>
                      setShowIcons({
                        id: transaction.id,
                        show: true,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
