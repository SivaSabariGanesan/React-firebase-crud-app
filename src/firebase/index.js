// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "Your api Key",
  authDomain: "Your auth domin",
  projectId: "Your projectid",
  storageBucket: "Your storagebucket", 
  messagingSenderId: "Your messagingSenderId",
  appId: "Your appId",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app); \

export { app, db };
