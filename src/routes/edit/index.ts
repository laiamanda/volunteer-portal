import express, {Request, Response} from 'express';

export const edit = express.Router();

edit.get('/edit', (req: Request, res: Response) => {
  res.render('edit');
});

// import * as editPost from './edit/edit';

// app.get('/edit', (req, res) => {
//     res.render('edit');
//   });
  