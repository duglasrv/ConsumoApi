import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams
import { Apiurl } from '../services/apirest';
import Header from '../template/Header';

function Editar() {
    const { id } = useParams(); // Accede al parámetro "id" de la ruta "/editar/:id"

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
                //console.log(response);
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
                    // Manejar el caso en el que la respuesta no tenga la estructura esperada
                    setError(true);
                    setErrorMsg('La respuesta de la API no tiene la estructura esperada');
                }
                //console.log("form:", form);
            })
            .catch((error) => {
                //console.error('Error en la solicitud:', error);
                //console.log('Error en status', error.response ? error.response.status : 'No se pudo obtener el estado');
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
        axios.put(url, form, {
            headers: {
                Authenticated: `Bearer ${form.token}` // Agrega el token de autorización en los encabezados
            }
        })
            .then((response) => {
                // Handle successful update
                console.log('Datos actualizados exitosamente:', response.data);
                // Puedes redirigir o realizar alguna acción adicional después de la actualización
            })
            .catch((error) => {
                console.error('Error al actualizar datos:', error);
                // Handle error
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
                    </form>
                </div>
            </React.Fragment>
    );
}

export default Editar;