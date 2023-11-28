import { Request, Response } from "express";
import Nutrional_post from "../models/nurtional_post.model";
import nutrional_post from "../types/nutrional_post.type";
import Staff from "../models/staff.model";
import User from "../models/user.model";
import { RequestWithUser } from "../types/Request.interface";
import { deleteFile } from "../utils/files";

const generatePost = async (req: Request, res: Response) => {
  const nutrional_post: nutrional_post = {
    Staff_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
    Title: "Lorem ipsum",
    Catagory_id: "6553baaa7add8a22cbee2a4e",
    Average_calories: 1300,
    Image: "https://placehold.co/300x150",
    Content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultrices libero lobortis finibus. Praesent nibh justo, congue nec elementum lobortis, suscipit nec lacus. Fusce venenatis quam lectus, a sagittis sapien tincidunt sit amet. Aliquam erat volutpat. Fusce varius odio efficitur, auctor nisl sed, consectetur erat. Nulla et auctor",
  };
  const newPost = new Nutrional_post(nutrional_post);

  try {
    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.json({ message: err });
  }
};

const getPost = async (req: Request, res: Response) => {
  const postID = req.params.id;
  await Nutrional_post.findById({ _id: postID }).then(
    (post: nutrional_post | null) => {
      if (post) {
        post = JSON.parse(JSON.stringify(post));
        post!.Image = `http://localhost:${process.env.PORT}/public/postImages/${
          post!.Image
        }.jpg`;
        return res.status(200).json(post);
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
            post.Staff_id = user?.Name;
          } else {
            post.Staff_id = "No name found";
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

export default { generatePost, getPosts, getPost, createPost };
