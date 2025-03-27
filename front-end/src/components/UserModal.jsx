import PropTypes from 'prop-types';
import '../estilos/usermodal.css';

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
                <h2>{data.IdAccesoUsuario ? 'Editar Usuario' : 'Registrar Nuevo Usuario'}</h2>
                <form onSubmit={onSubmit} className="formularioEditarUsuariosAdmin">
                    <input
                        className="inputUsuarioEditarAdmin"
                        type="email"
                        name="Email"
                        value={data.Email ?? ''}
                        onChange={handleChange}
                        placeholder="Ingrese correo"
                        required
                    />
                    <input
                        className="inputUsuarioEditarAdmin"
                        type="password"
                        name="Password"
                        value={data.Password ?? ''}
                        onChange={handleChange}
                        placeholder="Ingrese clave"
                        required
                    />
                    <select
                        name="Rol"
                        className="selectUsuarioEditarAdmin"
                        value={data.Rol ?? ''}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Seleccione un rol</option>
                        <option value="0">Admin</option>
                        <option value="1">Usuario Común</option>
                        <option value="2">Vendedor</option>
                    </select>
                    <button type="submit" className="botonEditarUsuariosAdmin">
                        {data.IdAccesoUsuario ? 'Guardar Cambios' : 'Registrar Usuario'}
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
        IdAccesoUsuario: PropTypes.number,
        Email: PropTypes.string,
        Password: PropTypes.string,
        Rol: PropTypes.number,
    }).isRequired,
    setData: PropTypes.func.isRequired,
};

export default UserModal;
