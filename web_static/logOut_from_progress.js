// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: '****',
  authDomain: '****',
  projectId: '****',
  storageBucket: '****',
  messagingSenderId: '****',
  appId: '****',
  measurementId: '****',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

const logOutButton = document.getElementById('logOutButton');

logOutButton.addEventListener('click', () => {
  window.location.href = 'login.html';
  // event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('logged out');
      // window.location.href = 'login.html';
    })
    .catch((error) => {
      // An error happened.
      alert(error.message);
    });
});
