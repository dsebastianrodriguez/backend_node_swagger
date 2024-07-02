function error (messagge, code){
    let e = new Error(messagge);

    if(code){
        e.statusCode = code;
    }

    return e;
}

module.exports = error;