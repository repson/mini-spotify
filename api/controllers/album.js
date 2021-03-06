'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination');
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getAlbum(req, res){
    var albumId = req.params.id;

    Album.findById(albumId).populate({path: 'artist'}).exec((err, album) => {
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!album){
                res.status(404).send({message: 'The album does not exist'});
            }else{
                res.status(200).send({message: album});
            }
        }
    })

    res.status(200).send({message: 'getAlbum action'});
}

function getAlbums(req, res){
    var artistId = req.params.artist;

    if(!artistId){
        // Get all albums from db
        var find = Album.find({}).sort('title');
    }else{
        // Get artist albums from db
        var find = Album.find({artist: artistId}).sort('year');
    }

    find.populate({path: 'artist'}).exec((err, albums) => {
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!album){
                res.status(404).send({message: 'There is not albums'});
            }else{
                res.status(200).send({message: albums});
            }
        }
    });
}

function saveAlbum(req, res){
    var album = new Album();
    var params = req.body;

    album.title = params.title;
    album.description = params.description;
    album.year = params.year;
    album.image = 'null';
    album.artist = params.artist;

    album.save((err, albumStored) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!albumStored){
                res.status(404).send({message: 'The album has not been saved'});
            }else{
                res.status(200).send({message: albumStored});
            }
        }
    });
}

function updateAlbum(req, res){
    var albumId = req.params.id;
    var update = req.body;

    Album.findByIdAndUpdate(albumId, update, (err, albumUpdated) => {
        if(err){
            res.status(500).send({message: 'Server error'});
        }else{
            if(!albumUpdated){
                res.status(404).send({message: 'The album has not been udpated'});
            }else{
                res.status(200).send({album: albumUpdated});
            }
        }
    });
}

function deleteAlbum(req, res){
    var albumId = req.params.id;

    Album.findByIdAndRemove(albumId, (err, albumRemoved) => {
        if(err){
            res.status(500).send({message: 'Error deleting the album'});
        }else{
            if(!albumRemoved){
                res.status(404).send({message: 'The artist has not been deleted'});
            }else{
                Song.find({album: albumRemoved._id}).remove((err, songRemoved) => {
                    if(err){
                        res.status(500).send({messages: 'Error deleting the song'});
                    }else{
                        if(!songRemoved){
                            res.status(404).send({message: 'The song has not been deleted'});
                        }else{
                            res.status(200).send({album: albumRemoved});
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    var albumId = req.params.id;
    var file_name = 'Not uploaded';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Album.findByIdAndUpdate(albumId, {image: file_name}, (err, albumUpdated) => {
                if(!albumUpdated){
                    res.status(404).send({message: 'Cannot update the user'});
                }else{
                    res.status(200).send({album: albumUpdated});
                }
            });
        }else{
            res.status(404).send({message: 'Incorrect file extension'});
        }

        console.log(file_split);
        res.status(200).send({message: 'Image uploaded'});
    }else{
        res.status(404).send({message: 'Image missed'});
    }
}

function getImageFile(req, res){
    var imageFile = req.params.imageFile;
    var path_file = './uploads/albums/'+imageFile

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'Image missed'});
        }
    });
}

module.exports = {
    getAlbum,
    saveAlbum,
    getAlbums,
    updateAlbum,
    deleteAlbum,
    uploadImage,
    getImageFile
};