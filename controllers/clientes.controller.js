const db = require('../database/mysql');
const bcrypt = require('bcrypt');

const TABLA = 'cliente';


module.exports = function(databaseInjection){

    let db = databaseInjection;

    if(!db){
        db = require('../database/mysql');
    }

    function getAll(){
        return db.getAll(TABLA);
    }
    
    function getOne(id){
        return db.getOne(TABLA, id);
    }
    
    async function create(body){
        body.password = await bcrypt.hash(body.password.toString(), 5);
        return db.create(TABLA,body);
    }
    
    function update(id, body){
        return db.update(TABLA, id, body);
    }
    
    function deploy(id){
        return db.deploy(TABLA, id);
    }
    
    return {
        getAll,
        getOne,
        deploy,
        create,
        update
    }

    
}