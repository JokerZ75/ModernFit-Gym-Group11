import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

function Auth(req: Request, res: Response, next: NextFunction) {
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
      req.body = {
        ...req.body,
        user: { id: user.user.id, email: user.user.email },
      }; // work around to add user to body so you dont need to write user.user
      next();
    }
  );
}

export default Auth;
