
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("Server Initialization Complete");
});

// __dirname is the current directory name, no matter
// where to server is hosted
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body);
  let sum = parseInt(req.body["num1"]) + parseInt(req.body["num2"]);
  res.send("Thanks for posting. The result is: " + sum);
});


app.get("/bmiCalculator", function(req, res) {
  res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator.html", function(req, res) {
  console.log(req.body);
  res.send("NIGGA YOU KNOW YOU FAT AS FUCK!!!\nSTOP FUCKIN' WITH ME!!!");
});
