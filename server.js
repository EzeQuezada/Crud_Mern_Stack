const express = require('express');
const app = express();

//Importar conexion a la base de datos
const archivoBD = require('./conexion');

//Importacion del archivo de rutas
const rutaUsuario = require('./rutas/usuario');

//Configurar el body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api/usuario", rutaUsuario);

app.get('/', (req, res) => {
    res.end('Hola Mundo');
});
//Configurar server basico
app.listen(5500, () => {
    console.log('Servidor corriendo en el puerto 5500');
});