import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { auth } from "../firebase"; // Import auth from firebase.js
import "../styles/navbar.css"; // css file for navbar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null); // Track the logged-in user
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser); // Set user if logged in
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    auth.signOut();
    navigate("/login"); // Redirect to login after logout
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">
          <Link to="/">Home</Link>
        </div>
        <div className="hamburger" onClick={handleToggle}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        <li><Link to="/about">About</Link></li>
          <li><Link to="/meals">Meals</Link></li>
          <li><Link to="/carbon-footprint-calculator">Your Footprint</Link></li>
          {user ? (
            <>
              <li><Link to="/profile">Profile</Link></li>
            </>
          ) : (
            <li><Link to="/login">Log In</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
