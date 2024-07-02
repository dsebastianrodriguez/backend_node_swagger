exports.success = function (req, res, messagge = '', status = 200){
    res.status(status).send({
        error: false,
        status: status,
        body: messagge
    })
};

exports.error = function (req, res, messagge = 'Internal Error', status = 500){
    res.status(status).send({
        error: true,
        status: status,
        body: messagge
    })
};