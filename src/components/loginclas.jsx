import React from 'react';
import '../assets/css/Login.css';
import {Apiurl} from '../services/apirest'
import axios from 'axios';

class Login extends React.Component {



    state={
        form:{
            "identifier":"",
            "password":""
        },
        error:false,
        errorMsg:""
    }

    manejadorSubmit(e){
        e.preventDefault();
    }

    manejadorSubmit2 = e =>{
        e.preventDefault();
    }

    manejadorChange = async e =>{
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        //console.log(this.state.form);
    }

    manejadorBoton = () => {
        let url = Apiurl + "/api/auth/local/";
        axios
            .post(url, this.state.form)
            .then((response) => {
                if (response.status === 200) {
                    //console.log(response);
                    localStorage.setItem("token", response.data.jwt);
                    
                }
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
                console.log("Error en status", error.response.status)
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                    // Si el error contiene un mensaje específico, lo mostramos en la alerta
                    this.setState({
                        error: true,
                        errorMsg: error.response.data.error.message,
                    });
                } else {
                    // Si no hay un mensaje específico, mostramos un mensaje genérico
                    this.setState({
                        error: true,
                        errorMsg: "Error al conectar al API",
                    });
                }
            });
    };


    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src="https://static-00.iconduck.com/assets.00/vue-js-icon-512x442-k8qh9h45.png" id="icon" alt="User Icon" />
                        </div>

    
                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" id="login" className="fadeIn second" name="identifier" placeholder="login" onChange={this.manejadorChange} />
                            <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
                        </form>

    
                        <div id="formFooter">
                            {this.state.error && (
                                <div className="alert alert-danger" role="alert">
                                    {this.state.errorMsg}
                                </div>
                            )}
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
