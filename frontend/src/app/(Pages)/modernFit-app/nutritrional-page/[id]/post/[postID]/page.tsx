import React from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { cookies } from "next/headers";
import axios from "axios";
import IndividualInformation from "./components/individualInformation";
import { Button } from "@/app/components/UI/Button";
import Link from "next/link";
// test id = 65662f52d982bc0b88cc75f1

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

const individualNutritionInfo: React.FC<{
  params: { postID: string };
}> = async ({ params }) => {
  const cookieStore = cookies();
  const token = cookieStore.get("_auth_token")?.value;
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 60,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: ["isNutritionist", params.postID],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/session/session-data`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return (data?.position === "Nutritionist") as boolean;
    },
  });

  const post = await queryClient.fetchQuery({
    queryKey: ["post", params.postID],
    queryFn: async () => {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/nutritional_post/post/${params.postID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return data as nutrional_post;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="md:w-3/4 mx-auto p-4">
        <IndividualInformation id={post._id} />
      </main>
    </HydrationBoundary>
  );
};

export default individualNutritionInfo;
