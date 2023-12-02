"use client";
import React from "react";
import { Button } from "@/app/components/UI/Button";
import axios from "axios";
import Link from "next/link";
import GoBackButton from "./GoBackButton";
import { useAuthContext } from "@/app/components/JWTAuth/AuthContext";
import { useQuery } from "@tanstack/react-query";

type props = {
  id: string;
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

const IndividualInformation: React.FC<props> = ({ id }) => {
  const { getHeaders, api_url } = useAuthContext();

  const { data: isNutritionist } = useQuery({
    queryKey: ["isNutritionist", id],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: headers,
        }
      );
      return (data?.position === "Nutritionist") as boolean;
    },
  });

  const { data: post } = useQuery({
    queryKey: ["post", id],
    queryFn: async () => {
      const headers = await getHeaders();
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/post/${id}`,
        {
          headers: headers,
        }
      );
      return data as nutrional_post;
    },
  });


  React.useEffect(() => {
    axios
      .get(`${post?.Image}`)
      .then((res) => {})
      .catch((err) => {
        post!.Image = "https://placeholder.com/400x150";
      });
  }, [post]);

  return (
    <div>
      <div className="mb-1">
        <div className="flex flex-col md:flex-row mb-4">
          <GoBackButton />
        </div>
        <div className="md:grid grid-cols-4 grid-rows-2">
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <h1 className="font-bold text-4xl text-blue-200 md:whitespace-nowrap">{post?.Title}</h1>
            <p className="pl-1 font-bold mt-auto md:whitespace-nowrap">by {post?.author}</p>
          </div>
          <p className="text-xl text-blue-100 pl-1 row-start-2">
            catagory: {post?.catagory.toLowerCase()}
          </p>
          {isNutritionist && (
            <div className="row-span-2 col-start-4 mt-1 md:mt-0 pl-1">
              <Link href={`../edit-post/${id}`}>
                <Button
                  shadow="default"
                  size="default"
                  variant="darkBlue"
                  hover="hoverLightBlue"
                  rounded="square"
                  className="rounded-lg mx-auto text-center w-full h-full"
                >
                  Edit
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="pl-1">
        <img
          src={post?.Image}
          alt="placeholder"
          className="mx-auto rounded overflow-hidden w-full max-h-[600px] h-auto object-cover"
        />
      </div>
      <p className="text-xl text-blue-100 pl-1">
        average kcal: {post?.Average_calories} kcal
      </p>
      <p className="p-1">{post?.Content}</p>
    </div>
  );
};
export default IndividualInformation;
