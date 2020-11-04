// IMPORT DEPENDENCIES
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var bodyParser = require('body-parser');

// IMPORT ROUTES
// ! IMPORT ROUTES FOR USE BY APP.JS
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// var testAPIRouter = require('./routes/testAPI');
var plantRouter = require('./routes/plant');
// var activityRouter = require('./routes/activity');

// INITALISE THE APPLICATION
var app = express();

// MIDDLEWARE
// middleware functions take 3 arguments, req, res and next - the next fn in pipeline
//bodyParser.json creates an attribute 'body' for use in res
app.use(bodyParser.json()) 
// setting up a midleware logger to track each middleware
// for this to work it needs to come at the top
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`, req.body)
    // next function in pipeline must be called, otherwise the pipeline breaks
    next();
})
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// MIDDLEWARE - REGISTER ROUTES
// ! TELL APP TO REGISTER THESE ROUTES
app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/testAPI', testAPIRouter);
app.use(plantRouter);

// Handler for 404 - Resource not found
app.use((req, res, next) => {
    res.status(404).send('We think you are lost')
})
// Handler for 500 - Server Error
app.use((err, req, res, next) =>{
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '/public/500.html'))
})

//EXPORT APP
module.exports = app;