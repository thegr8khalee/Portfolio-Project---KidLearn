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


// sign up 

// Get the submit button
const submit_s = document.getElementById('submit_s');

// Add event listener for the submit button
submit_s.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally
  
  const email = document.getElementById('email_s').value;
  const password = document.getElementById('password_s').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      window.location.href = "video.html"; // Redirect to another page
      alert('Account created successfully!');
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert(`Error: ${errorMessage}`);
    });
});


// log in 


// Get the submit button
const submit_l = document.getElementById('submit_l');

// Add event listener for the submit button
submit_l.addEventListener('click', function (event) {
  event.preventDefault(); // Prevent the form from submitting normally

  const email = document.getElementById('email_l').value;
  const password = document.getElementById('password_l').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      alert('Logged In!...');
      // ...
      window.location.href = 'video.html'; // Redirect to another page
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// log out

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
