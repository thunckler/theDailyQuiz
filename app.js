var http = require('http'),
    express = require('express'),
    twilio = require('twilio'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    Sequelize = require('sequelize');

var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
            models.Message.create({questionId: question.id, number: req.body.From});
            
            twiml.message("Category:\n\n" + question.category + "\n \nQuestion:\n\n" + question.question);
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

