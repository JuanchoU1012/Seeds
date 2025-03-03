import React, { useEffect, useState } from "react";
import "./RecipeList.css";
import Nav from "../components/navegacion";

const API = import.meta.env.VITE_REACT_APP_API;
const ITEMS_PER_PAGE = 10;

export const InicioRecetas = () => {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await fetch(`${API}/recipes/get`, {
          method: "GET",
          headers: {
            "Accept": "application/json",
          },
        });
        const data = await response.json();
        setRecipes(data);
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const totalPages = Math.ceil(recipes.length / ITEMS_PER_PAGE);
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentRecipes = recipes.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="recipe-container">
    <Nav/>
      <div className="recipe-grid">
        {currentRecipes.map((recipe) => (
          <div key={recipe.IdReceta} className="recipe-card">
            <video src={`${API}/${recipe.videourl}`} alt={recipe.Nombre} className="recipe-image" />
            <h3 className="recipe-title">{recipe.Nombre}</h3>
            <p className="recipe-author">{recipe.Descripcion}</p>
          </div>
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button key={index + 1} 
            className={currentPage === index + 1 ? "active" : ""} 
            onClick={() => setCurrentPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};


