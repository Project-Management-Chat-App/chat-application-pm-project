async function validateUserIsOwner(sessionUserId, ownerUserId) {
    // validates if user is owner, return true if user is owner, false otherwise with error message
    
    if (!ownerUserId) {
        return [false, "Owner user id is empty"];
    }

    if (!sessionUserId) {
        return [false, "Session user id is empty"];
    }

    if (sessionUserId !== ownerUserId) {
        return [false, "Session user is not the owner of the resource"];
    }

    return [true, ""];
}

module.exports = {
    validateUserIsOwner,
};