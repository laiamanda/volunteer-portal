import express, { Request, Response } from 'express';
import db from '../../util/database';
import bcrypt from 'bcrypt';

export const signUp = express.Router();

/**
 * GET /auth/sign-up
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
signUp.get('/auth/sign-up', (req: Request, res: Response) => {
  res.render('./auth/sign-up');
});

/**
 * POST /auth/sign-up
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
signUp.post('/auth/sign-up', async (req: Request, res: Response) => {
  const saltRounds = 10;
  let isValidUsername = false;

  // Query the database to see if the username already exists
  let existUsername = (await db.query(`
    SELECT "username"
    FROM "accounts"."users"
    WHERE "username" = $1
  `, [
    req.body.username
  ])).rows;

  // If existUsername returns no results
  if(existUsername.length == 0) {
    isValidUsername = true; // The username is valid
  } else {
    isValidUsername = false; // The user name is not valid
    return res.redirect('/auth/sign-up/?error=username_error');
  }

  // Check if the password has not requirements
  

  // Checks if the password and confirm password matches and if the isValidUsername is valid
  if((req.body.password === req.body.confirm_password) && (isValidUsername == true)) {
    try {
      bcrypt.genSalt(saltRounds, (error, salt) => {
        if (error) {
          return;
        }
        bcrypt.hash(req.body.password, salt, async (error, hash) => {
          if (error) {
            return error;
          }
          // console.log('Hashed: ' + hash);
    
          // Insert the user into the database
          const entry = await db.query(`
            INSERT INTO "accounts"."users" (
              "username",
              "password",
              "email"
            ) VALUES ($1, $2, $3)
            `, [
              req.body.username,
              hash,
              req.body.email,
            ]);
        });
      });
      return res.redirect('/user/dashboard');
    } catch(error) {
      return res.redirect('/auth/sign-up/?error=error');
    }
  } else {
    return res.redirect('/auth/sign-up/?error=password_match');
  }
});