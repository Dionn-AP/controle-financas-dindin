import './styles.css';
import {
    convertDate,
    convertDayOfWeek,
    convertValues,
    dateFormat
} from '../../utils/storageAndFunctions';
import Close from '../../assets/close.svg';

function CardDetailTransaction({ detailTransaction, setOpenCardDetail }) {

    return (
        <div className='card-detail'>
            <img className='btn-close-detail'
                src={Close} alt='close button'
                onClick={() => setOpenCardDetail(false)}
            />
            <h1>Detalhes da Transação</h1>
            <div className='text-card-detail'>
                <div className='detail-categories'>
                    <div className='categories'>
                        <span>
                            <strong>Categoria</strong>
                        </span>
                        <span>{detailTransaction.categoria_nome}</span>
                    </div>
                    <div className='value'>
                        <span>
                            <strong>Valor</strong>
                        </span>
                        <span style={{
                            color: detailTransaction.tipo === 'entrada'
                                ? '#7B61FF'
                                : '#FA8C10'
                        }}>
                            <strong>
                                {convertValues(detailTransaction.valor)}
                            </strong>
                        </span>
                    </div>
                </div>
                <div className='detail-date'>
                    <div className='get-date'>
                        <span>
                            <strong>Dia da Semana</strong>
                        </span>
                        <span>{convertDayOfWeek(new Date(detailTransaction.data))}</span>
                    </div>
                    <div className='date'>
                        <span>
                            <strong>Data</strong>
                        </span>
                        <span>{dateFormat(detailTransaction.data)} </span>
                    </div>
                </div>
                <div className='detail-description'>
                    <div className='description'>
                        <span>
                            <strong>Descrição</strong>
                        </span>
                        <span>{detailTransaction.descricao}</span>
                    </div>
                </div>
                <div className='legend-values'>
                    <div className='value-received'>
                        <div></div>
                        <span>Entrada</span>
                    </div>
                    <div className='value-exit'>
                        <div></div>
                        <span>Saída</span>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardDetailTransaction;