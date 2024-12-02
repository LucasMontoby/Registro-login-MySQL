const bcrypt = require('bcrypt');

const Usuario = require('../models/usuario');

const usuarioControlador = {
    // Mostrar formulario de registro
    mostrarRegistro: (req, res) => {
        res.render('registro');
    },

    // Procesar el registro
    procesarRegistro: async (req, res) => {
        const { nombre, correo, contraseña } = req.body;
        try {
            console.log('Datos recibidos:', { nombre, correo, contraseña });
    
            const usuarioExistente = await Usuario.findOne({ where: { correo } });
            if (usuarioExistente) {
                console.log('Usuario ya registrado:', correo);
                return res.status(400).send('El correo ya está registrado.');
            }
    
            console.log('Creando usuario...');
            const contraseñaEncriptada = await bcrypt.hash(contraseña, 10);
            await Usuario.create({
                nombre,
                correo,
                contraseña: contraseñaEncriptada,
            });
    
            console.log('Usuario creado con éxito');
            res.redirect('/usuarios/login');
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).send(`Error al registrar usuario: ${error.message}`);
        }
        
    },
    

    // Procesar el login
    procesarLogin: async (req, res) => {
        const { correo, contraseña } = req.body;
        try {
            const usuario = await Usuario.findOne({ where: { correo } });
            if (!usuario) {
                return res.status(400).send('Correo o contraseña incorrectos.');
            }

            const esValido = await bcrypt.compare(contraseña, usuario.contraseña);
            if (!esValido) {
                return res.status(400).send('Correo o contraseña incorrectos.');
            }

            req.session.usuarioId = usuario.id;
            res.redirect('/usuarios/home');
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            res.status(500).send('Error al iniciar sesión');
        }
    },
    
    mostrarLogin: (req, res) => {
        res.render('login'); // Asegúrate de que tienes una vista llamada "login.ejs"
    },
    

    // Mostrar la página home
    mostrarHome: (req, res) => {
        if (!req.session.usuarioId) {
            return res.redirect('/usuarios/login');
        }
        res.render('home');
    }
};

module.exports = usuarioControlador;
