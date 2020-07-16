$("h1").css("color", "red");

$(document).keypress(function(event) {
  let newText = $("h1").text() + event.key; 
  $("h1").text(newText);
});
