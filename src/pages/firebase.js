// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore, doc, collection, setDoc } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCvxulm_EAdMCKH51BYjgwP9WDoCYIVRyA",
  authDomain: "fall-2023-senior-project.firebaseapp.com",
  databaseURL: "https://fall-2023-senior-project-default-rtdb.firebaseio.com",
  projectId: "fall-2023-senior-project",
  storageBucket: "fall-2023-senior-project.appspot.com",
  messagingSenderId: "329470444938",
  appId: "1:329470444938:web:b2d5f3cffc2f3e2880f473"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize the Firebase app

// Initialize Firebase services
const auth = getAuth(app); // Initialize the auth object with the Firebase app
const firestore = getFirestore(app); // Initialize the Firestore object with the Firebase app

// Export the initialized Firebase services

export { auth, firestore, doc, collection, setDoc};
