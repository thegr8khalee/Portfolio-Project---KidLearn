//Log out
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