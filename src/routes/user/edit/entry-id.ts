import express, {Request, Response} from 'express';
import db from '../../../util/database';
import * as auth from '../../../util/auth';

export const editEntry = express.Router();

/**
 * GET /user/:userId/edit/:entryId
 */

editEntry.get('/user/:userId/edit/:entryId', auth.loggedIn, async(req, res)=> {
    // Retrieve entry Id from params
    const entryId = req.params.entryId;

    if(req.user) {
      const username = req.user.username;
      // Retrieve all entries from organizations
      const organizations = (
        await db.query(`
            SELECT "name"
            FROM "organizations"."entries"
            ORDER BY "name"
      `)).rows;
    
      // Retrieve the volunteer entry
      const entry = (
        await db.query(`
            SELECT *
            FROM "volunteer_entries"."entries"
            WHERE "id" = $1
            `, [
            entryId
            ])
      ).rows[0];
        
      return res.render('user/edit', {
        username: username,
        organizations: organizations,
        entry: entry,
      });
    }


});