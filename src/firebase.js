// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfu08651A4GQPPwxbH9SXq8R9Z_tLh8q8",
  authDomain: "resume-9d70a.firebaseapp.com",
  projectId: "resume-9d70a",
  storageBucket: "resume-9d70a.appspot.com",
  messagingSenderId: "1002053048095",
  appId: "1:1002053048095:web:bf6132643ac781b74b022a",
  measurementId: "G-LDP14ZFD4T",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); // eslint-disable-line no-unused-vars
export const auth = getAuth(app);
export default app;
