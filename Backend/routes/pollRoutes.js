const express = require("express");
const router = express.Router();
const PollController = require("../controller/pollController");
const auth = require("../middleware/auth");

// Create poll
router.post("/", auth, PollController.createPoll);

// Get all polls
router.get("/", PollController.getPolls);

// Vote on a poll
router.post("/:id/vote", PollController.votePoll);

// Delete own poll
router.delete("/:id", auth, PollController.deletePoll);

module.exports = router;
