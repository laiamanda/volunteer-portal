import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import crypto from 'crypto';
import store from 'connect-pg-simple';
import session from 'express-session';
import bcrypt from 'bcrypt';
import db from './util/database';

import { dashboard } from './routes/dashboard';
import { login } from './routes/auth/login';
import { logout } from './routes/auth/logout';
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

// Store sessions in the PostgreSQL database
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

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async(username: string, password: string, cb: any) => {
  await db.query('SELECT "id", "username", "password" FROM "accounts"."users" WHERE username = $1', [username], (err, result) => {
    if (err) {
      console.log('Invalid username/password');
      return cb(err);
    } 
    if(result.rows.length > 0){
      const first = result.rows[0];
      bcrypt.compare(password, first.password, function(err, res) {
        if(res) {
          cb(null, {id: first.id, username: first.username})
        } else {
          cb(null,false);
        }
      });
    } else {
      cb(null, false);
    }
  });
}));

passport.serializeUser((user, done) => {
  // done(null, user.id);
  done(null, user);
});

passport.deserializeUser((id: string, cb) => {
  db.query(`SELECT id, username FROM "accounts"."users WHERE "id" = $1`, [parseInt(id, 10)], (err, result) => {
    if(err) {
      console.log('Error when selecting user on session deserialize: ' + err);
      return cb(err);
    }
    cb(null, result.rows[0]);
  });
});



// Routes
app.use(dashboard);
/* Auth */
app.use(signUp);
app.use(login);
app.use(logout);
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
