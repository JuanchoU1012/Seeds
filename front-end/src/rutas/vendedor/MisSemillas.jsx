import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faMagnifyingGlass, faTrash } from '@fortawesome/free-solid-svg-icons';

import MenuLateral from '../../components/sidebar.jsx';
import NavAdmin from '../../components/navegacionAdmin';

import SeedModal from '../../components/SeedModal';
import NuevoItemModal from '../../components/NuevoItemModal.jsx';

import '../../estilos/MisSemillasVendedor.css';

// usertoken
import { getUserInfo } from '../../../helpers/getuserinfo';
import { getTokenInfo } from '../../../helpers/getjwt';
import { U401 } from '../../components/401';

const API = import.meta.env.VITE_REACT_APP_API;

export const MisSemillasVendedor = () => {
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [showNuevoItemModal, setShowNuevoItemModal] = useState(false);

    const [userData, setUserData] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [dataForm, setDataForm] = useState({
        NombreCientSemilla: "",
        NombreComun: "",
        Descripcion: "",
        image_url: null
    });

    const [dataFormInv, setDataFormInv] = useState({
        IdSemilla: "",
        UnidadDeVenta: "",
        PrecioDeVenta: "",
        image_url: null,
        IdComercio: ""
    });
    const [dataInventario, setDataInventario] = useState([]); // Ensure this is initialized as an empty array
    const [selectedItem, setSelectedItem] = useState(null);

    const [seedOptions, setSeedOptions] = useState([]);

    const [filteredInventario, setFilteredInventario] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

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
        const fetchOptions = async () => {
            try {
                const response = await fetch(`${API}/vendedores/inventario`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        "Accept": "application/json",
                        "X-CSRF-TOKEN": token
                    }
                })
                const data = await response.json();
                if (response.ok && data.length > 0) {
                    setDataInventario(data);
                    setFilteredInventario(data);
                }
                else {
                    console.error("Failed to fetch inventory data:", data);
                    setError(data.message || "Error al obtener datos del inventario.");
                }
            }
            catch (error) {
                console.error("Error fetching seed data:", error);
            }
            const seedsResponse = await fetch(`${API}/semillas/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (seedsResponse.status === 200) {
                const seedsData = await seedsResponse.json();
                const objecttoarray = seedsData.map(seed => ({
                    value: seed.IdSemilla,
                    label: seed.NombreComun
                }));
                setSeedOptions(objecttoarray);
            }
            const comercioResponse = await fetch(`${API}/vendedores/miinfo`, {
                method: "GET",
                credentials: "include",
                headers:{
                    'Accept': "application/json",
                    "X-CSRF-TOKEN": token
                }
            })
            if (comercioResponse.status === 200) {
                const comercioData = await comercioResponse.json();
                setDataFormInv({ ...dataFormInv, IdComercio: comercioData[0].IdComercio })
            };
        }
        fetchOptions();
    }, [token]);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = dataInventario.filter(item => item.NombreComun.toLowerCase().includes(value));
        setFilteredInventario(filtered);
    };

    console.log(dataFormInv, 'dataform')
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
                setError(result.error || "Error al crear la semilla.");
                console.log(result);
            }
        } catch (e) {
            console.error(e);
        }
    };

    const handleNuevoItem = async (e) => {
        e.preventDefault();
    
        if (!dataFormInv.IdSemilla || !dataFormInv.UnidadDeVenta || !dataFormInv.PrecioDeVenta) {
            alert("Todos los campos son obligatorios.");
            return;
        }
    
        const formData = new FormData();
        formData.append("IdSemilla", dataFormInv.IdSemilla);
        formData.append("UnidadDeVenta", dataFormInv.UnidadDeVenta);
        formData.append("PrecioDeVenta", dataFormInv.PrecioDeVenta);
        formData.append("IdComercio", dataFormInv.IdComercio);
    
        if (dataFormInv.image_url instanceof File) {
            formData.append('image_url', dataFormInv.image_url);
        } else {
            alert("No se ha seleccionado una imagen válida.");
        }
    
        try {
            const response = await fetch(`${API}/vendedores/nuevoinventario`, {
                method: "POST",
                credentials: "include",
                headers: { 'Accept': "application/json", 'X-CSRF-TOKEN': token },
                body: formData
            });
    
            if (response.ok) {
                alert('Semilla añadida correctamente');
                setDataFormInv({ IdSemilla: "", UnidadDeVenta: "", PrecioDeVenta: "", image_url: null });
                window.location.reload();
            } else {
                setError("Error al añadir la semilla");
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleEditar = (item) => {
        setSelectedItem(item);
        setDataFormInv({
            IdComercio: item.IdComercio,
            IdSemilla: item.IdSemilla,
            UnidadDeVenta: item.IdUnidad,
            PrecioDeVenta: item.PrecioDeVenta,
            image_url: item.Ruta ? `${API}/${item.Ruta}` : null
        });
        setShowEditarModal(true);
    };

    console.log("editarcomer", dataFormInv.IdComercio);
    const handleUpdateItem = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("IdSemilla", dataFormInv.IdSemilla);
        formData.append("UnidadDeVenta", dataFormInv.UnidadDeVenta);
        formData.append("PrecioDeVenta", dataFormInv.PrecioDeVenta);
        formData.append("IdComercio", dataFormInv.IdComercio);
        formData.append("image_url", dataFormInv.image_url);
        
        
        console.log("editarcomer", dataFormInv.IdComercio);
    

        for (const item of formData.entries()) {
            console.log(item, 'itemtobakc')
        }
    

        try {
            const response = await fetch(`${API}/vendedores/inventario/update/${selectedItem.IdInventario}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token
                },
                body: formData
            });
            if (response.status === 200) {
                setDataInventario(dataInventario.map(semilla =>
                    semilla.IdSemilla === selectedItem.IdSemilla ?
                        { ...semilla, ...dataForm } : semilla
                ));
                setShowEditarModal(false);
                window.location.reload();
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };



    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!userData || userData.rol !== 2) {
        return <U401 />;
    }

    console.log(filteredInventario, 'data');
    return (
        <div className="SemillasAdmin">
            {error && <div>{error}</div>}
            <NavAdmin />
            <MenuLateral />
            
            <h1>Semillas En mi Inventario</h1>
            <div className="search-container">
                <input className="buscarSemillasAdmin"
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch} />
            </div>
            <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Semilla</button>
            <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoItemModal(true)}>Agrega una Semilla</button>
            {filteredInventario.length > 0 ? (
                <div className="gallery-containerv">
                    {filteredInventario.map((item) => (
                        <div key={item.IdInventario} className="card">
                            <img src={`${API}/${item.Ruta}`} alt={item.NombreComun} className="card-image" />
                            {console.log(API, item.Ruta, 'ruta')}
                            <div className="card-content">
                                <h3 className="card-title">{item.NombreComun}</h3>
                                <p className="card-price">${item.PrecioDeVenta} X {item.Unidad}</p>
                                <div className="accionesInventario">
                                    <NavLink className='actualizarSemillas'>
                                        <FontAwesomeIcon icon={faPencil} onClick={() => handleEditar(item)} />
                                    </NavLink>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="mensaje-vacio">No hay Items disponibles </p>
            )}
            
            {/* Modal de edición */}
            <NuevoItemModal
                isOpen={showEditarModal}
                onClose={() => setShowEditarModal(false)} // ✅ Cierra el modal correcto
                onSubmit={handleUpdateItem}
                data={dataFormInv}
                seedOptions={seedOptions}
                setData={setDataFormInv}
                />

            {/* Modal de creación */}
            <NuevoItemModal
                isOpen={showNuevoItemModal}
                onClose={() => setShowNuevoItemModal(false)}
                onSubmit={handleNuevoItem}
                data={dataFormInv}
                seedOptions={seedOptions}
                setData={setDataFormInv}
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
    );

};