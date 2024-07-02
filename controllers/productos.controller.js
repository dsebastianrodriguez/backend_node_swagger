const db = require('../database/mysql');

const TABLA = 'producto';


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
    
    function create(body){
        return db.create(TABLA,body);
    }
    
    function update(body){
        return db.update(TABLA,body);
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