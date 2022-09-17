 

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
const finalResult = document.getElementById("final-result");
const options = document.getElementById("options");
const infoCardTitle = document.getElementById("info-card-title");
const infoCardList = document.getElementById("info-card-list");
const timerDiv = document.getElementById("timer");
const display = document.getElementById("time-counter");
const bar = document.getElementById("progressBar");


const resultCard = document.getElementById("result-card");
const userName = document.getElementById("user-name");
const userNumber = document.getElementById("user-number");
const userEmail = document.getElementById("user-email");
const submitBtn = document.getElementById("submit-btn");




let questionCount = 0;
let questionNumber = 1;
let userScore = 0;
let timeValue = 15;
let counter;
let counterLine;
let widthValue = 0;
let timeForAnswer = timeValue;

startQuizBtn.addEventListener('click', () => {
    infoCard.classList.remove("d-none"); //show info box
    startQuizBtn.classList.add("d-none");
});
// if exitQuiz button clicked
exitBtn.addEventListener('click', () => {
    infoCard.classList.add("d-none"); //hide info box
})

continueBtn.addEventListener('click', () => {
    quizCard.classList.remove("d-none");
    infoCard.classList.add("d-none"); 
    showQuestion(0);
    UpdateProgressBar(1);
    startTimer(timeValue);
    startTimerLine(0); 
})

function showQuestion(index) {
    const question = questions[index];
    questionTitle.innerText = `${question.id}. ${question.title}`;
    for (let i = 0; i < question.options.length; i++) {
        options.children[i].innerText = question.options[i].title;
        options.children[i].classList.remove("bg-secondary");
        const selectedOption = options.children[i];
        const optionJSON = questions[index].options[i];
        selectedOption.addEventListener("click", () => {
            onOptionSelected(selectedOption, optionJSON)
        })
    }
}

function onOptionSelected(answerSelected, optionFromJSON) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    answerSelected.classList.add("bg-secondary");
    answerSelected.classList.add("text-white")
    if (optionFromJSON.correct) {
        userScore++;
        console.log(userScore);
    }
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.add("pe-none");
    }
    nextQuestionBtn.classList.remove("invisible");
}

nextQuestionBtn.onclick = () => {
    nextQuestionBtn.classList.add("invisible");
    clearInterval(counterLine); //clear counterLine
    clearInterval(counter); //clear counterLine
    timeForAnswer = timeValue;
    if(timeForAnswer==0)
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.add("pe-none");
        nextQuestionBtn.classList.remove("invisible");
    }
    for (let i = 0; i < options.children.length; i++) {
        options.children[i].classList.remove("bg-secondary");
        options.children[i].classList.remove("pe-none");
        options.children[i].classList.remove("text-white");
    }
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        clearInterval(counter);
        showQuestion(questionCount);
        UpdateProgressBar(questionNumber);
        startTimer(timeValue);
        clearInterval(counterLine); 
        startTimerLine(widthValue); 
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult();
        continueBtn.classList.add("d-none");
    }
}
function showResult() {
    quizCard.classList.add("d-none"); //hide quiz box
    resultCard.classList.remove("d-none"); //hide quiz box
    finalResult.innerText = `your result is ${userScore}.`;
 }


const myBar = document.getElementById("quiz-progress-bar");

function UpdateProgressBar(index) {
    const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

    questionsCountText.innerText = `${index} / ${questions.length}`;
    myBar.style.width = `${clamp((index - 1) / questions.length * 100, 10, 100)}%`;
    myBar.innerText = `${(index - 1) / questions.length * 100}%`;
}
function startTimerLine(time) {
    counterLine = setInterval(timer, (15 * 2)+1);
    function timer() {
        time += 1;
        bar.style.width = time + "px";
    }
    if (time > 549) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
    }
}
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        display.textContent = time - 1;
        time--;
        timeForAnswer--;
         if (time <= 9) {
             let addZero = display.textContent;
             display.textContent = `0${addZero}`; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            display.textContent = "Time Off"; //change the time text to time off
            for (i = 0; i < options.children.length; i++) {
                options.children[i].classList.add("pe-none"); //once user select an option then disabled all options
            }
            nextQuestionBtn.classList.remove("invisible"); //show the next button if user selected any option
        }
    }
}

submitBtn.addEventListener('click', () => {
    const name= userName.value;
    const email= userEmail.value;
    const subject= "Arabic test result";
    const message= `hi ${name}.
    Your Arabic test result is ${userScore}`;
    console.log(email);
    resultCard.classList.add("d-none");
    Email.send({
        Host: "smtp.elasticemail.com",
    Username: "abd.alrawof.albezra@gmail.com",
    Password: "7F934029FC2DBE9B55B7A869683B33C25118",
       // SecureToken : "c5d87e20-c7aa-49e2-805a-b59081c22630",
        To : email,
        From : "abd.alrawof.albezra@gmail.com",
        Subject : subject,
        Body : message
    }).then(
      message => {
        if (message=="OK")alert('sent, please check your spam field')
        else
        alert(message)}
    );
   
})

  
	
 
 


 



 