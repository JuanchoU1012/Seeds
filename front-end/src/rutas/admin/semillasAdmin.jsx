import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons'

import MenuLateralAdmin from '../../components/sidebarAdmin.jsx'
import NavAdmin from '../../components/navegacionAdmin'
import SeedModal from '../../components/SeedModal'
import ModalSuccessError from "../../components/ModalSuccessError.jsx"

import '../../estilos/ProductosAdmin.css'

// usertoken
import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { U401 } from '../../components/401'

const API = import.meta.env.VITE_REACT_APP_API

export const SemillasAdmin = () => {
    const [showEditarModal, setShowEditarModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const [modal, setModal] = useState({
        isOpen: false,
        message: "",
        type: "",
        onConfirm: null
    })

    const [dataForm, setDataForm] = useState({
        NombreCientSemilla: "",
        NombreComun: "",
        Descripcion: "",
        image_url: null
    })
    const [dataSemillas, setDataSemillas] = useState([]) // Ensure this is initialized as an empty array
    const [selectedSemilla, setSelectedSemilla] = useState(null)

    const [filteredSemillas, setFilteredSemillas] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [Err, setErr] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            // console.log("Fetching user info and token...")
            const UserData = await getUserInfo()
            const Token = await getTokenInfo()
            setUserData(UserData)
            setToken(Token)
            setIsLoading(false)
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            // console.log("Fetching seed data...")
            try {
                const response = await fetch(`${API}/semillas/get`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                        "Accept": "application/json"
                    }
                })
                if (response.status === 200) {
                    const data = await response.json()

                    setDataSemillas(data)
                    setFilteredSemillas(data)
                }
                else {
                    const data = await response.json()
                    console.error("Failed to fetch seed data:", data)
                    setErr(data.message || "Error al obtener datos de semillas.")
                }
            }
            catch (error) {
                console.error("Error fetching seed data:", error)
            }
        }
        fetchData()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = dataSemillas.filter(semilla => semilla.NombreComun.toLowerCase().includes(value))
        setFilteredSemillas(filtered)
    }
    const handleNuevaSemilla = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("NombreCientSemilla", dataForm.NombreCientSemilla)
        formData.append("NombreComun", dataForm.NombreComun)
        formData.append("Descripcion", dataForm.Descripcion)

        // Ensure a file is selected before appending
        if (dataForm.image_url) {
            formData.append("image_url", dataForm.image_url) // 🔥 FIX: Field name matches Flask backend
        }
        try {
            const response = await fetch(`${API}/semillas/create`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Accept": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: formData
            })

            const result = await response.json()

            if (response.status === 201) {
                setModal({
                    isOpen: true,
                    message: "Semilla creada exitosamente",
                    type: "success",
                })
                setDataForm({ NombreCientSemilla: "", NombreComun: "", Descripcion: "", url_imagen: null })
            } else {
                setModal({
                    isOpen: true,
                    message: "Error al crear semilla",
                    type: "error"
                })
                console.log(result)
            }
        } catch (e) {
            console.error(e)
            setModal({
                isOpen: true,
                message: "Error en la conexión",
                type: "error"
            })
        }
    }


    const handleEliminar = async (id, nombre) => {
        const eliminarsemilla = async (id) => {
            try {
                const response = await fetch(`${API}/semillas/delete/${id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': token
                    }
                })
                if (response.status === 200) {
                    setModal({ isOpen: false })
                    setTimeout(() => window.location.reload(), 500);
                }
            } catch (error) {
                console.error(error)
                setModal({
                    isOpen: true,
                    type: "error",
                    message: "Ocurrió un problema con la conexión"
                });
            }
        }

        setModal({
            isOpen: true,
            message: `¿Estás seguro de eliminar la semilla ${nombre}?`,
            type: "confirm",
            onConfirm: () => {
                setModal({ isOpen: false })
                eliminarsemilla(id)
            }
        })
    }

    const handleEditar = (semilla) => {
        setSelectedSemilla(semilla)
        setDataForm({            
            NombreCientSemilla: semilla.NombreCientSemilla,
            NombreComun: semilla.NombreComun,
            Descripcion: semilla.Descripcion,
            image_url: semilla.image_url ? `${semilla.image_url}` : null,
        })
        setShowEditarModal(true)
    }

    const handleUpdateSemilla = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("NombreCientSemilla", dataForm.NombreCientSemilla)
        formData.append("NombreComun", dataForm.NombreComun)
        formData.append("Descripcion", dataForm.Descripcion)
        formData.append("image_url", dataForm.image_url)

        try {
            const response = await fetch(`${API}/semillas/update/${selectedSemilla.IdSemilla}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: formData
            })
            if (response.status === 200) {
                setShowEditarModal(false)
                setModal({
                    isOpen: true,
                    message: "Semilla actualizada exitosamente",
                    type: "success"
                })
            }
            else {
                setModal({
                    isOpen: true,
                    message: "Error al actualizar semilla",
                    type: "error"
                })
            }
        } catch (error) {
            console.error('Error:', error)
            setModal({
                isOpen: true,
                type: "error",
                message: "Ocurrió un problema con la conexión"
            });
        }
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>
    }

    if (!userData || userData.rol !== 0) {
        return <U401 />
    }

    return (
        <div className="SemillasAdmin">
            {Err && <div>{Err}</div>}
            <NavAdmin />
            <MenuLateralAdmin />
            {/* <div className="container"> */}
            <h1>Semillas</h1>
            <div className="input-container">
                <input className="buscarSemillasAdmin"
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch} />
            </div>
            <div className="botones-container">
            <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Semilla</button>
            </div>
            <div className="crudSemillasAdmin">
                <table className="table">

                <thead>
                    <tr>
                        <th className="tituloCrudSemillas">Nombre Científico</th>
                        <th className="tituloCrudSemillas">Nombre Común</th>
                        <th className="tituloCrudSemillas">Descripción</th>
                        <th className="tituloCrudSemillas">Imagen</th>
                        <th className="tituloCrudSemillas">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(!filteredSemillas) ?
                        <tr>
                            <td colSpan="5">No hay semillas disponibles.</td>
                        </tr>
                        :
                        filteredSemillas.map((semilla) => (
                            <tr key={semilla.IdSemilla}>
                                <td>{semilla.NombreCientSemilla}</td>
                                <td>{semilla.NombreComun}</td>
                                <td>{semilla.Descripcion}</td>
                                <td className="crud-img"><img src={`${semilla.image_url}`} alt={semilla.NombreComun} />
                                </td>
                                <td className="accionesSemillasAdmin">
                                    <NavLink className='actualizarSemillas'>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEditar(semilla)} />
                                    </NavLink>

                                    <NavLink className='eliminarSemillas'>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleEliminar(semilla.IdSemilla, semilla.NombreComun)} />
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            </div>

            {/* Edit Modal */}
            <SeedModal
                isOpen={showEditarModal}
                onClose={() => {
                    setShowEditarModal(false)
                    setDataForm({
                        NombreCientSemilla: "",
                        NombreComun: "",
                        Descripcion: "",
                        image_url: ""
                    })
                }}
                onSubmit={handleUpdateSemilla}
                data={dataForm}
                setData={setDataForm}
            />

            {/* New Modal */}
            <SeedModal
                isOpen={showNuevoModal}
                onClose={() => setShowNuevoModal(false)}
                onSubmit={handleNuevaSemilla}
                data={dataForm}
                setData={setDataForm}
            />

            <ModalSuccessError
                isOpen={modal.isOpen}
                type={modal.type}
                message={modal.message}
                onClose={() => setModal({ isOpen: false })}
                onConfirm={modal.onConfirm}
            />
        </div>
        // </div>
    )
}
