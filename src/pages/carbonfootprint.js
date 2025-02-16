import React from "react";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import { useState } from "react";
import BackgroundImage from "../images/footprint_hero.jpg";
import Vehicle_Form from "../components/Vehicle_Form";
import Emissions_Tracker from "../components/emissions_tracker";
import "../styles/carbonfootprint.css";

const CarbonFootprint = () => {
    const [newDataSubmitted, setNewDataSubmitted] = useState(false);
   return (
      <div className="carbon-footprint">
         <Navbar />
            <helmet>
                <title>Carbon Footprint Calculator</title>
            </helmet>
            <section className = "carbon-hero"
            style={{
                backgroundImage: `url(${BackgroundImage})`,
            }}
            >
                </section>
                <section className="carbon-footprint-content">
                    <h2>Carbon Footprint Calculator</h2>
                    <p>Calculate your carbon footprint to see how your daily activities impact the environment. Use the calculator below to get started!</p>
                    <div classname = "CO2 Tracker">
                    <Vehicle_Form onFormSubmit={() => setNewDataSubmitted(!newDataSubmitted)} />
                    <Emissions_Tracker newDataSubmitted={newDataSubmitted} />
                    </div>
                </section>
                 </div>
   );
};

export default CarbonFootprint;
