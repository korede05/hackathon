import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/recipe_map.css";

const SearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [likedRecipes, setLikedRecipes] = useState(
    JSON.parse(localStorage.getItem("likedRecipes")) || []
  );
  const [sortType, setSortType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4;

  const location = useLocation();
  const navigate = useNavigate();
  const searchQuery = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    fetch("/recipesscores.json")
      .then((response) => response.json())
      .then((data) => {
        setRecipes(data);
        filterRecipes(data, searchQuery);
      })
      .catch((error) => console.error("Error loading recipes:", error));
  }, []);

  useEffect(() => {
    filterRecipes(recipes, searchQuery);
  }, [searchQuery, recipes]);

  const filterRecipes = (data, query) => {
    if (!query.trim()) {
      setFilteredRecipes([]);
      return;
    }

    const filtered = data.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query.toLowerCase()) ||
        (Array.isArray(recipe.ingredients) &&
          recipe.ingredients.join(" ").toLowerCase().includes(query.toLowerCase()))
    );
    sortRecipes(filtered, sortType);
  };

  const sortRecipes = (data, type) => {
    let sorted = [...data];
    if (type === "name") {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (type === "sustainability") {
      sorted.sort((a, b) => a.sustainability_score - b.sustainability_score);
    }
    setFilteredRecipes(sorted);
    setCurrentPage(1);
  };

  const handleSortChange = (event) => {
    const type = event.target.value;
    setSortType(type);
    sortRecipes(filteredRecipes, type);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    navigate(value ? `/search?q=${encodeURIComponent(value)}` : "/search");
  };

  const toggleLike = (recipe) => {
    let updatedLikes;
    if (likedRecipes.some((r) => r.name === recipe.name)) {
      updatedLikes = likedRecipes.filter((r) => r.name !== recipe.name);
    } else {
      updatedLikes = [...likedRecipes, recipe];
    }
    setLikedRecipes(updatedLikes);
    localStorage.setItem("likedRecipes", JSON.stringify(updatedLikes));
  };

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="search-results">
      <Navbar />
      <section className="search-section">
        <input
          type="text"
          placeholder="Search for a recipe or ingredient..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-box"
        />
        <select className="sort-dropdown" onChange={handleSortChange} value={sortType}>
          <option value="name">Sort by Name (A-Z)</option>
          <option value="sustainability">Sort by Sustainability Score (Low to High)</option>
        </select>
      </section>

      <section className="meal-results">
        {currentRecipes.length > 0 ? (
          <div className="meal-grid">
            {currentRecipes.map((recipe, index) => (
              <div key={index} className="meal-item">
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <p><strong>Sustainability Score:</strong> {recipe.sustainability_score}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
                <button 
                  className={`like-button ${likedRecipes.some((r) => r.name === recipe.name) ? "liked" : ""}`}
                  onClick={() => toggleLike(recipe)}
                >
                  {likedRecipes.some((r) => r.name === recipe.name) ? "❤️ Liked" : "🤍 Like"}
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>{searchQuery ? "No recipes found." : "Start searching for recipes!"}</p>
        )}
      </section>

      {/* Pagination */}
      {filteredRecipes.length > recipesPerPage && (
        <div className="pagination">
          {Array.from({ length: Math.ceil(filteredRecipes.length / recipesPerPage) }, (_, i) => (
            <button
              key={i + 1}
              className={`page-button ${currentPage === i + 1 ? "active" : ""}`}
              onClick={() => paginate(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
