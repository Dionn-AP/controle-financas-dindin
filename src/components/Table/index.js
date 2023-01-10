import IconEdit from '../../assets/icon-pen.svg';
import {
    convertDate,
    convertValues,
    convertDayOfWeek,
    dateFormat
} from '../../utils/storageAndFunctions';
import IconTrash from '../../assets/icon-trash.svg';
import PopPup from '../../components/PopPup';
import './style.css';


function Table({
    transactions, showIcons, setShowIcons,
    deleteTransaction, setShowEdit,
    setDetailTransaction, setOpenCardDetail
}) {

    const headTable = ['Data', 'Dia da Semana', 'Descrição', 'Categoria', 'Valor', ''];

    function openDetailTransaction(detail) {
        setDetailTransaction(detail);
        setOpenCardDetail(true);
    }

    return (
        <div className='table'>
            <table>
                <thead>
                    <tr>
                        {headTable.map((item, index) => (
                            <th key={index}>
                                {item}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {transactions.map((transaction) => (
                        <tr key={transaction.id}>
                            <td
                                onClick={() => openDetailTransaction(transaction)}
                            >{dateFormat(transaction.data)} </td>
                            <td
                                onClick={() => openDetailTransaction(transaction)}
                            >{convertDayOfWeek(new Date(transaction.data))}</td>
                            <td
                                onClick={() => openDetailTransaction(transaction)}
                            >{transaction.descricao}</td>
                            <td
                                onClick={() => openDetailTransaction(transaction)}
                            >{transaction.categoria_nome}</td>
                            <td
                                onClick={() => openDetailTransaction(transaction)}
                                style={{
                                    color: transaction.tipo === 'entrada'
                                        ? '#7B61FF'
                                        : '#FA8C10'
                                }}>
                                <strong>
                                    {convertValues(transaction.valor)}
                                </strong>
                            </td>
                            <td className='icons'>
                                {(showIcons.id === transaction.id && showIcons.show) &&
                                    <PopPup
                                        deleteTransaction={deleteTransaction}
                                        setShowIcons={setShowIcons}
                                        transaction={transaction}
                                    />
                                }
                                <img className='icon-edit' src={IconEdit} alt='little pen'
                                    onClick={() => setShowEdit({
                                        transaction: { ...transaction },
                                        show: true
                                    })}
                                />
                                <img className='icon-trash' src={IconTrash} alt='little trash'
                                    onClick={() => setShowIcons({
                                        id: transaction.id,
                                        show: true
                                    })}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Table;