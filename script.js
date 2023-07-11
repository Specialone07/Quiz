// Array to store quiz questions and answer options
const questions=[
    {
        question:"Which of the following is NOT a JavaScript data type?",
        answers:[
            {text: "String", correct: false},
            {text: "Boolean", correct: false},
            {text: "Integer", correct: true},
            {text: "Object", correct: false},
        ]
    },
    {
        question:"What does the DOM stand for in JavaScript?",
        answers:[
            {text:"Document Object Model", correct: true},
            {text:"Data Object Model", correct: false},
            {text:"DOcument Oriented Model", correct: false},
            {text:"DOcument Order Model", correct: false},
        ]
    },
    {
        question:"How do you declare a variable in JavaScript?",
        answers:[
            {text:"Let", correct: false},
            {text:"Var", correct: false},
            {text:"Const", correct: false},
            {text:"All of the above", correct: true},
        ]
    },
    {
        question:"Which method is used to add an element to the end of an array in JavaScript?",
        answers:[
            {text:"push()", correct: true},
            {text:"pop()", correct: false},
            {text:"shift()", correct: false},
            {text:"unshift()", correct: false},
        ]
    },
    {
        question:"What does the 'typeof' operator return for an array?",
        answers:[
            {text:"array", correct: false},
            {text:"object", correct: true},
            {text:"shift", correct: false},
            {text:"undefined", correct: false},
        ]
    },
    {
        question:"What is the purpose of the 'setTimeout' function in JavaScript?",
        answers:[
            {text:"To repeat a function at regular intervals", correct: false},
            {text:"To delay the execution of a function", correct: true},
            {text:"To stop the execution of a function", correct: false},
            {text:"To check the type of a variable", correct: false},
        ]
    },
    
    {
        question:"Which method is used to remove the last element from an array in JavaScript?",
        answers:[
            {text:"array", correct: false},
            {text:"slice()", correct: false},
            {text:"shift()", correct: false},
            {text:"pop()", correct: true},
        ]
    },
    
    {
        question:"What is the result of the following expression: 10 + '5'?",
        answers:[
            {text:"15", correct: false},
            {text:"10", correct: false},
            {text:"1050", correct: false},
            {text:"105", correct: true},
        ]
    },
    
    {
        question:"How do you comment a single line in JavaScript?",
        answers:[
            {text:" <!-- -->", correct: false},
            {text:"//", correct: true},
            {text:"/*", correct: false},
            {text:" \\", correct: false},
        ]
    },
    
    {
        question:"What is the correct way to write an if statement in JavaScript?",
        answers:[
            {text:"  if x = 5 { }", correct: false},
            {text:"if (x == 5) { }", correct: true},
            {text:"if x == 5 then { }", correct: false},
            {text:" if x=5", correct: false},
        ]
    },
    

];
// HTML element variables
const questionElement= document.getElementById("question");
const answerButtons=document.getElementById("answers-button");
const nextButton = document.getElementById("next-btn");
// Variables to track current question and score
let currentQuestionIndex =0;
let score=0;
// Function to start the quiz

function startQuiz(){
    currentQuestionIndex =0;
    score =0;
    nextButton.innerHTML="Next";
    showQuestion();
}
// Function to display a question
function showQuestion(){
    resetState(); // Reset answer buttons and next button
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+ 1;
    questionElement.innerHTML = questionNo+". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });

}
// Function to reset the UI state
function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
// Function to handle answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    // Disable all answer buttons
    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
// Function to display the final score
function showScore(){
    resetState();
    questionElement.innerHTML=`You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
// Function to handle the next button click
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex  < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}
// Event listener for the next button click
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();//restart the quiz
    }
})
//start the quiz initially
startQuiz();