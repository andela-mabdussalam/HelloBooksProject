import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../server/models';
import app from '../app';

const should = chai.should();
let Users = models.Users;
let Books = models.Books;

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
    Users = {
      userName: 'Moyo',
      password: 'moyo',
    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        // res.body.should.be.a('object');
        res.body.should.not.be.empty;
        res.body.should.have.property('message').equal('Successfully logged in');
        res.body.should.have.property('userName').equal('Moyo');
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
      title: 'Bloodline',
      author: 'Sidney Sheldon',
      category: 'uucd.dd@gmail.com',
    };
    Books.create(testObject);
  });
  describe('/POST book', () => {
    it('should list ALL books on /books GET', (done) => {
      chai.request(app)
        .get('/api/v1/users/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('array');
          done();
        });
    });
  });
  describe('/POST book', () => {
    it('should add books on /books POST', (done) => {
      Books = {
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        category: 'Fiction',
      };
      chai.request(app)
        .post('/api/v1/users/books')
        .send(Books)
        .end((err, res) => {
          res.should.have.status(201);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title');
          res.body.should.have.property('author');
          res.body.should.have.property('category');
          res.body.title.should.equal('The Lord of the Rings');
          res.body.author.should.equal('J.R.R. Tolkien');
          res.body.category.should.equal('Fiction');
          done();
        });
    });
  });
  describe('/PUT/:id book', () => {
    it('should add books on /books PUT', (done) => {
      let book = new Books ({
        title: 'The Lord of the Rings',
        author: 'J.R.R. Tolkien',
        category: 'Fiction',
      });
      book.save((err, book) => {
        chai.request(app)
          .post('/api/v1/books/:booksId')
          .send({ title: 'The Chronicles of Narnia', author: 'C.S. Lewis', category: 'Sci-Fi' })
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.eql('Books Updated!');
            res.body.book.should.have.property('category').eql('Sci-Fi');
            done();
          });
      });
    });
  });
});
