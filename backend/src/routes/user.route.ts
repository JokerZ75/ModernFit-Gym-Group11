import userController from "../Controllers/user.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/").get(Auth, userController.getUser);


module.exports = router;