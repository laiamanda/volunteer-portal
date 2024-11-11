import express, {Request, Response} from 'express';
import db from '../../util/database';

export const edit = express.Router();

// TO DO: Add authenticated user is allowed into the page
edit.get('/edit', (req: Request, res: Response) => {
  res.render('edit');
});

edit.post('/edit', async (req: Request, res: Response) => {
  console.log(req.body);  
  // TO DO: Retrieve logged-in user information and automatically insert into the database
  // Insert into the database
  const row = await db.query(`
    INSERT INTO "volunteer_entries"."entries" (
      "user",
      "number_of_hours"
    )
    VALUES($1, $2) 
    `, [
      req.body.name,
      req.body.hours,
    ]
  );

  return res.redirect('/');
});

// import * as editPost from './edit/edit';