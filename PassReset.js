import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-analytics.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu_-yfSp2o55nA3H2V017sJu1FnLKVd5Y",
  authDomain: "structuralassistantweb.firebaseapp.com",
  projectId: "structuralassistantweb",
  storageBucket: "structuralassistantweb.appspot.com",
  messagingSenderId: "46101923490",
  appId: "1:46101923490:web:c91200594c1cca8c2e39fb",
  measurementId: "G-4C37805SB1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

document.getElementById("sendResetButton").addEventListener('click', e =>{
    const email = document.getElementById("email").value;
    sendPasswordResetEmail(auth, email)
    .then(() => {
      alert('Password reset email sent, please check your inbox.')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });
  })