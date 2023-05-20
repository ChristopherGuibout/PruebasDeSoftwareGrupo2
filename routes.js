const express = require('express');
const router = express.Router();


// Importar controladores
const bookController = require('./controllers/bookController');
const userController = require('./controllers/userController');
const authMiddleware = require('./middleware/authMiddleware'); //Middleware

// Definir rutas
//Books

if(process.env.NODE_ENV !== 'test') {
  router.get('/index',authMiddleware.verifyToken, bookController.getHome);
  //router.get('/books/data', authMiddleware.verifyToken, bookController.getBooksData);

  router.get('/books',bookController.getAllBooks);

  router.get('/books/:id', bookController.getBookById);
  router.post('/books', authMiddleware.verifyToken, authMiddleware.requireRole('funcionario'), bookController.createBook);
  router.put('/books/:id', bookController.updateBook);
  router.delete('/books/:id', bookController.deleteBook);
  router.get('/books/search/:keyword', authMiddleware.verifyToken, bookController.searchBooks);

  //Login system
  router.post('/register', userController.registerUser);
  router.post('/login', userController.loginUser);
  router.get('/', userController.showLoginForm);
  router.get('/register', userController.showRegistrationPage); 
} 

else{
  router.get('/index', bookController.getHome);
  router.get('/books/data', bookController.getBooksData);

  router.get('/books',bookController.getAllBooks);

  router.get('/books/:id', bookController.getBookById);
  router.post('/books', authMiddleware.requireRole('funcionario'), bookController.createBook);
  router.put('/books/:id', bookController.updateBook);
  router.delete('/books/:id', bookController.deleteBook);
  router.get('/books/search/:keyword', bookController.searchBooks);

  //Login system
  router.post('/register', userController.registerUser);
  router.post('/login', userController.loginUser);
  router.get('/', userController.showLoginForm);
  router.get('/register', userController.showRegistrationPage);
}




/*router.get('/students', authMiddleware.verifyToken, authMiddleware.requireRole('estudiante'), (req, res) => {
  res.json({ message: 'Bienvenido, estudiante' });
});
router.get('/officials', authMiddleware.verifyToken, authMiddleware.requireRole('funcionario'), (req, res) => {
  res.json({ message: 'Bienvenido, funcionario' });
});
*/
module.exports = router;