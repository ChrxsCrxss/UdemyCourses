//jshint esversion:6
const express = require("express");
const ejs = require("ejs");
const bodyParser = requie("bodyParser");

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log('server is running on port 3000');
})
