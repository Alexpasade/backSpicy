const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const {Wit} = require('node-wit');
const fs = require('fs')
const Promise = require('bluebird')



const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');


const app = express();

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
            const frases = data.toString().split('\n')
            res.json(frases[Math.round(Math.random()*frases.length)])
          })
        }else{
            res.json('No te entiendo.....')
        }
    })
})


module.exports = app;
