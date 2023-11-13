import { Request, Response } from "express";
import classController from "../Controllers/class.controller";
import express from "express";
import Auth from "../Middlewares/Auth";
import { get } from 'http';

const router = express.Router();


router.route("/user").get(Auth , classController.getClasses);

router.route("/generate").get( classController.generateClass);

module.exports = router;