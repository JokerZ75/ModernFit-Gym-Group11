"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import Link from "next/link";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";
import Post from "./post";

const PostContainer: React.FC<{
  catagoryID: string;
}> = ({ catagoryID }) => {
  const { getHeaders, api_url } = useAuthContext();

  const { data: posts } = useQuery({
    queryKey: ["posts", catagoryID],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(
        `${api_url}/nutritional_post/catagory/${catagoryID}`,
        {
          headers: headers,
        }
      );
      return data;
    },
  });

  return (
    <>
      {posts?.map((post: any) => {
        return <Post post={post} catagoryID={catagoryID} />;
      })}
    </>
  );
};

export default PostContainer;
