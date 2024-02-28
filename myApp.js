let express = require('express');
require('dotenv').config()
let bodyParser = require('body-parser');
let app = express();

app.use(function(req, res, next) {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

let absolutePath = __dirname+"/views/index.html"
app.get('/', function(req, res) {
    res.sendFile(absolutePath);
});

app.use('/public', express.static(__dirname+'/public'));

app.get('/json', function(req, res) {
    message = "Hello json"
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    res.json({message});
});

const addTimeMiddleware = function(req, res, next) {
    req.time = new Date().toString();
    next();
};
  
app.get('/now', addTimeMiddleware, function(req, res) {
    res.json({ time: req.time });
});

app.get('/:word/echo', function(req, res) {
    const word = req.params.word;
    res.json({ echo: word });
});

app.route('/api/:date')
    .get(function (req, res) {
    const unix = req.query.date;
    const utc = new Date(unix);
    res.json({ unix, utc});
  });



module.exports = app;





