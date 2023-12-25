import { Request, Response } from "express";
import Class from "../models/class.model";
import classType from "../types/class.type";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";
import mongoose, { ObjectId } from "mongoose";
import { sendEmail } from "../utils/emails";
import notification from "../utils/notification";

const getClasses = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const staffID = (await Staff.findOne({ User_id: user?.id }))?._id;
  const branchId = (await User.findById(user?.id))?.Branch_id;
  await Class.find({
    $or: [
      {
        $and: [
          { Interested_users: { $in: [user?.id] } },
          { Branch_id: branchId },
        ],
      },
      { Owner_id: staffID },
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

const cancelClass = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const Class_id = req.params.id;
  if (!Class_id) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  const Staff_id = (await Staff.findOne({ User_id: user.id }))?._id;
  if (!Staff_id) {
    return res.status(400).json({ msg: "Staff member not found" });
  }

  await Class.findByIdAndUpdate(Class_id, { Type: "cancelled" }, { new: true })
    .then((c) => {
      if (!c) {
        return res.status(400).json({ msg: "Class not found" });
      }
      const interestedUsers = c.Interested_users;
      if (interestedUsers && interestedUsers.length > 0) {
        interestedUsers.forEach(async (userID) => {
          const userData = await User.findById(userID);
          if (userData) {
            sendEmail(
              userData.Email,
              "Class cancelled",
              `Class ${c.Name} has been cancelled`
            );
          }
          notification.CreateCancelledClassNotification(
            Class_id,
            interestedUsers as any,
            "Class has been cancelled"
          );
          return res.status(200).json({ msg: "Class cancelled" });
        });
      } else {
        return res.status(200).json({ msg: "Class cancelled" });
      }
    })
    .catch((err) => {
      res.status(400).json({ msg: "Class not found" });
    });
};

export default {
  getClasses,
  getClassesAtBranch,
  MarkInterested,
  UnmarkInterested,
  AddClass,
  cancelClass,
};
