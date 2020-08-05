const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

// connect to the local mongoose server
mongoose.connect('mongodb://localhost:27017/WikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});


const articleSchema = {
  title: String,
  content: String
};


// mongoose model names are usually capitalized, first argument is the name
// of the collection (table), and the second argument is the schema
const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
  .get((req, res) => {
    Article.find((err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  })

  .post((req, res) => {
    const NewArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });

    NewArticle.save((err) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Successful POST request.")
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany({
      /*Delete all records */
    }, (err) => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully deleted all articles');
      }
    })
  });


app.route("/articles/:articleTitle")
  .get((req, res) => {
    Article.findOne({
      title: req.params.articleTitle
    }, (err, resultFound) => {
      if (resultFound) {
        res.send(resultFound)
      } else {
        res.send("No matching resutls found");
      }
    });
  })

  .put((req, res) => {

    Article.update(
      {title: req.params.articleTitle},
      {title: req.body.title, content: req.body.content},
      {overwrite: true},
      (err) => {
        if (!err) {
          res.send('update successful');
        }
      }
    );
  })

  .patch((req, res) => {

    Article.update(
      {title: req.params.articleTitle},
      {$set: req.body},
      (err) => {
        if (!err) {
          res.send('Successfully updated resource with patch');
        }
      }
    );
  })

  .delete((req, res) => {
    Article.deleteOne({title: req.params.articleTitle}, (err) => {
      if (!err) {
        res.send('deletion successful');
      }
    })
  });





app.listen(3000, function() {
  console.log(`Sever has started on part 3000`);
});
