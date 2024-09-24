import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';

import { dashboard } from './routes/dashboard';
import { login } from './routes/auth/login';
import { signUp } from './routes/auth/sign-up';
import { edit } from './routes/edit';
import { editPost } from './routes/edit/edit/edit';
 
const app = express();

// Use body-parser to parse body of POST requests
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// Use Pug.js as the template engine
app.set('view engine', 'pug');
app.set('views', 'views');
app.locals.basedir = path.join(__dirname, '../views');

// Expose the public directory to clients
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use(dashboard);
/* Auth */
app.use(signUp);
app.use(login);
app.use(edit);
app.use(editPost);

// Server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log( `Server is running on ${port}.`);
});
