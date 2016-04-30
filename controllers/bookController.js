var bookController = function(Book) {

  var post = function(req,res){
    var book = new Book(req.body);
    book.save();
    res.status(201).send(book);

  }
  var get = function(req,res){
    var query = req.query;
    Book.find(query, function(error, books){
      if(error){
        res.status(500).send(error);
      } else {
        res.json(books);
      }
    });
    }

    return {
      post: post,
      get: get
    }
}

module.exports = bookController;
