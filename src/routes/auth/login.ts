import express, { Request, Response } from 'express';
import passport from 'passport';

export const login = express.Router();

login.get('/auth/login', (req: Request, res: Response) => {
  res.render('./auth/login');
});

// login.post('/auth/login', passport.authenticate('local'), login, (req: Request, res: Response) => {
//   console.log(req.body);
//   return res.redirect('/');
// });