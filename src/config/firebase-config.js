// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4JUbvov7XDUAkpGb7XV8F71P4hi439jQ",
  authDomain: "emc-batch-21-demo.firebaseapp.com",
  projectId: "emc-batch-21-demo",
  storageBucket: "emc-batch-21-demo.firebasestorage.app",
  messagingSenderId: "49036572885",
  appId: "1:49036572885:web:d71ee0c9506310940fca5c",
  measurementId: "G-3Z99345QC2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// const analytics = getAnalytics(app);
