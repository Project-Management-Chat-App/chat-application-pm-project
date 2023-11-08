// make controllers for user login, register, logout and get user data


function loginController(req, res) {
    res.status(200).json({
        "message": "Login Successful",
    });
}