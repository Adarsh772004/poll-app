const express = require("express");
const router = express.Router();
const PollController = require("../controller/pollController");
const { verifyToken } = require("../middleware/auth");

// Create poll
router.post("/", verifyToken, PollController.createPoll);

// Get all polls
router.get("/", PollController.getPolls);

// Vote on a poll
router.post("/:id/vote", PollController.votePoll);

// Delete own poll
router.delete("/:id", verifyToken, PollController.deletePoll);

module.exports = router;
