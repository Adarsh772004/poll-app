const mongoose = require("mongoose");

// poll schema
const pollSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  votes: {
    type: Map,
    of: Number,
    default: {},
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("poll", pollSchema);
