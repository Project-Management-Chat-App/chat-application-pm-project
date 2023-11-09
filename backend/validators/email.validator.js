function validateEmail(newEmail) {
    // validate email
    // return true if email is valid, false if email is invalid,
    // also return an error message if the email is not valid, or null error message if it is valid (true)

    // check if email is empty
    if (!newEmail) {
        return [false, "Email is empty"];
    }

    // make the regex for email validation
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;

    // check if email matches regex
    if (!newEmail.match(emailRegex)) {
        return [false, "Email is not valid"];
    }

    // else, return true
    return [true, ""];
}


module.exports = {
    validateEmail
};