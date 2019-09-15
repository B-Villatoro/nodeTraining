var routes = require('express').Router();
var db = require('../dao/db');
var authorDao = require('../dao/authorDao');

routes.get('/author',function(req,res){
    authorDao.getAllAuthors(function(error, result){
      if(error) throw error;
      res.setHeader('Content-Type', 'application/json');
      res.send(result);
    });
});

routes.post('/author', function(req,res){
  var author = req.body;
  authorDao.addAuthor(author, function(err, result){
    if(err){
      res.status(400);
      res.send('Add Author Failed!');
    }
    else{
    res.status(201);
    res.json({'SUCCESS': author});
  }
  });
});

routes.put('/author/:id', function(req,res){
  var author = req.body;
  author.authorId = req.params.id;
  authorDao.updateAuthor(author, function(err, result){
    if(err){
      res.status(400)
      res.send('Update Author Failed!')
    }
    else{
    res.status(201);
    res.json({'UPDATED': author});
    }
  });
});

routes.delete('/author/:id', function(req,res){
  authorDao.removeAuthor(req.params.id, function(err, result){
    if(err){
      res.status(400);
      res.send('Delete Author Failed!');
    }
    else{
    res.status(201);
    res.json({'REMOVED': req.params.id});
    }
  });
});

module.exports = routes;
