//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//
const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


const User = new mongoose.model("User", userSchema);

const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, () => {
  console.log('server is running on port 3000');
});

app.get("/", (req, res) => {

  res.render("home");
});

app.get("/login", (req, res) => {

  res.render("login");
});

app.get("/register", (req, res) => {

  res.render("register");
});

app.post("/register", (req, res) => {

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    if (err) {console.log(err);}
    else {

      const NewUser = new User({
        email: req.body.username,
        password: hash
      });

      NewUser.save((err) => {
        if (err) {
          console.log(err);
        } else {
          res.render("secrets");
        }
      });
    }
  });

});

app.post("/login", (req, res) => {
      const username = req.body.username;
      const password = req.body.password;

      User.findOne({
        email: username
      }, (err, foundUser) => {
        if (err) {
          console.log(err)
        } else {
          bcrypt.compare(password, foundUser.password, (err, result) => {
            if (result === true) {
              res.render("secrets");
            }
          })
        }
      });
    });
