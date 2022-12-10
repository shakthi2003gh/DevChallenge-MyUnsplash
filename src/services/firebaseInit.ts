// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
  apiKey: "AIzaSyBkdhzqjN2x6itDPB8fRXQOtJwyZDKP9u4",
  authDomain: "my-unsplash-9f29e.firebaseapp.com",
  projectId: "my-unsplash-9f29e",
  storageBucket: "my-unsplash-9f29e.appspot.com",
  messagingSenderId: "229307975530",
  appId: "1:229307975530:web:54ad785f8bdfec14384713",
});

export const auth = getAuth(app);

export const db = getFirestore(app);
