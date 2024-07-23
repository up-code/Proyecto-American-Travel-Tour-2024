
const TABLE = 'programas';

module.exports = (dbInyected) => {

    let db = dbInyected;

    if(!db){
        db = require('../../DB/mysql');
    }

    const getAll = () => {
        return db.all(TABLE)
    }
    
    const getById = (id) => {

        // construir el programa y sus relaciones para devolver en 1 objeto
        return db.getById(TABLE, id)
    }
    
    const delet = (body) => {
        return db.delet(TABLE,body);
    }
    
    const create = (body) => {
        return db.create(TABLE, body);
    }

    return {
        getAll,
        getById,
        create,
        delet
    }
}