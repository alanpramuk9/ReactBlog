import passport from 'passport';

//bearer tokenization strategy
function tokenMiddleware(req, res, next) {
    passport.authenticate('bearer', { session: false })(req, res, next);
}
//if loggen in then continue with next callback
function isLoggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.sendStatus(401);
    }
}

export { tokenMiddleware, isLoggedIn };