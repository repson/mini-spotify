'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3977;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/mini_spotify', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("Database connection is running ok...")

        app.listen(port, function(){
            console.log("API REST Server listening in http://localhost:" + port)
        });
    }
});