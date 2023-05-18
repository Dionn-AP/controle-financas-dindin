import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import Background from '../../assets/background.svg'
import Logo from '../../assets/logo.svg';
import { useState } from 'react';
import api from '../../services/api';
import { setItem } from '../../utils/storageAndFunctions';
import InputPassword from '../../components/TextFildPassword/TextFildPass';
import InputEmail from '../../components/TextFildEmail/TextFildEmail';
import SingleProgess from '../../components/SingleProgress';
import * as Sentry from "@sentry/react";

let opacityCard = '1';

function SignIn() {
    const navigate = useNavigate();
    const [successfull, setSuccessfull] = useState(false);
    const [erro, setErro] = useState('');
    const [form, setForm] = useState({
        email: '',
        senha: ''
    });

    function handleChangeInputValue(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if ((!form.email && !form.senha) || (!form.email && form.senha)) {
            setErro("Você precisa informar um e-mail válido");
            return
        }

        if (!form.senha && form.email) {
            setErro("Você precisa informar uma senha.");
            return
        }

        try {
            setSuccessfull(true);
            opacityCard = '0.8';
            const response = await api.post('/login', {
                ...form
            });

            const { token, usuario } = response.data;
            setErro('');
            setItem('token', token);
            setItem('user', usuario.id)

            if (token) {
                setTimeout(() => {
                    setSuccessfull(false);
                    opacityCard = "1";
                    navigate('/home')
                }, 1500)
            }
        } catch (error) {
            Sentry.captureException(error)
            setSuccessfull(false);
            opacityCard = "1";
            if (error.response.data.mensagem) {
                return setErro(error.response.data.mensagem);
            }
        }
    }

    return (
        <div className='container-login' style={{ backgroundImage: `url(${Background})` }}>
            <div className='container-content-login'>
                <img src={Logo} alt='logo-mark' />
                <div className='card-content'>
                    <h1>Controle suas <span>finanças</span>, <br />sem planilha chata.</h1>
                    <h2>
                        Organizar as suas finanças nunca foi tão fácil,<br />
                        com o DINDIN, você tem tudo num único lugar <br />
                        e em um clique de distância.
                    </h2>
                    <Link to='/sign-up'>
                        <button>
                            Cadastre-se
                        </button>
                    </Link>
                </div>
                <form
                    style={{ opacity: opacityCard }}
                    className='sign-in'
                    onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className='inputs'>
                        <InputEmail
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
                            mrBottom='3.5rem'
                            setForm={setForm}
                            handleChangeInputValue={handleChangeInputValue}
                        />
                    </div>
                    <button className='btn-confirm-sign-in'>Entrar</button>

                    {
                        successfull &&
                        <span className='progess-successfull'>
                            <SingleProgess />
                        </span>
                    }

                    <span className='error'>{erro && erro}</span>
                </form>
                <div className='other-register'>
                    <h2>Ou</h2>
                    <Link to='/sign-up'>
                        <button>
                            Cadastre-se
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Sentry.withProfiler(SignIn);