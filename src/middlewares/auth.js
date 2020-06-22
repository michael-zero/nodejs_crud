const auth = require('../config/auth');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


module.exports = {
   async auth(req, res, next) {
        const authHeader = req.headers.authorization;

        if(!authHeader){
            return res.json({error: 'Token não fornecido'})
        }

        const [, token] = authHeader.split(' ');

        try {
            const decoded = await promisify(jwt.verify)(token, auth.secret);
            
            req.userId = decoded.id;
            return next();

        } catch (error) {
            return res.json({error: 'Token inválido'})
        }
        

        
    }
}