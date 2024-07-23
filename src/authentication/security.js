const auth = require('./index');

module.exports = security = () => {
    const middleware = (req, res, next) =>{
        auth.checkToken.confirmToken(req);
        next();
    }

    return middleware;
}