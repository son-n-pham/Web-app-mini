'strict mode';

const quizData = [
  {
    question: 'Which language runs in a web browser?',
    a: 'Java',
    b: 'C',
    c: 'Python',
    d: 'JavaScript',
    correct: 'd',
  },
  {
    question: 'What does CSS stand for?',
    a: 'Central Style Sheets',
    b: 'Cascading Style Sheets',
    c: 'Cascading Simple Sheets',
    d: 'Cars SUVs Sailboats',
    correct: 'b',
  },
  {
    question: 'What does HTML stand for?',
    a: 'Hypertext Markup Language',
    b: 'Hypertext Markdown Language',
    c: 'Hyperloop Machine Language',
    d: 'Helicopters Terminals Motorboats Lamborginis',
    correct: 'a',
  },
  {
    question: 'What year was JavaScript launched?',
    a: '1996',
    b: '1995',
    c: '1994',
    d: 'none of the above',
    correct: 'b',
  },
];

const quizHeader = document.querySelector('.quiz-header');
const question = document.querySelector('#question');
const answers = document.querySelectorAll('.answer');
const aText = document.querySelector('#a-text');
const bText = document.querySelector('#b-text');
const cText = document.querySelector('#c-text');
const dText = document.querySelector('#d-text');
const submitBtn = document.querySelector('#submit');
let currentQuestionNo = 0;
let score = 0;
let correctAnswer;

// Function to load question and answer choices
const loading = questionNo => {
  const currentQuestion = quizData[questionNo];
  question.textContent = currentQuestion.question;
  aText.textContent = currentQuestion.a;
  bText.textContent = currentQuestion.b;
  cText.textContent = currentQuestion.c;
  dText.textContent = currentQuestion.d;
  // submitBtn.textContent = 'Submit';
  correctAnswer = currentQuestion.correct;

  // Uncheck all choice
  answers.forEach(answer => (answer.checked = false));
};

const quizResult = () => {
  htmlContent = `
    <h2>Quiz Result</h2>
    <h3>Total score: ${score}/${quizData.length}</h3>
  `;
  quizHeader.innerHTML = htmlContent;
  submitBtn.textContent = 'Re-Quiz';
};

const clickSubmit = () => {
  let submittedAnswer = null;

  // Loop through all answers and check their checked value
  answers.forEach(answer => {
    if (answer.checked) submittedAnswer = answer.id;
  });

  if (!submittedAnswer) return;

  if (submittedAnswer === correctAnswer) {
    score++;
  } else {
    console.log('Modal to say you are incorrect and give the correct answer');
  }

  if (currentQuestionNo < quizData.length - 1) {
    currentQuestionNo++;
    loading(currentQuestionNo);
  } else {
    quizResult();
  }
};

submitBtn.addEventListener('click', e => {
  console.log(e.target.textContent);
  if (submitBtn.textContent === 'Submit') {
    clickSubmit();
  }
  if (submitBtn.textContent === 'Re-Quiz') {
    score = 0;
    currentQuestionNo = 0;
    loading(currentQuestionNo);
  }
});

loading(currentQuestionNo);
