const path = require('node:path');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const router = require('./routes/mainRouter');

app.use(router);

app.listen(4532, () => {
  console.log('Server is running on port 4532');
});
