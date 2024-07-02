const db = require('../database/mysql');

const ctrl = require('../controllers/productos.controller')

module.exports = ctrl(db);