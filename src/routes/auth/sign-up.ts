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
});