<!DOCTYPE html>
<html>
<head lang="en">
<meta charset="UTF-8">
<title>Picture Quiz</title>
<style>
body {
background-color: #eeeeee;
}
.grid {
width: 68%;
height: 520px;
margin: 0 auto;
background-color: #fff;
padding: 10px 50px 50px 50px;
border-radius: 50px;
border: 2px solid #cbcbcb;
box-shadow: 10px 15px 5px #cbcbcb;
}

.buttons img
{
width:200px;
}
.grid h1 {
font-family: "sans-serif";
background-color: #ffc107;
font-size: 35px;
text-align: center;
color: #ffffff;
padding: 2px 0px;
border-radius: 50px;
}
hr
{
margin-top: 50px;
    color: red;
    background-color: #ffc107;
    height: 2px;
    border: none;
}
#score {
color: #ffc107;
text-align: center;
font-size: 30px;
}

.grid #question {
font-family: "monospace";
font-size: 30px;
color: #ffc107;
}

.buttons {
margin-top: 30px;
}

#btn0,
#btn1,
#btn2,
#btn3 {

    padding: 0px;
font-size: 20px;
color: #fff;
    border: none;
margin: 10px 20px 10px 0px;

}

#btn0:hover,
#btn1:hover,
#btn2:hover,
#btn3:hover {
cursor: pointer;
background-color: #ffc107;
}

#btn0:focus,
#btn1:focus,
#btn2:focus,
#btn3:focus {
outline: 0;
}

#progress {
color: #2b2b2b;
font-size: 18px;
}

</style>
</head>
<body>
<div class="grid">
<div id="quiz">
<h1>Picture Quiz</h1>
<hr style="margin-bottom: 20px">
<p id="question"></p>
<div class="buttons">
<button id="btn0"><span id="choice0"></span></button>
<button id="btn1"><span id="choice1"></span></button>
<button id="btn2"><span id="choice2"></span></button>
<button id="btn3"><span id="choice3"></span></button>
</div>
<hr style="margin-top: 50px">
<footer>
<p id="progress">Question x of y</p>
</footer>
</div>
</div>
<script type="text/javascript">
var images = {
"dog"  : "dog.jpg",
"cow" : "cow.jpg",
"cat" : "cat.jpg",
"goat"   : "goat.jpg",
"deer"   : "deer.jpg",
"hen"   : "hen.jpg",
"lion"   : "lion.jpg",
"parrot"   : "parrot.jpg",
"tiger"   : "tiger.jpg"

}  
function populate() {
if (quiz.isEnded()) {
showScores();
} else {
// show question
var element = document.getElementById("question");
element.innerHTML = quiz.getQuestionIndex().text;

// show options
var choices = quiz.getQuestionIndex().choices;
for (var i = 0; i < choices.length; i++) {
var element = document.getElementById("choice" + i);
element.innerHTML = images[choices[i]]? '<img src="'+images[choices[i]]+'"/>':choices[i];
guess("btn" + i, choices[i]);
}

showProgress();
}
};

function guess(id, guess) {
var button = document.getElementById(id);
button.onclick = function() {
quiz.guess(guess);
populate();
}
};

function showProgress() {
var currentQuestionNumber = quiz.questionIndex + 1;
var element = document.getElementById("progress");
element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
var gameOverHTML = "<h1>Result</h1>";
gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
var element = document.getElementById("quiz");
element.innerHTML = gameOverHTML;
};

// create questions
var questions = [
new Question("Which one is dog?", ["cow", "goat", "cat", "dog"], "dog"),
new Question("select tiger below", ["parrot", "deer", "tiger", "lion"], "tiger"),
new Question("choose parrot pls?", ["hen", "parrot", "goat",  "dog"], "parrot"),
new Question("Find cat below?", ["parrot", "goat", "cat", "tiger"], "cat"),
new Question("choose lion pls?", ["lion", "goat", "tiger", "dog"], "lion")
];

function Question(text, choices, answer) {
this.text = text;
this.choices = choices;
this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
return this.answer === choice;
}


function Quiz(questions) {
this.score = 0;
this.questions = questions;
this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function() {
return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function(answer) {
if (this.getQuestionIndex().isCorrectAnswer(answer)) {
this.score++;
}

this.questionIndex++;
}

Quiz.prototype.isEnded = function() {
return this.questionIndex === this.questions.length;
}

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();
</script>
</body>
</html>