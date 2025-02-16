import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/recipe_map.css"; // Import the new CSS file

const SearchResults = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [sortType, setSortType] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 4; // Limit to 4 per page

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
  }, [searchQuery]);

  const filterRecipes = (data, query) => {
    const filtered = data.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(query) ||
        (Array.isArray(recipe.ingredients) &&
          recipe.ingredients.join(" ").toLowerCase().includes(query))
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
    setCurrentPage(1); // Reset to page 1 after sorting
  };

  const handleSortChange = (event) => {
    const type = event.target.value;
    setSortType(type);
    sortRecipes(filteredRecipes, type);
  };

  // Pagination Logic
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
          onChange={(e) => navigate(`/search?q=${encodeURIComponent(e.target.value)}`)}
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
                <img src={recipe.image.replace("http://", "https://")} alt={recipe.name} />
                <h2>{recipe.name}</h2>
                <p>{recipe.description}</p>
                <p><strong>Sustainability Score:</strong> {recipe.sustainability_score}</p>
                <a href={recipe.url} target="_blank" rel="noopener noreferrer">
                  View Recipe
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p>No recipes found.</p>
        )}
      </section>

      {/* Pagination */}
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
    </div>
  );
};

export default SearchResults;

