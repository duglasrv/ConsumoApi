import React, { useState, useEffect } from 'react';
import Header from '../template/Header';
import { Apiurl } from '../services/apirest';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function Dashboard() {
    const [productos, setProductos] = useState([]);
    const [newProduct, setNewProduct] = useState({
        Title: '',
        Description: '',
        Price: '',
        Date: ''
    });

    const navigate = useNavigate();

    const ClickProducto = (id) => {
        navigate(`/editar/${id}`);
    };

    useEffect(() => {
        let url = Apiurl + '/api/products';
        axios.get(url).then((response) => {
            setProductos(response.data.data);
        });
    }, []);

    const handleInputChange = (e) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Crea un objeto con la estructura esperada por la API
        const requestData = {
            data: {
                Title: newProduct.Title,
                Description: newProduct.Description,
                Price: parseFloat(newProduct.Price), // Convierte el precio a un número
                Date: newProduct.Date
            }
        };
    
        // Envía los datos del nuevo producto a la API aquí
        const url = Apiurl + '/api/products';
        axios.post(url, requestData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
        .then((response) => {
            // Maneja la respuesta de la API después de crear el producto
            console.log('Producto creado exitosamente:', response.data);
    
            // Actualiza la lista de productos después de crear uno nuevo
            axios.get(Apiurl + '/api/products')
                .then((response) => {
                    setProductos(response.data.data);
                })
                .catch((error) => {
                    console.error('Error al obtener la lista de productos:', error);
                });
    
            // Muestra una alerta de éxito
            Swal.fire('Éxito', 'Producto creado exitosamente', 'success');
    
            // Puedes realizar cualquier otra acción necesaria aquí
            // Por ejemplo, redirigir a la página de detalles del nuevo producto
            //navigate(`/editar/${response.data.data.id}`);
        })
        .catch((error) => {
            console.error('Error al crear producto:', error);
            // Maneja el error de la API aquí
            Swal.fire('Error', 'Error al crear el producto', 'error');
        });
    };
    
    

    return (
        <React.Fragment>
            <Header />
            <div className="container">
                <h2>Lista de Productos</h2>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Date</th>
                            
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
                                    
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>

            <div className="container">
                <h2>Crear Nuevo Producto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="Title">Título</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Title"
                            name="Title"
                            value={newProduct.Title}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Description">Descripción</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Description"
                            name="Description"
                            value={newProduct.Description}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Price">Precio</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Price"
                            name="Price"
                            value={newProduct.Price}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Date">Fecha</label>
                        <input
                            type="date"
                            className="form-control"
                            id="Date"
                            name="Date"
                            value={newProduct.Date}
                            onChange={handleInputChange}
                            required
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary">
                        Crear Producto
                    </button>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;
