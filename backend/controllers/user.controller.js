// make controllers for user login, register, logout and get user data
const { comparePasswords } = require('../validators/comparePasswords.validator');
const userRepository = require('../repositories/user.repository');
const User = require('../schema/user.schema');

async function loginController(req, res) {
    // first get the username and password from the request body
    const { username, password } = req.body;

    // check if username and password are empty
    if (!username || !password) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": "Username or Password is empty",
        });
    }

    // compare password with password hash using our method
    const passwordMatch = await comparePasswords(password, username);

    if (passwordMatch === false) {
        return res.status(403).json({ // this is forbidden error, when user enters wrong password, or user not found, this is the error we send
            "message": "Username or Password is incorrect",
        });
    }
    
    return res.status(200).json({
        "message": "Login Successful",
    });
};

async function registerController(req, res) {

    // get the request body
    const payload = {
        username: req.body.username,
        email: req.body.email,
        passwordHash: req.body.password,
        bio: req.body.bio || "",
        profilePicture: req.body.profilePicture || "",
    }

    // some pre-validation, just making sure required fields are not empty
    // check if username, email or password are empty
    if (!payload.username || !payload.email) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": "Username, Email or Password is empty",
        });
    }

    if (!payload.passwordHash || !req.body.passwordConfirmation) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": "Password or Password Confirmation is empty",
        });
    }

    // check if password and password confirmation match
    if (payload.passwordHash !== req.body.passwordConfirmation) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": "Password and Password Confirmation do not match",
        });
    }

    // add input validation first

    try {
        // check if user exist
        const usernameExists = await userRepository.getUserByUsername(payload.username);
        if (usernameExists) {
            return res.status(409).json({ // conflict, when user already exists, we send this error
                "message": "Username already exists",
            });
        }

        const emailExists = await userRepository.getUserByEmail(payload.email);
        if (emailExists) {
            return res.status(409).json({ // conflict, when user already exists, we send this error
                "message": "Email already exists",
            });
        }

        // create user
        const user = await userRepository.createUser(payload);
        if (!user) {
            return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
                "message": "Something went wrong",
            });
        }
        

        return res.status(201).json({ // created, if everything goes well, we send this code, and a message that the user was created successfully
            "message": "Register Successful",
        });
        

    } catch (error) {
        // if something goes wrong with the user creation, return error
        console.error("request or db error: ", error.message);
        return res.status(500).json({ // internal server error, if something goes wrong with the server, we send this error, like could not connect or save this user
            "message": "Something went wrong: " + error.message,
        });
    }
        
    
};

module.exports = {
    loginController,
    registerController,
};