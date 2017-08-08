
export default (sequelize, DataTypes) => {
  const RentedBooks = sequelize.define('RentedBooks', {
    booksId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    returned: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    toReturnDate: DataTypes.DATE,
    returnDate: DataTypes.DATE,
    usersId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        RentedBooks.belongsTo(models.Books, {
          foreignKey: 'booksId',
          onDelete: 'CASCADE',
        });
        RentedBooks.belongsTo(models.Users, {
          foreignKey: 'usersId',
          onDelete: 'CASCADE',
        });
      }
    }
  });
  return RentedBooks;
};
