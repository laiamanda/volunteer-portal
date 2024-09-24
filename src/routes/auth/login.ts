import express, { Request, Response } from 'express';

export const login = express.Router();

login.get('/auth/login', (req: Request, res: Response) => {
  res.render('./auth/login');
});