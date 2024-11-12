import express, { Request, Response } from 'express';
import passport from 'passport';

export const login = express.Router();

/**
 * GET /auth/login
 * @param req the request from the client
 * @param res the response sent back to the client
 */
login.get('/auth/login', (req: Request, res: Response) => {
  res.render('./auth/login');
});

/**
 * POST /auth/login
 * @param req the request from the client
 * @param res the response sent back to the client
 */
login.post('/auth/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login'
}));