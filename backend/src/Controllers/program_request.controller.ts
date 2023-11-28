import { Request, Response } from "express";
import { setCacheAsJson, getCacheAsJson } from "../utils/cache";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";

const getAllProgramRequests = async (req: Request, res: Response) => {
  await getCacheAsJson("programRequests")
    .then((programRequests) => {
      if (!programRequests) {
        return res.status(200).json({ msg: "No program requests" });
      }
      res.status(200).json(programRequests);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const makeProgramRequest = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const fetchedUser = await User.findById(user.id);
  if (!fetchedUser) {
    return res.status(400).json({ msg: "User does not exist" });
  }
  // check user has set branch location, height, weight, gym goals
  if (
    fetchedUser.Branch_id === undefined ||
    fetchedUser.Branch_id === null ||
    fetchedUser.Height === undefined ||
    fetchedUser.Height === null ||
    fetchedUser.Weight === undefined ||
    fetchedUser.Weight === null ||
    fetchedUser.Gym_Goals === undefined ||
    fetchedUser.Gym_Goals === null ||
    fetchedUser.Gym_Goals === ""
  ) {
    return res.status(400).json({ msg: "Profile not finished" });
  }

  const currentProgramRequest = await getCacheAsJson("programRequests");
  if (currentProgramRequest) {
    console.log(currentProgramRequest);
    const currentUserID = user.id;
    if (currentProgramRequest[currentUserID] == true) {
      return res.status(400).json({ msg: "Program request already made" });
    }
    const nRequestData = {
      ...currentProgramRequest,
    };
    nRequestData[currentUserID] = true;
    try {
      await setCacheAsJson("programRequests", nRequestData);
      res.status(200).json({ msg: "Program request made" });
    } catch (err) {
      res.status(400).json({ msg: err });
    }
  }
};

const getAUsersProgramRequest = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const currentProgramRequest = await getCacheAsJson("programRequests");
  if (currentProgramRequest) {
    if (currentProgramRequest[user.id] == true) {
      return res.status(200).json(currentProgramRequest[user.id]);
    } else {
      return res.status(200).json({ msg: "No program request" });
    }
  }
  return res.status(207).json({ msg: "No program request" });
};

export default {
  getAllProgramRequests,
  makeProgramRequest,
  getAUsersProgramRequest,
};
