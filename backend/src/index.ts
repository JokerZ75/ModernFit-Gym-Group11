// Server entry point

// import the required modules

import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

dotenv.config();
// create express app

const PORT = process.env.PORT || 5000;
const app: Express = express();

// Middleware

import cors from "cors";
import mongoose from "mongoose";

app.use(cors());
app.use("./public/postImages", express.static("postImages"));
app.use("./public/profileImages/", express.static("profileImages"));
app.use(express.json());

// Redis setup

import * as Redis from "redis";
const url = process.env.REDIS_URL || "redis://localhost:6379";

const redisClient = Redis.createClient({
  url: url,
});

redisClient.connect();
redisClient.on("connect", () => {
  console.log("Redis client connected");
});
redisClient.on("error", (err) => {
  console.log("Something went wrong " + err);
});

export { redisClient };

// NodeMailer setup

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: true,
});

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Server is ready to take messages");
  }
});

export { transporter };

// Connection to MongoDB

const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) throw new Error("No mongo URI provided");
mongoose.connect(MONGO_URI, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes import

const testRouter = require("./routes/test.route");

const notificationRouter = require("./routes/notification.route");
const sessionRouter = require("./routes/session.route");
const workoutRouter = require("./routes/workout.route");
const typeofworkoutRouter = require("./routes/typeofworkout.route");
const classRouter = require("./routes/class.route");
const mealRouter = require("./routes/meal.route");
const mealcatagoryRouter = require("./routes/mealcatagory.route");

// Use Routes

app.use("/test", testRouter);
app.use("/session", sessionRouter);
app.use("/notification", notificationRouter);
app.use("/workout", workoutRouter);
app.use("/typeofworkout", typeofworkoutRouter);
app.use("/class", classRouter);
app.use("/meal", mealRouter);
app.use("/mealcatagory", mealcatagoryRouter);

// Start the server on the specified port

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
