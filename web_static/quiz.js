// import { childUid } from "../server";

let currentVideoIndex = 0;
let totalVideos = 0;
let score = 0;
let childId = 1; // Replace with the actual child ID (could be fetched from session or a form)
let currentQuizIndex = 0; // Track the current quiz question
let quizzes = []; // Store all quiz questions for the video
let totalQuizzes = 0;
let childAge = null;

const questionElement = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const submitButton = document.getElementById('Submit');
const nextButton = document.getElementById('next');
const progressBar = document.getElementById('progressBar');
const progressText = document.getElementById('progressText');
const messageElement = document.getElementById('message');
const uidt = document.getElementById('uid');

async function showUid() {
  const uid = await getChildUid(); // Wait for the UID to be fetched
  if (uid) {
    uidt.innerText = 'Your ID: ' + uid; // Display the UID in the HTML element
  } else {
    uidt.innerText = 'UID not available'; // Handle case where UID is not found
  }
}

showUid(); // Call the function to display the UID

async function getChildUid() {
  try {
    const response = await fetch('/api/getChildUid');
    const data = await response.json();

    if (data.success) {
      return data.childUid;
    } else {
      console.error('Child UID not found');
    }
  } catch (error) {
    console.error('Error fetching child UID:', error);
  }
}

// Function to fetch the total number of videos
async function fetchTotalVideos() {
  const childUid = await getChildUid();
  try {
    const response = await fetch(`/api/getTotalVideos?childUID=${childUid}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && typeof data.totalVideos === 'number') {
      totalVideos = data.totalVideos;
      console.log('Total videos:', totalVideos);
    } else {
      console.error('Invalid data received for total videos:', data.message || data);
    }
  } catch (error) {
    console.error('Error fetching total videos:', error);
  }
}

async function fetchProgress() {
  const childUid = await getChildUid();
  try {
    const response = await fetch(`/api/getProgress/${childUid}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    if (data.success && Array.isArray(data.data)) {
      currentVideoIndex = data.data.length + 1; // Set index based on watched videos
      if (data.data.length >= totalVideos) {
        alert('You have watched all videos!');
        currentVideoIndex = totalVideos; // Ensure index is within range
      }
    } else {
      console.error('Invalid data received for progress:', data.message || data);
    }
  } catch (error) {
    console.error('Error fetching progress:', error);
  }
}


// Load video and quiz based on the child's ID
async function loadContent() {
  await fetchTotalVideos(); // Fetch total videos before loading content
  await fetchProgress(); // Fetch progress data

  if (currentVideoIndex > totalVideos) {
    currentVideoIndex = totalVideos; // Adjust if needed
    alert('You have watched all videos');
    currentQuizIndex = 0;
  }

  const childUid = await getChildUid(); // Fetch the child UID
  if (!childUid) {
    console.error('Child UID not set');
    return;
  }

  try {
    const response = await fetch(`/api/getContent?childUID=${childUid}&videoIndex=${currentVideoIndex}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    console.log('Fetched data:', data);

    if (data.video && data.quizzes) {
      document.getElementById('videoTitle').innerText = data.video.title;
      document.getElementById('videoFrame').src = data.video.url;

      quizzes = data.quizzes;
      currentQuizIndex = 0;
      totalQuizzes = quizzes.length;

      console.log('Total Quizzes:', totalQuizzes);

      loadQuiz(quizzes[currentQuizIndex]);

      // Set initial button visibility
      submitButton.style.display = 'none';
      nextButton.style.display = 'block';
    } else {
      console.error('Invalid data received from the server:', data);
    }
  } catch (error) {
    console.error('Error loading content:', error);
  }
}

function loadQuiz(quiz) {
  questionElement.innerText = quiz.question_text;
  optionsContainer.innerHTML = '';

  quiz.options.forEach((option) => {
    const button = document.createElement('button');
    button.innerText = option.text;
    button.classList.add('option_button');
    button.onclick = () => selectAnswer(button, option.correct);
    optionsContainer.appendChild(button);
  });

  // Update button visibility
  if (currentQuizIndex === totalQuizzes - 1) {
    submitButton.style.display = 'block';
    nextButton.style.display = 'none'; // Hide next button on the last quiz
  } else {
    submitButton.style.display = 'none';
    nextButton.style.display = 'block';
  }
}

function selectAnswer(button, correct) {
  if (correct) {
    button.style.backgroundColor = 'green';
    button.style.opacity = '50%';
    button.style.color = 'white';
    score++;
  } else {
    button.style.backgroundColor = 'red';
    button.style.opacity = '50%';
    button.style.color = 'white';
  }

  Array.from(optionsContainer.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.dataset.correct === 'true') {
      btn.style.backgroundColor = 'green';
    }
  });
  updateProgress();
}

async function handleQuizNavigation() {
  if (currentQuizIndex < totalQuizzes - 1) {
    currentQuizIndex++;
    loadQuiz(quizzes[currentQuizIndex]);
  } else {
    // End of quizzes
    alert('Congratulations! You have completed all quizzes.');
    submitButton.style.display = 'none'; // Hide button after completion
    nextButton.style.display = 'none'; // Hide the "Next" button after completion
  }
}

nextButton.addEventListener('click', handleQuizNavigation);

submitButton.addEventListener('click', async () => {
  await postProgress();
  currentVideoIndex++;
  await loadContent();
  score = 0;
  updateProgress();
});

function updateProgress() {
  const percentage = (score / quizzes.length) * 100;
  progressBar.style.width = `${percentage}%`;
  progressText.innerText = `${Math.round(percentage)}%`;
}

window.onload = () => {
  loadContent();
};

async function postProgress() {
  const childUid = await getChildUid(); // Get the child UID
  if (!childUid) {
    console.error('Cannot post progress, child UID not available');
    return;
  }

  const data = {
    uid: childUid,
    video_id: currentVideoIndex,
    quiz_score: score,
  };

  try {
    const response = await fetch('/api/postProgress', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (result.success) {
      console.log('Progress posted successfully');
    } else {
      console.error('Failed to post progress:', result.message);
    }
  } catch (error) {
    console.error('Error posting progress:', error);
  }
}

const side_bar = document.getElementById('sidet');
const slide = document.getElementById('slide');
const hide = document.getElementById('hide');
const progB = document.getElementById('progressButton');
const logOutB = document.getElementById('logOutButton');


side_bar.addEventListener('click', () => {
  slide.style.display = "block";
});

hide.addEventListener('click', () => {
  slide.style.display = "none";
});

progB.addEventListener('click', () => {
  window.location.href = "progress.html";
});