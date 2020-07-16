// New concepts: an addEventListener that adds an event listener that
// detects a specific event in the DOM and dispatches a handling function.
// In this case, the event handler is an anonymous function.
// A function has no name.
var drumButtonsArray = document.querySelectorAll(".drum");


for (var i = 0; i < drumButtonsArray.length; i++) {
  drumButtonsArray[i].addEventListener("click", function() {

    var buttonInnerHTML = this.innerHTML;
    makeSound(buttonInnerHTML);
    animateButton(buttonInnerHTML);
  });
}

document.addEventListener("keydown", function(event) {
  makeSound(event.key);
  animateButton(event.key);
});


function makeSound(key) {

  switch (key) {
    case "w":
      var audio = new Audio('sounds/crash.mp3');
      audio.play();
      break;
    case "a":
      var audio = new Audio('sounds/kick-bass.mp3');
      audio.play();
      break;
    case "s":
      var audio = new Audio('sounds/snare.mp3');
      audio.play();
      break;
    case "d":
      var audio = new Audio('sounds/tom-1.mp3');
      audio.play();
      break;
    case "j":
      var audio = new Audio('sounds/tom-2.mp3');
      audio.play();
      break;
    case "k":
      var audio = new Audio('sounds/tom-3.mp3');
      audio.play();
      break;
    case "l":
      var audio = new Audio('sounds/tom-4.mp3');
      audio.play();
      break;
    default:
      console.log("buttonInnerHTML");

  }
}

function animateButton(key) {

  var activeButton = document.querySelector("." + key);
  activeButton.classList.add("pressed");

  setTimeout(function () {
    activeButton.classList.remove("pressed");
  }, 100);
}
