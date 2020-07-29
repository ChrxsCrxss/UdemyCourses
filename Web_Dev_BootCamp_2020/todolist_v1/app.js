//jshint eversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Tells the app to use ejs as a view engine
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let newListItems = [];
app.post("/", function(req, res) {

  let item = req.body.newItem;

  if(req.body.list === "Work") {
    workItems.push(item);
      res.redirect("/work");
  } else {
    newListItems.push(item);
  }

  res.redirect("/");
})

app.get("/", function(req, res) {

  let today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var day = today.toLocaleDateString("en-US", options);
res.render('list', {listTitle: day, newListItems: newListItems});
});

let workItems = [];
app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work List", newListItems: workItems})
});

app.post("/work", function(req, res) {
  let item = req.body.newListItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function(req, res) {
  res.render("about");
})


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
