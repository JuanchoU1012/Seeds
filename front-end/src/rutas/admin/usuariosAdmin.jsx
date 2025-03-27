import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import '../../estilos/usuariosAdmin.css'
import MenuLateral from '../../components/sidebarAdmin'
import NavAdmin from '../../components/navegacionAdmin'
import UserModal from '../../components/UserModal'

import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { U401 } from '../../components/401'
import { Loading } from "../../components/loading"

const API = import.meta.env.VITE_REACT_APP_API || 'http://localhost:5000'

export const UsuariosAdmin = () => {
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [FormDataUser, setFormData] = useState({ 
        IdAccesoUsuario: "",
        Email: "", 
        Password: "", 
        Rol: "" })
    const [dataUsuarios, setDataUsuarios] = useState([])
    const [selectedUsuario, setSelectedUsuario] = useState(null)
    const [showEditarModal, setShowEditarModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [filteredUsuarios, setFilteredUsuarios] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            const userdata = await getUserInfo()
            const token = await getTokenInfo()
            setUserData(userdata)
            setToken(token)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = dataUsuarios.filter(user => user.Email.toLowerCase().includes(value))
        setFilteredUsuarios(filtered)
    }

    const validateFormData = () => {
        return FormDataUser.Email && FormDataUser.Password && FormDataUser.Rol
    }

    const handleNuevoUsuario = async (e) => {
        e.preventDefault()
        if (!validateFormData()) return

        try {
            const response = await fetch(`${API}/registro`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Email: FormDataUser.Email,
                    Password: FormDataUser.Password,
                    Rol: FormDataUser.Rol                    
                }),
            })

            if (response.status === 201) {
                alert("Usuario registrado correctamente")
                setFormData({ Email: "", Password: "", Rol: "" })
                window.location.reload()
            } else {
                const errorData = await response.json()
                console.error(errorData.message || "Registro fallido")
            }
        } catch (err) {
            console.error(err.message || "Error en la solicitud")
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API}/users/get`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        "X-CSRF-TOKEN": token
                    }
                })

                if (response.ok) {
                    const data = await response.json()
                    setDataUsuarios(data)
                    setFilteredUsuarios(data)
                } else {
                    const errorData = await response.json()
                    console.error("Error al obtener datos de usuarios:", errorData)
                }
            } catch (error) {
                console.error("Error en la solicitud:", error)
            }
        }
        if (token) fetchData()
        }, [token])
    
    console.log(selectedUsuario)
    const handleEditar = (usuario) => {
        setSelectedUsuario(usuario)
        setFormData({
            IdAccesoUsuario: usuario.IdAccesoUsuario,
            Email: usuario.Email,
            Password: usuario.Password,
            Rol: usuario.Rol
        })
        setShowEditarModal(true)
    }
    const handleUpdate = async (e) => {
        e.preventDefault();
        console.log(FormDataUser, 'datatoupdate')
        try {
            const response = await fetch(`${API}/actualizar_usuario`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify({
                    IdAccesoUsuario: FormDataUser.IdAccesoUsuario,
                    Email: FormDataUser.Email,
                    Password: FormDataUser.Password,
                    Rol: FormDataUser.Rol
                })
            });
    
            if (response.ok) {
                alert('Usuario actualizado correctamente');
                setShowEditarModal(false);
                window.location.reload();
            } else {
                console.error("Error al actualizar usuario");
            }
        } catch (error) {
            console.error("Error en la solicitud:", error);
        }
    };
    


    if (isLoading) return <Loading />
    if (!userData || userData.rol !== 0) return <U401 />

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
                    onChange={handleSearch}
                />
            </div>
            <button className="botonNuevaRecetaAdmin" onClick={() => setShowNuevoModal(true)}>Nuevo usuario</button>
            <table className="crudUsuariosAdmin">
                <thead>
                    <tr>
                        <td className="tituloCrudUsuarios">Correo</td>
                        <td className="tituloCrudUsuarios">Rol</td>
                        <td className="tituloCrudUsuarios">Acciones</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredUsuarios.length === 0 ?
                        <tr>
                            <td colSpan="3">No hay usuarios</td>
                        </tr>
                        :
                        filteredUsuarios.map((user) => (
                            <tr key={user.IdAccesoUsuario}>
                                <td>{user.Email}</td>
                                <td>{user.Rol === 0 ? "Administrador" : user.Rol === 1 ? "Vendedor" : "Cliente"}</td>
                                <td className="accionesUsuariosAdmin">
                                    <NavLink className='actulizarUsuarios' onClick={() => handleEditar(user)}>
                                        <FontAwesomeIcon icon={faEdit} style={{ color: "#000000" }} />
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
                data={FormDataUser}
                setData={setFormData}
            />

            {/* Modal para nuevo usuario */}
            <UserModal
                isOpen={showNuevoModal}
                onClose={() => setShowNuevoModal(false)}
                onSubmit={handleNuevoUsuario}
                data={FormDataUser}
                setData={setFormData}
            />
        </div>
    )
}
