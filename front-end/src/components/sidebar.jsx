import React from "react";
import '../estilos/sidebar.css'

const MenuLateral = () => {
    return (
        <div className="menuLateral">
            <ul className="ulMenuLateral">
                <h3 className="tituloCategorias">CATEGORIAS</h3>
                <li className="liMenuLateral">Region</li>
                <li className="liMenuLateral">Tamaño</li>
                <li className="liMenuLateral">Origen</li>
                <li className="liMenuLateral">Forma</li>
            </ul>

        </div>
    );
}

export default MenuLateral