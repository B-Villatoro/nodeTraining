var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require('../main.js')
chai.use(chaiHttp);

describe('Authors', function() {

    it('should list all Authons on /author GET', function(done){
        chai.request(server)
        .get('/author')
        .end(function(err,res){
            res.should.have.status(200);
            res.should.be.json;
            res.body.should.be.a('array');
            res.body[0].should.have.property('authorId');
            res.body[0].should.have.property('authorName');
            done();
        });
    });

    it('should add an author on /author PUT', function(done){
        chai.request(server)
        .post('/author')
        .send({'authorId': 5, 'authorName': 'Test Name'})
        .end(function(err,res){
            res.should.have.status(201);
            res.should.be.json;
            res.body.should.be.a('object');
            res.body.should.have.property('SUCCESS');
            res.body.SUCCESS.should.have.property('authorId');
            res.body.SUCCESS.should.have.property('authorName');
            res.body.SUCCESS.authorId.should.equal(5);
            res.body.SUCCESS.authorName.should.equal('Test Name');
            done();
        });
    });

    it('should update an author on /author/:id POST', function(done){ 
        chai.request(server)
        .get('/author')
        .end(function(err, res){
            chai.request(server)
            .put('/author/'+res.body[2].authorId)
            .send({'authorName': 'New Name'})
            .end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('UPDATED');
                res.body.UPDATED.should.be.a('object');
                res.body.UPDATED.should.have.property('authorId');
                res.body.UPDATED.should.have.property('authorName');
                res.body.UPDATED.authorName.should.equal('New Name');
                done();
            });
        });
    });

    it('should delete an author on /author/:id DELETE', function(done){
        chai.request(server)
        .get('/author')
        .end(function(err, res){
            chai.request(server)
            .delete('/author/'+res.body[2].authorId)
            .end(function(err, res){
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('REMOVED');
                res.body.REMOVED.should.equal('5');
                done();
            });
        });
    });
});