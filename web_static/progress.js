const sideTool = document.getElementById('sidet');
const hide = document.getElementById('hide');
const slide = document.getElementById('slide');
const videoButton = document.getElementById('videoButton');
const logOutButton = document.getElementById('logOutButton');

sideTool.addEventListener('click', () => {
  slide.style.display = 'block';
});

hide.addEventListener('click', () => {
  slide.style.display = 'none';
});

videoButton.addEventListener('click', () => {
  window.location.href = 'video.html';
});

window.addEventListener('load', () => {
  const storedProgress = localStorage.getItem('quizProgress');
  if (storedProgress) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${storedProgress}%`;
    const progressText = document.getElementById('progressText');
    progressText.innerHTML = `${Math.round(storedProgress)}%`;
  }
});