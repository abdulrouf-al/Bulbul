
let questions;

async function loadNames() {
    const response = await fetch('../json/questions.json');
    questions = await response.json();


}
loadNames();



const infoCardBtn = document.getElementById("info-card-btn");
const infoCard = document.getElementById("info-card");
const startQuiz = document.getElementById("start-quiz");
const quizCard = document.getElementById("quiz-card");
const exitBtn = document.getElementById("exit-btn");
const nextQuestuinBtn = document.getElementById("next-questuin-btn");
const questionQounterDiv = document.getElementById("question-counter");
const questionParent = document.getElementById("question-parent");
const questionTitle = document.getElementById("question-title");

const optionList = document.getElementById("options-lits");
const infoCardTitle = document.getElementById("info-card-title");
const resultDiv = document.getElementById("result-div");
const infoCardList = document.getElementById("info-card-list");
const timerDiv = document.getElementById("timer");
const display = document.getElementById('time');
const bar = document.getElementById('progressBar');

let timeValue = 15;
let questionQounter = 0;
let questionNumber = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let timeForAnswer = timeValue;


infoCardBtn.onclick = () => {
    infoCard.classList.remove("d-none"); //show info box
    infoCardBtn.classList.add("d-none");
}
// if exitQuiz button clicked
exitBtn.onclick = () => {
    infoCard.classList.add("d-none"); //hide info box
}
startQuiz.onclick = () => {

    quizCard.classList.remove("d-none"); //hide info box
    infoCard.classList.add("d-none"); //show quiz box
    showQuetion(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(timeValue);
    startTimerLine(0); //calling startTimerLine function
}
function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        display.textContent = time - 1;
        time--;
        timeForAnswer--;
        if (time < 9) { //if timer is less than 9
            // let addZero = timeCount.textContent;
            // timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            clearInterval(counterLine); //clear counterLine
            display.textContent = "Time Off"; //change the time text to time off
            for (i = 0; i < optionList.children.length; i++) {
                optionList.children[i].classList.add("bg-dark"); //once user select an option then disabled all options
            }
            nextQuestuinBtn.classList.remove("invisible"); //show the next button if user selected any option
        }
    }
}
function startTimerLine(time) {
    counterLine = setInterval(timer, (15 * 3) - 3);
    function timer() {
        time += 1;
        bar.style.width = time + "px";
    }
    if (time > 549) { //if time value is greater than 549
        clearInterval(counterLine); //clear counterLine
    }
}
function showQuetion(index) {
    const question = questions[index];
    questionTitle.innerText = `${question.id}. ${question.question}`;
    for (i = 0; i < question.options.length; i++) {
        optionList.children[i].innerText = question.options[i].title;
        optionList.children[i].classList.remove("bg-primary");
        const selectedOption = optionList.children[i];
        const optionJSON = questions[index].options[i];
        selectedOption.addEventListener("click", () => {
            Selected(selectedOption, optionJSON) // add index if needed
        })
    }
}
function Selected(answerSelected, optionFromJSON) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    answerSelected.classList.add("bg-secondary");
    if (optionFromJSON.correct && timeForAnswer > 0) { //if user selected option is equal to array's correct answer
        userScore++; //upgrading score value with 1                   ******************************************************************
        console.log(userScore);
        answerSelected.classList.add("text-white");
    }
    for (i = 0; i < optionList.children.length; i++) {
        optionList.children[i].setAttribute("disabled", "");
        optionList.children[i].classList.add("disabled");
    }
    nextQuestuinBtn.classList.remove("invisible"); //show the next button if user selected any option
}
nextQuestuinBtn.onclick = () => {
    nextQuestuinBtn.classList.add("invisible");
    clearInterval(counterLine); //clear counterLine
    clearInterval(counter); //clear counterLine
    timeForAnswer = timeValue;
    for (i = 0; i < optionList.children.length; i++) {
        optionList.children[i].classList.remove("bg-dark");
        optionList.children[i].classList.remove("bg-secondary");
        optionList.children[i].classList.remove("text-white");
    }
    if (questionQounter < questions.length - 1) { //if question count is less than total question length
        questionQounter++; //increment the questionQounter value
        questionNumber++; //increment the questionNumber value
        clearInterval(counter); //clear counter
        showQuetion(questionQounter); //calling showQestions function
        queCounter(questionNumber); //passing questionNumber value to queCounter
        startTimer(timeValue);
        clearInterval(counterLine); //clear counterLine
        startTimerLine(widthValue); //calling startTimerLine function
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
        startQuiz.classList.add("d-none");
    }
}
function showResult() {
    infoCard.classList.remove("d-none"); //hide info box
    quizCard.classList.add("d-none"); //hide quiz box
    infoCardTitle.innerText = "Quiz result"
    resultDiv.innerText = `your resutl is ${userScore}.`;
    infoCardList.classList.add("d-none");
} const myBar = document.getElementById("my-bar");
function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    //let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    let questionQounter1 = `${index} / ${questions.length}`;
    questionQounterDiv.innerText = questionQounter1;  //adding new span tag inside bottom_ques_counter
    myBar.innerHTML = `<div class="progress-bar   text-white bg-secondary" role="progressbar"
        aria-label="Example with label" style="width: ${(index-1)/questions.length*100}%;"
        aria-valuemin="0" aria-valuemax="100"> 
        ${(index - 1) / questions.length * 100}%</div>
    `;
     }


 