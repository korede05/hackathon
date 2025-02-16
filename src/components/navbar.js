import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/navbar.css"; // css file for navbar

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
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
          <li><Link to="/meals">Meals</Link></li>
          <li><Link to="/carbon-footprint-calculator">Your Footprint</Link></li>
          <li><Link to ="/how-to-help">Take Action</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Log In</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;