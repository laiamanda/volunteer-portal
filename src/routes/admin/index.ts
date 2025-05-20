const generator = require('generate-password');

import { Router } from 'express';
import db from '../../util/database';
import { initMailer } from '../../util/mails';
import { generateFromEmail, generateUsername } from "unique-username-generator";
import bcrypt from 'bcrypt';
import { hash } from 'crypto';

export const admin = Router();

/**
 * GET /admin
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
admin.get('/admin', async(req, res) => {

    // Testing mail
    // initMailer();
    
    // generateEntries(3);
    generateUsers(5);

    res.send('This is Admin Page');
});

async function generateEntries(amount: number) {
    while(amount > 0) {
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

        // Get current date
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
        ]);
      amount--;
  }
}

// Generate random users
async function generateUsers(amount: number) {
    while (amount > 0) {
        // generateUsername(separator, number of random digits, maximum length)
        let username = generateUsername("_", 2, 12);

        let password = generator.generate({
            length: 12,
            numbers: true,
            symbols: true,
            excludeSimilarCharacters: true,
        });

        let email = username + '@email.com';

        const entry = await db.query(`
        INSERT INTO "accounts"."users" (
            "username",
            "password",
            "email"
        ) VALUES ($1, $2, $3)
        `, [
            username,
            password,
            email,
        ]);

        amount--;
    }
   return;
}

// Hash password
// To do: Figure this out...later
async function hashPassword(password: Buffer) {
    const saltRounds = 10;
    try {
        bcrypt.genSalt(saltRounds, (error, salt) => {
            if (error) {
                return;
            }
            bcrypt.hash(password, salt, async(error, hash) => {
                console.log(hash);
                return hash;
            })
        })
    } catch (error) {
        console.log(error);
        return error;
    }
}