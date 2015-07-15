var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://arippp777:liberty@ds041613.mongolab.com:41613/books');

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes');

  app.use('/api', bookRouter);

app.get("/", function(req,res){
  res.send('welcome to my API!');
});

app.listen(port, function(){
  console.log("Running on port:" + port);
});
