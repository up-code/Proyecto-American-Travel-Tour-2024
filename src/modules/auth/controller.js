
const TABLE = 'auth';
const bcrypt = require('bcrypt');
const auth = require('../../authentication');
module.exports = (dbInyected) => {

    let db = dbInyected;

    if(!db){
        db = require('../../DB/mysql');
    }

  
    
    const create = async (body) => {
              
        const authData = {
            Id: body.Id
        }

        if(body.usuario){
            authData.usuario = body.usuario;
        }
        if(body.password){
            authData.password = await bcrypt.hash(body.password.toString(), 5);
        }


        return db.create(TABLE, authData);
    }

    const login = async (usuario, password) =>{
        const data = await db.query(TABLE, {usuario: usuario});

        return bcrypt.compare(password, data.password)
        .then(result =>{
            if(result === true){
                    // generate Token
                    return  auth.addToken({...data})
            }else{
                // return error
                throw new Error('Información Invalida');
            }
        })
    }

    return {
        create,
        login        
    }
}