import React from "react";
import { useState } from "react";
import '../estilos/sidebar.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStore, faBars, faSeedling, faBook, faUsers } from "@fortawesome/free-solid-svg-icons";



const MenuLateralAdmin = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };
    return (
        <>
        <button className= "menuToggle" onClick = { toggleSidebar } >
            <FontAwesomeIcon icon={ faBars } />
                </button>
                < div className = {`menuLateral ${sidebarOpen ? "open" : "closed"}`
}>
    <ul className="ulMenuLateral" >
        <li><NavLink className='linkVendedorSidebar' to = '/semillasAdmin' > <FontAwesomeIcon  className="iconosSidebar" icon = { faSeedling } style = {{ color: "#71277a",}} />Semillas</NavLink > </li>
            < li > <NavLink className='linkVendedorSidebar' to = "/recetasAdmin" > <FontAwesomeIcon  className="iconosSidebar" icon = { faBook } style = {{ color: "#71277a",}} />Recetas</NavLink > </li>
                < li > <NavLink className='linkVendedorSidebar' to = "/recetasAdmin" > <FontAwesomeIcon  className="iconosSidebar" icon = { faStore } style = {{ color: "#71277a",}} />Tienda</NavLink > </li>
                    < li > <NavLink className='linkVendedorSidebar' to = '/usuariosAdmin' > <FontAwesomeIcon icon={ faUsers } style = {{ color: "#71277a",}} />Usuarios</NavLink > </li>

                        </ul>

                        </div>
                        </>
    );
}

export default MenuLateralAdmin;