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

module.exports = {
    getArtist,
    saveArtist,
    getArtists
};