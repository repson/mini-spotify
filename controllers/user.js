'use strict'

var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user');

function test(req, res){
    res.status(200).send({
        message: 'Testing action in user controller'
    });
}

function saveUser(req, res){
    var user = new User();

    var params = req.body;

    console.log(params);

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.role = 'ROLE_USER';
    user.image = 'null';

    if(params.password){
        // Encrypt password and save data
        bcrypt.hash(params.password, null, null, function(err, hash){
            user.password = hash;
            if(user.name != null && user.surname != null && user.email != null){
                // Save user
                user.save((err, userStored) => {
                    if(err){
                        res.status(500).send({message: 'Error saving the user'});
                    }else{
                        if(!userStored){
                            res.status(404).send({message: 'User is not registered'});
                        }else{
                            res.status(200).send({user: userStored});
                        }
                    }
                })
            }else{
                res.status(200).send({message: 'Enter all the fields'});
            }
        })
    }else{
        res.status(500).send({message: 'Enter the password'});
    }
}

function loginUser(req, res){
    var params = req.body;

    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err){
            res.status(500).send({message: 'Error in the request'});
        }else{
            if(!user){
                res.status(404).send({message: "The user does not exist"});
            }else{
                // Check the password
                bcrypt.compare(password, user.password, function(err, check){
                    if(check){
                        // Returns user data
                        if(params.gethash){
                            //returns jwt token
                        }else{
                            res.status(200).send({user});
                        }
                    }else{
                        res.status(404).send({message: "The user could not log in"});
                    }
                });
            }
        }
    });
}

module.exports = {
    test,
    saveUser,
    loginUser
};