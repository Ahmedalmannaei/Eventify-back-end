const router = require("express").Router();
const mongoose = require("mongoose");
const Event = require("../models/events");

router.post("/", async (req, res) => {
  res.json({ message: "create route" });
});

module.exports = router;
