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


// Fetch all books
app.get('/books', (req, res) => {
    Book.findAll().then(books => res.render('index', {books: books}));
  });
  

// Fetch single book
app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => res.json(book));
});

// Create new book
app.post('/books', (req, res) => {
    Book.create({
    title: req.body.title,
    author: req.body.author,
    isbn: req.body.isbn,
    published_date: req.body.published_date,
    // other fields...
    }).then(book => res.json(book));
});

// Update a book
app.put('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
    book.update({
        title: req.body.title,
        author: req.body.author,
        isbn: req.body.isbn,
        published_date: req.body.published_date,
        // other fields...
    }).then(book => res.json(book));
    });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then(book => {
    book.destroy().then(() => res.json({status: "Book deleted successfully!"}));
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
