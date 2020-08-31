const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

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
            choice4: "Developer Defining Sprint Terms",
            answer: 3
    },
    {
        question: "Who is responsible for prioritizing the backlog?",
            choice1: "Product Owner",
            choice2: "Project Manager",
            choice3: "Lead Developer",
            choice4: "Business Analyst",
            answer: 1
    },
    {
        question: "What is a disadvantage of the classical waterfall model?",
            choice1: "Quicker release of useable product to customer",
            choice2: "Ability to incorporate changes easily",
            choice3: "Easier to self manage",
            choice4: "End-Product has to be fully anticipated beforehand",
            answer: 4
    },
    {
        question: "What is the effect of having a large visible story board on a wall?",
            choice1: "Removes the need to create reports for management",
            choice2: "Continuously communicates progress within the team & stakeholders",
            choice3: "Allows the PM to allocate tasks to specific team members",
            choice4: "It is restrictive, not allowing the team to innovate & change",
            answer: 2
    },
    {
        question: "What does NOT belong to the agile manifesto's main pillars?",
            choice1: "Individuals & interactions over processes and tools",
            choice2: "Working software over comprehensive documentation",
            choice3: "Processes over people",
            choice4: "Custom collaboration over contract negotiation",
            answer: 3
    },
    {
        question: "Which of the following is NOT a typical artifact of the scrum framework?",
            choice1: "Product Backlog",
            choice2: "Sprint Backlog",
            choice3: "Burndown Chart",
            choice4: "Gantt Chart",
            answer: 4
    },
    {
        question: "How should work be allocated to the team in an Agile project?",
            choice1: "ScrumMaster should allocate specific tasks to individuals",
            choice2: "Tasks should randomly be allocated to team members, using Planning Poker",
            choice3: "Team members should self-select tasks appropriate to their skills",
            choice4: "The most complex tasks should be allocated by the ScrumMaster",
            answer: 3
    },
    {
        question: "Where are the customer requirements stored?",
            choice1: "In the Product Backlog",
            choice2: "In the Sprint Backlog",
            choice3: "In a database",
            choice4: "In a Scrum Product Requirement Specification",
            answer: 1
    },
];

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startQuiz = () => {
    questionCounter = 0;
    score = 0;
    availableQuestion = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestion.length === 0 || questionCounter >= MAX_QUESTION) {
        return window.location.assign("./highscores.html");
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
    
        if (classToApply === "correct") {
          incrementScore(CORRECT_BONUS);
        }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
        selectedChoice.parentElement.classList.remove(classToApply);
        getNewQuestion();
    }, 1000);

    });
});

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
  };

startQuiz();