import { Router } from 'express';
import db from '../util/database';

export const dashboard = Router();

dashboard.get('/', async (req, res) => {
  const data = await db.query('SELECT * FROM "public"."test"');
  console.log(data.rows);

  res.render('index', {
    data: data,
  });
});
