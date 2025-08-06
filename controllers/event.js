const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

router.post("/", async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json(event);
});

module.exports = router;
