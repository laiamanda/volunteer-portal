import express, {Request, Response} from 'express';
import db from '../../../util/database';
import * as auth from '../../../util/auth';

export const editEntry = express.Router();

/**
 * GET /user/:userId/edit/:entryId
 * @param req the request sent from the client
 * @param res the response sent back to the client
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

/**
 * POST /user/:userId/edit/:entryId
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
editEntry.post('/user/:userId/edit/:entryId', auth.loggedIn, async (req, res) => {
    const userId = parseInt(req.params.userId);

    if(req.user && (userId == req.user.id)) {
      // Update the entryId
      const row = await db.query(`
        UPDATE "volunteer_entries"."entries"
        SET 
          "number_of_hours" = $1,
          "organization" = $2,
          "role" = $3,
          "date" = $4,
          "description" = $5
        WHERE "id" = $6
      `, [
        req.body.hours || '',
        req.body.organization || '',
        req.body.role || '',
        req.body.date || null,
        req.body.description || '',
        req.params.entryId,
      ]);

      // Redirect user back to the update page
      return res.redirect(`/user/${userId}/edit/${req.params.entryId}`);
    }
    // Return 404 if user tries to access the wrong page
    return res.render('./error', {error: res.status(404)});
});