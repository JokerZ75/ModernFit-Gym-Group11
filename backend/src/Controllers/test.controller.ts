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
  const test = req.body.test;
  res.json({ thisIsinbody: test });
};

export default { getTest, getTestWithID, getTestWithBody };
