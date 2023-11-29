import { Request, Response } from "express";
import Staff from "../models/staff.model";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import UserType from "../types/user.type";

const getStaffById = async (req: Request, res: Response) => {
  const id = req.params.id;
  await Staff.findById(id)
    .then(async (staff) => {
      if (!staff) {
        return res.status(400).json({ msg: "Staff not found" });
      }
      await User.findById(staff.User_id).then(async (user) => {
        if (!user) {
          return res.status(400).json({ msg: "User not found" });
        }
        const returnJSON = {
          Name: user.Name,
          id: staff._id,
        };
        return res.status(200).json(returnJSON);
      });
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

const getStaffAssignedUser = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  const staff = await Staff.findOne({ User_id: user?.id })
    .then(async (staff) => {
      if (!staff) {
        return res.status(400).json({ msg: "Staff not found" });
      }
      // get all data for assigned users and return it
      const assignedUsers = staff.AssignedUsers;
      if (!assignedUsers) {
        return res.status(200).json([]);
      }
      const userData = [] as any[];
      await Promise.all(
        assignedUsers!.map(async (user) => {
          const userDataFetched = await User.findById(user);
          if (userDataFetched) {
            userData.push({
              _id: userDataFetched._id,
              Name: userDataFetched.Name,
              Email: userDataFetched.Email,
              Profile_picture: `http://localhost:${process.env.PORT}/public/profileImages/${userDataFetched.Profile_picture}.jpg`,
              Height: userDataFetched.Height,
              Weight: userDataFetched.Weight,
              Gym_Goals: userDataFetched.Gym_Goals,
            });
          }
        })
      );
      return res.status(200).json(userData);
    })
    .catch((err) => {
      return res.status(400).json({ msg: err });
    });
};

export default { getStaffById, getStaffAssignedUser };
