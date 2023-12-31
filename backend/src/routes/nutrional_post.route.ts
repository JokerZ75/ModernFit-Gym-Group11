import nutrional_postController from "../Controllers/nutrional_post.controller";
import express from "express";
import Auth from "../Middlewares/Auth";
import { uploadPostImage } from "../Middlewares/upload";

const router = express.Router();

router.route("/post/:id").get(Auth, nutrional_postController.getPost);

router
  .route("/create")
  .post(
    Auth,
    uploadPostImage.single("Image"),
    nutrional_postController.createPost
  );

router.route("/update/:id").post(Auth, uploadPostImage.single("Image"), nutrional_postController.updatePost)

router.route("/:id").get(Auth, nutrional_postController.getPosts);

router.route("/:id").delete(Auth, nutrional_postController.deletePost);

module.exports = router;
