const path = require('node:path');
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');
const flash = require('express-flash');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'styles')));

app.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.messages = req.flash();
  next();
});

app.use((req, res, next) => {
  res.locals.errorText = req.flash('KeywordError')[0] || ''; // First message or empty string
  next();
});

const router = require('./routes/mainRouter');

app.use(router);

app.listen(4532, () => {
  console.log('Server is running on port 4532');
});
