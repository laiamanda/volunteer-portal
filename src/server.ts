import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import db from './util/database';
import store from 'connect-pg-simple';
import session from 'express-session';

import { dashboard } from './routes/dashboard';
import { login } from './routes/auth/login';
import { signUp } from './routes/auth/sign-up';
import { edit } from './routes/edit';
 
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

app.use(
  session({
    name: 'volunteer-portal-session',
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
    },
    secret: 'secret-secret',
    store: new(store(session))({ 
      pool: db,
    })
}));


// Routes
app.use(dashboard);
/* Auth */
app.use(signUp);
app.use(login);
// Edit Route
app.use(edit);

// This route will handle all requests that are not handle by others
app.all('*', (req, res) => {
  // res.status(404).send('Page not found');
  res.render('./error', {error: res.status(404)});
});

// Server
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log( `Server is running on ${port}.`);
});
