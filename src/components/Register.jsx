import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {app} from "../firebase";
import {auth} from "../firebase";
import { useState } from "react";
import "../styles/Register.css";
import { createUserWithEmailAndPassword } from "../firebase";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            await createUserWithEmailAndPassword(auth, email, password); 
            console.log("User created successfully");
            navigate('/login');
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
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
        </div>
    );
    };
    export default Register;