function validatePassword(newPassword, passwordConfirmation) {
    // this will return true if passwords match, or false if they don't
    // also return an error message if the password is not valid, or null error message if it is valid (true)

    // check if password is empty
    if (!newPassword || !passwordConfirmation) {
        return [false, "Password or Password Confirmation is empty"];
    }

    // check if password and password confirmation match
    // create a regex to check password strength, password can be at least 8 characters long, must contain at least 1 uppercase letter, 1 lowercase letter and 1 number
    // const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // check if password and password confirmation match
    if (newPassword !== passwordConfirmation) {
        return [false, "Password and Password Confirmation do not match"];
    }

    // check if password matches regex
    if (!newPassword.match(passwordRegex)) {
        return [false, "Password must be at least 8 characters long, must contain at least 1 uppercase letter, 1 lowercase letter and 1 number"];
    }


    // else, return true
    return [true, ""];

}

module.exports = {
    validatePassword
};