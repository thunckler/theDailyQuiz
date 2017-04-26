var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

const models = require('./models')

app.post('/', function(req, res) {
var twilio = require('twilio');
    var twiml = new twilio.TwimlResponse();
  if (req.body.Body == 'Start') 
  {
    models.Question.find({
    order: [Sequelize.fn( 'RANDOM' ),]
        }).then(function(question) {
            var twiml = new twilio.TwimlResponse();
            console.log(twiml);
            twiml.message("Your Question is:\n" + question.question);
        })
    } else {
        twiml.message('Try again Human');
    }

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  });

http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337");

});

