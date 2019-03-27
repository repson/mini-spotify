'use strict'

var jwt = require('jwt-simple');

var moment = require('moment');
var secret = 'temporal';

exports.ensureAuth = function(req, res, next){
    if(!req.headers.authorization){
        return res.status(403).send({message: 'Authentication header missed'});
    }

    var token = req.headers.authorization.replace(/['"]+/g, '');

    try{
        var payload = jwt.decode(token, secret);

        if(payload.exp <= moment().unix()){
            return res.status(401).send({message: 'Token has expired'});
        }
    }catch(ex){
        console.log(ex);
        return res.status(404).send({message: 'The token is not valid'});
    }

    req.user = payload;

    next();
};