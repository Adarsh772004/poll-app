const User = require("../models/user");
const Poll = require("../models/polls");

// Get all users and their poll count
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    const polls = await Poll.find();

    const pollCounts = {};
    polls.forEach((p) => {
      pollCounts[p.createdBy] = (pollCounts[p.createdBy] || 0) + 1;
    });

    const userData = users.map((user) => ({
      ...user.toObject(),
      pollCount: pollCounts[user._id] || 0,
    }));

    res.json(userData);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Change user status (active/suspended)
const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user status" });
  }
};

// Delete user
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};

module.exports = {
  getAllUsers,
  updateUserStatus,
  deleteUser,
};
