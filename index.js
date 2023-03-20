//! Servidor REST
// console.log('Hola Mundo');

//* Importaciones en NODE con el require():
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/config');


//* Crear el servidor de Express:
const app = express();

// * Configurar CORS: 
//*  => 'use' es un middleware que no es más que una función que se ejecutará para el resto de lineas de abajo:
app.use( cors() ); 

//* Conexión a la base de datos:
dbConnection(); 
// console.log( process.env.PORT );

//* Usuario/Password de MongoDB:
    //?   blbVT1v9fBL47XqE
    //?  franmomo72

//* Rutas:
app.get('/', (req, res) => {

    //* Las API RES siempre se responderán en formato JSON y normalmente se retornan objetos:
    // res.status().json({
    res.json({
        ok:  true,
        msg: 'Hola Mundo'
    });

});


//* Para levantar el servidor de Express, escuchamos el puerto y el callback se ejecutará cuando 
//* el puerto esté levantado:
// app.listen( 3000, () => {
app.listen( process.env.PORT, () => {
    console.log('Servidor levantado y corriendo en el puerto ' + process.env.PORT);
});

