import { Request, Response } from "express";
import Nutrional_post from "../models/nurtional_post.model";
//import nutrional_post from "../types/"

const generatePost = async (req: Request, res: Response) => {        
    const nutrional_post = {
        Staff_id: "5f9e3b3b9d3b9b1b3c9d3b9b",
        Title: "Lorem ipsum",
        Catagory_id: "6553baaa7add8a22cbee2a4e",
        Average_calories: 1300,
        Image: "https://placehold.co/300x150",
        Content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut nibh ultrices libero lobortis finibus. Praesent nibh justo, congue nec elementum lobortis, suscipit nec lacus. Fusce venenatis quam lectus, a sagittis sapien tincidunt sit amet. Aliquam erat volutpat. Fusce varius odio efficitur, auctor nisl sed, consectetur erat. Nulla et auctor",
    };
    const newPost = new Nutrional_post(nutrional_post);

    try {
        const savedPost = await newPost.save()
        res.json(savedPost)
    } catch (err) {
        res.json({ message: err });
    }

};

const getPosts = async (req: Request, res: Response) => {
    const foodType = req.params.id;
    await Nutrional_post.find({Catagory_id: foodType})
        .then((posts) => {
            res.status(200).json(posts);
        })
        .catch((err) => {
            res.status(400).json({ msg: err });
        })
};

export default{ generatePost, getPosts };