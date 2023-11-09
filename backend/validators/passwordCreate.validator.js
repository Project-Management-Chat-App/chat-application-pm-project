async function validatePassword(newPassword, passwordConfirmation) {
    // this will return true if passwords match, or false if they don't
    // also return an error message if the password is not valid, or null error message if it is valid (true)

    // check if password is empty
    if (!newPassword || !passwordConfirmation) {
        return false, "Password or Password Confirmation is empty";
    }

    // check if password and password confirmation match
}