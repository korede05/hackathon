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
      <iframe 
          src="https://ourworldindata.org/explorers/food-footprints?facet=none&country=Bananas~Beef+%28beef+herd%29~Beef+%28dairy+herd%29~Cheese~Eggs~Lamb+%26+Mutton~Milk~Maize~Nuts~Pig+Meat~Peas~Potatoes~Poultry+Meat~Rice~Tomatoes~Wheat+%26+Rye~Tofu+%28soybeans%29~Prawns+%28farmed%29&hideControls=true&Commodity+or+Specific+Food+Product=Commodity&Environmental+Impact=Carbon+footprint&Kilogram+%2F+Protein+%2F+Calories=Per+kilogram&By+stage+of+supply+chain=false&tab=chart" 
          loading="lazy" 
          style={{width: "100%", height: "600px", border: "0px none"}} 
          allow="web-share; clipboard-write"
        ></iframe>
    </div>
  );
};

export default Meals;