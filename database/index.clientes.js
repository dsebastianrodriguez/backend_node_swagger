const db = require('./mysql');

const ctrl = require('../controllers/clientes.controller')

module.exports = ctrl(db);