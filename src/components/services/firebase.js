
import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxa99UwYY5vfEIpA9YgcBUysqGjvc69Rg",
    authDomain: "arthub-bc2d9.firebaseapp.com",
    projectId: "arthub-bc2d9",
    storageBucket: "arthub-bc2d9.appspot.com",
    messagingSenderId: "439520898333",
    appId: "1:439520898333:web:5e2293a9d76a13682385f4",
    measurementId: "G-CPK4PG3PEP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();