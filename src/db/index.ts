// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.GATSBY_FIREBASE_API_KEY,
  authDomain: "valmistujaaiset.firebaseapp.com",
  projectId: "valmistujaaiset",
  storageBucket: "valmistujaaiset.appspot.com",
  messagingSenderId: "647342059870",
  appId: "1:647342059870:web:49c49bd7604d9e91661fcf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default getFirestore(app);
