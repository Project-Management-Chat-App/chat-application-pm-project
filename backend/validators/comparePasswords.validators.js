const bcrypt = require('bcrypt');
const userRepository = require('../repositories/user.repository');

async function comparePasswords(password, username) {
    // this will return true if passwords match, or false if they don't
    // we compare the password hash with the password using bcrypt
    
    try {

        // search user by username
        const user = await userRepository.getUserByUsername(username);
        
        // compare password hash with password in the form
        // this will return true if passwords match, or false if they don't
        return bcrypt.compareSync(password, user.passwordHash);
    } catch (error) {
        // if something goes wrong with the get user method
        // like user not found, return false
        console.log(error);
        return false;
    }
}


module.exports = {
    comparePasswords
};