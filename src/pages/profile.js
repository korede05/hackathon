import React, { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase authentication
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import "../styles/profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [likedRecipes, setLikedRecipes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user info from Firebase
    auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });

    // Load liked recipes from local storage
    const storedRecipes = JSON.parse(localStorage.getItem("likedRecipes")) || [];
    setLikedRecipes(storedRecipes);
  }, []);

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/login"); // Redirect to login page
    });
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <h1>Your Profile</h1>
        {user ? (
          <div className="profile-info">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="profile-picture" />
            ) : (
              <div className="default-avatar">👤</div> // Default avatar if no picture
            )}
            <p><strong>Name:</strong> {user.displayName || "Anonymous"}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </div>
        ) : (
          <p>Please log in to view your profile.</p>
        )}

        <h2>Your Saved Recipes</h2>
        {likedRecipes.length > 0 ? (
          <div className="meal-grid">
            {likedRecipes.map((recipe, index) => (
              <div key={index} className="meal-item">
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
          <p>You haven't saved any recipes yet.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
