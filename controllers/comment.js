const router = require("express").Router();
const Comment = require("../models/comments");
const verifyToken = require("../middleware/verify-token");

// Create a comment
router.post("/", verifyToken, async (req, res) => {
  try {
    const ownerId = req.user._id; // logged in user
    const { event, comment } = req.body;

    if (!event || !comment) {
      return res.status(400).json({ message: "Event and comment are required" });
    }

    const newComment = await Comment.create({
      owner: ownerId,
      event,
      comment,
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all comments for a specific event
router.get("/event/:eventId", async (req, res) => {
  try {
    const comments = await Comment.find({ event: req.params.eventId })
      .populate("owner", "username") // show username
      .sort({ createdAt: -1 });

    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a comment (only owner)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only owner can update" });
    }

    comment.comment = req.body.comment;
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a comment (only owner)
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.owner.equals(req.user._id)) {
      return res.status(403).json({ message: "Only owner can delete" });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
