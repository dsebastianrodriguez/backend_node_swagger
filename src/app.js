const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const clientes = require('../routes/clientes.route');
const productos = require('../routes/productos.route');
const error = require('../red/errors');

const app = express();

//Configuration
app.set('port', config.app.port)

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true}));


app.use('/api/clientes',clientes);
app.use('/api/productos',productos);
app.use(error);



module.exports = app;