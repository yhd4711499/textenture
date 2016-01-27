var express = require('express');
var compression = require('compression');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var log4js = require('log4js');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var log = log4js.getLogger('system');
var prodcution = app.get('env') === 'production';
app.use(compression());

app.set('port', app.get('port') || 3000);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

if (prodcution) {
    app.use('/bower_components',  express.static(__dirname + '/dist/bower_components'));
    app.use('/partials',  express.static(__dirname + '/public/partials'));
    app.use(express.static(path.join(__dirname, 'dist')));
}else{
    app.use('/bower_components', express.static(__dirname + '/bower_components'));
    app.use(express.static(path.join(__dirname, 'public')));
}

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;

// app.listen(app.get('port'), function (err) {
//    if (err)
//        log.error("failed to listen on port: " + app.get('port'), err);
//    else
//        log.info("server is listening on port: " + app.get('port'));
// });
