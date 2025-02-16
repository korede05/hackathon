import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navbar from "../components/navbar";
import BackgroundImage from "../images/home_hero.jpg";
import { Link, useNavigate } from "react-router-dom";
import "../styles/home.css";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import pic_1 from "../images/planb.jpg";
import pic_2 from "../images/bulbplant.jpg";
const Home = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Set up Firebase auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set user if logged in
      }
      // else {
      //   setUser(null); // Set user to null if not logged in
      //   navigate("/login"); // Redirect to login if not logged in
      // }
    });

    return () => unsubscribe(); // Clean up listener
  }, [navigate]);

  return (
    <div className="home">
      <helmet>
        <title>Not Tomorrow. Take action Today!</title>
      </helmet>
      <Navbar user={user} /> {/* Pass the user data to Navbar */}
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
            <Link to="/about" className="btn secondary">
              About Us
            </Link>
          </div>
        </div>
      </section>
      <section className="about">
        <div className="responsive-container-block bigContainer">
          <div className="responsive-container-block Container">
            <img className="mainImg" src={pic_2} alt="Climate Change Mission" />
            <div className="allText aboveText">
              <p className="text-blk headingText">Our Mission</p>
              <p className="text-blk subHeadingText">
                Combatting Climate Change for a Sustainable Future
              </p>
              <p className="text-blk description">
                While the effects of climate change are mainly responsible by
                big corporations, we believe that every individual can make a
                difference. Our mission is to empower people to take action
                against climate change and create a sustainable future for all.
                Look at your individual carbon footprint and see how you can
                make a difference.
              </p>
              <Link to="/carbon-footprint-calculator">
                <button className="explore">Your Footprint</button>
              </Link>
            </div>
          </div>
          <div className="responsive-container-block Container bottomContainer">
            <img className="mainImg" src={pic_1} alt="Climate Change Vision" />
            <div className="allText bottomText">
              <p className="text-blk headingText">Our Vision</p>
              <p className="text-blk subHeadingText">
                A Greener, Healthier Planet for Future Generations
              </p>
              <p className="text-blk description">
                We envision a world where renewable energy, sustainable
                practices, and environmental stewardship are the norm. Together,
                we can create a future where the planet thrives, and all living
                beings coexist harmoniously.
              </p>
            </div>
          </div>
        </div>
      </section>
      {user && (
        <div className="user-info">
          <p>Welcome, {user.email}!</p> {/* Display logged-in user email */}
        </div>
      )}
    </div>
  );
};

export default Home;
