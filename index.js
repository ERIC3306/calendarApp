//Instalar npm i nodemon -g desde la terminal como administrador
//En los script aniadir lo siguiente 
//"scripts": {
//    "dev": "nodemon index.js",
//    "start": "node index.js"
//  },
//npm star para ejecutar en produccion          npm run dev para ejecutar en desarrollo
//PARA UNA CAPA DE MAYOR SEGURIDAD INSTALAR npm install cors


//Configuracion de express
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

// Crear el servidor de express
const app = express();

// Base de datos
dbConnection();

// CORS
app.use(cors())

// Directorio Público
app.use( express.static('public') );

// Lectura y parseo del body
app.use( express.json() );

// Rutas
app.use('/api/auth', require('./routes/auth') );
app.use('/api/events', require('./routes/events') );

// TODO: CRUD: Eventos

// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
});






