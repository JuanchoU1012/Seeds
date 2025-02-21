import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../estilos/usuariosAdmin.css';
import MenuLateral from '../../components/sidebarAdmin';
import NavAdmin from '../../components/navegacionAdmin';
import UserModal from '../../components/UserModal';

const API = import.meta.env.VITE_REACT_APP_API || 'http://localhost:5000';

export const UsuariosAdmin = () => {
    const [FormData, setFormData] = useState({
        email: "",
        password: "",
        rol: ""
    });
    const [dataUsuarios, setDataUsuarios] = useState([]);
    const [selectedUsuario, setSelectedUsuario] = useState(null);
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    
    const [filteredUsuarios, setFilteredUsuarios] = useState([])
    const [searchTerm, setSearchTerm] = useState("")


    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = filteredUsuarios.filter(semilla => semilla.NombreComun.toLowerCase().includes(value));
        setFilteredUsuarios(filtered);
    };

    const validateFormData = () => {
        return FormData.email && FormData.password && FormData.rol;
    };
    

    const handleNuevoUsuario = async (e) => {
        e.preventDefault();
        if (!validateFormData()) return;
        try {
            const response = await fetch(`${API}/registro`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email: FormData.email,
                    password: FormData.password,
                    rol: FormData.rol
                }),
            });

            if (response.status === 201) {
                alert(response.text);
                setFormData({ email: "", password: "", rol: "" });
                window.location.reload();
            } else {
                const errorData = await response.json();
                console.error(errorData.message || "Registration failed");
            }
        } catch (err) {
            console.error(err.message || "An error occurred");
        }
    };

    useEffect(() => {
            const fetchData = async () => {
            // console.log("Fetching seed data...");
            try{
                const response = await fetch(`${API}/users/get`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json"
                    }
                })
                if (response.status === 200) {
                    const data = await response.json();
                    setDataUsuarios(data);
                    setFilteredUsuarios(data);
                }
                else{
                    const data = await response.json();
                    console.error("Failed to fetch user data:", data);
                }
            }
            catch (error) {
                console.error("Error fetching seed data:", error);
            }
        }
        fetchData();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API}/actualizar_usuario`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    IdAccesoUsuario: selectedUsuario.IdAccesoUsuario,
                    Email: selectedUsuario.Email,
                    Rol: selectedUsuario.Rol
                })
            });

            if (response.ok) {
                const updatedUsuarios = await response.json();
                setDataUsuarios(updatedUsuarios);
                setShowEditarModal(false);
                alert('Usuario actualizado correctamente');
            } else {
                console.error("Error al actualizar el usuario");
            }
        } catch (error) {
            console.error("Error al hacer la petición:", error);
        }
    };

    const handleEditar = (usuario) => {
        setSelectedUsuario(usuario);
        setShowEditarModal(true);
    };

    return (
        <div className="UsuariosAdmin">
            <NavAdmin />
            <MenuLateral />
            <h1>Usuarios</h1>
            <div className="search-container">
                <input className="input-search" 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={handleSearch}/>
            </div>
            <button className="botonNuevaRecetaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Receta</button>
            <table className="crudUsuariosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudUsuarios">Id</td>
                        <td className="tituloCrudUsuarios">Correo</td>
                        <td className="tituloCrudUsuarios">Rol</td>
                        <td className="tituloCrudUsuarios">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsuarios.map((user) => (
                        <tr key={user.IdAccesoUsuario}>
                            <td>{user.IdAccesoUsuario}</td>
                            <td>{user.Email}</td>
                            <td>{user.Rol}</td>
                            <td className="accionesUsuariosAdmin">
                                <NavLink className='actulizarUsuarios' onClick={() => handleEditar(user)}>
                                    <FontAwesomeIcon icon={faPencil} style={{ color: "#000000" }} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal para "Editar" */}
            <UserModal 
                isOpen={showEditarModal} 
                onClose={() => setShowEditarModal(false)} 
                onSubmit={handleUpdate} 
                data={selectedUsuario} 
                setData={setSelectedUsuario} 
            />

            {/* Modal para nuevo usuario */}
            <UserModal 
                isOpen={showNuevoModal} 
                onClose={() => setShowNuevoModal(false)} 
                onSubmit={handleNuevoUsuario} 
                data={FormData} 
                setData={setFormData} 
            />
        </div>
    );
};
