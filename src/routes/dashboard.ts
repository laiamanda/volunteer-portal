import { Router } from 'express';
import db from '../util/database';

export const dashboard = Router();

dashboard.get('/', (req, res) => {
  // const value = 
  // console.log(value);

  res.render('index');
});

// async function call() {
//   const data = await db.query('SELECT * FROM "public"."test"');
//   console.log(data.rows);
// }

// call();