import { useState, useEffect } from 'react';

import PropTypes from 'prop-types';
import Select from 'react-select'; // Import Select from react-select
import '../estilos/recipemodal.css'

const RecipesModal = ({ isOpen, onClose, onSubmit, data, setData, seedOptions, ingredientOptions }) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        Object.entries(data).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val) => formData.append(`${key}[]`, val));
            } else {
                formData.append(key, value);
            }
        });

        onSubmit(formData);
    };
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    const [steps, setSteps] = useState(data.steps || ['']);

    useEffect(() => {
        setSteps(data.steps || ['']); // Sync when data updates
    }, [data]);

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index] = value;
        setSteps(newSteps);
        setData({ ...data, steps: newSteps });
    };

    const addStep = () => {
        const newSteps = [...steps, ''];
        setSteps(newSteps);
        setData({ ...data, steps: newSteps });
    };

    const removeStep = (index) => {
        const newSteps = steps.filter((_, i) => i !== index);
        setSteps(newSteps);
        setData({ ...data, steps: newSteps });
    };

    const handleSeedChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setData({ ...data, seeds: values });
    };

    const handleIngredientChange = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setData({ ...data, ingredients: values });
    };

    console.log("modalabierto", isOpen);
    if (!isOpen) return null;

    return (
        <div className="modalReceta" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>{data.IdReceta ? 'Editar Receta' : 'Nueva Receta'}</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Nombre"
                        value={data.Nombre || ''}
                        onChange={handleChange}
                        placeholder="Nombre de la receta"
                    />

                    <input
                        type="text"
                        name="Descripcion"
                        value={data.Descripcion || ''}
                        onChange={handleChange}
                        placeholder="Descripción"
                    />

                    <input
                        type="text"
                        name="videoUrl"
                        value={data.videoUrl || ''}
                        onChange={handleChange}
                        placeholder="URL del video"
                    />

                    <Select
                        isMulti
                        name="seeds"
                        options={seedOptions}
                        value={seedOptions.filter(option => data.seeds?.includes(option.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleSeedChange}
                        placeholder="Seleccionar semillas..."
                    />

                    <Select
                        isMulti
                        name="ingredients"
                        options={ingredientOptions}
                        value={ingredientOptions.filter(option => data.ingredients?.includes(option.value))}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        onChange={handleIngredientChange}
                        placeholder="Seleccionar ingredientes..."
                    />

                    {steps.map((step, index) => (
                        <div key={index}>
                            <label>Paso {index + 1}:</label>
                            <input
                                type="text"
                                value={step}
                                onChange={(e) => handleStepChange(index, e.target.value)}
                                placeholder={`Paso ${index + 1}`}
                            />
                            <button type="button" onClick={() => removeStep(index)}>🗑️</button>
                        </div>
                    ))}
                    <button type="button" onClick={addStep}>➕ Agregar Paso</button>

                    <button type="submit">Guardar Receta</button>

                </form>
            </div>
        </div>
    );
};

RecipesModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        IdReceta: PropTypes.string,
        Nombre: PropTypes.string,
        Descripcion: PropTypes.string,
        seeds: PropTypes.array,
        ingredients: PropTypes.array,
        steps: PropTypes.array,
        videoUrl: PropTypes.oneOfType([PropTypes.string,
        PropTypes.instanceOf(File)]),
    }).isRequired,
    setData: PropTypes.func.isRequired,
    seedOptions: PropTypes.array.isRequired,
    ingredientOptions: PropTypes.array.isRequired,
};

export default RecipesModal;