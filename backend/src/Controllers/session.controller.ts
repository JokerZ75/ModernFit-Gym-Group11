require("dotenv").config();

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/user.model";
import UserType from "../types/user.type";
import bcrypt from "bcrypt";
import {
  setCachePermanent,
  getCache,
  clearCache,
  setCacheWithExpire,
  getCacheAsJson,
} from "../utils/cache";
import { LoginEmail } from "../utils/emails";
import Staff from "../models/staff.model";
import { ObjectId } from "mongodb";

const SendFor2FA = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  // Authenticate User
  const user = await User.findOne({ Email: email });
  if (!user) {
    return res.status(400).json({ msg: "Invalid details" });
  }
  // Validate password

  const isMatch = await bcrypt.compare(password, user.Password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid details" });
  }

  let unique = false;
  let code = "";
  while (!unique) {
    code = Math.floor(100000 + Math.random() * 900000).toString();
    const retrievedCode = await getCache(code);
    if (!retrievedCode) {
      unique = true;
    }
  }
  setCacheWithExpire(code, email, 3600);
  await LoginEmail(email, code);

  return res.status(200).json({ msg: "Email sent" });
};

// User logs in
const StartSession = async (req: Request, res: Response) => {
  const {
    email,
    password,
    authCode,
  }: { email: string; password: string; authCode: string } = req.body;

  if (!email || !password || !authCode) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  // const retrievedEmail = await getCache(authCode) as string;
  // if (!retrievedEmail) {
  //   return res.status(400).json({ msg: "Invalid auth code" });
  // }
  // if (retrievedEmail != email) {
  //   return res.status(400).json({ msg: "Invalid auth code" });
  // }

  // Authenticate User
  await User.findOne({ Email: email }).then(async (user) => {
    if (!user) {
      return res.status(400).json({ msg: "Invalid details" });
    }
    // Validate password

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid details" });
    }

    const retrievedUser: UserType = JSON.parse(JSON.stringify(user));
    // Check if user is staff
    const staff = await Staff.findOne({ User_id: retrievedUser._id });
    let jwtPayload: {
      user: { id: string; email: string; staff?: string | ObjectId };
    } = {
      user: {
        id: retrievedUser._id,
        email: retrievedUser.Email,
      },
    };
    if (staff) {
      jwtPayload = {
        user: {
          id: retrievedUser._id,
          email: retrievedUser.Email,
          staff: staff.Position,
        },
      };
    }
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
      let jwtPayload: {
        user: { id: string; email: string; staff?: string | ObjectId };
      } = {
        user: {
          id: user.user.id,
          email: user.user.email,
        },
      };
      if (user.user.staff) {
        jwtPayload = {
          user: {
            id: user.user.id,
            email: user.user.email,
            staff: user.user.staff,
          },
        };
      }
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

// Verify the user's access token

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
      const userID = user.user.id;
      return res.status(200).json({ message: "Success", statusCode: 200 });
    }
  );
};

// login from Register
const StartSessionFromRegister = async (req: Request, res: Response) => {
  const {
    email,
    password,
    token,
  }: { email: string; password: string; token: string } = req.body;

  if (!email || !password || !token) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  const registerDataFromCache = await getCacheAsJson(token);
  if (!registerDataFromCache) {
    return res.status(400).json({ msg: "Invalid token" });
  }
  if (registerDataFromCache.Email != email) {
    return res.status(400).json({ msg: "Invalid token" });
  }

  // Authenticate User

  await User.findOne({ Email: email }).then(async (user) => {
    if (!user) {
      return res.status(400).json({ msg: "Invalid details" });
    }
    // Validate password

    const isMatch = await bcrypt.compare(password, user.Password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid details" });
    }

    const retrievedUser: UserType = JSON.parse(JSON.stringify(user));
    let jwtPayload: {
      user: { id: string; email: string; staff?: string | ObjectId };
    } = {
      user: {
        id: retrievedUser._id,
        email: retrievedUser.Email,
      },
    };
    // Check if user is staff
    const staff = await Staff.findOne({ User_id: retrievedUser._id });
    if (staff) {
      jwtPayload = {
        user: {
          id: retrievedUser._id,
          email: retrievedUser.Email,
          staff: staff.Position,
        },
      };
    }
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

// Get Session Data
const GetSessionData = async (req: Request, res: Response) => {
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
      const userID = user.user.id;
      // Check if user is staff
      Staff.findOne({ User_id: userID }).then((staff) => {
        if (staff) {
          // return position
          return res.status(200).json({
            message: "Success",
            statusCode: 200,
            position: staff.Position,
            id: userID,
          });
        } else {
          return res.status(200).json({
            message: "Success",
            statusCode: 200,
            position: "User",
          });
        }
      });
    }
  );
};

export default {
  StartSession,
  RefreshSession,
  EndSession,
  VerifySession,
  SendFor2FA,
  StartSessionFromRegister,
  GetSessionData,
};
