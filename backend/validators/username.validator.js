function validateUsername(username) {
    // validate username
    // if username is valid, return true, else return false
    // if username is not valid, return error message, else return null

    // if username is empty, return error
    if (!username) {
        return [false, 'Username is empty'];
    }

    // compare username to pattern, not bigger than 16 chars
    const usernameRegex = /^[a-zA-Z0-9]{1,16}$/;
    if (!username.match(usernameRegex)) {
        return [false, 'Username must be alphanumeric'];
    }

    // if username is valid, return true
    return [true, ""];
}

module.exports = {
    validateUsername
};