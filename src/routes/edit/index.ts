import express, {Request, Response} from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';

export const edit = express.Router();

/**
 * GET /edit
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
edit.get('/edit', auth.loggedIn ,async (req: Request, res: Response) => {
  res.render('edit');
});

/**
 * POST /edit
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
edit.post('/edit', auth.loggedIn ,async (req: Request, res: Response) => {
  // console.log(req.user);  
  // TO DO: Retrieve logged-in user information and automatically insert into the database
  // Insert into the database

  // TO DO: Drop the table in the db and reorganize columns
  const row = await db.query(`
    INSERT INTO "volunteer_entries"."entries" (
      "user",
      "number_of_hours",
      "organization",
      "role"
    )
    VALUES($1, $2, $3, $4) 
    `, [
      req.body.name,
      req.body.hours,
      req.body.organization,
      req.body.role,
    ]
  );

  return res.redirect('/');
});
