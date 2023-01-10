import './style.css';
import {
    getItem,
    getHeaders
} from '../../utils/storageAndFunctions';

import { formatEditDate } from '../../utils/storageAndFunctions';
import { useState, useEffect } from 'react';
import api from '../../services/api';
import Close from '../../assets/close.svg';

function EditRegister({
    lodaTransactions,
    loadBalance,
    setShowEdit,
    showEdit,
    setOpen,
    setAlertSuccessfullDelete
}) {
    const token = getItem('token');
    //let dateNoFormated = showEdit.transaction.data;
    //console.log(formatEditDate(dateNoFormated))
    const [types, setTypes] = useState(showEdit.transaction.tipo);
    const [erro, setErro] = useState('');
    const [options, setOptions] = useState([]);
    const [select, setSelect] = useState({ id: '', nome: '' });
    const [form, setForm] = useState({
        tipo: showEdit.transaction.tipo,
        valor: showEdit.transaction.valor,
        categoria_id: showEdit.transaction.categoria_id,
        data: formatEditDate(showEdit.transaction.data),
        descricao: showEdit.transaction.descricao ? showEdit.transaction.descricao : ''
    });

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleChangeSelect(event) {
        const localOptions = [...options];
        const myOption = localOptions.find((item) => item.id === parseInt(event.target.value));
        setSelect({ id: myOption.id, nome: myOption.nome });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setForm({
            tipo: '',
            valor: '',
            categoria_id: '',
            data: '',
            descricao: ''
        })
        try {
            await api.put(`/transacao/${showEdit.transaction.id}`, {
                tipo: types,
                valor: Number(form.valor),
                categoria_id: select.id ? select.id : showEdit.transaction.categoria_id,
                data: form.data,
                descricao: form.descricao
            }, getHeaders(token));
            setOpen(true);
            setAlertSuccessfullDelete('Informações editadas com sucesso!');
            setErro('');
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
                const response = await api.get('/categoria', getHeaders(token));
                setOptions([...response.data])
            } catch (error) {
                console.log(error.response)
            }
        }
        listCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <form className='edit-register' onSubmit={handleSubmit}>
            <h1>Editar Registro</h1>
            <img className='btn-close'
                src={Close} alt='close button'
                onClick={() => setShowEdit(false)}
            />
            <div className='scroll-form-edit-register'>
                <div className='content-form-edit-register'>
                    <div className='register-buttons'>
                        <div style={{ backgroundColor: types === 'entrada' && '#3A9FF1' }}
                            className='btn-received'
                            onClick={() => setTypes('entrada')}
                        >
                            Entrada
                        </div>
                        <div style={{ backgroundColor: types === 'entrada' && '#B9B9B9' }}
                            className='btn-exits'
                            onClick={() => setTypes('saida')}
                        >
                            Saída
                        </div>
                    </div>
                    <div className='input-value'>
                        <label>Valor</label>
                        <input
                            name='valor'
                            type='number'
                            value={form.valor}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className='input-categories-edit'>
                        <label>Categorias</label>
                        <select
                            value={select.id}
                            onChange={(event) => handleChangeSelect(event)}
                        >
                            <option>
                                {
                                    showEdit.transaction.categoria_nome
                                        ? showEdit.transaction.categoria_nome
                                        : ''
                                }
                            </option>
                            {options.map((item) => (
                                <option
                                    key={item.id}
                                    type='text'
                                    value={item.id}>
                                    {item.nome}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='input-date'>
                        <label>Data</label>
                        <input
                            name='data'
                            type='date'
                            value={form.data}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                    <div className='input-description'>
                        <label>Descrição</label>
                        <input
                            name='descricao'
                            type='text'
                            value={form.descricao}
                            onChange={handleChangeInputValue}
                        />
                    </div>
                </div>
            </div>
            <button
                className='btn-confirm-edit-register'
            >
                Confirmar
            </button>
            <span className='error' >{erro && erro}</span>
        </form>
    )
};

export default EditRegister;