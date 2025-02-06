import { Router } from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';

export const profile = Router();

/**
 * GET /user/:userId/profile
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
profile.get('/user/:userId/profile', auth.loggedIn, async (req, res) => {

  const userId = parseInt(req.params.userId);

  // Checks if user exists
  const user = (
    await db.query(
      `
        SELECT * 
        FROM "accounts"."users"
        WHERE "id" = $1
      `,[
        userId,
      ]
    )
  ).rows[0];
  // If the user is undefined
  if(user === undefined) {
    // Return a 404 error
    return res.render('./error', {error: res.status(404)});
  } 

  if(req.user){
    // If the user id does not match with the user param id
    if(userId !== req.user.id) {
      // Return a 404 error
      return res.render('./error', {error: res.status(404)});
    } else {
      return res.render('user/profile', {
        user: user,
      }); 
    }
  }
});

/**
 * POST /user/:userId/profile
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
profile.post('/user/:userId/profile', auth.loggedIn, async(req, res) => {
  // Update the user's information
  await db.query(`
    UPDATE "accounts"."users"
    SET 
      "first_name" = $1,
      "last_name" = $2,
      "email" = $3,
      "birthday" = $4,
      "location" = $5
    WHERE "id" = $6
    `, [
      req.body.first_name,
      req.body.last_name,
      req.body.email,
      req.body.birthday,
      req.body.location,
      req.params.userId,
    ]);

  //Redirect the user back to their profile page
  res.redirect(`/user/${req.params.userId}/profile`);
});