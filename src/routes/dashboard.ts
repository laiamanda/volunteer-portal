import { Router } from 'express';
import db from '../util/database';

export const dashboard = Router();

dashboard.get('/', async (req, res) => {
  const data = (
    await db.query('SELECT * FROM "volunteer_entries"."entries"')
  ).rows;

  // console.log(data);

  res.render('index', {
    data: data,
  });
});
