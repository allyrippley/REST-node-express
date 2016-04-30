'use strict';

var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var db = mongoose.connect('mongodb://aripp:liberty@ds041613.mongolab.com:41613/books');

var Book = require('./models/bookModel');
var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var bookRouter = require('./routes/bookRoutes');

app.use('/api', bookRouter(Book));

app.get("/", function (req, res) {
  res.send('welcome to my API!');
});

app.listen(port, function () {
  console.log("Running on port:" + port);
});
"use strict";

var bookController = function bookController(Book) {

  var post = function post(req, res) {
    var book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  };
  var get = function get(req, res) {
    var query = req.query;
    Book.find(query, function (error, books) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get
  };
};

module.exports = bookController;
'use strict';

var express = require('express');

var routes = function routes(Book) {

  var bookRouter = express.Router();

  bookRouter.use('/Books/:bookId', function (req, res, next) {
    Book.findById(req.params.bookId, function (error, book) {
      if (error) {
        res.status(500).send(error);
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });
  bookRouter.route('/Books').post(function (req, res) {
    var book = new Book(req.body);
    book.save();
    res.status(201).send(book);
  }).get(function (req, res) {
    var query = req.query;
    Book.find(query, function (error, books) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(books);
      }
    });
  });

  bookRouter.route('/Books/:bookId').get(function (req, res) {
    res.json(req.book);
  }).put(function (req, res) {
    req.book.title = req.body.title;
    req.book.author = req.body.author;
    req.book.genre = req.body.genre;
    req.book.read = req.body.read;
    req.book.save(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
    res.json(req.book);
  }).patch(function (req, res) {
    if (req.body._id) {
      delete req.body._id;
    }
    for (var p in req.body) {
      req.book[p] = req.body[p];
    }
    req.book.save(function (err) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json(req.book);
      }
    });
  });

  return bookRouter;
};

module.exports = routes;
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookModel = new Schema({
  title: {
    type: String
  },
  author: { type: String },
  genre: { type: String },
  read: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Book', bookModel);
//# sourceMappingURL=all.js.map
