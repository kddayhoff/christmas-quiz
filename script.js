var quizQuestions = document.getElementById("quizQuestions");
var score = document.getElementById("score");
var startBtn = document.createElement("button");
var seconds = document.getElementById("seconds");
var endTimer = document.getElementsByClassName("timer");
var initials = document.getElementById("initials");
var startBtn = document.getElementById("start-button");
var submitBtn = document.getElementById("submit-button");
var rightWrong = document.getElementById("right-wrong");
var savedInitials = document.getElementById("saved-initials");
var savedScores = JSON.parse(localStorage.getItem("high-scores")) || [];
var quizTimer = 60;
var questionNumber = 0;
var timerInterval;
var finalScore = 0;

var questions = [
  {
    ask:
      "How old is Mrs. Claus?",
    correctAnswer: "1,138 years old",
    choices: ["1,138 years old", "387 years old", "60 years old", "666 years old"],
  },
  {
    ask:
    "In the move <i>Elf</>, what was the first rule of the Code of Elves?",
    correctAnswer: "Treat everyday like Christmas!",
    choices: ["Christmas is better than Halloween", "Treat everyday like Christmas!", "Elves do not eat vegetables.", "Santa is our Lord and Master. Hail Santa."],
  },
  {
    ask:
      "What reinder is missing from Santa's reinder roster: Dancer, Prancer, Blitzen, Dancer, Comet, Cupid, Donner, Rudolph",
    correctAnswer: "Vixen",
    choices: ["Dixie", "Karen", "Vinny", "Vixen"],
  },
  {
    ask: "How old is Ralphie in <i>A Christmas Story</i>",
    correctAnswer: "9 years old",
    choices: [
      "8 years old",
      "15 years old",
      "5 years old",
      "9 years old",
    ],
  },
  {
    ask: "What were the sister's names in <i>A White Christmas</i>",
    correctAnswer: "Betty and Judy",
    choices: [
      "Betty and Judy",
      "Brenda and Judy",
      "Brenda and Jane",
      "Thelma and Louise",
    ],
  },
  {
    ask: "What year was <i>Grandma Got Runover by a Reindeer</i> released?",
    correctAnswer: "1979",
    choices: [
      "1956",
      "1992",
      "1979",
      "2000",
    ],
  },
  {
    ask: "What is Santa's favorite cookie?",
    correctAnswer: "M&M cookies with sprinkles",
    choices: [
      "M&M cookies with sprinkles",
      "Oreos",
      "Oatmeal with Raisin",
      "Chocolate Chip",
    ],
  },
  {
    ask: "In what year was Dr. Suess's book <i>How the Grinch Stole Christmas</i> published?",
    correctAnswer: "1957",
    choices: [
      "1990",
      "1957",
      "1985",
      "1857",
    ],
  },
  {
    ask: "What country started the tradition of putting up a Christmas tree?",
    correctAnswer: "Germany",
    choices: [
      "Italy",
      "United States",
      "Germany",
      "Russia",
    ],
  },
  {
    ask: "What is the most popular Christmas tree topper?",
    correctAnswer: "Angel",
    choices: [
      "Snowflake",
      "Mickey Mouse",
      "Star",
      "Angel",
    ],
  }
];

//Start Quiz timer

startBtn.addEventListener("click", function () {
  event.preventDefault();
  // var quizTimer = 60;
  timerInterval = setInterval(function () {
    quizTimer--;
    seconds.textContent = quizTimer;
    if (quizTimer <= 0) {
      clearInterval(timerInterval);
      alert("Time's Up!");
      endGame();
    }
  }, 1000);
  console.log(quizTimer);
  startBtn.setAttribute("class", "d-none");
  showQuestions();
});

console.log(quizTimer);

//Make questions appear on page and loop them until the user has gone through all choices
function showQuestions() {
  if (questionNumber < questions.length) {
    quizQuestions.innerHTML = questions[questionNumber].ask;

    for (var i = 0; i < questions[questionNumber].choices.length; i++) {
      console.log(questions[questionNumber]);

      var btn = document.createElement("button");
      btn.innerText = questions[questionNumber].choices[i];
      quizQuestions.appendChild(btn);
      btn.addEventListener("click", function () {
        checkAnswers();
        showQuestions();
        score.innerText = "Final score: " + finalScore;
      });
    }
  }
  if (questionNumber === questions.length) {
    endGame();
  }
}

function checkAnswers() {
  var userChoice = event.target.textContent;

  if (userChoice === questions[questionNumber].correctAnswer) {
    questionNumber++;
    finalScore++;
    quizTimer += 10;
    console.log(quizTimer);
    rightWrong.innerText = "Nice!";
    console.log(questionNumber);
    console.log(finalScore);
  } 
  
  else {
    userChoice !== questions[questionNumber].correctAnswer;
    questionNumber++;
    quizTimer -= 15; 
    rightWrong.innerText = "Naughty";
    console.log(quizTimer);
    console.log(questionNumber);
   
  }
}

function endGame() {
  clearInterval(timerInterval);
  seconds.setAttribute("class", "d-none");
  initials.removeAttribute("class", "d-none");
  initials.setAttribute("class", "d-block");
  submitBtn.setAttribute("class", "d-block");
  rightWrong.setAttribute("class", "d-none");
 
  quizQuestions.innerHTML = "You Scored " + finalScore + " points!";

  submitBtn.addEventListener("click", function () {
    var userInitials = initials.value;
    if (userInitials == null || userInitials == "") {
      alert("Please Enter Your Initials on Santa's Nice and Naughty List");
      return false;
    }
    savedScores.push("Name: " + userInitials + " | " + " Score: " + finalScore);
    localStorage.setItem("high-scores", JSON.stringify(savedScores));
    displayHighScores();
  });
}

function displayHighScores() {
  for (var i = 0; i < savedScores.length; i++) {
    var scoreList = document.createElement("li");
    scoreList.innerText = savedScores[i];
    savedInitials.appendChild(scoreList);
  }
}
