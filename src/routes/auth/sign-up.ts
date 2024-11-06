import express, { Request, Response } from 'express';
import db from '../../util/database';
import passport from 'passport';
import bcrypt from 'bcrypt';

export const signUp = express.Router();

signUp.get('/auth/sign-up', (req: Request, res: Response) => {
  res.render('./auth/sign-up');
});

signUp.post('/auth/sign-up', async (req: Request, res: Response) => {
  const saltRounds = 10;

  bcrypt.genSalt(saltRounds, (error, salt) => {
    if (error) {
      return;
    }
    bcrypt.hash(req.body.password, salt, async (error, hash) => {
      if (error) {
        return error;
      }
      console.log('Hashed: ' + hash);

      const entry = await db.query(`
        INSERT INTO "accounts"."users" (
          "username",
          "password"
        ) VALUES ($1, $2)
        `, [
          req.body.username,
          hash
        ]);
    });
  });

  return res.redirect('/');
});