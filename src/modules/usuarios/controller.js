const auth = require('../auth');
const TABLE = 'usuarios';

module.exports = function (dbInyected) {

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
    
    const delet = (body) => {
        return db.delet(TABLE,body);
    }
    
    const create = async (body) => {
        const usuario = {
            Id: body.Id,
            nombre: body.nombre,
            activo: body.activo
        }
        const response = await db.create(TABLE, usuario);
        
        var insertId = 0;
        if(body.Id == 0){
            insertId = response.insertId
        }else{
            insertId = body.Id;
        }
        var result = '';
        if(body.usuario || body.password){
           result = await auth.create({
                Id: insertId,
                usuario: body.usuario,
                password: body.password
            })
        }

        return result;
    }

    return {
        getAll,
        getById,
        create,
        delet
    }
}