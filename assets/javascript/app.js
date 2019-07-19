//TODO Create an object "questions" with key as question and values as multiple choice options

var questions = {
  "Question 1" : ["Option 1", "Option 2", "Answer1", "Option 3"],
  "Question 2" : ["Option 1", "Answer2", "Option 2", "Option 3"],
  "Question 3" : ["Answer3", "Option 1", "Option 2", "Option 3"]
};


//TODO Create an object "answers" with key as question and value as correct answer
var correctAnswers = ["Answer1","Answer2","Answer3"];


//TODO Variables to store count of correct answered "correctCount" and wrong answered "wrongCount"
var correntCount = 0;
var wrongCount = 0;


var count;    //Variable to start the Questions counter
var intervalID;   //Variable to hold setInterval
var time;   //Varialbe to store time for each Question
var isRunning= false;


//TODO Button "Play Game" to start the game
function playGame() {
  $("#playGame").show();

  $("#question-text").hide();
  $("#answer-text").hide();
  $("#time-text").hide();

  count = 0;

  $("#playGame").on("click", function() {
    $("#playGame").off();
    $("#playGame").hide();
    askQuestion();
  });
};




//TODO To show question and options as radio buttons
function askQuestion() {

  $("#question-text").show();
  $("#answer-text").show();
  $("#time-text").show();  

  time = 20;

  $("#question").text(Object.keys(questions)[count]);
  $("#options").empty();

  $.each(questions[Object.keys(questions)[count]], function(index, val) {
    $("#options").append('<input type="radio" name="options" value='+ index +'>'+ val +"<br>");
  });

  setTimer();

};

//TODO Increase the counter for next question and wait for x interval
function setTimer() {

  //Start 20 seconds timer for the question
  intervalID = setInterval(startTimer,1000);
  checkAnswer();

  // count++;
  // if(count === Object.keys(questions).length + 1) {
  //   clearInterval(intervalID);
  //   playGame();
  // }

};

//TODO Show time decrement and update to new question when time is up
function startTimer() {
  time--;
  $("#time-text").text(time);
  stopTimer();
};

// TODO Check if time is zero
function stopTimer() {
  if(time === 0) {
    clearInterval(intervalID);
    checkAnswer();
  };
};

function showAnswer() {
  if(time === 0) {

    $("#question-text").hide();
    $("#time-text").hide();

    $("#timeout-text").show();
    $("#timeout-text").append("<p>You missed out!!!</p>");
    $("#timeout-text").append("<p>The Correct Answer is " + correctAnswers[count] +"</p>");
  }

  else {
    if() {
      $("#question-text").hide();
      $("#time-text").hide();
      
      $("#timeout-text").append("<p>Yayy!!</p>");
      $("#timeout-text").append("<p>The Correct Answer is " + correctAnswers[count] +"</p>");
    }
    else {

    }
  }
};

function checkAnswer() {
  $("#submitAnswer").on("click", function() {

    var selected = $("input:checked").val();
    console.log(selected);

    $("#submitAnswer").off();

    clearInterval(intervalID);

    $("#time-text").hide();

    showAnswer();
  })
};







playGame();

