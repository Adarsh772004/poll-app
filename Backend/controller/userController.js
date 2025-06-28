const User = require("../models/user");
const jwt = require("jsonwebtoken");


// @route POST /poll/users/register
// @desc Register a new user
// @access Public
const Register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // Registration Logic
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    //  Create JWT payload
    const payload = { id: user._id }; 

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in response
        res.status(201).json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error in Register:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @route POST /poll/users/login
// @desc Authenticate user
// @access Public
const Login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    let user = await User.findOne({ email });

    if (!user) return req.status(400).json({ message: "Invalid Credentials" });
    const isMatch = await user.matchPassword(password);

    if (!isMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    //  Create JWT payload
    const payload = { user: { id: user._id, role: user.role } };

    // Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        // Send the user and token in response
        res.json({
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          token,
        });
      }
    );
  } catch (error) {
    console.error("Error in Login:", error.message);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


module.exports = {
  Register,
  Login,
};
