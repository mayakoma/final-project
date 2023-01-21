import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA61QMQ8a8ZNqPe-70NwkJDqhf-q-Bcgy8",
  authDomain: "final-project-f943b.firebaseapp.com",
  projectId: "final-project-f943b",
  storageBucket: "final-project-f943b.appspot.com",
  messagingSenderId: "4102834727",
  appId: "1:4102834727:web:d8599a9e8b30a760529c02",
  measurementId: "G-D7QHRB7B6C",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const authFirebase = getAuth(app);
