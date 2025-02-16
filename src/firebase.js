// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth"; // Fixed import
import { getAnalytics } from "firebase/analytics";  // Optional if you need analytics

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDK-W05eKuQ7OnEcfkywB7So-pVLv1JXSo",
    authDomain: "carbonemiss.firebaseapp.com",
    projectId: "carbonemiss",
    storageBucket: "carbonemiss.firebasestorage.app",
    messagingSenderId: "502941807088",
    appId: "1:502941807088:web:34f9535c4fc506cd3e6d35",
    measurementId: "G-ZCP9500GEQ"
  };

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

// Google Auth Provider
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, googleAuthProvider };
