import { Router } from 'express';

export const admin = Router();

/**
 * GET /admin
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
admin.get('/admin', async(req, res) => {
    // Create a function to randomly create entries
    res.send('This is Admin Page');
});