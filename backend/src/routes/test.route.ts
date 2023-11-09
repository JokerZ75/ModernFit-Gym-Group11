import express from "express";
import testController from "../Controllers/test.controller";

const router = express.Router();

router.route("/").get(testController.getTest);

router.route("/:id").get(testController.getTestWithID);

router.route("/body").post(testController.getTestWithBody);

module.exports = router;