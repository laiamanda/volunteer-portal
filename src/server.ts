import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
// import crypto from 'crypto';
import bcrypt from 'bcrypt';
import store from 'connect-pg-simple';
import db from './util/database';

/* =============  IMPORT ROUTES ============= */
import { dashboard } from './routes/dashboard';
import { signUp } from './routes/auth/sign-up';
import { login } from './routes/auth/login';
import { logout } from './routes/auth/logout';
import { edit } from './routes/edit';
// import { user } from './routes/user'; 
 
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

// Store sessions
app.use(session({
    name: 'volunteer-portal-session',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    // cookie: {
    //   secure: true,
    // },
    store: new(store(session))({ 
      pool: db,
    })
  }));

// Store sessions in the PostgreSQL database
// app.use(
//   session({
//     name: 'volunteer-portal-session',
//     secret: 'secret',
//     resave: false, // true
//     saveUninitialized: true,
//     cookie: {
//       secure: true,
//     },
//     store: new(store(session))({ 
//       pool: db,
//     })
// }));

/*=================== PASSPORT =================== */
app.use(passport.initialize());
app.use(passport.session());

// NON DATABASE VERSION
// const authUser = (user: any, password: any, done: any) => {
//   console.log(`Value of User in authUser function: ${user}`);
//   console.log(`Value of password in authUser function: ${password}`);

//   let authenticated_user = {id: 1213, name: 'Amanda'};

//   return done(null, authenticated_user);
// }
  
// passport.use(new LocalStrategy(authUser));
// passport.serializeUser((user, done) => {
//   console.log('Serialize user');
//   console.log(user);

//   done(null, user); // TO DO: Create a user object
// });

// passport.deserializeUser((id, done) => {
//   console.log('Deserialize user');
//   console.log(id);

//   done(null, {name: 'Amanda', id: 123});
// });


/* DEVELOPMENT: CONNECTED WITH DATABASE */
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
          cb(null, {id: first.id, username: first.username});
          // console.log(first.id, first.username);
        } else {
          cb(null,false, {message: "[Error]: Unable to compare hash and password."});
        }
      });
    } else {
      cb(null, false, {message: 'Error: No Result found'});
    }
  });
}));


passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, cb) => {
  await db.query(`SELECT id, username FROM "accounts"."users" WHERE "id" = $1`, [parseInt(id, 10)], (err, result) => {
      if(err) {
        console.log('Error when selecting user on session deserialize: ' + err);
        return cb(err);
      }
      cb(null, result.rows[0]);
    });
  // await db.query(`SELECT id, username FROM "accounts"."users WHERE "id" = $1`, [parseInt(id, 10)], (err, result) => {
  // });
});
let count = 1

const printData = (req: any, res: any, next: any) => {
    console.log("\n==============================")
    console.log(`------------>  ${count++}`)

    // console.log(`req.body.username -------> ${req.body.username}`)
    // console.log(`req.body.password -------> ${req.body.password}`) 

    console.log(`\n req.session.passport -------> `)
    console.log(req.session.passport)
  
    console.log(`\n req.user -------> `) 
    console.log(req.user) 
  
    console.log("\n Session and Cookie")
    console.log(`req.session.id -------> ${req.session.id}`) 
    console.log(`req.session.cookie -------> `) 
    console.log(req.session.cookie) 
  
    console.log("===========================================\n")

    next()
}

app.use(printData);


/* ============== ROUTES ============== */
/* === AUTH ====*/
app.use(signUp);
app.use(login);
app.use(logout);
/*=== USER ROUTES === */
app.use(dashboard);
app.use(edit);
// // User Route
// app.use(user);

// This route will handle all requests that are not handle by others
app.all('*', (req, res) => {
  // res.status(404).send('Page not found');
  res.render('./error', {error: res.status(404)});
});

/* ============ SERVER =============*/
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log( `Server is running on ${port}.`);
});
