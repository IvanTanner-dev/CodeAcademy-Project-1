// Original list of questions (unchanged)
const originalQuestions = [
  {
    question: "What was the name of my undergraduate university?",
    answers: [
      { text: "Oxford University", correct: false },
      { text: "Edinburgh University", correct: true },
      { text: "Plymouth University", correct: false },
      { text: "Oxford Brookes University", correct: false }
    ]
  },
  {
    question: "What was the name of my first pet?",
    answers: [
      { text: "Merlin", correct: false },
      { text: "Skye", correct: false },
      { text: "George", correct: false },
      { text: "Guinness", correct: true }
    ]
  },
  {
    question: "In what part of the country did I go to school?",
    answers: [
      { text: "Scotland", correct: false },
      { text: "Wales", correct: false },
      { text: "Oxfordshire", correct: false },
      { text: "South-West", correct: true }
    ]
  },
  {
    question: "What section of the armed forces was I once enrolled in?",
    answers: [
      { text: "Army", correct: false },
      { text: "Navy", correct: true },
      { text: "Air Force", correct: false },
      { text: "None: This is just a crazy rumour!", correct: false }
    ]
  },
  {
    question: "What did I study at University?",
    answers: [
      { text: "Genetics", correct: true },
      { text: "Mathematics", correct: false },
      { text: "Computer Science", correct: false },
      { text: "Natural Sciences", correct: false }
    ]
  },
  {
    question: "Where was my first teaching job?",
    answers: [
      { text: "China", correct: false },
      { text: "Vietnam", correct: false },
      { text: "Thailand", correct: false },
      { text: "Malaysia", correct: true }
    ]
  }
];

let questions = []; // This will hold the shuffled questions
let currentQuestionIndex = 0;
let score = 0;

// DOM references
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

// Fisher-Yates Shuffle Algorithm to randomize array
function shuffleArray(array) {
  let shuffled = array.slice(); // Make a copy
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Starts or restarts the quiz
function startGame() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";

  // Shuffle the original questions array each time
  questions = shuffleArray(originalQuestions);

  showQuestion();
}

// Displays the current question and answers
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtons.appendChild(button);
  });
}

// Clears answer buttons and hides next button
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

// Handles answer selection
function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct === "true";

  if (correct) {
    selectedButton.classList.add("correct");
    score++;
  } else {
    selectedButton.classList.add("incorrect");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

// Show final score
function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

// Proceed to next question or show score
/*
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}
*/
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


/*
// Next button click handler
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    handleNextButton();
  } else {
    showScore();
  }
});

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length - 1) {
    handleNextButton();
  } else {
    startGame(); // Restart the game on "Play Again"
  }
});
*/
nextButton.addEventListener("click", () => {
  // If we're still in the middle of the quiz
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    // If we've reached the score screen, restart the quiz
    startGame();
  }
});


// Start the quiz when the page loads
startGame();