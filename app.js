'use strict'

var express = require('express')
var bodyParser = require('body-parser')

var app = express();

// Load routes

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configure HTTP headers

// Base routes

module.exports = app;