const User = require("../models/user");
const Poll = require("../models/polls");

// Get all users and their poll count
const getAllUsers = async (req, res) => {
  try {
    const [users, polls] = await Promise.all([
      User.find().select("-password"),
      Poll.find(),
    ]);

    const pollCounts = polls.reduce((acc, poll) => {
      acc[poll.createdBy] = (acc[poll.createdBy] || 0) + 1;
      return acc;
    }, {});

    const userData = users.map((user) => ({
      ...user.toObject(),
      pollCount: pollCounts[user._id] || 0,
    }));

    res.json(userData);
  } catch (err) {
    console.error("getAllUsers error:", err);
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
