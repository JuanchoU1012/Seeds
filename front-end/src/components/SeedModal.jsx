import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import '../estilos/recipemodal.css'


const SeedModal = ({ isOpen, onClose, onSubmit, data, setData }) => {

    console.log(data, 'modaldata')
    const [preview, setPreview] = useState(null);


        useEffect(() => {
                if (data.image_url instanceof File) {
                    setPreview(URL.createObjectURL(data.image_url));
                } else if (typeof data.image_url === 'string') {
                    setPreview(`${data.image_url}`);
                } else {
                    setPreview(null);
                }
            }, [data.image_url]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData({ ...data, image_url: file }); 
        setPreview(URL.createObjectURL(file));
    };
    
    if (!isOpen) return null;

    return (
        <div className="modalSemillas" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>{data.NombreComun ? 'Editar Semilla' : 'Nueva Semilla'}</h2>
                <form onSubmit={onSubmit} className="modal-form">
                    <input
                        className="input-modal"
                        type="text"
                        name="NombreCientSemilla"
                        value={data.NombreCientSemilla}
                        onChange={handleChange}
                        placeholder="Nombre Científico"
                    />
                    <input
                        className="input-modal"
                        type="text"
                        name="NombreComun"
                        value={data.NombreComun}
                        onChange={handleChange}
                        placeholder="Nombre Común"
                    />
                    <textarea
                        className="input-modal"
                        name="Descripcion"
                        value={data.Descripcion}
                        onChange={handleChange}
                        placeholder="Descripción de la Semilla"
                        rows="4"
                    />
    
                    <input
                        onChange={handleImageChange}
                        className="input-modal"
                        type="file"
                        name="image_url"
                        accept="image/*"
                    />
                    {preview && (
                        <div className="preview-container">
                            <img src={preview} alt="Preview" width="200" />
                        </div>
                    )}


                    <button type="submit" className="btn-modal">
                        {data.NombreCientSemilla ? 'Guardar Cambios' : 'Crear Semilla'}
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
