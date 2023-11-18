import { Request, Response } from "express";
import Class from "../models/class.model";
import classType from "../types/class.type";
import User from "../models/user.model";

const generateClass = async (req: Request, res: Response) => {
  const classObj: classType = {
    Owner_id: "60b9b0b9b3b3c2b0e4e0b0b9",
    Name: "Test Class",
    Date: new Date(),
    Type: "ongoing",
    Duration: 1,
    Branch_id: "60b9b0b9b3b3c2b0e4e0b0b9",
    Interested_users: ["60b9b0b9b3b3c2b0e4e0b0b9"],
  };

  try {
    const newClass = new Class(classObj);
    const savedClass = await newClass.save();
    res.json(savedClass);
  } catch (err) {
    res.json({ message: err });
  }
};

const getClasses = async (req: Request, res: Response) => {
  const user = req.body.user;
  await Class.find({ Interested_users: { $in: [user.id] } })
    .then((classes) => {
      classes = JSON.parse(JSON.stringify(classes));
      // classes = classes.filter((c: any) => {  // TODO: COMMENTED OUT FOR TESTING PURPOSES
      //   return c.Date.getTime() > new Date().getTime();
      // });
      classes.forEach((c: any) => {
        delete c.Interested_users;
      });
      if (classes.length === 0) {
        return res.status(200).json({ msg: "No classes" });
      }
      res.status(200).json(classes);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const getClassesAtBranch = async (req: Request, res: Response) => {
  const user = req.body.user;
  const userData = await User.findById(user.id);
  if (!userData) {
    return res.status(400).json({ msg: "User not found" });
  }
  const branchId = userData.Branch_id;
  await Class.find({
    $and: [
      { Interested_users: { $nin: [user.id] } },
      { Branch_id: branchId },
      { Type: "ongoing" },
    ],
  })
    .then((classes) => {
      classes = JSON.parse(JSON.stringify(classes));
      // classes = classes.filter((c: any) => {  // TODO: COMMENTED OUT FOR TESTING PURPOSES
      //   return c.Date.getTime() > new Date().getTime();
      // });
      classes.forEach((c: any) => {
        delete c.Interested_users;
      });
      if (classes.length === 0) {
        return res.status(200).json({ msg: "No classes" });
      }
      res.status(200).json(classes);
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default { generateClass, getClasses, getClassesAtBranch };
