import "./styles.css";
import Logo from "../../assets/logo.svg";
import PdfIcon from "../../assets/file-pdf.svg";
import ImageProfile from "../../assets/photo-user.svg";
import ImageLogout from "../../assets/button-logout.svg";
import Filter from "../../assets/icon-filter.svg";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import { useEffect, useState, useRef } from "react";
import { clear, getItem, getHeaders } from "../../utils/storageAndFunctions";
import AddCategorie from "../../components/AddCategorie";
import AddRegister from "../../components/AddRegister";
import EditRegister from "../../components/EditRegister";
import EditUser from "../../components/EditUser";
import Table from "../../components/Table";
import Balance from "../../components/Balance";
import BoxFilters from "../../components/BoxFilters";
import MiniMenu from "../../components/MiniMenu/MiniMenu";
import CardDetailTransaction from "../../components/CardDetailTransaction/CardDetailTransaction";
import { useLocation } from "react-router-dom";
import AlertMessage from "../../components/Alert";

function Home() {
  const navigate = useNavigate();
  const routePath = useLocation();
  const token = getItem("token");
  const [openFilters, setOpenFilters] = useState(false);
  const [openResumeCard, setResumeCard] = useState(false);
  const [filter, setFilter] = useState("");
  const [messageSearchFilter, setMessageSearchFilter] = useState("");
  const [user, setUser] = useState([]);
  const [balance, setBalance] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [openCardDetail, setOpenCardDetail] = useState(false);
  const [openAddCat, setOpenAddCat] = useState(false);
  const [detailTransaction, setDetailTransaction] = useState([]);
  const [alertSuccessfullDelete, setAlertSuccessfullDelete] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const dayOfWeek = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  const [showEdit, setShowEdit] = useState({
    transaction: {},
    show: false,
  });
  const [showIcons, setShowIcons] = useState({
    id: "",
    show: false,
  });

  function handleLogout() {
    clear();
    navigate("/sign-in");
  }

  async function loadBalance() {
    try {
      const response = await api.get("/transacao/extrato", getHeaders(token));
      setBalance(response.data);
    } catch (error) {
      return;
    }
  }

  async function lodaUser() {
    setAlertSuccessfullDelete("");
    try {
      const response = await api.get("/usuario", getHeaders(token));
      setUser(response.data);
    } catch (error) {
      return;
    }
  }

  async function lodaTransactions() {
    try {
      const response = await api.get("/transacao", getHeaders(token));
      if(!response.data.length) {
        setMessageSearchFilter("Você ainda não possui transações cadastradas")
      }
      setTransactions(response.data);
    } catch (error) {
      return;
    }
  }

  async function deleteTransaction(id) {
    try {
      await api.delete(`/transacao/${id}`, getHeaders(token));
      loadBalance();
      lodaTransactions();
      setOpen(true);
      setAlertSuccessfullDelete("Informações deletadas com sucesso");
    } catch (error) {
      return;
    }
  }

  function openBoxFilters() {
    setOpenFilters(!openFilters);
  }

  const onTop = () => {
    window.scrollTo(0, 0);
  };

  const handleRelatorioClick = async () => {
    try {
        const response = await api.get('/relatorio', {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/pdf',
            },
            responseType: 'arraybuffer',
        });

        if (response.data && response.data.byteLength > 0) {
            // Criar um blob com os dados do PDF
            const blob = new Blob([response.data], { type: 'application/pdf' });

            // Criar um URL para o blob
            const url = window.URL.createObjectURL(blob);

            // Abrir o URL em uma nova guia do navegador
            window.open(url, '_blank');
        } else {
            console.error('Dados do PDF vazios ou inválidos.');
        }
    } catch (error) {
        console.error('Erro ao gerar relatório:', error);
    }
};


  useEffect(() => {
    loadBalance();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    lodaUser();
    lodaTransactions();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    onTop();
  }, [routePath]);

  return (
    <div className="container-home">
      {open && (
        <AlertMessage
          open={open}
          setOpen={setOpen}
          message={alertSuccessfullDelete}
        />
      )}
      {openAddCat && (
        <div className="position-absolute">
          <AddCategorie 
          setOpen={setOpen}
          setOpenAddCat={setOpenAddCat} 
          setAlertSuccessfullDelete={setAlertSuccessfullDelete}
          />
        </div>
      )}
      {showRegister && (
        <div className="position-absolute">
          <AddRegister
            setOpen={setOpen}
            balance={balance}
            loadBalance={loadBalance}
            setShowRegister={setShowRegister}
            lodaTransactions={lodaTransactions}
            setAlertSuccessfullDelete={setAlertSuccessfullDelete}
          />
        </div>
      )}
      {openCardDetail && (
        <div className="position-absolute">
          <CardDetailTransaction
            dayOfWeek={dayOfWeek}
            setOpenCardDetail={setOpenCardDetail}
            detailTransaction={detailTransaction}
          />
        </div>
      )}
      {showEdit.show && (
        <div className="position-absolute">
          <EditRegister
            setOpen={setOpen}
            showEdit={showEdit}
            balance={balance}
            loadBalance={loadBalance}
            setShowEdit={setShowEdit}
            lodaTransactions={lodaTransactions}
            setAlertSuccessfullDelete={setAlertSuccessfullDelete}
          />
        </div>
      )}
      {showEditUser && (
        <div className="position-absolute">
          <EditUser
            setOpen={setOpen}
            setAlertSuccessfullDelete={setAlertSuccessfullDelete}
            user={user}
            lodaUser={lodaUser}
            setShowEditUser={setShowEditUser}
            lodaTransactions={lodaTransactions}
          />
        </div>
      )}
      <header>
        <img className="image-logo" src={Logo} alt="logo-mark" />
        <div className="user-current">
          <div className="mini-menu">
            <div className="mini-menu-mobile">
              <MiniMenu
                handleLogout={handleLogout}
                clear={clear}
                setShowEditUser={setShowEditUser}
                imageUser={ImageProfile}
              />
            </div>
          </div>
          <img
            className="image-logout"
            src={ImageProfile}
            alt="profile"
            onClick={() => setShowEditUser(true)}
          />
          <span className="profile-name">{user[0]}</span>
          <img
            className="log-out"
            src={ImageLogout}
            alt="logout"
            onClick={() => handleLogout()}
          />
        </div>
      </header>
      <div className="container-content-home">
        <div className="card-abstract-top">
          <Balance
            balance={balance}
            transactions={transactions}
            setShowRegister={setShowRegister}
            onClick={handleRelatorioClick}
          />
        </div>
        <div className="container-table-abstract">
          <div className="filter-table">
            <button onClick={() => openBoxFilters()} className="btn-filters">
              <img src={Filter} alt="filter-table" />
              Filtrar
            </button>
            <button
              onClick={() => setResumeCard(!openResumeCard)}
              id="btn-show-resume"
            >
              Resumo
            </button>
            <button
              id="show-resume-add-register"
              onClick={() => setShowRegister(true)}
            >
              <span>Adicionar Registro</span>
            </button>
          </div>
          <button
            onClick={handleRelatorioClick}
            className="btn-pdf"
          >
            <img
              src={PdfIcon}
              alt="pdf-icon"
              style={{
                height: "1.8rem",
                width: "1.9rem",
                marginRight: ".7rem",
              }}
            />
            Relatório
          </button>
          <div className="container-table">
            {openResumeCard && (
              <div className="show-card-abstract">
                <Balance 
                  balance={balance} 
                  setShowRegister={setShowRegister} 
                  handleRelatorioClick={handleRelatorioClick}
                />
              </div>
            )}
            {openFilters && (
              <BoxFilters
                setMessageSearchFilter={setMessageSearchFilter}
                setOpenFilters={setOpenFilters}
                lodaTransactions={lodaTransactions}
                setTransactions={setTransactions}
                setOpenAddCat={setOpenAddCat}
                setFilter={setFilter}
                useRefClass={containerRef}
              />
            )}
            <Table
              filter={filter}
              setOpenCardDetail={setOpenCardDetail}
              setDetailTransaction={setDetailTransaction}
              setFilter={setFilter}
              transactions={transactions}
              messageSearchFilter={messageSearchFilter}
              showIcons={showIcons}
              setShowIcons={setShowIcons}
              deleteTransaction={deleteTransaction}
              setShowEdit={setShowEdit}
            />
          </div>
          <div className="card-abstract">
            <Balance balance={balance} setShowRegister={setShowRegister} handleRelatorioClick={handleRelatorioClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
