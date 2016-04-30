var express = require('express');

var routes = function(Book) {

  var bookRouter = express.Router();

  bookRouter.use('/Books/:bookId', function(req,res,next){
    Book.findById(req.params.bookId, function(error,book){
      if(error){
        res.status(500).send(error);
      } else if(book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });
  bookRouter.route('/Books')
    .post(function(req,res){
      var book = new Book(req.body);
      book.save();
      res.status(201).send(book);

    })
    .get(function(req,res){
      var query = req.query;
      Book.find(query, function(error, books){
        if(error){
          res.status(500).send(error);
        } else {
          res.json(books);
        }
      });
      });

  bookRouter.route('/Books/:bookId')
    .get(function(req, res){
      res.json(req.book);
    })
    .put(function(req,res){
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;
      req.book.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
      res.json(req.book);
    })
    .patch(function(req,res){
      if(req.body._id) {
        delete req.body._id;
      }
      for(var p in req.body) {
        req.book[p] = req.body[p];
      }
      req.book.save(function(err){
        if(err) {
          res.status(500).send(err);
        } else {
          res.json(req.book);
        }
      });
  });

return bookRouter;


}

module.exports = routes;
