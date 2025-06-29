// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBi6c7nQcJSQy90R5QTX1JuO55KiwUTL1Q",
  authDomain: "job-website-49c6c.firebaseapp.com",
  projectId: "job-website-49c6c",
  storageBucket: "job-website-49c6c.firebasestorage.app",
  messagingSenderId: "505375085480",
  appId: "1:505375085480:web:b1bd504fb5a63d978d439d",
  measurementId: "G-5Z0S8S5R7W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);