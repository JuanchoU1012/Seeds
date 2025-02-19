import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacioVendedor.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../helpers/logout";


const NavVendedor = () => {


    return (
        <div className="headerVendedor">
            <header>
                <nav className="headerInicioVendedor">
                    <ul className="ulNavegacioVendedor">
                        <NavLink >
                            <img src={logo} alt="Logo" className="imagenHeaderVendedor" />
                        </NavLink>

                    </ul>
                    <div className="salirVendedor">
                        <button className="botonIconoVendedor"onClick={handleNuevoReceta} >
                            <FontAwesomeIcon icon={faUser} className="iconosVendedor"/>
                        </button>
                        <NavLink className='linkVendedor' to="/"><FontAwesomeIcon icon={faRightFromBracket} className="iconosVendedor"/></NavLink>
                    </div>
                        
                </nav>
            </header>

        </div>
    )
}

export default NavVendedor;