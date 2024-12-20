import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyB-04YLmlCAqahhsNEPh5GZghAaX4TqsGo",
  authDomain: "elevate10plus.firebaseapp.com",
  projectId: "elevate10plus",
  storageBucket: "elevate10plus.firebasestorage.app",
  messagingSenderId: "566301519580",
  appId: "1:566301519580:web:76820ef6127a488f718e19",
  measurementId: "G-QL42MLR9YL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Initialize Analytics conditionally (only in browser)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported().then(yes => yes && (analytics = getAnalytics(app)));
}

export { app, db, analytics };
