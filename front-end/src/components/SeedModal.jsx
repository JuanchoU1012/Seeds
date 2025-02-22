import PropTypes from 'prop-types';
import { useState } from 'react';
import '../estilos/seedmodal.css'


const SeedModal = ({ isOpen, onClose, onSubmit, data, setData }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    
    const [preview, setPreview] = useState(null);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData({ ...data, image_url: file }); 
        setPreview(URL.createObjectURL(file));
    };
    
    if (!isOpen) return null;

    return (
        <div className="modalSemillasAdmin" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>{data.IdSemilla ? 'Editar Semilla' : 'Nueva Semilla'}</h2>
                <form onSubmit={onSubmit} className="formularioEditarProductosAdmin">
                    <input
                        className="inputProductoEditarAdmin"
                        type="text"
                        name="NombreCientSemilla"
                        value={data.NombreCientSemilla}
                        onChange={handleChange}
                        placeholder="Nombre Científico"
                    />
                    <input
                        className="inputProductoEditarAdmin"
                        type="text"
                        name="NombreComun"
                        value={data.NombreComun}
                        onChange={handleChange}
                        placeholder="Nombre Común"
                    />
                    <input
                        className="inputProductoEditarAdmin"
                        type="text"
                        name="Descripcion"
                        value={data.Descripcion}
                        onChange={handleChange}
                        placeholder="Descripción de la Semilla"
                    />
    
                    <input
                        onChange={handleImageChange}
                        className="inputProductoEditarAdmin"
                        type="file"
                        name="image_url"
                        accept="image/*"
                    />
                    {preview && (
                        <div className="preview-container">
                            <img src={preview} alt="Preview" width="200" />
                        </div>
                    )}


                    <button type="submit" className="botonEditarProductosAdmin">
                        {data.IdSemilla ? 'Guardar Cambios' : 'Crear Semilla'}
                    </button>
                </form>
            </div>
        </div>
    );
};

SeedModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        IdSemilla: PropTypes.string,
        NombreCientSemilla: PropTypes.string,
        NombreComun: PropTypes.string,
        Descripcion: PropTypes.string,
        image_url: PropTypes.oneOfType([PropTypes.string,
        PropTypes.instanceOf(File)]),
    }).isRequired,
    setData: PropTypes.func.isRequired,
};

export default SeedModal;
