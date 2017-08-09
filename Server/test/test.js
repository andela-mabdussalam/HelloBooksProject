import chai from 'chai';
import chaiHttp from 'chai-http';
import models from '../server/models';
import app from '../app';

const should = chai.should();
let Users = models.Users;
let Books = models.Books;

chai.use(chaiHttp);

describe('Users', () => {
  Users = {
    userName: 'Moyo',
    email: 'moyo',
    password: 'moyo',
  };
  it('should let users sign up /signup POST', (done) => {
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
  // it('should let users sign in /signin POST', (done) => {
  //   chai.request(app)
  //     .post('/api/v1/users/signin')
  //     .send(Users)
  //     .end((err, res) => {
  //       console.log(res);
  //       res.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.not.be.empty;
  //       res.body.should.have.property('userName');
  //       res.body.should.have.property('email');
  //       res.body.should.have.property('password');
  //       res.body.userName.should.equal('Moyo');
  //       // res.body.password.should.equal('moyo');
  //       done();
  //     });
  // });
});


describe('Books', () => {
  // before((done) => {
  //   db.sequelize.sync({ force: true }) // drops table and re-creates it
  //     .success(() => {
  //       done(null);
  //     })
  //     .error((error) => {
  //       done(error);
  //     });
  // });

  Books = {
    title: 'The Lord of the Rings8',
    author: 'J.R.R. Tolkien',
    category: 'Fiction',
  };
  describe('/POST book', () => {
    it('should add books on /books POST', (done) => {
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
          res.body.title.should.equal('The Lord of the Rings8');
          res.body.author.should.equal('J.R.R. Tolkien');
          res.body.category.should.equal('Fiction');
          done();
        });
    });
  });
  describe('/GET book', () => {
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
  describe('/PUT/:id book', () => {
    it('should add books on /books PUT', (done) => {
      const testBook = {
        title: 'The Lord of the Rings8',
        author: 'J.R.R. Tolkien',
        category: 'Sci-fi'
      };
      chai.request(app)
        .put('/api/v1/books/1')
        .send(testBook)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message').equal('Books Updated!');
          done();
        });
    });
  });
  describe('/POST borrowed books', () => {
    it('should borrow books on :userId/books POST', (done) => {
      chai.request(app)
        .post('/api/v1/users/1/books')
        .send(Books)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('title').equal('The Lord of the Rings8');
          res.body.should.have.property('usersId').equal(1);
          res.body.should.have.property('booksId');
          res.body.should.have.property('toReturnDate');
          res.body.should.have.property('returned').equal(false);
          done();
        });
    });
  });
  describe('/GET borrowed books', () => {
    it('should borrow books on :userId/books GET', (done) => {
      chai.request(app)
        .get('/api/v1/users/1/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('booksId');
          res.body.should.have.property('returned').equal(false);
          done();
        });
    });
  });
  describe('/PUT borrowed books', () => {
    it('should borrow books on :userId/books PUT', (done) => {
      chai.request(app)
        .put('/api/v1/users/1/books')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('message').equal('Successfully Returned');
          done();
        });
    });
  });
});
