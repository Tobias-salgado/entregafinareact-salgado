// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDG27piZw8ZcK-6vv0e2JFETNTGy--uov4",
    authDomain: "proyecto-final-coder-reactjs.firebaseapp.com",
    projectId: "proyecto-final-coder-reactjs",
    storageBucket: "proyecto-final-coder-reactjs.appspot.com",
    messagingSenderId: "665271065145",
    appId: "1:665271065145:web:626d8b33f4de9f5a1b8be8"
};


const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)