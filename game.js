
//Initialization

var started = false; //game is in non-running mode
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;

//event that happened

$(document).keydown(function() {
if(started === false){
  $("h1").text("Level " + level);
  started =  true;
}
else{
  nextSequence();
}
});


$(".btn").click(function() {
  var userChosenColour = this.classList[1]; //$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animationPress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

//Other functions
function animationPress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function nextSequence() {
  userClickedPattern = [];
  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  var id = "#" + randomChosenColour;
  $(id).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100); //animation flash
  playSound(randomChosenColour);
}

function checkAnswer(currentLevel){
if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
  if(userClickedPattern.length === gamePattern.length){
    setTimeout(function(){
      nextSequence();
    },1000);
    level = level + 1;
    $("h1").text("Level " + level);
  }
}
else{
  playSound("wrong");
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  startOver();
}
}

//Sound play
function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

//Starting over
function startOver(){
level = 0;
gamePattern = [];
started = false;
}
