import './style.css';
import { convertValues } from '../../utils/storageAndFunctions';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs';

function Balance({ setShowRegister, balance, handleRelatorioClick }) {
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
                    <span>{!balance.entrada ? "R$ 0,00" : convertValues(balance?.entrada)}</span>
                </div>
                <div className='exits'>
                    <span>Saídas</span>
                    <span className='exits-price'>{!balance.saida ? "R$ 0,00" : convertValues(balance?.saida)}</span>
                </div>

                <div className='balance'>
                    <span>Saldo</span>
                    <span>{!balance.saldo ? "R$ 0,00" : convertValues(balance?.saldo)}</span>
                </div>
                <button
                    id='btn-pdf-resume'
                    onClick={handleRelatorioClick}
                >
                    <BsFillFileEarmarkPdfFill
                        style={stylePdf}
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