import { Request, Response } from "express";
import Notification from "../models/notification.model";
import notification from "../types/notification.type";
import { RequestWithUser } from "../types/Request.interface";
import { ObjectId } from "mongoose";
import Staff from "../models/staff.model";
import { emailDownTime } from "../utils/emails";
import User from "../models/user.model";
import Branch from "../models/branch.model";


const getUsersNotifications = async (req: RequestWithUser, res: Response) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const userID = user.id;

  const notifications = await Notification.find({
    $or: [{ Recievers: { $in: [userID] } }, { isForAll: true }],
  });
  res.json(notifications);
};

const CreateCancelledClassNotification = async (
  classID: string,
  Recipents: ObjectId[],
  Description: string
) => {
  const notif: notification = {
    Title: "Class Cancelled",
    Description: "Class has been cancelled",
    isForAll: false,
    isSystemFlagged: false,
    Recievers: Recipents,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const newNotification = new Notification(notif);
    const savedNotification = await newNotification.save();
    return savedNotification;
  } catch (err) {
    return err;
  }
};

const CreateDowntimeNotification = async (
  req: RequestWithUser,
  res: Response
) => {
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const userID = user.id;
  const isAdmin = await Staff.findOne({ User_id: userID });
  if (!isAdmin) {
    return res.status(400).json({ msg: "User not found" });
  }
  if (isAdmin.Position !== "Admin") {
    return res.status(400).json({ msg: "User not found" });
  }
  if (!req.body.Description || !req.body.Location) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }
  let emails: string[] = [];
  let location = "All gyms";
  if (req.body.Location !== "All") {
    const users = await User.find({ Branch_id: req.body.Location });
    users.forEach((user) => {
      emails.push(user.Email);
    });
    const branchLocation = await Branch.findById(req.body.Location);
    if (branchLocation) {
      location = branchLocation.Name + " (" + branchLocation.Address + ")";
    }
  }
  if (req.body.Location === "All") {
    const users = await User.find();
    users.forEach((user) => {
      emails.push(user.Email);
    });
  }

  const notif: notification = {
    Title: "Downtime",
    Description: req.body.Description,
    isForAll: true,
    isSystemFlagged: false,
    Recievers: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const newNotification = new Notification(notif);
    const savedNotification = await newNotification.save();

    await emailDownTime(emails, req.body.Description);
    return res.json({ msg: "Emails sent" });
  } catch (err) {
    return err;
  }
};

export default {
  getUsersNotifications,
  CreateCancelledClassNotification,
  CreateDowntimeNotification,
};
