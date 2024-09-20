const dotenv = require('dotenv');
dotenv.config();

import express from 'express';

const app = express();

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log( `Server is running on ${port}.`);
});

app.get('/', (req, res) => {
  res.send('Finish setting up TypeScript Server');
});