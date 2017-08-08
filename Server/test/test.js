import chai from 'chai';

import chaiHttp from 'chai-http';

import models from '../server/models';

import app from '../app';

let Users = models.Users;

let Books = models.Books;

const should = chai.should();

chai.use(chaiHttp);

describe('Users', () => {
  it('should let users sign up /signup POST', (done) => {
    Users = {
      userName: 'Moyo',
      email: 'moyo',
      password: 'moyo',
    };
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(201);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('userName');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.userName.should.equal('Moyo');
        // res.body.password.should.equal('moyo');
        res.body.email.should.equal('moyo');
        done();
      });
  });
  it('should let users sign in /signin POST', (done) => {
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(Users)
      .end((err, res) => {
        console.log(res);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.not.be.empty;
        res.body.should.have.property('userName');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.userName.should.equal('Moyo');
        res.body.password.should.equal('moyo');
        done();
      });
  });
});


describe('Books', () => {
  before(() => {
    Books.sync();
  });

  beforeEach(() => {
    const testObject = {
      title: 'firstname',
      author: 'uu.dd@gmail.com',
      category: 'de',
    };
    Books.create(testObject);
  });

  // afterEach(() => {
  //   Books.truncate();
  // });

  // after(() => {
  //   Books.drop();
  // });
  describe('/GET book', () => {
    it('should list ALL books on /books GET', (done) => {
      chai.request(app)
        .get('/api/v1/users/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          res.body[0].should.have.property('title');
          res.body[0].should.have.property('author');
          res.body[0].should.have.property('category');
          done();
        });
    });
  });
  describe('/POST Books', () => {
    it('should post ALL books on /books POST', (done) => {
      Books = {
        title: 'Bat',
        author: 'man',
        category: 'fictional'
      };
      chai.request(app)
        .post('/api/v1/users/books')
        .send(Books)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('category');
          done();
        });
    });
  });
  describe('/GET/:id borrowed books', () => {
    it('it should GET a borrowedbook by the given id', (done) => {
      Books = new Books({ title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', category: 'fiction' });
      Books.save((err, book) => {
        chai.request(app)
          .get('/api/v1/books/:booksId')
          .send(book)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('title');
            res.body.should.have.property('author');
            res.body.should.have.property('category');
            res.body.should.have.property('_id').eql(Books.id);
            done();
          });
      });
    });
  });
});
