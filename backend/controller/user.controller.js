// make controllers for user login, register, logout and get user data
const { comparePasswords } = require('../validators/comparePasswords.validators');

function loginController(req, res) {
    // first get the username and password from the request body
    const { username, password } = req.body;

    // check if username and password are empty
    if (!username || !password) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": "Username or Password is empty",
        });
    }

    // compare password with password hash using our method
    const passwordMatch = comparePasswords(password, username);

    if (!passwordMatch) {
        return res.status(403).json({ // this is forbidden error, when user enters wrong password, or user not found, this is the error we send
            "message": "Username or Password is incorrect",
        });
    };

    res.status(200).json({
        "message": "Login Successful",
    });
};

module.exports = {
    loginController
};