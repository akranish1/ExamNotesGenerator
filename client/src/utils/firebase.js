// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ainotesapp-961f8.firebaseapp.com",
  projectId: "ainotesapp-961f8",
  storageBucket: "ainotesapp-961f8.firebasestorage.app",
  messagingSenderId: "142688619548",
  appId: "1:142688619548:web:83b67b4d87a8bb1f0563d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };