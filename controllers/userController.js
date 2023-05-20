const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
var models = require('../models');
var User = models.User;

// Controlador para el registro de un nuevo usuario
async function registerUser(req, res) {
    try {
      const { name, password, email } = req.body;
  
      // Verificar si el usuario ya existe en la base de datos
      const existingUser = await User.findOne({ where: { name } });
      if (existingUser) {
        return res.render('register', { error: 'El nombre de usuario ya está en uso' });
      }
  
      // Generar el hash de la contraseña antes de almacenarla en la base de datos
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Crear el nuevo usuario en la base de datos
      const newUser = await User.create({
        name,
        password: hashedPassword,
        email,
        role: 'estudiante',
      });
  
      //res.status(201).json(newUser);
      res.render('login', {error: 'Usuario registrado correctamente'});

    } catch (error) {
      console.error(error);
      console.log("Error")
      res.render('register', { error: 'Ha ocurrido un error en el servidor' });
    }
  }

// Controlador para iniciar sesión y generar un token de autenticación
async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    // Buscar al usuario en la base de datos
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar la contraseña ingresada con el hash almacenado
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar el token de autenticación con el rol del usuario
    const token = jwt.sign({ name: user.name, role: user.role }, 'secretKey');
    res.cookie('token', token, { httpOnly: true })

    res.render('home');

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ha ocurrido un error en el servidor' });
  }
}

const showLoginForm = (req, res) => {
    const error = '';
    res.render('login', { error });
};

function showRegistrationPage(req, res) {
    const error = ''; // Obtener el valor de la variable "error" de la query
    res.render('register', { error }); // Pasar la variable "error" al renderizar la vista
  }

module.exports = { 
    registerUser, 
    loginUser,
    showLoginForm,
    showRegistrationPage
};