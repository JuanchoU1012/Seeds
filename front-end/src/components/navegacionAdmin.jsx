import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacionAdmin.css';
import logo from '../imagenes/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { logout } from "../../helpers/logout";





const NavAdmin = () => {

    return (
        <div className="headerAdmin">
            <header>
                <nav className="headerInicioAdmin">
                    <ul className="ulNavegacioAdmin">
                        <NavLink to="/principioAdmin">
                            <img src={logo} alt="Logo" className="imagenHeaderAdmin" />
                        </NavLink>
                        <NavLink className='linkAdmin' to='/recetasAdmin'>Recetas</NavLink>
                        <NavLink className='linkAdmin' to='/semillasAdmin'>Semillas</NavLink>
                        <NavLink className='linkAdmin' to="/usuariosAdmin">Usuarios</NavLink>
                    </ul>
                        <div className="salirAdmin">
                            <NavLink className='linkAdmin' to="/salirAdmin"><FontAwesomeIcon icon={faUser} className="iconosAdmin"/></NavLink>
                            <NavLink className='linkAdmin' onClick={logout}><FontAwesomeIcon icon={faRightFromBracket} className="iconosAdmin"/></NavLink>
                        </div>
                </nav>

            </header>
        </div>
    )
}

export default NavAdmin;