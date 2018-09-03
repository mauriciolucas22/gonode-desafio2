const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const PORT = 3000;
const HOST = '127.0.0.1';

app.get('/', (req, res) => {
  res.send('Jesus loves you!');
});

app.listen(PORT, HOST);
