import { useState } from 'react';
import '../estilos/recipemodal.css'
import PropTypes from 'prop-types';
const VermasReceta = ({isOpen, onClose, data}) => {
    
    if (!isOpen) return null;
    
    const pasos = data.Pasos.split('|').map(paso => paso.split(": ")[1]);
    
    const [dataPasos, setData] = useState(pasos);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    console.log(pasos)


    return (
        <div className="modalReceta" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>Ver Mas Receta</h2>
                <h2>Nombre Receta</h2>
                {data['Nombre']}
                <h2>Descripcion Receta</h2>
                {data['Descripcion']}
                <h2>Semillas Usadas</h2>
                {data['Semillasusadas']}
                <h2>Ingredeintes Usuados</h2>
                {data['ProductosAdicionales']}
                <h2>Pasos</h2>
                <form action="" className="modal-form">
                {pasos.map((paso, index) => (
                    <input type="text" className="input-modal" value={paso} key={index} onChange={handleChange} />
                ))}
                </form>
                <h2>Video</h2>

            </div>
        </div>
    );
};

VermasReceta.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object
}

export default VermasReceta;