import express from "express";
import Auth from "../Middlewares/Auth"; // not using yet
import notificationController from "../Controllers/notification.controller";

const router = express.Router();

router.route("/user").get(Auth, notificationController.getUsersNotifications);

router.route("/downtime").post(Auth,notificationController.CreateDowntimeNotification);

module.exports = router;
