import { Request, Response } from "express";
import { setCacheAsJson, getCacheAsJson } from "../utils/cache";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";

const getAllProgramRequests = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }
  if (isStaff.Position !== "Nutritionist" && isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not nutritionist or trainer" });
  }

  await getCacheAsJson("programRequests")
    .then(async (programRequests) => {
      // get all users in it
      if (!programRequests) {
        return res.status(200).json({ msg: "No program requests" });
      }
      if (isStaff.Position === "Nutritionist") {
        const users = Object.keys(programRequests);
        let usersData = [] as any[];
        await Promise.all(
          users.map(async (user) => {
            const userData = await User.findById(user);
            // if been assigned to other nutritionist
            const isAssigned = await Staff.findOne({
              $and: [
                { Position: "Nutritionist" },
                { AssignedUsers: { $in: [userData?.id] } },
              ],
            });
            if (
              userData &&
              !isAssigned &&
              programRequests[userData?.id]?.diet == true
            ) {
              usersData.push({
                _id: userData._id,
                Name: userData.Name,
                Email: userData.Email,
                Branch_id: userData.Branch_id,
                Profile_picture: `http://localhost:${process.env.PORT}/public/profileImages/${userData.Profile_picture}.jpg`,
                Height: userData.Height,
                Weight: userData.Weight,
                Gym_Goals: userData.Gym_Goals,
              } as any);
            }
          })
        );
        res.status(200).json(usersData);
      }
      if (isStaff.Position === "Trainer") {
        const users = Object.keys(programRequests);
        let usersData = [] as any[];
        await Promise.all(
          users.map(async (user) => {
            const userData = await User.findById(user);
            // if been assigned to other trainer
            const isAssigned = await Staff.findOne({
              $and: [
                { Position: "Trainer" },
                { AssignedUsers: { $in: [userData?.id] } },
              ],
            });
            if (
              userData &&
              !isAssigned &&
              programRequests[userData.id]?.workout == true
            ) {
              usersData.push({
                _id: userData._id,
                Name: userData.Name,
                Email: userData.Email,
                Branch_id: userData.Branch_id,
                Profile_picture: `http://localhost:${process.env.PORT}/public/profileImages/${userData.Profile_picture}.jpg`,
                Height: userData.Height,
                Weight: userData.Weight,
                Gym_Goals: userData.Gym_Goals,
              } as any);
            }
          })
        );
        res.status(200).json(usersData);
      }
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
  if (currentProgramRequest == null) {
    const nRequestData = {
      [user.id]: {
        diet: true,
        workout: true,
      },
    };
    try {
      await setCacheAsJson("programRequests", nRequestData);
      return res.status(200).json({ msg: "Program request made" });
    } catch (err) {
      return res.status(400).json({ msg: err });
    }
  }

  if (currentProgramRequest) {
    const currentUserID = user.id;
    if (
      currentProgramRequest[currentUserID]?.diet == true ||
      currentProgramRequest[currentUserID]?.workout == true
    ) {
      return res.status(400).json({ msg: "Program request already made" });
    }
    const nRequestData = {
      ...currentProgramRequest,
    };
    nRequestData[currentUserID] = {
      diet: true,
      workout: true,
    };
    try {
      await setCacheAsJson("programRequests", nRequestData);
      return res.status(200).json({ msg: "Program request made" });
    } catch (err) {
      return res.status(400).json({ msg: err });
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
    if (
      currentProgramRequest[user.id]?.diet == true ||
      currentProgramRequest[user.id]?.workout == true
    ) {
      return res.status(200).json(currentProgramRequest[user.id]);
    } else {
      return res.status(200).json({ msg: "No program request" });
    }
  }
  return res.status(207).json({ msg: "No program request" });
};

const assignUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const userID = req.params.id;

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }
  if (isStaff.Position !== "Nutritionist" && isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not nutritionist or trainer" });
  }
  // get program request from cache
  const currentProgramRequest = await getCacheAsJson("programRequests");
  if (!currentProgramRequest) {
    return res.status(400).json({ msg: "No program request" });
  }

  if (isStaff.Position === "Nutritionist") {
    if (currentProgramRequest[userID]?.diet == false) {
      return res.status(400).json({ msg: "No program request" });
    }
  }

  if (isStaff.Position === "Trainer") {
    if (currentProgramRequest[userID]?.workout == false) {
      return res.status(400).json({ msg: "No program request" });
    }
  }
  
  // assign user to staff
  await Staff.findOneAndUpdate(
    { User_id: user.id },
    { $push: { AssignedUsers: userID } },
    { new: true }
  )
    .then(async (staff) => {
      if (!staff) {
        return res.status(400).json({ msg: "Staff not found" });
      }
      // Remove user from program request
      return res.status(200).json({ msg: "User assigned" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const unassignUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const userID = req.params.id;

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }
  if (isStaff.Position !== "Nutritionist" && isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not nutritionist or trainer" });
  }
  // get program request from cache
  await Staff.findOneAndUpdate(
    { User_id: user.id },
    { $pull: { AssignedUsers: userID } },
    { new: true }
  )
    .then(async (staff) => {
      if (!staff) {
        return res.status(400).json({ msg: "Staff not found" });
      }
      // Remove user from program request
      return res.status(200).json({ msg: "User unassigned" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const getUserProgramRequest = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const userID = req.params.id;

  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }

  const isStaff = await Staff.findOne({ User_id: user.id });

  if (!isStaff) {
    return res.status(400).json({ msg: "User is not staff" });
  }

  if (isStaff.Position !== "Nutritionist" && isStaff.Position !== "Trainer") {
    return res.status(400).json({ msg: "User is not nutritionist or trainer" });
  }

  // get program request from cache
  const currentProgramRequest = await getCacheAsJson("programRequests");

  if (isStaff.Position === "Nutritionist") {
    if (currentProgramRequest) {
      if (currentProgramRequest[userID]?.diet == true) {
        return res.status(200).json({ msg: "Diet" });
      } else {
        return res.status(200).json({ msg: "No program request" });
      }
    }
    return res.status(200).json({ msg: "No program request" });
  }

  if (isStaff.Position === "Trainer") {
    if (currentProgramRequest) {
      if (currentProgramRequest[userID]?.workout == true) {
        return res.status(200).json({ msg: "Workout" });
      } else {
        return res.status(200).json({ msg: "No program request" });
      }
    }
    return res.status(200).json({ msg: "No program request" });
  }
};

export default {
  getAllProgramRequests,
  makeProgramRequest,
  getAUsersProgramRequest,
  assignUser,
  unassignUser,
  getUserProgramRequest,
};
