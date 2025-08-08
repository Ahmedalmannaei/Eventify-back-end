const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
router.get("/:id", async (req, res) => {
  try {
    const events = await Event.find({ owner: req.sessionID }); //.populate("owner") will add later
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
router.get("/all", async (req, res) => {
  try {
    const events = await Event.find(); //.populate("owner") will add later
    res.status(201).json(events);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});
module.exports = router;
