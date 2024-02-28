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

// Ruta para manejar las solicitudes GET a "/index.js"
app.get('/index.js', function(req, res) {
  res.sendFile(__dirname + '/index.js');
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

const isUnix = (input) => {
  const timestamp = parseInt(input);
  return !isNaN(timestamp) && timestamp.toString() === input && new Date(timestamp).getTime() > 0;
};

const dateToUnixAndUTC = (dateString) => {
  const dateObject = new Date(dateString);
  const unixTimestamp = dateObject.getTime();
  const utcDate = dateObject.toUTCString();
  return { unixTimestamp, utcDate };
};

const isValidDateFormat = (dateString) => {
  const dateObject = new Date(dateString);
  return !isNaN(dateObject.getTime()) && dateObject.toString() !== 'Invalid Date';
};

app.get("/api/:date",function (req, res) {
    console.log(req.params)
    const inputDate = req.params.date;
    if(isUnix(inputDate)){
      const timestamp = parseInt(inputDate);
      const dateUtc = new Date(timestamp);
      const utcString = dateUtc.toUTCString();
      res.json({ unix: timestamp, utc:utcString});
    }else if(isValidDateFormat(inputDate)){
      const { unixTimestamp, utcDate } = dateToUnixAndUTC(inputDate);
      res.json({ unix:unixTimestamp, utc:utcDate});

    }else{
      res.json({ error : "Invalid Date" })
    }
  });
  app.get("/api/",function (req, res) {
    const actualDate = new Date();
    res.json({unix: actualDate.getTime(), utc: actualDate.toUTCString()})
  });


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
