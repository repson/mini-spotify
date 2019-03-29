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
    });
    res.status(200).send({message: 'Song controller'});
}

function getSongs(req, res){
    var albumId = req.params.album;

    if(!album){
        var find = Song.find({}).sort('number');
    }else{
        var find = Song.find({album: albumId}).sort('number');
    }

    find.populate({
        path: 'album',
        populate: {
            path: 'artist',
            model: 'Artist'
        }
    }).exec(function(err, songs){
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!song){
                res.status(404).send({message: 'There are not songs'});
            }else{
                res.status(200).send({songs});
            }
        }
    });
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

function updateSong(req, res){
    var songId = req.params.id;
    var update = req.body;

    Song.findByIdAndUpdate(songId, update, (err, songUpdate) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!songUpdated){
                res.status(404).send({message: 'Song has not been updated'})
            }else{
                res.status(200).send({song: songUpdated});
            }
        }
    });
}

function deleteSong(req, res){
    var songId = req.params.id;
    Song.findByIdAndRemove(songId, (err, songRemoved) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!songUpdated){
                res.status(404).send({message: 'Song has not been removed'})
            }else{
                res.status(200).send({song: songRemoved});
            }
        }
    });
}

function uploadFile(req, res){
    var songId = req.params.id;
    var file_name = 'Not uploaded';

    if(req.files){
        var file_path = req.files.file.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'mp3' || file_ext == 'ogg'){

            Song.findByIdAndUpdate(songId, {file: file_name}, (err, songUpdated) => {
                if(!songUpdated){
                    res.status(404).send({message: 'Cannot update the song'});
                }else{
                    res.status(200).send({song: songUpdated});
                }
            });
        }else{
            res.status(404).send({message: 'Incorrect file extension'});
        }
    }else{
        res.status(404).send({message: 'Image missed'});
    }
}

function getSongFile(req, res){
    var imageFile = req.params.songFile;
    var path_file = './uploads/songs /'+imageFile;

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'Audio file missed'});
        }
    });
}

module.exports = {
    getSong,
    getSongs,
    saveSong,
    updateSong,
    deleteSong,
    uploadFile,
    getSongFile
};