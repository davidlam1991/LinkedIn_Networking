// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "weconnect-f8fe9.firebaseapp.com",
  projectId: "weconnect-f8fe9",
  storageBucket: "weconnect-f8fe9.appspot.com",
  messagingSenderId: "166725795541",
  appId: "1:166725795541:web:d55751e02dddccc03b6c5c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
