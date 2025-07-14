const Poll = require("../models/polls");

// Create a new poll
const createPoll = async (req, res) => {
  const { question, options } = req.body;

  if (!question || !options || options.length < 2) {
    return res
      .status(400)
      .json({ message: "Question and at least 2 options are required" });
  }

  try {
    const newPoll = new Poll({
      question,
      options,
      createdBy: req.user._id,
      status: "pending",
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (err) {
    console.error("Create Poll Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all approved polls
const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find({ status: "approved" }).sort({ date: -1 });
    res.json(polls);
  } catch (err) {
    console.error("Get Polls Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Vote on a poll
const votePoll = async (req, res) => {
  const { option } = req.body;

  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.votes.set(option, (poll.votes.get(option) || 0) + 1);
    await poll.save();

    res.json(poll);
  } catch (err) {
    console.error("Vote Poll Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a poll
const deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (poll.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Poll.findByIdAndDelete(req.params.id);
    res.json({ message: "Poll deleted" });
  } catch (err) {
    console.error("Delete Poll Error:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  createPoll,
  getPolls,
  votePoll,
  deletePoll,
};
