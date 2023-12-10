import sessionController from "../Controllers/session.controller";
import express from "express";
import Auth from "../Middlewares/Auth";

const router = express.Router();

router.route("/2FA").post(sessionController.SendFor2FA);

router.route("/login").post(sessionController.StartSession);

router.route("/logout").post(Auth,sessionController.EndSession);

router.route("/refresh").post(sessionController.RefreshSession);

router.route("/verify").post(sessionController.VerifySession);

router.route("/registerlogin").post(sessionController.StartSessionFromRegister);

router.route("/session-data").get(Auth, sessionController.GetSessionData);

module.exports = router;
