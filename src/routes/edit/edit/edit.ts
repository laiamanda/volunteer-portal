import express, { Request, Response } from 'express';

export const editPost = express.Router();

editPost.post('/edit', (req: Request, res: Response) => {
  console.log(req.body);
});