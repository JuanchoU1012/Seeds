import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacioVendedor.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../helpers/logout";


const NavVendedor = () => {
    //modal para usuario
    const [showNuevoModal, setShowNuevoModal] = useState(false); // Nuevo estado para el modal de nueva receta
    
    
    const handleNuevoReceta = () => {
        setShowNuevoModal(true); // Mostrar el modal para crear nueva receta
    };
    
    const miPerfil = () => {
        setShowNuevoModal(false); // Cerrar el modal de nueva receta
    };

    return (
        <div className="headerVendedor">
            <header>
                <nav className="headerInicioVendedor">
                    <ul className="ulNavegacioVendedor">
                        <NavLink to="/principioVendedor">
                            <img src={logo} alt="Logo" className="imagenHeaderVendedor" />
                        </NavLink>
                        <NavLink className='linkVendedor' to='/misSemillasVendedor'>Mis productos</NavLink>
                        {/* <NavLink className='linkVendedor' to='/ordenesVendedor'>Ordenes</NavLink> */}
                        <NavLink className='linkVendedor' to="/recetasVendedor">Recetas</NavLink>
                        <NavLink className='linkVendedor' to="/tiendaVendedor">Tienda</NavLink>
                    </ul>
                    <div className="salirVendedor">
                        <button className="botonIconoVendedor"onClick={handleNuevoReceta} >
                            <FontAwesomeIcon icon={faUser} className="iconosVendedor"/>
                        </button>
                        <NavLink className='linkVendedor' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosVendedor"/></NavLink>
                    </div>
                        
                </nav>
            </header>

 {/* Modal para "Mi perfil" */}
 {showNuevoModal && (
                <div className="modal-overlay" onClick={miPerfil}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="close-modal" onClick={miPerfil}>X</button>
                        <h2>Mi perfil</h2>
                        <img src="https://i.pinimg.com/474x/76/f3/f3/76f3f3007969fd3b6db21c744e1ef289.jpg" alt="" className="fotoMiPerfil"/>
                        
                        <p>Nombre: Juanito</p>
                        <p>Correo: juanito@gmail.com</p>

                    </div>
                </div>
            )}

        </div>
    )
}

export default NavVendedor;