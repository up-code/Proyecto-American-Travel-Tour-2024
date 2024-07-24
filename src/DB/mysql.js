var mysql = require('mysql');
const config = require('../config');
const { error } = require('../red/responses');


const dbConfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
    insecureAuth : true
}

let connection;

const conectionMySql = () => {
    connection = mysql.createConnection(dbConfig);

    connection.connect((err => {
        if(err){
            console.log('[DB Error]: ', err);
            setTimeout(conectionMySql, 200);
        }else{
            console.log('Conectado a BD');
        }
    }));

    connection.on('error', err => {
        console.log('[DB Error]: ', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST'){
            conectionMySql();
        }else{
            throw err;
        }
    })
}

conectionMySql();

const all = (table) =>{
return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM ${table}`, (error, result)=>{
        return error ? reject(error) : resolve(result);
    });
});
}

const getById = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE Id = ${id}`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}

const create = (table, data) => {
    return new Promise((resolve, reject) => {
             connection.query(`INSERT INTO ${table} SET ? ON DUPLICATE KEY UPDATE ?`, [data, data], (err, result) => {
             return err ? reject(err) : resolve(result);
            });
        });
}

const delet = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`DELETE FROM ${table} WHERE Id = ${data.Id}`, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });

}

const query = (table, qry) =>{
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE ?`, qry, (error, result)=>{
            return error ? reject(error) : resolve(result);
        });
    });
}


module.exports = {
    all,
    getById,
    create,
    delet,
    query
}