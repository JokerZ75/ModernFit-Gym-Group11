"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import Link from "next/link";

type props = {
  post: nutrional_post;
  catagoryID: string;
};

type nutrional_post = {
  _id: string;
  Staff_id: string;
  Title: string;
  Catagory_id: string;
  Average_calories: number;
  Image: string;
  Content: string;
  catagory: string;
  author: string;
};

const Post: React.FC<props> = ({ post, catagoryID }) => {
  React.useEffect(() => {
    if (post?.Content.length > 75) {
      post!.Content = post?.Content.slice(0, 75);
      post!.Content += "...";
    }
  }, [post]);

  React.useEffect(() => {
    axios
      .get(`${post?.Image}`)
      .then((res) => {})
      .catch((err) => {
        post!.Image = "https://placeholder.com/400x150";
      });
  }, [post, ]);

  return (
    <div className="bg-blue-100 text-white mt-2 mb-4 border rounded-lg py-2 px-4 flex flex-col">
      <div className="text-xl text-left font-bold">{post?.Title}</div>
      <div className="mx-auto md:w-full ">
        <img
          src={post?.Image}
          alt="placeholder"
          className="w-[400px] h-[150px] md:w-full object-cover"
        ></img>
      </div>
      <div className="text-base mx-auto mt-4">{post?.Content}</div>
      <div className="flex-1 w-full mx-auto font-bold text-sm">
        <div className="inline-block max-w-md mt-1">by {post?.author} </div>
        <div className="inline-block float-right max-w-md">
          {post?.Average_calories} kcal
        </div>
      </div>
      <div className="text-center mt-5">
        <Link href={`${catagoryID}/post/${post._id}`}>
          <Button
            shadow="default"
            size="small"
            variant="darkBlue"
            hover="default"
            rounded="circle"
            className="w-5/6 border mx-auto text-center"
          >
            Open
          </Button>
        </Link>
      </div>
    </div>
  );
};
export default Post;
