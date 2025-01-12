// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCXl44QK_R-5J7LEQ-PMMPOPjmobWd-vpE",
  authDomain: "crud-with-fb-6c73b.firebaseapp.com",
  projectId: "crud-with-fb-6c73b",
  storageBucket: "crud-with-fb-6c73b.appspot.com", // Fixed typo in storageBucket
  messagingSenderId: "568570807459",
  appId: "1:568570807459:web:153f5fdc1eb79f7db02b16",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); // Pass the app instance to getFirestore

export { app, db };
