import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faMagnifyingGlass, faTrash} from '@fortawesome/free-solid-svg-icons';

import MenuLateralAdmin from '../../components/sidebarAdmin.jsx';
import NavAdmin from '../../components/navegacionAdmin';
import SeedModal from '../../components/SeedModal';

import '../../estilos/ProductosAdmin.css';

// usertoken
import { getUserInfo } from '../../../helpers/getuserinfo';
import { getTokenInfo } from '../../../helpers/getjwt';
import { U401 } from '../../components/401';

const API = import.meta.env.VITE_REACT_APP_API;

export const SemillasAdmin = () => {
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataForm, setDataForm] = useState({
        NombreCientSemilla: "",
        NombreComun: "",
        Descripcion: "",
        image_url: null
    });
    const [dataSemillas, setDataSemillas] = useState([]); // Ensure this is initialized as an empty array
    const [selectedSemilla, setSelectedSemilla] = useState(null);

    const [filteredSemillas, setFilteredSemillas] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [Err, setErr] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            // console.log("Fetching user info and token...");
            const UserData = await getUserInfo();
            const Token = await getTokenInfo();
            setUserData(UserData);
            setToken(Token);
            setIsLoading(false);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
        // console.log("Fetching seed data...");
        try{
            const response = await fetch(`${API}/semillas/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    "Accept": "application/json"
                }
            })
            if (response.status === 200) {
                const data = await response.json();

                setDataSemillas(data);
                setFilteredSemillas(data);
            }
            else{
                const data = await response.json();
                console.error("Failed to fetch seed data:", data);
                setErr(data.message || "Error al obtener datos de semillas.");
            }
        }
        catch (error) {
            console.error("Error fetching seed data:", error);
        }
    }
    fetchData();
}, []);

const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = dataSemillas.filter(semilla => semilla.NombreComun.toLowerCase().includes(value));
    setFilteredSemillas(filtered);
};
    const handleNuevaSemilla = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("NombreCientSemilla", dataForm.NombreCientSemilla);
        formData.append("NombreComun", dataForm.NombreComun);
        formData.append("Descripcion", dataForm.Descripcion);
        
        // Ensure a file is selected before appending
        if (dataForm.image_url) {
            formData.append("image_url", dataForm.image_url); // 🔥 FIX: Field name matches Flask backend
        } else {
            alert("Please select an image file.");
            return;
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
            });
    
            const result = await response.json();
    
            if (response.status === 201) {
                alert("Semilla creada exitosamente.");
                setDataForm({ NombreCientSemilla: "", NombreComun: "", Descripcion: "", url_imagen: null });
                window.location.reload();
            } else {
                setErr(result.error || "Error al crear la semilla.");
                console.log(result);
            }
        } catch (e) {
            console.error(e);
        }
    };
    

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`${API}/semillas/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': token
                }
            });
            if (response.status === 200) {
                setDataSemillas(dataSemillas.filter(semilla => semilla.IdSemilla !== id));
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    const handleEditar = (semilla) => {
        setSelectedSemilla(semilla);
        setDataForm({
            NombreCientSemilla: semilla.NombreCientSemilla,
            NombreComun: semilla.NombreComun,
            Descripcion: semilla.Descripcion,
            image_url: null
        });
        setShowEditarModal(true);
    };

    const handleUpdateSemilla = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("NombreCientSemilla", dataForm.NombreCientSemilla);
        formData.append("NombreComun", dataForm.NombreComun);
        formData.append("Descripcion", dataForm.Descripcion);
        formData.append("image_url", dataForm.image_url);

        try {
            const response = await fetch(`${API}/semillas/update/${selectedSemilla.IdSemilla}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: formData
            });
            if (response.status === 200) {
                setDataSemillas(dataSemillas.map(semilla => 
                    semilla.IdSemilla === selectedSemilla.IdSemilla ? 
                    { ...semilla, ...dataForm } : semilla
                ));
                setShowEditarModal(false);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!userData || userData.rol !== 0) {
        return <U401 />;
    }

    return (
        <div className="SemillasAdmin">
            {Err && <div>{Err}</div>}
            <NavAdmin />
            <MenuLateralAdmin />
            {/* <div className="container"> */}
            <h1>Semillas</h1>
            <div className="buscarSemillasAdmin">
                <input className="input-search" 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm} 
                onChange={handleSearch}/>
            </div>
            <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Semilla</button>
            <table className="crudSemillasAdmin">
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
                    {(!filteredSemillas)?
                        <tr>
                            <td colSpan="5">No hay semillas disponibles.</td>
                        </tr>
                    :
                    filteredSemillas.map((semilla) => (
                        <tr key={semilla.IdSemilla}>
                            <td>{semilla.NombreCientSemilla}</td>
                            <td>{semilla.NombreComun}</td>
                            <td>{semilla.Descripcion}</td>
                            <td className="crud-img"><img src={`http://localhost:5000${semilla.image_url}`} alt={semilla.NombreComun} />
                            </td>
                            <td className="accionesSemillasAdmin">
                                <NavLink className='actualizarSemillas'>
                                    <FontAwesomeIcon icon={faEdit} onClick={() => handleEditar(semilla)} />
                                </NavLink>

                                <NavLink className='eliminarSemillas'>
                                    <FontAwesomeIcon icon={faTrash} onClick={() => handleEliminar(semilla.IdSemilla)} />
                                </NavLink>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit Modal */}
            <SeedModal 
                isOpen={showEditarModal} 
                onClose={() => setShowEditarModal(false)} 
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
        </div>
        // </div>
    );
};
