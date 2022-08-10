/* eslint-disable no-console */
const path = require('path');
const express = require('express');
require('dotenv').config();
const router = require('./routes');

const app = express();
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.json());

app.use('/users', router.users);
app.use('/photos', router.photos);

app.listen(process.env.PORT, () => {
  console.log('listening on port', process.env.PORT);
});
