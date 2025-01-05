// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANkiIXdf67ubnpKUXxztRWqn-GAqN8SBw",
  authDomain: "busy-buy-app-b84df.firebaseapp.com",
  projectId: "busy-buy-app-b84df",
  storageBucket: "busy-buy-app-b84df.firebasestorage.app",
  messagingSenderId: "513733697260",
  appId: "1:513733697260:web:9b630ed14e638292d08fc9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
