//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const itemsSchema = {
  title: String
};

// mongoose model names are usually capitalized, first argument is the name
// of the collection (table), and the second argument is the schema
const Item = mongoose.model("Item", itemsSchema);

const Rise = new Item({
  title: "Rise"
});
const Grind = new Item({
  title: "Grind"
});
const Shine = new Item({
  title: "Shine"
});

const DefaultItems = [Rise, Grind, Shine];

const listSchema = {
  name: String,
  items: [itemsSchema]
}

const List = mongoose.model("List", listSchema);


app.get("/", function(req, res) {

  /* This is a tricky bit of code. First it performs a find() query on the
    Items collection, with a callback function that checks if the query result
    is empty or not. If the query result is empty, it loads the default
    items into the collection, then calls redirect() back to post, which
    executes the same block of code. This second time, the query will not be
    empty, so the else block is executed, and the results are passed to the
    embedded javascript in list.ejs. */
  Item.find({}, (err, items) => {
    if (items.length === 0) {
      Item.insertMany(DefaultItems, err => {
        if (err) {
          console.log(err);
        } else {
          console.log('Default insertion executed');
        }
      });
      res.redirect("/");
    } else {
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }

  });

});

app.post("/", function(req, res) {

  const itemName = req.body.newItem;
  const listName = req.body.list;

  const NewItem = new Item({
    title: itemName
  });

  if (listName === "Today") {
    NewItem.save();
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, (err, result) => {
      result.items.push(NewItem);
      result.save();
      res.redirect("/" + listName);
    });
  }
});

app.post("/delete", (req, res) => {

  const itemID = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === "Today") {
    Item.findByIdAndRemove(itemID, (err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/");
      }
    });
  } else {
    List.findOneAndUpdate({
      name: listName
    }, {
      $pull: {
        items: {
          _id: itemID
        }
      }
    }, (err, results) => {
      if (!err) {
        res.redirect("/" + listName);
      }
    });
  }

});



app.get("/:newList", function(req, res) {
  const customListName = _.capitalize(req.params.newList);

  List.findOne({
    name: customListName
  }, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (!results) {
      const list = new List({
        name: customListName,
        items: DefaultItems
      });
      list.save();
      res.redirect("/" + customListName);
    } else {
      res.render("list", {
        listTitle: customListName,
        newListItems: results.items
      });
    }



  })


});

app.get("/about", function(req, res) {
  res.render("about");
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
