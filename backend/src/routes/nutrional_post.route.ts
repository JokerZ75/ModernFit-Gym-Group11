import nutrional_postController from "../Controllers/nutrional_post.controller";
import express from "express";
import Auth from "../Middlewares/Auth";
import { uploadPostImage } from "../Middlewares/upload";

const router = express.Router();

router.route("/").get(nutrional_postController.generatePost);

router.route("/post/:id").get(Auth, nutrional_postController.getPost);

router
  .route("/create")
  .post(
    Auth,
    uploadPostImage.single("Image"),
    nutrional_postController.createPost
  );

router.route("/:id").get(Auth, nutrional_postController.getPosts);

module.exports = router;
