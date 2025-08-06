const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");

const methodOverride = require("method-override");
app.use(methodOverride("_method"));

app.use(
  session({
    secret: "your-secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
app.get("/", async (req, res) => {
  res.render("index.ejs");
});
const commentController = require("./controllers/comment");
const eventController = require("./controllers/event");
const userController = require("./controllers/user");
app.use("/events", eventController);
app.listen(port, () => {
  console.log(`The app is listening on port ${port}!`);
});
