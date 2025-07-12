const User = require("../models/user");
const Poll = require("../models/polls");

const getAdminDashboard = async (req, res) => {
  try {
    // Count users and admins
    const users = await User.countDocuments({ role: "user" });
    const admins = await User.countDocuments({ role: "admin" });

    // Count polls by status
    const approved = await Poll.countDocuments({ status: "approved" });
    const rejected = await Poll.countDocuments({ status: "rejected" });
    const pending = await Poll.countDocuments({ status: "pending" });
    const total = approved + rejected + pending;

    return res.json({
      users,
      admins,
      polls: {
        approved,
        rejected,
        pending,
        total,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", err.message);
    res.status(500).json({ message: "Failed to fetch data" });
  }
};

module.exports = { getAdminDashboard };
