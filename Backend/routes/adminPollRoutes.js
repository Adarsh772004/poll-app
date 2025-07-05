const express = require("express");
const router = express.Router();
const {
  getAllPolls,
  updatePollStatus,
  deletePoll,
} = require("../controller/adminPollController");
const { verifyToken, isAdmin } = require("../middleware/auth");

// All routes under /poll/admin/polls

// Get all polls (Admin only)
router.get("/", verifyToken, isAdmin, getAllPolls);

// Update poll status (Admin only)
router.patch("/:id/status", verifyToken, isAdmin, updatePollStatus);

// Delete a poll (Admin only)
router.delete("/:id", verifyToken, isAdmin, deletePoll);

module.exports = router;
