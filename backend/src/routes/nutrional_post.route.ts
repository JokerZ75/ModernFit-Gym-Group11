import nutrional_postController from "../Controllers/nutrional_post.controller";
import express from "express";
import Auth from '../Middlewares/Auth';

const router = express.Router();

router.route("/:id").get(nutrional_postController.generatePost);

router.route("/user").get(Auth,nutrional_postController.getPosts);

module.exports = router;