
const TABLE = 'vuelos';

module.exports = (dbInyected) => {

    let db = dbInyected;

    if(!db){
        db = require('../../DB/mysql');
    }

    const getAll = () => {
        return db.all(TABLE)
    }
    
    const getById = (id) => {
        return db.getById(TABLE, id)
    }

    const getByIdPrograma = (id) => {
        return db.query(TABLE, {id_programa: id})
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
        delet,
        getByIdPrograma
    }
}