


/*
This is an example of building a node.js module. The exports is a property of
the node.js module. The long-form declaration would be module.exports...

Here, we declare anonymous functions and bind them to variables. Note that in
this case, the variables are properties of the node.js module exports: getDate
and getDay. Another, more wordy way to do the same thing would be:

            module.exports.getDate = getDate;

            function getDate() {

              let today = new Date();

              var options = {
                weekday: "long",
                day: "numeric",
                month: "long"
              };

              var date = today.toLocaleDateString("en-US", options);
              return date;
            }

The abbreviated syntax is given below, and makes for more readable and
reliable code.
*/

exports.getDate = function () {

  let today = new Date();

  var options = {
    weekday: "long",
    day: "numeric",
    month: "long"
  };

  var date = today.toLocaleDateString("en-US", options);
  return date;
}

exports.getDay = function () {

  let today = new Date();

  var options = {
    weekday: "long",
  };

  var day = today.toLocaleDateString("en-US", options);
  return day;
}
