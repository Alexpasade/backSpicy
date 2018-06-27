var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var {Wit} = require('node-wit');
let fs = require('fs')
let Promise = require('bluebird')



var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
let apiRouter = require('./routes/api');


var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const client = new Wit({accessToken:'Q6PBIFIPWDANYUIET6Y2MDXTRYCLUUQI'});



app.post('/api/bot/receive', (req, res) => {
    client.message(req.body.mensaje, {})
    .then((data) => {
        if(data.entities.intent && data.entities.intent.length > 0){
           fs.readFile(`./phrases/${data.entities.intent[0].value}`,(err, data) => {
            let frases = data.toString().split('\n')
            res.json(frases[Math.round(Math.random()*frases.length)])
           })
        }else{
            res.json('No te entiendo.....')
        }
    })
})


module.exports = app;
