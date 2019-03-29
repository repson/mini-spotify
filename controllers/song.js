'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');

var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getSong(res, req){
    var songId = req.params.id;

    Song.findById(songId).populate({path: 'album'}).exec((err, song) => {
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!song){
                res.status(404).send({message: 'The song does not exist'});
            }else{
                res.status(200).send({song});
            }
        }
    })
    res.status(200).send({message: 'Song controller'});
}

function saveSong(res, req){
    var song = new Song();

    var params = req.body;
    song.number = params.number;
    song.name = params.name;
    song.duration = params.duration;
    song.file = null;
    song.album = params.album;

    song.save((err, songStored) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!songStored){
                res.status(404).send({message: 'Song has not been saved'})
            }else{
                res.status(200).send({song: songStored});
            }

        }
    });
}

module.exports = {
    getSong,
    saveSong,
    getSong
};