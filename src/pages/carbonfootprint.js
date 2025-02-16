import React from "react";
import Navbar from "../components/navbar";
import { Helmet } from "react-helmet";
import BackgroundImage from "../images/footprint_hero.jpg";

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
                 </div>
   );
};

export default CarbonFootprint;
