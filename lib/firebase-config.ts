import { initializeApp, getApps, FirebaseApp } from "firebase/app";
import { getFirestore, Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAW69ft_HJPNxKd-W2WCOrl1uX-p8vZpdw",
  authDomain: "duahau-bf1a3.firebaseapp.com",
  databaseURL: "https://duahau-bf1a3-default-rtdb.firebaseio.com",
  projectId: "duahau-bf1a3",
  storageBucket: "duahau-bf1a3.firebasestorage.app",
  messagingSenderId: "822531705789",
  appId: "1:822531705789:web:a2622db9b2ac24fb2420d4",
  measurementId: "G-EFBC7XSQS8",
};

const app: FirebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const db: Firestore = getFirestore(app);
