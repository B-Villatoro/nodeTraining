var db = require('./db');

exports.getAllAuthors = function(cb){
    db.query('select * from library.tbl_author', function(err, result) {
        cb(err, result);
      });
};

exports.addAuthor = function(author, cb){
  db.beginTransaction(function(err){
    if(err) cb(err,null)

    db.query('insert into library.tbl_author(authorID, authorName) values (?,?)', [author.authorId, author.authorName], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      }
      else{
      db.commit(function(err, res){
        cb(err,res);
      });
    }
    });
  });
};

exports.updateAuthor = function(author, cb){
  db.beginTransaction(function(err){
    if(err) cb(err,null)
    db.query('update library.tbl_author set authorName =? where authorId =?', [author.authorName, author.authorId], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      }
      else{
      db.commit(function(err, res){
        cb(err, res);
      });
    }
    });
  });
}

exports.removeAuthor = function(authorId, cb){
  db.beginTransaction(function(err){
    if(err) cb(err,null)
    db.query('delete from library.tbl_author where authorId =?', [authorId], function(err, res){
      if(err){
        db.rollback(function(err, res){
          cb(err, res);
        });
      }
      else{
      db.commit(function(err, res){
        cb(err, res);
      });
    }
    });
  });
}