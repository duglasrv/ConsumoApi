import React, { useState } from 'react';
import '../assets/css/Login.css';
import { Apiurl } from '../services/apirest';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

function Login() {
    const [form, setForm] = useState({
        identifier: '',
        password: '',
    });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate(); // Obtiene la función navigate

    const manejadorSubmit = (e) => {
        e.preventDefault();
    };

    const manejadorChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const manejadorBoton = () => {
        let url = Apiurl + '/api/auth/local/';
        axios
            .post(url, form)
            .then((response) => {
                if (response.status === 200) {
                    localStorage.setItem('token', response.data.jwt);
                    navigate('/dashboard'); // Usa navigate para redirigir al usuario al dashboard después del inicio de sesión exitoso
                }
            })
            .catch((error) => {
                console.error('Error en la solicitud:', error);
                console.log('Error en status', error.response.status);
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                    setError(true);
                    setErrorMsg(error.response.data.error.message);
                } else {
                    setError(true);
                    setErrorMsg('Error al conectar al API');
                }
            });
    };

    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src="https://static-00.iconduck.com/assets.00/vue-js-icon-512x442-k8qh9h45.png" id="icon" alt="User Icon" />
                    </div>
                    <form onSubmit={manejadorSubmit}>
                        <input type="text" id="login" className="fadeIn second" name="identifier" placeholder="login" onChange={manejadorChange} />
                        <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={manejadorChange} />
                        <input type="submit" className="fadeIn fourth" value="Log In" onClick={manejadorBoton} />
                    </form>
                    <div id="formFooter">
                        {error && (
                            <div className="alert alert-danger" role="alert">
                                {errorMsg}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
