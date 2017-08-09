import bcrypt from 'bcrypt';

import jwt from 'jsonwebtoken';

import models from '../models';

import app from '../../app';

const Users = models.Users;
const usersController = {
  create(req, res) {
    return Users
      .create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(400).send(error));
  },
  login(req, res) {
    return Users
      .findOne({
        where: {
          userName: req.body.userName,
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'User Not Found',
          });
        }
        else if (bcrypt.compareSync(req.body.password, user.password)) {
          // Token
          const token = jwt.sign({ user }, app.get('secret'), {
            expiresIn: 60 * 60 * 24
          });
          return res.status(200).send({
            message: 'Successfully logged in',
            userName: user.userName,
            userToken: token
          });
        }
        res.status(401).send({ error: 'Password Incorrect' });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  }
};

export default usersController;

