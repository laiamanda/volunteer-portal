import express, { Request, Response } from 'express';

export const logout = express.Router();

logout.post('/auth/logout', async (req, res, next) => {
  req.logout(function(error) {
    if(error) {
      return next(error);
    }
    res.redirect('/');
  });
});