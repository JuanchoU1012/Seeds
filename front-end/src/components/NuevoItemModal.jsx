import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import '../estilos/seedmodal.css'
import Select from 'react-select';


const NuevoItemModal = ({ isOpen, onClose, onSubmit, data, setData, seedOptions }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };
    console.log(data)
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

    if (!isOpen) return null;

    const handleSeedChange = (selectedOption) => {
        setData({ ...data, IdSemilla: selectedOption ? selectedOption.value : null });
    };

    const handleUnidad = (selectedOption) => {
        setData({ ...data, UnidadDeVenta: selectedOption ? selectedOption.value : null, })
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData({ ...data, image_url: file });
        setPreview(URL.createObjectURL(file));
    };

    const unioptions = [
        { label: 'Gr', value: 1 },
        { label: "Kg", value: 2, }
    ]

    return (
        <div className="modalSemillas" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>{'Agrega Una Nueva Semilla a tu Inventario'}</h2>
                <form onSubmit={onSubmit} className="modal-form">
                    <Select
                        isClearable={true}
                        name="Semillas"
                        options={seedOptions}
                        value={seedOptions.find(option => option.value === data.IdSemilla) || null}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSeedChange}
                        placeholder="Seleccionar una semilla..."
                    />

                    <Select
                        isClearable={true}
                        name="UnidadDeVenta"
                        options={unioptions}
                        value={unioptions.find(option => option.value === data.UnidadDeVenta) || null}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleUnidad}
                        placeholder="Selecciona la unidad de venta"
                    />

                    <input
                        type="text"
                        name='PrecioDeVenta'
                        className="input-modal"
                        value={data.PrecioDeVenta}
                        onChange={handleChange}
                        placeholder="Precio X (Kg, gr, ...)"
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


                    <button type="submit" className="botonEditarProductosAdmin">
                        {'Guardar Semilla'}
                    </button>
                </form>
            </div>
        </div>
    );
};


NuevoItemModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        IdSemilla: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        UnidadDeVenta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        PrecioDeVenta: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        image_url: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(File)]),
    }).isRequired,
    setData: PropTypes.func.isRequired,
    seedOptions: PropTypes.array.isRequired
};


export default NuevoItemModal;
