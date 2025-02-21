import PropTypes from 'prop-types';
import '../estilos/usermodal.css'
const UserModal = ({ isOpen, onClose, onSubmit, data, setData }) => {
    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    return (
        <div className="modalUsuariosAdmin" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="close-modal" onClick={onClose}>X</button>
                <h2>{data.id ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h2>
                <form onSubmit={onSubmit} className="formularioEditarUsuariosAdmin">
                    <input
                        className="inputUsuarioEditarAdmin"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        placeholder="Ingrese correo"
                    />
                    <input
                        className="inputUsuarioEditarAdmin"
                        type="password"
                        name="password"
                        value={data.password}
                        onChange={handleChange}
                        placeholder="Ingrese clave"
                    />
                    <select
                        name="rol"
                        className="selectUsuarioEditarAdmin"
                        value={data.rol}
                        onChange={handleChange}
                    >
                        <option value="0">Admin</option>
                        <option value="1">Usuario Comun</option>
                        <option value="2">Vendedor</option>
                    </select>
                    <button type="submit" className="botonEditarUsuariosAdmin">
                        {data.id ? 'Guardar Cambios' : 'Registrar Usuario'}
                    </button>
                </form>
            </div>
        </div>
    );
};

UserModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.shape({
        id: PropTypes.string,
        email: PropTypes.string,
        password: PropTypes.string,
        rol: PropTypes.string,
    }).isRequired,
    setData: PropTypes.func.isRequired,
};

export default UserModal;
