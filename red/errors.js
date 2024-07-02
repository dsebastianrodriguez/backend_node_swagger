const response = require('./respuestas')

function errors(err, req, res, next){
    console.log('[error]', err);

    const messagge = err.messagge || 'Internal error';
    const status = err.statusCode || 500;

    response.error(req, res, messagge, status);
}


module.exports = errors;