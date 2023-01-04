import './style.css';
import { convertValues } from '../../utils/storageAndFunctions';
import transactionPdf from '../../services/Clients/transactionReportsPdf';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

function Balance({ setShowRegister, balance, transactions }) {
    const stylePdf = {
        color: '#e90404e6',
        backgroundColor: '#FAFAFA !important',
        borderRadius: 5,
        fontSize: 27
    }
    
    return (
        <>
            <div className='content-abstract'>
                <h2>Resumo</h2>
                <div className='received'>
                    <span>Entradas</span>
                    <span>{convertValues(balance?.entrada)}</span>
                </div>
                <div className='exits'>
                    <span>Saídas</span>
                    <span className='exits-price'>{convertValues(balance?.saida)}</span>
                </div>

                <div className='balance'>
                    <span>Saldo</span>
                    <span>{convertValues(balance?.saldo)}</span>
                </div>
                <button
                    id='btn-pdf-resume'
                >
                    <BsFillFileEarmarkPdfFill
                        style={stylePdf}
                        onClick={(e) => transactionPdf(transactions, balance)}
                    />
                </button>
            </div>
            <button className='add-register'
                onClick={() => setShowRegister(true)}
            >
                Adicionar Registro
            </button>
        </>
    )
};

export default Balance;