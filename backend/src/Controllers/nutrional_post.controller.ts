import { Request, Response } from "express";
import Nutrional_post from "../models/nurtional_post.model";
import nutrional_post from "../types/nutrional_post.type";
import Staff from "../models/staff.model";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import { deleteFile } from "../utils/files";
import MealCatagory from "../models/meal_catagory.model";

const getPost = async (req: Request, res: Response) => {
  const postID = req.params.id;
  await Nutrional_post.findById({ _id: postID }).then(
    async (post: any | null) => {
      if (post) {
        const Author = await Staff.findById(post.Staff_id);
        let responsePost = JSON.parse(JSON.stringify(post));
        responsePost.Image = `http://localhost:${process.env.PORT}/public/postImages/${post.Image}.jpg`;
        responsePost = {
          ...responsePost,
          catagory: (await MealCatagory.findById(post.Catagory_id))?.Name,
          author: (await User.findById(Author?.User_id))?.Name,
        };
        return res.status(200).json(responsePost);
      } else {
        return res.status(400).json({ msg: "No post found" });
      }
    }
  );
};

const getPosts = async (req: Request, res: Response) => {
  const foodType = req.params.id;
  await Nutrional_post.find({ Catagory_id: foodType })
    .then(async (posts: any[]) => {
      posts = JSON.parse(JSON.stringify(posts));

      await Promise.all(
        posts.map(async (post: any) => {
          post.Image = `http://localhost:${process.env.PORT}/public/postImages/${post.Image}.jpg`;
          const staff = await Staff.findById(post.Staff_id);
          const user = await User.findById(staff?.User_id);
          if (user) {
            post.author = user?.Name;
          } else {
            post.author = "No name found";
          }
        })
      );
      return res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ msg: err });
    });
};

const createPost = async (req: RequestWithUser, res: Response) => {
  const { Title, Category, AverageKcal, Image, Content } = req.body;
  const postExists = await Nutrional_post.findOne({
    $and: [
      { Title: Title },
      { Catagory_id: Category },
      { Average_calories: AverageKcal },
    ],
  });
  if (postExists != null || postExists != undefined) {
    await deleteFile(
      `./public/postImages/undefined${Title}${Category}${AverageKcal}.jpg`
    );
    await deleteFile(
      `./public/postImages/${req.user?.id}${Title}${Category}${AverageKcal}.jpg`
    );
    return res.status(400).json({ msg: "Post already exists" });
  }
  const user = req.user;
  let filePath = `./public/postImages/undefined${Title}${Category}${AverageKcal}.jpg`;
  if (!user) {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  filePath = `./public/postImages/${isStaff._id}${Title}${Category}${AverageKcal}.jpg`;
  if (isStaff.Position !== "Nutritionist") {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  const newPost = new Nutrional_post({
    Staff_id: isStaff._id,
    Title,
    Catagory_id: Category,
    Average_calories: AverageKcal,
    Image: `${isStaff._id}${Title}${Category}${AverageKcal}`,
    Content,
  });
  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    await deleteFile(filePath);
    res.json({
      message: err,
    });
  }
};
const updatePost = async (req: RequestWithUser, res: Response) => {
  const { Title, Category, AverageKcal, Image, Content } = req.body;
  const postExists = await Nutrional_post.findOne({
    $and: [
      { Title: Title },
      { Catagory_id: Category },
      { Average_calories: AverageKcal },
      { _id: { $ne: req.params.id } },
    ],
  });
  // Find posts with same title, category and average calories but not the same id
  if (postExists != null || postExists != undefined) {
    await deleteFile(
      `./public/postImages/undefined${Title}${Category}${AverageKcal}.jpg`
    );
    await deleteFile(
      `./public/postImages/${req.user?.id}${Title}${Category}${AverageKcal}.jpg`
    );
    return res.status(400).json({ msg: "Post already exists" });
  }
  const postID = req.params.id;
  const user = req.user;
  let filePath = `./public/postImages/undefined${Title}${Category}${AverageKcal}.jpg`;
  if (!user) {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  filePath = `./public/postImages/${isStaff._id}${Title}${Category}${AverageKcal}.jpg`;
  if (isStaff.Position !== "Nutritionist") {
    await deleteFile(filePath);
    return res.status(400).json({ msg: "User not found" });
  }
  const oldData = await Nutrional_post.findById(postID);
  try {
    await Nutrional_post.findByIdAndUpdate(
      postID,
      {
        Title: Title,
        Catagory_id: Category,
        Average_calories: AverageKcal,
        Image: `${isStaff._id}${Title}${Category}${AverageKcal}`,
        Content: Content,
      },
      { new: true }
    )
      .then(async (updatedPos) => {
        if (updatedPos?.Image !== oldData?.Image) {
          await deleteFile(`./public/postImages/${oldData?.Image}.jpg`).catch(
            (err) => {
              console.log(err);
            }
          );
        }
        res.status(200).json({ msg: "Updated" });
      })
      .catch((err) => {
        res.status(400).json({ msg: err });
      });
  } catch (err) {
    await deleteFile(filePath);
    res.json({
      message: err,
    });
  }
};

const deletePost = async (req: RequestWithUser, res: Response) => {
  const postID = req.params.id;
  const user = req.user;
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isStaff = await Staff.findOne({ User_id: user.id });
  if (!isStaff) {
    return res.status(400).json({ msg: "User not found" });
  }
  if (isStaff.Position !== "Nutritionist") {
    return res.status(400).json({ msg: "User not found" });
  }

  const postData = await Nutrional_post.findById(postID);
  if (!postData) {
    return res.status(400).json({ msg: "Post not found" });
  }

  const deletedPost = await Nutrional_post.findByIdAndDelete(postID);
  if (!deletedPost) {
    return res.status(400).json({ msg: "Post not found" });
  }
  await deleteFile(`./public/postImages/${postData.Image}.jpg`).catch((err) => {
    console.log(err);
  });
  res.status(200).json({ msg: "Post deleted" });
};
export default {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
};
