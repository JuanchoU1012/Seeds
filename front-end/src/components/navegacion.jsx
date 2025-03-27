import React from "react";
import { NavLink } from "react-router-dom";
import "../estilos/navegacion.css";
import logo from "../imagenes/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons"; 

const Nav = () => {
    const [isOpen, setIsOpen] = React.useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="headerInicio">
            {/* Contenedor del Logo y Título */}
            <div className="logo-container">
                <NavLink to="/">
                    <img src={logo} alt="Logo" className="imagenHeader" />
                </NavLink>
                <p className="tituloHeader">Saberes Y Sabores</p>
            </div>

            {/* Botón de menú hamburguesa */}
            <div className="hamburger" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isOpen ? faTimes : faBars} />
            </div>

            {/* Menú de Navegación */}
            <ul className={`ulNavegacion ${isOpen ? "active" : ""}`}>
                <NavLink className="link" to="/InicioTienda">Tienda</NavLink>
                <NavLink className="link" to="/cartilla">Cartilla</NavLink>
                <NavLink className="link" to="/inicioSesion">Ingresar</NavLink>
                <NavLink className="linkRegistro" to="/registro">Registro</NavLink>
            </ul>
        </header>
    );
};

export default Nav;
