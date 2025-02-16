import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Navbar from "../components/navbar";
import BackgroundImage from "../images/meals_hero.jpg";
import "../styles/meals.css";

const Meals = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate(); // Hook for navigation

  const handleSearch = (event) => {
    event.preventDefault(); // Prevent form submission
    const query = searchQuery.trim().toLowerCase();

    if (query) {
      // Navigate to the search results page with the query as a URL parameter
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="meals">
      <Navbar />
      <section
        className="hero"
        style={{ backgroundImage: `url(${BackgroundImage})` }}
      >
        <div className="hero-content">
          <h1>Meals</h1>
          <p>Here are some recipe ideas to help simplify your meal prep.</p>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search for a recipe or ingredient..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-box"
            />
            <button type="submit" className="btn primary">
              Search Recipes
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Meals;