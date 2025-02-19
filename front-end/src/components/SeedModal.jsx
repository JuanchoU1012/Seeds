import { useState, useEffect, useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import '../estilos/recipemodal.css';

// Reusable Input Component
const FormInput = ({ label, type, name, value, onChange, placeholder, required, error }) => (
  <div className="input-group">
    {label && <label htmlFor={name}>{label}</label>}
    <input
      className={`input-modal ${error ? 'input-error' : ''}`}
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      aria-invalid={!!error}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {error && <span id={`${name}-error`} className="error-message">{error}</span>}
  </div>
);

const RecipesModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  data, 
  setData, 
  seedOptions, 
  ingredientOptions,
  isLoading = false,
  error = null
}) => {
  const [steps, setSteps] = useState(data.steps || ['']);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  // Validate form fields
  const validateField = useCallback((name, value) => {
    let error = '';
    if (!value) {
      error = 'This field is required';
    } else if (name === 'videoUrl' && !value.type?.startsWith('video/')) {
      error = 'Please upload a valid video file';
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return !error;
  }, []);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    validateField(name, value);
    setData(prev => ({ ...prev, [name]: value }));
  }, [setData, validateField]);

  const handleVideoChange = useCallback((e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (validateField('videoUrl', file)) {
      setData(prev => ({ ...prev, videoUrl: file }));
      setPreview(URL.createObjectURL(file));
    }
  }, [setData, validateField]);

  const handleStepChange = useCallback((index, value) => {
    validateField(`step-${index}`, value);
    const newSteps = [...steps];
    newSteps[index] = value;
    setSteps(newSteps);
    setData(prev => ({ ...prev, steps: newSteps }));
  }, [steps, setData, validateField]);

  const addStep = useCallback(() => {
    const newSteps = [...steps, ''];
    setSteps(newSteps);
    setData(prev => ({ ...prev, steps: newSteps }));
  }, [steps, setData]);

  const removeStep = useCallback((index) => {
    const newSteps = steps.filter((_, i) => i !== index);
    setSteps(newSteps);
    setData(prev => ({ ...prev, steps: newSteps }));
  }, [steps, setData]);

  const handleSeedChange = useCallback((selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setData(prev => ({ ...prev, seeds: values }));
  }, [setData]);

  const handleIngredientChange = useCallback((selectedOptions) => {
    const values = selectedOptions.map(option => option.value);
    setData(prev => ({ ...prev, ingredients: values }));
  }, [setData]);

  const isValid = useMemo(() => {
    return Object.values(errors).every(error => !error) && 
           data.Nombre && 
           data.Descripcion && 
           data.steps?.every(step => step.trim());
  }, [errors, data]);

  useEffect(() => {
    setSteps(data.steps || ['']);
  }, [data]);

  if (!isOpen) return null;

  return (
    <div className="modalReceta" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button 
          className="close-modal" 
          onClick={onClose}
          aria-label="Close modal"
        >
          X
        </button>
        
        <h2>{data.IdReceta ? 'Editar Receta' : 'Nueva Receta'}</h2>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={onSubmit} className="modal-form" noValidate>
          <FormInput
            label="Nombre de la receta"
            type="text"
            name="Nombre"
            value={data.Nombre}
            onChange={handleChange}
            required
            error={errors.Nombre}
          />

          <FormInput
            label="Descripción"
            type="text"
            name="Descripcion"
            value={data.Descripcion}
            onChange={handleChange}
            required
            error={errors.Descripcion}
          />

          <div className="input-group">
            <label htmlFor="videoUrl">Video</label>
            <input
              className={`input-modal ${errors.videoUrl ? 'input-error' : ''}`}
              type="file"
              id="videoUrl"
              name="videoUrl"
              onChange={handleVideoChange}
              accept="video/*"
              aria-invalid={!!errors.videoUrl}
              aria-describedby={errors.videoUrl ? 'videoUrl-error' : undefined}
            />
            {errors.videoUrl && <span id="videoUrl-error" className="error-message">{errors.videoUrl}</span>}
          </div>

          {preview && (
            <div className="preview-container">
              <video src={preview} controls width="200" aria-label="Video preview" />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="seeds">Semillas</label>
            <Select
              isMulti
              id="seeds"
              name="seeds"
              options={seedOptions}
              value={seedOptions.filter(option => data.seeds?.includes(option.value))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleSeedChange}
              placeholder="Seleccionar semillas..."
              aria-label="Select seeds"
            />
          </div>

          <div className="input-group">
            <label htmlFor="ingredients">Ingredientes</label>
            <Select
              isMulti
              id="ingredients"
              name="ingredients"
              options={ingredientOptions}
              value={ingredientOptions.filter(option => data.ingredients?.includes(option.value))}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleIngredientChange}
              placeholder="Seleccionar ingredientes..."
              aria-label="Select ingredients"
            />
          </div>

          {steps.map((step, index) => (
            <div key={index} className="step-group">
              <label htmlFor={`step-${index}`}>Paso {index + 1}:</label>
              <FormInput
                type="text"
                name={`step-${index}`}
                value={step}
                onChange={(e) => handleStepChange(index, e.target.value)}
                placeholder={`Paso ${index + 1}`}
                required
                error={errors[`step-${index}`]}
              />
              <button 
                type="button" 
                onClick={() => removeStep(index)}
                aria-label={`Remove step ${index + 1}`}
              >
                🗑️
              </button>
            </div>
          ))}

          <button 
            type="button" 
            className="btn-modal" 
            onClick={addStep}
            aria-label="Add step"
          >
            ➕ Agregar Paso
          </button>

          <button 
            type="submit" 
            className="btn-modal" 
            disabled={!isValid || isLoading}
          >
            {isLoading ? 'Guardando...' : 'Guardar Receta'}
          </button>
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
    videoUrl: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.instanceOf(File)
    ]),
  }).isRequired,
  setData: PropTypes.func.isRequired,
  seedOptions: PropTypes.array.isRequired,
  ingredientOptions: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
};

export default RecipesModal;