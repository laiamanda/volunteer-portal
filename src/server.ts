import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';

const app = express();

// Use Pug.js as the template engine
app.set('view engine', 'pug');
app.set('views', 'views');
app.locals.basedir = path.join(__dirname, '../views');

// Expose the public directory to clients
app.use(express.static(path.join(__dirname, '../public')));

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log( `Server is running on ${port}.`);
});

// To Do: Need to organize this...
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/edit', (req, res) => {
  res.render('edit');
});

app.post('/edit', (req, res) => {
  
})