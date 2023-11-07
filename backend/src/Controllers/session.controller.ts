require("dotenv").config();

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import UserType from "../types/user.type";
import bcrypt from "bcrypt";



// User logs in
const StartSession = async (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;

  // Authenticate User
  await User.findOne({ Email: email }).then(async (user) => {
    if (!user) {
        return res.status(400).json({ msg: "User does not exist" });
    }
    // Validate password
    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
    }
    const retrievedUser: UserType = JSON.parse(JSON.stringify(user));
    const jwtPayload = {
        user: {
            id: retrievedUser._id,
            email: retrievedUser.Email,
      },
    };
    const accessToken = jwt.sign(jwtPayload, process.env.TOKEN_SECRET as string);
    return res.status(200).json({ accessToken: accessToken });
  });
};
