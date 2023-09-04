import React from 'react';
import '../assets/css/Login.css';

import {Apiurl} from '../services/apirest'
import axios from 'axios';
class Login extends React.Component {

    state={
        form:{
            "usuario":"",
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

    manejadorBoton = () =>{
        let url = Apiurl
        axios.post(url, this.state.form)
        .then(response =>{
            console.log(response)
        })
        
    }


    render() {
        return (
            <React.Fragment>
                <div className="wrapper fadeInDown">
                    <div id="formContent">

                        <div className="fadeIn first">
                            <img src="https://static-00.iconduck.com/assets.00/vue-js-icon-512x442-k8qh9h45.png" id="icon" alt="User Icon" />
                        </div>

    
                        <form onSubmit={this.manejadorSubmit}>
                            <input type="text" id="login" className="fadeIn second" name="login" placeholder="login" onChange={this.manejadorChange} />
                            <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={this.manejadorChange} />
                            <input type="submit" className="fadeIn fourth" value="Log In" onClick={this.manejadorBoton} />
                        </form>

    
                        <div id="formFooter">
                            Recuperacion
                        </div>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Login;
