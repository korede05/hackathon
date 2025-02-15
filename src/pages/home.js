import React from "react";
import Navbar from "../components/navbar";

const Home = () => {
    return (
        <div className="home">
        <helmet>
            <title>Not Tomorrow. Take action Today!</title>
        </helmet>
        <Navbar />
        <main>
            <h1>Home Page</h1>
            <p>Welcome to the home page!</p>

        </main>
        </div>
    );
    }
export default Home;