import React, { useState } from "react";
import "../estilos/sidebar.css";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faStore, faSeedling, faBook, faBoxOpen } from "@fortawesome/free-solid-svg-icons";

const MenuLateral = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <button className="menuToggle" onClick={toggleSidebar}>
                <FontAwesomeIcon icon={faBars} />
            </button>
            <div className={`menuLateral ${sidebarOpen ? "open" : "closed"}`}>
                <ul className="ulMenuLateral">
                    <li>
                        <NavLink className="linkVendedorSidebar" to="/misSemillasVendedor">
                            <FontAwesomeIcon className="iconosSidebar" icon={faSeedling} style={{ color: "#71277a" }} />Mis semillas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="linkVendedorSidebar" to="/recetasVendedor">
                            <FontAwesomeIcon className="iconosSidebar" icon={faBook} style={{ color: "#71277a" }} />Recetas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="linkVendedorSidebar" to="/productosVendedor">
                            <FontAwesomeIcon className="iconosSidebar" icon={faStore} style={{ color: "#71277a" }} />Productos
                        </NavLink>
                    </li>
                    {/* <li>
                        <NavLink className="linkVendedorSidebar" to="/">
                            <FontAwesomeIcon className="iconosSidebar" icon={faBoxOpen} style={{ color: "#71277a" }} />Inventario
                        </NavLink>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default MenuLateral;
