'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(res, req){
    res.status(200).send({message: 'Song controller'});
}

module.exports = {
    getSong
};