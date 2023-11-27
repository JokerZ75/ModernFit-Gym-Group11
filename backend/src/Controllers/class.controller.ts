import { Request, Response } from "express";
import Class from "../models/class.model";
import classType from "../types/class.type";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";

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

const getClasses = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const staffID = (await Staff.findOne({ User_id: user?.id }))?._id;
  await Class.find({
    $or: [{ Interested_users: { $in: [user?.id] } }, { Owner_id: staffID }],
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

const getClassesAtBranch = async (req: any, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const userData = await User.findById(user?.id);
  if (!userData) {
    return res.status(400).json({ msg: "User not found" });
  }
  const staffID = (await Staff.findOne({ User_id: user?.id }))?._id;
  const branchId = userData.Branch_id;
  await Class.find({
    $and: [
      { Interested_users: { $nin: [user?.id] } },
      { Branch_id: branchId },
      { Type: "ongoing" },
      { Owner_id: { $ne: staffID } },
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

const MarkInterested = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const Class_id = req.params.id;
  if (!Class_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await Class.findByIdAndUpdate(
    Class_id,
    { $push: { Interested_users: user.id } },
    { new: true }
  )
    .then((c) => {
      if (!c) {
        return res.status(400).json({ msg: "Class not found" });
      }
      return res.status(200).json({ msg: "Marked interested" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const UnmarkInterested = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const Class_id = req.params.id;
  if (!Class_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  await Class.findByIdAndUpdate(
    Class_id,
    { $pull: { Interested_users: user.id } },
    { new: true }
  )
    .then((c) => {
      if (!c) {
        return res.status(400).json({ msg: "Class not found" });
      }
      return res.status(200).json({ msg: "Unmarked interested" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

const AddClass = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const { Name, Date, Duration } = req.body;
  if (!Name || !Date || !Duration || !Duration) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const userID = user.id;
  const staffMember = await Staff.findOne({ User_id: userID });
  if (!staffMember) {
    return res.status(400).json({ msg: "Staff member not found" });
  }
  const StaffBranch = (await User.findById(userID))?.Branch_id;
  const classObj = {
    Owner_id: staffMember._id,
    Name: Name,
    Date: Date,
    Duration: Duration,
    Type: "ongoing",
    Branch_id: StaffBranch,
  };

  const newClass = new Class(classObj);

  await newClass
    .save()
    .then((c) => {
      return res.status(200).json({ msg: "Class added" });
    })
    .catch((err) => {
      res.status(400).json({ msg: err });
    });
};

export default {
  generateClass,
  getClasses,
  getClassesAtBranch,
  MarkInterested,
  UnmarkInterested,
  AddClass,
};
