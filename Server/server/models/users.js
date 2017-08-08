import bcrypt from 'bcrypt';

export default (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    userName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    hooks: {
      beforeCreate: (Users) => {
        const salt = bcrypt.genSaltSync(9);
        Users.password = bcrypt.hashSync(Users.password, salt);
      }
    }
  },
  {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        Users.hasMany(models.Books, {
          foreignKey: 'usersId',
          as: 'books',
        });
        Users.hasMany(models.RentedBooks, {
          foreignKey: 'usersId',
          as: 'rentedbooks',
        });
      },
    },
  });
  return Users;
};
