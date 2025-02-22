<<<<<<< HEAD
import '../../estilos/ProductosAdmin.css';
import MenuLateral from '../../components/sidebarAdmin';
import NavAdmin from '../../components/navegacionAdmin';
import IngredienteModal from '../../components/IngredienteModal.jsx';
import { useEffect, useState } from "react";
import { getUserInfo } from '../../../helpers/getuserinfo';
import { getTokenInfo } from '../../../helpers/getjwt';
import { U401 } from '../../components/401';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';
=======
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import '../../estilos/ProductosAdmin.css'
import MenuLateral from '../../components/sidebarAdmin'
import NavAdmin from '../../components/navegacionAdmin'
import SeedModal from '../../components/SeedModal'
import { useEffect, useState } from "react"
import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { U401 } from '../../components/401'
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6

const API = import.meta.env.VITE_REACT_APP_API

export const ProductosRecetasAdmin = () => {
<<<<<<< HEAD
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataForm, setDataForm] = useState({
        Nombre: ''
    });
    const [dataProductos, setDataProductos] = useState([]); // Ensure this is initialized as an empty array
    const [Err, setErr] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const UserData = await getUserInfo();
            const Token = await getTokenInfo();
            setUserData(UserData);
            setToken(Token);
            setIsLoading(false);
        };
        fetchData();
    }, []);
=======
    const [showEditarModal, setShowEditarModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false)
    const [userData, setUserData] = useState(null)
    const [token, setToken] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [dataForm, setDataForm] = useState({
        NombreCientSemilla: "",
        NombreComun: "",
        Descripcion: "",
        image_url: null
    })
    const [dataSemillas, setDataSemillas] = useState([]) // Ensure this is initialized as an empty array
    const [selectedSemilla, setSelectedSemilla] = useState(null)
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
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6

    useEffect(() => {
        const fetchData = async () => {
        // console.log("Fetching seed data...")
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
<<<<<<< HEAD
                const data = await response.json();
                setDataProductos(data);
            }
            else{
                const data = await response.json();
                console.error("Failed to fetch ingredient data:", data);
                setErr(data.message || "Error al obtener datos de ingredientes.");
            }
        }
        catch (error) {
            console.error("Error fetching ingredient data:", error);
=======
                const data = await response.json()
                console.log("Fetched seed data:", data)
                setDataSemillas(data)
            }
            else{
                const data = await response.json()
                console.error("Failed to fetch seed data:", data)
                setErr(data.message || "Error al obtener datos de semillas.")
            }
        }
        catch (error) {
            console.error("Error fetching seed data:", error)
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6
        }
    }
    fetchData()
}, [])

<<<<<<< HEAD
    const handleNuevoProducto = async (e) => {
        e.preventDefault();
=======
    const handleNuevaSemilla = async (e) => {
        e.preventDefault()
    
        const formData = new FormData()
        formData.append("NombreCientSemilla", dataForm.NombreCientSemilla)
        formData.append("NombreComun", dataForm.NombreComun)
        formData.append("Descripcion", dataForm.Descripcion)
        
        // Ensure a file is selected before appending
        if (dataForm.image_url) {
            formData.append("image_url", dataForm.image_url) // 🔥 FIX: Field name matches Flask backend
        } else {
            alert("Please select an image file.")
            return
        }
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6
        try {
            const response = await fetch(`${API}/products/create`, {
                method: "POST",
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-TOKEN": token
                },
<<<<<<< HEAD
                body: JSON.stringify(dataForm)
            });
=======
                body: formData
            })
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6
    
            const result = await response.json()
    
            if (response.status === 201) {
<<<<<<< HEAD
                alert("Semilla creada exitosamente.");
                setDataForm({Producto: ''});
                window.location.reload();
            } else {
                setErr(result.error || "Error al crear el ingrediente.");
                console.log(result);
=======
                alert("Semilla creada exitosamente.")
                setDataForm({ NombreCientSemilla: "", NombreComun: "", Descripcion: "", url_imagen: null })
                window.location.reload()
            } else {
                setErr(result.error || "Error al crear la semilla.")
                console.log(result)
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6
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
<<<<<<< HEAD
                setDataProductos(dataProductos.filter(ingrediente => ingrediente.IdProductosAlter !== id));
=======
                setDataSemillas(dataSemillas.filter(semilla => semilla.IdSemilla !== id))
            }
        } catch (error) {
            console.error('Error:', error)
        }
    }
    const handleEditar = (semilla) => {
        setSelectedSemilla(semilla)
        setDataForm({
            NombreCientSemilla: semilla.NombreCientSemilla,
            NombreComun: semilla.NombreComun,
            Descripcion: semilla.Descripcion,
            image_url: null
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
                setDataSemillas(dataSemillas.map(semilla => 
                    semilla.IdSemilla === selectedSemilla.IdSemilla ? 
                    { ...semilla, ...dataForm } : semilla
                ))
                setShowEditarModal(false)
>>>>>>> 4fd4a11af60dedc2b498326be61187b80a70c2f6
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
