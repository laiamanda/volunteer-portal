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
  const data = (
    await db.query(`
      SELECT * 
      FROM "volunteer_entries"."entries"
      `)
  ).rows;

  res.render('user/dashboard', {
    data: data,
  });
});