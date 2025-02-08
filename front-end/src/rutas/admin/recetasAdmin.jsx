import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/recetasAdmin.css';
import MenuLateral from '../../components/sidebar';
import NavAdmin from '../../components/navegacionAdmin';



const ToggleSwitch = ({ isActive, onToggle }) => (
    <div className={`toggle-switch ${isActive ? 'active' : ''}`} onClick={onToggle}>
        <div className="toggle-knob"></div>
    </div>
);

export const RecetasAdmin = () => {
    const [dataRecetas, setDataRecetas] = useState([]);
    const [selectedReceta, setSelectedReceta] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showVerMasModal, setShowVerMasModal] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); // Nuevo estado para el modal de nueva receta
    const navigate = useNavigate();

    useEffect(() => {
        // Llamada a la API para obtener usuarios
        fetch('http://localhost:5000/recetas')
            .then(response => response.json())
            .then(data => setDataRecetas(data))
            .catch(error => console.error('Error al obtener recetas:', error));
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/actualizar_receta', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: selectedReceta.id,
                    Nombre: selectedReceta.Nombre,
                    Descripcion: selectedReceta.Descripcion
                })
            });

            if (response.ok) {
                const updatedRecetas = await response.json();
                setDataRecetas(updatedRecetas); // Actualiza la lista de recetas con los datos del servidor
                setShowEditarModal(false); // Cierra el modal de edición
                alert('receta actualizada correctamente');
            } else {
                console.error("Error al actualizar la receta");
            }
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };



    const toggleActivo = (id) => {
        setDataRecetas((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, activo: !item.activo } : item
            )
        );
    };

    const handleVerMas = (receta) => {
        setSelectedReceta(receta);
        setShowVerMasModal(true);
    };

    const handleEditar = (receta) => {
        setSelectedReceta(receta);
        setEditMode(true);
        setShowEditarModal(true);
    };

    const handleUpdateReceta = (e) => {
        e.preventDefault();
        const updatedRecetas = dataRecetas.map((receta) =>
            receta.id === selectedReceta.id ? selectedReceta : receta
        );
        setDataRecetas(updatedRecetas);
        setShowEditarModal(false);
    };

    const handleNuevoReceta = () => {
        setShowNuevoModal(true); // Mostrar el modal para crear nueva receta
    };

    const handleCloseNuevoModal = () => {
        setShowNuevoModal(false); // Cerrar el modal de nueva receta
    };

    return (
        <div className="recetasAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Recetas</h1>
            <input type="text" className="buscarRecetasAdmin"/>
            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoReceta} // Abrir el modal de nueva receta
            >
                Registrar receta
            </button>

            <table className="crudRecetasAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudRecetas">Id</td>
                        <td className="tituloCrudRecetas">Nombre</td>
                        <td className="tituloCrudRecetas">Ingredientes</td>
                        <td className="tituloCrudRecetas"></td>
                        <td className="tituloCrudRecetas">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {dataRecetas.map((item) => (
                        <tr key={item.id} style={{ opacity: item.activo ? 1 : 0.5 }}>
                            <td>{item.id}</td>
                            <td>{item.Nombre}</td>
                            <td>{item.Descripcion}</td>
                            <td>
                                <button className="verMasRecetasAdmin" onClick={() => handleVerMas(item)}>
                                    Ver más
                                </button>
                            </td>
                            <td className="accionesRecetasAdmin">
                                <NavLink className='actulizarRecetas'>
                                    <FontAwesomeIcon icon={faPencil} onClick={() => handleEditar(item)} style={{ color: "#000000" }} />
                                </NavLink>
                                <ToggleSwitch
                                    isActive={item.activo}
                                    onToggle={() => toggleActivo(item.id)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para "Ver más" */}
            {showVerMasModal && (
                <div className="modal-overlay" onClick={() => setShowVerMasModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowVerMasModal(false)}>X</button>
                        <h2>Detalles de la Receta</h2>
                        <p><strong>Nombre:</strong> {selectedReceta?.Nombre}</p>
                        <p><strong>Ingredientes:</strong> {selectedReceta?.ingredientes}</p>
                        <p><strong>Descripcion:</strong> {selectedReceta?.Descripcion}</p>
                    </div>
                </div>
            )}

            {/* Modal para "Editar" */}
            {showEditarModal && (
                <div className="modalEditarRecetasAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Receta</h2>
                        <form onSubmit={handleSubmit} className="formularioEditarRecetasAdmin">
                            <input 
                                className="inputRecetaEditarAdmin" 
                                name="Nombre"
                                type="text" 
                                value={selectedReceta?.Nombre || ''}
                                onChange={(e) => setSelectedReceta({ ...selectedReceta, Nombre: e.target.value })}

                            /><br />
                            {/* <input className="inputRecetaEditarAdmin" placeholder="Ingredientes" type="text" /><br /> */}
                            <input 
                                className="inputRecetaEditarAdmin"
                                name="Descripcion"
                                type="img" 
                                value={selectedReceta?.Descripcion || ''}
                                onChange={(e) => setSelectedReceta({ ...selectedReceta, Descripcion: e.target.value })}
                            /><br />
                            <input className="inputRecetaEditarAdmin"  type="file" /><FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal para "Nueva receta" */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nueva Receta</h2>
                        <form className="formularioEditarRecetasAdmin">
                            <input className="inputRecetaEditarAdmin" placeholder="Nombre" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Ingredientes" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Descripcion" type="text" /><br />
                            <input className="inputRecetaEditarAdmin" placeholder="Adjuntar foto" type="text" /><FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar Receta</button>
                        </form>
                    </div>
                </div>
            )}
        </div>

    );
}


