import models from '../models';
// console.log('models', models.Users);

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
          password: req.body.password
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  }
};

export default usersController;

