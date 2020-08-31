const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];

let questions = [
    {
        question: "Tracking project impediments in a Scrum project is whose primary responsibility?",
            choice1: "Tester",
            choice2: "ScrumMaster",
            choice3: "Functional Manager",
            choice4: "Developer",
            answer: 2
    },
    {
        question: "Which concept of the following is NOT defined in the Scrum Framework?",
            choice1: "ScrumMaster",
            choice2: "Project Manager",
            choice3: "Scrum Product Owner",
            choice4: "Daily Scrum",
            answer: 2
    },
    {
        question: "Which of the following Main Events are defined by the Scrum Framework?",
            choice1: "C-Level & Product Owner Meeting",
            choice2: "Backlog Refinement",
            choice3: "Sprint Planning Meeting",
            choice4: "DeveloperDefining Sprint Terms",
            answer: 3
    }
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
    //go to the end page
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestion.length);
    currentQuestion = availableQuestion[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestion.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);
    });
});

startQuiz();