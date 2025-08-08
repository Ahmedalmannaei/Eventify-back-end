const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/events");
const verifyToken = require("../middleware/verify-token");

router.post("/", verifyToken, async (req, res) => {
  try {
    const ownerId = req.user._id;
    const event = await Event.create({
      ...req.body,
      owner: ownerId,
    });
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
router.get("/show/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const events = await Event.find({ owner: userId }).populate("owner");
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find().populate("owner");
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
// router.get("/details/:id", async (req, res) => {});
router.put("/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const event = await Event.findById(req.params.id);
  if (!event.owner.equals(userId)) {
    return res.status(403).send("Only owner can delete");
  }
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedEvent);
});
router.delete("/:id", verifyToken, async (req, res) => {
  const userId = req.user._id;
  const event = await Event.findById(req.params.id);
  if (!event.owner.equals(userId)) {
    return res.status(403).send("Only owner can delete");
  }
  const deleteEvent = await Event.findByIdAndDelete(req.params.id);
  res.status(200).json(deleteEvent);
});
module.exports = router;
