const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const logger = require("morgan");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const methodOverride = require("method-override");

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(logger("dev"));

app.use(methodOverride("_method"));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
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
const userRouter = require("./controllers/users");
const authRouter = require("./controllers/auth");

app.use("/auth", authRouter);
app.use("/users", userRouter);

const userController = require("./controllers/user");
app.use("/events", eventController);
app.listen(port, () => {
  console.log(`The app is listening on port ${port}!`);
});
