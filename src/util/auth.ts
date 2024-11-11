/**
 * Checks if the user is authenticated
 * @param req the request sent from the client
 * @param res the response sent back to the client
 * @param next indicates that the generator has yield its last value
 */
export function loggedIn(req: any, res: any, next: any) {
  if(req.user) {
    next();
  } else {
    return res.redirect('/auth/login');
  }
}