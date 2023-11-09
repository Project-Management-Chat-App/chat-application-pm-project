// make controllers for user login, register, logout and get user data
const { comparePasswords } = require('../validators/comparePasswords.validator');
const userRepository = require('../repositories/user.repository');
const User = require('../schema/user.schema');

// add validators
const {validatePassword} = require('../validators/passwordCreate.validator');
const {validateEmail} = require('../validators/email.validator');
const {validateUsername} = require('../validators/username.validator');

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

    // run password validation
    const [passwordIsValid, passwordError] = validatePassword(payload.passwordHash, req.body.passwordConfirmation);

    if (passwordIsValid === false) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": `Error on validate password: ${passwordError}`,
        });
    };

    // run email validation
    const [emailIsValid, emailError] = validateEmail(payload.email);
    if (emailIsValid === false) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": `Error on validate email: ${emailError}`,
        });
    };

    // run username validation
    const [usernameIsValid, usernameError] = validateUsername(payload.username);
    if (usernameIsValid === false) {
        return res.status(400).json({ // bad request, anything that goes wrong with sending the request, we send this error, example: empty username or password, or empty body, timeout, etc
            "message": `Error on validate username: ${usernameError}`,
        });
    };

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
                "message": "Something went wrong: could not create user",
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

async function getUserProfile(req, res) {


    // get the user id from the request
    const userId = 1; // for the moment, use a dummy user id

    try {

        // get the user from the database
        const user = await userRepository.getUserById(userId);
        
        // if user is not found, throw error
        if (!user) {
            return res.status(404).json({ // not found, if user is not found, we send this error
                "message": "User not found",
            });
        }

        // return dummy data
    return res.status(200).json({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "bio": user.bio,
        "profilePicture": user.profilePicture,
        "dateCreated": user.dateCreated,
        "dateUpdated": user.dateUpdated,
    });
    } catch (error) {
        console.error("request or db error: ", error.message);

    }

    
}

module.exports = {
    loginController,
    registerController,
    getUserProfile,
};