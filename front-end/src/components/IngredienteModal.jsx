import Proptypes from 'prop-types';
import '../estilos/seedmodal.css'


const IngredientModal = ({ isOpen, onClose, onSubmit, data, setData }) => {
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value })
    }
    
   if (!isOpen) return null;

   return (
       <div className="modalSemillas" onClick={onClose}>
           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
               <button className="close-modal" onClick={onClose}>X</button>
               <h2>{'Nuevo Ingrediente'}</h2>
               <form onSubmit={onSubmit} className="modal-form">
                   <input
                       className="input-modal"
                       type="text"
                       name="Nombre"
                       value={data.Nombre}
                       onChange={handleChange}
                       placeholder="Nombre"
                   />
                   <button className="btn-modal" type="submit">
                    Crear Ingrediente
                   </button>
            </form>
            </div>
            </div>
    )
}

IngredientModal.propTypes = {
    isOpen: Proptypes.bool.isRequired,
    onClose: Proptypes.func.isRequired,
    onSubmit: Proptypes.func.isRequired,
    data: Proptypes.shape({Nombre: Proptypes.string}),
    setData: Proptypes.func.isRequired
}

export default IngredientModal;