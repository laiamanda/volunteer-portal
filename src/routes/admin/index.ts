import { Router } from 'express';
import db from '../../util/database';
import { initMailer } from '../../util/mails';

export const admin = Router();

/**
 * GET /admin
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
admin.get('/admin', async(req, res) => {

    initMailer();
    // const today = new Date();

    // Create a function to randomly create entries
    // let user = '';
    // let number_of_hours = Math.floor(Math.random() * 24) + 1;
    // let organization = 'test';
    // let role = 'volunteer';
    // let date = today.getDate();
    // let description = 'words';

    // Insert the entry into the database
    // const row = await db.query(`
    //   INSERT INTO "volunteer_entries"."entries" (
    //     "user",
    //     "number_of_hours",
    //     "organization",
    //     "role",
    //     "date",
    //     "description"
    //   ) VALUES($1, $2, $3, $4, $5, $6) 
    //   `, [
    //     user,
    //     number_of_hours ,
    //     organization,
    //     role,
    //     date,
    //     description,
    //   ]
    // );

    // console.log(date);

    res.send('This is Admin Page');
});