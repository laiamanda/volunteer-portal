import express, {Request, Response} from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';

export const edit = express.Router();

/**
 * GET /user/:userId/edit
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
edit.get('/user/:userId/edit', auth.loggedIn ,async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId);
  if(req.user && (userId == req.user.id)) {
    const username = req.user.username;
    // Retrieve all entries from organizations
    const organizations = (
      await db.query(`
        SELECT "name"
        FROM "organizations"."entries"
        ORDER BY "name"
      `)).rows;

    res.render('user/edit', {
      organizations: organizations,
      username: username,
    });
  } else {
    return res.render('./error', {error: res.status(404)});
  }
});

/**
 * POST /user/:userId/edit
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
edit.post('/user/:userId/edit', auth.loggedIn ,async (req: Request, res: Response) => { 
  const userId = parseInt(req.params.userId);

  if(req.user && (userId == req.user.id)) {
    // TO DO: Drop the table in the db and reorganize columns
    // Insert into the database
    const row = await db.query(`
      INSERT INTO "volunteer_entries"."entries" (
        "user",
        "number_of_hours",
        "organization",
        "role",
        "date",
        "description"
      )
      VALUES($1, $2, $3, $4, $5, $6) 
      `, [
        req?.user.username,
        req.body.hours || null ,
        req.body.organization || null,
        req.body.role || null,
        req.body.date || null,
        req.body.description || null,
      ]
    );
  }
  
  // Redirect user back to dashboard
  return res.redirect('/user/dashboard');
});
