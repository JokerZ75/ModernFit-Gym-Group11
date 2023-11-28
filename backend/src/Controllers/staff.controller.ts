import { Request, Response } from "express";
import Staff from "../models/staff.model";
import User from "../models/user.model";

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

export default { getStaffById };
