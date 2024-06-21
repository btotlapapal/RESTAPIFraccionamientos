const express = require('express');  //express es un framework de nodejs para hacer apis REST
const bodyParser = require('body-parser'); //body-parser es un middleware de express para parsear el cuerpo de las peticiones
const cors = require('cors'); //cors es un middleware de express para permitir peticiones de otros dominios

const jwt = require('jsonwebtoken'); //jsonwebtoken es un modulo para crear y verificar tokens
const bcrypt = require('bcryptjs');  //bcryptjs es un modulo para encriptar contraseñas
const mongoose = require('mongoose'); //mongoose es un mondulo para conectarse a una base de datos mongodb
const dotenv = require('dotenv'); //dotenv es un modulo para cargar variables de entorno desde un archivo .env

dotenv.config({path:'./config.env'});

// AQUI VAN MIS RUTAS
const userRoutes = require('./routes/userRoutes');

const app = express(); //app es una instancia de express
app.use(cors()); //permitir peticiones de otros dominios

app.use(express.json({limit:'50mb'})); //parsear el cuerpo de las peticiones con formato json
app.use(express.static(`${__dirname}/public`));

app.set('jwtkey','sd#asdv0%'); //clave secreta para firmar nuestros tokens



const port = 3001;//puerto en el que va a correr el servidor

app.use('/api/users',userRoutes);

//conectar a la base de datos
const DB = process.env.DATABASE;

mongoose.connect(DB,{
    usenewUrlParser:true
}).then(connection=>{
    console.log('Conectado a la base de datos');
})

app.listen(port,()=>{
    console.log(`Servidor corriendo en http:localhost:${port}`);
})