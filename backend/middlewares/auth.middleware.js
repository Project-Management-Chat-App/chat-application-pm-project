async function validateUserIsAuthenticated(req, res, next) {

    // using cookie parser middleware, get the req.session object
    const userId = req.session.user;
    
    if (!userId) {
        return res.status(401).json({ // unauthorized, if user is not logged in, we send this error
            "message": "User is not logged in",
        });
    }

    return next();
}

module.exports = {
    validateUserIsAuthenticated,
};