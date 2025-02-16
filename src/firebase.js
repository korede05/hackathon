// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useState } from "react";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDK-W05eKuQ7OnEcfkywB7So-pVLv1JXSo",
  authDomain: "carbonemiss.firebaseapp.com",
  projectId: "carbonemiss",
  storageBucket: "carbonemiss.firebasestorage.app",
  messagingSenderId: "502941807088",
  appId: "1:502941807088:web:34f9535c4fc506cd3e6d35",
  measurementId: "G-ZCP9500GEQ"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};
export { app, auth, signInWithGoogle };