import PropTypes from 'prop-types';
import '../estilos/vermasmodalItem.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
import { faUserCheck } from '@fortawesome/free-solid-svg-icons';
const VermasTienda = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="modalvermas">
            <div className="modal-content">
                <button className="close-modal" onClick={onClose}>X</button>
                <div className="modal-body">
                    {/* Imagen más grande */}
                    <div className="image-container">
                        {data.Ruta ? (
                            <img src={`${data.Ruta}`} alt="Preview" />
                        ) : (
                            <p>No hay imagen disponible</p>
                        )}
                    </div>
                    {/* Información del producto */}
                    <div className="info-container">
                        <h2>{data.NombreComun}</h2>
                        <p className="price">${data.PrecioDeVenta} X {data.Unidad}</p>
                        <div className="vendedor-details">
                            <h3>Detalles del Vendedor</h3>
                            <NavLink className="vendedor-info">
                                <FontAwesomeIcon icon={faUserCheck} className="user-icon" />
                                <p><strong>{data.Nombre} {data.Apellidos}</strong></p>
                            </NavLink>
                            <p>{data.NombreComercio}</p>
                            <p>{data.Telefono}</p>
                            <p>{data.Direccion}, {data.NombreMun}, {data.NombreDep}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

VermasTienda.propTypes = {
    isOpen: PropTypes.bool,
    onClose: PropTypes.func,
    data: PropTypes.object
};

export default VermasTienda;
