import './styles.css';
import Logo from '../../assets/logo.svg';
import PdfIcon from '../../assets/file-pdf.svg';
import ImageProfile from '../../assets/photo-user.svg';
import ImageLogout from '../../assets/button-logout.svg';
import Filter from '../../assets/icon-filter.svg';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import { useEffect, useState } from 'react';
import { clear, getItem, getHeaders } from '../../utils/storageAndFunctions';
import AddRegister from '../../components/AddRegister';
import EditRegister from '../../components/EditRegister';
import EditUser from '../../components/EditUser';
import Table from '../../components/Table';
import Balance from '../../components/Balance';
import BoxFilters from '../../components/BoxFilters';
import MiniMenu from '../../components/MiniMenu/MiniMenu';
import CardDetailTransaction from '../../components/CardDetailTransaction/CardDetailTransaction';
import { useLocation } from 'react-router-dom';
import transactionPdf from '../../services/Clients/transactionReportsPdf';
import AlertMessage from '../../components/Alert';

function Home() {
    const navigate = useNavigate();
    const routePath = useLocation();
    const token = getItem('token');
    const [openFilters, setOpenFilters] = useState(false);
    const [openResumeCard, setResumeCard] = useState(false);
    const [filter, setFilter] = useState('');
    const [messageSearchFilter, setMessageSearchFilter] = useState("Não há transações cadastradas");
    const [user, setUser] = useState([]);
    const [balance, setBalance] = useState({});
    const [transactions, setTransactions] = useState([]);
    const [showRegister, setShowRegister] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [openCardDetail, setOpenCardDetail] = useState(false);
    const [detailTransaction, setDetailTransaction] = useState([]);
    const [alertSuccessfullDelete, setAlertSuccessfullDelete] = useState('');
    const [open, setOpen] = useState(false);

    const dayOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const [showEdit, setShowEdit] = useState({
        transaction: {},
        show: false
    });
    const [showIcons, setShowIcons] = useState({
        id: '',
        show: false
    });

    function handleLogout() {
        clear();
        navigate('/sign-in')
    };

    async function loadBalance() {
        try {
            const response = await api.get('/transacao/extrato', getHeaders(token));
            setBalance(response.data);
        } catch (error) {
            return
        }
    };

    async function lodaUser() {
        setAlertSuccessfullDelete('');
        try {
            const response = await api.get('/usuario', getHeaders(token));
            setUser(response.data)
        } catch (error) {
            return
        }
    };

    async function lodaTransactions() {
        try {
            const response = await api.get('/transacao', getHeaders(token));
            setTransactions(response.data);
        } catch (error) {
            return
        }
    }

    async function deleteTransaction(id) {
        try {
            await api.delete(`/transacao/${id}`, getHeaders(token));
            loadBalance();
            lodaTransactions();
            setOpen(true);
            setAlertSuccessfullDelete('Informações deletadas com sucesso')
        } catch (error) {
            return
        }
    }

    function openBoxFilters() {
        setOpenFilters(!openFilters)
    }

    const onTop = () => {
        window.scrollTo(0, 0);
    }

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
            {
                open &&
                <AlertMessage
                    open={open}
                    setOpen={setOpen}
                    message={alertSuccessfullDelete}
                />
            }
            {
                showRegister &&
                <div className='position-absolute'>
                    <AddRegister
                        setOpen={setOpen}
                        balance={balance}
                        loadBalance={loadBalance}
                        setShowRegister={setShowRegister}
                        lodaTransactions={lodaTransactions}
                        setAlertSuccessfullDelete={setAlertSuccessfullDelete}
                    />
                </div>
            }
            {
                openCardDetail &&
                <div className='position-absolute'>
                    <CardDetailTransaction
                        dayOfWeek={dayOfWeek}
                        setOpenCardDetail={setOpenCardDetail}
                        detailTransaction={detailTransaction}
                    />
                </div>
            }
            {
                showEdit.show &&
                <div className='position-absolute'>
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
            }
            {
                showEditUser &&
                <div className='position-absolute'>
                    <EditUser
                        setOpen={setOpen}
                        setAlertSuccessfullDelete={setAlertSuccessfullDelete}
                        user={user}
                        lodaUser={lodaUser}
                        setShowEditUser={setShowEditUser}
                        lodaTransactions={lodaTransactions}
                    />
                </div>
            }
            <header>
                <img className='image-logo' src={Logo} alt='logo-mark' />
                <div className='user-current'>
                    <div className='mini-menu'>
                        <div className='mini-menu-mobile'>
                            <MiniMenu
                                handleLogout={handleLogout}
                                clear={clear}
                                setShowEditUser={setShowEditUser}
                                imageUser={ImageProfile}
                            />
                        </div>
                    </div>
                    <img className='image-logout' src={ImageProfile} alt='profile'
                        onClick={() => setShowEditUser(true)}
                    />
                    <span className='profile-name'>{user[0]}</span>
                    <img
                        className='log-out'
                        src={ImageLogout}
                        alt='logout'
                        onClick={() => handleLogout()}
                    />
                </div>
            </header>
            <div className='container-content-home'>
                <div className='card-abstract-top'>
                    <Balance
                        balance={balance}
                        transactions={transactions}
                        setShowRegister={setShowRegister}
                    />
                </div>
                <div className='container-table-abstract'>
                    <div className='filter-table'>
                        <button
                            onClick={() => openBoxFilters()}
                            className='btn-filters'
                        >
                            <img src={Filter} alt='filter-table' />
                            Filtrar
                        </button>
                        <button
                            onClick={() => setResumeCard(!openResumeCard)}
                            id='btn-show-resume'
                        >
                            Resumo
                        </button>
                        <button id='show-resume-add-register'
                            onClick={() => setShowRegister(true)}
                        >
                            <span>Adicionar Registro</span>

                        </button>
                    </div>
                    <button
                        onClick={(e) => transactionPdf(transactions, balance)}
                        className='btn-pdf'
                    >
                        <img
                            src={PdfIcon}
                            alt='pdf-icon'
                            style={
                                {
                                    height: '1.8rem',
                                    width: '1.9rem',
                                    marginRight: '.7rem'
                                }
                            }
                        />
                        Relatório
                    </button>
                    <div className='container-table'>
                        {
                            openResumeCard &&
                            <div className='show-card-abstract'>
                                <Balance
                                    balance={balance}
                                    setShowRegister={setShowRegister}
                                />
                            </div>
                        }
                        {
                            openFilters &&
                            <BoxFilters
                                setMessageSearchFilter={setMessageSearchFilter}
                                lodaTransactions={lodaTransactions}
                                setTransactions={setTransactions}
                                setFilter={setFilter}
                            />
                        }
                        <Table
                            filter={filter}
                            setOpenCardDetail={setOpenCardDetail}
                            setDetailTransaction={setDetailTransaction}
                            setFilter={setFilter}
                            transactions={transactions}
                            showIcons={showIcons}
                            setShowIcons={setShowIcons}
                            deleteTransaction={deleteTransaction}
                            setShowEdit={setShowEdit}
                        />
                        {!transactions.length &&
                            <div className='message-filter'>
                                <h1>{messageSearchFilter}</h1>
                            </div>
                        }
                    </div>
                    <div className='card-abstract'>
                        <Balance
                            balance={balance}
                            setShowRegister={setShowRegister}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Home;