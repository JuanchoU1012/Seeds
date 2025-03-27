import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select'; // Import Select from react-select
import '../estilos/recipemodal.css'

const RecipesModal = ({ isOpen, onClose, onSubmit, data, setData, seedOptions, ingredientOptions, isAdmin }) => {
    // Add validation before form submission
    console.log(data, 'modaldata')

    const [Pasos, setPasos] = useState(data.Pasos);

    const [preview, setPreview] = useState(null);

    const [showTooltip, setShowTooltip] = useState()

    useEffect(() => {
        setPasos(data.Pasos);
        if (isAdmin) {
            if (data.videoUrl instanceof File) {
                setPreview(URL.createObjectURL(data.videoUrl));
            } else if (typeof data.videoUrl === 'string') {
                setPreview(`${data.videoUrl}`);
            } else {
                setPreview(null);
            }
        }
    }, [data.videoUrl, data.Pasos, isAdmin]);

    console.log(data, 'modaldat')

    // console.log('modaldata',data)
    if (!isOpen) return null;

    console.log(Pasos)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };


    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setData({ ...data, videoUrl: file });
        setPreview(URL.createObjectURL(file));
    };

    const handleStepChange = (index, value) => {
        const newPasos = [...Pasos];
        newPasos[index] = value;
        setPasos(newPasos);
        setData({ ...data, Pasos: newPasos });
    };

    const addStep = () => {
        const newPasos = [...Pasos, ''];
        setPasos(newPasos);
        setData({ ...data, Pasos: newPasos });
    };

    const removeStep = (index) => {
        const newPasos = Pasos.filter((_, i) => i !== index);
        setPasos(newPasos);
        setData({ ...data, Pasos: newPasos });
    };

    const handleSeedChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setData({ ...data, Semillas: values });
    };

    const handleIngredientChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setData({ ...data, Ingredientes: values });
    };


    return (
        <div className="modalReceta" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>

                <div className="modal-header">
                    <h2>{data.Nombre ? 'Editar Receta' : 'Nueva Receta'}</h2>

                    {/* Icono de información con tooltip */}
                    <div
                        className="info-icon-container"
                        onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}
                    >
                        <span className="info-icon">ℹ️</span>
                        {showTooltip && (
                            <div className="tooltip">
                                Completa todos los campos para agregar una receta correctamente. <br />
                                - Nombre: Nombre de la receta,ej: Mantiequilla De Ajo.<br />
                                - Descripcion: Historia de la receta, y si tiene algun beneficio.<br />
                                - Selecciona el ingrediente ppal, semilla, e ingredientes secundarios.<br />
                                - Agrega pasos según sea necesario, Tiempo en minutos y una descripción sencilla del paso.
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={onSubmit} className='modal-form'>
                    <input
                        className='input-modal'
                        type="text"
                        name="Nombre"
                        value={data.Nombre}
                        onChange={handleChange}
                        placeholder="Nombre de la receta"
                    />

                    <textarea
                        className='input-modal'
                        name="Descripcion"
                        value={data.Descripcion}
                        onChange={handleChange}
                        placeholder="Descripción de la receta..."
                        rows="4"
                    />
                    {isAdmin && (
                        <>
                            <label className="custom-file-upload">
                                Seleccionar Video
                                <input
                                    onChange={handleVideoChange}
                                    type="file"
                                    name="videoUrl"
                                    accept="video/*"
                                    required
                                    hidden
                                />
                            </label>

                            {preview && (
                                <div className="preview-container">
                                    <video src={preview} alt="Preview" width="200" controls />
                                </div>
                            )}
                        </>
                    )}

                    <Select
                        isMulti
                        name="Semillas"
                        options={seedOptions}
                        value={seedOptions.filter(option => data.Semillas?.includes(option.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSeedChange}
                        placeholder="Seleccionar semillas..."
                    />

                    <Select
                        isMulti
                        name="Ingredientes"
                        options={ingredientOptions}
                        value={ingredientOptions.filter(option => data.Ingredientes?.includes(option.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleIngredientChange}
                        placeholder="Seleccionar ingredientes..."
                    />

                    {!data.IdReceta && (
                        <>
                            {Pasos.map((paso, index) => (
                                <div key={index} className=''>
                                    <label>Paso {index + 1}:</label>
                                    <div className="modalPasos">
                                        <input
                                            className='input-modal'
                                            type="text"
                                            value={paso}
                                            onChange={(e) => handleStepChange(index, e.target.value)}
                                            placeholder={`Paso ${index + 1}`}
                                        />
                                        <button type="button" onClick={() => removeStep(index)}>🗑️</button>
                                    </div>
                                </div>
                            ))}
                            <button type="button" className='btn-modal' onClick={addStep}>➕ Agregar Paso</button>
                        </>
                    )}

                    <button type="submit" className='btn-modal'>
                        {data.Nombre ? 'Guardar Cambios' : 'Crear Receta'}
                    </button>
                </form>
            </div>
        </div>
    );
};

RecipesModal.propTypes = {
    isAdmin: PropTypes.bool.isRequired,
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        IdReceta: PropTypes.string,
        Nombre: PropTypes.string,
        Descripcion: PropTypes.string,
        Semillas: PropTypes.array,
        Ingredientes: PropTypes.array,
        Pasos: PropTypes.array,
        videoUrl: PropTypes.oneOfType([PropTypes.string,
        PropTypes.instanceOf(File)]),
    }).isRequired,
    setData: PropTypes.func.isRequired,
    seedOptions: PropTypes.array.isRequired,
    ingredientOptions: PropTypes.array.isRequired
};

export default RecipesModal;