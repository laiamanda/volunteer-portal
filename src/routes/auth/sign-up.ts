import express, { Request, Response } from 'express';

export const signUp = express.Router();

signUp.get('/auth/sign-up', (req: Request, res: Response) => {
  res.render('./auth/sign-up');
});