'use strict'

function test(req, res){
    res.status(200).send({
        message: 'Testing action in user controller'
    });
}

module.exports = {
    test
};