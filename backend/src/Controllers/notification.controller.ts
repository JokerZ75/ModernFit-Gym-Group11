import { Request, Response } from "express";

const getNotifications = async (req: Request, res: Response) => {
  res.json([
    {
      _id: 1,
      Title: "Notification 1",
      description: "Description 1",
      date: "2020-01-01",
      read: false,
    },
    {
      _id: 2,
      Title: "Notification 2",
      description: "Description 2",
      date: "2020-01-02",
      read: true,
    },
    {
      _id: 3,
      Title: "Notification 3",
      description: "Description 3",
      date: "2020-01-03",
      read: false,
    },
    {
      _id: 4,
      Title: "Notification 4",
    },
    {
      _id:5,
      Title: "Notification 5",
    },
    {
      _id:6,
      Title: "Notification 6",
    }
  ]);
};

export default { getNotifications };
