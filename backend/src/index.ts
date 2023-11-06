// Server entry point

// import the required modules

import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

dotenv.config();
// create express app

const PORT = process.env.PORT || 5000;
const app:Express = express();

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
  url: url
})

redisClient.connect()
redisClient.on("connect", () => {
  console.log("Redis client connected");
})
redisClient.setEx("test", 3600, "testLog")
redisClient.get("test").then((value) => {
  console.log(value)
})

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

// Use Routes

app.use("/test", testRouter);

// Start the server on the specified port

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

