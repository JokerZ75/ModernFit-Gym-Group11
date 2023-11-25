import { Request, Response } from "express";
import Notification from "../models/notification.model";
import notification from "../types/notification.type";
import { RequestWithUser } from "../types/Request.interface";

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
  const userID = (user.id);

  const notifications = await Notification.find({
    $or: [{ Recievers: { $in: [userID] } }, { isForAll: true }],
  });
  res.json(notifications);
};

export default {
  getUsersNotifications,
  generateNotification,
};
