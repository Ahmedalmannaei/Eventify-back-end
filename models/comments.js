// models/Comment.js
const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Comment", commentSchema);
