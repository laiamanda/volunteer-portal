import { Router } from 'express';
import db from '../../util/database';
import * as auth from '../../util/auth';
import bcrypt from 'bcrypt';

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
  // For the user's form
  if(req.body.update_user == '') {
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
        req.body.first_name || null,
        req.body.last_name || null ,
        req.body.email || null,
        req.body.birthday || null ,
        req.body.location || null ,
        req.params.userId,
      ]);

    //Redirect the user back to their profile page
    return res.redirect(`/user/${req.params.userId}/profile`);
  } 
  // Changing passwords
  else if (req.body.change_password == '') {
    const saltRounds = 11;
    if(req.body.new_password === req.body.confirm_password) {
      bcrypt.genSalt(saltRounds, (error, salt) => {
        if(error) {
          return;
        }
        bcrypt.hash(req.body.new_password, salt, async(error, hash) => {
          if(error) {
            return error;
          }
          // Update the user's information
          await db.query(`
            UPDATE "accounts"."users"
            SET "password" = $1
            WHERE "id" = $2
            `, [
              hash,
              req.params.userId,
            ]);
        });
      });
      return res.redirect(`/user/${req.params.userId}/profile`);
    } else {
      console.log('Passwords does not match');
    }
  }
  // User Delete Account
  else if (req.body.delete_account == '') {
    // Delete the user from the database
    await db.query( 
      `
      DELETE FROM "accounts"."users"
      WHERE "id" = $1
      `, [
        req.params.userId,
      ]
    );

    // Log out the user
    res.clearCookie('connect.sid');
    // Destroy Session
    req.session.destroy(function(error) {
      if(error) {
        console.log(error);
      }
    });
    // Redirect back to the homepage
    return res.redirect('/');
  } 
  else {
    return res.render('./error', {error: res.status(404)});
  } 
  
});