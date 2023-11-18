import userController from "../Controllers/user.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/").get(Auth, userController.getUser);

router.route("/update").post(Auth, userController.updateUser);

router.route("/delete").post(Auth, userController.deleteUser);



module.exports = router;
