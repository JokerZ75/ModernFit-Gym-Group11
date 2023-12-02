import userController from "../Controllers/user.controller";
import express from "express";
import Auth from "../Middlewares/Auth";
import { uploadProfileImage } from "../Middlewares/upload";

const router = express.Router();

router.route("/").get(Auth, userController.getUser);

router.route("/allUsers").get(Auth, userController.getAllUsers);

router.route("/update").post(Auth, userController.updateUser);

router.route("/delete").post(Auth, userController.deleteUser);

router.route("/:id").get(Auth, userController.getUserById);

router.route("/create").post(userController.CreateUser);

router.route("/confirm/:token").get(userController.ConfirmUser);

router
  .route("/profile-picture")
  .post(
    Auth,
    uploadProfileImage.single("profileImage"),
    userController.updateProfilePicture
  );

router.route("/recover-account").post(userController.RecoverAccount);

router.route("/reset-password/:token").post(userController.ResetPassword);

module.exports = router;
