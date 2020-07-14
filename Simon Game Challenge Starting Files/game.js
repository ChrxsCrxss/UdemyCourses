
let gameHasBegun = false;
let level = -1;
let gamePattern = [];
let userClickPattern = [];
const buttonColors = ["red", "blue", "green", "yellow"];

function updateLevel() {
  level++;
  $("h1").text("Level " + level);
}

function restart() {
  gameHasBegun = false;
  level = -1;
  gamePattern = [];
  userClickPattern = [];
  nextSequence();
}

function checkAnswer(currentLevel) {
  let userInputWasCorrect = (userClickPattern[currentLevel] === gamePattern[currentLevel])
  if (userInputWasCorrect) {
    if (currentLevel === level) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    let audioSource = "sounds/wrong.mp3";
    var loseAudio = new Audio(audioSource);
    loseAudio.play();
    $("h1").text("Game Over, Press Any Key to Restart");
    $(document.body).addClass("game-over");
    setTimeout(function() {
          $(document.body).removeClass("game-over");
    }, 200);
  }

}

function nextSequence() {
  updateLevel();
  userClickPattern = [];
  let randomNumber = Math.floor((Math.random() * 4));
  let randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  console.log(gamePattern);
  $(randomChosenColor).fadeOut(100).fadeIn(100);
  playsound(randomChosenColor);
  $("."+randomChosenColor).fadeOut(100).fadeIn(100);
  return randomNumber;
}

function playsound(name) {
  let audioSource = "sounds/" + name + ".mp3";
  var buttonAudio = new Audio(audioSource);
  buttonAudio.play();
}

function animatePress(currentColor) {
  console.log("User pressed:" + currentColor);
  $(currentColor).addClass(".pressed");
  setTimeout(function() {
    $(currentColor).removeClass(".pressed")
  }, 100);
}

$(".btn").click(function(event) {

  if (gameHasBegun) {
    let userChosenColor = event.target.id;
    playsound(userChosenColor);
    animatePress("#"+userChosenColor);
    userClickPattern.push(userChosenColor);
    checkAnswer(userClickPattern.length-1);
    console.log(userClickPattern);
  }
});


$(document).keypress(function() {

  if (!gameHasBegun) {
    gameHasBegun = true;
    nextSequence();
  } else {
    restart();
  }
});
