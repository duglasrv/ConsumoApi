import React from 'react';
import Header from '../template/Header'
import { Apiurl } from '../services/apirest';
import axios from 'axios';

class Dashboard extends React.Component {

    state = {
        productos: []
    }

    ClickProducto(id){
        console.log(id)
    }

    componentDidMount() {
        let url = Apiurl + "/api/products";
        axios.get(url)
            .then(response => {
                this.setState({
                    productos: response.data.data // Accede a los datos dentro del JSON
                })
                console.log(response);
            })
    }

    render() {
        return (
            <React.Fragment>
                <Header />
                <div className='container'>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th scope="col">Title</th>
                                <th scope="col">Description</th>
                                <th scope="col">Price</th>
                                <th scope="col">Date</th>
                                <th scope="col">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.productos.map((producto, index) => {
                                return (
                                    <tr key={index} onClick={()=>this.ClickProducto(producto.id)}>
                                        <td>{producto.attributes.Title}</td>
                                        <td>{producto.attributes.Description}</td>
                                        <td>{producto.attributes.Price}</td>
                                        <td>{producto.attributes.Date}</td>
                                        <td>{producto.attributes.Image}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default Dashboard;
