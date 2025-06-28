const Poll = require("../models/polls");

// @desc Create a poll
exports.createPoll = async (req, res) => {
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
    });

    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Get all polls
exports.getPolls = async (req, res) => {
  try {
    const polls = await Poll.find().sort({ date: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Vote on a poll
exports.votePoll = async (req, res) => {
  const { option } = req.body;

  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    poll.votes.set(option, (poll.votes.get(option) || 0) + 1);
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete own poll
exports.deletePoll = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    if (poll.createdBy.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "You can only delete your own polls" });
    }

    await Poll.findByIdAndDelete(req.params.id);
    res.json({ message: "Poll deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
