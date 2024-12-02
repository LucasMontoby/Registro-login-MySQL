const sequelize = require('./config/database');

sequelize.authenticate()
.then(() => console.log('Connected to database'))
.catch(error => console.error('Error al concetar la base', error))