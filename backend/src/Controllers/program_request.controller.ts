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
      const users = Object.keys(programRequests);
      let usersData = [] as any[];
      await Promise.all(
        users.map(async (user) => {
          const userData = await User.findById(user);
          // if been assigned to staff, remove from program request
          const isAssigned = await Staff.findOne({
            AssignedUsers: { $in: [userData?.id] },
          });
          if (userData && !isAssigned) {
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
      [user.id]: true,
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
    if (currentProgramRequest[currentUserID] == true) {
      return res.status(400).json({ msg: "Program request already made" });
    }
    const nRequestData = {
      ...currentProgramRequest,
    };
    nRequestData[currentUserID] = true;
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
    if (currentProgramRequest[user.id] == true) {
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
  if (currentProgramRequest[userID] == false) {
    return res.status(400).json({ msg: "No program request" });
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

export default {
  getAllProgramRequests,
  makeProgramRequest,
  getAUsersProgramRequest,
  assignUser,
  unassignUser,
};
