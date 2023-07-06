// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-8UPTGwm439H9kjxpC8TAquWYMcEEoM0",
  authDomain: "golden-exp.firebaseapp.com",
  projectId: "golden-exp",
  storageBucket: "golden-exp.appspot.com",
  messagingSenderId: "301513409989",
  appId: "1:301513409989:web:991be992f3a1f87063f7ac",
  measurementId: "G-S4JJF7JZ5N"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default firebase;