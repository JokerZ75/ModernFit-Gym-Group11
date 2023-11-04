// Server entry point

// import the required modules

import express, { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();
// create express app

const PORT = process.env.PORT || 3001;
const app = express();

// Middleware

import cors from "cors";
import mongoose, { mongo } from "mongoose";

app.use(cors());
app.use("./postImages", express.static("postImages"));
app.use("./profileImages/", express.static("profileImages"));
app.use(express.json());

// Redis setup

import * as Redis from "redis";

const redisClient = Redis.createClient()

// Connection to MongoDB

const MONGO_URI = process.env.MONGO_URI || "";
if (!MONGO_URI) throw new Error("No mongo URI provided");
mongoose.connect(MONGO_URI, {});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

// Routes import

// Use Routes

// Start the server on the specified port

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Test route

app.get("/test" , (req: Request, res: Response) => {
    res.json({message: "Hello World"})
});
