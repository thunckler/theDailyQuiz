var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser'),
    Sequelize = require('sequelize');

var app = express();
app.use(bodyParser.urlencoded({ extended: true })); 

const models = require('./models')

app.post('/', function(req, res) {
  res.writeHead(200, {'Content-Type': 'text/xml'});
  var twilio = require('twilio');
  var twiml = new twilio.TwimlResponse();
  if (req.body.Body == 'Start') 
  {
    models.Question.find({
    order: [Sequelize.fn( 'RANDOM' ),]
        }).then(function(question) {
            console.log(question)
            twiml.message("Category:\n" + question.category + "\nYour Question is:\n" + question.question);
            res.end(twiml.toString());
        })
    } else {
        twiml.message('Try again Human');
        res.end(twiml.toString());
    }
  });

http.createServer(app).listen(1337, function () {
    console.log("Express server listening on port 1337");

});

