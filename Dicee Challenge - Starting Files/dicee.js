


// First popluate the image fields with random die images
var img1 = document.getElementsByClassName("img1")[0];
var img2 = document.getElementsByClassName("img2")[0];
var diceImageArray = [img1, img2];


function showResults(winner) {
  var header = document.getElementsByTagName("h1")[0];
  if (winner === "Draw") {
    header.innerText = "Draw!";
  } else {
    header.innerText = winner + " wins!";
  }
}

function computeWinner(rollValue1, rollValue2) {
  if (rollValue1 > rollValue2) {
    return "Player 1";
  } else if (rollValue1 < rollValue2) {
    return "Player 2";
  } else {
    return "Draw";
  }
}

function playMatch() {
  var player1RollValue = rollDice();
  var player2RollValue = rollDice();
  var winner = computeWinner(player1RollValue, player2RollValue);
  loadResultImages(img1, player1RollValue);
  loadResultImages(img2, player2RollValue);
  showResults(winner);
}


function rollDice() {
  var rollValue = Math.floor( (Math.random() * 6) ) + 1;
  return rollValue;
}

function loadResultImages(img, rollValue) {
  var imageSource = "images/dice" + rollValue + ".png";
  img.setAttribute("src", imageSource);
}

function loadRandImages() {
  for (var i = 0; i < diceImageArray.length; i++) {
    var imageSource;
    var randNumber = rollDice();
    imageSource = "images/dice" + randNumber + ".png";
    diceImageArray[i].setAttribute("src", imageSource);
  }
}

// - - - - - - Script - - - - - - //
loadRandImages();

// This tells me if the page is reloaded
if (window.performance) {
  console.info("window.performance works fine on this browser");
}
  if (performance.navigation.type == 1) {
    console.info( "This page is reloaded" );
    playMatch();
  } else {
    console.info( "This page is not reloaded");
  }
