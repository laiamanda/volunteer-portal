import express, {Request, Response} from 'express';
import db from '../../util/database';

export const edit = express.Router();

edit.get('/edit', (req: Request, res: Response) => {
  res.render('edit');
});

edit.post('/edit', async (req: Request, res: Response) => {
  console.log(req.body);  
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