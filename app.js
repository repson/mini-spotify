'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express();

// Load routes
var user_routes = require('./routes/user');
var artist_routes = require('./routes/artist');

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configure HTTP headers

// Base routes
app.use('/api', user_routes);
app.use('/api', artist_routes);

module.exports = app;