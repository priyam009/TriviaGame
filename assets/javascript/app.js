//Create an object "questions" with key as question and values as multiple choice options
var questions = {
  "Which animal sleeps for only five minutes a day?" : ["Chameleon", "Koala", "Giraffe", "Beaver"],
  "One human hair can support how many kilograms?" : ["Three", "Five", "Seven", "Nine"],
  "Which one of these planets rotates clockwise?" : ["Uranus", "Mercury", "Pluto", "Venus"],
  "What color was Coca-Cola originally?" : ["Red", "Purple", "Beige", "Green"],
  "Which country contains the most languages?" : ["Papua New Guinea", "China", "Australia", "Jamaica"]
};

//Create an object "answers" with key as question and value as correct answer
var correctAnswers = ["Giraffe","Three","Venus","Green","Papua New Guinea"];

//Variables to store count of correct answered "correctCount" and wrong answered "wrongCount"
var correntCount = 0;
var incorrectCount = 0;
var unanswered = 0;

var count;    //Variable to start the Questions counter
var intervalID;   //Variable to hold setInterval
var waitResult;   //Varibale to hold the last answer for 3 seconds
var time;   //Varialbe to store time for each Question
// var gameAudio = $("#game-audio")[0];
// gameAudio.play();

//Button "Play Game" to start the game
function playGame() {
  $("#play-game").show();
  

  $("#question-text").hide();
  $("#answer-text").hide();
  $("#time-text").hide();
  $("#next-question").hide();
  $("#final-text").hide();
  $("#reset").hide();

  count = 0;

  $("#play-game").on("click", function() {
    $("#play-game").off();
    $("#play-game").hide();
    $("#game-name").hide();
    askQuestion();
  });
};

//To "Restart" the game again
function reset() {
  $("#reset").off();
  $("#final-text").hide();
  $("#reset").hide();

  count = 0;
  correntCount = 0;
  incorrectCount = 0;
  unanswered = 0;

  askQuestion();
}


//To show question and options as radio buttons
function askQuestion() {
  time = 20;

  $("#question-text").show();
  $("#answer-text").show();
  $("#time-text").show();
  $("#options").empty();
  $("#next-question").hide();
  $("#answer-image").hide();

  $("#question").text(Object.keys(questions)[count]);

  $.each(questions[Object.keys(questions)[count]], function(index, val) {
    $("#options").append('<input type="radio" name="options" value='+ index +'>'+ val +"<br>");
  });

  setTimer();

};

//Set 20 second interval to answer the question
function setTimer() {
  $("#time-text").text("Time Remaining: " + time + " Seconds");
  intervalID = setInterval(startTimer,1000);
  checkAnswer();
};

//Show time decrement
function startTimer() {
  time--;
  $("#time-text").text("Time Remaining: " + time + " Seconds");
  stopTimer();
};

// Check if time is zero
function stopTimer() {
  if(time === 0) {
    clearInterval(intervalID);
    missedAnswer();
  };
};

//Get the answer from the checked radio button
function checkAnswer() {
  $("#submitAnswer").on("click", function() {
    var selected = $("input:checked").val();
    // console.log(selected);
    $("#submitAnswer").off();
    clearInterval(intervalID);
    
    $("#time-text").hide();
    showAnswer(selected);
  })
};

//When the answer is not selected
function missedAnswer() {
  $("#submitAnswer").off();
  if(time === 0) {
    $("#question-text").hide();
    $("#time-text").hide();
    $("#timeout-text").show();
    $("#timeout-text").append("<p>You missed out!!!</p>");
    $("#timeout-text").append("<p>The Correct Answer is " + correctAnswers[count] +"</p>");

    $("#answer-image").show();
    $("#answer-image").attr("src", "https://media.giphy.com/media/Y41egxqF4fjixufTPq/giphy.gif");
    $("#answer-image").attr("width","400px;");

    unanswered++;
  }
  decision();
}

//To show the correct and incorrect answers
function showAnswer(selected) {
  if(questions[Object.keys(questions)[count]][selected] == correctAnswers[count]) {
    $("#question-text").hide();
    $("#time-text").hide();

    $("#timeout-text").append("<p>Yayy!! You are right</p>");
    $("#timeout-text").append("<p>" + correctAnswers[count] +" it is</p>");

    $("#answer-image").show();
    $("#answer-image").attr("src", "https://media.giphy.com/media/1GTZA4flUzQI0/giphy.gif");
    $("#answer-image").attr("width","400px;");

    correntCount++;
  }
  else {
    $("#question-text").hide();
    $("#time-text").hide();

    $("#timeout-text").append("<p>Nahh!! You are wrong</p>");
    $("#timeout-text").append("<p>The Correct Answer is " + correctAnswers[count] +"</p>");


    $("#answer-image").show();
    $("#answer-image").attr("src", "https://media.giphy.com/media/BEob5qwFkSJ7G/giphy.gif");
    $("#answer-image").attr("width","350px;");

    incorrectCount++;
  }
  decision();
};

//To check if there is a next question or should show final results
function decision() {
  clearInterval(waitResult);

  if(Object.keys(questions).length-1 == count) {
    waitResult = setTimeout(showResult, 3000);
  }
  else {
    nextQuestion();
  }
};

//To increase the count variable and call next question
function nextQuestion() {
  count++;

  $("#next-question").show();
  $("#next-question").on("click", function() {
    $("#next-question").off();
    $("#timeout-text").empty();
    askQuestion();
  });
};

//To show the final results with an option to play the game again
function showResult() {
  $("#next-question").off();
  $("#answer-image").hide();
  $("#timeout-text").empty();

  $("#final-text").show();
  $("#correntCount-text").text("Correct Answers: "+ correntCount);
  $("#incorrectCount-text").text("Incorrect Answers: "+ incorrectCount);
  $("#unanswered-text").text("Unanswered: "+ unanswered);

  $("#reset").show();

  $("#reset").on("click", function() {
    reset();
  });

}

$(document).ready(function() {
  playGame();
});

