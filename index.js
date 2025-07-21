// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/what", function (req, res) {
  res.json({hi: 'bro'});
})
//The timestamp api endpoint
app.get("/api/:date?", (req, res) => {
  let dateStr = req.params.date;
  let date;

  // --- FIX STARTS HERE ---
  if (!dateStr) { // Check if dateStr is undefined or an empty string
    date = new Date(); // If no date parameter, use the current time
  } else if (!isNaN(Number(dateStr)) && dateStr.length === 13) {
  // This condition correctly checks if dateStr is a 13-digit number (Unix timestamp)
  // Use Number() to safely convert string to number for isNaN check
    date = new Date(parseInt(dateStr)); // Parse as integer for timestamp
  } else {
    // This handles all other cases, primarily natural language dates
    date = new Date(dateStr);
  }
  // --- FIX ENDS HERE ---

  // Check if the resulting date object is an "Invalid Date"
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }

  // If valid, return the unix and utc values
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});
// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
module.exports = app;
