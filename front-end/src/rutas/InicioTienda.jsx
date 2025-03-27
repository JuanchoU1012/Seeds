import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';

import VermasTienda from "../components/vermasTienda.jsx";
import Nav from '../components/navegacion.jsx';
import '../estilos/MisSemillasVendedor.css';

const API = import.meta.env.VITE_REACT_APP_API;

export const InicioTienda = () => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [showVermasModal, setShowVermasModal] = useState(false)

    const [filteredInventario, setFilteredInventario] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API}/tienda`, {
                    method: 'GET',
                    headers: {
                        "Accept": "application/json"
                    }
                })

                const data = await response.json();
                if (response.ok && data.length > 0) {
                    setFilteredInventario(data);
                }
                else {
                    console.error("Failed to fetch inventory data:", data);
                    setError(data.message || "Error al obtener datos del inventario.");
                }
            }
            catch (error) {
                console.error("Error fetching seed data:", error);
            }
        }
        fetchOptions();
    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = filteredInventario.filter(item => item.NombreComun.toLowerCase().includes(value));
        setFilteredInventario(filtered);
    };
    const handleVermas = (item) => {
        setSelectedItem(item)
        setShowVermasModal(true)
    }
    console.log(filteredInventario, 'data');
    return (
        <div className="SemillasAdmin">
            {error && <div>{error}</div>}
            <Nav />
            {/* <div className="container"> */}
            <h1>Nuestros Cultivos Y Sus Semillas</h1>
            <div className="search-container">
                <input className="buscarSemillasAdmin"
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch} />
            </div>
            {filteredInventario.length > 0 ? (
                <div className="gallery-containeri">
                    {filteredInventario.map((item) => (
                        <div key={item.IdInventario} className="card">
                            <img src={`${item.Ruta}`} alt={item.NombreComun} className="card-image" />
                            {console.log(API, item.Ruta, 'ruta')}
                            <div className="card-content">
                                <h3 className="card-title">{item.NombreComun}</h3>
                                <p className="card-price">${item.PrecioDeVenta} X {item.Unidad}</p>
                                <div className="accionesInventario">
                                    <NavLink className='ver-mas'>
                                        <FontAwesomeIcon icon={faMagnifyingGlass} onClick={() => handleVermas(item)} />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mensaje-vacio">No hay Items disponibles </p>
            )}
            <VermasTienda
                isOpen={showVermasModal}
                onClose={() => setShowVermasModal(false)}
                data={selectedItem}
            />
        </div>
    );

};
