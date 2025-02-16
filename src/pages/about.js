import React from "react";
import Navbar from "../components/navbar";
import "../styles/TakeAction.css";
import Img_1 from "../images/forest_fires.png"
import Img_2 from "../images/deforestation.jpg"
const About = () => {
   // Climate change statistics
  const stats = {
    co2concentration: "42 Parts Per Million", // Global CO2 emissions in 2022
    temperatureRise: "1.2°C", // Global temperature rise since pre-industrial times
    amountLost: "16.3 Million Per Hour", // Percentage of global electricity from renewables
    deforestation: "10 million hectares", // Annual deforestation rate
  };
  return (
    <div className="responsive-container-block bigContainer">
          <Navbar/>
      <div className="responsive-container-block Container">
        <div className="allText aboveText">
          <p className="text-blk headingText">Why Climate Action Matters</p>
          <p className="text-blk subHeadingText">
            This isn't Normal.
          </p>
          <p className="text-blk description">
           Climate Change affects everyone but especially as people of color we are more likely to be affected by the impacts of climate change. We are more likely to live in areas with poor air quality, be exposed to extreme heat, and live in areas that are more vulnerable to natural disasters. Climate change is a social justice issue and we must take action to protect our communities and our planet.
          </p>
        </div>
        <img
          className="mainImg"
          src={Img_1} // Replace with a climate-related image
          alt="Climate Action"
        />
      </div>
      <div className="responsive-container-block Container bottomContainer">
        <img
          className="mainImg"
          src={Img_2} // Replace with a climate-related image
          alt="Climate Impact"
        />
        <div className="allText bottomText">
          <p className="text-blk headingText">Climate Change by the Numbers</p>
          <p className="text-blk subHeadingText">
            Key Statistics on Greenhouse Gas Emissions and Climate Impact
          </p>
          <div className="statsContainer">
            <div className="statItem">
              <p className="statNumber">{stats.co2concentration}</p>
              <p className="statLabel">Global CO2 Emissions (2022)</p>
            </div>
            <div className="statItem">
              <p className="statNumber">{stats.temperatureRise}</p>
              <p className="statLabel">Global Temperature Rise</p>
            </div>
            <div className="statItem">
              <p className="statNumber">{stats.amountLost}</p>
              <p className="statLabel">How much Climate Change Costs us</p>
            </div>
            <div className="statItem">
              <p className="statNumber">{stats.deforestation}</p>
              <p className="statLabel">Annual Deforestation</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default About;