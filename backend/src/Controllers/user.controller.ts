import { Request, Response } from "express";
import User from "../models/user.model";

const getUser = async (req: Request, res: Response) => {
  const user = req.body.user;
  await User.findById(user.id)
    .then((user) => {
      user = JSON.parse(JSON.stringify(user));
      if (!user) {
        return res.status(200).json({ msg: "No user" });
      }
      const returnJSON = {
        Name: user.Name,
        Access_pin: user.Access_pin,
        Email: user.Email,
        Phone_number: user.Phone_number,
        Branch_id: user.Branch_id,
        Profile_picture: user.Profile_picture,
        Height: user.Height,
        Weight: user.Weight,
      };
      res.status(200).json(returnJSON);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};


export default { getUser };