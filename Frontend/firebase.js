// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:  import.meta.env.VITE_API_KEY,
  authDomain: "mern-restaurant-cf9c1.firebaseapp.com",
  projectId: "mern-restaurant-cf9c1",
  storageBucket: "mern-restaurant-cf9c1.appspot.com",
  messagingSenderId: "229071041392",
  appId: "1:229071041392:web:f94ef4e6aae1aa804a55b5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);