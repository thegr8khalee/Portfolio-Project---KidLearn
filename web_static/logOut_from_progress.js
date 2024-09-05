// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-analytics.js';
import {
  getAuth,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB29D4r5BkVN3qIBI-j9JxLjYtdWjdc3Bc',
  authDomain: 'kidlearn-29d2c.firebaseapp.com',
  projectId: 'kidlearn-29d2c',
  storageBucket: 'kidlearn-29d2c.appspot.com',
  messagingSenderId: '1055672237938',
  appId: '1:1055672237938:web:c119d6a40d0e48ece6a7eb',
  measurementId: 'G-MX46WZL7E2',
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