/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import '../estilos/vermasmodal.css';
import ModalSuccessError from './ModalSuccessError';

const API = import.meta.env.VITE_REACT_APP_API
const VermasReceta = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    if (!data || Object.keys(data).length === 0) {
        return <div className="modalReceta"><p>Cargando...</p></div>;
    }

    const [semillas, setSemillas] = useState([]);
    const [ingredientes, setIngredientes] = useState([]);
    const [cantidadSemillas, setCantidadSemillas] = useState({});
    const [cantidadIngredientes, setCantidadIngredientes] = useState({});
    const [modal, setModal] = useState({
        isOpen: false,
        message: '',
        type: ''
    });

    useEffect(() => {
        if (!data.Semillasusadas || !data.ProductosAdicionales) return;

        const semillasArray = data.Semillasusadas.split(',').map((Semillas, index)=>({
            IdSemilla: data.IdSemillas.split(',')[index],
            Semilla: Semillas
        }));
        
        setSemillas(semillasArray);

        const ingredientesArray = data.ProductosAdicionales.split(',').map((Ingredientes, index)=>({
            IdIngrediente: data.IdIngredientes.split(',')[index],
            Ingrediente: Ingredientes
        }));

        setIngredientes(ingredientesArray);

    }, [data]);
    // 🔹 Manejo de cambio en cantidad de semillas
    const handleSemillaChange = (id, value) => {
        setCantidadSemillas(prev => ({ ...prev, [id]: value || 0 }));
    };

    // 🔹 Manejo de cambio en cantidad de ingredientes
    const handleIngredienteChange = (id, value) => {
        setCantidadIngredientes(prev => ({ ...prev, [id]: value || 0 }));
    };

    // 🔹 Función para enviar todos los cambios en una sola petición
    const guardarCambios = async () => {
        const actualizaciones = [];

        Object.entries(cantidadSemillas).forEach(([id, cantidad]) => {
            actualizaciones.push({ cantidad, IdSemilla: Number(id), IdReceta: data.IdReceta });
        });

        Object.entries(cantidadIngredientes).forEach(([id, cantidad]) => {
            actualizaciones.push({ cantidad, IdIngrediente: Number(id), IdReceta: data.IdReceta });
        });

        try {
            const response = await fetch(`${API}/recipes/cantidades`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ actualizaciones })
            });

            if (!response.ok) {
                setModal({
                    isOpen: 'true',
                    message: 'Error al actualizar las cantidades',
                    type: 'error'
                });
            }
            setModal({
                isOpen: 'true',
                message: 'Cantidad actualizada correctamente',
                type: 'success'
            });
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
            setModal({
                isOpen: 'true',
                message: 'Error al actualizar la cantidad',
                type: 'error'
            });
        }
    };

    const pasos = data.Pasos ? data.Pasos.split('|').map(paso => paso.split(": ")[1] || paso) : [];

    return (
        <div className="modalvermas" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <header>
                    <h2>Ver Más Receta</h2>
                    <h3>Nombre Receta</h3>
                    <p>{data.Nombre || 'Sin nombre'}</p>
                </header>
                <section>
                    <h3>Descripción Receta</h3>
                    <p>{data.Descripcion || 'Sin descripción'}</p>

                    <h3>Semillas Usadas</h3>
                    {semillas.length > 0 ? semillas.map((semilla) => (
                        <div key={semilla.IdSemilla}> 
                             <label>{semilla.Semilla} </label>
                            <input
                                className='input-modal-cantidad'
                                type="text"
                                placeholder='Ml o gr'
                                value={cantidadSemillas[semilla.IdSemilla] || ' '}
                                onChange={(e) => handleSemillaChange(semilla.IdSemilla, e.target.value)}
                            />
                        </div>
                    )) : <p>No hay semillas registradas</p>}

                    <h3>Ingredientes Usados</h3>
                    {ingredientes.length > 0 ? ingredientes.map((ingrediente) => (
                        <div key={ingrediente.IdIngrediente}>
                            <label>{ingrediente.Ingrediente} </label>
                            <input
                                className='input-modal-cantidad'
                                type="text"
                                placeholder='Ml o gr'
                                value={cantidadIngredientes[ingrediente.IdIngrediente] || ' '}
                                onChange={(e) => handleIngredienteChange(ingrediente.IdIngrediente, e.target.value)}
                            />
                        </div>
                    )) : <p>No hay ingredientes registrados</p>}

                    <h3>Pasos</h3>
                    <ol>
                        {pasos.length > 0 ? pasos.map((paso, index) => (
                            <li key={index}>{paso}</li>
                        )) : <p>No hay pasos disponibles</p>}
                    </ol>
                </section>
                <section>
                    <h3>Video</h3>
                    {data.videourl ? (
                        <div className="preview-container">
                            <video src={`${data.videourl}`} alt="Preview" width="200" controls />
                        </div>
                    ) : (
                        <p>No hay video disponible</p>
                    )}
                </section>
                <button className="guardar-cambios" onClick={guardarCambios}>Guardar Cantidades</button>
            </div>
            <ModalSuccessError
            isOpen={modal.isOpen}
            message={modal.message}
            type={modal.type}
            onClose={() => setModal({ isOpen: false })}
            />
        </div>
    );
};

VermasReceta.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.shape({
        IdReceta: PropTypes.number.isRequired,
        Nombre: PropTypes.string,
        Descripcion: PropTypes.string,
        IdSemillas: PropTypes.string,
        Semillasusadas: PropTypes.string,
        IdIngredientes: PropTypes.string,
        ProductosAdicionales: PropTypes.string,
        Pasos: PropTypes.string,
        videourl: PropTypes.string
    })
};

export default VermasReceta;
