const express = require('express');
const bodyParser = require('body-parser');

const sequelize = require('./db.js');
const Book = require('./models/book.js');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function(){
    console.log('Server is listening on port 3000');
});


app.get('/', (req, res) => {
  res.render('home');
});



app.get('/books', (req, res) => {
    Book.findAll().then(books => res.render('index', {books: books}));
  });
  

app.get('/books/:id', (req, res) => {

  const id = req.params.id;

  if (!id) {
    console.log("id vacia")
    res.redirect('/');
    return;
  }


  Book.findOne({ where: { isbn: req.params.id } })
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
    isbn: req.body.isbn,
    published_date: req.body.published_date,
    }).then(book => res.render('home', {book: book}));
});

app.post('/books/:id', (req, res) => {
  const { title, author, published_date} = req.body;
  const isbn = req.params.id;

  Book.findOne({ where: { isbn: isbn } })
    .then(book => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        book.update({
          title: title,
          author: author,
          published_date: published_date,
        }).then(res.redirect('/books/'));
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal server error');
    });
});


//Se podria arreglar esto si, que nos dio progeria xdddd
app.get('/booksdelete/:id', (req, res) => {
  const isbn = req.params.id;

  Book.findOne({ where: { isbn: isbn } })
    .then(book => {
      if (!book) {
        res.status(404).send('Book not found');
      } else {
        book.destroy().then(() => {res.redirect('/books/')});
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
        title: {
          [Sequelize.Op.like]: '%' + req.params.keyword + '%'
        }
      }
    }).then(books => res.render('index', {books: books}));
  });

app.set('view engine', 'ejs');
