import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import { useNavigate } from 'react-router-dom';
import { Apiurl } from '../services/apirest';
import Header from '../template/Header';
import Swal from 'sweetalert2'; // Importa SweetAlert2

function Editar() {
    const { id } = useParams(); // Accede al parámetro "id" de la ruta "/editar/:id"
    const navigate = useNavigate();
    
    const [form, setForm] = useState({
        Title: '',
        Description: '',
        Price: '',
        Date: '',
        token: '',
        ProductoId: ''
    });
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        let url = Apiurl + '/api/products/' + id;
        let productoId = id;
    
        axios.get(url)
            .then((response) => {
                if (response && response.data && response.data.data && response.data.data.attributes && response.status === 200) {
                    const responseData = response.data.data.attributes;
                    setForm({
                        Title: responseData.Title,
                        Description: responseData.Description,
                        Price: responseData.Price,
                        Date: responseData.Date,
                        token: localStorage.getItem("token"),
                        productoId: productoId
                    });
                } else {
                    setError(true);
                    setErrorMsg('La respuesta de la API no tiene la estructura esperada');
                }
            })
            .catch((error) => {
                if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
                    setError(true);
                    setErrorMsg(error.response.data.error.message);
                } else {
                    setError(true);
                    setErrorMsg('Error al conectar al API');
                }
            });
    }, [id]);
    
    const handleUpdate = () => {
        let url = Apiurl + '/api/products/' + id;
    
        const updatedData = {
            data: {
                Title: form.Title,
                Description: form.Description,
                Price: form.Price,
                Date: form.Date
            }
        };
    
        axios.put(url, updatedData, {
            headers: {
                Authorization: `Bearer ${form.token}`
            }
        })
            .then((response) => {
                axios.get(url)
                    .then((response) => {
                        if (response && response.data && response.data.data && response.data.data.attributes) {
                            const responseData = response.data.data.attributes;
                            setForm({
                                Title: responseData.Title,
                                Description: responseData.Description,
                                Price: responseData.Price,
                                Date: responseData.Date,
                                token: localStorage.getItem("token"),
                                productoId: id
                            });
                            // Muestra una alerta de éxito
                            Swal.fire('Éxito', 'Producto actualizado exitosamente', 'success');
                        } else {
                            setError(true);
                            setErrorMsg('La respuesta de la API no tiene la estructura esperada');
                        }
                    })
                    .catch((error) => {
                        console.error('Error al obtener los datos actualizados:', error);
                    });
            })
            .catch((error) => {
                console.error('Error al actualizar datos:', error);
            });
    };

    const handleDelete = () => {
        Swal.fire({
            title: '¿Estás seguro de que deseas eliminar este producto?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                let url = Apiurl + '/api/products/' + id;
                const token = localStorage.getItem("token");

                axios
                    .delete(url, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    .then((response) => {
                        console.log('Producto eliminado exitosamente:', response.data);
                        navigate('/dashboard');
                    })
                    .catch((error) => {
                        console.error('Error al eliminar producto:', error);
                    });
            }
        });
    };

    return (
        <React.Fragment>
            <Header/>
            <div className='container'>
                <h3>editar productos</h3>
            </div>
            <div className='container'>
                <form>

                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Titulo</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="Title"
                                placeholder="Titulo"
                                value={form.Title} // Establece el valor del campo a form.Title
                                onChange={(e) => setForm({ ...form, Title: e.target.value })} // Actualiza form.Title al cambiar el campo
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Descripcion</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="Description"
                                placeholder="Descripcion"
                                value={form.Description} // Establece el valor del campo a form.Description
                                onChange={(e) => setForm({ ...form, Description: e.target.value })} // Actualiza form.Description al cambiar el campo
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Precio</label>
                        <div className="col-sm-10">
                            <input
                                type="text"
                                className="form-control"
                                name="Price"
                                placeholder="Precio"
                                value={form.Price} // Establece el valor del campo a form.Price
                                onChange={(e) => setForm({ ...form, Price: e.target.value })} // Actualiza form.Price al cambiar el campo
                            />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Fecha</label>
                        <div className="col-sm-10">
                            <input
                                type="date"
                                className="form-control"
                                name="Date"
                                value={form.Date} // Establece el valor del campo a form.Date
                                onChange={(e) => setForm({ ...form, Date: e.target.value })} // Actualiza form.Date al cambiar el campo
                            />
                        </div>
                    </div>
                    <button type="button" className="btn btn-info" onClick={handleUpdate}>
                        Actualizar datos
                    </button>
                    <button type="button" className="btn btn-danger" onClick={handleDelete}>
                        Eliminar Producto
                    </button>

                    <a type="button" className="btn btn-info" href="/dashboard">
                        Cancelar
                    </a>
                </form>
            </div>
        </React.Fragment>
    );
}

export default Editar;
