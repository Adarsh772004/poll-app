const Poll = require("../models/polls");

// @desc    Get all polls with creator email
// @route   GET /poll/admin/polls
// @access  Admin
const getAllPolls = async (req, res) => {
  try {
    const polls = await Poll.find()
      .populate("createdBy", "email")
      .sort({ date: -1 });
    res.status(200).json(polls);
  } catch (error) {
    console.error("Get All Polls Error:", error.message);
    res.status(500).json({ error: "Failed to fetch polls" });
  }
};

// @desc    Update poll status
// @route   PATCH /poll/admin/polls/:id/status
// @access  Admin
const updatePollStatus = async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["approved", "rejected", "pending"];

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value" });
  }

  try {
    const updatedPoll = await Poll.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedPoll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json(updatedPoll);
  } catch (error) {
    console.error("Update Poll Status Error:", error.message);
    res.status(500).json({ error: "Failed to update poll status" });
  }
};

// @desc    Delete a poll by ID
// @route   DELETE /poll/admin/polls/:id
// @access  Admin
const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    await Poll.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error("Delete Poll Error:", error.message);
    res.status(500).json({ error: "Failed to delete poll" });
  }
};

module.exports = {
  getAllPolls,
  updatePollStatus,
  deletePoll,
};
