import React from "react";
import { NavLink } from "react-router-dom";
import '../estilos/navegacion.css';
import logo from '../imagenes/logo.png';


const Nav = () => {

    return (
        <div className="header">
            <header>
                <nav className="headerInicio">
                    <ul className="ulNavegacion">
                        <NavLink to='/'>
                            <img src={logo} alt="Logo" className="imagenHeader" />
                        </NavLink>
                        
                        <NavLink className='link ' to='/cartilla'>Cartilla</NavLink>
                        <NavLink className='link ' to='/inicioSesion'>Ingresar</NavLink>
                        <NavLink className='linkRegistro' to='/registro'>Registro</NavLink>
                    </ul>
                </nav>
            </header>
        </div>
    )
}

export default Nav;