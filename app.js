const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const rutasUsuarios = require('./routes/routerUsuario');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'claveSecreta123',
    resave: false,
    saveUninitialized: false
}));

// Redirigir al formulario de registro al inicio
app.get('/', (req, res) => {
    res.redirect('/usuarios/registro');
});

app.use('/usuarios', rutasUsuarios);

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto 3000`);
});
