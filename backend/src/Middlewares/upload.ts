import { Request } from "express";
import multer from "multer";
import { RequestWithUser } from "../types/Request.interface";


const profileImageStorage = multer.diskStorage({
  destination: (req: Request, file: any, cb: Function) => {
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
  destination: function (req: Request, file: any, cb: Function) {
    cb(null, "public/postImages");
  },
  filename: function (req: Request, file: any, cb: Function) {
    cb(null, req.body.post._id + ".jpg");
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