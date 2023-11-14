import { Request, Response } from "express";
import { redisClient } from "../index";

const getTest = async (req: Request, res: Response) => {
  res.send("Hello World!");
  redisClient.set("key", "value");
  const value = await redisClient.get("key");
  console.log(value);
};

const getTestWithID = (req: Request, res: Response) => {
  res.send("Hello World with ID! ID: " + req.params.id);
};

const getTestWithBody = (req: Request, res: Response) => {
  const { test, test2 } = req.body;
  res.json({test, test2});
};

export default { getTest, getTestWithID, getTestWithBody };
