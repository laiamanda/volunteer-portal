import db from '../../../util/database';
import express, { Request, Response } from 'express';

export const deleteDashboard = express.Router();

deleteDashboard.delete('/api/user/dashboard/:entry_id', async(req, res) => {
  const entryId = req.params.entry_id;
    await db.query(`
      DELETE FROM "volunteer_entries"."entries"
      WHERE "id" = $1
    `, [entryId]);
    res.end();
});