import express, { Request, Response } from 'express';

export const logout = express.Router();

logout.get('/auth/logout', async (req, res, next) => {
  req.logout(function(error) {
    if(error) {
      return res.status(404).render('error', {code: 400});
    }
    res.redirect('/auth/login');
  });
});