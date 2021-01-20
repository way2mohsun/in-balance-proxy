var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var session = require('express-session');
var FileStore = require('session-file-store')(session);
var favicon = require('serve-favicon');
var log4js = require('log4js');
var app = express();

app.use(
  session({
    store: new FileStore({
      path: __dirname + '/sessions',
      useAsync: true,
      reapInterval: 3000,
      maxAge: 1000 * 60 * 30 * 3
    }),
    cookie: {
      maxAge: 1000 * 60 * 30,
      originalMaxAge: 1000 * 60 * 30 * 3
    },
    saveUninitialized: true,
    resave: true,
    secret: 'uwotm8'
  })
);

app.use(log4js.connectLogger(log4js.getLogger("in_request"), { level: 'debug' }));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.engine('.html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());
app.use(bodyParser.json({ limit: '1024mb' }));
app.use(bodyParser.urlencoded({ limit: '1024mb', extended: true }));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));
app.use("/css", express.static(__dirname + '/css'));
app.use("/jquery", express.static(__dirname + '/public/jquery-2.1.4'));
app.use("/bootstrap", express.static(__dirname + '/public/bootstrap-3.3.5'));
app.use("/font-awesome", express.static(__dirname + '/public/font-awesome'));
app.use("/bootsnipp", express.static(__dirname + '/public/bootsnipp'));
app.use('/', require('./routes/login'));
app.use('/home', loginRequire, require('./routes/home'));
app.use('/repo', loginRequire, require('./routes/repo'));
//app.use('/report', require('./routes/report'));
app.use('/balance', require('./routes/balance'));
app.use('/3d-party', require('./routes/third-party'));

function loginRequire(req, res, next) {
  if (req.session.user_id) {
    next(); // allow the next route to run
    return;
  }
  res.redirect("/"); // or render a form, etc.
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error.html');
});

module.exports = app;
