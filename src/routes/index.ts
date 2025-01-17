import { Router } from 'express';

export const landingPage = Router();

/**
 * GET /
 * @param req the request sent from the client
 * @param res the response sent back to the client
 */
landingPage.get('/', async(req, res) => {
    res.render('index');
});