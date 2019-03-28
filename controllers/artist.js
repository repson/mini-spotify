'use strict'

var path = require('path');
var fs = require('fs');
var mongoosePaginate = require('mongoose-pagination')
var Artist = require('../models/artist');
var Album = require('../models/album');
var Song = require('../models/song');

function getArtist(req, res){
    var artistId = req.params.id;

    Artist.findById(artistId, (err, artist) => {
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!artist){
                res.status(404).send({message: 'The artist does not exists'});
            }else{
                res.status(200).send({artist});
            }
        }
    });
}

function getArtists(req, res){
    if(req.params.page){
        var page = req.params.page;
    }else{
        var page = 1;
    }

    var itemsPerPage = 3;

    Artist.find().sort('name').paginate(page, itemsPerPage, function(err, artists, total){
        if(err){
            res.status(500).send({message: 'Request error'});
        }else{
            if(!artists){
                res.status(404).send({message: 'There are not artists'});
            }else{
                return res.status(200).send({
                    pages: total,
                    artists: artists
                });
            }
        }
    })
}

function saveArtist(req, res){
    var artist = new Artist();

    var params = req.body;
    artist.name = params.name;
    artist.description = params.description;
    artist.image = 'null';

    artist.save((err, artistStored) => {
        if(err){
            res.status(500).send({message: 'error saving artist'});
        }else{
            if(!artistStored){
                res.status(404).send({message: 'The artist has not been saved'});
            }else{
                res.status(200).send({artist: artistStored});
            }
        }
    });
}

function updateArtist(req, res){
    var artistId = req.params.id;
    var update = req.body;

    Artist.findByIdAndUpdate(artistId, update, (err, artistUpdated) => {
        if(err){
            res.status(500).send({message: 'Error saving the artist'});
        }else{
            if(!artistUpdated){
                res.status(404).send({message: 'The artist has not been updated'});
            }else{
                res.status(200).send({artist: artistUpdated});
            }
        }
    })
}

function deleteArtist(req, res){
    var artistId = req.params.id;

    Artist.findByIdAndRemove(artistId, (err, artistRemoved) => {
        if(err){
            res.status(500).send({message: 'Error saving the artist'});
        }else{
            if(!artistRemoved){
                res.status(404).send({message: 'The artist has not been deleted'});
            }else{
                res.status(404).send({artistRemoved});

                Album.find({artist: artistRemoved._id}).remove((err, albumRemoved) => {
                    if(err){
                        res.status(500).send({message: 'Error deleting the album'});
                    }else{
                        if(!artistRemoved){
                            res.status(404).send({message: 'The artist has not been deleted'});
                        }else{
                            Song.find({artist: albumRemoved._id}).remove((err, songRemoved) => {
                                if(err){
                                    res.status(500).send({messages: 'Error deleting the song'});
                                }else{
                                    if(!songRemoved){
                                        res.status(404).send({message: 'The song has not been deleted'});
                                    }else{
                                        res.status(200).send({artist: artistRemoved});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });
}

function uploadImage(req, res){
    var artistId = req.params.id;
    var file_name = 'Not uploaded';

    if(req.files){
        var file_path = req.files.image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        var ext_split = file_name.split('\.');
        var file_ext = ext_split[1];

        if(file_ext == 'png' || file_ext == 'jpg' || file_ext == 'gif'){
            Artist.findByIdAndUpdate(artistId, {image: file_name}, (err, artistUpdated) => {
                if(!artistId){
                    res.status(404).send({message: 'Cannot update the user'});
                }else{
                    res.status(200).send({artist: artistUpdated});
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
    var path_file = './uploads/artists/'+imageFile

    fs.exists(path_file, function(exists){
        if(exists){
            res.sendFile(path.resolve(path_file));
        }else{
            res.status(200).send({message: 'Image missed'});
        }
    });
}

module.exports = {
    getArtist,
    saveArtist,
    getArtists,
    updateArtist,
    deleteArtist,
    uploadImage,
    getImageFile
};