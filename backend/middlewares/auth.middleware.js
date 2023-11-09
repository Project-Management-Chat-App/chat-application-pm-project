async function validateUserIsAuthenticated(req, res, next) {

    // // return dummy error
    // return res.status(401).json({
    //     "message": "Unauthorized",
    // });

    return next();
}

module.exports = {
    validateUserIsAuthenticated,
};