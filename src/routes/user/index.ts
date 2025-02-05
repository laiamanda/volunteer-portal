import { Router } from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';

export const profile = Router();

/**
 * GET /user/profile
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
profile.get('/user/:userId/profile', auth.loggedIn, async (req, res) => {

  const userId = parseInt(req.params.userId);

  if(req.user) {
    // Checks if user exists
    const user = (
      await db.query(
        `
          SELECT * 
          FROM "accounts"."users"
          WHERE "id" = $1
        `,[
          userId,
        ]
      )
    ).rows[0];

    console.log(req.user.id);
    console.log(userId);

    if(user === undefined) {
      return res.redirect('/auth/login');
    } else {
      return res.render('user/profile', {
        user: user,
      });
    }
  }
});