var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const initializePassport = require('./routes/passport-config');
const passport = require('passport');
var indexRouter = require('./routes/index');

var app = express();

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'c739e45f1f5e4c95a4bd01ae77a74b2c569a82b',
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

// view engine setup
var mustacheExpress = require('mustache-express');
var engine = mustacheExpress();
app.engine('mustache', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'mustache');

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);

app.use(function(err, req, res, next){
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;