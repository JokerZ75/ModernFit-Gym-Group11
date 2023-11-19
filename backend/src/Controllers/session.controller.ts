require("dotenv").config();

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import UserType from "../types/user.type";
import bcrypt from "bcrypt";
import { setCachePermanent, getCache, clearCache } from "../utils/cache";

// User logs in
const StartSession = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;

  // Authenticate User
  await User.findOne({ Email: email }).then(async (user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }
    // Validate password

    // const isMatch = await bcrypt.compare(password, user.Password);
    // if (!isMatch) {
    //   return res.status(400).json({ msg: "Invalid credentials" });
    // }

    const retrievedUser: UserType = JSON.parse(JSON.stringify(user));
    // const retrievedUser: UserType = {
    //   _id: "123",
    //   Email: "",
    //   Password: "",
    //   Name: "",
    //   Phone_number: 123,
    //   Access_pin: 123,
    //   Profile_picture: "",

    //   Height: 123,
    //   Weight: 123,
    //   DOB: new Date(),
    //   createdAt: new Date(),
    //   updatedAt: new Date(),
    // }
    const jwtPayload = {
      user: {
        id: retrievedUser._id,
        email: retrievedUser.Email,
      },
    };
    const accessToken = jwt.sign(
      jwtPayload,
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "15m",
      }
    );
    const refreshToken = jwt.sign(
      jwtPayload,
      process.env.REFRESH_TOKEN_SECRET as string
    );
    setCachePermanent(refreshToken, refreshToken);
    return res
      .status(200)
      .json({ accessToken: accessToken, refreshToken: refreshToken });
  });
};

// Refresh the user's access token

const RefreshSession = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  const retrievedToken = await getCache(refreshToken);
  if (!retrievedToken) {
    return res.status(403).json({ msg: "Token not found" });
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.status(403).json({ msg: "Token not valid" });
      const jwtPayload = {
        user: {
          id: user.user.id,
          email: user.user.email,
        },
      };
      const accessToken = jwt.sign(
        jwtPayload,
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: "15m",
        }
      );
      return res.status(200).json({ accessToken: accessToken });
    }
  );
};

// User logs out

const EndSession = async (req: Request, res: Response) => {
  const refreshToken = req.body.token;
  if (!refreshToken) {
    return res.status(401).json({ msg: "No token, authorization denied" });
  }
  clearCache(refreshToken);
  return res.status(200).json({ msg: "Logged out" });
};

const VerifySession = async (req: Request, res: Response) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null || token == undefined || token == "null") {
    return res
      .status(401)
      .json({ message: "Error: Unauthorized", statusCode: 401 });
  }

  jwt.verify(
    token,
    process.env.TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Error: Forbidden", statusCode: 403 });
      }
      return res.status(200).json({ message: "Success", statusCode: 200 });
    }
  );
};

export default {
  StartSession,
  RefreshSession,
  EndSession,
  VerifySession,
};
