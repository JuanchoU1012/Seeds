import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import MenuLateralAdmin from "../../components/sidebarAdmin"
import NavAdmin from '../../components/navegacionAdmin'
import RecipesModal from "../../components/RecipeModal"
import VermasReceta from "../../components/vermasReceta"
import ModalSuccessError from "../../components/ModalSuccessError"
import '../../estilos/recetasAdmin.css'

//usertoken
import { getUserInfo } from '../../../helpers/getuserinfo'
import { getTokenInfo } from '../../../helpers/getjwt'
import { U401 } from '../../components/401'
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass"

const API = import.meta.env.VITE_REACT_APP_API

export const RecetasAdmin = () => {
    const [showEditarModal, setShowEditarModal] = useState(false)
    const [showNuevoModal, setShowNuevoModal] = useState(false)
    const [showVermasModal, setShowVermasModal] = useState(false)
    const [showTooltip, setShowTooltip] = useState()
    
    const [modal, setModal] = useState({
        isOpen: false,
        message: "",
        type: "",
        onConfirm: null
    })

    const [dataRecipes, setRecipes] = useState([])
    const [filteredRecetas, setFilteredRecetas] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [seedOptions, setSeedOptions] = useState([])
    const [ingredientOptions, setIngredientOptions] = useState([])
    const [selectedRecipe, setSelectedRecipe] = useState(null)
    const [token, setToken] = useState(null)
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [dataForm, setDataForm] = useState({
        Nombre: "",
        Descripcion: "",
        Semillas: [],
        Ingredientes: [],
        videoUrl: null,
        Pasos: []
    })

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
        const fetchRecipes = async () => {
            const response = await fetch(`${API}/recipes/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            })
            if (response.status === 200) {
                const data = await response.json()
                setRecipes(data)
                setFilteredRecetas(data)
            }
        }

        const fetchOptions = async () => {
            const seedsResponse = await fetch(`${API}/semillas/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            })
            const ingredientsResponse = await fetch(`${API}/products/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            })

            if (seedsResponse.status === 200) {
                const seedsData = await seedsResponse.json()
                const objecttoarray = seedsData.map(seed => ({
                    value: seed.IdSemilla,
                    label: seed.NombreComun
                }))

                setSeedOptions(objecttoarray)
            }

            if (ingredientsResponse.status === 200) {
                const ingredientsData = await ingredientsResponse.json()
                const objecttoarray = ingredientsData.map(ingredient => ({
                    value: ingredient.IdProductosAlter,
                    label: ingredient.Producto
                }))

                setIngredientOptions(objecttoarray)
            }
        }

        fetchRecipes()
        fetchOptions()
    }, [])

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase()
        setSearchTerm(value)
        const filtered = dataRecipes.filter(recetas => recetas.nombre.toLowerCase().includes(value))
        setFilteredRecetas(filtered)
    }

    const handleNuevaReceta = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('Nombre', dataForm.Nombre)
        formData.append('Descripcion', dataForm.Descripcion)
        dataForm.Semillas.forEach(Semilla => formData.append('IdSemilla', Semilla))
        dataForm.Ingredientes.forEach(Ingrediente => formData.append('IdIngrediente', Ingrediente))
        dataForm.Pasos.forEach(paso => formData.append('Paso', paso))

        if (dataForm.videoUrl && dataForm.videoUrl instanceof File) {
            formData.append('videourl', dataForm.videoUrl)
        }
        try {
            const response = await fetch(`${API}/recipes/create`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    "X-CSRF-TOKEN": token
                },
                body: formData
            })
            if (response.status === 201) {
                setModal({
                    isOpen: true,
                    message: "Receta creada exitosamente",
                    type: "success"
                })
                setDataForm({ ...dataForm, Nombre: '', Descripcion: '', Semillas: [], Ingredientes: [], videoUrl: null })
                setShowNuevoModal(false)
            } else {
                setModal({
                    isOpen: true,
                    message: "Error al crear la receta",
                    type: "error"
                })
            }
        } catch (e) {
            console.error(e)
            setModal({
                isOpen: true,
                message: "Error al crear la receta",
                type: "error"
            })
        }
    }

    const handleEliminar = async (IdReceta, Nombre) => {
        const eliminarReceta = async (IdReceta) => {
            try {
                const response = await fetch(`${API}/recipes/delete/${IdReceta}`, {
                    method: 'DELETE',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        "X-CSRF-TOKEN": token
                    }
                });
    
                if (response.status === 200) {
                    setModal({ isOpen: false }); // Cierra el modal antes de recargar
                    setTimeout(() => window.location.reload(), 500);
                } else {
                    setModal({
                        isOpen: true,
                        type: "error",
                        message: "Error al eliminar la receta"
                    });
                }
            } catch (e) {
                console.error(e);
                setModal({
                    isOpen: true,
                    type: "error",
                    message: "Ocurrió un problema con la conexión"
                });
            }
        };
    
        setModal({
            isOpen: true,
            message: `¿Estás seguro de que quieres eliminar la receta "${Nombre}"?`,
            type: "confirm",
            onConfirm: () => {
                setModal({ isOpen: false }); // Cierra el modal al confirmar
                eliminarReceta(IdReceta);
            }
        });
    };    

    const handleEditar = (recipe) => {
        setSelectedRecipe(recipe)
        setDataForm({
            Nombre: recipe.Nombre || "",
            Descripcion: recipe.Descripcion || "",
            Semillas: recipe.IdSemillas ? recipe.IdSemillas.split(",").map(IdSemillas => parseInt(IdSemillas)) : [],
            Ingredientes: recipe.IdIngredientes ? recipe.IdIngredientes.split(",").map(IdIngrediente => parseInt(IdIngrediente)) : [],
            videoUrl: recipe.videourl ? `${recipe.videourl}` : null,
            Pasos: recipe.Pasos.split('|').map(paso => paso.split(': ')[1])
        })
        console.log('edit', recipe)
        setShowEditarModal(true)
    }

    const handleEditarReceta = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('Nombre', dataForm.Nombre)
        formData.append('Descripcion', dataForm.Descripcion)
        dataForm.Semillas.forEach(Semilla => formData.append('IdSemilla', Semilla))
        dataForm.Ingredientes.forEach(Ingrediente => formData.append('IdIngrediente', Ingrediente))
        formData.append('videourl', dataForm.videoUrl)
        dataForm.Pasos.forEach(paso => formData.append('Paso', paso))

        try {
            const response = await fetch(`${API}/recipes/update/${selectedRecipe.IdReceta}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    "X-CSRF-TOKEN": token
                },
                body: formData
            })
            if (response.status === 200) {
                setShowEditarModal(false)
                setModal({
                    isOpen: true,
                    message: "Receta editada exitosamente",
                    type: "success"
                })
                setDataForm({ ...dataForm, Nombre: '', Descripcion: '', Semillas: [], Ingredientes: [], videoUrl: null })
            } else {
                setModal({
                    isOpen: true,
                    message: "Error al editar la receta",
                    type: "error"
                })
            }
        } catch (e) {
            console.error(e)
            setModal({
                isOpen: true,
                type: "error",
                message: "Ocurrió un problema con la conexión"
            });
        }
    }

    const handleVermas = (recipe) => {
        setSelectedRecipe(recipe)
        setShowVermasModal(true)
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>
    }

    if (!userData || userData.rol !== 0) {
        return <U401 />
    }
    return (
        <div className="RecetasAdmin">
            <NavAdmin />
            <MenuLateralAdmin />

            <h1>Recetas</h1>
            <div className="search-container">
                <input className="buscarRecetasAdmin"
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch} />
            </div>

            <div className="top-container">
                <div className="info-icon-container" onMouseEnter={() => setShowTooltip(true)}
                        onMouseLeave={() => setShowTooltip(false)}>
                    <span className="info-icon"
                        
                    >ℹ️</span>
                    {showTooltip && (
                        <div className="tooltip">
                            Completa todos los campos para agregar una receta correctamente. <br />
                            - Nombre: Nombre de la receta, ej: Mantequilla De Ajo.<br />
                            - Descripción: Historia de la receta y beneficios.<br />
                            - Selecciona el ingrediente principal, semilla e ingredientes secundarios.<br />
                            - Agrega pasos, tiempo en minutos y una descripción sencilla del paso.
                        </div>
                    )}
                </div>

                {/* Contenedor de Botones */}
                <div className="botones-container">
                    
                <button className="botonNuevaSemillaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Receta</button>
                <NavLink to="/ingredientesAdmin" className="botonNuevaSemillaAdmin">
                    Ingredientes Recetas
                </NavLink>
                </div>
            </div>

            <div className="crudRecetasAdmin">
                <table className="table">
                    <thead>
                        <tr>
                            <th className="tituloCrudRecetas">Nombre Receta</th>
                            <th className="tituloCrudRecetas">Descripcion</th>
                            <th className="tituloCrudRecetas">Ingrediente Principales</th>
                            <th className="tituloCrudRecetas">Ingredientes Secundarios</th>
                            <th className="tituloCrudRecetas">Video</th>
                            <th className="tituloCrudRecetas">Cantidades</th>
                            <th className="tituloCrudRecetas">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(!filteredRecetas) ?
                            <tr>
                                <td colSpan="5">No hay recetas disponibles.</td>
                            </tr>
                            :
                            filteredRecetas.map((recipe) => (
                                <tr key={recipe.IdReceta}>
                                    <td>{recipe.Nombre}</td>
                                    <td>{recipe.Descripcion}</td>
                                    <td>{recipe.Semillasusadas}</td>
                                    <td>{recipe.ProductosAdicionales}</td>
                                    <td className="crud-video">
                                        {recipe.videourl ? (
                                            <video src={`${recipe.videourl}`} controls />
                                        ) : (
                                            <span>No hay video</span>
                                        )}
                                    </td>
                                    <td><NavLink onClick={() => handleVermas(recipe)}>➕</NavLink></td>
                                    <td className="accionesRecetas">
                                        <NavLink className='actualizarSemillas'>
                                            <FontAwesomeIcon icon={faEdit} onClick={() => handleEditar(recipe)} />
                                        </NavLink>
                                        <NavLink className='eliminarSemillas'>
                                            <FontAwesomeIcon icon={faTrash} onClick={() => handleEliminar(recipe.IdReceta, recipe.Nombre)} />
                                        </NavLink>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {/* {New Modal} */}
            <RecipesModal
                isOpen={showNuevoModal}
                onClose={() => setShowNuevoModal(false)}
                onSubmit={handleNuevaReceta}
                data={dataForm}
                setData={setDataForm}
                seedOptions={seedOptions} // Pass seed options
                ingredientOptions={ingredientOptions} // Pass ingredient options
                isAdmin={true} // Set isAdmin to true for admin mode
            />

            {/* {Edit Modal} */}
            <RecipesModal
                isOpen={showEditarModal}
                onClose={() => {
                    setShowEditarModal(false);
                    setDataForm({ 
                        ...dataForm, 
                        Nombre: '', 
                        Descripcion: '', 
                        Semillas: [], 
                        Ingredientes: [], 
                        videoUrl: null 
                    });
                }}
                
                onSubmit={handleEditarReceta}
                data={dataForm}
                setData={setDataForm}
                seedOptions={seedOptions} // Pass seed options
                ingredientOptions={ingredientOptions} // Pass ingredient options
                isAdmin={true} // Set isAdmin to true for admin mode
            />

            {/* ver mas modal */}
            <VermasReceta
                isOpen={showVermasModal}
                onClose={() => setShowVermasModal(false)}
                data={selectedRecipe}
            />

            {/* SuccesError Modal */}
            <ModalSuccessError 
            isOpen={modal.isOpen}
            type={modal.type}
            message={modal.message}
            onClose={() => setModal({ isOpen: false })}
            onConfirm={modal.onConfirm}
        />
        </div>
    )
}