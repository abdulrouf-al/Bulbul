let questions;

async function loadNames() {
    const response = await fetch('../json/questions.json');
    questions = await response.json();
}

loadNames();


const startQuizBtn = document.getElementById("start-quiz-btn");
const infoCard = document.getElementById("info-card");
const continueBtn = document.getElementById("continue-btn");
const quizCard = document.getElementById("quiz-card");
const exitBtn = document.getElementById("exit-btn");
const nextQuestionBtn = document.getElementById("next-question-btn");
const questionsCountText = document.getElementById("questions-count-text");
const questionTitle = document.getElementById("question-title");

const options = document.getElementById("options");
const infoCardTitle = document.getElementById("info-card-title");

let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
startQuizBtn.addEventListener('click', () => {
    infoCard.classList.remove("d-none"); //show info box
    startQuizBtn.classList.add("d-none");
});
// if exitQuiz button clicked
exitBtn.addEventListener('click', () => {
    infoCard.classList.add("d-none"); //hide info box
})

continueBtn.addEventListener('click', () => {
    quizCard.classList.remove("d-none"); //hide info box
    infoCard.classList.add("d-none"); //show quiz box
    showQuestion(0);
    UpdateProgressBar(1);
})

function showQuestion(index) {
    const question = questions[index];
    questionTitle.innerText = `${question.id}. ${question.title}`;
    for (let i = 0; i < question.options.length; i++) {
        options.children[i].innerText = question.options[i].title;
        const selectedOption = options.children[i];
        const optionJSON = questions[index].options[i];
        selectedOption.addEventListener("click", () => {
            onOptionSelected(selectedOption, optionJSON)
        })
    }
}

function onOptionSelected(answerSelected, optionFromJSON) {
    answerSelected.classList.add("bg-secondary");
    if (optionFromJSON.correct) {
        userScore++;
        console.log(userScore);
    }
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.add("pe-none");
    }
    nextQuestionBtn.classList.remove("d-none");
}

nextQuestionBtn.onclick = () => {
    nextQuestionBtn.classList.add("d-none");

    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.remove("bg-secondary");
        options.children[i].classList.remove("pe-none");
        options.children[i].classList.remove("text-white");
    }
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestion(questionCount);
        UpdateProgressBar(questionNumber);
    } else {
        showResult();
        continueBtn.classList.add("d-none");
    }
}

function showResult() {
    infoCard.classList.remove("d-none"); //hide info box
    quizCard.classList.add("d-none"); //hide quiz box
    infoCardTitle.innerText = "Quiz result"
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const myBar = document.getElementById("quiz-progress-bar");

function UpdateProgressBar(index) {
    questionsCountText.innerText = `${index} / ${questions.length}`;
    myBar.style.width = `${clamp((index - 1) / questions.length * 100, 10, 100)}%`;
    myBar.innerText = `${(index - 1) / questions.length * 100}%`;
}
