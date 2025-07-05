const User = require("../models/user");
const jwt = require("jsonwebtoken");

// Register a new user
const Register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    // Create JWT token
    const payload = { id: newUser._id, role: newUser.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "40h",
    });

    // Return user info and token
    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        status: newUser.status,
      },
      token,
    });
  } catch (err) {
    console.error("Register Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Login existing user
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Match entered password with hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT token
    const payload = { id: user._id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "40h",
    });

    // Return user info and token
    res.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      },
      token,
    });
  } catch (err) {
    console.error("Login Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { Register, Login };
