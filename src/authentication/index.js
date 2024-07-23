
const jwt = require('jsonwebtoken');
const config = require('../config');
const error = require('../Middleware/errors');

const secret = config.jwt.secret;
const addToken = (data)=>{
    return jwt.sign(data, secret);
}

const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

const checkToken = {
    confirmToken: (req)=>{
        const decode = decodeHeader(req);
    }
}

const getToken = (authorization) => {
   if(!authorization){
    throw error("Don't have Token", 401);
   }

   if(authorization.indexOf('Bearer') === -1){
        throw error('Invalid Format!', 401);
   }

   let token = authorization.replace('Bearer ', '');
   return token;
}

const decodeHeader = (req) => {
   const authorization = req.headers.authorization || '';
   const token = getToken(authorization);
   const decoded = verifyToken(token);

   req.user = decoded;

   return decoded;
}


module.exports = {
    addToken,
    checkToken
}