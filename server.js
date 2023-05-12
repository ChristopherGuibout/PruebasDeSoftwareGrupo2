const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./db.js');
const Book = require('./models/book.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});

app.get('/', (req, res) => {
  res.render('home');
});

function getBooks() {
  return Book.findAll();
}


function getBook(idd) {
  return Book.findOne({ where: { id: idd } });
}




app.get('/books/data', (req, res) => {
    getBooks().then(books => res.json(books));
  });

  app.get('/books', (req, res) => {
    getBooks().then(Books => {res.render('index', {Books: Books});});
  });

  app.get('/books/data/:id', (req, res) => {

  const id = req.params.id;

  if (!id) {
    console.log("id vacia")
    res.redirect('/');
    return;
  }

  getBook(id)
    .then(book => {
      if (book) {
        
        res.render('indexsearch', {book: book});
      } else {
        res.redirect('/');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});
  

app.get('/books/:id', (req, res) => {

  const id = req.params.id;

  if (!id) {
    console.log("id vacia")
    res.redirect('/');
    return;
  }


  getBook(id)
    .then(book => {
      if (book) {
        
        res.render('indexsearch', {book: book});
      } else {
        res.redirect('/');
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});


app.post('/books', (req, res) => {
    Book.create({
    title: req.body.title,
    author: req.body.author,
    published_date: req.body.published_date,
    state: req.body.state,
    avail: req.body.avail
    }).then(book => res.render('home', {book: book}));
});

//PUT
app.put('/books/:id', (req, res) => {
  var id = req.params.id;
  getBook(id).then(book => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        book.update({
          title: req.body.title,
          author: req.body.author,
          published_date: req.body.published_date,
          state: req.body.state,
          avail: req.body.avail,
        }).then(res.json(book));
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});


//Se podria arreglar esto si, que nos dio progeria xdddd
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  Book.findOne({ where: { id: id } })
    .then(book => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        book.destroy().then(() => {res.json(book)});
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});

app.get('/books/search/:keyword', (req, res) => {
    Book.findAll({
      where: {
        where: { name: req.params.name }
      }
    }).then(books => res.render('index', {books: books}));
  });

app.set('view engine', 'ejs');

app.get('/booksdelete/:id', (req, res) => {
  const id = req.params.id;

  Book.findOne({ where: { id: id } })
    .then(book => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        book.destroy().then(() => res.render('home', {book: book}));
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});