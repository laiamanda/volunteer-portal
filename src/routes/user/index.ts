import { Router } from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';

export const profile = Router();

/**
 * GET /user/profile
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
profile.get('/user/profile', auth.loggedIn, async (req, res) => {
    const user = (
      await db.query(
        `
          SELECT * FROM "accounts"."users"
        `)
    );
    res.render('user/profile');
});