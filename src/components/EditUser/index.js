import './style.css';
import api from '../../services/api';
import { useState } from 'react';
import { getItem, getHeaders } from '../../utils/storageAndFunctions';
import Close from '../../assets/close.svg';
import InputPassword from '../../components/TextFildPassword/TextFildPass';
import InputEmailOrName from '../../components/TextFildEmail/TextFildEmail';

function EditUser({
    setShowEditUser,
    user,
    lodaUser,
    setOpen,
    setAlertSuccessfullDelete
}) {
    const token = getItem('token');
    const [erro, setErro] = useState('');
    const [form, setForm] = useState({
        nome: user.nome,
        email: user.email,
        senha: '',
        contrasenha: ''
    });

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            if (form.senha.length > 12) {
                setErro("A senha deve ter no máximo 12 caractéres.");
                return
            }

            if ((form.senha.length && form.contrasenha.length) && (form.senha !== form.contrasenha)) {
                setErro('As senhas precisam ser iguais.')
                return
            }
            if (form.senha.length && !form.contrasenha.trim().length) {
                setErro('Você precisa confirmar a senha.')
                return
            }
            // eslint-disable-next-line
            const response = await api.put(`/usuario`, {
                nome: form.nome,
                email: form.email,
                senha: form.senha.trim()
            }, getHeaders(token));

            setOpen(true);
            setAlertSuccessfullDelete('Cadastro editado com sucesso!');
            lodaUser();
            setShowEditUser(false)
        } catch (error) {
            return setErro(error.response.data.mensagem);
        }
    }

    return (
        <form className='card-edit-user' onSubmit={handleSubmit}>
            <img className='btn-close'
                src={Close} alt='close button'
                onClick={() => setShowEditUser(false)}
            />
            <h1>Editar Perfil</h1>
            <div className='scroll-form-edit-user'>
                <div className='content-form-edit-user'>
                    <div className='inputs-group-edit-user'>
                        <InputEmailOrName
                            form={form}
                            type='text'
                            label='Nome'
                            setForm={setForm}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                        <InputEmailOrName
                            form={form}
                            type='text'
                            label='E-mail'
                            setForm={setForm}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                        <InputPassword
                            form={form}
                            type='password'
                            label='Senha'
                            mrBottom='2rem'
                            setForm={setForm}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                        <InputPassword
                            form={form}
                            type='password'
                            label='Confirmação de senha'
                            mrBottom='0'
                            setForm={setForm}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                    </div>
                </div>
            </div>
            <button className='btn-confirm-edit-user'>Confirmar</button>
            <span className='error' >{erro && erro}</span>
        </form>
    )
};

export default EditUser;