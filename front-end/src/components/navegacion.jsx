import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import '../estilos/navegacion.css';
import logo from '../imagenes/logo.png';


const Nav = () => {

    return (
        <div className="header">
            <header>
                <nav className="headerInicio">
                    <ul className="ulNavegacion">
                        <NavLink to="/">
                            <img src={logo} alt="Logo" className="imagenHeader" />
                        </NavLink>
                        <NavLink className='link' to='/login'>Inicio</NavLink>
                        <NavLink className='link' to='/registro'>Registro</NavLink>
                        <NavLink className='link' to="/tiendaPrincipio">Tienda</NavLink>
                        <NavLink className='link' to="/nosotros">Nosotros</NavLink>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Nav;