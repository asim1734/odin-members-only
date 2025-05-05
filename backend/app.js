const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Only serve static files if you still need them (e.g., avatars, docs)
// app.use(express.static(path.join(__dirname, 'public')));

const router = require('./routes/mainRouter');
app.use(router);

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
