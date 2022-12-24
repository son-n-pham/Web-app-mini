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

const quizHeader = document.querySelector('#quiz-header');
const quizResult = document.querySelector('#quiz-result');
const scoreResult = document.querySelector('#score');
const questionNumbers = document.querySelector('#question-numbers');
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
  submitBtn.textContent = 'Submit';
  quizResult.hidden = true;
  quizHeader.hidden = false;
  const currentQuestion = quizData[questionNo];
  question.textContent = currentQuestion.question;
  aText.textContent = currentQuestion.a;
  bText.textContent = currentQuestion.b;
  cText.textContent = currentQuestion.c;
  dText.textContent = currentQuestion.d;
  correctAnswer = currentQuestion.correct;

  console.log('loading is running');

  // Uncheck all choice
  answers.forEach(answer => (answer.checked = false));
};

const callQuizResult = () => {
  quizResult.hidden = false;
  quizHeader.hidden = true;
  scoreResult.textContent = score;
  questionNumbers.textContent = quizData.length;
  submitBtn.textContent = 'Re-Quiz';
};

const clickSubmit = () => {
  let submittedAnswer = null;

  // Loop through all answers and check their checked value
  answers.forEach(answer => {
    if (answer.checked) submittedAnswer = answer.id;
  });

  console.log(`submit btn becomes: ${submitBtn.textContent}`);
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
    callQuizResult();
  }
};

const clickReQuiz = () => {
  currentQuestionNo = 0;
  score = 0;
  loading(currentQuestionNo);
  submitBtn.textContent = 'Submit';
  console.log(`Clicked Requiz: ${submitBtn.textContent}`);
};

submitBtn.addEventListener('click', e => {
  // console.log(e.target.textContent);
  if (submitBtn.textContent === 'Re-Quiz') {
    clickReQuiz();
  }
  if (submitBtn.textContent === 'Submit') {
    clickSubmit();
  }
});

loading(currentQuestionNo);
