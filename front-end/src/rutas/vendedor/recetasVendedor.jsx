import React, { useState, useEffect } from "react";
import NavVendedor from '../../components/navegacionVendedor'
import MenuLateral from '../../components/sidebar'
import '../../estilos/recetasVendedor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import InputSearch from '../../components/buscador';



    
export const RecetasVendedor = () => {
    const [dataRecetas, setDataRecetas] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('')
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); 

    useEffect(() => {
        // Llamada a la API para obtener usuarios
        fetch('http://localhost:5000/recetas')
            .then(response => response.json())
            .then(data => setDataRecetas(data))
            .catch(error => console.error('Error al obtener recetas:', error));
    },[]);

const handleEditarMisProductos = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/actualizar_receta', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: selectedProducto.id,
                nombre: selectedProducto.nombre,
                imagen: selectedProducto.imagen
            })
        });

        if (response.ok) {
            const updateSemillas = await response.json();
            setDataProductos(updateSemillas); // Actualiza la lista de prodcutos con los datos del servidor
            setShowEditarModal(false); // Cierra el modal de edición
            alert('productos actualizada correctamente');
        } else {
            console.error("Error al actualizar la prodcuto");
        }
    } catch (error) {
        console.error("Error al hacer la petición:", error);
    }
};


const handleEditar = (Producto) => {
    setSelectedProducto(Producto);
    setEditMode(true);
    setShowEditarModal(true);
};
const handleUpdateProdcuto = (e) => {
    e.preventDefault();
    const updateSemillas = dataProductos.map((prodcuto) =>
        prodcuto.id === selectedProducto.id ? selectedProducto : prodcuto
    );
    setDataProductos(updateSemillas);
    setShowEditarModal(false);
};

const handleNuevoProducto = () => {
    setShowNuevoModal(true); // Mostrar el modal para crear nuevo producto
};
const handleCloseNuevoModal = () => {
    setShowNuevoModal(false); // Cerrar el modal de nuevo producto
};

const crearReceta = async (e) => {
    e.preventDefault();
    const data = { nombre, descripcion };
    try {
        const response = await fetch('http://localhost:5000/registro_recetas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 200) {
            alert('receta Registrado correctamente');
            navigate('/recetasVendedor');
        } else {
            console.error('Error:', result.message || 'Error al registrarse');
        }
    } catch (error) {
        console.error('Error de red. Intenta nuevamente más tarde.', error);
    }
};


    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateral />
            <h1>RECETAS VENDEDOR</h1>
            <InputSearch/>
            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoProducto} // Abrir el modal de nuevo producto
            >                
                Registrar Receta
            </button>

            <div className="crudVendedorSemillas">

            {dataRecetas.map((item) => (
                <div className="cardRecetasVendedor">

                        <tr key={item.id} className="">
                            <td>{item.id}</td><br />
                            <td>{item.Nombre}</td><br />
                            <td>{item.Descripcion}</td><br />
 
                        </tr>
                </div>
                    ))}



              {/* Modal para "Editar" */}
              {showEditarModal && (
                <div className="modalEditarProductosAdmin" onClick={() => setShowEditarModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={() => setShowEditarModal(false)}>X</button>
                        <h2>Editar Producto</h2>
                        <form onSubmit={handleEditarMisProductos} className="formularioEditarProductosAdmin">
                            <input 
                                className="inputProductoEditarAdmin"
                                type="text"
                                name="nombre"
                                value={selectedProducto?.nombre || ''}
                                onChange={(e) => setSelectedProducto({ ...selectedProducto, nombre: e.target.value })}
                            /><br />
                            <input 
                                className="inputProductoEditarAdmin" 
                                type="file" 
                                name="imagen"
                                onChange={(e) => setSelectedProducto({ ...selectedProducto, imagen: e.target.value })}
                                />
                                <FontAwesomeIcon icon={faImages} className="iconoFotoProductosAdmin"/>
                                
                            <button type="submit" className="botonEditarProductosAdmin">Guardar Cambios</button>
                        </form>
                    </div>
                </div>
                )}
                   {/* Modal para "Nuevo producto" */}
            {showNuevoModal && (
                <div className="modal-overlay" onClick={handleCloseNuevoModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={handleCloseNuevoModal}>X</button>
                        <h2>Registrar Nuevo producto</h2>
                        <form className="formularioEditarRecetasAdmin" onSubmit={crearReceta}>
                            <input 
                                type="text"
                                placeholder="Ingresa el nombre de la receta"
                                name="nombre"
                                value={nombre}
                                className="inputProductoEditarAdmin"
                                onChange={(e) => setNombre(e.target.value)}
                                /><br/>
                            <input 
                                type="text"
                                placeholder="Ingresa la descripcion de la receta"
                                name="descripcion"
                                value={descripcion}
                                className="inputProductoEditarAdmin"
                                onChange={(e) => setDescripcion(e.target.value)}
                                /><br/>
                            <input 
                                type="file"
                                className="inputRecetaEditarAdmin" 
                                placeholder="Adjuntar foto" 
                                // value={imagen}
                                name="imagen"
                                // onChange={(e) => setImagen(e.target.value)}
                            />
                            <FontAwesomeIcon icon={faImages} className="iconoFotoRecetasAdmin"/>
                            <button type="submit" className="botonEditarRecetasAdmin">Registrar producto</button>
                        </form>
                    </div>
                </div>
            )}

        </div>
    </div>

)



}

