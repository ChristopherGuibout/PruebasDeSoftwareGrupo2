const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

app.use(express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(methodOverride('_method'));

// Configurar motor de plantillas
app.set('view engine', 'ejs');

// Usar rutas
app.use('/', routes);

// Iniciar servidor
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});