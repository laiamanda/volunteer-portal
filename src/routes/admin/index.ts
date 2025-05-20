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

    // Testing mail
    // initMailer();
    

    generateEntries();

    res.send('This is Admin Page');
});

async function generateEntries() {
    // Create a function to randomly create entries
    const today = new Date();
    // Select a random user
    let user = (await db.query(`
        SELECT "username"
        FROM "accounts"."users"
        ORDER BY RANDOM()
        LIMIT 1
    `)).rows[0];

    let number_of_hours = Math.floor(Math.random() * 24) + 1;

    // Select a random organizations
    let organization = (await db.query(`
      SELECT name
      FROM "organizations"."entries"
      ORDER BY RANDOM()
      LIMIT 1
    `)).rows[0];

    let role = 'volunteer';

    let day = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();

    let description = 'words words words';

    // Insert the entry into the database
    const row = await db.query(`
      INSERT INTO "volunteer_entries"."entries" (
        "user",
        "number_of_hours",
        "organization",
        "role",
        "date",
        "description"
      ) VALUES($1, $2, $3, $4, $5, $6) 
      `, [
        user.username,
        number_of_hours ,
        organization.name,
        role,
        day,
        description,
      ]
    );
}