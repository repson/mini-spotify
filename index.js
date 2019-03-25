'use strict'

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mini_spotify', (err, res) => {
    if(err){
        throw err;
    }else{
        console.log("Database connection is running ok...")
    }
});