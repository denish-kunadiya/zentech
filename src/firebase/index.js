// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBi0zpVLqD5Inj3wQ7c9J4Iu0U3gHFUzc",
  authDomain: "zentech-b06f9.firebaseapp.com",
  projectId: "zentech-b06f9",
  storageBucket: "zentech-b06f9.appspot.com",
  messagingSenderId: "713191781351",
  appId: "1:713191781351:web:9df4042d43bfa3abeac342",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export default app;

export const db = getFirestore(app);
