import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import MenuLateralAdmin from "../../components/sidebarAdmin.jsx";
import NavAdmin from '../../components/navegacionAdmin';
import RecipesModal from "../../components/RecipeModal";
import '../../estilos/recetasAdmin.css';

//usertoken
import { getUserInfo } from '../../../helpers/getuserinfo';
import { getTokenInfo } from '../../../helpers/getjwt';
import { U401 } from '../../components/401';

const API = import.meta.env.VITE_REACT_APP_API;

export const RecetasAdmin = () => {
    const [showEditarModal, setShowEditarModal] = useState(false);
    const [showNuevoModal, setShowNuevoModal] = useState(false);
    const [dataRecipes, setRecipes] = useState([]);

    const [filteredRecetas, setFilteredRecetas] = useState([])
    const [searchTerm, setSearchTerm] = useState("")

    const [seedOptions, setSeedOptions] = useState([]); // Define seed options
    const [ingredientOptions, setIngredientOptions] = useState([]); // Define ingredient options
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    const [token, setToken] = useState(null);
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [dataForm, setDataForm] = useState({
        Nombre: "",
        Descripcion: "",
        Semillas: [],
        Ingredientes: [],
        videoUrl: null,
        Pasos: []
    });


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



    useEffect(() => {
        const fetchRecipes = async () => {
            const response = await fetch(`${API}/recipes/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            if (response.status === 200) {
                const data = await response.json();
                setRecipes(data);
                setFilteredRecetas(data);
            }
        };

        const fetchOptions = async () => {
            const seedsResponse = await fetch(`${API}/semillas/get`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json'
                }
            });
            const ingredientsResponse = await fetch(`${API}/products/get`, {
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

            if (ingredientsResponse.status === 200) {
                const ingredientsData = await ingredientsResponse.json();
                const objecttoarray = ingredientsData.map(ingredient => ({
                    value: ingredient.IdProductosAlter,
                    label: ingredient.Producto
                }));

                setIngredientOptions(objecttoarray);
            }
        };

        fetchRecipes();
        fetchOptions();

    }, []);

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);
        const filtered = dataRecipes.filter(recetas => recetas.nombre.toLowerCase().includes(value));
        setFilteredRecetas(filtered);
    };

    const handleNuevaReceta = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('Nombre', dataForm.Nombre);
        formData.append('Descripcion', dataForm.Descripcion);
        dataForm.Semillas.forEach(Semilla => formData.append('IdSemilla', Semilla));
        dataForm.Ingredientes.forEach(Ingrediente => formData.append('IdIngrediente', Ingrediente));

        if (dataForm.videoUrl) {
            formData.append('videourl', dataForm.videoUrl);
        }
        else {
            alert("No se ha seleccionado ningún video.");
            return;
        }

        dataForm.Pasos.forEach((paso, index) => {
            formData.append(`paso[${index}],[Descripcion]`, paso);
        });
        const logFormData = (formData) => {
            for (let [key, value] of formData.entries()) {
                console.log(`${key}: ${value}`);
            }
        }
        logFormData(formData);
        console.log('data desde receta', dataForm);
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
            const result = await response.json();

            if (response.status === 201) {
                alert("Receta creada con éxito");
                // setDataForm({ ...dataForm, Nombre: '', Descripcion: '', Semillas: [], Ingredientes: [], videoUrl: null });
                // window.location.reload();
            }
            else {
                alert("Error al crear la receta");
                console.log(result);
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleEliminar = async (id) => {
        try {
            const response = await fetch(`${API}/recipes/delete/${id}`, {
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    "X-CSRF-TOKEN": token
                }
            })
            if (response.status === 200) {
                alert("Receta eliminada con éxito");
                window.location.reload();
            }
            else {
                alert("Error al eliminar la receta");
            }
        }
        catch (e) {
            console.error(e);
        }
    }

    const handleEditar = (recipe) => {
        setSelectedRecipe(recipe);
        setDataForm({
            Nombre: recipe.Nombre,
            Descripcion: recipe.Descripcion,
            Semillas: recipe.IdSemilla ? [recipe.IdSemilla] : [],
            Ingredientes: recipe.IdProducto ? [recipe.IdProducto] : [],
            videoUrl: recipe.Video_url,
            Pasos: recipe.Pasos || []
        });
        setShowEditarModal(true);
    };
    

    const handleEditarReceta = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NombreReceta', dataForm.Nombre);
        formData.append('Descripcion', dataForm.Descripcion);
        dataForm.Semillas.forEach(IdSemilla => formData.append('IdSemilla[]', IdSemilla));
        dataForm.Ingredientes.forEach(ingredient => formData.append('IdProducto[]', ingredient));

        formData.append('Video_url', dataForm.Video_url);
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
                alert("Receta editada con éxito");

            }
            else {
                alert("Error al editar la receta");
            }
            setShowEditarModal(false);
        }
        catch (e) {
            console.error(e);
        }
    }

    if (isLoading) {
        return <div className="text-center mt-5">Loading...</div>;
    }

    if (!userData || userData.rol !== 0) {
        return <U401 />;
    }
    return (
        <div className="RecetasAdmin">
            <NavAdmin />
            <MenuLateralAdmin />
            <h1>Recetas</h1>
            <div className="search-container">
                <input className="input-search"
                    type="text"
                    placeholder="Buscar..."
                    value={searchTerm}
                    onChange={handleSearch} />
            </div>
            <button className="botonNuevaRecetaAdmin" onClick={() => setShowNuevoModal(true)}>Nueva Receta</button>
            <table className="CrudrecetasAdmin">
                <thead>
                    <tr>
                        <th className="tituloCrudRecetas">Nombre Receta</th>
                        <th className="tituloCrudRecetas">Descripcion</th>
                        <th className="tituloCrudRecetas">Ingrediente Principales</th>
                        <th className="tituloCrudRecetas">Ingredientes Secundarios</th>
                        <th className="tituloCrudRecetas">Video</th>
                        <th className="tituloCrudRecetas">Pasos</th>
                        <th className="tituloCrudSemllas">Acciones</th>
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
                                <td className="crud-video"><video src={`http://localhost:5000${recipe.videourl}`} controls/></td>
                                <td>Ver mas</td>
                                <td className="accionesRecetas">
                                    <NavLink>
                                        <FontAwesomeIcon icon={faEdit} onClick={() => handleEditar(recipe)} />
                                    </NavLink>
                                    <NavLink className='eliminarSemillas'>
                                        <FontAwesomeIcon icon={faTrash} onClick={() => handleEliminar(recipe.IdReceta)} />
                                    </NavLink>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            {/* {New Modal} */}
            <RecipesModal
                isOpen={showNuevoModal}
                onClose={() => setShowNuevoModal(false)}
                onSubmit={handleNuevaReceta}
                data={dataForm}
                setData={setDataForm}
                seedOptions={seedOptions} // Pass seed options
                ingredientOptions={ingredientOptions} // Pass ingredient options
            />


            {/* {Edit Modal} */}
            <RecipesModal
                isOpen={showEditarModal}
                onClose={() => setShowEditarModal(false)}
                onSubmit={handleEditarReceta}
                data={dataForm}
                setData={setDataForm}
                seedOptions={seedOptions} // Pass seed options
                ingredientOptions={ingredientOptions} // Pass ingredient options
            />



        </div>
    )
}
