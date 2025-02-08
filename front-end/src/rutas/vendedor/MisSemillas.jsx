import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-solid-svg-icons';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import NavVendedor from '../../components/navegacionVendedor'
import MenuLateral from '../../components/sidebar'
import InputSearch from '../../components/buscador';
import { useNavigate } from 'react-router-dom';

import '../../estilos/misSemillas.css'


// import GaleriaMisProductos from '../../components/galeria'



export const MisSemillas = () => {

    
    const navigate = useNavigate();
    const [dataProductos, setDataProductos] = useState([]);
    const [nombre, setNombre] = useState('');
    const [imagen, setImagen] = useState('')
    const [selectedProducto, setSelectedProducto] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false); 

    useEffect(() => {
        fetch('http://localhost:5000/semillas')
            .then(response => response.json())
            .then(data => setDataProductos(data))
            .then(datar => console.log("", datar))
            .catch(error => console.error('Error al obtener productos:', error));
},[]);

const handleEditarMisProductos = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:5000/actualizar_producto', {
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
const handleUpdateProducto = (e) => {
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

const crearProducto = async (e) => {
    e.preventDefault();
    const data = { nombre, imagen };
    try {
        const response = await fetch('http://localhost:5000/registro_productos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (response.status === 200) {
            alert('producto Registrado correctamente');
            navigate('/misProductos');
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
            <h1>MIS SEMILLAS</h1>
            {/* <input type="text" className="buscarProductosAdmin"/>
            <button  className="botonBuscarProductosAdmin"><FontAwesomeIcon icon={faMagnifyingGlass} /></button> */}
            <InputSearch/>
            <button 
                className="nuevaRecetaAdmin" 
                onClick={handleNuevoProducto} // Abrir el modal de nuevo producto
            >                
                Registrar producto
            </button>

            <div className="crudVendedorSemillas">

                {dataProductos.map((item) => (
                    <div className="cardMisProductos" key={item.id}>
                    <td className="nombreMisProductos">{item.nombre}</td>
                    <td className="inventarioMisProductos">7</td>
                    <td>
                            <img 
                                className="imagenMisProductos"
                                src={item.imagen} 
                                alt={item.nombre} 
                                />
                        </td>
                    <button className="verMasMisProductos" onClick={() => handleEditar(item)}>Editar</button>
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
                        <form className="formularioEditarRecetasAdmin" onSubmit={crearProducto}>
                            <input 
                                type="text"
                                placeholder="Ingresa el nombre del producto"
                                name="nombre"
                                value={nombre}
                                className="inputProductoEditarAdmin"
                                onChange={(e) => setNombre(e.target.value)}
                                /><br/>
                            <input 
                                type="file"
                                className="inputRecetaEditarAdmin" 
                                placeholder="Adjuntar foto" 
                                value={imagen}
                                name="imagen"
                                onChange={(e) => setImagen(e.target.value)}
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

