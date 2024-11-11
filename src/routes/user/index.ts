import { Router } from 'express';

export const user = Router();

user.get('/user', async (req, res) => {
  res.send({user: req.body.username});
})