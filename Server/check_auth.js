let cfg = require('./config.json')
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.trim();

        if(!token){
            return res.status(401).json({message: "Authentication failed"}); 
        }

        const decodedtok = jwt.verify(token, cfg.auth.jwt_key);

        req.userData = decodedtok;
        next();

    }catch(e){
        console.error('Authentication failed: ', e);
        return res.status(401).json({error: 'Authentication failed'});
    }
};