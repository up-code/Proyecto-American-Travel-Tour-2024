require('dotenv').config();

module.exports = {
    app:{
        port: process.env.PORT,
    },
    mysql:{
        host: process.env.HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'america1_up_dbatt' 
    },
    jwt: {
      secret : process.env.JET_SECRET || 'secretnote'
    }
}