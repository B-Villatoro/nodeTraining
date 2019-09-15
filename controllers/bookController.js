var routes = require('express').Router();
var bookDao = require('../dao/bookDao');

routes.get('/book',function(req,res){
    bookDao.getAllBooks(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/book', function(req, res){
  var book = req.body;
  bookDao.addBook(book, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Book Failed!');
    }
    else{
      res.status(201);
      res.send('Add Book Successful!');
    }
  });
});



routes.put("/book/:id", function(req,res){
  var book = req.body;
  book.bookId = req.params.id;
  bookDao.updateBook(book, function(err, result){
    if(err){
      res.status(400)
      res.send('Update Book Failed!')
    }
    else{
    res.status(201);
    res.json({'UPDATED': book});
    }
  });
});



routes.delete('/book/:id', function(req, res){
  bookDao.removeBook(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Book Failed!');
    }else{
      res.send('Delete Book Successful!');
    } 
  });
});

module.exports = routes;
