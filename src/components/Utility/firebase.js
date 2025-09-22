// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBTSexL6j2_7U-T3W34SGWA7PeV7c8cD84",
  authDomain: "mymarket--clone.firebaseapp.com",
  projectId: "mymarket--clone",
  storageBucket: "mymarket--clone.firebasestorage.app",
  messagingSenderId: "325087911897",
  appId: "1:325087911897:web:e18f7d98fb9448fa6283c8",
  measurementId: "G-4NGCBSQKBQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app); 
export const db = getFirestore(app); 

export default app;