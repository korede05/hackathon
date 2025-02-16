import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import BackgroundImage from "../images/home_hero.jpg";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  return (
    <div className="home">
      <helmet>
        <title>Not Tomorrow. Take action Today!</title>
      </helmet>
      <Navbar />
      <section
        className="hero"
        style={{
          backgroundImage: `url(${BackgroundImage})`,
        }}
      >
        <div className="hero-content">
          <h1>Not Tomorrow. Take action Today!</h1>
          <p>Join us in the fight against climate change</p>
          <div className="hero-buttons">
            <Link to="/about-us" className="btn secondary">
              About Us
            </Link>
            <Link to="/how-to-help" className="btn primary">
              Take Action
            </Link>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="about-content">
          <h2>Our Mission</h2>
          <p>
           In a world of increasing climate change, it is important to take action now. Our mission is to provide you with the tools and resources to help you reduce your carbon footprint and make a positive impact on the environment.
          </p>
        </div>
        </section>
    </div>
  );
};
export default Home;
