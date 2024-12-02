const { Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('mysql://root:@localhost:3306/usuarios');

const Usuario = sequelize.define('Usuario',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
        },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
        },
        correo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            },
            contraseña: {
                type: DataTypes.STRING,
                allowNull: false
            }
},{
    tableName: 'usuarios',
    timestamps: false
});

module.exports = Usuario;