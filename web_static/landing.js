const start = document.getElementById('start');
const join = document.getElementById('join');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const terms = document.getElementById('terms');
const privacy = document.getElementById('privacy');
const twitter = document.getElementById('twitter');
const ig = document.getElementById('ig');

join.addEventListener('click', () => {
  window.location.href = 'login.html';
});

document.addEventListener('DOMContentLoaded', () => {
  const openPopupButtons = document.querySelectorAll('.footer-links a');
  const closePopupButtons = document.querySelectorAll('.popup .close');

  openPopupButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      event.preventDefault();
      const popupId = `popup-${this.id}`;
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'block';
      }
    });
  });

  closePopupButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const popupId = button.getAttribute('data-close');
      const popup = document.getElementById(popupId);
      if (popup) {
        popup.style.display = 'none';
      }
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('popup')) {
      event.target.style.display = 'none';
    }
  });
});
