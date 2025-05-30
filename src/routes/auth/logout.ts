import express, { Request, Response } from 'express';
import session from 'express-session';

export const logout = express.Router();

/**
 * GET /auth/logout
 * @param req the request sent from the client
 * @param res the response sent back to the client
 * @param next calls next middleware if the user is authorized
 */
logout.get('/auth/logout', async (req, res, next) => {
  req.logout(function(error) {
    if(error) {
      // If user is unable to logout, then return a 400 error
      return res.status(404).render('error', {code: 400});
    }
    // Clear out any cookies
    res.clearCookie('connect.sid');
    // Clear out stored session
    req.session.destroy(function(error) {
      if(error) {
        console.log(error);
      }
    });
    // Redirect the user back to the login page
    return res.redirect('/auth/login');
  });
});