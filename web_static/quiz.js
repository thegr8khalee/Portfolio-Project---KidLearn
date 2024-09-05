 const questions = [
  {
    question: 'What is a noun?',
    answers: [
      { text: 'action', correct: false },
      { text: 'name', correct: true },
      { text: 'word', correct: false },
      { text: 'story', correct: false },
    ],
  },
  {
    question: 'What is a verb?',
    answers: [
      { text: 'action', correct: true },
      { text: 'think', correct: false },
      { text: 'run', correct: false },
      { text: 'eat', correct: false },
    ],
  },
  {
    question: 'What is an adjective?',
    answers: [
      { text: 'red', correct: false },
      { text: 'big', correct: true },
      { text: 'happy', correct: false },
      { text: 'fast', correct: false },
    ],
  },
  {
    question: 'What is an adverb?',
    answers: [
      { text: 'quickly', correct: true },
      { text: 'snowy', correct: false },
      { text: 'very', correct: false },
      { text: 'happy', correct: false },
    ],
  },
];

const questionElement = document.querySelector('.question');
const optionsButton = document.querySelector('.options');
const nextButton = document.getElementById('next');
const submitButton = document.getElementById('Submit');

let currentQIndex = 0;
let score = 0;

function startQuiz() {
  currentQIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  submitButton.style.display = 'none'; // Ensure Submit button is hidden
  showQ();
}

function showQ() {
  nextButton.style.display = 'none'; // Hide the "Next" button initially
  let currentQ = questions[currentQIndex];
  let questionNo = currentQIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQ.question;

  // Clear previous options
  optionsButton.innerHTML = '';

  currentQ.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('option_button');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    optionsButton.appendChild(button);
  });
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if (isCorrect) {
    selectedBtn.style.backgroundColor = 'green';
    selectedBtn.style.opacity = '50%';
    selectedBtn.style.color = 'white';
    score++;
  } else {
    selectedBtn.style.backgroundColor = 'red';
    selectedBtn.style.opacity = '50%';
    selectedBtn.style.color = 'white';
  }
  Array.from(optionsButton.children).forEach((button) => {
    if (button.dataset.correct === 'true') {
      button.style.backgroundColor = 'green';
      button.style.opacity = '50%';
      button.style.color = 'white';
    }
    button.disabled = true;
  });
  if (currentQIndex < questions.length - 1) {
    nextButton.style.display = 'block';
  } else if ((currentQIndex = questions.length - 1)) {
    submitButton.style.display = 'block';
  }

  localStorage.setItem('quizIndex', currentQIndex);
  localStorage.setItem('quizScore', score);
  progress(score, questions.length);
}

nextButton.addEventListener('click', () => {
  if (currentQIndex < questions.length - 1) {
    currentQIndex++;
    showQ();
  } else {
    alert(`Quiz finished! Your score: ${score}/${questions.length}`);
    nextButton.style.display = 'none';
    // submitButton.style.display = 'block'; // Show Submit button at the end
    localStorage.removeItem('quizIndex'); // Clear stored quiz index after completion
    localStorage.removeItem('quizScore'); // Clear stored score after completion
  }
});

startQuiz();

function progress(score, totalQuestions) {
  const progressBar = document.getElementById('progressBar');
  const percentage = (score / totalQuestions) * 100;
  progressBar.style.width = `${percentage}%`;
  const progressText = document.getElementById('progressText');
  progressText.innerHTML = `${Math.round(percentage)}%`;

  localStorage.setItem('quizProgress', percentage);
}

window.addEventListener('load', () => {
  const storedProgress = localStorage.getItem('quizProgress');
  const storedIndex = localStorage.getItem('quizIndex');

  if (storedProgress) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = `${storedProgress}%`;
    const progressText = document.getElementById('progressText');
    progressText.innerHTML = `${Math.round(storedProgress)}%`;
  }

  // Resume the quiz from the last question if there is a stored index
  if (storedIndex) {
    currentQIndex = parseInt(storedIndex, 10);
    showQ();
  }
});

// video.js

function nextVideo() {}

const sideTool = document.getElementById('sidet');
const hide = document.getElementById('hide');
const slide = document.getElementById('slide');
const progressButton = document.getElementById('progressButton');
// const logOutButton = document.getElementById('logOutButton');

sideTool.addEventListener('click', () => {
  slide.style.display = 'block';
});

hide.addEventListener('click', () => {
  slide.style.display = 'none';
});

progressButton.addEventListener('click', () => {
  window.location.href = 'progress.html';
});

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


// module.exports = {
//   score,
//   questions,
// };