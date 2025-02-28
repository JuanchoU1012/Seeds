
import '../../estilos/ProductosAdmin.css'
import MenuLateral from '../../components/sidebarAdmin'
import NavAdmin from '../../components/navegacionAdmin'
import IngredienteModal from '../../components/IngredienteModal.jsx'
import { useEffect, useState } from "react"
import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { U401 } from '../../components/401'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom'

const API = import.meta.env.VITE_REACT_APP_API

export const ProductosRecetasAdmin = () => {

   

    const [showNuevoModal, setShowNuevoModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [dataForm, setDataForm] = useState({
        Nombre: ''
    })
    const [dataProductos, setDataProductos] = useState([]) 
    const [Err, setErr] = useState("")

    useEffect(() => {
        const fetchData = async () => {
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
        try{
            const response = await fetch(`${API}/products/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                }
            })
            if (response.ok){

                const data = await response.json()
                setDataProductos(data)
            }
            else{
                const data = await response.json()
                console.error("Failed to fetch ingredient data:", data)
                setErr(data.message || "Error al obtener datos de ingredientes.")
            }
        }
        catch (error) {
            console.error("Error fetching ingredient data:", error)

        }
    }
    fetchData()
}, [])

    const handleNuevoProducto = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch(`${API}/products/create`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
                body: JSON.stringify(dataForm)
            })
    
            const result = await response.json()
    
            if (response.status === 201) {
                alert("Semilla creada exitosamente.")
                setDataForm({Producto: ''})
                window.location.reload()
            } else {
                setErr(result.error || "Error al crear el ingrediente.")
                console.log(result)
            }
        } catch (e) {
            console.error(e)
        }
    }
    

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`${API}/products/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                }
            })
            if (response.status === 200) {
                setDataProductos(dataProductos.filter(ingrediente => ingrediente.IdProductosAlter !== id))
            }
        } catch (error) {
            console.error('Error:', error)
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
            <MenuLateral />
            <h1>Ingredienetes Secundarios Recetas</h1>
            <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoModal(true)}>Nuevo Ingrediente</button>
            <table className="CrudSemillasAdmin">
                <thead>
                    <tr>
                        <th className="tituloCrudSemillas" >Semilla</th>
                        <th className="tituloCrudSemillas">Ingrediente</th>
                        <th className="tituloCrudSemillas">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {(!dataProductos)?
                        <tr>
                            <td colSpan="5">No hay Ingredientes secundarios disponibles.</td>
                        </tr>
                    :
                    dataProductos.map((ingrediente) => (
                        <tr key={ingrediente.IdProductosAlter}>
                            <td>{ingrediente.Producto}</td>
                            <td className="accionesSemillasAdmin">
                                <NavLink className='eliminarSemillas'>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleEliminar(ingrediente.IdProductosAlter)} />
                                    </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* New Modal */}
            <IngredienteModal
                isOpen={showNuevoModal} 
                onClose={() => setShowNuevoModal(false)} 
                onSubmit={handleNuevoProducto} 
                data={dataForm} 
                setData={setDataForm} 
            />
        </div>
    )
}
