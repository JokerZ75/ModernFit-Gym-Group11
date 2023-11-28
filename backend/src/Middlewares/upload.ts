import { Request } from "express";
import multer from "multer";
import { RequestWithUser } from "../types/Request.interface";
import Staff from "../models/staff.model";

const profileImageStorage = multer.diskStorage({
  destination: (req: RequestWithUser, file: any, cb: Function) => {
    const user = req.user;
    cb(null, "public/profileImages");
  },
  filename: function (req: RequestWithUser, file: any, cb: Function) {
    cb(null, req?.user?.id + ".jpg");
  },
});

const fileFilter = (req: Request, file: any, cb: Function) => {
  if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
    cb(null, true);
    return;
  }
  cb(null, false);
};

const uploadProfileImage = multer({
  storage: profileImageStorage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});

const postImageStorage = multer.diskStorage({
  destination: async function (req: RequestWithUser, file: any, cb: Function) {
    cb(null, "public/postImages");
  },
  filename: async function (req: RequestWithUser, file: any, cb: Function) {
    const { Title, Category, AverageKcal } = req.body;
    const user = req?.user;
    const isStaff = await Staff.findOne({ User_id: user?.id });
    cb(null, `${isStaff?._id}${Title}${Category}${AverageKcal}` + ".jpg");
  },
});

const uploadPostImage = multer({
  storage: postImageStorage,
  limits: {
    fileSize: 1024 * 1024 * 20,
  },
  fileFilter: fileFilter,
});

export { uploadProfileImage, uploadPostImage };
