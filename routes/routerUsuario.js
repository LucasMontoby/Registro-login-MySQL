const express = require('express');
const router = express.Router();
const usuarioControlador = require('../controllers/usuarioController');

router.get('/registro', usuarioControlador.mostrarRegistro);
router.post('/registro', usuarioControlador.procesarRegistro);

router.get('/login', usuarioControlador.mostrarLogin);
router.post('/login', usuarioControlador.procesarLogin);

router.get('/home', usuarioControlador.mostrarHome);

module.exports = router;