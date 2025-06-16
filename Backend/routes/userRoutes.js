const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

// User Register
router.post("/register", UserController.Register);

// User Login
router.post("/login", UserController.Login);

module.exports = router;
