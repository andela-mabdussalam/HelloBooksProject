import db from '../models';

const { Books } = db;
const { RentedBooks } = db;

const booksController = {
  // User can add books
  create(req, res) {
    return Books
      .create({
        title: req.body.title,
        author: req.body.author,
        category: req.body.category,
      })
      .then(books => res.status(201).send(books))
      .catch(error => res.status(400).send(error));
  },
  list(req, res) {
    return Books
      .findAll({})
      .then((books) => {
        if (books.length === 0) {
          res.status(200).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  },
  update(req, res) {
    return Books
      .findById(req.params.booksId)
      .then((books) => {
        if (!books) {
          return res.status(404).send({
            message: 'Book Not Found',
          });
        }
        books.update({
          title: req.body.title,
          author: req.body.author,
          category: req.body.category,
        })
          .then(() => res.status(200).send(books)) // Send back the updated books.
          .catch(error => res.status(400).send(error));
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  },
  borrow(req, res) {
    const cur = new Date();
    const after24Days = cur.setDate(cur.getDate() + 24);
    return RentedBooks
      .create({
        title: req.body.title,
        usersId: req.params.usersId,
        booksId: req.body.booksId,
        toReturnDate: after24Days,
      })
      .then(books => res.status(200).send('Successfully Borrowed '.concat(req.body.title)))
      .catch((error) => {
        res.status(404).send(error);
      });
  },
  listNotReturnedBooks(req, res) {
    return RentedBooks
      .findOne({
        where: {
          returned: false,
          usersId: req.params.usersId
        }
      })
      .then((books) => {
        if (books.length === 0) {
          res.status(200).send('No books in the library');
        }
        res.status(200).send(books);
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  },
  returnBooks(req, res) {
    return RentedBooks
      .update({
        returned: true,
        returnDate: Date.now(),
        usersId: req.params.usersId
      },
      {
        where: {
          booksId: req.params.booksId
        }
      })
      .then(books => res.status(200).send('Successfully Returned'))
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  },
};
export default booksController;
