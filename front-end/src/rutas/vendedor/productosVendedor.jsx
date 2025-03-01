import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import NavVendedor from '../../components/navegacionVendedor'
import MenuLateral from '../../components/sidebar'

import '../../estilos/misSemillas.css'
  
const ProductosVendedor = () => {

    return (
        <div className="MisProductos">
            <NavVendedor />
            <MenuLateral />
            <h1>Mis semillas</h1>

            <div className="search-container">
                <input 
                    type="text" 
                    placeholder="Buscar producto..." 
                    // value={searchTerm} 
                    // onChange={handleSearch} 
                    className="input-search"
                />
            </div>
                        <button 
                className="nuevaRecetaAdmin" 
                // onClick={handleNuevoProducto}
            >                
                Registrar producto
            </button>

            <div className="crudVendedorSemillas">

                {/* {filteredProductos.map((item) => ( */}
                    <div className="cardMisProductos"
                    //  key={item.id}
                     >
                    <td className="nombreMisProductos">
                        {/* {item.nombre} */}
                        </td>
                    <td className="inventarioMisProductos"></td>
                    <td>
                            <img 
                                className="imagenMisProductos"
                                // src={item.imagen} 
                                // alt={item.nombre} 
                                />
                        </td>
                    <button className="verMasMisProductos" 
                    // onClick={() => handleEditar(item)}
                    >Editar</button>


                    </div>
{/*               ))} */}



           

         </div>
        </div>

)



}

export default ProductosVendedor