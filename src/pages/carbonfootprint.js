import React from "react";
import Navbar from "../components/navbar";
import BackgroundImage from "../images/footprint_hero.jpg";
import Vehicle_Form from "../components/Vehicle_Form";
import Emissions_Plot from "../components/emissions_tracker";
import "../styles/carbonfootprint.css";

const CarbonFootprint = () => {
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
                    <div className = "CO2 Tracker">
                       <Vehicle_Form />
                        <Emissions_Plot />
                    </div>
                </section>
                 </div>
   );
};

export default CarbonFootprint;
