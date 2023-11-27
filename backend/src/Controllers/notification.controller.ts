import { Request, Response } from "express";
import Notification from "../models/notification.model";
import notification from "../types/notification.type";
import { RequestWithUser } from "../types/Request.interface";
import { ObjectId } from "mongoose";

const generateNotification = async (req: Request, res: Response) => {
  const notif: notification = {
    Title: "Notification",
    Description: "Description",
    isForAll: false,
    isSystemFlagged: false,
    Recievers: ["5f9e3b3b9d3b9b1b3c9d3b9b"],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  try {
    const newNotification = new Notification(notif);
    const savedNotification = await newNotification.save();
    res.json(savedNotification);
  } catch (err) {
    res.json({ message: err });
  }
};

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

export default {
  getUsersNotifications,
  generateNotification,
  CreateCancelledClassNotification,
};
