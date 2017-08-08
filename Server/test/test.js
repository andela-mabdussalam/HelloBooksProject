const chai = require('chai');
const chaiHttp = require('chai-http');
let Users = require('../server/models').Users;
const app = require('../app');

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
      .post('/api/users/signup')
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
      .post('/api/users/signin')
      .send(Users)
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.html;
        res.body.should.equal('Welcome Moyo');
        res.body.should.not.be.empty;
        res.body.should.have.property('userName');
        res.body.should.have.property('email');
        res.body.should.have.property('password');
        res.body.userName.should.equal('Moyo');
        // res.body.password.should.equal('moyo');
        done();
      });
  });
});


describe('Books', () => {
  it('should list ALL books on /books GET', (done) => {
    chai.request(app)
      .get('/api/users/books')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        done();
      });
  });
});
