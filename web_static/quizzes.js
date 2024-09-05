// const quizzes = {
//   quiz1: [
//     {
//       question: 'What is a noun?',
//       answers: [
//         { text: 'action', correct: false },
//         { text: 'name', correct: true },
//         { text: 'word', correct: false },
//         { text: 'story', correct: false },
//       ],
//     },
//     {
//       question: 'What is a verb?',
//       answers: [
//         { text: 'action', correct: true },
//         { text: 'think', correct: false },
//         { text: 'run', correct: false },
//         { text: 'eat', correct: false },
//       ],
//     },
//     {
//       question: 'What is an adjective?',
//       answers: [
//         { text: 'red', correct: true },
//         { text: 'big', correct: true },
//         { text: 'happy', correct: true },
//         { text: 'fast', correct: true },
//       ],
//     },
//     {
//       question: 'What is an adverb?',
//       answers: [
//         { text: 'quickly', correct: true },
//         { text: 'slowly', correct: false },
//         { text: 'very', correct: false },
//         { text: 'happily', correct: false },
//       ],
//     },
//   ],
//   quiz2: [
//     {
//       question: 'What is a pronoun?',
//       answers: [
//         { text: 'I', correct: true },
//         { text: 'you', correct: false },
//         { text: 'he', correct: false },
//         { text: 'she', correct: false },
//       ],
//     },
//     {
//       question: 'What is a preposition?',
//       answers: [
//         { text: 'in', correct: true },
//         { text: 'on', correct: false },
//         { text: 'at', correct: false },
//         { text: 'for', correct: false },
//       ],
//     },
//     {
//       question: 'What is a conjunction?',
//       answers: [
//         { text: 'and', correct: true },
//         { text: 'but', correct: false },
//         { text: 'or', correct: false },
//         { text: 'so', correct: false },
//       ],
//     },
//     {
//       question: 'What is an interjection?',
//       answers: [
//         { text: 'ouch', correct: true },
//         { text: 'hello', correct: false },
//         { text: 'please', correct: false },
//         { text: 'thank you', correct: false },
//       ],
//     },
//   ],
//   quiz3: [
//     {
//       question: 'What is a simple sentence?',
//       answers: [
//         { text: 'The dog barked.', correct: true },
//         { text: 'The cat is sleeping and the dog is barking.', correct: false },
//         { text: 'Because the dog barked, the cat ran away.', correct: false },
//         { text: 'If the dog barks, the cat will run away.', correct: false },
//       ],
//     },
//     {
//       question: 'What is a compound sentence?',
//       answers: [
//         { text: 'The dog barked.', correct: false },
//         { text: 'The cat is sleeping and the dog is barking.', correct: true },
//         { text: 'Because the dog barked, the cat ran away.', correct: false },
//         { text: 'If the dog barks, the cat will run away.', correct: false },
//       ],
//     },
//     {
//       question: 'What is a complex sentence?',
//       answers: [
//         { text: 'The dog barked.', correct: false },
//         { text: 'The cat is sleeping and the dog is barking.', correct: false },
//         { text: 'Because the dog barked, the cat ran away.', correct: true },
//         { text: 'If the dog barks, the cat will run away.', correct: true },
//       ],
//     },
//     {
//       question: 'What is a compound-complex sentence?',
//       answers: [
//         { text: 'The dog barked.', correct: false },
//         { text: 'The cat is sleeping and the dog is barking.', correct: false },
//         { text: 'Because the dog barked, the cat ran away.', correct: false },
//         { text: 'If the dog barks, the cat will run away.', correct: true },
//       ],
//     },
//   ],
//   quiz4: [
//     {
//       question: 'What is a singular noun?',
//       answers: [
//         { text: 'dog', correct: true },
//         { text: 'cats', correct: false },
//         { text: 'books', correct: false },
//         { text: 'children', correct: false },
//       ],
//     },
//     {
//       question: 'What is a plural noun?',
//       answers: [
//         { text: 'dog', correct: false },
//         { text: 'cats', correct: true },
//         { text: 'books', correct: true },
//         { text: 'children', correct: true },
//       ],
//     },
//     {
//       question: 'What is a countable noun?',
//       answers: [
//         { text: 'dog', correct: true },
//         { text: 'water', correct: false },
//         { text: 'love', correct: false },
//         { text: 'happiness', correct: false },
//       ],
//     },
//     {
//       question: 'What is an uncountable noun?',
//       answers: [
//         { text: 'dog', correct: false },
//         { text: 'water', correct: true },
//         { text: 'love', correct: true },
//         { text: 'happiness', correct: true },
//       ],
//     },
//   ],
//   quiz5: [
//     {
//       question: "What is the past tense of 'go'?",
//       answers: [
//         { text: 'went', correct: true },
//         { text: 'goed', correct: false },
//         { text: 'go', correct: false },
//         { text: 'gone', correct: false },
//       ],
//     },
//     {
//       question: "What is the past participle of 'see'?",
//       answers: [
//         { text: 'saw', correct: false },
//         { text: 'seen', correct: true },
//         { text: 'see', correct: false },
//         { text: 'seed', correct: false },
//       ],
//     },
//     {
//       question: "What is the present perfect tense of 'eat'?",
//       answers: [
//         { text: 'ate', correct: false },
//         { text: 'eaten', correct: true },
//         { text: 'eat', correct: false },
//         { text: 'eats', correct: false },
//       ],
//     },
//     {
//       question: "What is the future tense of 'have'?",
//       answers: [
//         { text: 'had', correct: false },
//         { text: 'have', correct: false },
//         { text: 'having', correct: false },
//         { text: 'will have', correct: true },
//       ],
//     },
//   ],
//   quiz6: [
//     {
//       question: 'What is a comparative adjective?',
//       answers: [
//         { text: 'big', correct: false },
//         { text: 'bigger', correct: true },
//         { text: 'biggest', correct: false },
//         { text: 'small', correct: false },
//       ],
//     },
//     {
//       question: 'What is a superlative adjective?',
//       answers: [
//         { text: 'big', correct: false },
//         { text: 'bigger', correct: false },
//         { text: 'biggest', correct: true },
//         { text: 'small', correct: false },
//       ],
//     },
//     {
//       question: 'What is an irregular adjective?',
//       answers: [
//         { text: 'good', correct: true },
//         { text: 'better', correct: true },
//         { text: 'best', correct: true },
//         { text: 'big', correct: false },
//       ],
//     },
//     {
//       question: 'What is a regular adjective?',
//       answers: [
//         { text: 'good', correct: false },
//         { text: 'better', correct: false },
//         { text: 'best', correct: false },
//         { text: 'big', correct: true },
//       ],
//     },
//   ],
// };

// const questionElement = document.querySelector('.question');
// const optionsButton = document.querySelector('.options');
// const nextButton = document.getElementById('next');
// const submitButton = document.getElementById('submit');

// let currentQIndex = 0;
// let score = 0;

// function startQuiz() {
//   currentQIndex = 0;
//   score = 0;
//   nextButton.innerHTML = 'Next';
//   showQ();
// }

// function showQ() {
//   nextButton.style.display = 'none'; // Hide the "Next" button initially
//   let currentQ = questions[currentQIndex];
//   let questionNo = currentQIndex + 1;
//   questionElement.innerHTML = questionNo + '. ' + currentQ.question;

//   // Clear previous options
//   optionsButton.innerHTML = '';

//   currentQ.answers.forEach((answer) => {
//     const button = document.createElement('button');
//     button.innerHTML = answer.text;
//     button.classList.add('option_button');
//     if (answer.correct) {
//       button.dataset.correct = answer.correct;
//     }
//     button.addEventListener('click', selectAnswer);
//     optionsButton.appendChild(button);
//   });
// }

// function selectAnswer(e) {
//   const selectedBtn = e.target;
//   const isCorrect = selectedBtn.dataset.correct === 'true';
//   if (isCorrect) {
//     selectedBtn.style.backgroundColor = 'green';
//     selectedBtn.style.opacity = '50%'; // Turn button green if correct
//     selectedBtn.style.color = 'white'; // Change text color to white
//     score++;
//   } else {
//     selectedBtn.style.backgroundColor = 'red';
//     selectedBtn.style.opacity = '50%'; // Turn button red if incorrect
//     selectedBtn.style.color = 'white'; // Change text color to white
//   }
//   Array.from(optionsButton.children).forEach((button) => {
//     if (button.dataset.correct === 'true') {
//       button.style.backgroundColor = 'green';
//       button.style.opacity = '50%'; // Turn button green if correct
//       button.style.color = 'white'; // Change text color to white
//     }
//     button.disabled = true;
//   });
//   nextButton.style.display = 'block';
// }

// nextButton.addEventListener('click', () => {
//   if (currentQIndex < questions.length - 1) {
//     currentQIndex++;
//     showQ();
//   } else {
//     alert(`Quiz finished! Your score: ${score}/${questions.length}`);
//     nextButton.style.display = 'none';
//   }
// });

// startQuiz();
