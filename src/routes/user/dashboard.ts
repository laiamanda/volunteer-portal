import { Router } from 'express';
import db from '../../util/database';
import * as  auth from '../../util/auth'

export const dashboard = Router();

/**
 * GET /user/dashboard
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
dashboard.get('/user/dashboard', auth.loggedIn, async (req, res) => {
  if(req.user) {
    // Retrieves the entries data
    const data = (
      await db.query(`
        SELECT * 
        FROM "volunteer_entries"."entries"
        WHERE "user" = $1
        `, [
          req.user.username
        ])
    ).rows;

    res.render('user/dashboard', {
      data: data,
    });
  } else {
    // Return a 404 error
    return res.render('./error', {error: res.status(404)});
  }
});