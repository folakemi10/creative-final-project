// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc,  deleteDoc, updateDoc, query, where, getDocs, doc } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_0xHASx8U9791EBhI0AkqN6x-gXioSvM",
  authDomain: "national-parks-457d3.firebaseapp.com",
  projectId: "national-parks-457d3",
  storageBucket: "national-parks-457d3.appspot.com",
  messagingSenderId: "756568293776",
  appId: "1:756568293776:web:4a72f7f3582536f77c7315"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, auth, db, createUserWithEmailAndPassword, doc,  deleteDoc, signInWithEmailAndPassword, signOut, collection, addDoc, query,updateDoc, where, getDocs };
