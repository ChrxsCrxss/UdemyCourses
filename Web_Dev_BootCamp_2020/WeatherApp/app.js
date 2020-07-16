/* Express is the module used quick spin up a server */
const express = require("express");
const app = express();

/* The native https module is used to make requests to
foreign APIs */
const https = require("https");

/* Module used to parse html body as text */
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, function() {
  console.log("Server initialized");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");


});

app.post("/", function(req, res) {

  // Use body-parser module to get post data
  const query = req.body.cityName;
  // api key for authentication with foreign api
  const apiKey = "fcb04faa9e98fa1bb4b303ab5cc4b129";
  const units = "imperial";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query +"&units=" + units + "&appid=" + apiKey;

  // Use https module to make get request to foreign api over network
  https.get(url, function(response) {
    console.log("Return code: " + response.statusCode);

    // Inside the callback function of the get request, convert the
    // response into a JSON object
    response.on("data", function(data) {

      /* JSON.parse() converts raw data into a human readable
        JSON (javscript object notation) object.
        JSON.stringify() does the opposite: it converts a
        JSON object into a sting string
      */
      const weatherData = JSON.parse(data);

      const temp = weatherData.main.temp;
      const weatherDescription = weatherData.weather[0].description;
      const iconCode = weatherData.weather[0].icon;
      const iconURL = "http://openweathermap.org/img/wn/" + iconCode + "@2x.png";
      console.log("temperature in feihrienheit: " + temp);
      console.log("description: " + weatherDescription);


      // You can only have ONE res object in an app method, but you can have
      // multiple writes. This indicates that the res.send() method makes use
      // of a buffer to temporarily store data. Notice also that we can use
      // the query variable, since this function has access to outer-scope
      // variables
      res.write("<h1>The tempature in " + query + " is: " + temp + "</h1>");
      res.write("<h1>The weather is " + weatherDescription + "</h1>");
      res.write("<img src=" + iconURL +">");
      res.send();

    });
  });
});
