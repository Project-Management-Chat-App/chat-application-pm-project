// here we create a route module, 
// user makes requests to the server, server has defined routes
// and logics mapped in here

const express = require("express");
const router = express.Router();

// the routes here, mapped as address string, function(request object, response object)

// the login route
router.post("/login", function(req, res) {
    res.status(200).json({
        "message": "Login Successful",
    });
});

// the register route
router.post("/register", function(req, res) {
    res.status(200).json({
        "message": "Register Successful",
    });
});

// dummy request
router.get('/', (req, res) => {
    res.send('<h1>get response for the chat app</h1>');
});

module.exports = router;