// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCZLxvjF5vOZ_mVA_ZIfGbdKAvcGfkEasg",
  authDomain: "fattail-songs.firebaseapp.com",
  projectId: "fattail-songs",
  storageBucket: "fattail-songs.appspot.com",
  messagingSenderId: "959978237084",
  appId: "1:959978237084:web:26442023070248f3eb9159",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
