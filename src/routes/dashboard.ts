import { Router } from 'express';

export const dashboard = Router();

dashboard.get('/', (req, res) => {
  res.render('index');
});