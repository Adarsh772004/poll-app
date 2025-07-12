const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

// User Register
router.post("/register", UserController.Register);

// User Login
router.post("/login", UserController.Login);

// Forget Password
router.post("/forgot-password", UserController.ForgotPassword);

// Reset Password
router.post("/reset-password/:token", UserController.ResetPassword);

module.exports = router;
