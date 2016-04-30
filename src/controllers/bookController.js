const bookController = function(Book) {

  const post = function(req,res){
    const book = new Book(req.body);
    book.save();
    res.status(201).send(book);

  }
  const get = function(req,res){
    const query = req.query;
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
