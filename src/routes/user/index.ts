import { Router } from 'express';

export const profile = Router();

/**
 * GET /
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
profile.get('/user/profile', async (req, res) => {
    res.render('user/profile');
});