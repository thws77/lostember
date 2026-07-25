import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEOsdY6mlqHL5yeuklcKXTIxA8rYjxX64",
    authDomain: "lostember-76b89.firebaseapp.com",
    projectId: "lostember-76b89",
    storageBucket: "lostember-76b89.firebasestorage.app",
    messagingSenderId: "859987153633",
    appId: "1:859987153633:web:a3282696ae3cc6347d9da0",
    measurementId: "G-PBQEYF73Q6"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);