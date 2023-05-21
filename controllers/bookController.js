// Obtener todos los libros
var models = require('../models'); // Cargar todos los modelos
var Book = models.Book;

function getHome(req, res) {
  res.render('home');
}

async function getAllBooks(req, res) {
    try {
      const Books = await Book.findAll();
      const userRole = req.user.role;
      //res.status(200).json(Books);
      
      if (userRole == 'funcionario'){
        res.render('index', { Books });
        //res.status(200).json(Books);
      }
      else if (userRole == 'estudiante'){
        res.render('index-student', { Books });
        //res.status(200).json(Books);
      }
      else{
        res.status(403).send('Acceso invalido');
      }
      
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred');
    }
  }

// Obtener los datos de todos los libros
async function getBooksData(req, res) {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

// Obtener un libro por su ID
async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findOne({ where: { id } });
    if (book) {
      res.render('indexsearch', { book });
      res.status(200).json(book);
    } else {
      res.redirect('/index');
      res.status(400);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

// Crear un nuevo libro
async function createBook(req, res) {
  try {
    const { title, author, published_date, state, avail } = req.body;
    const book = await Book.create({ title, author, published_date, state, avail });
    res.render('home', { book });
    //res.status(200).json(book);
  } catch (error) {
    console.error(error);
    //res.status(500).send('An error occurred');
    res.redirect('/index');
  }
}

// Actualizar un libro
async function updateBook(req, res) {
  try {
    const { id } = req.params;
    let { title, author, published_date, state, avail } = req.body;

    let book = await Book.findOne({ where: { id } });
    
    console.log(title);
    console.log(typeof published_date);
    console.log(author);

    if (!book) {
      res.status(404).send('Book not found');
      return;
    }
    
    if (title === undefined){
      title = book.title;
    }
    if (author === undefined){
      author = book.author;
    }

    if(published_date === undefined || published_date == ''){
      published_date= book.published_date;
    }

    if (state === undefined){
      state= book.state;
    }
    
    if (avail === undefined){
      avail = book.avail;
    }

    book.title = title;
    book.author = author;
    book.published_date = published_date;
    book.state = state;
    book.avail = avail;

    await book.save();
    res.render('home', { book });

    //res.status(200).json(book);

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

// Eliminar un libro
async function deleteBook(req, res) {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ where: { id } });
    if (!book) {
      res.status(404).send('Book not found');
      return;
    }

    await book.destroy();
    res.render('home', { book });
    //res.status(200).json(book);
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}

// Buscar libros por palabra clave
async function searchBooks(req, res) {
  try {
    const { keyword } = req.params;
    const books = await Book.findAll({
      where: {
        title: { [Op.like]: `%${keyword}%` }
      }
    });
    res.render('index', { books });
  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred');
  }
}
  
  module.exports = {
    getHome,
    getAllBooks,
    getBooksData,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    searchBooks
}