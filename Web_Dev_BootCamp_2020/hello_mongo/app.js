
// require the mongoose model
const mongoose = require('mongoose');

// connect to the local mongoose server
mongoose.connect('mongodb://localhost:27017/personsDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



// We see here some of the mongoose validation for each field of
// the schema. Here, name MUST be of type string and cannot be null
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

// const pussyfruit = new Fruit ({
//   name: "pussyfruit",
//   rating: 9,
//   review: "meh"
// });
//
// const apricot = new Fruit ({
//   name: "apricot",
//   rating: 10,
//   review: "nigga, please"
// });
//
// const hampshireberry = new Fruit ({
//   name: "hampshireberry",
//   rating: 8,
//   review: "solid"
// });

const result = Fruit.deleteOne( { name : "dingleberry" }, (err) => {
  if (err) { console.log(err); }
  else { console.log("success")}
} );
