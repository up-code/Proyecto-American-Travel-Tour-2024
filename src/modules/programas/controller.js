
const TABLE = 'programas';

const imagen = require('../imagenes');
const incluye = require('../incluye');
const condiciones = require('../condiciones');
const actividades = require('../actividades');
const itinerarios = require('../itinerarios');
const valores_programas = require('../valores_programas');
const vuelos = require('../vuelos');

module.exports = (dbInyected) => {

    let db = dbInyected;

    if(!db){
        db = require('../../DB/mysql');
    }

    const getAll = () => {
        return db.all(TABLE)
    }
    
    const getById = async (id) => {
        
           var program = {
            Entity:{
                imagen:{},
            incluye:{},
            programa:{},
            condiciones:{},
            actividades:{},
            itinerarios:{},
            valores_programas:{},
            vuelos:{}
            }
           };
       
        // construir el programa y sus relaciones para devolver en 1 objeto  
        program.Entity.programa = await db.getById(TABLE, id);
        program.Entity.imagen = await imagen.getByIdPrograma(id);
        program.Entity.incluye = await incluye.getByIdPrograma(id);
        program.Entity.condiciones = await condiciones.getByIdPrograma(id);
        program.Entity.actividades = await actividades.getByIdPrograma(id);
        program.Entity.itinerarios = await itinerarios.getByIdPrograma(id);
        program.Entity.valores_programas = await valores_programas.getByIdPrograma(id);
        program.Entity.vuelos = await vuelos.getByIdPrograma(id);

        // retornamos el programa completo
        return  program;
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