const mysql = require('mysql');
const config = require('../src/config');


const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
} 

let connection;

function connectionMySQL(){
    connection = mysql.createConnection(dbconfig);

    connection.connect((err) => {
        if(err){
            console.log('[db err]', err);
            setTimeout(connectionMySQL, 200);
        }else{
            console.log('Database connection!!');
        }
    });

    connection.on('error', err => {
        console.log('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            connectionMySQL();
        }else{
            throw err;
        }
    });
}

connectionMySQL();


function getAll(table){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    })
}

function getOne(table, id){
    return new Promise((resolve, reject) =>{
        connection.query(`SELECT * FROM ${table} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    })
}

function update(table, id, data){
    return new Promise((resolve, reject) =>{
        connection.query(`UPDATE ${table} SET ? WHERE id = ${id}`,[data], (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    })
}

// function insertar(table, data){
//     return new Promise((resolve, reject) =>{
//         connection.query(`INSERT INTO ${table} SET ?`,data, (error, result) => {
//             return error ? reject(error) : resolve(result);
//         });
//     })
// }

// function actualizar(table,data){
//     return new Promise((resolve, reject) =>{
//         connection.query(`UPDATE ${table} SET ?`,data, (error, result) => {
//             return error ? reject(error) : resolve(result);
//         });
//     })
// }

function create(table, data){
    // if(data && data.id == 0){
    //     return insertar(tabla, data);
    // }else{
    //     return actualizar(tabla, data);
    // }

    return new Promise((resolve, reject) =>{
        connection.query(`INSERT INTO ${table} SET ?`,data, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    })

}

function deploy(table, id){
    return new Promise((resolve, reject) =>{
        connection.query(`DELETE FROM ${table} WHERE id = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result);
        });
    })
}

module.exports = {
    getAll, getOne, update, create, deploy
}