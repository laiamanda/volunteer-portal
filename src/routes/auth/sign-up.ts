import express, { Request, Response } from 'express';
import db from '../../util/database';
import passport from 'passport';

export const signUp = express.Router();

signUp.get('/auth/sign-up', (req: Request, res: Response) => {
  res.render('./auth/sign-up');
});

signUp.post('/auth/sign-up', passport.authenticate('local'), async (req: Request, res: Response) => {
  console.log(req.body);
  // successRedirect: '/',
  // failureRedirect: '/auth/sign-up'
  // const entry = await db.query(`
  //   INSERT INTO "accounts"."users" (
  //     "username",
  //     "password"
  //   ) VALUES ($1, $2)
  //   `, [
  //     req.body.username,
  //     req.body.password
  //   ]);
  return res.redirect('/');
});