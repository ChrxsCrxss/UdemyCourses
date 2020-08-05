//jshint esversion:6
require("dotenv").config();
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose")


const app = express();
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));


// be sure to use session() before passport.session() to ensure that
// the login session is restored in the correct order.

app.use(session ({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());

app.use(passport.session());

mongoose.connect("mongodb://localhost:27017/userDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.set('useCreateIndex', true);


const userSchema = new mongoose.Schema({
  email: String,
  password: String
});


userSchema.plugin(passportLocalMongoose);

const User = new mongoose.model("User", userSchema);


passport.use(User.createStrategy());

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


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

app.get("/secrets", (req, res) => {
  if (req.isAuthenticated()) {
    res.render("secrets");
  } else {
    res.render("login");
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
})

app.post("/register", (req, res) => {

  User.register( {username: req.body.username}, req.body.password, (err, user) => {
    if (err) {
      console.log(err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      })
    }
  })

});

app.post("/login", (req, res) => {

  const NewUser = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(NewUser, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
  });
});
