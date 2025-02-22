import React, { useState, useEffect } from "react"
import NavVendedor from '../../components/navegacionVendedor'
import MenuLateral from '../../components/sidebar'
import '../../estilos/recetasVendedor.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'


const RecetasVendedor = () => {
    const [dataRecetas, setDataRecetas] = useState([])
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [imagen, setImagen] = useState('')
    const [selectedProducto, setSelectedProducto] = useState(null)
    const [editMode, setEditMode] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false) 

    const [filteredProductos, setFilteredProductos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");




    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = dataProductos.filter(producto => producto.nombre.toLowerCase().includes(value));
        setFilteredProductos(filtered);
    };




    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateral />
            <h1 className="tituloRecetasVendedor">Recetas vendedor</h1>
            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    // value={searchTerm} 
                    // onChange={handleSearch} 
                    className="input-search"
                />
            </div>            <button 
                className="nuevaRecetaAdmin" 
            >                
                Registrar Receta
            </button>

            <div className="crudVendedorSemillas">

            {dataRecetas.map((item) => (
                <div className="cardRecetasVendedor">

                        <tr key={item.id} className="">
                            <td>{item.Nombre}</td><br />
                            <td>{item.Descripcion}</td><br />
                            <button className="verMasVendedor">Ver más</button>
                        </tr>
                </div>
                    ))}

        </div>
    </div>

)



}

export default RecetasVendedor