import React from "react";
import { Link } from "react-router-dom";
import {app} from "../firebase";
import { useState } from "react";
import "../styles/Register.css";
import {signInWithEmailAndPassword } from "../firebase/auth";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await signInWithEmailAndPassword(app.auth(), email, password);
            console.log("Logged in successfully");
        }catch(error){
            console.log(error);
        }
    }
    return (
        <div>
        <h2>Register</h2>
        <form className = "register-form" onSubmit={handleSubmit}>
            <div>
            <label>Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
            <label>Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Register</button>
            <p>Don't Have and Account? <Link to="/register">Login</Link></p>
        </form>
        </div>
    );
    };
    export default Login;