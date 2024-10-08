// Import Firebase and necessary functions
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js';

// Firebase configuration
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
const auth = getAuth();



//Log out
// const logOutButton = document.getElementById('logOutButton');

// logOutButton.addEventListener('click', () => {
//   window.location.href = 'login.html';
//   // event.preventDefault();
//   firebase
//     .auth()
//     .signOut()
//     .then(() => {
//       // Sign-out successful.
//       console.log('logged out');
//       // window.location.href = 'login.html';
//     })
//     .catch((error) => {
//       // An error happened.
//       alert(error.message);
//     });
// });


// Sign up event
const signUp = document.getElementById('submit_s');
signUp.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email_s').value;
  const password = document.getElementById('password_s').value;
  const firstName = document.getElementById('first_name').value;
  const lastName = document.getElementById('name').value;
  const userType = document.getElementById('user-type').value;
  const age = document.getElementById('age').value || null;

  try {
    // Create user with Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const uid = user.uid;
    const userType = document.getElementById('user-type').value;

    // Send the user data to the server
    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        uid: uid,
        userType: userType,
        firstName: firstName,
        lastName: lastName,
        age: age, // Age only relevant for 'child' users
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert('User registered successfully!, click on login button and log in.');
      // Optionally redirect or provide further instructions
      if (data.userType === 'parent') {
        window.location.href = 'Parents_page.html'; // Redirect to progress page for parent
      } else if (data.userType === 'child') {
        window.location.href = 'video.html'; // Redirect to video page for child
      }
    } else {
      alert('Error registering user');
    }
  } catch (error) {
    console.error('Error during sign-up:', error);
    alert('Error signing up. Please try again.');
  }
});

// Log in event
const logIn = document.getElementById('submit_l');
logIn.addEventListener('click', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email_l').value;
  const password = document.getElementById('password_l').value;
  const userType = document.getElementById('user-type-login').value; // Capture selected user type

  try {
    // Sign in with Firebase
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // After Firebase authentication, call the backend to check the user type
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, userType }), // Send the user type
    });

    const data = await response.json();

    if (data.success) {
      // Redirect based on user type
      if (data.userType === 'parent') {
        window.location.href = 'Parents_page.html'; // Redirect to progress page for parent
      } else if (data.userType === 'child') {
        window.location.href = 'video.html'; // Redirect to video page for child
      }
    } else {
      alert(data.message); // Show error if the user type does not match
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert(error.message);
  }
});