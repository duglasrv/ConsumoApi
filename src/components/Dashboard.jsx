import React, { useState, useEffect } from 'react';
import Header from '../template/Header';
import { Apiurl } from '../services/apirest';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    const ClickProducto = (id) => {
        navigate(`/editar/${id}`);
    };

    useEffect(() => {
        let url = Apiurl + '/api/products';
        axios.get(url).then((response) => {
            setProductos(response.data.data);
            console.log(response);
        });
    }, []); // El segundo argumento [] significa que esto se ejecutará solo una vez al montar el componente

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                            <th scope="col">Image</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {productos.map((producto, index) => {
                            return (
                                <tr key={index} onClick={() => ClickProducto(producto.id)}>
                                    <td>{producto.attributes.Title}</td>
                                    <td>{producto.attributes.Description}</td>
                                    <td>Q {producto.attributes.Price}</td>
                                    <td>{producto.attributes.Date}</td>
                                    <td>
                                        <img src={`${producto.attributes.Image}`} alt={''} />
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-info">
                                            Edit
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
