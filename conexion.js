const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/test');

const objetobd = mongoose.connection;

objetobd.on('connected', () => {console.log('Conectado a MongoDB')});
objetobd.on('error', console.error.bind(console, 'Error de conexion'));

module.exports = mongoose;