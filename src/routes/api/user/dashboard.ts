import db from '../../../util/database';
import express, { Request, Response } from 'express';
import * as  auth from '../../../util/auth'

export const deleteDashboard = express.Router();
/** 
 * DELETE /api/user/dashboard/:entry_id
 * @param req the request sent from the client
 * @param res the response sent back to the client
*/
deleteDashboard.delete('/api/user/dashboard/:entry_id', auth.loggedIn, async(req, res) => {
  const entryId = req.params.entry_id;
  // Delete from volunteer entries
  await db.query(`
    DELETE FROM "volunteer_entries"."entries"
    WHERE "id" = $1
  `, [entryId]);
  res.end();
});