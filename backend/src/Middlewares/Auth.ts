import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { RequestWithUser } from "../types/Request.interface";

function Auth(req: RequestWithUser, res: Response, next: NextFunction) {
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
      req.user = {
        id: user.user.id,
        email: user.user.email,
      };
      next();
    }
  );
}

export default Auth;
