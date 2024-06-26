
let questions;

async function loadNames() {
    const response = await fetch('../json/questions.json');
    questions = await response.json();


}
loadNames();

/*
// post into json files

async function postName() {
const object = { name: 'James Gordon' };
const response = await fetch('/api/names', {
method: 'POST',
body: JSON.stringify(object)
});
const responseText = await response.text();
console.log(responseText); // logs 'OK'
}
postName();

*/


//selecting all required elements
//TODO: Change vars name to Kebab Case ex: startBtn
//TODO: get elements by ids instead of classes
const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");

const resultDiv =  document.querySelector(".resultDiv");

// if startQuiz button clicked
start_btn.onclick = () => {
    //TODO: Use bootstrap classes
    info_box.classList.add("activeInfo"); //show info box
}

// if exitQuiz button clicked
exit_btn.onclick = () => {
    //TODO: Use bootstrap classes
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
    //TODO: Use bootstrap classes
    info_box.classList.remove("activeInfo"); //hide info box
    //TODO: Use bootstrap classes
    quiz_box.classList.add("activeQuiz"); //show quiz box

    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    //window.location.reload(); //reload the current window
    result_box.classList.remove("activeResult");
    start_btn.setAttribute("class","d-none");
    resultDiv.removeAttribute("class","d-none");
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index) {


    //TODO: get elements by ids instead of classes
    //TODO: better naming for variables
    const que_text = document.querySelector(".que_text");

    //const qu1 = document.querySelector(".qu1");
    const ans = document.querySelector(".d-none");
    const elQue=document.createElement("div");
    elQue.setAttribute("class", "que_text",);
    elQue.innerText=questions[index].id + '. ' +questions[index].question;
    ans.append(elQue);

    const oplist=document.createElement("div");
    oplist.setAttribute("class", "option_list");
    ans.append(oplist);




    option_list.innerHTML = '<!-- -->';
    for (let i = 0; i < questions[index].options.length; i++) {



        const elOp=document.createElement("div");
        elOp.setAttribute("class", "option");
        elOp.innerText = questions[index].options[i].title;
        oplist.append(elOp);



        ;

        const element = document.createElement("div");
        element.setAttribute("class", "option");
        element.innerText = questions[index].options[i].title;
        option_list.append(element);
        // option_lis1.append(element);
        element.addEventListener("click", () => {
            optionSelected(element, questions[index].options[i]    , elOp ,index )

        })
    }


    que_text.innerHTML = questions[index].id + '. ' + questions[index].question; //adding new span tag inside que_tag
    // option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    /*
                //creating a new span and div tag for question and option and passing the value using array index
                let que_tag = '<span>'+ questions[index].id + ". " + questions[index].question +'</span>';
                let option_tag = '<div class="option"><span>'+ questions[index].options[0].title +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[1].title +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[2].title +'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[3].title+'</span></div>'
                + '<div class="option"><span>'+ questions[index].options[4].title+'</span></div>';
                que_text.innerHTML = que_tag; //adding new span tag inside que_tag
                option_list.innerHTML = option_tag; //adding new div tag inside option_tag


    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)"); //,option[i]
    }
    */
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer, option    , elOp , index) {

    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    answer.classList.add("correct");
    const allOptions = option_list.children.length; //getting all option items



    const resultDivOptions =  document.querySelector(".resultDiv").lastChild;




    answer.classList.add("correct"); //adding green color to correct selected option

    if (option.correct) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1

        elOp.classList.add("correct")
        elOp.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon
        // answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        //console.log("Correct Answer *** Your correct answers (score) = " + userScore + answer.textContent);
    }
    else {
        //answer.classList.add("incorrect"); //adding red color to correct selected option
        //answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        // console.log("Wrong Answer!!! Your wrong answer is = " + answer.textContent);

        elOp.classList.add("incorrect")
        elOp.insertAdjacentHTML("beforeend", crossIconTag); //adding tick icon




        for (let i = 0; i < 5; i++) { //option_list.children[i].textContent == correcAns   //questions[index].question.correct



            if (questions[index].options[i].correct) { //if there is an option which is matched to an array answer

                resultDivOptions.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                resultDivOptions.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option

                // option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                //option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }

        /*
         for (i = 0; i < option_list.length; i++) { //option_list.children[i].textContent == correcAns   //questions[index].question.correct
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
        */


    }



    for (i = 0; i < allOptions; i++) {
        //option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
        const option = option_list.querySelectorAll(".option");
        option[i].classList.add("disabled");
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > 1) { // if user scored more than 1
        let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    //let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>' +
        `<div class="progress">
  <div class="progress-bar progress-bar-striped bg-secondary progress-bar-animated" role="progressbar" aria-label="Example with label" style="width: ${(index-1)/questions.length*100}%;"   aria-valuemin="0" aria-valuemax="100">${(index-1)/questions.length*100}%</div>
</div>`;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

