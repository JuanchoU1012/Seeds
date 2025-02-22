import '../estilos/vermasmodal.css';
import PropTypes from 'prop-types';

const VermasReceta = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    const pasos = data.Pasos.split('|').map(paso => paso.split(": ")[1]);

    return (
        <div className="modalReceta" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <header>
                    <h2>Ver Más Receta</h2>
                    <h3>Nombre Receta</h3>
                    <p>{data['Nombre']}</p>
                </header>
                <section>
                    <h3>Descripción Receta</h3>
                    <p>{data['Descripcion']}</p>
                    <h3>Semillas Usadas</h3>
                    <p>{data['Semillasusadas']}</p>
                    <h3>Ingredientes Usados</h3>
                    <p>{data['ProductosAdicionales']}</p>
                    <h3>Pasos</h3>
                    <ol>
                        {pasos.map((paso, index) => (
                            <li key={index}>{paso}</li>
                        ))}
                    </ol>
                </section>
                <section>
                    <h3>Video</h3>
                    <div className="preview-container">
                        <video src={`http://localhost:5000${data.videourl}`} alt="Preview" width="200" controls />
                    </div>
                </section>
            </div>
        </div>
    );
};

VermasReceta.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    data: PropTypes.object
};

export default VermasReceta;